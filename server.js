import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || (process.env.PORT ? "0.0.0.0" : "127.0.0.1");
const databaseUrl = process.env.DATABASE_URL || "";
const adminToken = process.env.ADMIN_TOKEN || "";
const maxJsonBytes = 6 * 1024 * 1024;
const defaultCatLimit = 5;
const maxCatLimit = 20;

let pool = null;
let schemaReadyPromise = null;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png"
};

function getPool() {
  if (!databaseUrl) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined
    });
  }
  return pool;
}

async function ensureSchema() {
  const db = getPool();
  if (!db) return false;
  if (!schemaReadyPromise) {
    schemaReadyPromise = db.query(`
      CREATE TABLE IF NOT EXISTS app_users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        naver_id TEXT NOT NULL UNIQUE,
        cafe_nickname TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        password_iterations INTEGER NOT NULL DEFAULT 210000,
        approval_status TEXT NOT NULL DEFAULT 'pending'
          CHECK (approval_status IN ('pending', 'approved', 'rejected')),
        admin_note TEXT NOT NULL DEFAULT '',
        cat_limit INTEGER NOT NULL DEFAULT 5,
        approval_requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        approved_at TIMESTAMPTZ,
        rejected_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS user_states (
        user_id TEXT PRIMARY KEY REFERENCES app_users(id) ON DELETE CASCADE,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS app_sessions (
        token_hash TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        expires_at TIMESTAMPTZ NOT NULL
      );

      CREATE TABLE IF NOT EXISTS board_posts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
        author_name TEXT NOT NULL,
        category TEXT NOT NULL,
        cat_name TEXT NOT NULL DEFAULT '',
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        approval_status TEXT NOT NULL DEFAULT 'pending'
          CHECK (approval_status IN ('pending', 'approved', 'rejected')),
        admin_note TEXT NOT NULL DEFAULT '',
        approved_at TIMESTAMPTZ,
        rejected_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS board_comments (
        id TEXT PRIMARY KEY,
        post_id TEXT NOT NULL REFERENCES board_posts(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
        author_name TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_app_users_approval_status
        ON app_users (approval_status, created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_app_sessions_user_id
        ON app_sessions (user_id);
      CREATE INDEX IF NOT EXISTS idx_board_posts_created_at
        ON board_posts (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_board_comments_post_id
        ON board_comments (post_id, created_at ASC);

      ALTER TABLE app_users
        ADD COLUMN IF NOT EXISTS admin_note TEXT NOT NULL DEFAULT '',
        ADD COLUMN IF NOT EXISTS cat_limit INTEGER NOT NULL DEFAULT 5;
      ALTER TABLE board_posts
        ADD COLUMN IF NOT EXISTS approval_status TEXT NOT NULL DEFAULT 'pending',
        ADD COLUMN IF NOT EXISTS admin_note TEXT NOT NULL DEFAULT '',
        ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
        ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMPTZ;

      CREATE INDEX IF NOT EXISTS idx_board_posts_approval_status
        ON board_posts (approval_status, created_at DESC);
    `).catch((error) => {
      schemaReadyPromise = null;
      throw error;
    });
  }
  await schemaReadyPromise;
  return true;
}

function resolveAsset(rawUrl) {
  const url = new URL(rawUrl || "/", "http://localhost");
  const cleanPath = decodeURIComponent(url.pathname);
  const requested = cleanPath === "/" ? "/index.html" : cleanPath;
  const filePath = path.join(__dirname, requested);
  if (!filePath.startsWith(__dirname)) {
    return path.join(__dirname, "index.html");
  }
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    return filePath;
  }
  return path.join(__dirname, "index.html");
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function sendError(res, status, message, code = "error") {
  sendJson(res, status, { ok: false, code, message });
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxJsonBytes) {
      const error = new Error("요청 본문이 너무 큽니다.");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeText(value) {
  return String(value || "").trim();
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex"), iterations = 210000) {
  const hash = crypto.pbkdf2Sync(String(password), salt, iterations, 64, "sha512").toString("hex");
  return { hash, salt, iterations };
}

function verifyPassword(password, user) {
  const { hash } = hashPassword(password, user.password_salt, user.password_iterations);
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(user.password_hash, "hex"));
}

function tokenHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function createToken() {
  return crypto.randomBytes(32).toString("hex");
}

function normalizeCatLimit(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return defaultCatLimit;
  return Math.min(maxCatLimit, Math.max(1, Math.floor(number)));
}

function countCatsForUser(stateData, userId) {
  if (!stateData || !Array.isArray(stateData.cats)) return 0;
  return stateData.cats.filter((cat) => cat && cat.userId === userId).length;
}

function publicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    naverId: row.naver_id,
    cafeNickname: row.cafe_nickname,
    email: row.email,
    approvalStatus: row.approval_status,
    approvalRequestedAt: row.approval_requested_at,
    approvedAt: row.approved_at,
    catLimit: normalizeCatLimit(row.cat_limit),
    createdAt: row.created_at
  };
}

function adminUser(row) {
  if (!row) return null;
  return {
    ...publicUser(row),
    adminNote: row.admin_note || "",
    rejectedAt: row.rejected_at,
    updatedAt: row.updated_at
  };
}

function boardPost(row, comments = []) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    author: row.author_name,
    category: row.category,
    catName: row.cat_name || "",
    title: row.title,
    body: row.body,
    approvalStatus: row.approval_status || "pending",
    adminNote: row.admin_note || "",
    approvedAt: row.approved_at,
    rejectedAt: row.rejected_at,
    comments,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function boardComment(row) {
  if (!row) return null;
  return {
    id: row.id,
    postId: row.post_id,
    userId: row.user_id,
    author: row.author_name,
    body: row.body,
    createdAt: row.created_at
  };
}

async function requireDb(res) {
  if (!(await ensureSchema())) {
    sendError(res, 503, "DATABASE_URL이 설정되지 않아 로컬 저장 모드로 동작합니다.", "database_not_configured");
    return null;
  }
  return getPool();
}

function getBearerToken(req) {
  const auth = req.headers.authorization || "";
  return auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
}

async function requireUser(req, res) {
  const db = await requireDb(res);
  if (!db) return null;
  const token = getBearerToken(req);
  if (!token) {
    sendError(res, 401, "로그인이 필요합니다.", "auth_required");
    return null;
  }
  const result = await db.query(
    `SELECT u.*
       FROM app_sessions s
       JOIN app_users u ON u.id = s.user_id
      WHERE s.token_hash = $1
        AND s.expires_at > now()
      LIMIT 1`,
    [tokenHash(token)]
  );
  const user = result.rows[0];
  if (!user) {
    sendError(res, 401, "세션이 만료되었습니다. 다시 로그인해주세요.", "session_expired");
    return null;
  }
  if (user.approval_status !== "approved") {
    sendError(res, 403, "관리자 승인 후 이용할 수 있습니다.", "approval_required");
    return null;
  }
  return { db, user };
}

function requireAdmin(req, res) {
  if (!adminToken) {
    sendError(res, 503, "ADMIN_TOKEN이 설정되지 않았습니다.", "admin_token_not_configured");
    return false;
  }
  const token = req.headers["x-admin-token"] || getBearerToken(req);
  const received = Buffer.from(String(token));
  const expected = Buffer.from(adminToken);
  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) {
    sendError(res, 403, "관리자 권한이 필요합니다.", "admin_required");
    return false;
  }
  return true;
}

