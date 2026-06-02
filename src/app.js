const STORAGE_KEY = "sinego-care-state-v1";
const AUTH_TOKEN_KEY = "sinego-care-auth-token";
const ADMIN_TOKEN_KEY = "sinego-care-admin-token";
const REMOTE_SAVE_DELAY_MS = 800;

const tabs = [
  { id: "dashboard", label: "홈" },
  { id: "cats", label: "고양이" },
  { id: "fluid", label: "수액" },
  { id: "medication", label: "투약" },
  { id: "symptoms", label: "증상" },
  { id: "nutrition", label: "영양" },
  { id: "labs", label: "혈검" },
  { id: "weight", label: "체중" },
  { id: "board", label: "자료실" },
  { id: "support", label: "후원" },
  { id: "privacy", label: "개인정보" }
];

const operatorName = "전수현";
const supportAccountText = "카카오뱅크 79423347182 / 전수현";
const supportLink = "";
const DEFAULT_CAT_LIMIT_PER_USER = 5;
const MAX_CAT_LIMIT_PER_USER = 20;

const healthOptions = {
  kidney: {
    label: "신장질환(CKD/신부전)",
    detail: "BUN/CREA/SDMA, 인·수분 관리"
  },
  aki: {
    label: "급성 신손상(AKI)",
    detail: "최근 급격한 신장수치 변화"
  },
  proteinuria: {
    label: "단백뇨/UPC 관리",
    detail: "UPC, 혈압, 신장 처방약 확인"
  },
  hypertension: {
    label: "고혈압",
    detail: "혈압 측정과 안저·신장 상태 관찰"
  },
  diabetes: {
    label: "당뇨/혈당 관리",
    detail: "식사 시간, 혈당, 인슐린 기록"
  },
  obesity: {
    label: "비만/체중감량",
    detail: "BCS와 목표 체중 관리"
  },
  underweight: {
    label: "저체중/체중감소",
    detail: "섭취량, 근육량, 식욕 변화 관찰"
  },
  pancreatitis: {
    label: "췌장염/fPL 관리",
    detail: "fPL, 구토, 식욕부진 기록"
  },
  gi: {
    label: "구토·설사/소화기",
    detail: "횟수, 색, 변 상태 기록"
  },
  dental: {
    label: "구내염/치아 통증",
    detail: "통증, 침흘림, 식사 거부 관찰"
  },
  heart: {
    label: "심장질환/수액 주의",
    detail: "수액량 조절은 병원 지시 우선"
  },
  liver: {
    label: "간담도 질환",
    detail: "ALT/AST/ALP, 황달 여부 확인"
  },
  urinary: {
    label: "방광염/요로결석",
    detail: "배뇨 횟수, 혈뇨, 통증 관찰"
  },
  anemia: {
    label: "빈혈/HCT 관리",
    detail: "HCT/HGB, 잇몸색, 활력 기록"
  },
  thyroid: {
    label: "갑상샘기능항진증",
    detail: "체중감소, 식욕, T4 수치 관리"
  },
  other: {
    label: "기타/병원 상담 중",
    detail: "진단명 확정 전 임시 표시"
  }
};

const medicationPresets = [
  { key: "phosphate-binder", label: "인흡착제", category: "인흡착제", classification: "인흡착제" },
  { key: "renamezin", label: "레나메진", category: "처방약(병원)", classification: "요독흡착제" },
  { key: "probiotic", label: "유산균", category: "영양제", classification: "유산균" },
  { key: "omega3", label: "오메가3", category: "영양제", classification: "오메가3" },
  { key: "antiemetic", label: "항구토제", category: "처방약(병원)", classification: "항구토제" },
  { key: "pancreas-support", label: "췌장보조제", category: "보조제", classification: "췌장보조제" },
  { key: "potassium", label: "칼륨보조제", category: "보조제", classification: "칼륨보조제" },
  { key: "cobalamin", label: "코발라민", category: "영양제", classification: "코발라민" },
  { key: "aminavast", label: "아미나바스트", category: "보조제", classification: "아미나바스트" },
  { key: "liver-support", label: "간보조제", category: "보조제", classification: "간보조제" }
];

const fluidTypeOptions = [
  "하트만",
  "NS 0.9",
  "LRS",
  "Plasma-Lyte",
  "Normosol-R",
  "D5W",
  "기타"
];

const vomitColorOptions = ["없음", "투명/거품", "노랑", "사료색", "갈색", "분홍/혈색", "기타"];
const stoolColorOptions = ["없음", "정상 갈색", "짙은 갈색", "검정", "노랑", "초록", "붉은 혈색", "회색", "기타"];
const stoolStateOptions = ["정상", "무른변", "설사", "물설사", "변비", "혈변 의심"];

const labFieldGroups = [
  {
    title: "신장·전해질",
    description: "신장수치, 전해질, 요검사 핵심 항목",
    fields: [
      { key: "bun", label: "BUN", unit: "mg/dL", step: "0.1", digits: 1 },
      { key: "crea", label: "CREA", unit: "mg/dL", step: "0.01", digits: 2 },
      { key: "sdma", label: "SDMA", unit: "ug/dL", step: "0.1", digits: 1 },
      { key: "phos", label: "P / Phos", unit: "mg/dL", step: "0.1", digits: 1 },
      { key: "ph", label: "pH", unit: "", step: "0.01", digits: 2 },
      { key: "ca", label: "Ca", unit: "mg/dL", step: "0.1", digits: 1 },
      { key: "k", label: "K", unit: "mmol/L", step: "0.01", digits: 2 },
      { key: "na", label: "Na", unit: "mmol/L", step: "1", digits: 0 },
      { key: "cl", label: "Cl", unit: "mmol/L", step: "1", digits: 0 },
      { key: "usg", label: "USG", unit: "", step: "0.001", digits: 3 },
      { key: "upc", label: "UPC / UPRO/UCREA", unit: "", step: "0.01", digits: 2 }
    ]
  },
  {
    title: "CBC",
    description: "빈혈, 백혈구, 혈소판 관련 항목",
    fields: [
      { key: "hct", label: "HCT", unit: "%", step: "0.1", digits: 1 },
      { key: "hgb", label: "HGB", unit: "g/dL", step: "0.1", digits: 1 },
      { key: "rbc", label: "RBC", unit: "10x6/uL", step: "0.01", digits: 2 },
      { key: "wbc", label: "WBC", unit: "10x3/uL", step: "0.01", digits: 2 },
      { key: "plt", label: "PLT", unit: "10x3/uL", step: "1", digits: 0 },
      { key: "retic", label: "RETIC#", unit: "10x3/uL", step: "0.1", digits: 1 }
    ]
  },
  {
    title: "화학·염증",
    description: "간수치, 단백, 혈당, 염증 수치",
    fields: [
      { key: "alb", label: "ALB", unit: "g/dL", step: "0.1", digits: 1 },
      { key: "tp", label: "TP", unit: "g/dL", step: "0.1", digits: 1 },
      { key: "glob", label: "GLOB", unit: "g/dL", step: "0.1", digits: 1 },
      { key: "alt", label: "ALT", unit: "U/L", step: "1", digits: 0 },
      { key: "ast", label: "AST", unit: "U/L", step: "1", digits: 0 },
      { key: "alkp", label: "ALKP / ALP", unit: "U/L", step: "1", digits: 0 },
      { key: "glu", label: "GLU", unit: "mg/dL", step: "1", digits: 0 },
      { key: "chol", label: "Cholesterol", unit: "mg/dL", step: "1", digits: 0 },
      { key: "fsaa", label: "fSAA", unit: "ug/ml", step: "0.1", digits: 1 }
    ]
  },
  {
    title: "췌장",
    description: "췌장염 모니터링에 참고하는 항목",
    fields: [
      { key: "fpl", label: "fPL", unit: "ug/L", step: "0.1", digits: 1 }
    ]
  }
];

const labSummaryKeys = ["bun", "crea", "sdma", "phos", "ph", "hct", "fpl", "usg"];
const labTrendRanges = [
  { key: "3m", label: "3개월", title: "최근 3개월", days: 92 },
  { key: "6m", label: "6개월", title: "최근 6개월", days: 183 },
  { key: "1y", label: "1년", title: "최근 1년", days: 366 },
  { key: "all", label: "전체", title: "전체", days: null }
];
const weightTrendRanges = labTrendRanges;
const reportRanges = labTrendRanges;
const reportSectionOptions = [
  { key: "profile", label: "기본 정보" },
  { key: "routines", label: "수액·투약 루틴" },
  { key: "labs", label: "혈검 수치" },
  { key: "weight", label: "체중 기록" },
  { key: "symptoms", label: "증상 기록" },
  { key: "questions", label: "병원 질문" }
];
const trendPointGapPx = 14;

const PDFJS_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs";
const PDFJS_WORKER_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs";

const labPdfAliases = {
  bun: ["BUN"],
  crea: ["CREA", "CRE", "Creatinine"],
  sdma: ["SDMA"],
  phos: ["PHOS", "Phosphorus", "P"],
  ph: ["pH"],
  ca: ["Ca", "Calcium"],
  k: ["K", "Potassium"],
  na: ["Na", "Sodium"],
  cl: ["Cl", "Chloride"],
  usg: ["USG", "SG"],
  upc: ["UPC", "UPRO/UCREA", "UPCR"],
  hct: ["HCT", "PCV"],
  hgb: ["HGB", "Hb"],
  rbc: ["RBC"],
  wbc: ["WBC"],
  plt: ["PLT", "Platelet"],
  retic: ["RETIC#", "RETIC"],
  alb: ["ALB", "Albumin"],
  tp: ["TP", "Total Protein"],
  glob: ["GLOB", "Globulin"],
  alt: ["ALT"],
  ast: ["AST"],
  alkp: ["ALKP", "ALP"],
  glu: ["GLU", "Glucose"],
  chol: ["Cholesterol", "CHOL"],
  fsaa: ["fSAA", "SAA"],
  fpl: ["fPL", "Spec fPL"]
};

const labPdfExpectedRanges = {
  ph: [5, 9],
  ca: [4, 20],
  k: [1, 10],
  na: [100, 200],
  cl: [80, 160],
  usg: [1, 1.1],
  hct: [5, 80],
  hgb: [2, 25],
  rbc: [1, 20],
  wbc: [0, 100],
  plt: [0, 1200]
};

const labReferenceRanges = {
  bun: { low: 16, high: 36, source: "일반 성묘 참고" },
  crea: { low: 0.8, high: 2.4, source: "일반 성묘 참고" },
  sdma: { low: 0, high: 14, source: "일반 성묘 참고" },
  phos: { low: 2.9, high: 6.3, source: "일반 성묘 참고" },
  ca: { low: 8.9, high: 11.1, source: "일반 성묘 참고" },
  k: { low: 3.6, high: 5.2, source: "일반 성묘 참고" },
  na: { low: 147, high: 157, source: "일반 성묘 참고" },
  hct: { low: 30.3, high: 52.3, source: "일반 성묘 참고" }
};

const seedFoods = [
  {
    id: "seed_renal_dry",
    name: "신장 케어 건식 예시",
    brand: "샘플 데이터",
    type: "건식",
    kcal100g: 392,
    moisture: 8,
    protein: 27,
    fat: 15,
    fiber: 4,
    ash: 5.8,
    phosphorus: 0.45,
    sodium: 0.35,
    notes: "실제 제품 라벨과 제조사 자료로 값을 확인하세요."
  },
  {
    id: "seed_adult_dry",
    name: "성묘 유지 건식 예시",
    brand: "샘플 데이터",
    type: "건식",
    kcal100g: 380,
    moisture: 9,
    protein: 34,
    fat: 16,
    fiber: 3,
    ash: 7,
    phosphorus: 0.9,
    sodium: 0.42,
    notes: "일반 성묘용 예시값입니다."
  },
  {
    id: "seed_renal_wet",
    name: "신장 케어 습식 파테 예시",
    brand: "샘플 데이터",
    type: "습식",
    kcal100g: 108,
    moisture: 76,
    protein: 7.2,
    fat: 5.8,
    fiber: 1,
    ash: 1.4,
    phosphorus: 0.12,
    sodium: 0.09,
    notes: "습식은 수분 함량 때문에 DM 기준 비교가 특히 중요합니다."
  },
  {
    id: "seed_recovery_wet",
    name: "회복기 고열량 습식 예시",
    brand: "샘플 데이터",
    type: "습식",
    kcal100g: 126,
    moisture: 72,
    protein: 10,
    fat: 7,
    fiber: 0.6,
    ash: 2,
    phosphorus: 0.21,
    sodium: 0.18,
    notes: "식욕부진, 체중감소가 있으면 담당 수의사와 급여 목표를 맞추세요."
  }
];

const seedResources = [
  {
    id: "resource_cafe",
    category: "커뮤니티",
    title: "신장질환을 이긴 고양이 네이버 카페",
    summary: "환묘 집사들이 경험과 자료를 나누는 커뮤니티입니다.",
    url: "https://cafe.naver.com/catnkidney/",
    tags: ["카페", "경험공유"]
  },
  {
    id: "resource_merck_rer",
    category: "영양",
    title: "Merck Veterinary Manual: 소동물 영양 요구량",
    summary: "RER 계산식과 반려동물 영양 기본 개념을 확인할 수 있습니다.",
    url: "https://www.merckvetmanual.com/management-and-nutrition/nutrition-small-animals/nutritional-requirements-of-small-animals",
    tags: ["RER", "칼로리"]
  },
  {
    id: "resource_aaha_life",
    category: "영양",
    title: "AAHA/AAFP Feline Life Stage Guidelines",
    summary: "고양이 생애 단계별 영양, BCS, 체중관리 기준을 다룹니다.",
    url: "https://www.aaha.org/resources/2021-aaha-aafp-feline-life-stage-guidelines/nutrition-and-weight-young-adult-cats/",
    tags: ["BCS", "체중"]
  },
  {
    id: "resource_aaha_weight",
    category: "영양",
    title: "AAHA Nutrition and Weight Management Guidelines",
    summary: "영양 평가와 체중관리 시 확인할 위험요인을 정리한 자료입니다.",
    url: "https://www.aaha.org/resources/2021-aaha-nutrition-and-weight-management-guidelines/home/",
    tags: ["평가", "간식"]
  },
  {
    id: "resource_iris",
    category: "신장",
    title: "IRIS CKD Guidelines",
    summary: "고양이 만성신장질환의 단계, 모니터링, 치료 목표를 확인할 수 있습니다.",
    url: "https://www.iris-kidney.com/guidelines/",
    tags: ["CKD", "수의사상담"]
  }
];

const app = document.querySelector("#app");
const state = loadState();
let toastText = "";
let toastTimer = null;
let remoteSaveTimer = null;
let isApplyingRemoteState = false;
let adminUsers = [];
let adminStatusFilter = "pending";
let adminSearchQuery = "";
let adminCounts = { pending: 0, approved: 0, rejected: 0 };
let adminLoadedStatus = "";
let adminLoading = false;
let adminError = "";
let boardPosts = [];
let boardLoaded = false;
let boardLoading = false;
let boardError = "";
let adminBoardPosts = [];
let adminBoardStatusFilter = "pending";
let adminBoardSearchQuery = "";
let adminBoardCounts = { pending: 0, approved: 0, rejected: 0 };
let adminBoardLoadedStatus = "";
let adminBoardLoading = false;
let adminBoardError = "";

render();
hydrateRemoteState();
disableServiceWorkerCache();

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]");
  if (tab) {
    if (isAdminPath()) history.pushState({}, "", "/");
    state.activeTab = tab.dataset.tab;
    saveState();
    render();
    return;
  }

  const action = event.target.closest("[data-action]");
  if (!action) return;

  const { action: actionName } = action.dataset;
  handleAction(actionName, action);
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  handleForm(form.dataset.form, form);
});

document.addEventListener("change", (event) => {
  const catSwitcher = event.target.closest("[data-cat-switcher]");
  if (catSwitcher) {
    state.activeCatId = catSwitcher.value;
    saveState();
    render();
    return;
  }

  if (event.target.closest("#med-category")) {
    syncMedicationPresetPanel(event.target.form);
  }
  if (event.target.closest("#med-preset-select")) {
    syncMedicationPresetSelect(event.target.form);
  }
  if (event.target.closest("#lab-pdf")) {
    handleLabPdfUpload(event.target);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.closest("#lab-pdf")) {
    handleLabPdfUpload(event.target);
  }
});

