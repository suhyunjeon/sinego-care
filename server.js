import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || (process.env.PORT ? "0.0.0.0" : "127.0.0.1");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png"
};

function resolveAsset(url) {
  const cleanPath = decodeURIComponent(url.split("?")[0]);
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

function cacheControlFor(filePath) {
  return "no-store";
}

createServer(async (req, res) => {
  try {
    const filePath = resolveAsset(req.url || "/");
    const ext = path.extname(filePath);
    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": types[ext] || "application/octet-stream",
      "Cache-Control": cacheControlFor(filePath)
    });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`서버 오류가 발생했습니다.\n${error.message}`);
  }
}).listen(port, host, () => {
  console.log(`Sinego Care is running at http://${host}:${port}`);
});