async function handleSignup(req, res) {
  const db = await requireDb(res);
  if (!db) return;
  const body = await readJson(req);
  const email = normalizeEmail(body.email);
  const naverId = normalizeText(body.naverId);
  const cafeNickname = normalizeText(body.cafeNickname);
  const password = String(body.password || "");

  if (!email || !naverId || !cafeNickname || password.length < 4) {
    sendError(res, 400, "네이버 ID, 신이고 닉네임, 이메일, 비밀번호를 모두 입력해주세요.", "invalid_signup");
    return;
  }

  const { hash, salt, iterations } = hashPassword(password);
  try {
    const result = await db.query(
      `INSERT INTO app_users (
          id, name, naver_id, cafe_nickname, email,
          password_hash, password_salt, password_iterations
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
      [crypto.randomUUID(), cafeNickname, naverId, cafeNickname, email, hash, salt, iterations]
    );
    sendJson(res, 201, { ok: true, user: publicUser(result.rows[0]) });
  } catch (error) {
    if (error.code === "23505") {
      sendError(res, 409, "이미 가입 신청된 이메일 또는 네이버 ID입니다.", "duplicate_signup");
      return;
    }
    throw error;
  }
}

async function handleSignupStatus(req, res) {
  const db = await requireDb(res);
  if (!db) return;
  const body = await readJson(req);
  const email = normalizeEmail(body.email);
  const naverId = normalizeText(body.naverId);

  if (!email || !naverId) {
    sendError(res, 400, "이메일과 네이버 ID를 입력해주세요.", "invalid_signup_status");
    return;
  }

  const result = await db.query(
    `SELECT *
       FROM app_users
      WHERE email = $1
        AND lower(naver_id) = lower($2)
      LIMIT 1`,
    [email, naverId]
  );
  if (!result.rows[0]) {
    sendError(res, 404, "가입 신청 정보를 찾지 못했습니다.", "signup_not_found");
    return;
  }
  sendJson(res, 200, { ok: true, user: publicUser(result.rows[0]) });
}

async function handleLogin(req, res) {
  const db = await requireDb(res);
  if (!db) return;
  const body = await readJson(req);
  const email = normalizeEmail(body.email);
  const password = String(body.password || "");
  const result = await db.query("SELECT * FROM app_users WHERE email = $1 LIMIT 1", [email]);
  const user = result.rows[0];

  if (!user || !verifyPassword(password, user)) {
    sendError(res, 401, "이메일 또는 비밀번호를 확인해주세요.", "invalid_login");
    return;
  }
  if (user.approval_status === "pending") {
    sendError(res, 403, "관리자 승인 대기 중입니다. 신이고 회원 확인 후 이용할 수 있습니다.", "approval_pending");
    return;
  }
  if (user.approval_status === "rejected") {
    sendError(res, 403, "가입 승인이 보류된 계정입니다. 운영자에게 문의해주세요.", "approval_rejected");
    return;
  }

  const token = createToken();
  await db.query(
    `INSERT INTO app_sessions (token_hash, user_id, expires_at)
     VALUES ($1, $2, now() + interval '30 days')`,
    [tokenHash(token), user.id]
  );
  const stateResult = await db.query("SELECT data FROM user_states WHERE user_id = $1", [user.id]);
  sendJson(res, 200, {
    ok: true,
    token,
    user: publicUser(user),
    state: stateResult.rows[0]?.data || null
  });
}

async function handleGetState(req, res) {
  const context = await requireUser(req, res);
  if (!context) return;
  const result = await context.db.query("SELECT data FROM user_states WHERE user_id = $1", [context.user.id]);
  sendJson(res, 200, {
    ok: true,
    user: publicUser(context.user),
    state: result.rows[0]?.data || null
  });
}

async function handlePutState(req, res) {
  const context = await requireUser(req, res);
  if (!context) return;
  const body = await readJson(req);
  const data = body.state && typeof body.state === "object" ? body.state : {};
  const catLimit = normalizeCatLimit(context.user.cat_limit);
  const catCount = countCatsForUser(data, context.user.id);
  if (catCount > catLimit) {
    sendError(
      res,
      400,
      `고양이는 계정당 ${catLimit}마리까지 등록할 수 있습니다. 추가 등록이 필요하면 운영자에게 문의해주세요.`,
      "cat_limit_exceeded"
    );
    return;
  }
  await context.db.query(
    `INSERT INTO user_states (user_id, data, updated_at)
     VALUES ($1, $2::jsonb, now())
     ON CONFLICT (user_id)
     DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [context.user.id, JSON.stringify(data)]
  );
  sendJson(res, 200, { ok: true });
}

async function handleBoardPosts(req, res) {
  const context = await requireUser(req, res);
  if (!context) return;

  if (req.method === "GET") {
    const postsResult = await context.db.query(
      `SELECT *
         FROM board_posts
        WHERE approval_status = 'approved'
           OR user_id = $1
        ORDER BY created_at DESC
        LIMIT 200`,
      [context.user.id]
    );
    const postIds = postsResult.rows.map((post) => post.id);
    const commentsByPostId = new Map(postIds.map((id) => [id, []]));
    if (postIds.length) {
      const commentsResult = await context.db.query(
        `SELECT *
           FROM board_comments
          WHERE post_id = ANY($1)
          ORDER BY created_at ASC`,
        [postIds]
      );
      commentsResult.rows.forEach((row) => {
        const comments = commentsByPostId.get(row.post_id);
        if (comments) comments.push(boardComment(row));
      });
    }
    sendJson(res, 200, {
      ok: true,
      posts: postsResult.rows.map((row) => boardPost(row, commentsByPostId.get(row.id) || []))
    });
    return;
  }

  if (req.method === "POST") {
    const body = await readJson(req);
    const category = normalizeText(body.category).slice(0, 40) || "자료";
    const catName = normalizeText(body.catName).slice(0, 80);
    const title = normalizeText(body.title).slice(0, 120);
    const postBody = normalizeText(body.body).slice(0, 5000);
    if (!title || !postBody) {
      sendError(res, 400, "제목과 내용을 입력해주세요.", "invalid_board_post");
      return;
    }
    const result = await context.db.query(
      `INSERT INTO board_posts (
          id, user_id, author_name, category, cat_name, title, body
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
      [
        crypto.randomUUID(),
        context.user.id,
        context.user.cafe_nickname || context.user.name,
        category,
        catName,
        title,
        postBody
      ]
    );
    sendJson(res, 201, { ok: true, post: boardPost(result.rows[0], []) });
    return;
  }

  sendError(res, 405, "지원하지 않는 자료실 요청입니다.", "method_not_allowed");
}

async function handleBoardPost(req, res, postId) {
  const context = await requireUser(req, res);
  if (!context) return;

  if (req.method === "DELETE") {
    const result = await context.db.query(
      "DELETE FROM board_posts WHERE id = $1 AND user_id = $2 RETURNING id",
      [postId, context.user.id]
    );
    if (!result.rows[0]) {
      sendError(res, 404, "삭제할 수 있는 자료를 찾지 못했습니다.", "board_post_not_found");
      return;
    }
    sendJson(res, 200, { ok: true });
    return;
  }

  sendError(res, 405, "지원하지 않는 자료 요청입니다.", "method_not_allowed");
}

async function handleBoardComments(req, res, postId) {
  const context = await requireUser(req, res);
  if (!context) return;
  if (req.method !== "POST") {
    sendError(res, 405, "지원하지 않는 의견 요청입니다.", "method_not_allowed");
    return;
  }
  const body = await readJson(req);
  const commentBody = normalizeText(body.body).slice(0, 1000);
  if (!commentBody) {
    sendError(res, 400, "의견 내용을 입력해주세요.", "invalid_board_comment");
    return;
  }
  const postResult = await context.db.query(
    "SELECT id FROM board_posts WHERE id = $1 AND approval_status = 'approved'",
    [postId]
  );
  if (!postResult.rows[0]) {
    sendError(res, 404, "공개된 자료를 찾지 못했습니다.", "board_post_not_found");
    return;
  }
  const result = await context.db.query(
    `INSERT INTO board_comments (id, post_id, user_id, author_name, body)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      crypto.randomUUID(),
      postId,
      context.user.id,
      context.user.cafe_nickname || context.user.name,
      commentBody
    ]
  );
  sendJson(res, 201, { ok: true, comment: boardComment(result.rows[0]) });
}

async function handleAdminBoardPosts(req, res, url) {
  const db = await requireDb(res);
  if (!db || !requireAdmin(req, res)) return;
  const requestedStatus = url.searchParams.get("status") || "pending";
  const status = ["pending", "approved", "rejected"].includes(requestedStatus) ? requestedStatus : "pending";
  const query = normalizeText(url.searchParams.get("q"));
  const params = [status];
  const filters = ["approval_status = $1"];
  if (query) {
    params.push(`%${query}%`);
    filters.push(
      `(title ILIKE $${params.length}
        OR body ILIKE $${params.length}
        OR author_name ILIKE $${params.length}
        OR category ILIKE $${params.length}
        OR cat_name ILIKE $${params.length}
        OR admin_note ILIKE $${params.length})`
    );
  }
  const result = await db.query(
    `SELECT *
       FROM board_posts
      WHERE ${filters.join(" AND ")}
      ORDER BY created_at DESC
      LIMIT 200`,
    params
  );
  const countsResult = await db.query(
    `SELECT approval_status, count(*)::int AS count
       FROM board_posts
      GROUP BY approval_status`
  );
  const counts = { pending: 0, approved: 0, rejected: 0 };
  countsResult.rows.forEach((row) => {
    counts[row.approval_status] = row.count;
  });
  sendJson(res, 200, { ok: true, posts: result.rows.map((row) => boardPost(row, [])), counts });
}

async function handleAdminBoardApproval(req, res, postId) {
  const db = await requireDb(res);
  if (!db || !requireAdmin(req, res)) return;
  const body = await readJson(req);
  const approvalStatus = String(body.approvalStatus || "");
  const adminNote = normalizeText(body.adminNote).slice(0, 1000);
  if (!["approved", "rejected", "pending"].includes(approvalStatus)) {
    sendError(res, 400, "approvalStatus는 pending, approved, rejected 중 하나여야 합니다.", "invalid_approval_status");
    return;
  }
  const result = await db.query(
    `UPDATE board_posts
        SET approval_status = $1,
            admin_note = $2,
            approved_at = CASE WHEN $1 = 'approved' AND approval_status <> 'approved' THEN now() ELSE approved_at END,
            rejected_at = CASE WHEN $1 = 'rejected' AND approval_status <> 'rejected' THEN now() ELSE rejected_at END,
            updated_at = now()
      WHERE id = $3
      RETURNING *`,
    [approvalStatus, adminNote, postId]
  );
  if (!result.rows[0]) {
    sendError(res, 404, "자료를 찾을 수 없습니다.", "board_post_not_found");
    return;
  }
  sendJson(res, 200, { ok: true, post: boardPost(result.rows[0], []) });
}

async function handleAdminUsers(req, res, url) {
  const db = await requireDb(res);
  if (!db || !requireAdmin(req, res)) return;
  const requestedStatus = url.searchParams.get("status") || "pending";
  const status = ["pending", "approved", "rejected"].includes(requestedStatus) ? requestedStatus : "pending";
  const query = normalizeText(url.searchParams.get("q"));
  const params = [status];
  const filters = ["approval_status = $1"];
  if (query) {
    params.push(`%${query}%`);
    filters.push(
      `(cafe_nickname ILIKE $${params.length}
        OR naver_id ILIKE $${params.length}
        OR email ILIKE $${params.length}
        OR admin_note ILIKE $${params.length})`
    );
  }
  const result = await db.query(
    `SELECT *
       FROM app_users
      WHERE ${filters.join(" AND ")}
      ORDER BY created_at DESC
      LIMIT 200`,
    params
  );
  const countsResult = await db.query(
    `SELECT approval_status, count(*)::int AS count
       FROM app_users
      GROUP BY approval_status`
  );
  const counts = { pending: 0, approved: 0, rejected: 0 };
  countsResult.rows.forEach((row) => {
    counts[row.approval_status] = row.count;
  });
  sendJson(res, 200, { ok: true, users: result.rows.map(adminUser), counts });
}

async function handleAdminApproval(req, res, userId) {
  const db = await requireDb(res);
  if (!db || !requireAdmin(req, res)) return;
  const body = await readJson(req);
  const approvalStatus = String(body.approvalStatus || "");
  const adminNote = normalizeText(body.adminNote).slice(0, 1000);
  const catLimit = normalizeCatLimit(body.catLimit);
  if (!["approved", "rejected", "pending"].includes(approvalStatus)) {
    sendError(res, 400, "approvalStatus는 pending, approved, rejected 중 하나여야 합니다.", "invalid_approval_status");
    return;
  }
  const result = await db.query(
    `UPDATE app_users
        SET approval_status = $1,
            admin_note = $2,
            cat_limit = $3,
            approved_at = CASE WHEN $1 = 'approved' AND approval_status <> 'approved' THEN now() ELSE approved_at END,
            rejected_at = CASE WHEN $1 = 'rejected' AND approval_status <> 'rejected' THEN now() ELSE rejected_at END,
            updated_at = now()
      WHERE id = $4
      RETURNING *`,
    [approvalStatus, adminNote, catLimit, userId]
  );
  if (!result.rows[0]) {
    sendError(res, 404, "회원을 찾을 수 없습니다.", "user_not_found");
    return;
  }
  sendJson(res, 200, { ok: true, user: adminUser(result.rows[0]) });
}

async function handleDeleteAccount(req, res) {
  const context = await requireUser(req, res);
  if (!context) return;
  await context.db.query("DELETE FROM app_users WHERE id = $1", [context.user.id]);
  sendJson(res, 200, { ok: true });
}

async function handleApi(req, res, url) {
  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      const dbReady = await ensureSchema();
      sendJson(res, 200, { ok: true, database: dbReady });
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/signup") {
      await handleSignup(req, res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/signup-status") {
      await handleSignupStatus(req, res);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/login") {
      await handleLogin(req, res);
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/state") {
      await handleGetState(req, res);
      return;
    }
    if (req.method === "PUT" && url.pathname === "/api/state") {
      await handlePutState(req, res);
      return;
    }
    if (req.method === "DELETE" && url.pathname === "/api/account") {
      await handleDeleteAccount(req, res);
      return;
    }
    if ((req.method === "GET" || req.method === "POST") && url.pathname === "/api/board/posts") {
      await handleBoardPosts(req, res);
      return;
    }
    const boardCommentMatch = url.pathname.match(/^\/api\/board\/posts\/([^/]+)\/comments$/);
    if (boardCommentMatch) {
      await handleBoardComments(req, res, decodeURIComponent(boardCommentMatch[1]));
      return;
    }
    const boardPostMatch = url.pathname.match(/^\/api\/board\/posts\/([^/]+)$/);
    if (boardPostMatch) {
      await handleBoardPost(req, res, decodeURIComponent(boardPostMatch[1]));
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/admin/users") {
      await handleAdminUsers(req, res, url);
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/admin/board-posts") {
      await handleAdminBoardPosts(req, res, url);
      return;
    }
    const boardApprovalMatch = url.pathname.match(/^\/api\/admin\/board-posts\/([^/]+)$/);
    if (req.method === "PATCH" && boardApprovalMatch) {
      await handleAdminBoardApproval(req, res, decodeURIComponent(boardApprovalMatch[1]));
      return;
    }
    const approvalMatch = url.pathname.match(/^\/api\/admin\/users\/([^/]+)$/);
    if (req.method === "PATCH" && approvalMatch) {
      await handleAdminApproval(req, res, decodeURIComponent(approvalMatch[1]));
      return;
    }
    sendError(res, 404, "API 경로를 찾을 수 없습니다.", "not_found");
  } catch (error) {
    const status = error.status || 500;
    sendError(res, status, status === 500 ? "서버 오류가 발생했습니다." : error.message, "server_error");
    if (status === 500) console.error(error);
  }
}

async function serveStatic(req, res) {
  try {
    const filePath = resolveAsset(req.url || "/");
    const ext = path.extname(filePath);
    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": types[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Frame-Options": "sameorigin",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Content-Type-Options": "nosniff"
    });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`서버 오류가 발생했습니다.\n${error.message}`);
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  if (url.pathname.startsWith("/api/")) {
    await handleApi(req, res, url);
    return;
  }
  await serveStatic(req, res);
}).listen(port, host, () => {
  console.log(`Sinego Care is running at http://${host}:${port}`);
});