function defaultState() {
  return {
    version: 1,
    sessionUserId: null,
    pendingSignup: null,
    activeTab: "dashboard",
    activeCatId: null,
    editingCatId: null,
    editingMedicationPlanId: null,
    users: [],
    cats: [],
    fluidPlans: [],
    fluidLogs: [],
    medicationPlans: [],
    medicationLogs: [],
    symptomLogs: [],
    labLogs: [],
    weightLogs: [],
    customFoods: [],
    customResources: [],
    posts: [],
    foodQuery: "",
    selectedFoodId: "seed_renal_dry",
    nutritionResult: null,
    mixResult: null,
    snackResult: null,
    selectedLabTrendKey: "crea",
    selectedLabTrendRange: "3m",
    selectedWeightTrendRange: "3m",
    reportSettings: {
      catId: "",
      range: "3m",
      sections: reportSectionOptions.map((section) => section.key),
      questions: ""
    },
    showDashboardReport: false
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    const base = defaultState();
    if (!saved) return base;
    return {
      ...base,
      ...saved,
      pendingSignup: saved.pendingSignup && typeof saved.pendingSignup === "object" ? saved.pendingSignup : null,
      users: Array.isArray(saved.users) ? saved.users : [],
      cats: Array.isArray(saved.cats) ? saved.cats : [],
      fluidPlans: Array.isArray(saved.fluidPlans) ? saved.fluidPlans : [],
      fluidLogs: Array.isArray(saved.fluidLogs) ? saved.fluidLogs : [],
      medicationPlans: Array.isArray(saved.medicationPlans) ? saved.medicationPlans : [],
      medicationLogs: Array.isArray(saved.medicationLogs) ? saved.medicationLogs : [],
      symptomLogs: Array.isArray(saved.symptomLogs) ? saved.symptomLogs : [],
      labLogs: Array.isArray(saved.labLogs) ? saved.labLogs : [],
      weightLogs: Array.isArray(saved.weightLogs) ? saved.weightLogs : [],
      customFoods: Array.isArray(saved.customFoods) ? saved.customFoods : [],
      customResources: Array.isArray(saved.customResources) ? saved.customResources : [],
      posts: Array.isArray(saved.posts) ? saved.posts : [],
      reportSettings:
        saved.reportSettings && typeof saved.reportSettings === "object"
          ? normalizeReportSettings(saved.reportSettings)
          : base.reportSettings,
      showDashboardReport: Boolean(saved.showDashboardReport)
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleRemoteSave();
}

function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || "";
}

function setAuthToken(token) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

function setAdminToken(token) {
  if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

function isAdminPath() {
  return window.location.pathname.replace(/\/$/, "") === "/admin";
}

function shouldUseLocalFallback(error) {
  return !error?.status || error.status === 404 || error.status === 503;
}

async function apiRequest(path, { method = "GET", body = null, auth = false } = {}) {
  const headers = { Accept: "application/json" };
  if (body) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || "요청 처리 중 오류가 발생했습니다.");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

async function adminApiRequest(path, { method = "GET", body = null } = {}) {
  const headers = {
    Accept: "application/json",
    "x-admin-token": getAdminToken()
  };
  if (body) headers["Content-Type"] = "application/json";
  const response = await fetch(path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || "관리자 요청 처리 중 오류가 발생했습니다.");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

function replaceState(nextState) {
  const base = defaultState();
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, base, nextState || {});
}

function upsertUser(user) {
  if (!user) return;
  const existing = state.users.find((item) => item.id === user.id);
  if (existing) {
    Object.assign(existing, user);
  } else {
    state.users.push(user);
  }
}

function rememberPendingSignup(user) {
  if (!user) return;
  state.pendingSignup = {
    id: user.id || "",
    email: user.email || "",
    naverId: user.naverId || "",
    cafeNickname: user.cafeNickname || user.name || "",
    approvalStatus: user.approvalStatus || "pending",
    approvalRequestedAt: user.approvalRequestedAt || user.createdAt || new Date().toISOString(),
    createdAt: user.createdAt || new Date().toISOString()
  };
}

function getPendingSignup() {
  const signup = state.pendingSignup;
  if (!signup || typeof signup !== "object") return null;
  return signup;
}

function buildRemoteState(user = currentUser()) {
  const publicUsers = user
    ? state.users
        .filter((item) => item.id === user.id)
        .map(({ password, ...publicUser }) => publicUser)
    : [];
  return {
    ...state,
    posts: [],
    users: publicUsers,
    sessionUserId: user?.id || state.sessionUserId
  };
}

function resetBoardCache() {
  boardPosts = [];
  boardLoaded = false;
  boardLoading = false;
  boardError = "";
}

function scheduleRemoteSave() {
  if (isApplyingRemoteState || !getAuthToken() || !currentUser()) return;
  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(() => {
    saveRemoteState();
  }, REMOTE_SAVE_DELAY_MS);
}

async function saveRemoteState() {
  const user = currentUser();
  if (!user || !getAuthToken()) return;
  try {
    await apiRequest("/api/state", {
      method: "PUT",
      auth: true,
      body: { state: buildRemoteState(user) }
    });
  } catch (error) {
    if (error.status === 401 || error.status === 403) clearAuthToken();
  }
}

async function hydrateRemoteState() {
  if (!getAuthToken()) return;
  try {
    const payload = await apiRequest("/api/state", { auth: true });
    isApplyingRemoteState = true;
    replaceState(payload.state || {});
    upsertUser(payload.user);
    state.sessionUserId = payload.user?.id || state.sessionUserId;
    isApplyingRemoteState = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    render();
  } catch (error) {
    isApplyingRemoteState = false;
    if (error.status === 401 || error.status === 403) clearAuthToken();
  }
}

function render() {
  const isAdmin = isAdminPath();
  let active = tabs.some((tab) => tab.id === state.activeTab)
    ? state.activeTab
    : "dashboard";
  const user = currentUser();
  if (!isAdmin && user && getUserCats().length === 0 && !["cats", "support", "privacy", "board"].includes(active)) {
    active = "cats";
  }
  state.activeTab = active;

  app.innerHTML = `
    <div class="app">
      ${renderHeader()}
      <main class="main">${isAdmin ? renderAdminView() : renderView(active)}</main>
      ${renderFooter()}
      ${toastText ? `<div class="toast" role="status">${escapeHTML(toastText)}</div>` : ""}
    </div>
  `;

  if (isAdmin) {
    queueAdminUsersLoad();
    queueAdminBoardPostsLoad();
  }
  if (!isAdmin && active === "board") queueBoardPostsLoad();

  requestAnimationFrame(() => {
    syncActiveTabPosition();
    if (active === "weight") drawWeightChart("weight-chart", getWeightTrendLogs(getActiveCatWeightLogs()));
    if (active === "dashboard") drawWeightChart("dashboard-weight-chart", getActiveCatWeightLogs());
    if (active === "labs") {
      const labLogs = getActiveCatLabLogs();
      drawLabTrendChart(
        "lab-trend-chart",
        labLogs,
        getSelectedLabTrendKey(labLogs),
        getSelectedLabTrendRange()
      );
    }
  });
}

function syncActiveTabPosition() {
  const activeTab = document.querySelector(".tabs .tab.is-active");
  if (!activeTab) return;
  activeTab.scrollIntoView({
    block: "nearest",
    inline: "center"
  });
}

function renderHeader() {
  const user = currentUser();
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <button class="brand-button" type="button" data-tab="dashboard" aria-label="홈으로 이동">
            <img class="brand-logo" src="/assets/logo.svg" alt="신장질환을 이긴 고양이 케어" />
          </button>
        </div>
        <nav class="tabs" aria-label="주요 메뉴">
          ${tabs
            .map(
              (tab) => `
                <button class="tab ${state.activeTab === tab.id ? "is-active" : ""}" data-tab="${tab.id}">
                  ${tab.label}
                </button>
              `
            )
            .join("")}
        </nav>
        <div class="account">
          ${
            user
              ? `${renderHeaderCatSwitcher()}<span class="account-name">${escapeHTML(user.name)}</span><button class="btn secondary small" data-action="logout">로그아웃</button>`
              : `<span>비회원</span><button class="btn primary small" data-action="start-demo">둘러보기</button>`
          }
        </div>
      </div>
    </header>
  `;
}

function renderHeaderCatSwitcher() {
  const cats = getUserCats();
  if (!cats.length) return "";
  const activeCat = getActiveCat();
  return `
    <label class="cat-switcher">
      <span>현재</span>
      <select class="select compact" data-cat-switcher aria-label="현재 선택 고양이">
        ${cats
          .map((cat) => `<option value="${cat.id}" ${cat.id === activeCat?.id ? "selected" : ""}>${escapeHTML(cat.name)}</option>`)
          .join("")}
      </select>
    </label>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <p>© 2026 신장질환을 이긴 고양이 케어. All rights reserved.</p>
      <p>운영자: ${escapeHTML(operatorName)}</p>
      <p>본 서비스는 고양이 환묘 보호자의 기록 관리를 돕기 위한 무료 베타 서비스이며, 수의사의 진료·처방을 대체하지 않습니다.</p>
    </footer>
  `;
}

function renderView(active) {
  if (active === "support") return renderSupportView();
  if (active === "privacy") return renderPrivacyView();
  if (!currentUser()) return renderAuthView();
  if (active === "cats") return renderCatView();
  if (active === "fluid") return renderFluidView();
  if (active === "medication") return renderMedicationView();
  if (active === "symptoms") return renderSymptomsView();
  if (active === "nutrition") return renderNutritionView();
  if (active === "labs") return renderLabsView();
  if (active === "weight") return renderWeightView();
  if (active === "board") return renderBoardView();
  return renderDashboardView();
}

function renderAuthView() {
  return `
    <section class="view-title">
      <div>
        <h1>신장질환을 이긴 고양이 케어</h1>
        <p>회원가입 또는 로그인 후 케어 도구를 사용할 수 있습니다.</p>
      </div>
    </section>
    ${renderAuthPanel()}
  `;
}

function renderDashboardView() {
  const user = currentUser();
  const activeCat = getActiveCat();
  const calorie = activeCat ? calorieProfile(activeCat) : null;
  const upcoming = user ? getUpcomingCareOccurrences({ limit: 5, catId: activeCat?.id }) : [];
  const lastWeight = getActiveCatWeightLogs().at(-1);
  const todayLabel = formatTodayLabel();

  return `
    <section class="view-title">
      <div>
        <h1>오늘의 케어</h1>
        <p class="view-date">${todayLabel}</p>
        <p>수액, 투약·영양제, 식사, 체중 기록을 한 화면에서 확인합니다. ${renderCurrentCatText(activeCat)}</p>
      </div>
      <div class="actions">
        <button class="btn report-cta" data-action="toggle-dashboard-report" ${activeCat ? "" : "disabled"}>내 데이터 보내기</button>
      </div>
    </section>

    ${user ? "" : renderAuthPanel()}

    <section class="grid four" aria-label="오늘 요약">
      <div class="metric good">
        <div class="metric-label">선택된 고양이</div>
        <div class="metric-value">${activeCat ? escapeHTML(activeCat.name) : "없음"}</div>
        <div class="metric-note">${activeCat ? renderCatShortMeta(activeCat) : "프로필을 먼저 추가하세요"}</div>
      </div>
      <div class="metric">
        <div class="metric-label">하루 칼로리</div>
        <div class="metric-value">${calorie ? `${formatNumber(calorie.target)} kcal` : "-"}</div>
        <div class="metric-note">${calorie ? `권장 범위 ${formatNumber(calorie.low)}-${formatNumber(calorie.high)} kcal` : "체중이 필요합니다"}</div>
      </div>
      <div class="metric warn">
        <div class="metric-label">다음 케어</div>
        <div class="metric-value">${upcoming.length ? upcoming[0].time : "-"}</div>
        <div class="metric-note">${upcoming.length ? `${upcoming[0].date} · ${escapeHTML(upcoming[0].cat.name)} · ${upcoming[0].kindLabel}` : "등록된 일정 없음"}</div>
      </div>
      <div class="metric hot">
        <div class="metric-label">최근 체중</div>
        <div class="metric-value">${lastWeight ? `${formatNumber(lastWeight.weightKg, 2)} kg` : "-"}</div>
        <div class="metric-note">${lastWeight ? lastWeight.date : "기록을 추가하세요"}</div>
      </div>
    </section>

    <div class="grid sidebar" style="margin-top: 16px">
      <div class="grid">
        ${renderDashboardCatPanel()}
        ${renderCaloriePanel(activeCat)}
      </div>
      <div class="grid">
        ${renderUpcomingPanel(upcoming)}
        ${renderDashboardLabPanel()}
        ${renderDashboardSymptomPanel()}
        ${renderDashboardWeightPanel()}
      </div>
    </div>
    ${user && activeCat && state.showDashboardReport ? renderDashboardReportPanel() : ""}
  `;
}

function renderCatView() {
  const cats = getUserCats();
  const activeCat = getActiveCat();
  return `
    <section class="view-title">
      <div>
        <h1>고양이 프로필</h1>
        <p>${cats.length ? "케어 기록에 사용할 고양이를 선택하고 프로필을 관리합니다." : "첫 고양이 프로필을 등록하면 케어 도구를 사용할 수 있습니다."}</p>
      </div>
    </section>

    <div class="grid sidebar">
      ${renderCatPanel()}
      <div class="grid">
        ${renderCaloriePanel(activeCat)}
        <section class="panel">
          <div class="panel-inner">
            <div class="panel-head">
              <div>
                <h2>다음 단계</h2>
                <p>${activeCat ? `${escapeHTML(activeCat.name)} 기준으로 기록을 시작하세요.` : "프로필 등록 후 수액, 투약, 혈검, 체중 메뉴가 연결됩니다."}</p>
              </div>
            </div>
            <div class="actions">
              <button class="btn secondary" data-tab="fluid" ${activeCat ? "" : "disabled"}>수액</button>
              <button class="btn secondary" data-tab="medication" ${activeCat ? "" : "disabled"}>투약</button>
              <button class="btn secondary" data-tab="labs" ${activeCat ? "" : "disabled"}>혈검</button>
              <button class="btn secondary" data-tab="weight" ${activeCat ? "" : "disabled"}>체중</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderCurrentCatText(cat) {
  return cat ? `현재 선택: ${escapeHTML(cat.name)}` : "고양이를 먼저 등록하세요.";
}

function renderSupportView() {
  return `
    <section class="view-title">
      <div>
        <h1>운영비 후원</h1>
        <p>도움이 되셨다면 커피 한 잔 마음으로 서버비와 운영비를 보태주세요.</p>
      </div>
    </section>

    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>후원 안내</h2>
              <p>운영자 ${escapeHTML(operatorName)} 개인 명의로 운영비와 서버비를 관리합니다.</p>
            </div>
          </div>
          <div class="grid two">
            <div class="metric good">
              <div class="metric-label">서비스 이용</div>
              <div class="metric-value">무료</div>
              <div class="metric-note">후원 여부와 무관하게 무료로 사용할 수 있습니다.</div>
            </div>
            <div class="metric warn">
              <div class="metric-label">사용 목적</div>
              <div class="metric-value">운영비</div>
              <div class="metric-note">서버, DB, 도메인, 보안·유지보수 비용</div>
            </div>
          </div>
          <div class="notice" style="margin-top: 14px">
            본 후원은 서비스의 안정적인 서버 운영 및 유지 관리를 위한 자발적 운영비 후원입니다. 후원금은 서버 비용과 서비스 운영에 사용되며, 기부금영수증은 발급되지 않습니다.
            <br /><br />
            후원 여부는 회원 승인, 자료실 이용, 서비스 이용 가능 여부 등에 어떠한 영향도 미치지 않으며, 모든 회원은 동일한 기준으로 서비스를 이용하실 수 있습니다.
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>후원 방법</h2>
              <p>작은 후원은 이 서비스를 계속 무료로 유지하는 데 큰 힘이 됩니다.</p>
            </div>
          </div>
          ${
            supportAccountText || supportLink
              ? `<div class="list">
                  ${
                    supportAccountText
                      ? `<article class="item">
                          <div class="item-head">
                            <div>
                              <h3>커피 후원 계좌</h3>
                              <p>${escapeHTML(supportAccountText)}</p>
                            </div>
                            <button class="btn small secondary" data-action="copy-support-account">복사</button>
                          </div>
                        </article>`
                      : ""
                  }
                  ${
                    supportLink
                      ? `<a class="btn primary" href="${escapeAttr(supportLink)}" target="_blank" rel="noreferrer">후원 링크 열기</a>`
                      : ""
                  }
                </div>`
              : `<div class="empty">후원 계좌 또는 송금 링크 준비 중입니다.</div>`
          }
        </div>
      </section>
    </div>

    <section class="panel" style="margin-top: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>운영 원칙</h2>
            <p>무료 커뮤니티 도구로 유지하기 위한 약속입니다.</p>
          </div>
        </div>
        <div class="grid three">
          <div class="item">
            <h3>무료 유지</h3>
            <p>핵심 케어 기록 기능은 유료화하지 않고 무료로 제공하는 방향을 우선합니다.</p>
          </div>
          <div class="item">
            <h3>투명한 사용</h3>
            <p>후원금은 서버비, DB 비용, 도메인, 보안과 유지보수 비용에 사용합니다.</p>
          </div>
          <div class="item">
            <h3>진료 대체 금지</h3>
            <p>앱의 계산과 기록은 보호자 보조용이며 수의사의 진료와 처방을 대체하지 않습니다.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPrivacyView() {
  const user = currentUser();
  return `
    <section class="view-title">
      <div>
        <h1>개인정보·데이터 관리</h1>
        <p>서비스 이용에 필요한 정보와 보호자 데이터 관리 방법을 확인합니다.</p>
      </div>
      ${user ? `<button class="btn secondary" data-action="export-data">내 데이터 내보내기</button>` : ""}
    </section>

    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>개인정보 처리 안내</h2>
              <p>무료 베타 서비스 운영을 위한 최소 정보만 사용합니다.</p>
            </div>
          </div>
          <div class="privacy-list">
            <article class="item">
              <h3>수집 항목</h3>
              <p>회원 확인을 위한 네이버 ID, 신이고 닉네임, 이메일, 비밀번호(서버 DB에서는 해시 처리)와 고양이 케어 기록을 저장합니다.</p>
            </article>
            <article class="item">
              <h3>이용 목적</h3>
              <p>신이고 회원 승인, 로그인, 고양이별 수액·투약·혈검·체중·증상 기록 관리에만 사용합니다.</p>
            </article>
            <article class="item">
              <h3>보관과 삭제</h3>
              <p>회원이 탈퇴하면 계정과 저장된 케어 데이터는 삭제됩니다. 법적 의무가 생기는 경우가 아니라면 제3자에게 판매하거나 제공하지 않습니다.</p>
            </article>
            <article class="item">
              <h3>주의</h3>
              <p>민감한 진료 기록을 입력할 수 있으므로 공용 기기에서는 로그아웃하고, 의료 판단은 담당 수의사 안내를 우선하세요.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>계정 관리</h2>
              <p>${user ? `${escapeHTML(user.name)} 계정` : "로그인 후 데이터 관리 기능을 사용할 수 있습니다."}</p>
            </div>
          </div>
          ${
            user
              ? `
                <div class="grid">
                  <div class="notice">
                    탈퇴 전 <strong>내 데이터 내보내기</strong>로 기록을 보관할 수 있습니다. 탈퇴하면 로그인 계정, 고양이 프로필, 케어 기록이 삭제됩니다.
                  </div>
                  <div class="actions">
                    <button class="btn secondary" data-action="export-data">내 데이터 내보내기</button>
                    <button class="btn danger" data-action="delete-account">회원 탈퇴 및 데이터 삭제</button>
                  </div>
                </div>
              `
              : `<div class="empty">회원가입 또는 로그인 후 이용할 수 있습니다.</div>`
          }
        </div>
      </section>
    </div>
  `;
}

function renderAdminView() {
  const hasToken = Boolean(getAdminToken());
  return `
    <section class="view-title">
      <div>
        <h1>관리자 승인</h1>
        <p>가입 신청과 자료실 등록 신청을 승인하거나 보류합니다.</p>
      </div>
      <div class="actions">
        <button class="btn secondary" data-action="admin-refresh" ${hasToken ? "" : "disabled"}>새로고침</button>
        <button class="btn ghost" data-tab="dashboard">서비스로 돌아가기</button>
      </div>
    </section>

    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>관리자 토큰</h2>
              <p>Render 환경변수 ADMIN_TOKEN 값을 입력합니다.</p>
            </div>
          </div>
          <form class="grid" data-form="admin-token">
            <div class="form-field">
              <label for="admin-token">ADMIN_TOKEN</label>
              <input class="control" id="admin-token" name="adminToken" type="password" placeholder="${hasToken ? "저장된 토큰 사용 중" : "관리자 토큰"}" autocomplete="off" />
              <p class="field-help">${hasToken ? "이 브라우저에 관리자 토큰이 저장되어 있습니다." : "토큰은 이 브라우저 localStorage에만 저장됩니다."}</p>
            </div>
            <div class="actions">
              <button class="btn primary" type="submit">토큰 저장</button>
              <button class="btn secondary" type="button" data-action="admin-clear-token" ${hasToken ? "" : "disabled"}>토큰 삭제</button>
            </div>
          </form>
          <div class="notice" style="margin-top: 14px">
            관리자 화면 주소는 <strong>/admin</strong>입니다. 토큰이 없는 사용자는 가입 신청 정보를 볼 수 없습니다.
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>가입 신청 상태</h2>
              <p>${hasToken ? "상태별 신청자를 검색하고 운영 메모를 남깁니다." : "관리자 토큰을 먼저 저장하세요."}</p>
            </div>
          </div>
          <form class="admin-search" data-form="admin-search">
            <label class="sr-only" for="admin-search-query">가입 신청 검색</label>
            <input
              class="control"
              id="admin-search-query"
              name="query"
              value="${escapeAttr(adminSearchQuery)}"
              placeholder="닉네임, 네이버 ID, 이메일, 운영 메모 검색"
              ${hasToken ? "" : "disabled"}
            />
            <button class="btn secondary" type="submit" ${hasToken ? "" : "disabled"}>검색</button>
            <button class="btn ghost" type="button" data-action="admin-search-clear" ${hasToken && adminSearchQuery ? "" : "disabled"}>초기화</button>
          </form>
          <div class="actions">
            ${renderAdminStatusButton("pending", "승인 대기")}
            ${renderAdminStatusButton("approved", "승인됨")}
            ${renderAdminStatusButton("rejected", "보류")}
          </div>
          ${adminError ? `<p class="field-help is-error" style="margin-top: 12px">${escapeHTML(adminError)}</p>` : ""}
          ${adminLoading ? `<div class="empty" style="margin-top: 12px">신청 목록을 불러오는 중입니다.</div>` : ""}
          ${
            hasToken && !adminLoading && !adminError
              ? `<div class="list" style="margin-top: 12px">
                  ${adminUsers.length ? adminUsers.map(renderAdminUserItem).join("") : `<div class="empty">${adminSearchQuery ? "검색 결과가 없습니다." : "해당 상태의 가입 신청이 없습니다."}</div>`}
                </div>`
              : ""
          }
        </div>
      </section>
    </div>

    <section class="panel" style="margin-top: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>자료실 등록 승인</h2>
            <p>${hasToken ? "회원이 신청한 자료를 확인한 뒤 공개하거나 보류합니다." : "관리자 토큰을 먼저 저장하세요."}</p>
          </div>
        </div>
        <form class="admin-search" data-form="admin-board-search">
          <label class="sr-only" for="admin-board-search-query">자료 신청 검색</label>
          <input
            class="control"
            id="admin-board-search-query"
            name="query"
            value="${escapeAttr(adminBoardSearchQuery)}"
            placeholder="제목, 내용, 작성자, 분류, 운영 메모 검색"
            ${hasToken ? "" : "disabled"}
          />
          <button class="btn secondary" type="submit" ${hasToken ? "" : "disabled"}>검색</button>
          <button class="btn ghost" type="button" data-action="admin-board-search-clear" ${hasToken && adminBoardSearchQuery ? "" : "disabled"}>초기화</button>
        </form>
        <div class="actions">
          ${renderAdminBoardStatusButton("pending", "승인 대기")}
          ${renderAdminBoardStatusButton("approved", "공개됨")}
          ${renderAdminBoardStatusButton("rejected", "보류")}
        </div>
        ${adminBoardError ? `<p class="field-help is-error" style="margin-top: 12px">${escapeHTML(adminBoardError)}</p>` : ""}
        ${adminBoardLoading ? `<div class="empty" style="margin-top: 12px">자료 신청 목록을 불러오는 중입니다.</div>` : ""}
        ${
          hasToken && !adminBoardLoading && !adminBoardError
            ? `<div class="list" style="margin-top: 12px">
                ${adminBoardPosts.length ? adminBoardPosts.map(renderAdminBoardItem).join("") : `<div class="empty">${adminBoardSearchQuery ? "검색 결과가 없습니다." : "해당 상태의 자료 신청이 없습니다."}</div>`}
              </div>`
            : ""
        }
      </div>
    </section>
  `;
}

function renderAdminStatusButton(status, label) {
  const count = Number(adminCounts?.[status] || 0);
  return `
    <button
      class="btn small ${adminStatusFilter === status ? "primary" : "secondary"}"
      data-action="admin-filter"
      data-status="${status}"
    >
      ${label} <span class="btn-count">${count}</span>
    </button>
  `;
}

function renderAdminBoardStatusButton(status, label) {
  const count = Number(adminBoardCounts?.[status] || 0);
  return `
    <button
      class="btn small ${adminBoardStatusFilter === status ? "primary" : "secondary"}"
      data-action="admin-board-filter"
      data-status="${status}"
    >
      ${label} <span class="btn-count">${count}</span>
    </button>
  `;
}

function renderAdminUserItem(user) {
  const catLimit = getUserCatLimit(user);
  return `
    <article class="item admin-user-card">
      <div class="item-head">
        <div>
          <h3>${escapeHTML(user.cafeNickname || user.name)}</h3>
          <p>네이버 ID ${escapeHTML(user.naverId || "-")} · 이메일 ${escapeHTML(user.email || "-")}</p>
          <div class="chips">
            <span class="chip ${user.approvalStatus === "approved" ? "blue" : user.approvalStatus === "rejected" ? "coral" : "amber"}">${renderApprovalStatusLabel(user.approvalStatus)}</span>
            <span class="chip">신청 ${formatDateTime(user.approvalRequestedAt || user.createdAt)}</span>
            <span class="chip">고양이 한도 ${catLimit}마리</span>
            ${user.approvedAt ? `<span class="chip blue">승인 ${formatDateTime(user.approvedAt)}</span>` : ""}
            ${user.rejectedAt ? `<span class="chip coral">보류 ${formatDateTime(user.rejectedAt)}</span>` : ""}
          </div>
        </div>
        <div class="actions">
          <button class="btn small primary" data-action="admin-approval" data-id="${escapeAttr(user.id)}" data-status="approved" ${user.approvalStatus === "approved" ? "disabled" : ""}>승인</button>
          <button class="btn small warn" data-action="admin-approval" data-id="${escapeAttr(user.id)}" data-status="pending" ${user.approvalStatus === "pending" ? "disabled" : ""}>대기</button>
          <button class="btn small danger" data-action="admin-approval" data-id="${escapeAttr(user.id)}" data-status="rejected" ${user.approvalStatus === "rejected" ? "disabled" : ""}>보류</button>
        </div>
      </div>
      <form class="admin-note-form" data-form="admin-note">
        <input type="hidden" name="userId" value="${escapeAttr(user.id)}" />
        <input type="hidden" name="approvalStatus" value="${escapeAttr(user.approvalStatus || "pending")}" />
        <div class="form-grid">
          <div class="form-field full">
            <label for="admin-note-${escapeAttr(user.id)}">운영 메모</label>
            <textarea class="textarea" id="admin-note-${escapeAttr(user.id)}" name="adminNote" maxlength="1000" placeholder="닉네임 확인 결과, 보류 사유, 재확인 필요 사항">${escapeHTML(user.adminNote || "")}</textarea>
          </div>
          <div class="form-field">
            <label for="admin-cat-limit-${escapeAttr(user.id)}">고양이 등록 한도</label>
            <input
              class="control"
              id="admin-cat-limit-${escapeAttr(user.id)}"
              name="catLimit"
              type="number"
              min="1"
              max="${MAX_CAT_LIMIT_PER_USER}"
              step="1"
              value="${catLimit}"
            />
            <p class="field-help">기본 ${DEFAULT_CAT_LIMIT_PER_USER}마리, 구조·임보 등 예외 회원은 운영자가 조정할 수 있습니다.</p>
          </div>
        </div>
        <div class="actions">
          <button class="btn small secondary" type="submit">메모·한도 저장</button>
        </div>
      </form>
    </article>
  `;
}

function renderAdminBoardItem(post) {
  return `
    <article class="item admin-board-card">
      <div class="item-head">
        <div>
          <h3>${escapeHTML(post.title)}</h3>
          <p>${escapeHTML(post.author || "-")} · ${escapeHTML(post.category || "자료")} · ${formatDateTime(post.createdAt)}${post.catName ? ` · ${escapeHTML(post.catName)}` : ""}</p>
          <div class="chips">
            <span class="chip ${post.approvalStatus === "approved" ? "blue" : post.approvalStatus === "rejected" ? "coral" : "amber"}">${renderBoardStatusLabel(post.approvalStatus)}</span>
            ${post.approvedAt ? `<span class="chip blue">공개 ${formatDateTime(post.approvedAt)}</span>` : ""}
            ${post.rejectedAt ? `<span class="chip coral">보류 ${formatDateTime(post.rejectedAt)}</span>` : ""}
          </div>
        </div>
        <div class="actions">
          <button class="btn small primary" data-action="admin-board-approval" data-id="${escapeAttr(post.id)}" data-status="approved" ${post.approvalStatus === "approved" ? "disabled" : ""}>공개</button>
          <button class="btn small warn" data-action="admin-board-approval" data-id="${escapeAttr(post.id)}" data-status="pending" ${post.approvalStatus === "pending" ? "disabled" : ""}>대기</button>
          <button class="btn small danger" data-action="admin-board-approval" data-id="${escapeAttr(post.id)}" data-status="rejected" ${post.approvalStatus === "rejected" ? "disabled" : ""}>보류</button>
        </div>
      </div>
      <p class="post-body">${escapeHTML(post.body)}</p>
      <form class="admin-note-form" data-form="admin-board-note">
        <input type="hidden" name="postId" value="${escapeAttr(post.id)}" />
        <input type="hidden" name="approvalStatus" value="${escapeAttr(post.approvalStatus || "pending")}" />
        <label for="admin-board-note-${escapeAttr(post.id)}">운영 메모</label>
        <textarea class="textarea" id="admin-board-note-${escapeAttr(post.id)}" name="adminNote" maxlength="1000" placeholder="승인 메모, 보류 사유, 확인 필요 사항">${escapeHTML(post.adminNote || "")}</textarea>
        <div class="actions">
          <button class="btn small secondary" type="submit">메모 저장</button>
        </div>
      </form>
    </article>
  `;
}

function renderApprovalStatusLabel(status) {
  if (status === "approved") return "승인됨";
  if (status === "rejected") return "보류";
  return "승인 대기";
}

function renderBoardStatusLabel(status) {
  if (status === "approved") return "공개됨";
  if (status === "rejected") return "보류";
  return "승인 대기";
}

function queueAdminUsersLoad() {
  if (!getAdminToken() || adminLoading || adminLoadedStatus === getAdminLoadedKey()) return;
  loadAdminUsers();
}

function queueAdminBoardPostsLoad() {
  if (!getAdminToken() || adminBoardLoading || adminBoardLoadedStatus === getAdminBoardLoadedKey()) return;
  loadAdminBoardPosts();
}

async function loadAdminUsers() {
  if (!getAdminToken()) return;
  adminLoading = true;
  adminError = "";
  render();
  try {
    const params = new URLSearchParams({ status: adminStatusFilter });
    if (adminSearchQuery) params.set("q", adminSearchQuery);
    const payload = await adminApiRequest(`/api/admin/users?${params.toString()}`);
    adminUsers = payload.users || [];
    adminCounts = payload.counts || { pending: 0, approved: 0, rejected: 0 };
    adminLoadedStatus = getAdminLoadedKey();
  } catch (error) {
    adminUsers = [];
    adminLoadedStatus = getAdminLoadedKey();
    adminError = formatAdminError(error);
  } finally {
    adminLoading = false;
    render();
  }
}

async function loadAdminBoardPosts() {
  if (!getAdminToken()) return;
  adminBoardLoading = true;
  adminBoardError = "";
  render();
  try {
    const params = new URLSearchParams({ status: adminBoardStatusFilter });
    if (adminBoardSearchQuery) params.set("q", adminBoardSearchQuery);
    const payload = await adminApiRequest(`/api/admin/board-posts?${params.toString()}`);
    adminBoardPosts = payload.posts || [];
    adminBoardCounts = payload.counts || { pending: 0, approved: 0, rejected: 0 };
    adminBoardLoadedStatus = getAdminBoardLoadedKey();
  } catch (error) {
    adminBoardPosts = [];
    adminBoardLoadedStatus = getAdminBoardLoadedKey();
    adminBoardError = formatAdminError(error);
  } finally {
    adminBoardLoading = false;
    render();
  }
}

function getAdminLoadedKey() {
  return `${adminStatusFilter}:${adminSearchQuery}`;
}

function getAdminBoardLoadedKey() {
  return `${adminBoardStatusFilter}:${adminBoardSearchQuery}`;
}

function formatAdminError(error) {
  const code = error?.payload?.code;
  if (code === "database_not_configured") {
    return "DATABASE_URL이 설정되지 않았습니다. Render에서 PostgreSQL을 연결한 뒤 다시 시도해주세요.";
  }
  if (code === "admin_token_not_configured") {
    return "ADMIN_TOKEN이 서버 환경변수에 설정되지 않았습니다.";
  }
  if (code === "admin_required") {
    return "관리자 토큰이 올바르지 않습니다.";
  }
  return error?.message || "가입 신청 목록을 불러오지 못했습니다.";
}

async function updateAdminApproval(userId, approvalStatus, adminNote = "", options = {}) {
  if (!getAdminToken()) {
    showToast("관리자 토큰을 먼저 저장해주세요.");
    return;
  }
  const catLimit = normalizeCatLimit(options.catLimit);
  adminLoading = true;
  adminError = "";
  render();
  try {
    await adminApiRequest(`/api/admin/users/${encodeURIComponent(userId)}`, {
      method: "PATCH",
      body: { approvalStatus, adminNote, catLimit }
    });
    adminLoadedStatus = "";
    showToast(options.noteOnly ? "운영 메모와 등록 한도를 저장했습니다." : `${renderApprovalStatusLabel(approvalStatus)} 처리했습니다.`);
    await loadAdminUsers();
  } catch (error) {
    adminError = error.message || "승인 상태를 변경하지 못했습니다.";
    adminLoading = false;
    render();
  }
}

async function updateAdminBoardApproval(postId, approvalStatus, adminNote = "", options = {}) {
  if (!getAdminToken()) {
    showToast("관리자 토큰을 먼저 저장해주세요.");
    return;
  }
  adminBoardLoading = true;
  adminBoardError = "";
  render();
  try {
    await adminApiRequest(`/api/admin/board-posts/${encodeURIComponent(postId)}`, {
      method: "PATCH",
      body: { approvalStatus, adminNote }
    });
    adminBoardLoadedStatus = "";
    boardLoaded = false;
    showToast(options.noteOnly ? "자료 운영 메모를 저장했습니다." : `자료를 ${renderBoardStatusLabel(approvalStatus)} 처리했습니다.`);
    await loadAdminBoardPosts();
  } catch (error) {
    adminBoardError = error.message || "자료 승인 상태를 변경하지 못했습니다.";
    adminBoardLoading = false;
    render();
  }
}

function renderAuthPanel() {
  const pendingSignup = getPendingSignup();
  return `
    <section class="panel" style="margin-bottom: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>회원 시작</h2>
            <p>가입 신청은 신이고(신장질환을 이긴 고양이) 회원 확인 후 승인됩니다.</p>
          </div>
          <button class="btn primary" data-action="start-demo">데모 둘러보기</button>
        </div>
        <div class="auth-grid">
          ${pendingSignup ? renderPendingSignupPanel(pendingSignup) : renderSignupForm()}
          <form class="grid" data-form="login">
            <div class="section-head">
              <h2>로그인</h2>
              <p>관리자 승인 완료 후 사용할 수 있습니다.</p>
            </div>
            <div class="form-grid">
              <div class="form-field">
                <label for="login-email">이메일</label>
                <input class="control" id="login-email" name="email" type="email" value="${escapeAttr(pendingSignup?.email || "")}" required autocomplete="email" />
              </div>
              <div class="form-field">
                <label for="login-password">비밀번호</label>
                <input class="control" id="login-password" name="password" type="password" required autocomplete="current-password" />
              </div>
            </div>
            <button class="btn secondary" type="submit">로그인</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

function renderSignupForm() {
  return `
    <form class="grid" data-form="signup">
      <div class="section-head">
        <h2>회원가입 신청</h2>
        <p>운영자가 신이고 닉네임과 네이버 ID를 확인한 뒤 승인합니다.</p>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label for="signup-naver">네이버 ID</label>
          <input class="control" id="signup-naver" name="naverId" required autocomplete="username" />
        </div>
        <div class="form-field">
          <label for="signup-nickname">신이고 닉네임</label>
          <input class="control" id="signup-nickname" name="cafeNickname" required autocomplete="nickname" />
        </div>
        <div class="form-field">
          <label for="signup-email">이메일</label>
          <input class="control" id="signup-email" name="email" type="email" required autocomplete="email" />
        </div>
        <div class="form-field">
          <label for="signup-password">비밀번호</label>
          <input class="control" id="signup-password" name="password" type="password" minlength="4" required autocomplete="new-password" />
        </div>
      </div>
      <p class="field-help">승인 전에는 로그인할 수 없으며, 둘러보기로 먼저 기능을 확인할 수 있습니다.</p>
      <button class="btn primary" type="submit">가입 신청</button>
    </form>
  `;
}

function renderPendingSignupPanel(signup) {
  const requestedText = signup.approvalRequestedAt ? formatDateTime(signup.approvalRequestedAt) : "접수됨";
  return `
    <div class="signup-status">
      <div class="signup-status-head">
        <div>
          <p class="status-kicker">가입 신청 완료</p>
          <h2>승인 대기 중입니다</h2>
          <p>운영자가 신이고 회원 여부를 확인한 뒤 승인합니다.</p>
        </div>
        <span class="chip amber">가입 신청 중</span>
      </div>
      <dl class="signup-summary">
        <div>
          <dt>신이고 닉네임</dt>
          <dd>${escapeHTML(signup.cafeNickname || "-")}</dd>
        </div>
        <div>
          <dt>네이버 ID</dt>
          <dd>${escapeHTML(signup.naverId || "-")}</dd>
        </div>
        <div>
          <dt>이메일</dt>
          <dd>${escapeHTML(signup.email || "-")}</dd>
        </div>
        <div>
          <dt>신청 시각</dt>
          <dd>${escapeHTML(requestedText)}</dd>
        </div>
      </dl>
      <p class="field-help">승인 완료 후 같은 이메일과 비밀번호로 로그인할 수 있습니다. 기다리는 동안 데모 둘러보기로 기능을 확인할 수 있어요.</p>
      <div class="actions">
        <button class="btn secondary small" type="button" data-action="edit-pending-signup">신청 정보 다시 입력</button>
      </div>
    </div>
  `;
}

function renderDashboardCatPanel() {
  const cats = getUserCats();
  const activeCat = getActiveCat();

  if (!cats.length) {
    return `
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>고양이</h2>
              <p>첫 프로필을 등록하면 케어 기록을 시작할 수 있습니다.</p>
            </div>
          </div>
          <div class="empty">
            <p>등록된 고양이가 없습니다.</p>
            <div class="actions center">
              <button class="btn primary" data-tab="cats">고양이 등록하기</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  const activeHealth = activeCat.health || [];
  const visibleHealth = activeHealth.slice(0, 4);
  const remainingHealthCount = Math.max(activeHealth.length - visibleHealth.length, 0);

  return `
    <section class="panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>고양이</h2>
            <p>${cats.length}마리 등록됨 · 현재 케어 대상</p>
          </div>
          <button class="btn small secondary" data-tab="cats">고양이 관리</button>
        </div>
        <article class="item is-active dashboard-cat-card">
          <div class="item-head">
            <div>
              <h3>${escapeHTML(activeCat.name)}</h3>
              <p>${renderCatShortMeta(activeCat)}</p>
              <div class="chips">
                ${
                  visibleHealth.length
                    ? visibleHealth.map((key) => `<span class="chip">${escapeHTML(getHealthLabel(key))}</span>`).join("")
                    : `<span class="chip">일반관리</span>`
                }
                ${remainingHealthCount ? `<span class="chip">+${remainingHealthCount}</span>` : ""}
                <span class="chip amber">BCS ${activeCat.bcs}/9</span>
              </div>
            </div>
          </div>
        </article>
        ${
          cats.length > 1
            ? `<label class="cat-switcher dashboard-cat-switcher">
                <span>고양이 선택</span>
                <select class="select compact" data-cat-switcher aria-label="홈 고양이 선택">
                  ${renderCatOptions(activeCat.id)}
                </select>
              </label>`
            : ""
        }
      </div>
    </section>
  `;
}

function renderCatPanel() {
  const user = currentUser();
  if (!user) {
    return `
      <section class="panel">
        <div class="panel-inner">
          <div class="empty">회원가입 또는 둘러보기로 고양이 프로필을 만들 수 있습니다.</div>
        </div>
      </section>
    `;
  }

  const cats = getUserCats();
  const editingCat = cats.find((cat) => cat.id === state.editingCatId) || null;
  const catLimit = getUserCatLimit(user);
  const reachedCatLimit = !editingCat && cats.length >= catLimit;
  return `
    <section class="panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>${editingCat ? "고양이 프로필 수정" : "고양이 프로필"}</h2>
            <p>${editingCat ? `${escapeHTML(editingCat.name)} 정보를 수정합니다.` : `체중, 추정 출생연도, 건강상태를 케어 계산에 사용합니다. 현재 ${cats.length}/${catLimit}마리 등록됨`}</p>
          </div>
          ${editingCat ? `<button class="btn small secondary" data-action="cancel-cat-edit">새 프로필</button>` : ""}
        </div>
        <div class="notice" style="margin-bottom: 14px">
          계정당 기본 ${DEFAULT_CAT_LIMIT_PER_USER}마리까지 등록할 수 있습니다. 구조·임보 등으로 더 많은 고양이 기록이 필요하면 운영자에게 문의해주세요. 운영자가 확인 후 등록 한도를 조정할 수 있습니다.
        </div>
        <div class="list">
          ${
            cats.length
              ? cats.map((cat) => renderCatItem(cat)).join("")
              : `<div class="empty">첫 고양이 프로필을 추가하세요.</div>`
          }
        </div>
        ${
          reachedCatLimit
            ? `<div class="empty" style="margin-top: 14px">등록 한도 ${catLimit}마리에 도달했습니다. 기존 프로필은 수정할 수 있고, 추가 등록이 필요하면 운영자에게 문의해주세요.</div>`
            : `<form class="grid" data-form="cat" style="margin-top: 14px">
                <input type="hidden" name="id" value="${escapeAttr(editingCat?.id || "")}" />
                <div class="form-grid">
                  <div class="form-field">
                    <label for="cat-name">이름</label>
                    <input class="control" id="cat-name" name="name" value="${escapeAttr(editingCat?.name || "")}" required />
                  </div>
                  <div class="form-field">
                    <label for="cat-birth-year">연도(추정)</label>
                    <input class="control" id="cat-birth-year" name="birthYear" type="number" min="1980" max="${getCurrentYear()}" step="1" placeholder="예: 2015" value="${getCatBirthYearValue(editingCat)}" required />
                  </div>
                  <div class="form-field">
                    <label for="cat-weight">체중 kg</label>
                    <input class="control" id="cat-weight" name="weightKg" type="number" min="0.2" max="20" step="0.01" value="${editingCat?.weightKg ?? ""}" required />
                  </div>
                  <div class="form-field">
                    <label for="cat-bcs">BCS 1-9</label>
                    <select class="select" id="cat-bcs" name="bcs">
                      ${range(1, 9)
                        .map((value) => `<option value="${value}" ${value === (editingCat?.bcs || 5) ? "selected" : ""}>${value}</option>`)
                        .join("")}
                    </select>
                  </div>
                  <div class="form-field">
                    <label for="cat-neutered">중성화</label>
                    <select class="select" id="cat-neutered" name="neutered">
                      <option value="yes" ${editingCat?.neutered !== "no" ? "selected" : ""}>완료</option>
                      <option value="no" ${editingCat?.neutered === "no" ? "selected" : ""}>미완료</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label for="cat-activity">활동량</label>
                    <select class="select" id="cat-activity" name="activity">
                      <option value="low" ${editingCat?.activity === "low" ? "selected" : ""}>낮음</option>
                      <option value="normal" ${!editingCat || editingCat.activity === "normal" ? "selected" : ""}>보통</option>
                      <option value="active" ${editingCat?.activity === "active" ? "selected" : ""}>높음</option>
                    </select>
                  </div>
                  <div class="form-field full">
                    <span class="field-label">건강상태</span>
                    ${renderHealthChoices(editingCat?.health || [])}
                  </div>
                </div>
                <button class="btn primary" type="submit">${editingCat ? "프로필 수정" : "프로필 추가"}</button>
              </form>`
        }
      </div>
    </section>
  `;
}

function renderCatItem(cat) {
  const active = state.activeCatId === cat.id;
  return `
    <article class="item ${active ? "is-active" : ""}">
      <div class="item-head">
        <div>
          <h3>${escapeHTML(cat.name)}</h3>
          <p>${renderCatShortMeta(cat)}</p>
          <div class="chips">
            ${cat.health.length ? cat.health.map((key) => `<span class="chip">${escapeHTML(getHealthLabel(key))}</span>`).join("") : `<span class="chip">일반관리</span>`}
            <span class="chip amber">BCS ${cat.bcs}/9</span>
          </div>
        </div>
        <div class="actions">
          <button class="btn small ${active ? "secondary" : "primary"}" data-action="select-cat" data-id="${cat.id}">
            ${active ? "선택됨" : "선택"}
          </button>
          <button class="btn small secondary" data-action="edit-cat" data-id="${cat.id}">수정</button>
          <button class="btn small danger" data-action="delete-cat" data-id="${cat.id}">삭제</button>
        </div>
      </div>
    </article>
  `;
}

function renderHealthChoices(selected) {
  return `
    <div class="health-choice-grid">
      ${Object.entries(healthOptions)
        .map(
          ([key, option]) => `
            <label class="check-pill health-choice">
              <input type="checkbox" name="health" value="${key}" ${selected.includes(key) ? "checked" : ""} />
              <span class="health-choice-text">
                <span class="health-choice-title">${escapeHTML(option.label)}</span>
                <span class="health-choice-detail">${escapeHTML(option.detail)}</span>
              </span>
            </label>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCaloriePanel(cat) {
  if (!cat) {
    return `
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head"><h2>칼로리 계산</h2></div>
          <div class="empty">고양이 프로필이 필요합니다.</div>
        </div>
      </section>
    `;
  }
  const calorie = calorieProfile(cat);
  return `
    <section class="panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>하루 칼로리</h2>
            <p>RER 기반 보조 계산입니다.</p>
          </div>
        </div>
        <div class="grid two">
          <div class="metric">
            <div class="metric-label">RER</div>
            <div class="metric-value">${formatNumber(calorie.rer)} kcal</div>
            <div class="metric-note">70 x kg^0.75</div>
          </div>
          <div class="metric good">
            <div class="metric-label">하루 목표</div>
            <div class="metric-value">${formatNumber(calorie.target)} kcal</div>
            <div class="metric-note">${formatNumber(calorie.low)}-${formatNumber(calorie.high)} kcal</div>
          </div>
        </div>
        <div class="notice" style="margin-top: 12px">
          간식은 하루 ${formatNumber(calorie.snackMax)} kcal 이하로 관리하세요. 질환, 식욕저하, 체중감소가 있으면 담당 수의사의 목표 칼로리를 우선합니다.
        </div>
        <div class="chips">
          ${calorie.notes.map((note) => `<span class="chip blue">${escapeHTML(note)}</span>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderUpcomingPanel(upcoming) {
  return `
    <section class="panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>다가오는 케어</h2>
            <p>수액, 영양제, 투약 일정을 함께 봅니다.</p>
          </div>
          <div class="actions">
            <button class="btn small secondary" data-tab="fluid">수액</button>
            <button class="btn small secondary" data-tab="medication">투약</button>
          </div>
        </div>
        ${
          upcoming.length
            ? renderCollapsibleTimeline(upcoming, renderCareOccurrence, "예정된 케어 일정이 없습니다.", {
                initialCount: 3,
                hiddenLabel: "나머지 케어 일정"
              })
            : `<div class="empty">예정된 케어 일정이 없습니다.</div>`
        }
      </div>
    </section>
  `;
}

function renderDashboardWeightPanel() {
  return `
    <section class="panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>체중 추세</h2>
            <p>최근 기록을 차트로 확인합니다.</p>
          </div>
          <button class="btn small secondary" data-tab="weight">체중 기록</button>
        </div>
        <div class="canvas-wrap">
          <canvas id="dashboard-weight-chart" aria-label="체중 추세 차트"></canvas>
        </div>
      </div>
    </section>
  `;
}

function renderDashboardLabPanel() {
  const latest = getActiveCatLabLogs().at(-1);
  return `
    <section class="panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>최근 혈검</h2>
            <p>${latest ? `${latest.date} · ${escapeHTML(latest.hospital || "병원 미입력")}` : "기록 없음"}</p>
          </div>
          <button class="btn small secondary" data-tab="labs">혈검 기록</button>
        </div>
        ${
          latest
            ? `<div class="grid four">
                ${renderLabMetric(latest, "bun")}
                ${renderLabMetric(latest, "crea")}
                ${renderLabMetric(latest, "hct")}
                ${renderLabMetric(latest, "usg")}
              </div>`
            : `<div class="empty">혈액검사 수치를 기록하면 최근 BUN, CREA, HCT, USG가 표시됩니다.</div>`
        }
      </div>
    </section>
  `;
}

function renderDashboardSymptomPanel() {
  const logs = getActiveCatSymptomLogs();
  const todayLogs = logs.filter((log) => log.date === todayISO());
  const latest = logs.at(-1);
  const vomitTotal = todayLogs.reduce((sum, log) => sum + toNumber(log.vomitCount), 0);
  const diarrheaTotal = todayLogs.reduce((sum, log) => sum + toNumber(log.diarrheaCount), 0);
  return `
    <section class="panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>오늘 증상</h2>
            <p>${latest ? `${latest.date} · 최근 기록 있음` : "기록 없음"}</p>
          </div>
          <button class="btn small secondary" data-tab="symptoms">증상 기록</button>
        </div>
        ${
          latest
            ? `<div class="grid two">
                <div class="metric">
                  <div class="metric-label">오늘 구토</div>
                  <div class="metric-value">${formatNumber(vomitTotal)}회</div>
                  <div class="metric-note">최근 색 ${escapeHTML(latest.vomitColor || "없음")}</div>
                </div>
                <div class="metric">
                  <div class="metric-label">오늘 설사</div>
                  <div class="metric-value">${formatNumber(diarrheaTotal)}회</div>
                  <div class="metric-note">최근 색 ${escapeHTML(latest.stoolColor || "없음")}</div>
                </div>
              </div>`
            : `<div class="empty">구토나 설사 횟수와 색을 기록하면 오늘 합계가 표시됩니다.</div>`
        }
      </div>
    </section>
  `;
}

function renderFluidView() {
  const user = currentUser();
  const activeCat = getActiveCat();
  const plans = user
    ? state.fluidPlans.filter((plan) => plan.userId === user.id && plan.active !== false && (!activeCat || plan.catId === activeCat.id))
    : [];
  const upcoming = user ? getUpcomingOccurrences({ limit: 16, catId: activeCat?.id }) : [];

  return `
    <section class="view-title">
      <div>
        <h1>수액 스케줄</h1>
        <p>처방받은 수액량을 날짜와 시간으로 관리합니다. ${renderCurrentCatText(activeCat)}</p>
      </div>
    </section>
    ${user ? "" : renderAuthPanel()}
    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>스케줄 만들기</h2>
              <p>${activeCat ? `${escapeHTML(activeCat.name)} 기준` : "고양이를 먼저 선택하세요"}</p>
            </div>
          </div>
          <form class="grid" data-form="fluid-plan">
            <div class="form-grid">
              <div class="form-field">
                <label for="fluid-cat">고양이</label>
                <select class="select" id="fluid-cat" name="catId" required>
                  ${renderCatOptions(activeCat?.id)}
                </select>
              </div>
              <div class="form-field">
                <label for="fluid-name">스케줄명</label>
                <input class="control" id="fluid-name" name="name" value="피하수액" required />
              </div>
              <div class="form-field">
                <label for="fluid-type">수액 종류</label>
                <select class="select" id="fluid-type" name="fluidType">
                  ${renderOptions(fluidTypeOptions)}
                </select>
              </div>
              <div class="form-field">
                <label for="fluid-dose">1회 ml</label>
                <input class="control" id="fluid-dose" name="doseMl" type="number" min="1" step="1" inputmode="numeric" required />
              </div>
              <div class="form-field">
                <label for="fluid-times">하루 횟수</label>
                <select class="select" id="fluid-times" name="timesPerDay">
                  <option value="1">1회</option>
                  <option value="2">2회</option>
                  <option value="3">3회</option>
                </select>
              </div>
              <div class="form-field">
                <label for="fluid-days">반복 간격</label>
                <select class="select" id="fluid-days" name="intervalDays">
                  <option value="1">매일</option>
                  <option value="2">이틀마다</option>
                  <option value="3">3일마다</option>
                  <option value="7">매주</option>
                </select>
              </div>
              <div class="form-field">
                <label for="fluid-time">첫 시간</label>
                <input class="control" id="fluid-time" name="firstTime" type="time" value="09:00" required />
              </div>
              <div class="form-field">
                <label for="fluid-start">시작일</label>
                <input class="control" id="fluid-start" name="startDate" type="date" value="${todayISO()}" required />
              </div>
              <div class="form-field full">
                <label for="fluid-note">메모</label>
                <textarea class="textarea" id="fluid-note" name="notes" placeholder="바늘, 수액팩, 컨디션 메모"></textarea>
              </div>
            </div>
            <button class="btn primary" type="submit" ${activeCat ? "" : "disabled"}>스케줄 저장</button>
          </form>
          <div class="notice" style="margin-top: 14px">
            수액량과 빈도는 질환 단계, 심장 상태, 탈수 정도에 따라 달라집니다. 앱은 처방받은 내용을 기록하는 용도로만 사용하세요.
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>예정 일정</h2>
              <p>가까운 일정 4개를 먼저 보여줍니다.</p>
            </div>
          </div>
          ${renderCollapsibleTimeline(upcoming, renderOccurrence, "예정된 수액 일정이 없습니다.")}
        </div>
      </section>
    </div>

    <section class="panel" style="margin-top: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>등록된 수액 계획</h2>
            <p>사용하지 않는 계획은 삭제할 수 있습니다.</p>
          </div>
        </div>
        ${
          plans.length
            ? `<div class="grid three">${plans.map(renderFluidPlan).join("")}</div>`
            : `<div class="empty">등록된 수액 계획이 없습니다.</div>`
        }
      </div>
    </section>
  `;
}

function renderFluidPlan(plan) {
  const cat = state.cats.find((item) => item.id === plan.catId);
  return `
    <article class="item">
      <div class="item-head">
        <div>
          <h3>${escapeHTML(plan.name)}</h3>
          <p>${cat ? escapeHTML(cat.name) : "삭제된 고양이"} · ${escapeHTML(plan.fluidType || "수액")} · ${formatNumber(plan.doseMl)} ml · ${plan.intervalDays === 1 ? "매일" : `${plan.intervalDays}일마다`}</p>
          <div class="chips">
            <span class="chip amber">${escapeHTML(plan.fluidType || "수액")}</span>
            ${plan.times.map((time) => `<span class="chip">${time}</span>`).join("")}
          </div>
        </div>
        <button class="btn small danger" data-action="delete-fluid-plan" data-id="${plan.id}">삭제</button>
      </div>
    </article>
  `;
}

function renderOccurrence(item) {
  const done = isFluidCompleted(item.plan.id, item.date, item.time);
  return `
    <div class="timeline-row">
      <div class="time-badge">${item.date.slice(5)}<br />${item.time}</div>
      <div>
        <strong>${escapeHTML(item.cat.name)} · ${escapeHTML(item.plan.name)}</strong>
        <p>${escapeHTML(item.plan.fluidType || "수액")} · ${formatNumber(item.plan.doseMl)} ml ${item.plan.notes ? `· ${escapeHTML(item.plan.notes)}` : ""}</p>
      </div>
      <button
        class="btn small ${done ? "secondary" : "primary"}"
        data-action="complete-fluid"
        data-plan-id="${item.plan.id}"
        data-date="${item.date}"
        data-time="${item.time}"
        ${done ? "disabled" : ""}
      >
        ${done ? "완료됨" : "완료"}
      </button>
    </div>
  `;
}

function renderMedicationView() {
  const user = currentUser();
  const activeCat = getActiveCat();
  const plans = user
    ? state.medicationPlans.filter((plan) => plan.userId === user.id && plan.active !== false && (!activeCat || plan.catId === activeCat.id))
    : [];
  const editingPlan = user
    ? state.medicationPlans.find((plan) => plan.id === state.editingMedicationPlanId && plan.userId === user.id) || null
    : null;
  const editingPreset = editingPlan ? findMedicationPresetByLabel(editingPlan.name) : null;
  const formCatId = editingPlan?.catId || activeCat?.id;
  const upcoming = user ? getUpcomingMedicationOccurrences({ limit: 18, catId: activeCat?.id }) : [];

  return `
    <section class="view-title">
      <div>
        <h1>투약·영양제 스케줄</h1>
        <p>인흡착제, 요독흡착제, 영양제, 병원 처방약 시간을 체크합니다. ${renderCurrentCatText(activeCat)}</p>
      </div>
    </section>
    ${user ? "" : renderAuthPanel()}
    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>${editingPlan ? "스케줄 수정" : "스케줄 만들기"}</h2>
              <p>${editingPlan ? `${escapeHTML(editingPlan.name)} 계획을 수정합니다.` : activeCat ? `${escapeHTML(activeCat.name)} 기준` : "고양이를 먼저 선택하세요"}</p>
            </div>
            ${editingPlan ? `<button class="btn small secondary" type="button" data-action="cancel-medication-edit">새 스케줄</button>` : ""}
          </div>
          <form class="grid medication-form" data-form="medication-plan">
            <input type="hidden" name="id" value="${escapeAttr(editingPlan?.id || "")}" />
            <div class="form-grid">
              <div class="form-field">
                <label for="med-cat">고양이</label>
                <select class="select" id="med-cat" name="catId" required>
                  ${renderCatOptions(formCatId)}
                </select>
              </div>
              <div class="form-field">
                <label for="med-name">이름</label>
                <input class="control" id="med-name" name="name" value="${escapeAttr(editingPlan?.name || "")}" placeholder="직접 입력 또는 아래에서 선택" list="med-name-presets" />
                <datalist id="med-name-presets">
                  <option value="인흡착제"></option>
                  <option value="레나메진"></option>
                  <option value="유산균"></option>
                  <option value="오메가3"></option>
                  <option value="항구토제"></option>
                  <option value="췌장보조제"></option>
                  <option value="칼륨보조제"></option>
                  <option value="코발라민"></option>
                  <option value="아미나바스트"></option>
                  <option value="간보조제"></option>
                  <option value="식이섬유"></option>
                  <option value="처방약(병원)"></option>
                  <option value="혈압약"></option>
                  <option value="단백뇨약"></option>
                  <option value="식욕촉진제"></option>
                  <option value="빈혈약"></option>
                  <option value="변비약"></option>
                </datalist>
              </div>
              <div class="form-field">
                <label for="med-category">종류</label>
                <select class="select" id="med-category" name="category">
                  ${renderMedicationCategoryOptions(editingPlan?.category || "영양제")}
                </select>
              </div>
              <div class="form-field">
                <label for="med-preset-select">빠른 선택</label>
                <select class="select" id="med-preset-select" name="presetKey">
                  ${renderMedicationPresetOptions(editingPreset?.key || "")}
                </select>
              </div>
              ${
                editingPlan
                  ? `<div class="form-field full">
                      <div class="notice">수정 중에는 한 개 계획만 변경됩니다. 여러 영양제를 한 번에 추가하려면 새 스케줄로 등록해주세요.</div>
                    </div>`
                  : `<div class="form-field full med-preset-panel" data-med-preset-panel>
                      <span class="field-label">영양제·처방 체크리스트</span>
                      <div class="choice-row">
                        ${renderMedicationPresetChecklist()}
                      </div>
                    </div>`
              }
              <div class="form-field">
                <label for="med-dose">1회 용량</label>
                <input class="control" id="med-dose" name="dose" value="${escapeAttr(editingPlan?.dose || "")}" placeholder="1캡슐, 0.5정, 1ml" required />
              </div>
              <div class="form-field">
                <label for="med-route">방법</label>
                <select class="select" id="med-route" name="route">
                  ${renderOptions(["식후", "식전", "식사와 함께", "공복", "시간 고정"], editingPlan?.route || "식후")}
                </select>
              </div>
              <div class="form-field">
                <label for="med-times">하루 횟수</label>
                <select class="select" id="med-times" name="timesPerDay">
                  ${renderNumberOptions([
                    { value: 1, label: "1회" },
                    { value: 2, label: "2회" },
                    { value: 3, label: "3회" },
                    { value: 4, label: "4회" }
                  ], editingPlan?.timesPerDay || 1)}
                </select>
              </div>
              <div class="form-field">
                <label for="med-days">반복 간격</label>
                <select class="select" id="med-days" name="intervalDays">
                  ${renderNumberOptions([
                    { value: 1, label: "매일" },
                    { value: 2, label: "이틀마다" },
                    { value: 3, label: "3일마다" },
                    { value: 7, label: "매주" }
                  ], editingPlan?.intervalDays || 1)}
                </select>
              </div>
              <div class="form-field">
                <label for="med-time">첫 시간</label>
                <input class="control" id="med-time" name="firstTime" type="time" value="${escapeAttr(editingPlan?.times?.[0] || "09:00")}" required />
              </div>
              <div class="form-field">
                <label for="med-start">시작일</label>
                <input class="control" id="med-start" name="startDate" type="date" value="${escapeAttr(editingPlan?.startDate || todayISO())}" required />
              </div>
              <div class="form-field">
                <label for="med-end">종료일</label>
                <input class="control" id="med-end" name="endDate" type="date" value="${escapeAttr(editingPlan?.endDate || "")}" />
              </div>
              <div class="form-field full">
                <label for="med-note">메모</label>
                <textarea class="textarea" id="med-note" name="notes" placeholder="보관 방법, 먹이는 요령, 주의 반응">${escapeHTML(editingPlan?.notes || "")}</textarea>
              </div>
            </div>
            <button class="btn primary" type="submit" ${formCatId ? "" : "disabled"}>${editingPlan ? "스케줄 수정" : "스케줄 저장"}</button>
          </form>
          <div class="notice" style="margin-top: 14px">
            처방약의 용량과 중단 시점은 담당 수의사 지시를 우선하세요. 앱은 복용 시간을 잊지 않기 위한 기록 도구입니다.
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>예정 투약</h2>
              <p>가까운 일정 4개를 먼저 보여줍니다.</p>
            </div>
          </div>
          ${renderCollapsibleTimeline(upcoming, renderMedicationOccurrence, "예정된 투약·영양제 일정이 없습니다.")}
        </div>
      </section>
    </div>

    <section class="panel" style="margin-top: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>등록된 투약 계획</h2>
            <p>계획을 수정하거나 끝난 계획을 삭제할 수 있습니다.</p>
          </div>
        </div>
        ${
          plans.length
            ? `<div class="grid three">${plans.map(renderMedicationPlan).join("")}</div>`
            : `<div class="empty">등록된 투약·영양제 계획이 없습니다.</div>`
        }
      </div>
    </section>
  `;
}

function renderMedicationPlan(plan) {
  const cat = state.cats.find((item) => item.id === plan.catId);
  const period = plan.endDate ? `${plan.startDate} - ${plan.endDate}` : `${plan.startDate}부터`;
  const editing = state.editingMedicationPlanId === plan.id;
  return `
    <article class="item ${editing ? "is-active" : ""}">
      <div class="item-head">
        <div>
          <h3>${escapeHTML(plan.name)}</h3>
          <p>${cat ? escapeHTML(cat.name) : "삭제된 고양이"} · ${escapeHTML(plan.category)} · ${escapeHTML(plan.dose)} · ${plan.intervalDays === 1 ? "매일" : `${plan.intervalDays}일마다`}</p>
          <div class="chips">
            ${plan.classification ? `<span class="chip">${escapeHTML(plan.classification)}</span>` : ""}
            <span class="chip amber">${escapeHTML(plan.route)}</span>
            <span class="chip blue">${period}</span>
            ${plan.times.map((time) => `<span class="chip">${time}</span>`).join("")}
          </div>
        </div>
        <div class="actions">
          <button class="btn small ${editing ? "primary" : "secondary"}" data-action="edit-medication-plan" data-id="${escapeAttr(plan.id)}">${editing ? "수정 중" : "수정"}</button>
          <button class="btn small danger" data-action="delete-medication-plan" data-id="${escapeAttr(plan.id)}">삭제</button>
        </div>
      </div>
    </article>
  `;
}

function renderMedicationCategoryOptions(selectedCategory = "영양제") {
  return ["영양제", "식이섬유", "인흡착제", "처방약(병원)", "보조제", "기타"]
    .map(
      (category) =>
        `<option value="${escapeAttr(category)}" ${category === selectedCategory ? "selected" : ""}>${escapeHTML(category)}</option>`
    )
    .join("");
}

function renderNumberOptions(options, selectedValue) {
  return options
    .map(
      (option) =>
        `<option value="${option.value}" ${Number(option.value) === Number(selectedValue) ? "selected" : ""}>${escapeHTML(option.label)}</option>`
    )
    .join("");
}

function renderMedicationPresetChecklist(selectedKeys = []) {
  return medicationPresets
    .map(
      (preset) => `
        <label class="check-pill med-preset-pill">
          <input type="checkbox" name="presetKeys" value="${escapeAttr(preset.key)}" ${selectedKeys.includes(preset.key) ? "checked" : ""} />
          <span>${escapeHTML(preset.label)}</span>
          <small>${escapeHTML(preset.category === preset.classification ? preset.category : preset.classification)}</small>
        </label>
      `
    )
    .join("");
}

function renderMedicationPresetOptions(selectedKey = "") {
  return `
    <option value="" ${selectedKey ? "" : "selected"}>직접 입력 또는 체크리스트 선택</option>
    ${medicationPresets
      .map(
        (preset) =>
          `<option value="${escapeAttr(preset.key)}" ${preset.key === selectedKey ? "selected" : ""}>${escapeHTML(preset.label)} · ${escapeHTML(preset.category)}</option>`
      )
      .join("")}
  `;
}

function renderMedicationOccurrence(item) {
  const done = isMedicationCompleted(item.plan.id, item.date, item.time);
  return `
    <div class="timeline-row">
      <div class="time-badge">${item.date.slice(5)}<br />${item.time}</div>
      <div>
        <strong>${escapeHTML(item.cat.name)} · ${escapeHTML(item.plan.name)}</strong>
        <p>${escapeHTML(item.plan.category)}${item.plan.classification ? ` · ${escapeHTML(item.plan.classification)}` : ""} · ${escapeHTML(item.plan.dose)} · ${escapeHTML(item.plan.route)}${item.plan.notes ? ` · ${escapeHTML(item.plan.notes)}` : ""}</p>
      </div>
      <button
        class="btn small ${done ? "secondary" : "primary"}"
        data-action="complete-medication"
        data-plan-id="${item.plan.id}"
        data-date="${item.date}"
        data-time="${item.time}"
        ${done ? "disabled" : ""}
      >
        ${done ? "완료됨" : "완료"}
      </button>
    </div>
  `;
}

function renderCollapsibleTimeline(items, renderer, emptyText, options = {}) {
  if (!items.length) return `<div class="empty">${emptyText}</div>`;

  const initialCount = options.initialCount || 4;
  const visibleItems = items.slice(0, initialCount);
  const hiddenItems = items.slice(initialCount);
  const hiddenLabel = options.hiddenLabel || "나머지 일정";

  return `
    <div class="timeline">${visibleItems.map(renderer).join("")}</div>
    ${
      hiddenItems.length
        ? `<details class="timeline-collapse">
            <summary>
              <span>${hiddenLabel} ${hiddenItems.length}개 보기</span>
              <span class="timeline-collapse-state">
                <span class="closed-label">펼치기</span>
                <span class="open-label">접기</span>
              </span>
            </summary>
            <div class="timeline">${hiddenItems.map(renderer).join("")}</div>
          </details>`
        : ""
    }
  `;
}

function renderCareOccurrence(item) {
  if (item.kind === "medication") return renderMedicationOccurrence(item);
  return renderOccurrence(item);
}

function renderSymptomsView() {
  const user = currentUser();
  const activeCat = getActiveCat();
  const logs = getActiveCatSymptomLogs();
  const todayLogs = logs.filter((log) => log.date === todayISO());
  const vomitTotal = todayLogs.reduce((sum, log) => sum + toNumber(log.vomitCount), 0);
  const diarrheaTotal = todayLogs.reduce((sum, log) => sum + toNumber(log.diarrheaCount), 0);

  return `
    <section class="view-title">
      <div>
        <h1>구토·설사 체크</h1>
        <p>구토와 설사의 횟수, 색, 상태를 날짜별로 기록합니다. ${renderCurrentCatText(activeCat)}</p>
      </div>
    </section>
    ${user ? "" : renderAuthPanel()}
    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>증상 기록 추가</h2>
              <p>${activeCat ? `${escapeHTML(activeCat.name)} 상태 기록` : "고양이를 먼저 선택하세요"}</p>
            </div>
          </div>
          <form class="grid" data-form="symptom-log">
            <div class="form-grid">
              <div class="form-field">
                <label for="symptom-cat">고양이</label>
                <select class="select" id="symptom-cat" name="catId" required>${renderCatOptions(activeCat?.id)}</select>
              </div>
              <div class="form-field">
                <label for="symptom-date">날짜</label>
                <input class="control" id="symptom-date" name="date" type="date" value="${todayISO()}" required />
              </div>
            </div>
            <div class="item">
              <div class="panel-head">
                <div>
                  <h2>구토</h2>
                  <p>횟수와 색</p>
                </div>
              </div>
              <div class="form-grid">
                <div class="form-field">
                  <label for="vomit-count">구토 횟수</label>
                  <input class="control" id="vomit-count" name="vomitCount" type="number" min="0" step="1" inputmode="numeric" value="0" />
                </div>
                <div class="form-field">
                  <label for="vomit-color">구토 색</label>
                  <select class="select" id="vomit-color" name="vomitColor">${renderOptions(vomitColorOptions)}</select>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="panel-head">
                <div>
                  <h2>설사·대변</h2>
                  <p>횟수, 색, 상태</p>
                </div>
              </div>
              <div class="form-grid three">
                <div class="form-field">
                  <label for="diarrhea-count">설사 횟수</label>
                  <input class="control" id="diarrhea-count" name="diarrheaCount" type="number" min="0" step="1" inputmode="numeric" value="0" />
                </div>
                <div class="form-field">
                  <label for="stool-color">대변 색</label>
                  <select class="select" id="stool-color" name="stoolColor">${renderOptions(stoolColorOptions, "정상 갈색")}</select>
                </div>
                <div class="form-field">
                  <label for="stool-state">대변 상태</label>
                  <select class="select" id="stool-state" name="stoolState">${renderOptions(stoolStateOptions)}</select>
                </div>
              </div>
            </div>
            <div class="form-field">
              <label for="symptom-notes">메모</label>
              <textarea class="textarea" id="symptom-notes" name="notes" placeholder="식사, 약, 수액, 컨디션 변화"></textarea>
            </div>
            <button class="btn primary" type="submit" ${activeCat ? "" : "disabled"}>증상 기록 저장</button>
          </form>
          <div class="notice" style="margin-top: 14px">
            반복 구토, 혈색 구토, 검정변, 혈변, 물설사가 이어지면 병원 상담이 필요할 수 있습니다.
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>오늘 요약</h2>
              <p>${todayISO()} 기준</p>
            </div>
          </div>
          <div class="grid two">
            <div class="metric ${vomitTotal > 0 ? "warn" : "good"}">
              <div class="metric-label">구토</div>
              <div class="metric-value">${formatNumber(vomitTotal)}회</div>
              <div class="metric-note">오늘 기록 합계</div>
            </div>
            <div class="metric ${diarrheaTotal > 0 ? "warn" : "good"}">
              <div class="metric-label">설사</div>
              <div class="metric-value">${formatNumber(diarrheaTotal)}회</div>
              <div class="metric-note">오늘 기록 합계</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="panel" style="margin-top: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>증상 기록 목록</h2>
            <p>${logs.length}개 기록 · 최신순</p>
          </div>
        </div>
        ${
          logs.length
            ? `<div class="list">${logs.slice().reverse().map(renderSymptomLogItem).join("")}</div>`
            : `<div class="empty">아직 증상 기록이 없습니다.</div>`
        }
      </div>
    </section>
  `;
}

function renderSymptomLogItem(log) {
  const cat = state.cats.find((item) => item.id === log.catId);
  return `
    <article class="item">
      <div class="item-head">
        <div>
          <h3>${log.date} ${cat ? `· ${escapeHTML(cat.name)}` : ""}</h3>
          <div class="chips">
            <span class="chip ${toNumber(log.vomitCount) > 0 ? "amber" : ""}">구토 ${formatNumber(log.vomitCount)}회</span>
            <span class="chip">구토색 ${escapeHTML(log.vomitColor || "없음")}</span>
            <span class="chip ${toNumber(log.diarrheaCount) > 0 ? "amber" : ""}">설사 ${formatNumber(log.diarrheaCount)}회</span>
            <span class="chip">대변색 ${escapeHTML(log.stoolColor || "없음")}</span>
            <span class="chip blue">${escapeHTML(log.stoolState || "정상")}</span>
          </div>
          ${log.notes ? `<p>${escapeHTML(log.notes)}</p>` : ""}
        </div>
        <button class="btn small danger" data-action="delete-symptom-log" data-id="${log.id}">삭제</button>
      </div>
    </article>
  `;
}

function renderNutritionView() {
  const activeCat = getActiveCat();
  const calorie = activeCat ? calorieProfile(activeCat) : null;
  const foods = getFoods();
  const query = state.foodQuery.trim().toLowerCase();
  const filtered = query
    ? foods.filter((food) =>
        [food.name, food.brand, food.type, food.notes].join(" ").toLowerCase().includes(query)
      )
    : foods;
  const selected = foods.find((food) => food.id === state.selectedFoodId) || foods[0];
  const defaultTarget = calorie ? Math.round(calorie.target) : 200;

  return `
    <section class="view-title">
      <div>
        <h1>영양 검색과 급여 계산</h1>
        <p>DM 기준 성분, 하루 급여량, 혼합 급여 계획을 계산합니다.</p>
      </div>
    </section>

    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>식품 검색</h2>
              <p>예시 데이터와 직접 추가한 식품을 검색합니다.</p>
            </div>
          </div>
          <form data-form="food-search" class="actions">
            <label class="sr-only" for="food-query">식품명 검색</label>
            <input class="control" id="food-query" name="query" value="${escapeAttr(state.foodQuery)}" placeholder="건식, 습식, 신장..." />
            <button class="btn secondary" type="submit">검색</button>
          </form>
          <div class="food-list list" style="margin-top: 12px">
            ${filtered.map((food) => renderFoodItem(food, selected?.id === food.id)).join("") || `<div class="empty">검색 결과가 없습니다.</div>`}
          </div>
        </div>
      </section>

      <div class="grid">
        <section class="panel">
          <div class="panel-inner">
            <div class="panel-head">
              <div>
                <h2>DM 분석 & 하루 급여량</h2>
                <p>${selected ? escapeHTML(selected.name) : "식품을 선택하세요"}</p>
              </div>
            </div>
            ${renderNutritionForm(selected, defaultTarget)}
            ${renderNutritionResult()}
          </div>
        </section>

        <section class="panel">
          <div class="panel-inner">
            <div class="panel-head">
              <div>
                <h2>습식+건식 혼합 계획</h2>
                <p>총 칼로리 안에서 비율을 나눕니다.</p>
              </div>
            </div>
            ${renderMixForm(defaultTarget)}
            ${renderMixResult()}
          </div>
        </section>

        <section class="panel">
          <div class="panel-inner">
            <div class="panel-head">
              <div>
                <h2>간식 칼로리</h2>
                <p>g수별 열량과 하루 비율을 확인합니다.</p>
              </div>
            </div>
            ${renderSnackForm(defaultTarget)}
            ${renderSnackResult()}
          </div>
        </section>
      </div>
    </div>

    <section class="panel" style="margin-top: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>식품 추가</h2>
            <p>라벨의 as-fed 값을 입력하면 검색 목록에 저장됩니다.</p>
          </div>
        </div>
        ${renderFoodAddForm()}
      </div>
    </section>
  `;
}

function renderFoodItem(food, active) {
  return `
    <article class="item ${active ? "is-active" : ""}">
      <div class="item-head">
        <div>
          <h3>${escapeHTML(food.name)}</h3>
          <p>${escapeHTML(food.brand)} · ${escapeHTML(food.type)} · ${formatNumber(food.kcal100g)} kcal/100g</p>
          <div class="chips">
            <span class="chip">수분 ${formatNumber(food.moisture, 1)}%</span>
            <span class="chip amber">인 ${formatNumber(food.phosphorus, 2)}%</span>
            <span class="chip blue">${food.id.startsWith("custom") ? "직접추가" : "예시"}</span>
          </div>
        </div>
        <button class="btn small ${active ? "secondary" : "primary"}" data-action="select-food" data-id="${food.id}">
          ${active ? "선택됨" : "사용"}
        </button>
      </div>
    </article>
  `;
}

function renderNutritionForm(food, defaultTarget) {
  const source = food || seedFoods[0];
  const result = state.nutritionResult;
  const target = result?.input?.targetKcal || defaultTarget;
  return `
    <form class="grid" data-form="nutrition-calc">
      <div class="form-grid three">
        <div class="form-field">
          <label for="food-name">식품명</label>
          <input class="control" id="food-name" name="foodName" value="${escapeAttr(source.name)}" required />
        </div>
        <div class="form-field">
          <label for="food-kcal">kcal/100g</label>
          <input class="control" id="food-kcal" name="kcal100g" type="number" min="1" step="0.1" value="${source.kcal100g}" required />
        </div>
        <div class="form-field">
          <label for="target-kcal">하루 목표 kcal</label>
          <input class="control" id="target-kcal" name="targetKcal" type="number" min="1" step="1" value="${target}" required />
        </div>
        <div class="form-field">
          <label for="food-moisture">수분 %</label>
          <input class="control" id="food-moisture" name="moisture" type="number" min="0" max="99" step="0.1" value="${source.moisture}" required />
        </div>
        <div class="form-field">
          <label for="food-protein">단백질 %</label>
          <input class="control" id="food-protein" name="protein" type="number" min="0" max="100" step="0.1" value="${source.protein}" required />
        </div>
        <div class="form-field">
          <label for="food-fat">지방 %</label>
          <input class="control" id="food-fat" name="fat" type="number" min="0" max="100" step="0.1" value="${source.fat}" required />
        </div>
        <div class="form-field">
          <label for="food-fiber">섬유 %</label>
          <input class="control" id="food-fiber" name="fiber" type="number" min="0" max="100" step="0.1" value="${source.fiber}" required />
        </div>
        <div class="form-field">
          <label for="food-ash">회분 %</label>
          <input class="control" id="food-ash" name="ash" type="number" min="0" max="100" step="0.1" value="${source.ash}" required />
        </div>
        <div class="form-field">
          <label for="food-phosphorus">인 %</label>
          <input class="control" id="food-phosphorus" name="phosphorus" type="number" min="0" max="10" step="0.01" value="${source.phosphorus}" required />
        </div>
        <div class="form-field">
          <label for="food-sodium">나트륨 %</label>
          <input class="control" id="food-sodium" name="sodium" type="number" min="0" max="10" step="0.01" value="${source.sodium}" required />
        </div>
      </div>
      <button class="btn primary" type="submit">계산</button>
    </form>
  `;
}

function renderNutritionResult() {
  const result = state.nutritionResult;
  if (!result) {
    return `<div class="empty" style="margin-top: 12px">식품을 선택하고 계산을 누르면 결과가 표시됩니다.</div>`;
  }
  const rows = [
    ["단백질", result.input.protein, result.dm.protein, `${formatNumber(result.daily.protein, 1)} g/day`],
    ["지방", result.input.fat, result.dm.fat, `${formatNumber(result.daily.fat, 1)} g/day`],
    ["탄수화물 추정", result.asFedCarb, result.dm.carb, `${formatNumber(result.daily.carb, 1)} g/day`],
    ["인", result.input.phosphorus, result.dm.phosphorus, `${formatNumber(result.daily.phosphorus * 1000, 0)} mg/day`],
    ["나트륨", result.input.sodium, result.dm.sodium, `${formatNumber(result.daily.sodium * 1000, 0)} mg/day`]
  ];
  return `
    <div class="grid" style="margin-top: 14px">
      <div class="grid three">
        <div class="metric good">
          <div class="metric-label">하루 급여량</div>
          <div class="metric-value">${formatNumber(result.gramsPerDay, 1)} g</div>
          <div class="metric-note">${formatNumber(result.input.targetKcal)} kcal 기준</div>
        </div>
        <div class="metric">
          <div class="metric-label">건물 기준 인</div>
          <div class="metric-value">${formatNumber(result.dm.phosphorus, 2)}%</div>
          <div class="metric-note">${formatNumber(result.phosGPer1000Kcal, 2)} g/1000kcal</div>
        </div>
        <div class="metric warn">
          <div class="metric-label">칼로리 밀도</div>
          <div class="metric-value">${formatNumber(result.kcalPerGram, 2)}</div>
          <div class="metric-note">kcal/g</div>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>성분</th><th>as-fed</th><th>DM 기준</th><th>하루 섭취량</th></tr></thead>
          <tbody>
            ${rows
              .map(
                ([name, asFed, dm, daily]) => `
                  <tr>
                    <td>${name}</td>
                    <td>${formatNumber(asFed, 2)}%</td>
                    <td>${formatNumber(dm, 2)}%</td>
                    <td>${daily}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="notice">인, 단백질, 나트륨 목표는 질환 단계와 혈액검사 결과에 따라 달라집니다. 신장질환 고양이는 담당 수의사와 식단 목표를 맞추세요.</div>
    </div>
  `;
}

function renderMixForm(defaultTarget) {
  const input = state.mixResult?.input || {};
  return `
    <form class="grid" data-form="mix-calc">
      <div class="form-grid three">
        <div class="form-field">
          <label for="mix-target">하루 목표 kcal</label>
          <input class="control" id="mix-target" name="targetKcal" type="number" min="1" step="1" value="${input.targetKcal || defaultTarget}" required />
        </div>
        <div class="form-field">
          <label for="wet-kcal">습식 kcal/100g</label>
          <input class="control" id="wet-kcal" name="wetKcal100g" type="number" min="1" step="0.1" value="${input.wetKcal100g || 108}" required />
        </div>
        <div class="form-field">
          <label for="dry-kcal">건식 kcal/100g</label>
          <input class="control" id="dry-kcal" name="dryKcal100g" type="number" min="1" step="0.1" value="${input.dryKcal100g || 392}" required />
        </div>
        <div class="form-field">
          <label for="wet-share">습식 비율 %</label>
          <input class="control" id="wet-share" name="wetShare" type="number" min="0" max="100" step="1" value="${input.wetShare || 60}" required />
        </div>
        <div class="form-field">
          <label for="wet-pack">습식 1팩 g</label>
          <input class="control" id="wet-pack" name="wetPackGram" type="number" min="1" step="1" value="${input.wetPackGram || 85}" required />
        </div>
        <div class="form-field">
          <label for="meal-count">하루 급여 횟수</label>
          <input class="control" id="meal-count" name="mealCount" type="number" min="1" max="8" step="1" value="${input.mealCount || 4}" required />
        </div>
      </div>
      <button class="btn primary" type="submit">계획표 생성</button>
    </form>
  `;
}

function renderMixResult() {
  const result = state.mixResult;
  if (!result) return "";
  return `
    <div class="grid" style="margin-top: 14px">
      <div class="grid four">
        <div class="metric good">
          <div class="metric-label">습식</div>
          <div class="metric-value">${formatNumber(result.wetGram, 1)} g</div>
          <div class="metric-note">${formatNumber(result.wetPack, 2)} 팩</div>
        </div>
        <div class="metric">
          <div class="metric-label">건식</div>
          <div class="metric-value">${formatNumber(result.dryGram, 1)} g</div>
          <div class="metric-note">하루 총량</div>
        </div>
        <div class="metric warn">
          <div class="metric-label">1회 습식</div>
          <div class="metric-value">${formatNumber(result.wetPerMeal, 1)} g</div>
          <div class="metric-note">${result.input.mealCount}회 분배</div>
        </div>
        <div class="metric">
          <div class="metric-label">1회 건식</div>
          <div class="metric-value">${formatNumber(result.dryPerMeal, 1)} g</div>
          <div class="metric-note">${result.input.mealCount}회 분배</div>
        </div>
      </div>
    </div>
  `;
}

function renderSnackForm(defaultTarget) {
  const input = state.snackResult?.input || {};
  return `
    <form class="grid" data-form="snack-calc">
      <div class="form-grid three">
        <div class="form-field">
          <label for="snack-target">하루 목표 kcal</label>
          <input class="control" id="snack-target" name="targetKcal" type="number" min="1" step="1" value="${input.targetKcal || defaultTarget}" required />
        </div>
        <div class="form-field">
          <label for="snack-kcal">간식 kcal/100g</label>
          <input class="control" id="snack-kcal" name="snackKcal100g" type="number" min="1" step="0.1" value="${input.snackKcal100g || 300}" required />
        </div>
        <div class="form-field">
          <label for="snack-grams">급여 g</label>
          <input class="control" id="snack-grams" name="snackGram" type="number" min="0" step="0.1" value="${input.snackGram || 5}" required />
        </div>
      </div>
      <button class="btn primary" type="submit">간식 계산</button>
    </form>
  `;
}

function renderSnackResult() {
  const result = state.snackResult;
  if (!result) return "";
  const over = result.percent > 10;
  return `
    <div class="grid three" style="margin-top: 14px">
      <div class="metric ${over ? "hot" : "good"}">
        <div class="metric-label">간식 열량</div>
        <div class="metric-value">${formatNumber(result.kcal, 1)} kcal</div>
        <div class="metric-note">${formatNumber(result.input.snackGram, 1)} g 기준</div>
      </div>
      <div class="metric ${over ? "hot" : ""}">
        <div class="metric-label">하루 비율</div>
        <div class="metric-value">${formatNumber(result.percent, 1)}%</div>
        <div class="metric-note">목표 ${formatNumber(result.input.targetKcal)} kcal 대비</div>
      </div>
      <div class="metric warn">
        <div class="metric-label">10% 한도</div>
        <div class="metric-value">${formatNumber(result.maxGram, 1)} g</div>
        <div class="metric-note">간식 kcal 기준</div>
      </div>
    </div>
  `;
}

function renderFoodAddForm() {
  return `
    <form class="grid" data-form="food-add">
      <div class="form-grid three">
        <div class="form-field">
          <label for="add-food-name">식품명</label>
          <input class="control" id="add-food-name" name="name" required />
        </div>
        <div class="form-field">
          <label for="add-brand">브랜드</label>
          <input class="control" id="add-brand" name="brand" />
        </div>
        <div class="form-field">
          <label for="add-type">유형</label>
          <select class="select" id="add-type" name="type">
            <option>건식</option>
            <option>습식</option>
            <option>간식</option>
            <option>보조제</option>
          </select>
        </div>
        ${[
          ["kcal100g", "kcal/100g", 1, 0.1],
          ["moisture", "수분 %", 0, 0.1],
          ["protein", "단백질 %", 0, 0.1],
          ["fat", "지방 %", 0, 0.1],
          ["fiber", "섬유 %", 0, 0.1],
          ["ash", "회분 %", 0, 0.1],
          ["phosphorus", "인 %", 0, 0.01],
          ["sodium", "나트륨 %", 0, 0.01]
        ]
          .map(
            ([name, label, min, step]) => `
              <div class="form-field">
                <label for="add-${name}">${label}</label>
                <input class="control" id="add-${name}" name="${name}" type="number" min="${min}" step="${step}" required />
              </div>
            `
          )
          .join("")}
        <div class="form-field full">
          <label for="add-food-notes">메모</label>
          <textarea class="textarea" id="add-food-notes" name="notes"></textarea>
        </div>
      </div>
      <button class="btn primary" type="submit">식품 저장</button>
    </form>
  `;
}

function renderLabsView() {
  const user = currentUser();
  const activeCat = getActiveCat();
  const logs = getActiveCatLabLogs();
  const latest = logs.at(-1);
  const previous = logs.length > 1 ? logs.at(-2) : null;
  const selectedTrendKey = getSelectedLabTrendKey(logs);

  return `
    <section class="view-title">
      <div>
        <h1>혈검·신장수치</h1>
        <p>BUN, CREA, HCT, 전해질, 요검사 수치를 날짜별로 기록합니다. ${renderCurrentCatText(activeCat)}</p>
      </div>
    </section>
    ${user ? "" : renderAuthPanel()}
    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>검사 기록 추가</h2>
              <p>${activeCat ? `${escapeHTML(activeCat.name)} 검사 기록` : "고양이를 먼저 선택하세요"}</p>
            </div>
          </div>
          <form class="grid" data-form="lab-log">
            <div class="form-grid">
              <div class="form-field">
                <label for="lab-cat">고양이</label>
                <select class="select" id="lab-cat" name="catId" required>${renderCatOptions(activeCat?.id)}</select>
              </div>
              <div class="form-field">
                <label for="lab-date">검사일</label>
                <input class="control" id="lab-date" name="date" type="date" value="${todayISO()}" required />
              </div>
              <div class="form-field">
                <label for="lab-hospital">병원</label>
                <input class="control" id="lab-hospital" name="hospital" placeholder="예: 24시 동물의료센터" />
              </div>
              <div class="form-field">
                <label for="lab-report">검사지/파일명</label>
                <input class="control" id="lab-report" name="reportName" placeholder="예: 5.28 혈액검사지" />
              </div>
              <div class="form-field full">
                <label for="lab-pdf">혈액검사지 PDF 자동 입력</label>
                <input class="control" id="lab-pdf" type="file" accept="application/pdf,.pdf" />
                <p class="field-help" id="lab-pdf-status">
                  PDF 선택 후 자동으로 입력되지 않으면 아래 버튼을 눌러주세요.
                </p>
                <button class="btn secondary small" type="button" data-action="read-lab-pdf">PDF 내용 불러오기</button>
              </div>
            </div>

            ${labFieldGroups.map(renderLabFieldGroup).join("")}

            <div class="form-field">
              <label for="lab-notes">메모</label>
              <textarea class="textarea" id="lab-notes" name="notes" placeholder="수의사 설명, 약 변경, 식욕/수액 상태"></textarea>
            </div>
            <button class="btn primary" type="submit" ${activeCat ? "" : "disabled"}>검사 기록 저장</button>
          </form>
          <div class="notice" style="margin-top: 14px">
            참고범위는 병원 장비, 나이, 상태에 따라 달라질 수 있습니다. 앱은 수치 변화 기록용이며, 해석은 담당 수의사 설명을 우선하세요.
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>최근 검사 요약</h2>
              <p>${latest ? `${latest.date} 기준` : "기록 없음"}</p>
            </div>
          </div>
          ${
            latest
              ? `<div class="grid two lab-metrics">
                  ${labSummaryKeys
                    .map((key) => renderLabMetric(latest, key, previous, selectedTrendKey))
                    .join("")}
                </div>`
              : `<div class="empty">검사 수치를 저장하면 주요 수치가 표시됩니다.</div>`
          }
          ${renderLabTrendPanel(logs, selectedTrendKey)}
        </div>
      </section>
    </div>

    <section class="panel" style="margin-top: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>검사 기록 목록</h2>
            <p>${logs.length}개 기록 · 최신순</p>
          </div>
        </div>
        ${
          logs.length
            ? `<div class="list">${logs.slice().reverse().map(renderLabLogItem).join("")}</div>`
            : `<div class="empty">아직 혈검 기록이 없습니다.</div>`
        }
      </div>
    </section>
  `;
}

function renderLabFieldGroup(group) {
  return `
    <div class="item">
      <div class="panel-head">
        <div>
          <h2>${escapeHTML(group.title)}</h2>
          <p>${escapeHTML(group.description)}</p>
        </div>
      </div>
      <div class="form-grid three">
        ${group.fields.map(renderLabInput).join("")}
      </div>
    </div>
  `;
}

function renderLabInput(field) {
  return `
    <div class="form-field">
      <label for="lab-${field.key}">${escapeHTML(field.label)}${field.unit ? ` (${field.unit})` : ""}</label>
      <input class="control" id="lab-${field.key}" name="${field.key}" inputmode="decimal" placeholder="${escapeAttr(field.unit)}" />
    </div>
  `;
}

function renderLabMetric(log, key, previous = null, selectedKey = "crea") {
  const field = getLabField(key);
  const value = log.values?.[key];
  const delta = previous ? renderLabDelta(value, previous.values?.[key], field) : "첫 기록";
  const isActive = selectedKey === key;
  const referenceStatus = getLabReferenceStatus(value, key);
  return `
    <button class="metric lab-metric ${isActive ? "is-active" : ""}" type="button" data-action="select-lab-trend" data-key="${escapeAttr(key)}" aria-pressed="${isActive}">
      <div class="metric-label">${escapeHTML(field?.label || key)}</div>
      <div class="metric-value">${formatLabValue(value, field)}</div>
      <div class="metric-note">${delta}</div>
      <div class="reference-note ${referenceStatus}">${escapeHTML(renderLabReferenceNote(value, key, field))}</div>
    </button>
  `;
}

function renderLabTrendPanel(logs, selectedKey) {
  const field = getLabField(selectedKey);
  const selectedRange = getSelectedLabTrendRange();
  const rangeOption = getLabTrendRange(selectedRange);
  const trendLogs = getLabTrendLogs(logs, selectedKey, selectedRange);
  const latest = trendLogs.at(-1);
  const first = trendLogs[0];
  const minPoint = trendLogs.reduce((min, point) => (point.value < min.value ? point : min), latest);
  const maxPoint = trendLogs.reduce((max, point) => (point.value > max.value ? point : max), latest);
  const changeText =
    latest && first && trendLogs.length > 1
      ? formatLabTrendChange(latest.value, first.value, field)
      : trendLogs.length === 1
        ? "기록 1개"
        : "-";

  return `
    <div class="lab-trend">
      <div class="panel-head">
        <div>
          <h2>${escapeHTML(field.label)} ${escapeHTML(rangeOption.title)} 추세</h2>
          <p>${trendLogs.length ? `${trendLogs.length}개 기록 기준` : "선택한 항목의 기록이 없습니다."}</p>
        </div>
        <div class="range-selector" role="group" aria-label="혈검 그래프 기간">
          ${labTrendRanges
            .map(
              (option) => `
                <button
                  class="range-button ${option.key === selectedRange ? "is-active" : ""}"
                  type="button"
                  data-action="select-lab-trend-range"
                  data-range="${escapeAttr(option.key)}"
                  aria-pressed="${option.key === selectedRange}"
                >${escapeHTML(option.label)}</button>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="canvas-wrap">
        <canvas id="lab-trend-chart" aria-label="${escapeAttr(field.label)} ${escapeAttr(rangeOption.title)} 추세 차트"></canvas>
      </div>
      <p class="reference-disclaimer">
        ${escapeHTML(renderLabReferenceNote(latest?.value, selectedKey, field))}. 병원 장비와 검사지 참고범위를 우선하세요.
      </p>
      <div class="grid four lab-trend-stats">
        ${renderTrendStat("최근", latest ? formatLabValue(latest.value, field) : "-", latest?.date || "-")}
        ${renderTrendStat("최저", minPoint ? formatLabValue(minPoint.value, field) : "-", minPoint?.date || "-")}
        ${renderTrendStat("최고", maxPoint ? formatLabValue(maxPoint.value, field) : "-", maxPoint?.date || "-")}
        ${renderTrendStat("변화", changeText, first && latest ? `${first.date.slice(5)} → ${latest.date.slice(5)}` : "-")}
      </div>
    </div>
  `;
}

function renderTrendStat(label, value, note) {
  return `
    <div class="trend-stat">
      <div class="metric-label">${escapeHTML(label)}</div>
      <div class="trend-stat-value">${escapeHTML(value)}</div>
      <div class="metric-note">${escapeHTML(note)}</div>
    </div>
  `;
}

function renderLabLogItem(log) {
  const cat = state.cats.find((item) => item.id === log.catId);
  const summaryKeys = ["bun", "crea", "sdma", "phos", "ph", "hct", "hgb", "plt", "usg", "upc", "fpl"];
  return `
    <article class="item">
      <div class="item-head">
        <div>
          <h3>${log.date} ${cat ? `· ${escapeHTML(cat.name)}` : ""}</h3>
          <p>${escapeHTML(log.hospital || "병원 미입력")}${log.reportName ? ` · ${escapeHTML(log.reportName)}` : ""}</p>
          <div class="chips">
            ${summaryKeys
              .filter((key) => log.values?.[key] !== undefined)
              .map((key) => {
                const field = getLabField(key);
                return `<span class="chip">${escapeHTML(field.label)} ${formatLabValue(log.values[key], field)}</span>`;
              })
              .join("")}
          </div>
          ${log.notes ? `<p>${escapeHTML(log.notes)}</p>` : ""}
        </div>
        <button class="btn small danger" data-action="delete-lab-log" data-id="${log.id}">삭제</button>
      </div>
    </article>
  `;
}

function renderWeightView() {
  const user = currentUser();
  const activeCat = getActiveCat();
  const logs = getActiveCatWeightLogs();
  const selectedRange = getSelectedWeightTrendRange();
  const rangeOption = getWeightTrendRange(selectedRange);
  const trendLogs = getWeightTrendLogs(logs, selectedRange);
  const latest = trendLogs.at(-1);
  const first = trendLogs[0];
  const delta = latest && first ? latest.weightKg - first.weightKg : 0;

  return `
    <section class="view-title">
      <div>
        <h1>체중 기록</h1>
        <p>체중 변화와 메모를 함께 남깁니다. ${renderCurrentCatText(activeCat)}</p>
      </div>
    </section>
    ${user ? "" : renderAuthPanel()}
    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>기록 추가</h2>
              <p>${activeCat ? `${escapeHTML(activeCat.name)} 기록` : "고양이를 먼저 선택하세요"}</p>
            </div>
          </div>
          <form class="grid" data-form="weight-log">
            <div class="form-grid">
              <div class="form-field">
                <label for="weight-cat">고양이</label>
                <select class="select" id="weight-cat" name="catId" required>${renderCatOptions(activeCat?.id)}</select>
              </div>
              <div class="form-field">
                <label for="weight-date">날짜</label>
                <input class="control" id="weight-date" name="date" type="date" value="${todayISO()}" required />
              </div>
              <div class="form-field">
                <label for="weight-kg">체중 kg</label>
                <input class="control" id="weight-kg" name="weightKg" type="number" min="0.2" max="20" step="0.01" value="${activeCat?.weightKg || ""}" required />
              </div>
              <div class="form-field">
                <label for="weight-appetite">식욕</label>
                <select class="select" id="weight-appetite" name="appetite">
                  <option>좋음</option>
                  <option>보통</option>
                  <option>감소</option>
                  <option>거부</option>
                </select>
              </div>
              <div class="form-field full">
                <label for="weight-notes">메모</label>
                <textarea class="textarea" id="weight-notes" name="notes" placeholder="구토, 음수, 식욕, 약 복용"></textarea>
              </div>
            </div>
            <button class="btn primary" type="submit" ${activeCat ? "" : "disabled"}>체중 저장</button>
          </form>
        </div>
      </section>

      <section class="panel weight-trend-panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>체중 ${escapeHTML(rangeOption.title)} 추세</h2>
              <p>${
                trendLogs.length
                  ? `${trendLogs.length}개 기록 기준${trendLogs.length === logs.length ? "" : ` · 전체 ${logs.length}개`}`
                  : logs.length
                    ? "선택한 기간에 기록이 없습니다."
                    : "기록 없음"
              }</p>
            </div>
            ${renderWeightRangeSelector(selectedRange)}
          </div>
          <div class="grid three">
            <div class="metric good">
              <div class="metric-label">최근</div>
              <div class="metric-value">${latest ? `${formatNumber(latest.weightKg, 2)} kg` : "-"}</div>
              <div class="metric-note">${latest ? latest.date : ""}</div>
            </div>
            <div class="metric">
              <div class="metric-label">변화</div>
              <div class="metric-value">${trendLogs.length > 1 ? `${delta >= 0 ? "+" : ""}${formatNumber(delta, 2)} kg` : "-"}</div>
              <div class="metric-note">${trendLogs.length > 1 ? `${first.date.slice(5)} 대비` : "기간 내 기록 부족"}</div>
            </div>
            <div class="metric warn">
              <div class="metric-label">BCS</div>
              <div class="metric-value">${activeCat ? `${activeCat.bcs}/9` : "-"}</div>
              <div class="metric-note">프로필 기준</div>
            </div>
          </div>
          <div class="canvas-wrap" style="margin-top: 12px">
            <canvas id="weight-chart" aria-label="체중 ${escapeAttr(rangeOption.title)} 추세 차트"></canvas>
          </div>
        </div>
      </section>
    </div>

    <section class="panel" style="margin-top: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>기록 목록</h2>
            <p>최신순으로 표시됩니다.</p>
          </div>
        </div>
        ${
          logs.length
            ? `<div class="table-wrap"><table><thead><tr><th>날짜</th><th>체중</th><th>식욕</th><th>메모</th><th></th></tr></thead><tbody>${logs
                .slice()
                .reverse()
                .map(
                  (log) => `
                    <tr>
                      <td>${log.date}</td>
                      <td>${formatNumber(log.weightKg, 2)} kg</td>
                      <td>${escapeHTML(log.appetite || "-")}</td>
                      <td>${escapeHTML(log.notes || "")}</td>
                      <td><button class="btn small danger" data-action="delete-weight" data-id="${log.id}">삭제</button></td>
                    </tr>
                  `
                )
                .join("")}</tbody></table></div>`
            : `<div class="empty">아직 체중 기록이 없습니다.</div>`
        }
      </div>
    </section>
  `;
}

function renderDashboardReportPanel() {
  const cats = getUserCats();
  const settings = normalizeReportSettings(state.reportSettings);
  const reportCat = getReportCat(cats, settings);
  const selectedRange = getReportRange(settings.range);

  return `
    <section class="panel no-print dashboard-report-panel" id="dashboard-report-panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>내 데이터 보내기</h2>
            <p>${reportCat ? `${escapeHTML(reportCat.name)} · ${escapeHTML(selectedRange.title)} 진료 상담용 리포트` : "고양이를 먼저 등록하세요"}</p>
          </div>
          <button class="btn small secondary" data-action="toggle-dashboard-report">닫기</button>
        </div>
        ${
          cats.length
            ? `<form class="grid" data-form="report-settings">
                <div class="form-grid">
                  <div class="form-field">
                    <label for="report-cat">고양이</label>
                    <select class="select" id="report-cat" name="catId">
                      ${cats
                        .map((cat) => `<option value="${escapeAttr(cat.id)}" ${cat.id === reportCat?.id ? "selected" : ""}>${escapeHTML(cat.name)}</option>`)
                        .join("")}
                    </select>
                  </div>
                  <div class="form-field">
                    <label for="report-range">기간</label>
                    <select class="select" id="report-range" name="range">
                      ${reportRanges
                        .map((range) => `<option value="${escapeAttr(range.key)}" ${range.key === settings.range ? "selected" : ""}>${escapeHTML(range.label)}</option>`)
                        .join("")}
                    </select>
                  </div>
                  <div class="form-field full">
                    <span class="field-label">포함할 항목</span>
                    <div class="choice-row">
                      ${renderReportSectionChoices(settings.sections)}
                    </div>
                  </div>
                  <div class="form-field full">
                    <label for="report-questions">병원에 물어볼 질문</label>
                    <textarea class="textarea" id="report-questions" name="questions" placeholder="예: 수액량 조정 여부, 인흡착제 용량, 식욕저하 원인">${escapeHTML(settings.questions)}</textarea>
                  </div>
                </div>
                <div class="actions">
                  <button class="btn primary" type="submit">리포트 갱신</button>
                  <button class="btn report-cta" type="button" data-action="print-report">PDF로 저장</button>
                </div>
                <p class="field-help">PDF로 저장을 누른 뒤 브라우저 인쇄창에서 대상 또는 프린터를 PDF 저장으로 선택하세요.</p>
              </form>`
            : `<div class="empty">고양이 프로필을 먼저 등록하면 진료 리포트를 만들 수 있습니다.</div>`
        }
        <div class="notice" style="margin-top: 14px">
          이 리포트는 보호자가 입력한 기록을 상담용으로 정리한 자료입니다. 진단, 처방, 약물 중단 여부는 담당 수의사의 판단을 우선하세요.
        </div>
      </div>
    </section>
    ${
      reportCat
        ? `<section class="panel report-preview-panel">
            <div class="panel-inner">
              ${renderReportDocument(reportCat, settings)}
            </div>
          </section>`
        : ""
    }
  `;
}

function renderReportSectionChoices(selectedSections) {
  return reportSectionOptions
    .map(
      (section) => `
        <label class="check-pill">
          <input type="checkbox" name="sections" value="${escapeAttr(section.key)}" ${selectedSections.includes(section.key) ? "checked" : ""} />
          <span>${escapeHTML(section.label)}</span>
        </label>
      `
    )
    .join("");
}

function renderReportDocument(cat, settings) {
  const range = getReportRange(settings.range);
  const sections = new Set(settings.sections);
  return `
    <article class="report-document" data-print-report>
      <header class="report-header">
        <div>
          <p class="report-eyebrow">진료 상담용 리포트</p>
          <h2>${escapeHTML(cat.name)}</h2>
          <p>${escapeHTML(range.title)} 기록 · 작성일 ${formatTodayLabel()}</p>
        </div>
        <div class="report-brand">신장질환을 이긴 고양이 케어</div>
      </header>
      <div class="report-disclaimer">
        보호자 기록 관리 자료이며 수의사의 진료·처방을 대체하지 않습니다. 병원 검사지 참고범위와 담당 수의사의 설명을 우선하세요.
      </div>
      ${sections.has("profile") ? renderReportProfile(cat) : ""}
      ${sections.has("routines") ? renderReportRoutines(cat) : ""}
      ${sections.has("labs") ? renderReportLabs(cat, settings.range) : ""}
      ${sections.has("weight") ? renderReportWeight(cat, settings.range) : ""}
      ${sections.has("symptoms") ? renderReportSymptoms(cat, settings.range) : ""}
      ${sections.has("questions") ? renderReportQuestions(settings.questions) : ""}
    </article>
  `;
}

function renderReportProfile(cat) {
  const healthLabels = cat.health?.length ? cat.health.map(getHealthLabel).join(", ") : "일반관리";
  const calorie = calorieProfile(cat);
  return `
    <section class="report-section">
      <h3>기본 정보</h3>
      <div class="grid three report-metrics">
        ${renderReportMetric("체중", `${formatNumber(cat.weightKg, 2)} kg`, "프로필 기준")}
        ${renderReportMetric("연도(추정)", getCatBirthYearValue(cat) ? `${getCatBirthYearValue(cat)}년` : "-", `${formatNumber(getCatAgeYears(cat), 0)}살 추정`)}
        ${renderReportMetric("BCS", `${cat.bcs}/9`, cat.bcs >= 7 ? "체중감량 상담" : cat.bcs <= 4 ? "체중회복 관찰" : "중간 범위")}
        ${renderReportMetric("활동량", renderActivityLabel(cat.activity), cat.neutered === "no" ? "중성화 미완료" : "중성화 완료")}
        ${renderReportMetric("건강상태", healthLabels, "프로필 체크 항목")}
        ${renderReportMetric("권장 열량", `${formatNumber(calorie.target)} kcal`, calorie.notes.join(", "))}
      </div>
    </section>
  `;
}

function renderReportRoutines(cat) {
  const user = currentUser();
  const fluidPlans = state.fluidPlans.filter(
    (plan) => user && plan.userId === user.id && plan.catId === cat.id && plan.active !== false
  );
  const medicationPlans = state.medicationPlans.filter(
    (plan) => user && plan.userId === user.id && plan.catId === cat.id && plan.active !== false
  );
  return `
    <section class="report-section">
      <h3>수액·투약 루틴</h3>
      <h4>수액</h4>
      ${renderReportTable(
        ["스케줄", "종류", "용량/주기", "시간", "메모"],
        fluidPlans.map(
          (plan) => `
            <tr>
              <td>${escapeHTML(plan.name)}</td>
              <td>${escapeHTML(plan.fluidType || "수액")}</td>
              <td>${formatNumber(plan.doseMl)} ml · ${plan.intervalDays === 1 ? "매일" : `${plan.intervalDays}일마다`}</td>
              <td>${plan.times.map(escapeHTML).join(", ")}</td>
              <td>${escapeHTML(plan.notes || "")}</td>
            </tr>
          `
        ),
        "등록된 수액 계획이 없습니다."
      )}
      <h4>투약·영양제</h4>
      ${renderReportTable(
        ["이름", "분류", "용량/방법", "시간", "기간/메모"],
        medicationPlans.map(
          (plan) => `
            <tr>
              <td>${escapeHTML(plan.name)}</td>
              <td>${escapeHTML(plan.category)}${plan.classification ? ` · ${escapeHTML(plan.classification)}` : ""}</td>
              <td>${escapeHTML(plan.dose)} · ${escapeHTML(plan.route)}</td>
              <td>${plan.times.map(escapeHTML).join(", ")}</td>
              <td>${escapeHTML(plan.startDate)}${plan.endDate ? `-${escapeHTML(plan.endDate)}` : "부터"}${plan.notes ? ` · ${escapeHTML(plan.notes)}` : ""}</td>
            </tr>
          `
        ),
        "등록된 투약 계획이 없습니다."
      )}
    </section>
  `;
}

function renderReportLabs(cat, rangeKey) {
  const logs = getReportLogs(
    state.labLogs.filter((log) => log.catId === cat.id),
    rangeKey
  );
  const latest = logs.at(-1);
  const previous = logs.length > 1 ? logs.at(-2) : null;
  const summaryKeys = latest
    ? labSummaryKeys.filter((key) => Number.isFinite(Number(latest.values?.[key])))
    : [];

  return `
    <section class="report-section">
      <h3>혈검·신장수치</h3>
      ${
        latest
          ? `<div class="grid four report-metrics">
              ${summaryKeys
                .slice(0, 8)
                .map((key) => {
                  const field = getLabField(key);
                  return renderReportMetric(
                    field.label,
                    formatLabValue(latest.values[key], field),
                    previous ? renderLabDelta(latest.values[key], previous.values?.[key], field) : "첫 기록"
                  );
                })
                .join("")}
            </div>`
          : `<div class="empty">선택한 기간의 혈검 기록이 없습니다.</div>`
      }
      ${renderReportTable(
        ["검사일", "주요 수치", "병원/파일", "메모"],
        logs
          .slice()
          .reverse()
          .map((log) => {
            const chips = labSummaryKeys
              .filter((key) => Number.isFinite(Number(log.values?.[key])))
              .map((key) => {
                const field = getLabField(key);
                return `${field.label} ${formatLabValue(log.values[key], field)}`;
              })
              .join(" · ");
            return `
              <tr>
                <td>${escapeHTML(log.date)}</td>
                <td>${escapeHTML(chips || "입력 수치 없음")}</td>
                <td>${escapeHTML([log.hospital, log.reportName].filter(Boolean).join(" · ") || "-")}</td>
                <td>${escapeHTML(log.notes || "")}</td>
              </tr>
            `;
          }),
        "선택한 기간의 혈검 기록이 없습니다."
      )}
    </section>
  `;
}

function renderReportWeight(cat, rangeKey) {
  const logs = getReportLogs(
    state.weightLogs.filter((log) => log.catId === cat.id),
    rangeKey
  );
  const latest = logs.at(-1);
  const first = logs[0];
  const delta = latest && first ? Number(latest.weightKg) - Number(first.weightKg) : 0;
  return `
    <section class="report-section">
      <h3>체중 기록</h3>
      <div class="grid three report-metrics">
        ${renderReportMetric("최근 체중", latest ? `${formatNumber(latest.weightKg, 2)} kg` : "-", latest?.date || "기록 없음")}
        ${renderReportMetric("기간 변화", logs.length > 1 ? `${delta >= 0 ? "+" : ""}${formatNumber(delta, 2)} kg` : "-", logs.length > 1 ? `${first.date} 대비` : "기록 부족")}
        ${renderReportMetric("기록 수", `${logs.length}개`, getReportRange(rangeKey).title)}
      </div>
      ${renderReportTable(
        ["날짜", "체중", "식욕", "메모"],
        logs
          .slice()
          .reverse()
          .map(
            (log) => `
              <tr>
                <td>${escapeHTML(log.date)}</td>
                <td>${formatNumber(log.weightKg, 2)} kg</td>
                <td>${escapeHTML(log.appetite || "-")}</td>
                <td>${escapeHTML(log.notes || "")}</td>
              </tr>
            `
          ),
        "선택한 기간의 체중 기록이 없습니다."
      )}
    </section>
  `;
}

function renderReportSymptoms(cat, rangeKey) {
  const logs = getReportLogs(
    state.symptomLogs.filter((log) => log.catId === cat.id),
    rangeKey
  );
  const vomitTotal = logs.reduce((sum, log) => sum + toNumber(log.vomitCount), 0);
  const diarrheaTotal = logs.reduce((sum, log) => sum + toNumber(log.diarrheaCount), 0);
  return `
    <section class="report-section">
      <h3>증상 기록</h3>
      <div class="grid three report-metrics">
        ${renderReportMetric("구토 합계", `${formatNumber(vomitTotal)}회`, getReportRange(rangeKey).title)}
        ${renderReportMetric("설사 합계", `${formatNumber(diarrheaTotal)}회`, getReportRange(rangeKey).title)}
        ${renderReportMetric("기록 수", `${logs.length}개`, "보호자 입력 기준")}
      </div>
      ${renderReportTable(
        ["날짜", "구토", "대변/설사", "메모"],
        logs
          .slice()
          .reverse()
          .map(
            (log) => `
              <tr>
                <td>${escapeHTML(log.date)}</td>
                <td>${formatNumber(log.vomitCount)}회 · ${escapeHTML(log.vomitColor || "없음")}</td>
                <td>${formatNumber(log.diarrheaCount)}회 · ${escapeHTML(log.stoolColor || "없음")} · ${escapeHTML(log.stoolState || "정상")}</td>
                <td>${escapeHTML(log.notes || "")}</td>
              </tr>
            `
          ),
        "선택한 기간의 증상 기록이 없습니다."
      )}
    </section>
  `;
}

function renderReportQuestions(questions) {
  return `
    <section class="report-section">
      <h3>병원에 물어볼 질문</h3>
      ${
        questions.trim()
          ? `<div class="report-note">${escapeHTML(questions).replaceAll("\n", "<br />")}</div>`
          : `<div class="empty">질문을 입력하면 리포트에 함께 표시됩니다.</div>`
      }
    </section>
  `;
}

function renderReportMetric(label, value, note = "") {
  return `
    <div class="metric report-metric">
      <div class="metric-label">${escapeHTML(label)}</div>
      <div class="metric-value">${escapeHTML(value)}</div>
      <div class="metric-note">${escapeHTML(note)}</div>
    </div>
  `;
}

function renderReportTable(headers, rowHtmlList, emptyText) {
  if (!rowHtmlList.length) return `<div class="empty">${escapeHTML(emptyText)}</div>`;
  return `
    <div class="table-wrap report-table-wrap">
      <table>
        <thead>
          <tr>${headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("")}</tr>
        </thead>
        <tbody>${rowHtmlList.join("")}</tbody>
      </table>
    </div>
  `;
}

function renderWeightRangeSelector(selectedRange) {
  return `
    <div class="range-selector" role="group" aria-label="체중 그래프 기간">
      ${weightTrendRanges
        .map(
          (option) => `
            <button
              class="range-button ${option.key === selectedRange ? "is-active" : ""}"
              type="button"
              data-action="select-weight-trend-range"
              data-range="${escapeAttr(option.key)}"
              aria-pressed="${option.key === selectedRange}"
            >${escapeHTML(option.label)}</button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderResourcesView() {
  const resources = [...seedResources, ...state.customResources];
  return `
    <section class="view-title">
      <div>
        <h1>자료실</h1>
        <p>공식 자료, 카페 자료, 개인 메모 링크를 모읍니다.</p>
      </div>
    </section>
    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>자료 추가</h2>
              <p>자주 보는 글이나 검사표 링크를 저장합니다.</p>
            </div>
          </div>
          <form class="grid" data-form="resource-add">
            <div class="form-grid">
              <div class="form-field">
                <label for="resource-title">제목</label>
                <input class="control" id="resource-title" name="title" required />
              </div>
              <div class="form-field">
                <label for="resource-category">분류</label>
                <input class="control" id="resource-category" name="category" value="개인자료" required />
              </div>
              <div class="form-field full">
                <label for="resource-url">URL</label>
                <input class="control" id="resource-url" name="url" type="url" required />
              </div>
              <div class="form-field full">
                <label for="resource-summary">요약</label>
                <textarea class="textarea" id="resource-summary" name="summary"></textarea>
              </div>
            </div>
            <button class="btn primary" type="submit">자료 저장</button>
          </form>
        </div>
      </section>
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>저장된 자료</h2>
              <p>${resources.length}개 자료</p>
            </div>
          </div>
          <div class="list">
            ${resources.map(renderResourceItem).join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderResourceItem(resource) {
  return `
    <article class="item">
      <div class="item-head">
        <div>
          <h3><a href="${escapeAttr(resource.url)}" target="_blank" rel="noreferrer">${escapeHTML(resource.title)}</a></h3>
          <p>${escapeHTML(resource.summary || "")}</p>
          <div class="chips">
            <span class="chip">${escapeHTML(resource.category)}</span>
            ${(resource.tags || []).map((tag) => `<span class="chip blue">${escapeHTML(tag)}</span>`).join("")}
          </div>
        </div>
        ${
          resource.id.startsWith("custom")
            ? `<button class="btn small danger" data-action="delete-resource" data-id="${resource.id}">삭제</button>`
            : ""
        }
      </div>
    </article>
  `;
}

function renderBoardView() {
  const user = currentUser();
  if (!canAccessBoard(user)) return renderBoardLockedView(user);

  const posts = boardPosts.slice().sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return `
    <section class="view-title">
      <div>
        <h1>자료실</h1>
        <p>운영자 승인 후 공개되는 회원 자료를 모읍니다.</p>
      </div>
    </section>
    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>자료 등록 신청</h2>
              <p>${escapeHTML(user.name)}님으로 신청 · 관리자 승인 후 공개</p>
            </div>
          </div>
          <form class="grid" data-form="post-add">
            <div class="form-grid">
              <div class="form-field">
                <label for="post-category">분류</label>
                <select class="select" id="post-category" name="category">
                  <option>신장질환</option>
                  <option>식단/영양</option>
                  <option>수액</option>
                  <option>투약</option>
                  <option>검사</option>
                  <option>케어팁</option>
                  <option>후기/경험</option>
                </select>
              </div>
              <div class="form-field">
                <label for="post-cat">고양이</label>
                <select class="select" id="post-cat" name="catId">
                  <option value="">선택 안 함</option>
                  ${renderCatOptions(getActiveCat()?.id)}
                </select>
              </div>
              <div class="form-field full">
                <label for="post-title">자료 제목</label>
                <input class="control" id="post-title" name="title" placeholder="예: 피하수액 준비물 체크리스트" required />
              </div>
              <div class="form-field full">
                <label for="post-body">자료 내용 또는 링크</label>
                <textarea class="textarea" id="post-body" name="body" placeholder="본문, 참고 링크, 출처, 주의사항을 함께 적어주세요." required></textarea>
              </div>
            </div>
            <button class="btn primary" type="submit" ${user ? "" : "disabled"}>등록 신청</button>
          </form>
          <div class="notice" style="margin-top: 14px">
            신청한 자료는 운영자 승인 전까지 본인에게만 보입니다. 승인된 자료만 회원 자료실에 공개됩니다.
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>자료 목록</h2>
              <p>${boardLoading ? "불러오는 중" : `공개 자료와 내 신청 ${posts.length}개`}</p>
            </div>
          </div>
          ${boardError ? `<p class="field-help is-error">${escapeHTML(boardError)}</p>` : ""}
          ${boardLoading || !boardLoaded ? `<div class="empty">자료를 불러오는 중입니다.</div>` : ""}
          <div class="list">
            ${
              boardLoaded && !boardLoading
                ? posts.length
                  ? posts.map(renderPostItem).join("")
                  : `<div class="empty">아직 공개된 자료가 없습니다.</div>`
                : ""
            }
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderBoardLockedView(user) {
  const isDemo = isDemoUser(user);
  return `
    <section class="view-title">
      <div>
        <h1>자료실</h1>
        <p>자료실은 관리자 승인 완료 회원에게만 공개됩니다.</p>
      </div>
    </section>
    ${user ? "" : renderAuthPanel()}
    <section class="panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>회원 전용 자료실</h2>
            <p>${isDemo ? "둘러보기에서는 자료실 내용을 볼 수 없습니다." : "로그인과 관리자 승인이 필요합니다."}</p>
          </div>
          ${isDemo ? `<button class="btn secondary" data-action="logout">둘러보기 종료</button>` : ""}
        </div>
        <div class="notice">
          자료실 내용은 신이고 회원 확인 후 승인된 계정에게만 공개됩니다. 둘러보기 데이터와 비회원 상태에서는 자료 목록과 내용을 표시하지 않습니다.
        </div>
      </div>
    </section>
  `;
}

function renderPostItem(post) {
  const user = currentUser();
  const canDelete = user && post.userId === user.id;
  const comments = Array.isArray(post.comments) ? post.comments : [];
  const status = post.approvalStatus || "approved";
  const isApproved = status === "approved";
  const showStatus = canDelete || !isApproved;
  return `
    <article class="item">
      <div class="item-head">
        <div>
          <h3>${escapeHTML(post.title)}</h3>
          <p>${escapeHTML(post.author)} · ${escapeHTML(post.category)} · ${formatDateTime(post.createdAt)}${post.catName ? ` · ${escapeHTML(post.catName)}` : ""}</p>
        </div>
        ${canDelete ? `<button class="btn small danger" data-action="delete-post" data-id="${escapeAttr(post.id)}">삭제</button>` : ""}
      </div>
      <p class="post-body">${escapeHTML(post.body)}</p>
      <div class="chips">
        ${showStatus ? `<span class="chip ${isApproved ? "blue" : status === "rejected" ? "coral" : "amber"}">${renderBoardStatusLabel(status)}</span>` : ""}
        <span class="chip">${escapeHTML(post.category)}</span>
        ${isApproved ? `<span class="chip blue">의견 ${comments.length}</span>` : ""}
      </div>
      ${
        isApproved
          ? `${comments
              .map(
                (comment) => `
                  <div class="comment">
                    <strong>${escapeHTML(comment.author)}</strong>
                    <span> · ${formatDateTime(comment.createdAt)}</span>
                    <div>${escapeHTML(comment.body)}</div>
                  </div>
                `
              )
              .join("")}
            <form class="actions" data-form="comment-add" style="margin-top: 10px">
              <input type="hidden" name="postId" value="${escapeAttr(post.id)}" />
              <label class="sr-only" for="comment-${escapeAttr(post.id)}">의견</label>
              <input class="control" id="comment-${escapeAttr(post.id)}" name="body" placeholder="의견" required ${user ? "" : "disabled"} />
              <button class="btn secondary" type="submit" ${user ? "" : "disabled"}>등록</button>
            </form>`
          : `<div class="notice" style="margin-top: 10px">${status === "rejected" ? "보류된 자료입니다. 운영자 메모가 있으면 확인 후 다시 정리해주세요." : "관리자 승인 후 다른 회원에게 공개됩니다."}</div>`
      }
    </article>
  `;
}

function isDemoUser(user = currentUser()) {
  return Boolean(user && (user.email === "demo@sinego.local" || user.naverId === "demo_naver"));
}

function canAccessBoard(user = currentUser()) {
  return Boolean(user && !isDemoUser(user) && getAuthToken());
}

function requireBoardUser() {
  const user = currentUser();
  if (!user) {
    showToast("자료실은 승인 회원 로그인 후 이용할 수 있습니다.");
    render();
    return null;
  }
  if (isDemoUser(user)) {
    showToast("둘러보기에서는 자료실을 볼 수 없습니다.");
    render();
    return null;
  }
  if (!getAuthToken()) {
    showToast("자료실은 서버 DB에 로그인한 승인 회원만 이용할 수 있습니다.");
    render();
    return null;
  }
  return user;
}

function queueBoardPostsLoad() {
  if (!canAccessBoard() || boardLoading || boardLoaded) return;
  loadBoardPosts();
}

async function loadBoardPosts() {
  if (!canAccessBoard()) return;
  boardLoading = true;
  boardError = "";
  render();
  try {
    const payload = await apiRequest("/api/board/posts", { auth: true });
    boardPosts = Array.isArray(payload.posts) ? payload.posts : [];
    boardLoaded = true;
  } catch (error) {
    boardPosts = [];
    boardLoaded = true;
    boardError = formatBoardError(error);
    if (error.status === 401 || error.status === 403) clearAuthToken();
  } finally {
    boardLoading = false;
    render();
  }
}

function formatBoardError(error) {
  const code = error?.payload?.code;
  if (code === "database_not_configured") return "자료실은 서버 DB 연결 후 이용할 수 있습니다.";
  if (code === "auth_required" || code === "session_expired") return "다시 로그인한 뒤 자료실을 이용해주세요.";
  if (code === "approval_required") return "관리자 승인 완료 후 자료실을 이용할 수 있습니다.";
  return error?.message || "자료를 불러오지 못했습니다.";
}

async function createBoardPost(formData) {
  const user = requireBoardUser();
  if (!user) return;
  const cat = state.cats.find((item) => item.id === String(formData.get("catId")));
  try {
    const payload = await apiRequest("/api/board/posts", {
      method: "POST",
      auth: true,
      body: {
        category: String(formData.get("category")),
        catName: cat?.name || "",
        title: String(formData.get("title")).trim(),
        body: String(formData.get("body")).trim()
      }
    });
    boardPosts = [payload.post, ...boardPosts.filter((post) => post.id !== payload.post.id)];
    boardLoaded = true;
    boardError = "";
    showToast("자료 등록 신청이 접수되었습니다. 운영자 승인 후 공개됩니다.");
    render();
  } catch (error) {
    boardError = formatBoardError(error);
    showToast(error.message || "자료 등록 신청을 처리하지 못했습니다.");
    render();
  }
}

async function deleteBoardPost(postId) {
  const user = requireBoardUser();
  if (!user) return;
  try {
    await apiRequest(`/api/board/posts/${encodeURIComponent(postId)}`, {
      method: "DELETE",
      auth: true
    });
    boardPosts = boardPosts.filter((post) => post.id !== postId);
    showToast("자료를 삭제했습니다.");
    render();
  } catch (error) {
    boardError = formatBoardError(error);
    showToast(error.message || "자료를 삭제하지 못했습니다.");
    render();
  }
}

async function createBoardComment(formData) {
  const user = requireBoardUser();
  if (!user) return;
  const postId = String(formData.get("postId"));
  try {
    const payload = await apiRequest(`/api/board/posts/${encodeURIComponent(postId)}/comments`, {
      method: "POST",
      auth: true,
      body: { body: String(formData.get("body")).trim() }
    });
    const post = boardPosts.find((item) => item.id === postId);
    if (post) {
      post.comments = [...(Array.isArray(post.comments) ? post.comments : []), payload.comment];
    }
    render();
  } catch (error) {
    boardError = formatBoardError(error);
    showToast(error.message || "의견을 등록하지 못했습니다.");
    render();
  }
}

function handleAction(actionName, element) {
  if (actionName === "logout") {
    state.sessionUserId = null;
    state.editingMedicationPlanId = null;
    clearAuthToken();
    resetBoardCache();
    saveState();
    showToast("로그아웃했습니다.");
    render();
    return;
  }

  if (actionName === "start-demo") {
    state.editingMedicationPlanId = null;
    resetBoardCache();
    startDemo();
    return;
  }

  if (actionName === "edit-pending-signup") {
    state.pendingSignup = null;
    saveState();
    showToast("가입 신청 정보를 다시 입력할 수 있습니다.");
    render();
    return;
  }

  if (actionName === "copy-support-account") {
    if (!supportAccountText) return;
    navigator.clipboard?.writeText(supportAccountText);
    showToast("후원 계좌를 복사했습니다.");
    render();
    return;
  }

  if (actionName === "admin-clear-token") {
    clearAdminToken();
    adminUsers = [];
    adminSearchQuery = "";
    adminLoadedStatus = "";
    adminError = "";
    adminCounts = { pending: 0, approved: 0, rejected: 0 };
    adminBoardPosts = [];
    adminBoardSearchQuery = "";
    adminBoardLoadedStatus = "";
    adminBoardError = "";
    adminBoardCounts = { pending: 0, approved: 0, rejected: 0 };
    showToast("관리자 토큰을 삭제했습니다.");
    render();
    return;
  }

  if (actionName === "admin-refresh") {
    adminLoadedStatus = "";
    adminBoardLoadedStatus = "";
    loadAdminUsers();
    loadAdminBoardPosts();
    return;
  }

  if (actionName === "admin-filter") {
    adminStatusFilter = element.dataset.status || "pending";
    adminLoadedStatus = "";
    render();
    return;
  }

  if (actionName === "admin-search-clear") {
    adminSearchQuery = "";
    adminLoadedStatus = "";
    render();
    return;
  }

  if (actionName === "admin-approval") {
    const card = element.closest(".admin-user-card");
    const adminNote = card?.querySelector("[name='adminNote']")?.value || "";
    const catLimit = card?.querySelector("[name='catLimit']")?.value || "";
    updateAdminApproval(element.dataset.id, element.dataset.status, adminNote, { catLimit });
    return;
  }

  if (actionName === "admin-board-filter") {
    adminBoardStatusFilter = element.dataset.status || "pending";
    adminBoardLoadedStatus = "";
    render();
    return;
  }

  if (actionName === "admin-board-search-clear") {
    adminBoardSearchQuery = "";
    adminBoardLoadedStatus = "";
    render();
    return;
  }

  if (actionName === "admin-board-approval") {
    const card = element.closest(".admin-board-card");
    const adminNote = card?.querySelector("[name='adminNote']")?.value || "";
    updateAdminBoardApproval(element.dataset.id, element.dataset.status, adminNote);
    return;
  }

  if (actionName === "select-cat") {
    state.activeCatId = element.dataset.id;
    saveState();
    render();
    return;
  }

  if (actionName === "select-lab-trend") {
    state.selectedLabTrendKey = element.dataset.key || "crea";
    saveState();
    render();
    return;
  }

  if (actionName === "select-lab-trend-range") {
    state.selectedLabTrendRange = element.dataset.range || "3m";
    saveState();
    render();
    return;
  }

  if (actionName === "select-weight-trend-range") {
    state.selectedWeightTrendRange = element.dataset.range || "3m";
    saveState();
    render();
    return;
  }

  if (actionName === "edit-cat") {
    state.editingCatId = element.dataset.id;
    state.activeCatId = element.dataset.id;
    saveState();
    render();
    return;
  }

  if (actionName === "cancel-cat-edit") {
    state.editingCatId = null;
    saveState();
    render();
    return;
  }

  if (actionName === "delete-cat") {
    const cat = state.cats.find((item) => item.id === element.dataset.id);
    if (!cat) return;
    if (!confirm(`${cat.name} 프로필과 관련 기록을 삭제할까요?`)) return;
    state.cats = state.cats.filter((item) => item.id !== cat.id);
    state.fluidPlans = state.fluidPlans.filter((item) => item.catId !== cat.id);
    state.fluidLogs = state.fluidLogs.filter((log) =>
      state.fluidPlans.some((plan) => plan.id === log.planId)
    );
    state.medicationPlans = state.medicationPlans.filter((item) => item.catId !== cat.id);
    state.medicationLogs = state.medicationLogs.filter((log) =>
      state.medicationPlans.some((plan) => plan.id === log.planId)
    );
    state.symptomLogs = state.symptomLogs.filter((item) => item.catId !== cat.id);
    state.labLogs = state.labLogs.filter((item) => item.catId !== cat.id);
    state.weightLogs = state.weightLogs.filter((item) => item.catId !== cat.id);
    if (state.activeCatId === cat.id) state.activeCatId = getUserCats()[0]?.id || null;
    if (state.editingCatId === cat.id) state.editingCatId = null;
    if (state.editingMedicationPlanId && !state.medicationPlans.some((plan) => plan.id === state.editingMedicationPlanId)) {
      state.editingMedicationPlanId = null;
    }
    saveState();
    showToast("프로필을 삭제했습니다.");
    render();
    return;
  }

  if (actionName === "delete-fluid-plan") {
    state.fluidPlans = state.fluidPlans.filter((plan) => plan.id !== element.dataset.id);
    state.fluidLogs = state.fluidLogs.filter((log) => log.planId !== element.dataset.id);
    saveState();
    showToast("수액 계획을 삭제했습니다.");
    render();
    return;
  }

  if (actionName === "edit-medication-plan") {
    const plan = state.medicationPlans.find((item) => item.id === element.dataset.id);
    if (!plan) return;
    state.editingMedicationPlanId = plan.id;
    state.activeCatId = plan.catId;
    saveState();
    render();
    return;
  }

  if (actionName === "cancel-medication-edit") {
    state.editingMedicationPlanId = null;
    saveState();
    render();
    return;
  }

  if (actionName === "delete-medication-plan") {
    state.medicationPlans = state.medicationPlans.filter((plan) => plan.id !== element.dataset.id);
    state.medicationLogs = state.medicationLogs.filter((log) => log.planId !== element.dataset.id);
    if (state.editingMedicationPlanId === element.dataset.id) state.editingMedicationPlanId = null;
    saveState();
    showToast("투약 계획을 삭제했습니다.");
    render();
    return;
  }

  if (actionName === "delete-symptom-log") {
    state.symptomLogs = state.symptomLogs.filter((log) => log.id !== element.dataset.id);
    saveState();
    showToast("증상 기록을 삭제했습니다.");
    render();
    return;
  }

  if (actionName === "complete-fluid") {
    const user = requireUser();
    if (!user) return;
    const planId = element.dataset.planId;
    const date = element.dataset.date;
    const time = element.dataset.time;
    if (!isFluidCompleted(planId, date, time)) {
      state.fluidLogs.push({
        id: uid("fluidlog"),
        userId: user.id,
        planId,
        date,
        time,
        completedAt: new Date().toISOString()
      });
    }
    saveState();
    showToast("수액 완료 기록을 남겼습니다.");
    render();
    return;
  }

  if (actionName === "complete-medication") {
    const user = requireUser();
    if (!user) return;
    const planId = element.dataset.planId;
    const date = element.dataset.date;
    const time = element.dataset.time;
    if (!isMedicationCompleted(planId, date, time)) {
      state.medicationLogs.push({
        id: uid("medlog"),
        userId: user.id,
        planId,
        date,
        time,
        completedAt: new Date().toISOString()
      });
    }
    saveState();
    showToast("투약 완료 기록을 남겼습니다.");
    render();
    return;
  }

  if (actionName === "read-lab-pdf") {
    const input = document.querySelector("#lab-pdf");
    handleLabPdfUpload(input, { force: true });
    return;
  }

  if (actionName === "select-food") {
    state.selectedFoodId = element.dataset.id;
    state.nutritionResult = null;
    saveState();
    render();
    return;
  }

  if (actionName === "delete-weight") {
    state.weightLogs = state.weightLogs.filter((log) => log.id !== element.dataset.id);
    saveState();
    showToast("체중 기록을 삭제했습니다.");
    render();
    return;
  }

  if (actionName === "delete-lab-log") {
    state.labLogs = state.labLogs.filter((log) => log.id !== element.dataset.id);
    saveState();
    showToast("검사 기록을 삭제했습니다.");
    render();
    return;
  }

  if (actionName === "delete-resource") {
    state.customResources = state.customResources.filter((resource) => resource.id !== element.dataset.id);
    saveState();
    showToast("자료를 삭제했습니다.");
    render();
    return;
  }

  if (actionName === "delete-post") {
    deleteBoardPost(element.dataset.id);
    return;
  }

  if (actionName === "export-data") {
    exportData();
    return;
  }

  if (actionName === "toggle-dashboard-report") {
    if (!getActiveCat()) {
      showToast("고양이 프로필을 먼저 등록해주세요.");
      return;
    }
    state.showDashboardReport = !state.showDashboardReport;
    saveState();
    render();
    if (state.showDashboardReport) {
      requestAnimationFrame(() => {
        document.querySelector("#dashboard-report-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    return;
  }

  if (actionName === "print-report") {
    const form = document.querySelector('form[data-form="report-settings"]');
    if (form) applyReportSettingsForm(form);
    render();
    requestAnimationFrame(() => window.print());
    return;
  }

  if (actionName === "delete-account") {
    deleteCurrentAccount();
    return;
  }
}

async function handleForm(formName, form) {
  const data = new FormData(form);

  if (formName === "admin-token") {
    const token = String(data.get("adminToken") || "").trim();
    if (!token) {
      showToast("관리자 토큰을 입력해주세요.");
      render();
      return;
    }
    setAdminToken(token);
    adminStatusFilter = "pending";
    adminSearchQuery = "";
    adminCounts = { pending: 0, approved: 0, rejected: 0 };
    adminLoadedStatus = "";
    adminError = "";
    adminBoardStatusFilter = "pending";
    adminBoardSearchQuery = "";
    adminBoardCounts = { pending: 0, approved: 0, rejected: 0 };
    adminBoardLoadedStatus = "";
    adminBoardError = "";
    showToast("관리자 토큰을 저장했습니다.");
    render();
    return;
  }

  if (formName === "admin-search") {
    adminSearchQuery = String(data.get("query") || "").trim();
    adminLoadedStatus = "";
    render();
    return;
  }

  if (formName === "admin-note") {
    const userId = String(data.get("userId") || "");
    const approvalStatus = String(data.get("approvalStatus") || "pending");
    const adminNote = String(data.get("adminNote") || "").trim();
    const catLimit = String(data.get("catLimit") || "");
    updateAdminApproval(userId, approvalStatus, adminNote, { noteOnly: true, catLimit });
    return;
  }

  if (formName === "admin-board-search") {
    adminBoardSearchQuery = String(data.get("query") || "").trim();
    adminBoardLoadedStatus = "";
    render();
    return;
  }

  if (formName === "admin-board-note") {
    const postId = String(data.get("postId") || "");
    const approvalStatus = String(data.get("approvalStatus") || "pending");
    const adminNote = String(data.get("adminNote") || "").trim();
    updateAdminBoardApproval(postId, approvalStatus, adminNote, { noteOnly: true });
    return;
  }

  if (formName === "report-settings") {
    applyReportSettingsForm(form);
    showToast("진료 리포트를 갱신했습니다.");
    render();
    return;
  }

  if (formName === "signup") {
    const email = String(data.get("email")).trim().toLowerCase();
    const naverId = String(data.get("naverId")).trim();
    const cafeNickname = String(data.get("cafeNickname")).trim();
    const password = String(data.get("password"));

    try {
      const payload = await apiRequest("/api/signup", {
        method: "POST",
        body: { email, naverId, cafeNickname, password }
      });
      clearAuthToken();
      state.sessionUserId = null;
      rememberPendingSignup(
        payload.user || {
          email,
          naverId,
          cafeNickname,
          approvalStatus: "pending",
          approvalRequestedAt: new Date().toISOString()
        }
      );
      saveState();
      showToast("가입 신청이 접수되었습니다. 운영자 승인 후 로그인할 수 있습니다.");
      render();
      return;
    } catch (error) {
      if (!shouldUseLocalFallback(error)) {
        showToast(error.message || "가입 신청을 처리하지 못했습니다.");
        render();
        return;
      }
    }

    const existingUser = state.users.find((user) => user.email === email);
    if (existingUser) {
      const status = getApprovalStatus(existingUser);
      showToast(status === "pending" ? "이미 가입 신청된 이메일입니다. 관리자 승인 후 로그인할 수 있습니다." : "이미 가입된 이메일입니다.");
      render();
      return;
    }
    if (state.users.some((user) => String(user.naverId || "").toLowerCase() === naverId.toLowerCase())) {
      showToast("이미 가입 신청된 네이버 ID입니다.");
      render();
      return;
    }
    const user = {
      id: uid("user"),
      name: cafeNickname,
      naverId,
      cafeNickname,
      email,
      password,
      approvalStatus: "pending",
      approvalRequestedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    state.users.push(user);
    state.sessionUserId = null;
    rememberPendingSignup(user);
    saveState();
    showToast("가입 신청이 접수되었습니다. 운영자 승인 후 로그인할 수 있습니다.");
    render();
    return;
  }

  if (formName === "login") {
    const email = String(data.get("email")).trim().toLowerCase();
    const password = String(data.get("password"));

    try {
      const payload = await apiRequest("/api/login", {
        method: "POST",
        body: { email, password }
      });
      setAuthToken(payload.token);
      if (payload.state && Object.keys(payload.state).length) {
        isApplyingRemoteState = true;
        replaceState(payload.state);
        isApplyingRemoteState = false;
      }
      upsertUser(payload.user);
      state.sessionUserId = payload.user.id;
      state.pendingSignup = null;
      state.editingMedicationPlanId = null;
      resetBoardCache();
      saveState();
      showToast("로그인했습니다.");
      render();
      return;
    } catch (error) {
      isApplyingRemoteState = false;
      if (!shouldUseLocalFallback(error)) {
        if (error.payload?.code === "approval_pending") {
          rememberPendingSignup({
            email,
            approvalStatus: "pending",
            approvalRequestedAt: new Date().toISOString()
          });
          saveState();
        }
        showToast(error.message || "로그인 정보를 확인해주세요.");
        render();
        return;
      }
    }

    const user = state.users.find((item) => item.email === email && item.password === password);
    if (!user) {
      showToast("이메일 또는 비밀번호를 확인해주세요.");
      render();
      return;
    }
    const status = getApprovalStatus(user);
    if (status === "pending") {
      rememberPendingSignup(user);
      saveState();
      showToast("관리자 승인 대기 중입니다. 신이고 회원 확인 후 이용할 수 있습니다.");
      render();
      return;
    }
    if (status === "rejected") {
      showToast("가입 승인이 보류된 계정입니다. 운영자에게 문의해주세요.");
      render();
      return;
    }
    state.sessionUserId = user.id;
    state.pendingSignup = null;
    state.editingMedicationPlanId = null;
    resetBoardCache();
    saveState();
    showToast("로그인했습니다.");
    render();
    return;
  }

  if (formName === "cat") {
    const user = requireUser();
    if (!user) return;
    const catId = String(data.get("id") || "");
    const existingCat = state.cats.find((item) => item.id === catId && item.userId === user.id);
    const catLimit = getUserCatLimit(user);
    if (!existingCat && getUserCats().length >= catLimit) {
      showToast(`고양이는 계정당 ${catLimit}마리까지 등록할 수 있습니다. 추가 등록이 필요하면 운영자에게 문의해주세요.`);
      render();
      return;
    }
    const birthYear = normalizeBirthYear(data.get("birthYear"));
    if (!birthYear) {
      showToast("추정 출생연도를 입력해주세요.");
      render();
      return;
    }
    const catData = {
      id: existingCat?.id || uid("cat"),
      userId: user.id,
      name: String(data.get("name")).trim(),
      birthYear,
      ageYears: getAgeYearsFromBirthYear(birthYear),
      weightKg: toNumber(data.get("weightKg")),
      bcs: toNumber(data.get("bcs")),
      neutered: String(data.get("neutered")),
      activity: String(data.get("activity")),
      health: data.getAll("health").map(String),
      createdAt: new Date().toISOString()
    };
    if (existingCat) {
      Object.assign(existingCat, {
        ...catData,
        createdAt: existingCat.createdAt,
        updatedAt: new Date().toISOString()
      });
    } else {
      state.cats.push(catData);
    }
    state.activeCatId = catData.id;
    state.editingCatId = null;
    saveState();
    showToast(existingCat ? `${catData.name} 프로필을 수정했습니다.` : `${catData.name} 프로필을 추가했습니다.`);
    render();
    return;
  }

  if (formName === "fluid-plan") {
    const user = requireUser();
    if (!user) return;
    const times = buildTimes(String(data.get("firstTime")), toNumber(data.get("timesPerDay")));
    const doseMl = toNumber(data.get("doseMl"));
    if (doseMl <= 0) {
      showToast("수액량은 1ml 이상으로 입력해주세요.");
      render();
      return;
    }
    state.fluidPlans.push({
      id: uid("fluid"),
      userId: user.id,
      catId: String(data.get("catId")),
      name: String(data.get("name")).trim(),
      fluidType: String(data.get("fluidType") || "하트만"),
      doseMl,
      timesPerDay: toNumber(data.get("timesPerDay")),
      intervalDays: toNumber(data.get("intervalDays")),
      times,
      startDate: String(data.get("startDate")),
      notes: String(data.get("notes") || "").trim(),
      active: true,
      createdAt: new Date().toISOString()
    });
    saveState();
    showToast("수액 스케줄을 저장했습니다.");
    render();
    return;
  }

  if (formName === "medication-plan") {
    const user = requireUser();
    if (!user) return;
    const editingPlanId = String(data.get("id") || "");
    const existingPlan = editingPlanId
      ? state.medicationPlans.find((plan) => plan.id === editingPlanId && plan.userId === user.id)
      : null;
    if (editingPlanId && !existingPlan) {
      state.editingMedicationPlanId = null;
      saveState();
      showToast("수정할 투약 계획을 찾지 못했습니다.");
      render();
      return;
    }
    const times = buildTimes(String(data.get("firstTime")), toNumber(data.get("timesPerDay")));
    const manualName = String(data.get("name") || "").trim();
    const selectedPreset = getMedicationPreset(String(data.get("presetKey") || ""));
    const selectedPresets = data
      .getAll("presetKeys")
      .map((key) => getMedicationPreset(String(key)))
      .filter(Boolean);
    if (!existingPlan && selectedPreset && !selectedPresets.some((preset) => preset.key === selectedPreset.key)) {
      selectedPresets.push(selectedPreset);
    }
    const manualPreset = findMedicationPresetByLabel(manualName);
    const useSelectedPresetForEdit =
      existingPlan && selectedPreset && (!manualName || manualName === selectedPreset.label);
    const entries = existingPlan
      ? [
          {
            label: manualName || selectedPreset?.label || "",
            category: useSelectedPresetForEdit
              ? selectedPreset.category
              : manualPreset?.category || String(data.get("category")),
            classification: useSelectedPresetForEdit
              ? selectedPreset.classification
              : manualPreset?.classification || existingPlan.classification || ""
          }
        ]
      : selectedPresets.length
        ? selectedPresets
        : [{ label: manualName, category: String(data.get("category")), classification: manualPreset?.classification || "" }];
    if (!entries[0].label) {
      showToast("이름을 입력하거나 체크리스트에서 선택해주세요.");
      render();
      return;
    }
    const basePlan = {
      userId: user.id,
      catId: String(data.get("catId")),
      dose: String(data.get("dose")).trim(),
      route: String(data.get("route")),
      timesPerDay: toNumber(data.get("timesPerDay")),
      intervalDays: toNumber(data.get("intervalDays")),
      times,
      startDate: String(data.get("startDate")),
      endDate: String(data.get("endDate") || ""),
      notes: String(data.get("notes") || "").trim(),
      active: true
    };
    if (existingPlan) {
      const entry = entries[0];
      Object.assign(existingPlan, {
        ...basePlan,
        name: entry.label,
        category: entry.category,
        classification: entry.classification || "",
        createdAt: existingPlan.createdAt,
        updatedAt: new Date().toISOString()
      });
      state.activeCatId = basePlan.catId;
      state.editingMedicationPlanId = null;
      saveState();
      showToast("투약·영양제 스케줄을 수정했습니다.");
      render();
      return;
    }
    entries.forEach((entry) => {
      state.medicationPlans.push({
        id: uid("med"),
        ...basePlan,
        name: entry.label,
        category: manualPreset && entry.label === manualName ? manualPreset.category : entry.category,
        classification: entry.classification || "",
        createdAt: new Date().toISOString()
      });
    });
    saveState();
    showToast(entries.length > 1 ? `${entries.length}개 스케줄을 저장했습니다.` : "투약·영양제 스케줄을 저장했습니다.");
    render();
    return;
  }

  if (formName === "food-search") {
    state.foodQuery = String(data.get("query") || "");
    saveState();
    render();
    return;
  }

  if (formName === "nutrition-calc") {
    const input = {
      foodName: String(data.get("foodName")).trim(),
      kcal100g: toNumber(data.get("kcal100g")),
      targetKcal: toNumber(data.get("targetKcal")),
      moisture: toNumber(data.get("moisture")),
      protein: toNumber(data.get("protein")),
      fat: toNumber(data.get("fat")),
      fiber: toNumber(data.get("fiber")),
      ash: toNumber(data.get("ash")),
      phosphorus: toNumber(data.get("phosphorus")),
      sodium: toNumber(data.get("sodium"))
    };
    state.nutritionResult = calculateNutrition(input);
    saveState();
    render();
    return;
  }

  if (formName === "mix-calc") {
    const input = {
      targetKcal: toNumber(data.get("targetKcal")),
      wetKcal100g: toNumber(data.get("wetKcal100g")),
      dryKcal100g: toNumber(data.get("dryKcal100g")),
      wetShare: toNumber(data.get("wetShare")),
      wetPackGram: toNumber(data.get("wetPackGram")),
      mealCount: toNumber(data.get("mealCount"))
    };
    const wetKcal = input.targetKcal * (input.wetShare / 100);
    const dryKcal = input.targetKcal - wetKcal;
    const wetGram = wetKcal / (input.wetKcal100g / 100);
    const dryGram = dryKcal / (input.dryKcal100g / 100);
    state.mixResult = {
      input,
      wetGram,
      dryGram,
      wetPack: wetGram / input.wetPackGram,
      wetPerMeal: wetGram / input.mealCount,
      dryPerMeal: dryGram / input.mealCount
    };
    saveState();
    render();
    return;
  }

  if (formName === "snack-calc") {
    const input = {
      targetKcal: toNumber(data.get("targetKcal")),
      snackKcal100g: toNumber(data.get("snackKcal100g")),
      snackGram: toNumber(data.get("snackGram"))
    };
    const kcal = input.snackGram * (input.snackKcal100g / 100);
    state.snackResult = {
      input,
      kcal,
      percent: (kcal / input.targetKcal) * 100,
      maxGram: (input.targetKcal * 0.1) / (input.snackKcal100g / 100)
    };
    saveState();
    render();
    return;
  }

  if (formName === "food-add") {
    const user = requireUser();
    if (!user) return;
    const food = {
      id: uid("customfood"),
      userId: user.id,
      name: String(data.get("name")).trim(),
      brand: String(data.get("brand") || "직접 추가").trim(),
      type: String(data.get("type")),
      kcal100g: toNumber(data.get("kcal100g")),
      moisture: toNumber(data.get("moisture")),
      protein: toNumber(data.get("protein")),
      fat: toNumber(data.get("fat")),
      fiber: toNumber(data.get("fiber")),
      ash: toNumber(data.get("ash")),
      phosphorus: toNumber(data.get("phosphorus")),
      sodium: toNumber(data.get("sodium")),
      notes: String(data.get("notes") || "").trim(),
      createdAt: new Date().toISOString()
    };
    state.customFoods.push(food);
    state.selectedFoodId = food.id;
    state.foodQuery = "";
    saveState();
    showToast("식품을 저장했습니다.");
    render();
    return;
  }

  if (formName === "symptom-log") {
    const user = requireUser();
    if (!user) return;
    state.symptomLogs.push({
      id: uid("symptom"),
      userId: user.id,
      catId: String(data.get("catId")),
      date: String(data.get("date")),
      vomitCount: Math.max(0, Math.round(toNumber(data.get("vomitCount")))),
      vomitColor: String(data.get("vomitColor") || "없음"),
      diarrheaCount: Math.max(0, Math.round(toNumber(data.get("diarrheaCount")))),
      stoolColor: String(data.get("stoolColor") || "없음"),
      stoolState: String(data.get("stoolState") || "정상"),
      notes: String(data.get("notes") || "").trim(),
      createdAt: new Date().toISOString()
    });
    saveState();
    showToast("증상 기록을 저장했습니다.");
    render();
    return;
  }

  if (formName === "weight-log") {
    const user = requireUser();
    if (!user) return;
    const catId = String(data.get("catId"));
    const log = {
      id: uid("weight"),
      userId: user.id,
      catId,
      date: String(data.get("date")),
      weightKg: toNumber(data.get("weightKg")),
      appetite: String(data.get("appetite")),
      notes: String(data.get("notes") || "").trim(),
      createdAt: new Date().toISOString()
    };
    state.weightLogs.push(log);
    const cat = state.cats.find((item) => item.id === catId);
    if (cat) cat.weightKg = log.weightKg;
    saveState();
    showToast("체중을 기록했습니다.");
    render();
    return;
  }

  if (formName === "lab-log") {
    const user = requireUser();
    if (!user) return;
    const values = {};
    const invalidLabels = [];
    getLabFields().forEach((field) => {
      const rawValue = String(data.get(field.key) || "").trim();
      if (rawValue === "") return;
      const number = Number(rawValue.replaceAll(",", ""));
      if (Number.isFinite(number)) {
        values[field.key] = number;
      } else {
        invalidLabels.push(field.label);
      }
    });
    if (invalidLabels.length) {
      showToast(`${invalidLabels.slice(0, 3).join(", ")} 수치는 숫자로 입력해주세요.`);
      render();
      return;
    }
    if (!Object.keys(values).length) {
      showToast("하나 이상의 검사 수치를 입력해주세요.");
      render();
      return;
    }
    state.labLogs.push({
      id: uid("lab"),
      userId: user.id,
      catId: String(data.get("catId")),
      date: String(data.get("date")),
      hospital: String(data.get("hospital") || "").trim(),
      reportName: String(data.get("reportName") || "").trim(),
      values,
      notes: String(data.get("notes") || "").trim(),
      createdAt: new Date().toISOString()
    });
    saveState();
    showToast("검사 수치를 기록했습니다.");
    render();
    return;
  }

  if (formName === "resource-add") {
    const user = requireUser();
    if (!user) return;
    state.customResources.push({
      id: uid("customresource"),
      userId: user.id,
      title: String(data.get("title")).trim(),
      category: String(data.get("category")).trim(),
      url: String(data.get("url")).trim(),
      summary: String(data.get("summary") || "").trim(),
      tags: ["직접추가"],
      createdAt: new Date().toISOString()
    });
    saveState();
    showToast("자료를 저장했습니다.");
    render();
    return;
  }

  if (formName === "post-add") {
    await createBoardPost(data);
    return;
  }

  if (formName === "comment-add") {
    await createBoardComment(data);
  }
}

function currentUser() {
  const user = state.users.find((item) => item.id === state.sessionUserId) || null;
  if (!user || getApprovalStatus(user) !== "approved") return null;
  return user;
}

function getApprovalStatus(user) {
  return user?.approvalStatus || "approved";
}

function normalizeCatLimit(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return DEFAULT_CAT_LIMIT_PER_USER;
  return Math.min(MAX_CAT_LIMIT_PER_USER, Math.max(1, Math.floor(number)));
}

function getUserCatLimit(user = currentUser()) {
  return normalizeCatLimit(user?.catLimit);
}

function normalizeReportSettings(settings = {}) {
  const sectionKeys = reportSectionOptions.map((section) => section.key);
  const selectedSections = Array.isArray(settings.sections)
    ? settings.sections.filter((section) => sectionKeys.includes(section))
    : [];
  const range = reportRanges.some((option) => option.key === settings.range) ? settings.range : "3m";
  return {
    catId: String(settings.catId || ""),
    range,
    sections: selectedSections.length ? selectedSections : sectionKeys,
    questions: String(settings.questions || "").slice(0, 3000)
  };
}

function getReportRange(rangeKey = "3m") {
  return reportRanges.find((range) => range.key === rangeKey) || reportRanges[0];
}

function getReportCat(cats = getUserCats(), settings = normalizeReportSettings(state.reportSettings)) {
  return (
    cats.find((cat) => cat.id === settings.catId) ||
    cats.find((cat) => cat.id === state.activeCatId) ||
    cats[0] ||
    null
  );
}

function applyReportSettingsForm(form) {
  const data = new FormData(form);
  const settings = normalizeReportSettings({
    catId: data.get("catId"),
    range: data.get("range"),
    sections: data.getAll("sections").map(String),
    questions: data.get("questions")
  });
  state.reportSettings = settings;
  if (settings.catId) state.activeCatId = settings.catId;
  saveState();
  return settings;
}

function getReportLogs(logs, rangeKey = "3m") {
  const sorted = logs
    .filter((log) => log.date)
    .slice()
    .sort((a, b) => `${a.date}T${a.createdAt || ""}`.localeCompare(`${b.date}T${b.createdAt || ""}`));
  const range = getReportRange(rangeKey);
  if (!range.days) return sorted;
  const anchorDate = todayISO();
  return sorted.filter((log) => {
    const distance = daysBetween(log.date, anchorDate);
    return distance >= 0 && distance <= range.days;
  });
}

function renderActivityLabel(value) {
  if (value === "low") return "낮음";
  if (value === "active") return "높음";
  return "보통";
}

function requireUser() {
  const user = currentUser();
  if (!user) {
    showToast("회원가입, 로그인 또는 둘러보기를 먼저 선택해주세요.");
    return null;
  }
  return user;
}

function getUserCats() {
  const user = currentUser();
  if (!user) return [];
  return state.cats.filter((cat) => cat.userId === user.id);
}

function getActiveCat() {
  const cats = getUserCats();
  if (!cats.length) return null;
  const active = cats.find((cat) => cat.id === state.activeCatId) || cats[0];
  if (state.activeCatId !== active.id) {
    state.activeCatId = active.id;
    saveState();
  }
  return active;
}

function getActiveCatWeightLogs() {
  const cat = getActiveCat();
  if (!cat) return [];
  return state.weightLogs
    .filter((log) => log.catId === cat.id)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
}

function getSelectedWeightTrendRange() {
  const selectedRange = state.selectedWeightTrendRange || "3m";
  return weightTrendRanges.some((range) => range.key === selectedRange) ? selectedRange : "3m";
}

function getWeightTrendRange(rangeKey = getSelectedWeightTrendRange()) {
  return weightTrendRanges.find((range) => range.key === rangeKey) || weightTrendRanges[0];
}

function getWeightTrendLogs(logs, rangeKey = getSelectedWeightTrendRange()) {
  const points = logs
    .map((log) => ({ ...log, weightKg: Number(log.weightKg) }))
    .filter((log) => log.date && Number.isFinite(log.weightKg));
  const rangeOption = getWeightTrendRange(rangeKey);
  if (!rangeOption.days) return points;
  const anchorDate = points.at(-1)?.date || logs.at(-1)?.date || todayISO();
  return points.filter((log) => {
    const distance = daysBetween(log.date, anchorDate);
    return distance >= 0 && distance <= rangeOption.days;
  });
}

function getActiveCatSymptomLogs() {
  const cat = getActiveCat();
  if (!cat) return [];
  return state.symptomLogs
    .filter((log) => log.catId === cat.id)
    .slice()
    .sort((a, b) => `${a.date}T${a.createdAt || ""}`.localeCompare(`${b.date}T${b.createdAt || ""}`));
}

function getActiveCatLabLogs() {
  const cat = getActiveCat();
  if (!cat) return [];
  return state.labLogs
    .filter((log) => log.catId === cat.id)
    .slice()
    .sort((a, b) => `${a.date}T${a.createdAt || ""}`.localeCompare(`${b.date}T${b.createdAt || ""}`));
}

function getSelectedLabTrendKey(logs = []) {
  const fieldKeys = getLabFields().map((field) => field.key);
  const selectedKey = state.selectedLabTrendKey || "crea";
  if (fieldKeys.includes(selectedKey)) return selectedKey;
  return (
    labSummaryKeys.find((key) => logs.some((log) => Number.isFinite(Number(log.values?.[key])))) ||
    "crea"
  );
}

function getSelectedLabTrendRange() {
  const selectedRange = state.selectedLabTrendRange || "3m";
  return labTrendRanges.some((range) => range.key === selectedRange) ? selectedRange : "3m";
}

function getLabTrendRange(rangeKey = getSelectedLabTrendRange()) {
  return labTrendRanges.find((range) => range.key === rangeKey) || labTrendRanges[0];
}

function getLabTrendLogs(logs, key, rangeKey = getSelectedLabTrendRange()) {
  const points = logs
    .map((log) => ({ ...log, value: Number(log.values?.[key]) }))
    .filter((log) => log.date && Number.isFinite(log.value));
  const rangeOption = getLabTrendRange(rangeKey);
  if (!rangeOption.days) return points;
  const anchorDate = points.at(-1)?.date || logs.at(-1)?.date || todayISO();
  return points.filter((log) => {
    const distance = daysBetween(log.date, anchorDate);
    return distance >= 0 && distance <= rangeOption.days;
  });
}

function formatLabTrendChange(latestValue, firstValue, field) {
  const delta = Number(latestValue) - Number(firstValue);
  if (!Number.isFinite(delta)) return "-";
  if (Math.abs(delta) < 0.0001) return "변화 없음";
  const sign = delta > 0 ? "+" : "";
  const unit = field?.unit ? ` ${field.unit}` : "";
  return `${sign}${formatNumber(delta, field?.digits ?? 2)}${unit}`;
}

function getFoods() {
  const user = currentUser();
  const custom = user
    ? state.customFoods.filter((food) => food.userId === user.id)
    : state.customFoods;
  return [...seedFoods, ...custom];
}

function getMedicationPreset(key) {
  return medicationPresets.find((preset) => preset.key === key) || null;
}

function findMedicationPresetByLabel(label) {
  return medicationPresets.find((preset) => preset.label === label) || null;
}

function syncMedicationPresetPanel(form) {
  if (!form) return;
  const category = form.querySelector("#med-category");
  const panel = form.querySelector("[data-med-preset-panel]");
  if (!category || !panel) return;
  const visible = ["영양제", "보조제", "처방약(병원)", "인흡착제"].includes(category.value);
  panel.hidden = !visible;
  if (!visible) {
    panel.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
}

function syncMedicationPresetSelect(form) {
  if (!form) return;
  const presetSelect = form.querySelector("#med-preset-select");
  const nameInput = form.querySelector("#med-name");
  const category = form.querySelector("#med-category");
  if (!presetSelect || !nameInput || !category) return;
  const preset = getMedicationPreset(presetSelect.value);
  if (!preset) return;
  nameInput.value = preset.label;
  category.value = preset.category;
  syncMedicationPresetPanel(form);
  const checkbox = form.querySelector(`input[name="presetKeys"][value="${preset.key}"]`);
  if (checkbox) checkbox.checked = true;
}

async function handleLabPdfUpload(input, { force = false } = {}) {
  const file = input?.files?.[0];
  if (!file) {
    setLabPdfStatus("PDF 파일을 먼저 선택해주세요.", "error");
    return;
  }
  const signature = `${file.name}:${file.size}:${file.lastModified}`;
  if (!force && input.dataset.lastLabPdfSignature === signature) return;
  input.dataset.lastLabPdfSignature = signature;
  setLabPdfStatus(`${file.name} 파일을 읽는 중입니다. 잠시만 기다려주세요.`);

  try {
    const text = await extractPdfText(file);
    if (!text.trim()) {
      setLabPdfStatus("PDF에서 텍스트를 찾지 못했습니다. 스캔/사진 PDF는 OCR 기능이 필요합니다.", "error");
      return;
    }

    const values = parseLabValuesFromText(text);
    const filledCount = fillLabFormFromPdf(values);
    fillLabPdfMetadata(file, text);

    if (!filledCount) {
      setLabPdfStatus("PDF 텍스트는 읽었지만 자동 매칭된 혈검 항목이 없습니다. 수치를 직접 입력해주세요.", "error");
      return;
    }

    setLabPdfStatus(`${filledCount}개 혈검 항목을 자동 입력했습니다. 저장 전 수치를 한번 확인해주세요.`, "success");
  } catch (error) {
    console.error("PDF 자동 입력 실패", error);
    setLabPdfStatus(
      "PDF 자동 입력에 실패했습니다. 인터넷 연결 또는 PDF 형식을 확인하고, 필요하면 수치를 직접 입력해주세요.",
      "error"
    );
  }
}

async function extractPdfText(file) {
  const pdfjsLib = await import(PDFJS_URL);
  pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => item.str || "").join("\n"));
  }

  return pages.join("\n");
}

function parseLabValuesFromText(text) {
  return getLabFields().reduce((values, field) => {
    const matches = findLabPdfMatches(text, field);
    const value = pickLabPdfValue(field.key, matches);
    if (Number.isFinite(value)) values[field.key] = value;
    return values;
  }, {});
}

function findLabPdfMatches(text, field) {
  const normalized = normalizeLabPdfText(text);
  const lines = normalized.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const flatText = normalized.replace(/\s+/g, " ");
  const aliases = labPdfAliases[field.key] || [field.label];
  const matches = [];

  aliases.forEach((alias) => {
    const escaped = escapeRegExp(alias);
    const linePattern = new RegExp(`^${escaped}\\s*(?:[:=])?\\s*(-?\\d+(?:[.,]\\d+)?)`, "i");
    lines.forEach((line) => {
      const match = line.match(linePattern);
      if (match) matches.push(parsePdfNumber(match[1]));
    });

    const flatPattern = new RegExp(`(?:^|[^A-Za-z0-9#])${escaped}(?:\\s|:|=)+(-?\\d+(?:[.,]\\d+)?)`, "gi");
    let match = flatPattern.exec(flatText);
    while (match) {
      matches.push(parsePdfNumber(match[1]));
      match = flatPattern.exec(flatText);
    }
  });

  return matches.filter(Number.isFinite);
}

function pickLabPdfValue(key, matches) {
  if (!matches.length) return NaN;
  const range = labPdfExpectedRanges[key];
  const candidates = range
    ? matches.filter((value) => value >= range[0] && value <= range[1])
    : matches;
  const values = candidates.length ? candidates : matches;

  if (key === "ph" || key === "k" || key === "na" || key === "cl") return values[0];
  if (key === "ca") return values.filter((value) => value >= 4).at(-1) ?? values.at(-1);
  return values.at(-1);
}

function fillLabFormFromPdf(values) {
  return Object.entries(values).reduce((count, [key, value]) => {
    const input = document.querySelector(`#lab-${key}`);
    if (!input || !Number.isFinite(value)) return count;
    input.value = String(value);
    return count + 1;
  }, 0);
}

function fillLabPdfMetadata(file, text) {
  const reportInput = document.querySelector("#lab-report");
  const hospitalInput = document.querySelector("#lab-hospital");
  const dateInput = document.querySelector("#lab-date");
  const reportName = file.name.replace(/\.pdf$/i, "");
  const date = inferLabPdfDate(`${file.name}\n${text}`);
  const hospital = inferLabPdfHospital(text);

  if (reportInput && !reportInput.value.trim()) reportInput.value = reportName;
  if (dateInput && date) dateInput.value = date;
  if (hospitalInput && !hospitalInput.value.trim() && hospital) hospitalInput.value = hospital;
}

function inferLabPdfDate(text) {
  const fullDate = text.match(/(20\d{2})[.\-/년\s]+(\d{1,2})[.\-/월\s]+(\d{1,2})/);
  if (fullDate) return toValidDateISO(fullDate[1], fullDate[2], fullDate[3]);

  const shortDate = text.match(/(?:^|[^\d])(\d{1,2})[.\-/](\d{1,2})(?:[^\d]|$)/);
  if (shortDate) return toValidDateISO(new Date().getFullYear(), shortDate[1], shortDate[2]);

  return "";
}

function inferLabPdfHospital(text) {
  return normalizeLabPdfText(text)
    .split(/\n+/)
    .map((line) => line.trim())
    .find((line) => /(동물|병원|의료센터|메디컬센터)/.test(line) && line.length <= 60) || "";
}

function toValidDateISO(year, month, day) {
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return "";
  }
  return toISODate(date);
}

function setLabPdfStatus(message, status = "") {
  const statusElement = document.querySelector("#lab-pdf-status");
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.classList.toggle("is-error", status === "error");
  statusElement.classList.toggle("is-success", status === "success");
}

function normalizeLabPdfText(text) {
  return String(text || "")
    .replaceAll("\u00a0", " ")
    .replaceAll("㎍", "ug")
    .replaceAll("μ", "u");
}

function parsePdfNumber(value) {
  const raw = String(value);
  if (raw.includes(".") && raw.includes(",")) return Number(raw.replaceAll(",", ""));
  if (!raw.includes(".") && /^\d{1,3}(,\d{3})+$/.test(raw)) return Number(raw.replaceAll(",", ""));
  return Number(raw.replace(",", "."));
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getLabFields() {
  return labFieldGroups.flatMap((group) => group.fields);
}

function getLabField(key) {
  return getLabFields().find((field) => field.key === key) || {
    key,
    label: key.toUpperCase(),
    unit: "",
    digits: 2
  };
}

function getLabReferenceRange(key) {
  return labReferenceRanges[key] || null;
}

function getLabReferenceStatus(value, key) {
  const range = getLabReferenceRange(key);
  const number = Number(value);
  if (!range || !Number.isFinite(number)) return "unknown";
  if (number < range.low) return "low";
  if (number > range.high) return "high";
  return "in";
}

function renderLabReferenceNote(value, key, field = getLabField(key)) {
  const range = getLabReferenceRange(key);
  if (!range) return "참고범위 미설정";
  const status = getLabReferenceStatus(value, key);
  const rangeText = `${formatNumber(range.low, field?.digits ?? 2)}-${formatNumber(range.high, field?.digits ?? 2)}${field?.unit ? ` ${field.unit}` : ""}`;
  if (status === "low") return `일반 참고보다 낮음 · ${rangeText}`;
  if (status === "high") return `일반 참고보다 높음 · ${rangeText}`;
  if (status === "in") return `일반 참고범위 내 · ${rangeText}`;
  return `일반 참고범위 ${rangeText}`;
}

function calorieProfile(cat) {
  const weight = Math.max(toNumber(cat.weightKg), 0.1);
  const ageYears = getCatAgeYears(cat);
  const rer = 70 * Math.pow(weight, 0.75);
  const notes = [];
  let target;

  if (ageYears < 1) {
    target = rer * 2.5;
    notes.push("성장기");
  } else {
    let factor = cat.neutered === "no" ? 1.4 : 1.2;
    if (cat.activity === "low") {
      factor -= 0.1;
      notes.push("활동량 낮음");
    }
    if (cat.activity === "active") {
      factor += 0.2;
      notes.push("활동량 높음");
    }
    target = rer * factor;
  }

  if (cat.bcs >= 7 || cat.health.includes("obesity")) {
    target = rer * 0.8;
    notes.push("체중감량 상담");
  }

  if (cat.bcs <= 4) {
    target *= 1.15;
    notes.push("체중회복 관찰");
  }

  if (cat.health.includes("kidney")) {
    target *= cat.bcs <= 5 ? 1.05 : 1;
    notes.push("신장 관리");
  }

  if (cat.health.includes("diabetes")) notes.push("식사 시간 일정 유지");
  if (cat.health.includes("heart")) notes.push("수액 전 심장상태 확인");

  return {
    rer,
    target,
    low: target * 0.9,
    high: target * 1.1,
    snackMax: target * 0.1,
    notes: notes.length ? notes : ["일반 유지"]
  };
}

function calculateNutrition(input) {
  const dry = Math.max(100 - input.moisture, 1);
  const asFedCarb = Math.max(
    0,
    100 - input.moisture - input.protein - input.fat - input.fiber - input.ash
  );
  const kcalPerGram = input.kcal100g / 100;
  const gramsPerDay = input.targetKcal / kcalPerGram;
  const dm = {
    protein: (input.protein / dry) * 100,
    fat: (input.fat / dry) * 100,
    carb: (asFedCarb / dry) * 100,
    phosphorus: (input.phosphorus / dry) * 100,
    sodium: (input.sodium / dry) * 100
  };
  const daily = {
    protein: gramsPerDay * (input.protein / 100),
    fat: gramsPerDay * (input.fat / 100),
    carb: gramsPerDay * (asFedCarb / 100),
    phosphorus: gramsPerDay * (input.phosphorus / 100),
    sodium: gramsPerDay * (input.sodium / 100)
  };
  return {
    input,
    asFedCarb,
    dry,
    dm,
    daily,
    kcalPerGram,
    gramsPerDay,
    phosGPer1000Kcal: input.kcal100g > 0 ? (input.phosphorus / input.kcal100g) * 1000 : 0
  };
}

function buildTimes(firstTime, timesPerDay) {
  const start = parseTime(firstTime || "09:00");
  const count = Math.max(1, Math.min(6, Math.round(timesPerDay || 1)));
  const step = Math.floor((24 * 60) / count);
  return range(0, count - 1).map((index) => formatMinutes((start + step * index) % (24 * 60)));
}

function getUpcomingOccurrences({ limit = 12, catId = "" } = {}) {
  const user = currentUser();
  if (!user) return [];
  const today = new Date(`${todayISO()}T00:00:00`);
  const cats = getUserCats();
  const catIds = new Set(cats.map((cat) => cat.id));
  const items = [];

  state.fluidPlans
    .filter((plan) => plan.userId === user.id && plan.active !== false && catIds.has(plan.catId) && (!catId || plan.catId === catId))
    .forEach((plan) => {
      const cat = cats.find((item) => item.id === plan.catId);
      if (!cat) return;
      for (let day = 0; day < 21; day += 1) {
        const date = addDaysISO(today, day);
        const diff = daysBetween(plan.startDate, date);
        if (diff < 0 || diff % plan.intervalDays !== 0) continue;
        plan.times.forEach((time) => {
          items.push({ kind: "fluid", kindLabel: "수액", plan, cat, date, time });
        });
      }
    });

  return items
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, limit);
}

function getUpcomingMedicationOccurrences({ limit = 12, catId = "" } = {}) {
  const user = currentUser();
  if (!user) return [];
  const today = new Date(`${todayISO()}T00:00:00`);
  const cats = getUserCats();
  const catIds = new Set(cats.map((cat) => cat.id));
  const items = [];

  state.medicationPlans
    .filter((plan) => plan.userId === user.id && plan.active !== false && catIds.has(plan.catId) && (!catId || plan.catId === catId))
    .forEach((plan) => {
      const cat = cats.find((item) => item.id === plan.catId);
      if (!cat) return;
      for (let day = 0; day < 21; day += 1) {
        const date = addDaysISO(today, day);
        const diff = daysBetween(plan.startDate, date);
        if (diff < 0 || diff % plan.intervalDays !== 0) continue;
        if (plan.endDate && date > plan.endDate) continue;
        plan.times.forEach((time) => {
          items.push({ kind: "medication", kindLabel: "투약", plan, cat, date, time });
        });
      }
    });

  return items
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, limit);
}

function getUpcomingCareOccurrences({ limit = 12, catId = "" } = {}) {
  return [
    ...getUpcomingOccurrences({ limit: 30, catId }),
    ...getUpcomingMedicationOccurrences({ limit: 30, catId })
  ]
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, limit);
}

function isFluidCompleted(planId, date, time) {
  return state.fluidLogs.some(
    (log) => log.planId === planId && log.date === date && log.time === time
  );
}

function isMedicationCompleted(planId, date, time) {
  return state.medicationLogs.some(
    (log) => log.planId === planId && log.date === date && log.time === time
  );
}

function drawWeightChart(canvasId, logs) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#d9e7e1";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, width - 1, height - 1);

  if (!logs.length) {
    ctx.fillStyle = "#66736f";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("체중 기록이 없습니다.", width / 2, height / 2);
    return;
  }

  const padding = { top: 24, right: 22, bottom: 38, left: 46 };
  const values = logs.map((log) => log.weightKg);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    min -= 0.2;
    max += 0.2;
  }
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  ctx.strokeStyle = "#e5eee9";
  ctx.fillStyle = "#66736f";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "right";
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (plotH / 4) * i;
    const value = max - ((max - min) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(formatNumber(value, 2), padding.left - 8, y + 4);
  }

  const first = logs[0];
  const last = logs.at(-1);
  const totalDays = Math.max(daysBetween(first.date, last.date), 1);
  const xFor = (log) =>
    logs.length === 1
      ? padding.left + plotW / 2
      : padding.left + (daysBetween(first.date, log.date) / totalDays) * plotW;
  const yFor = (value) => padding.top + ((max - value) / (max - min)) * plotH;

  ctx.strokeStyle = "#0f766e";
  ctx.lineWidth = 3;
  ctx.beginPath();
  logs.forEach((log, index) => {
    const x = xFor(log);
    const y = yFor(log.weightKg);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  const visiblePointIndexes = getVisibleTrendPointIndexes(logs, xFor);
  const pointRadius = logs.length > 80 ? 3 : 5;
  logs.forEach((log, index) => {
    if (!visiblePointIndexes.has(index)) return;
    const x = xFor(log);
    const y = yFor(log.weightKg);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#0f766e";
    ctx.lineWidth = logs.length > 80 ? 2 : 3;
    ctx.beginPath();
    ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  ctx.fillStyle = "#66736f";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(first.date.slice(5), padding.left, height - 14);
  ctx.textAlign = "right";
  ctx.fillText(last.date.slice(5), width - padding.right, height - 14);
}

function drawLabTrendChart(canvasId, logs, key, rangeKey = getSelectedLabTrendRange()) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const field = getLabField(key);
  const trendLogs = getLabTrendLogs(logs, key, rangeKey);
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#d9e7e1";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, width - 1, height - 1);

  if (!trendLogs.length) {
    ctx.fillStyle = "#66736f";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("선택한 항목의 기록이 없습니다.", width / 2, height / 2);
    return;
  }

  const padding = { top: 26, right: 24, bottom: 40, left: 58 };
  const values = trendLogs.map((log) => log.value);
  const referenceRange = getLabReferenceRange(key);
  if (referenceRange) values.push(referenceRange.low, referenceRange.high);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    const buffer = field.digits >= 3 ? 0.005 : Math.max(0.2, Math.abs(max) * 0.05);
    min -= buffer;
    max += buffer;
  } else {
    const buffer = (max - min) * 0.12;
    min -= buffer;
    max += buffer;
  }

  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  ctx.strokeStyle = "#e5eee9";
  ctx.fillStyle = "#66736f";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "right";
  for (let i = 0; i <= 4; i += 1) {
    const y = padding.top + (plotH / 4) * i;
    const value = max - ((max - min) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillText(formatNumber(value, field.digits ?? 2), padding.left - 8, y + 4);
  }

  const first = trendLogs[0];
  const last = trendLogs.at(-1);
  const totalDays = Math.max(daysBetween(first.date, last.date), 1);
  const xFor = (log) =>
    trendLogs.length === 1
      ? padding.left + plotW / 2
      : padding.left + (daysBetween(first.date, log.date) / totalDays) * plotW;
  const yFor = (value) => padding.top + ((max - value) / (max - min)) * plotH;

  if (referenceRange) {
    const yLow = yFor(referenceRange.low);
    const yHigh = yFor(referenceRange.high);
    ctx.fillStyle = "rgba(16, 185, 129, 0.1)";
    ctx.fillRect(padding.left, yHigh, plotW, Math.max(2, yLow - yHigh));
    ctx.fillStyle = "#69938b";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("일반 참고범위", padding.left + 6, yHigh + 14);
  }

  if (trendLogs.length > 1) {
    ctx.strokeStyle = "#0f766e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    trendLogs.forEach((log, index) => {
      const x = xFor(log);
      const y = yFor(log.value);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  const visiblePointIndexes = getVisibleTrendPointIndexes(trendLogs, xFor);
  const pointRadius = trendLogs.length > 80 ? 3 : 5;
  trendLogs.forEach((log, index) => {
    if (!visiblePointIndexes.has(index)) return;
    const x = xFor(log);
    const y = yFor(log.value);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#0f766e";
    ctx.lineWidth = trendLogs.length > 80 ? 2 : 3;
    ctx.beginPath();
    ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  ctx.fillStyle = "#66736f";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(first.date.slice(5), padding.left, height - 14);
  ctx.textAlign = "right";
  ctx.fillText(last.date.slice(5), width - padding.right, height - 14);
  if (field.unit) {
    ctx.fillStyle = "#7a8581";
    ctx.textAlign = "right";
    ctx.fillText(field.unit, width - padding.right, padding.top - 8);
  }
}

function getVisibleTrendPointIndexes(logs, xFor) {
  if (logs.length <= 80) return new Set(logs.map((_, index) => index));
  const indexes = new Set([0, logs.length - 1]);
  let lastX = -Infinity;
  logs.forEach((log, index) => {
    const x = xFor(log);
    if (x - lastX >= trendPointGapPx) {
      indexes.add(index);
      lastX = x;
    }
  });
  indexes.add(logs.length - 1);
  return indexes;
}

function createDemoLabLog(user, cat, overrides = {}) {
  const values = {
    bun: 26.7,
    crea: 1.5,
    sdma: 13.4,
    phos: 4.1,
    ph: 6.5,
    ca: 11.5,
    k: 3.33,
    na: 150,
    cl: 127,
    hct: 42.7,
    hgb: 13.3,
    rbc: 9.29,
    wbc: 5.72,
    plt: 239,
    retic: 39,
    alb: 3,
    tp: 7.9,
    glob: 4.9,
    alt: 62,
    ast: 39,
    alkp: 23,
    glu: 147,
    chol: 328,
    fsaa: 3,
    fpl: 2.1,
    usg: 1.043,
    upc: 0.04,
    ...(overrides.values || {})
  };

  return {
    id: uid("lab"),
    userId: user.id,
    catId: cat.id,
    date: overrides.date || "2026-05-28",
    hospital: overrides.hospital || "24시 동물의료센터",
    reportName: overrides.reportName || "5.28 혈액검사지 예시",
    values,
    notes: overrides.notes || "첨부 예시 검사표의 주요 항목만 입력한 샘플입니다.",
    createdAt: overrides.createdAt || new Date().toISOString()
  };
}

function createDemoLabTrendLogs(user, cat) {
  return [
    createDemoLabLog(user, cat, {
      date: "2026-03-12",
      reportName: "3.12 혈액검사지 예시",
      values: {
        bun: 33.4,
        crea: 1.82,
        sdma: 16.2,
        phos: 4.8,
        ph: 6.2,
        hct: 39.8,
        fpl: 3.4,
        usg: 1.037,
        upc: 0.08
      },
      notes: "둘러보기용 과거 혈검 기록입니다."
    }),
    createDemoLabLog(user, cat, {
      date: "2026-04-18",
      reportName: "4.18 혈액검사지 예시",
      values: {
        bun: 29.1,
        crea: 1.66,
        sdma: 14.8,
        phos: 4.4,
        ph: 6.4,
        hct: 41.1,
        fpl: 2.8,
        usg: 1.04,
        upc: 0.06
      },
      notes: "수액과 식이 관리 후 추세 확인용 예시입니다."
    }),
    createDemoLabLog(user, cat)
  ];
}

function startDemo() {
  clearAuthToken();
  let user = state.users.find((item) => item.email === "demo@sinego.local");
  if (!user) {
    user = {
      id: uid("user"),
      name: "둘러보기 집사",
      naverId: "demo_naver",
      cafeNickname: "둘러보기 집사",
      email: "demo@sinego.local",
      password: "demo",
      approvalStatus: "approved",
      approvedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    state.users.push(user);
  }
  state.sessionUserId = user.id;

  let cat = state.cats.find((item) => item.userId === user.id);
  if (!cat) {
    cat = {
      id: uid("cat"),
      userId: user.id,
      name: "신이",
      birthYear: 2015,
      ageYears: 11,
      weightKg: 4.2,
      bcs: 5,
      neutered: "yes",
      activity: "low",
      health: ["kidney"],
      createdAt: new Date().toISOString()
    };
    state.cats.push(cat);
    state.weightLogs.push(
      {
        id: uid("weight"),
        userId: user.id,
        catId: cat.id,
        date: addDaysISO(new Date(), -28),
        weightKg: 4.35,
        appetite: "보통",
        notes: "월초 기록",
        createdAt: new Date().toISOString()
      },
      {
        id: uid("weight"),
        userId: user.id,
        catId: cat.id,
        date: addDaysISO(new Date(), -14),
        weightKg: 4.28,
        appetite: "좋음",
        notes: "식욕 안정",
        createdAt: new Date().toISOString()
      },
      {
        id: uid("weight"),
        userId: user.id,
        catId: cat.id,
        date: todayISO(),
        weightKg: 4.2,
        appetite: "보통",
        notes: "수액 전 측정",
        createdAt: new Date().toISOString()
      }
    );
    state.fluidPlans.push({
      id: uid("fluid"),
      userId: user.id,
      catId: cat.id,
      name: "피하수액",
      fluidType: "하트만",
      doseMl: 80,
      timesPerDay: 1,
      intervalDays: 2,
      times: ["20:00"],
      startDate: todayISO(),
      notes: "처방 일정 예시",
      active: true,
      createdAt: new Date().toISOString()
    });
  } else if (cat.name === "나무") {
    cat.name = "신이";
  }

  if (!state.labLogs.some((log) => log.userId === user.id)) {
    state.labLogs.push(...createDemoLabTrendLogs(user, cat));
  } else {
    const demoTrendDates = new Set(["2026-03-12", "2026-04-18", "2026-05-28"]);
    const existingDemoDates = new Set(
      state.labLogs
        .filter((log) => log.userId === user.id && log.catId === cat.id)
        .map((log) => log.date)
    );
    createDemoLabTrendLogs(user, cat)
      .filter((log) => demoTrendDates.has(log.date) && !existingDemoDates.has(log.date))
      .forEach((log) => state.labLogs.push(log));
  }

  if (!state.symptomLogs.some((log) => log.userId === user.id)) {
    state.symptomLogs.push({
      id: uid("symptom"),
      userId: user.id,
      catId: cat.id,
      date: todayISO(),
      vomitCount: 0,
      vomitColor: "없음",
      diarrheaCount: 0,
      stoolColor: "정상 갈색",
      stoolState: "정상",
      notes: "둘러보기 예시",
      createdAt: new Date().toISOString()
    });
  }

  if (!state.medicationPlans.some((plan) => plan.userId === user.id)) {
    state.medicationPlans.push({
      id: uid("med"),
      userId: user.id,
      catId: cat.id,
      name: "오메가3",
      category: "영양제",
      classification: "오메가3",
      dose: "1캡슐",
      route: "식사와 함께",
      timesPerDay: 1,
      intervalDays: 1,
      times: ["09:00"],
      startDate: todayISO(),
      endDate: "",
      notes: "둘러보기 예시",
      active: true,
      createdAt: new Date().toISOString()
    });
  }

  state.activeCatId = cat.id;
  saveState();
  showToast("둘러보기 데이터가 준비되었습니다.");
  render();
}

function exportData() {
  const user = currentUser();
  const payload = user
    ? {
        user,
        cats: state.cats.filter((cat) => cat.userId === user.id),
        fluidPlans: state.fluidPlans.filter((plan) => plan.userId === user.id),
        fluidLogs: state.fluidLogs.filter((log) => log.userId === user.id),
        medicationPlans: state.medicationPlans.filter((plan) => plan.userId === user.id),
        medicationLogs: state.medicationLogs.filter((log) => log.userId === user.id),
        symptomLogs: state.symptomLogs.filter((log) => log.userId === user.id),
        labLogs: state.labLogs.filter((log) => log.userId === user.id),
        weightLogs: state.weightLogs.filter((log) => log.userId === user.id),
        customFoods: state.customFoods.filter((food) => food.userId === user.id),
        customResources: state.customResources.filter((resource) => resource.userId === user.id),
        posts: state.posts.filter((post) => post.userId === user.id)
      }
    : state;
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sinego-care-${todayISO()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function deleteCurrentAccount() {
  const user = currentUser();
  if (!user) {
    showToast("로그인이 필요합니다.");
    render();
    return;
  }
  const confirmed = confirm(
    `${user.name} 계정과 저장된 모든 케어 기록을 삭제할까요?\n\n삭제 후에는 복구할 수 없습니다.`
  );
  if (!confirmed) return;

  try {
    if (getAuthToken()) {
      await apiRequest("/api/account", { method: "DELETE", auth: true });
    }
  } catch (error) {
    if (!shouldUseLocalFallback(error)) {
      showToast(error.message || "계정을 삭제하지 못했습니다.");
      render();
      return;
    }
  }

  removeUserData(user.id);
  clearAuthToken();
  resetBoardCache();
  state.sessionUserId = null;
  state.pendingSignup = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  showToast("회원 탈퇴와 데이터 삭제가 완료되었습니다.");
  render();
}

function removeUserData(userId) {
  state.users = state.users.filter((user) => user.id !== userId);
  state.cats = state.cats.filter((cat) => cat.userId !== userId);
  state.fluidPlans = state.fluidPlans.filter((plan) => plan.userId !== userId);
  state.fluidLogs = state.fluidLogs.filter((log) => log.userId !== userId);
  state.medicationPlans = state.medicationPlans.filter((plan) => plan.userId !== userId);
  state.medicationLogs = state.medicationLogs.filter((log) => log.userId !== userId);
  state.symptomLogs = state.symptomLogs.filter((log) => log.userId !== userId);
  state.labLogs = state.labLogs.filter((log) => log.userId !== userId);
  state.weightLogs = state.weightLogs.filter((log) => log.userId !== userId);
  state.customFoods = state.customFoods.filter((food) => food.userId !== userId);
  state.customResources = state.customResources.filter((resource) => resource.userId !== userId);
  state.posts = state.posts
    .filter((post) => post.userId !== userId)
    .map((post) => ({
      ...post,
      comments: Array.isArray(post.comments)
        ? post.comments.filter((comment) => comment.userId !== userId)
        : []
    }));
  if (state.activeCatId && !state.cats.some((cat) => cat.id === state.activeCatId)) {
    state.activeCatId = null;
  }
  if (state.editingCatId && !state.cats.some((cat) => cat.id === state.editingCatId)) {
    state.editingCatId = null;
  }
  if (state.editingMedicationPlanId && !state.medicationPlans.some((plan) => plan.id === state.editingMedicationPlanId)) {
    state.editingMedicationPlanId = null;
  }
}

function renderCatOptions(selectedId) {
  const cats = getUserCats();
  if (!cats.length) return `<option value="">고양이 없음</option>`;
  return cats
    .map(
      (cat) => `<option value="${cat.id}" ${cat.id === selectedId ? "selected" : ""}>${escapeHTML(cat.name)}</option>`
    )
    .join("");
}

function renderOptions(options, selectedValue = options[0]) {
  return options
    .map(
      (option) => `<option value="${escapeAttr(option)}" ${option === selectedValue ? "selected" : ""}>${escapeHTML(option)}</option>`
    )
    .join("");
}

function renderCatShortMeta(cat) {
  const activity = { low: "낮은 활동량", normal: "보통 활동량", active: "높은 활동량" }[
    cat.activity
  ];
  const birthYear = getCatBirthYearValue(cat);
  const ageYears = getCatAgeYears(cat);
  const ageText = Number.isFinite(ageYears) ? `약 ${formatNumber(ageYears, 0)}살` : "나이 미입력";
  const yearText = birthYear ? `${birthYear}년생(추정)` : "출생연도 미입력";
  return `${formatNumber(cat.weightKg, 2)} kg · ${yearText} · ${ageText} · ${activity || "활동량 미입력"}`;
}

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function getAgeYearsFromBirthYear(birthYear) {
  const year = normalizeBirthYear(birthYear);
  if (!year) return 0;
  return Math.max(0, getCurrentYear() - year);
}

function getCatAgeYears(cat) {
  if (!cat) return 0;
  if (normalizeBirthYear(cat.birthYear)) return getAgeYearsFromBirthYear(cat.birthYear);
  return toNumber(cat.ageYears);
}

function getCatBirthYearValue(cat) {
  if (!cat) return "";
  const birthYear = normalizeBirthYear(cat.birthYear);
  if (birthYear) return birthYear;
  if (!Number.isFinite(Number(cat.ageYears))) return "";
  return getCurrentYear() - Math.round(Number(cat.ageYears));
}

function getHealthLabel(key) {
  return healthOptions[key]?.label || key;
}

function normalizeBirthYear(value) {
  const year = Number(value);
  if (!Number.isInteger(year)) return null;
  if (year < 1980 || year > getCurrentYear()) return null;
  return year;
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function parseTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  return (hour || 0) * 60 + (minute || 0);
}

function formatMinutes(totalMinutes) {
  const hour = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor(totalMinutes % 60)
    .toString()
    .padStart(2, "0");
  return `${hour}:${minute}`;
}

function todayISO() {
  return toISODate(new Date());
}

function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDaysISO(dateOrString, days) {
  const date =
    dateOrString instanceof Date ? new Date(dateOrString) : new Date(`${dateOrString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

function daysBetween(startISO, endISO) {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function formatDateTime(iso) {
  const date = new Date(iso);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function formatTodayLabel(date = new Date()) {
  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")} ${weekdays[date.getDay()]}`;
}

function formatNumber(value, digits = 0) {
  if (!Number.isFinite(Number(value))) return "-";
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(Number(value));
}

function formatLabValue(value, field = null) {
  if (!Number.isFinite(Number(value))) return "-";
  const digits = field?.digits ?? 2;
  const unit = field?.unit ? ` ${field.unit}` : "";
  return `${formatNumber(Number(value), digits)}${unit}`;
}

function renderLabDelta(value, previousValue, field = null) {
  if (!Number.isFinite(Number(value)) || !Number.isFinite(Number(previousValue))) return "이전 기록 없음";
  const delta = Number(value) - Number(previousValue);
  if (Math.abs(delta) < 0.0001) return "변화 없음";
  const sign = delta > 0 ? "+" : "";
  const unit = field?.unit ? ` ${field.unit}` : "";
  return `이전 대비 ${sign}${formatNumber(delta, field?.digits ?? 2)}${unit}`;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHTML(value);
}

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function showToast(message) {
  toastText = message;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastText = "";
    render();
  }, 2800);
}

function disableServiceWorkerCache() {
  if ("caches" in window) {
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .catch(() => {});
  }

  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
    .catch(() => {});
}
