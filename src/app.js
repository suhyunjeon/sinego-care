const STORAGE_KEY = "sinego-care-state-v1";

const tabs = [
  { id: "dashboard", label: "홈" },
  { id: "fluid", label: "수액" },
  { id: "medication", label: "투약" },
  { id: "symptoms", label: "증상" },
  { id: "nutrition", label: "영양" },
  { id: "labs", label: "혈검" },
  { id: "weight", label: "체중" },
  { id: "resources", label: "자료" },
  { id: "board", label: "게시판" }
];

const healthOptions = {
  kidney: "신장질환",
  diabetes: "당뇨",
  obesity: "비만",
  pancreatitis: "췌장염",
  dental: "구내염/치아",
  heart: "심장질환"
};

const medicationPresets = [
  { key: "phosphate-binder", label: "인흡착제", category: "인흡착제", classification: "인흡착제" },
  { key: "renamezin", label: "레나메진", category: "처방약(병원)", classification: "요독흡착제" },
  { key: "probiotic", label: "유산균", category: "영양제", classification: "유산균" },
  { key: "omega3", label: "오메가3", category: "영양제", classification: "오메가3" },
  { key: "antiemetic", label: "항구토제", category: "처방약(병원)", classification: "항구토제" },
  { key: "pancreas-support", label: "췌장보조제", category: "보조제", classification: "췌장보조제" },
  { key: "potassium", label: "칼륨보조제", category: "보조제", classification: "칼륨보조제" },
  { key: "cobalamin", label: "코발라민", category: "영양제", classification: "코발라민" }
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

render();
disableServiceWorkerCache();

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]");
  if (tab) {
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
  if (event.target.closest("#med-category")) {
    syncMedicationPresetPanel(event.target.form);
  }
});

function defaultState() {
  return {
    version: 1,
    sessionUserId: null,
    activeTab: "dashboard",
    activeCatId: null,
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
    snackResult: null
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
      posts: Array.isArray(saved.posts) ? saved.posts : []
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  const active = tabs.some((tab) => tab.id === state.activeTab)
    ? state.activeTab
    : "dashboard";
  state.activeTab = active;

  app.innerHTML = `
    <div class="app">
      ${renderHeader()}
      <main class="main">${renderView(active)}</main>
      ${toastText ? `<div class="toast" role="status">${escapeHTML(toastText)}</div>` : ""}
    </div>
  `;

  requestAnimationFrame(() => {
    if (active === "weight") drawWeightChart("weight-chart", getActiveCatWeightLogs());
    if (active === "dashboard") drawWeightChart("dashboard-weight-chart", getActiveCatWeightLogs());
  });
}

function renderHeader() {
  const user = currentUser();
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand">
          <img src="/assets/logo.svg" alt="" />
          <div>
            <span class="brand-name">신장질환을 이긴 고양이 케어</span>
            <span class="brand-sub">무료 환묘 케어 도구</span>
          </div>
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
              ? `<span class="account-name">${escapeHTML(user.name)}</span><button class="btn secondary small" data-action="logout">로그아웃</button>`
              : `<span>비회원</span><button class="btn primary small" data-action="start-demo">둘러보기</button>`
          }
        </div>
      </div>
    </header>
  `;
}

function renderView(active) {
  if (active === "fluid") return renderFluidView();
  if (active === "medication") return renderMedicationView();
  if (active === "symptoms") return renderSymptomsView();
  if (active === "nutrition") return renderNutritionView();
  if (active === "labs") return renderLabsView();
  if (active === "weight") return renderWeightView();
  if (active === "resources") return renderResourcesView();
  if (active === "board") return renderBoardView();
  return renderDashboardView();
}

function renderDashboardView() {
  const user = currentUser();
  const activeCat = getActiveCat();
  const calorie = activeCat ? calorieProfile(activeCat) : null;
  const upcoming = user ? getUpcomingCareOccurrences({ limit: 5 }) : [];
  const lastWeight = getActiveCatWeightLogs().at(-1);

  return `
    <section class="view-title">
      <div>
        <h1>오늘의 케어</h1>
        <p>수액, 투약·영양제, 식사, 체중 기록을 한 화면에서 확인합니다.</p>
      </div>
      <div class="actions">
        <button class="btn secondary" data-action="export-data">내 데이터 내보내기</button>
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
        ${renderCatPanel()}
        ${renderCaloriePanel(activeCat)}
      </div>
      <div class="grid">
        ${renderUpcomingPanel(upcoming)}
        ${renderDashboardLabPanel()}
        ${renderDashboardSymptomPanel()}
        ${renderDashboardWeightPanel()}
      </div>
    </div>
  `;
}

function renderAuthPanel() {
  return `
    <section class="panel" style="margin-bottom: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>무료 회원 시작</h2>
            <p>데이터는 현재 기기의 브라우저에만 저장됩니다.</p>
          </div>
          <button class="btn primary" data-action="start-demo">둘러보기</button>
        </div>
        <div class="auth-grid">
          <form class="grid" data-form="signup">
            <div class="section-head">
              <h2>회원가입</h2>
              <p>이름, 이메일, 비밀번호로 로컬 계정을 만듭니다.</p>
            </div>
            <div class="form-grid">
              <div class="form-field">
                <label for="signup-name">이름</label>
                <input class="control" id="signup-name" name="name" required autocomplete="name" />
              </div>
              <div class="form-field">
                <label for="signup-email">이메일</label>
                <input class="control" id="signup-email" name="email" type="email" required autocomplete="email" />
              </div>
              <div class="form-field full">
                <label for="signup-password">비밀번호</label>
                <input class="control" id="signup-password" name="password" type="password" minlength="4" required autocomplete="new-password" />
              </div>
            </div>
            <button class="btn primary" type="submit">가입하고 시작</button>
          </form>
          <form class="grid" data-form="login">
            <div class="section-head">
              <h2>로그인</h2>
              <p>같은 브라우저에 저장된 계정으로 이어서 사용합니다.</p>
            </div>
            <div class="form-grid">
              <div class="form-field">
                <label for="login-email">이메일</label>
                <input class="control" id="login-email" name="email" type="email" required autocomplete="email" />
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
  return `
    <section class="panel">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>고양이 프로필</h2>
            <p>체중, 나이, 건강상태를 케어 계산에 사용합니다.</p>
          </div>
        </div>
        <div class="list">
          ${
            cats.length
              ? cats.map((cat) => renderCatItem(cat)).join("")
              : `<div class="empty">첫 고양이 프로필을 추가하세요.</div>`
          }
        </div>
        <form class="grid" data-form="cat" style="margin-top: 14px">
          <div class="form-grid">
            <div class="form-field">
              <label for="cat-name">이름</label>
              <input class="control" id="cat-name" name="name" required />
            </div>
            <div class="form-field">
              <label for="cat-age">나이</label>
              <input class="control" id="cat-age" name="ageYears" type="number" min="0" max="30" step="0.1" required />
            </div>
            <div class="form-field">
              <label for="cat-weight">체중 kg</label>
              <input class="control" id="cat-weight" name="weightKg" type="number" min="0.2" max="20" step="0.01" required />
            </div>
            <div class="form-field">
              <label for="cat-bcs">BCS 1-9</label>
              <select class="select" id="cat-bcs" name="bcs">
                ${range(1, 9)
                  .map((value) => `<option value="${value}" ${value === 5 ? "selected" : ""}>${value}</option>`)
                  .join("")}
              </select>
            </div>
            <div class="form-field">
              <label for="cat-neutered">중성화</label>
              <select class="select" id="cat-neutered" name="neutered">
                <option value="yes">완료</option>
                <option value="no">미완료</option>
              </select>
            </div>
            <div class="form-field">
              <label for="cat-activity">활동량</label>
              <select class="select" id="cat-activity" name="activity">
                <option value="low">낮음</option>
                <option value="normal" selected>보통</option>
                <option value="active">높음</option>
              </select>
            </div>
            <div class="form-field full">
              <span class="field-label">건강상태</span>
              ${renderHealthChoices([])}
            </div>
          </div>
          <button class="btn primary" type="submit">프로필 추가</button>
        </form>
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
            ${cat.health.length ? cat.health.map((key) => `<span class="chip">${healthOptions[key]}</span>`).join("") : `<span class="chip">일반관리</span>`}
            <span class="chip amber">BCS ${cat.bcs}/9</span>
          </div>
        </div>
        <div class="actions">
          <button class="btn small ${active ? "secondary" : "primary"}" data-action="select-cat" data-id="${cat.id}">
            ${active ? "선택됨" : "선택"}
          </button>
          <button class="btn small danger" data-action="delete-cat" data-id="${cat.id}">삭제</button>
        </div>
      </div>
    </article>
  `;
}

function renderHealthChoices(selected) {
  return `
    <div class="choice-row">
      ${Object.entries(healthOptions)
        .map(
          ([key, label]) => `
            <label class="check-pill">
              <input type="checkbox" name="health" value="${key}" ${selected.includes(key) ? "checked" : ""} />
              ${label}
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
            ? `<div class="timeline">${upcoming.map(renderCareOccurrence).join("")}</div>`
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
    ? state.fluidPlans.filter((plan) => plan.userId === user.id && plan.active !== false)
    : [];
  const upcoming = user ? getUpcomingOccurrences({ limit: 16 }) : [];

  return `
    <section class="view-title">
      <div>
        <h1>수액 스케줄</h1>
        <p>처방받은 수액량을 날짜와 시간으로 관리합니다.</p>
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
                <label for="fluid-dose">1회 ml</label>
                <input class="control" id="fluid-dose" name="doseMl" type="number" min="1" max="1000" step="1" required />
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
              <p>완료를 누르면 기록에 남습니다.</p>
            </div>
          </div>
          ${upcoming.length ? `<div class="timeline">${upcoming.map(renderOccurrence).join("")}</div>` : `<div class="empty">예정된 수액 일정이 없습니다.</div>`}
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
          <p>${cat ? escapeHTML(cat.name) : "삭제된 고양이"} · ${formatNumber(plan.doseMl)} ml · ${plan.intervalDays === 1 ? "매일" : `${plan.intervalDays}일마다`}</p>
          <div class="chips">
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
        <p>${formatNumber(item.plan.doseMl)} ml ${item.plan.notes ? `· ${escapeHTML(item.plan.notes)}` : ""}</p>
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
    ? state.medicationPlans.filter((plan) => plan.userId === user.id && plan.active !== false)
    : [];
  const upcoming = user ? getUpcomingMedicationOccurrences({ limit: 18 }) : [];

  return `
    <section class="view-title">
      <div>
        <h1>투약·영양제 스케줄</h1>
        <p>인흡착제, 요독흡착제, 영양제, 병원 처방약 시간을 체크합니다.</p>
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
          <form class="grid medication-form" data-form="medication-plan">
            <div class="form-grid">
              <div class="form-field">
                <label for="med-cat">고양이</label>
                <select class="select" id="med-cat" name="catId" required>
                  ${renderCatOptions(activeCat?.id)}
                </select>
              </div>
              <div class="form-field">
                <label for="med-name">이름</label>
                <input class="control" id="med-name" name="name" placeholder="직접 입력 또는 아래에서 선택" list="med-name-presets" />
                <datalist id="med-name-presets">
                  <option value="인흡착제"></option>
                  <option value="레나메진"></option>
                  <option value="유산균"></option>
                  <option value="오메가3"></option>
                  <option value="항구토제"></option>
                  <option value="췌장보조제"></option>
                  <option value="칼륨보조제"></option>
                  <option value="코발라민"></option>
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
                  <option value="영양제">영양제</option>
                  <option value="식이섬유">식이섬유</option>
                  <option value="인흡착제">인흡착제</option>
                  <option value="처방약(병원)">처방약(병원)</option>
                  <option value="보조제">보조제</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div class="form-field full med-preset-panel" data-med-preset-panel>
                <span class="field-label">영양제·처방 체크리스트</span>
                <div class="choice-row">
                  ${renderMedicationPresetChecklist()}
                </div>
              </div>
              <div class="form-field">
                <label for="med-dose">1회 용량</label>
                <input class="control" id="med-dose" name="dose" placeholder="1캡슐, 0.5정, 1ml" required />
              </div>
              <div class="form-field">
                <label for="med-route">방법</label>
                <select class="select" id="med-route" name="route">
                  <option>식후</option>
                  <option>식전</option>
                  <option>식사와 함께</option>
                  <option>공복</option>
                  <option>시간 고정</option>
                </select>
              </div>
              <div class="form-field">
                <label for="med-times">하루 횟수</label>
                <select class="select" id="med-times" name="timesPerDay">
                  <option value="1">1회</option>
                  <option value="2">2회</option>
                  <option value="3">3회</option>
                  <option value="4">4회</option>
                </select>
              </div>
              <div class="form-field">
                <label for="med-days">반복 간격</label>
                <select class="select" id="med-days" name="intervalDays">
                  <option value="1">매일</option>
                  <option value="2">이틀마다</option>
                  <option value="3">3일마다</option>
                  <option value="7">매주</option>
                </select>
              </div>
              <div class="form-field">
                <label for="med-time">첫 시간</label>
                <input class="control" id="med-time" name="firstTime" type="time" value="09:00" required />
              </div>
              <div class="form-field">
                <label for="med-start">시작일</label>
                <input class="control" id="med-start" name="startDate" type="date" value="${todayISO()}" required />
              </div>
              <div class="form-field">
                <label for="med-end">종료일</label>
                <input class="control" id="med-end" name="endDate" type="date" />
              </div>
              <div class="form-field full">
                <label for="med-note">메모</label>
                <textarea class="textarea" id="med-note" name="notes" placeholder="보관 방법, 먹이는 요령, 주의 반응"></textarea>
              </div>
            </div>
            <button class="btn primary" type="submit" ${activeCat ? "" : "disabled"}>스케줄 저장</button>
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
              <p>완료를 누르면 기록에 남습니다.</p>
            </div>
          </div>
          ${
            upcoming.length
              ? `<div class="timeline">${upcoming.map(renderMedicationOccurrence).join("")}</div>`
              : `<div class="empty">예정된 투약·영양제 일정이 없습니다.</div>`
          }
        </div>
      </section>
    </div>

    <section class="panel" style="margin-top: 16px">
      <div class="panel-inner">
        <div class="panel-head">
          <div>
            <h2>등록된 투약 계획</h2>
            <p>끝난 계획은 삭제할 수 있습니다.</p>
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
  return `
    <article class="item">
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
        <button class="btn small danger" data-action="delete-medication-plan" data-id="${plan.id}">삭제</button>
      </div>
    </article>
  `;
}

function renderMedicationPresetChecklist() {
  return medicationPresets
    .map(
      (preset) => `
        <label class="check-pill med-preset-pill">
          <input type="checkbox" name="presetKeys" value="${escapeAttr(preset.key)}" />
          <span>${escapeHTML(preset.label)}</span>
          <small>${escapeHTML(preset.category === preset.classification ? preset.category : preset.classification)}</small>
        </label>
      `
    )
    .join("");
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
        <p>구토와 설사의 횟수, 색, 상태를 날짜별로 기록합니다.</p>
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
                  <input class="control" id="vomit-count" name="vomitCount" inputmode="numeric" value="0" />
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
                  <input class="control" id="diarrhea-count" name="diarrheaCount" inputmode="numeric" value="0" />
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

  return `
    <section class="view-title">
      <div>
        <h1>혈검·신장수치</h1>
        <p>BUN, CREA, HCT, 전해질, 요검사 수치를 날짜별로 기록합니다.</p>
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
              ? `<div class="grid two">
                  ${renderLabMetric(latest, "bun", previous)}
                  ${renderLabMetric(latest, "crea", previous)}
                  ${renderLabMetric(latest, "sdma", previous)}
                  ${renderLabMetric(latest, "phos", previous)}
                  ${renderLabMetric(latest, "ph", previous)}
                  ${renderLabMetric(latest, "hct", previous)}
                  ${renderLabMetric(latest, "fpl", previous)}
                  ${renderLabMetric(latest, "usg", previous)}
                </div>`
              : `<div class="empty">검사 수치를 저장하면 주요 수치가 표시됩니다.</div>`
          }
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

function renderLabMetric(log, key, previous = null) {
  const field = getLabField(key);
  const value = log.values?.[key];
  const delta = previous ? renderLabDelta(value, previous.values?.[key], field) : "첫 기록";
  return `
    <div class="metric">
      <div class="metric-label">${escapeHTML(field?.label || key)}</div>
      <div class="metric-value">${formatLabValue(value, field)}</div>
      <div class="metric-note">${delta}</div>
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
  const latest = logs.at(-1);
  const first = logs[0];
  const delta = latest && first ? latest.weightKg - first.weightKg : 0;

  return `
    <section class="view-title">
      <div>
        <h1>체중 기록</h1>
        <p>체중 변화와 메모를 함께 남깁니다.</p>
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

      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>체중 추세</h2>
              <p>${logs.length ? `${logs.length}개 기록` : "기록 없음"}</p>
            </div>
          </div>
          <div class="grid three">
            <div class="metric good">
              <div class="metric-label">최근</div>
              <div class="metric-value">${latest ? `${formatNumber(latest.weightKg, 2)} kg` : "-"}</div>
              <div class="metric-note">${latest ? latest.date : ""}</div>
            </div>
            <div class="metric">
              <div class="metric-label">변화</div>
              <div class="metric-value">${logs.length > 1 ? `${delta >= 0 ? "+" : ""}${formatNumber(delta, 2)} kg` : "-"}</div>
              <div class="metric-note">첫 기록 대비</div>
            </div>
            <div class="metric warn">
              <div class="metric-label">BCS</div>
              <div class="metric-value">${activeCat ? `${activeCat.bcs}/9` : "-"}</div>
              <div class="metric-note">프로필 기준</div>
            </div>
          </div>
          <div class="canvas-wrap" style="margin-top: 12px">
            <canvas id="weight-chart" aria-label="체중 추세 차트"></canvas>
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
  const posts = state.posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return `
    <section class="view-title">
      <div>
        <h1>게시판</h1>
        <p>식단, 수액, 검사, 투병 기록을 함께 나눕니다.</p>
      </div>
    </section>
    ${user ? "" : renderAuthPanel()}
    <div class="grid sidebar">
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>글쓰기</h2>
              <p>${user ? `${escapeHTML(user.name)}님으로 작성` : "로그인이 필요합니다"}</p>
            </div>
          </div>
          <form class="grid" data-form="post-add">
            <div class="form-grid">
              <div class="form-field">
                <label for="post-category">분류</label>
                <select class="select" id="post-category" name="category">
                  <option>질문</option>
                  <option>식단</option>
                  <option>수액</option>
                  <option>검사</option>
                  <option>후기</option>
                  <option>자료</option>
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
                <label for="post-title">제목</label>
                <input class="control" id="post-title" name="title" required />
              </div>
              <div class="form-field full">
                <label for="post-body">내용</label>
                <textarea class="textarea" id="post-body" name="body" required></textarea>
              </div>
            </div>
            <button class="btn primary" type="submit" ${user ? "" : "disabled"}>게시</button>
          </form>
        </div>
      </section>
      <section class="panel">
        <div class="panel-inner">
          <div class="panel-head">
            <div>
              <h2>최근 글</h2>
              <p>${posts.length}개 글</p>
            </div>
          </div>
          <div class="list">
            ${posts.length ? posts.map(renderPostItem).join("") : `<div class="empty">첫 게시글을 작성해보세요.</div>`}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderPostItem(post) {
  const user = currentUser();
  const canDelete = user && post.userId === user.id;
  return `
    <article class="item">
      <div class="item-head">
        <div>
          <h3>${escapeHTML(post.title)}</h3>
          <p>${escapeHTML(post.author)} · ${escapeHTML(post.category)} · ${formatDateTime(post.createdAt)}${post.catName ? ` · ${escapeHTML(post.catName)}` : ""}</p>
        </div>
        ${canDelete ? `<button class="btn small danger" data-action="delete-post" data-id="${post.id}">삭제</button>` : ""}
      </div>
      <p class="post-body">${escapeHTML(post.body)}</p>
      <div class="chips">
        <span class="chip">${escapeHTML(post.category)}</span>
        <span class="chip blue">댓글 ${post.comments.length}</span>
      </div>
      ${post.comments
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
        <input type="hidden" name="postId" value="${post.id}" />
        <label class="sr-only" for="comment-${post.id}">댓글</label>
        <input class="control" id="comment-${post.id}" name="body" placeholder="댓글" required ${user ? "" : "disabled"} />
        <button class="btn secondary" type="submit" ${user ? "" : "disabled"}>등록</button>
      </form>
    </article>
  `;
}

function handleAction(actionName, element) {
  if (actionName === "logout") {
    state.sessionUserId = null;
    saveState();
    showToast("로그아웃했습니다.");
    render();
    return;
  }

  if (actionName === "start-demo") {
    startDemo();
    return;
  }

  if (actionName === "select-cat") {
    state.activeCatId = element.dataset.id;
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

  if (actionName === "delete-medication-plan") {
    state.medicationPlans = state.medicationPlans.filter((plan) => plan.id !== element.dataset.id);
    state.medicationLogs = state.medicationLogs.filter((log) => log.planId !== element.dataset.id);
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
    state.posts = state.posts.filter((post) => post.id !== element.dataset.id);
    saveState();
    showToast("게시글을 삭제했습니다.");
    render();
    return;
  }

  if (actionName === "export-data") {
    exportData();
  }
}

function handleForm(formName, form) {
  const data = new FormData(form);

  if (formName === "signup") {
    const email = String(data.get("email")).trim().toLowerCase();
    if (state.users.some((user) => user.email === email)) {
      showToast("이미 가입된 이메일입니다.");
      render();
      return;
    }
    const user = {
      id: uid("user"),
      name: String(data.get("name")).trim(),
      email,
      password: String(data.get("password")),
      createdAt: new Date().toISOString()
    };
    state.users.push(user);
    state.sessionUserId = user.id;
    saveState();
    showToast("회원가입이 완료되었습니다.");
    render();
    return;
  }

  if (formName === "login") {
    const email = String(data.get("email")).trim().toLowerCase();
    const password = String(data.get("password"));
    const user = state.users.find((item) => item.email === email && item.password === password);
    if (!user) {
      showToast("이메일 또는 비밀번호를 확인해주세요.");
      render();
      return;
    }
    state.sessionUserId = user.id;
    saveState();
    showToast("로그인했습니다.");
    render();
    return;
  }

  if (formName === "cat") {
    const user = requireUser();
    if (!user) return;
    const cat = {
      id: uid("cat"),
      userId: user.id,
      name: String(data.get("name")).trim(),
      ageYears: toNumber(data.get("ageYears")),
      weightKg: toNumber(data.get("weightKg")),
      bcs: toNumber(data.get("bcs")),
      neutered: String(data.get("neutered")),
      activity: String(data.get("activity")),
      health: data.getAll("health").map(String),
      createdAt: new Date().toISOString()
    };
    state.cats.push(cat);
    state.activeCatId = cat.id;
    saveState();
    showToast(`${cat.name} 프로필을 추가했습니다.`);
    render();
    return;
  }

  if (formName === "fluid-plan") {
    const user = requireUser();
    if (!user) return;
    const times = buildTimes(String(data.get("firstTime")), toNumber(data.get("timesPerDay")));
    state.fluidPlans.push({
      id: uid("fluid"),
      userId: user.id,
      catId: String(data.get("catId")),
      name: String(data.get("name")).trim(),
      doseMl: toNumber(data.get("doseMl")),
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
    const times = buildTimes(String(data.get("firstTime")), toNumber(data.get("timesPerDay")));
    const manualName = String(data.get("name") || "").trim();
    const selectedPresets = data
      .getAll("presetKeys")
      .map((key) => getMedicationPreset(String(key)))
      .filter(Boolean);
    const manualPreset = findMedicationPresetByLabel(manualName);
    const entries = selectedPresets.length
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
    const user = requireUser();
    if (!user) return;
    const cat = state.cats.find((item) => item.id === String(data.get("catId")));
    state.posts.push({
      id: uid("post"),
      userId: user.id,
      author: user.name,
      category: String(data.get("category")),
      catId: cat?.id || "",
      catName: cat?.name || "",
      title: String(data.get("title")).trim(),
      body: String(data.get("body")).trim(),
      comments: [],
      createdAt: new Date().toISOString()
    });
    saveState();
    showToast("게시글을 등록했습니다.");
    render();
    return;
  }

  if (formName === "comment-add") {
    const user = requireUser();
    if (!user) return;
    const post = state.posts.find((item) => item.id === String(data.get("postId")));
    if (!post) return;
    post.comments.push({
      id: uid("comment"),
      userId: user.id,
      author: user.name,
      body: String(data.get("body")).trim(),
      createdAt: new Date().toISOString()
    });
    saveState();
    render();
  }
}

function currentUser() {
  return state.users.find((user) => user.id === state.sessionUserId) || null;
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
  const visible = category.value === "영양제";
  panel.hidden = !visible;
  if (!visible) {
    panel.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
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

function calorieProfile(cat) {
  const weight = Math.max(toNumber(cat.weightKg), 0.1);
  const rer = 70 * Math.pow(weight, 0.75);
  const notes = [];
  let target;

  if (cat.ageYears < 1) {
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

function getUpcomingOccurrences({ limit = 12 } = {}) {
  const user = currentUser();
  if (!user) return [];
  const today = new Date(`${todayISO()}T00:00:00`);
  const cats = getUserCats();
  const catIds = new Set(cats.map((cat) => cat.id));
  const items = [];

  state.fluidPlans
    .filter((plan) => plan.userId === user.id && plan.active !== false && catIds.has(plan.catId))
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

function getUpcomingMedicationOccurrences({ limit = 12 } = {}) {
  const user = currentUser();
  if (!user) return [];
  const today = new Date(`${todayISO()}T00:00:00`);
  const cats = getUserCats();
  const catIds = new Set(cats.map((cat) => cat.id));
  const items = [];

  state.medicationPlans
    .filter((plan) => plan.userId === user.id && plan.active !== false && catIds.has(plan.catId))
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

function getUpcomingCareOccurrences({ limit = 12 } = {}) {
  return [
    ...getUpcomingOccurrences({ limit: 30 }),
    ...getUpcomingMedicationOccurrences({ limit: 30 })
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

  const xFor = (index) =>
    padding.left + (logs.length === 1 ? plotW / 2 : (plotW / (logs.length - 1)) * index);
  const yFor = (value) => padding.top + ((max - value) / (max - min)) * plotH;

  ctx.strokeStyle = "#0f766e";
  ctx.lineWidth = 3;
  ctx.beginPath();
  logs.forEach((log, index) => {
    const x = xFor(index);
    const y = yFor(log.weightKg);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  logs.forEach((log, index) => {
    const x = xFor(index);
    const y = yFor(log.weightKg);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#0f766e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  const first = logs[0];
  const last = logs.at(-1);
  ctx.fillStyle = "#66736f";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(first.date.slice(5), padding.left, height - 14);
  ctx.textAlign = "right";
  ctx.fillText(last.date.slice(5), width - padding.right, height - 14);
}

function createDemoLabLog(user, cat) {
  return {
    id: uid("lab"),
    userId: user.id,
    catId: cat.id,
    date: "2026-05-28",
    hospital: "24시 동물의료센터",
    reportName: "5.28 혈액검사지 예시",
    values: {
      bun: 26.7,
      crea: 1.5,
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
      usg: 1.043,
      upc: 0.04
    },
    notes: "첨부 예시 검사표의 주요 항목만 입력한 샘플입니다.",
    createdAt: new Date().toISOString()
  };
}

function startDemo() {
  let user = state.users.find((item) => item.email === "demo@sinego.local");
  if (!user) {
    user = {
      id: uid("user"),
      name: "둘러보기 집사",
      email: "demo@sinego.local",
      password: "demo",
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
      name: "나무",
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
      doseMl: 80,
      timesPerDay: 1,
      intervalDays: 2,
      times: ["20:00"],
      startDate: todayISO(),
      notes: "처방 일정 예시",
      active: true,
      createdAt: new Date().toISOString()
    });
  }

  if (!state.labLogs.some((log) => log.userId === user.id)) {
    state.labLogs.push(createDemoLabLog(user, cat));
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

  if (!state.posts.some((post) => post.userId === user.id)) {
    state.posts.push({
      id: uid("post"),
      userId: user.id,
      author: user.name,
      category: "후기",
      catId: cat.id,
      catName: cat.name,
      title: "수액 스케줄을 앱에 옮겨봤어요",
      body: "처방받은 ml와 반복 간격을 등록해두니 오늘 할 일이 바로 보여서 편합니다.",
      comments: [],
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
  return `${formatNumber(cat.weightKg, 2)} kg · ${formatNumber(cat.ageYears, 1)}살 · ${activity || "활동량 미입력"}`;
}

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
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
