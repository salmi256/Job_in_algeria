/* Job in Algeria — offline demo app (localStorage-backed) */

const WILAYAS = ["أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة","تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة","سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة","وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة","سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان","تيميمون","برج باجي مختار","أولاد جلال","بني عباس","عين صالح","عين قزام","تقرت","جانت","المغير","المنيعة"];
const CATEGORIES = ["تكنولوجيا المعلومات","الصحة والطب","التعليم والتدريس","الهندسة","البناء والأشغال","التجارة والمبيعات","المالية والمحاسبة","النقل واللوجستيك","السياحة والفندقة","الإدارة والسكرتارية","الصناعة","الفلاحة","أخرى"];
const JOB_TYPES = { "full-time": "دوام كامل", "part-time": "دوام جزئي", contract: "عقد محدد", internship: "تربص", remote: "عن بعد" };

const SEED_JOBS = [
  { id: "j1", title: "مطور ويب Full-Stack", company: "Yassir", wilaya: "الجزائر", category: "تكنولوجيا المعلومات", jobType: "full-time", salary: "120,000 دج", description: "نبحث عن مطور ويب متمكن في React و Node.js للانضمام إلى فريقنا التقني في الجزائر العاصمة.\n\nالمتطلبات:\n- خبرة سنتين على الأقل\n- إتقان JavaScript/TypeScript\n- معرفة بقواعد البيانات" },
  { id: "j2", title: "ممرض/ممرضة", company: "عيادة الشفاء", wilaya: "وهران", category: "الصحة والطب", jobType: "full-time", salary: "55,000 دج", description: "مطلوب ممرضون وممرضات للعمل في عيادة خاصة بوهران. يشترط شهادة دولة في التمريض وخبرة سنة على الأقل." },
  { id: "j3", title: "أستاذ لغة إنجليزية", company: "مدرسة النجاح الخاصة", wilaya: "قسنطينة", category: "التعليم والتدريس", jobType: "part-time", salary: "40,000 دج", description: "مدرسة خاصة بقسنطينة تبحث عن أستاذ لغة إنجليزية لتدريس المستويات المتوسطة والثانوية. دوام جزئي مسائي." },
  { id: "j4", title: "مهندس مدني", company: "Cosider", wilaya: "سطيف", category: "الهندسة", jobType: "full-time", salary: "150,000 دج", description: "مطلوب مهندس مدني لمتابعة مشاريع البناء الكبرى. خبرة 3 سنوات في تسيير الورشات. رخصة سياقة إلزامية." },
  { id: "j5", title: "محاسب رئيسي", company: "Cevital", wilaya: "بجاية", category: "المالية والمحاسبة", jobType: "full-time", salary: "130,000 دج", description: "شركة كبرى بالجزائر تبحث عن محاسب رئيسي متحكم في PC Compta و التصريحات الجبائية. خبرة 5 سنوات." },
  { id: "j6", title: "سائق شاحنة", company: "Numilog", wilaya: "البليدة", category: "النقل واللوجستيك", jobType: "full-time", salary: "70,000 دج", description: "مطلوب سائقون لشاحنات النقل الثقيل، رخصة صنف C. خطوط بين الولايات." },
  { id: "j7", title: "مسؤول تسويق رقمي", company: "Jumia Algérie", wilaya: "الجزائر", category: "التجارة والمبيعات", jobType: "remote", salary: "90,000 دج", description: "نبحث عن مسؤول تسويق رقمي متمكن من إدارة الحملات الإعلانية على فيسبوك وإنستغرام وجوجل. إمكانية العمل عن بعد." },
  { id: "j8", title: "موظف استقبال فندقي", company: "فندق الأوراسي", wilaya: "الجزائر", category: "السياحة والفندقة", jobType: "full-time", salary: "60,000 دج", description: "فندق 5 نجوم يبحث عن موظفي استقبال يتقنون العربية والفرنسية والإنجليزية. مظهر لائق وروح خدمة العملاء." },
  { id: "j9", title: "تقني في الإعلام الآلي", company: "Condor Electronics", wilaya: "برج بوعريريج", category: "تكنولوجيا المعلومات", jobType: "full-time", salary: "65,000 دج", description: "مطلوب تقني سامي في الإعلام الآلي للصيانة والدعم التقني بمصنع برج بوعريريج." },
  { id: "j10", title: "مهندس فلاحي", company: "مزرعة الواحات", wilaya: "بسكرة", category: "الفلاحة", jobType: "full-time", salary: "85,000 دج", description: "مستثمرة فلاحية كبرى ببسكرة تبحث عن مهندس فلاحي متخصص في الري والزراعات الصحراوية." },
  { id: "j11", title: "سكرتيرة إدارية", company: "مكتب المحاماة بن عمر", wilaya: "تلمسان", category: "الإدارة والسكرتارية", jobType: "full-time", salary: "45,000 دج", description: "مكتب محاماة بتلمسان يبحث عن سكرتيرة إدارية متحكمة في الإعلام الآلي وتحرير المراسلات بالعربية والفرنسية." },
  { id: "j12", title: "متربص في تطوير تطبيقات الموبايل", company: "Djezzy", wilaya: "الجزائر", category: "تكنولوجيا المعلومات", jobType: "internship", salary: "30,000 دج", description: "فرصة تربص مدفوع الأجر لمدة 6 أشهر في تطوير تطبيقات Android/iOS مع إمكانية التوظيف الدائم." },
];

const db = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
};
if (!localStorage.getItem("jobs")) db.set("jobs", SEED_JOBS);

const state = { view: "home", params: {} };
const currentUser = () => db.get("session", null);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function hashPassword(pass) {
  const data = new TextEncoder().encode(pass);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function go(view, params = {}) { state.view = view; state.params = params; render(); window.scrollTo(0, 0); }

function logout() { localStorage.removeItem("session"); go("home"); }

function options(list, selected) {
  return list.map((x) => `<option value="${esc(x)}" ${x === selected ? "selected" : ""}>${esc(x)}</option>`).join("");
}

function jobCard(j) {
  return `<div class="card job" onclick="go('detail',{id:'${j.id}'})">
    <div class="job-head">
      <div><div class="job-title">${esc(j.title)}</div><div class="job-company">${esc(j.company)}</div></div>
      <span class="pill">${JOB_TYPES[j.jobType] || esc(j.jobType)}</span>
    </div>
    <div class="tags">
      <span class="tag">📍 ${esc(j.wilaya)}</span><span class="tag">🏷️ ${esc(j.category)}</span>
      ${j.salary ? `<span class="tag">💰 ${esc(j.salary)}</span>` : ""}
    </div>
  </div>`;
}

function filterJobs() {
  const q = (document.getElementById("f-q")?.value || "").trim();
  const wilaya = document.getElementById("f-wilaya")?.value || "";
  const category = document.getElementById("f-category")?.value || "";
  const jobType = document.getElementById("f-type")?.value || "";
  const jobs = db.get("jobs", []).filter((j) =>
    (!q || j.title.includes(q) || j.company.includes(q) || j.description.includes(q)) &&
    (!wilaya || j.wilaya === wilaya) &&
    (!category || j.category === category) &&
    (!jobType || j.jobType === jobType)
  );
  document.getElementById("results").innerHTML =
    `<p class="muted">${jobs.length} وظيفة</p>` +
    (jobs.length ? jobs.map(jobCard).join("") : `<p class="muted">لا توجد نتائج مطابقة لبحثك.</p>`);
}

const views = {
  home() {
    const jobs = db.get("jobs", []).slice(0, 6);
    return `
      <div class="hero">
        <h1>ابحث عن وظيفتك في الجزائر</h1>
        <p>آلاف الوظائف في جميع ولايات الوطن — ابدأ مسيرتك المهنية اليوم</p>
        <div class="searchbox">
          <input id="h-q" placeholder="المسمى الوظيفي أو الشركة..." />
          <select id="h-wilaya"><option value="">كل الولايات</option>${options(WILAYAS)}</select>
          <button class="btn btn-primary btn-block" onclick="go('jobs',{q:document.getElementById('h-q').value,wilaya:document.getElementById('h-wilaya').value})">بحث</button>
        </div>
      </div>
      <div class="container">
        <h2>أحدث الوظائف</h2>
        ${jobs.map(jobCard).join("")}
        <h2>تصفح حسب القطاع</h2>
        <div class="tags">${CATEGORIES.map((c) => `<span class="tag" style="cursor:pointer;padding:8px 12px;font-size:13px" onclick="go('jobs',{category:'${esc(c)}'})">${esc(c)}</span>`).join("")}</div>
      </div>`;
  },

  jobs() {
    setTimeout(filterJobs, 0);
    const p = state.params;
    return `<div class="container">
      <h2>البحث عن الوظائف</h2>
      <div class="filters">
        <input id="f-q" placeholder="كلمة البحث..." value="${esc(p.q || "")}" oninput="filterJobs()" />
        <select id="f-wilaya" onchange="filterJobs()"><option value="">كل الولايات</option>${options(WILAYAS, p.wilaya)}</select>
        <select id="f-category" onchange="filterJobs()"><option value="">كل القطاعات</option>${options(CATEGORIES, p.category)}</select>
        <select id="f-type" onchange="filterJobs()" style="grid-column:1/-1"><option value="">كل أنواع الدوام</option>${Object.entries(JOB_TYPES).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
      </div>
      <div id="results"></div>
    </div>`;
  },

  detail() {
    const j = db.get("jobs", []).find((x) => x.id === state.params.id);
    if (!j) return `<div class="container"><p class="muted">الوظيفة غير موجودة.</p></div>`;
    return `<div class="container">
      <div class="card">
        <div class="job-head">
          <div><div class="job-title" style="font-size:19px">${esc(j.title)}</div><div class="job-company">${esc(j.company)}</div></div>
          <span class="pill">${JOB_TYPES[j.jobType] || esc(j.jobType)}</span>
        </div>
        <div class="tags">
          <span class="tag">📍 ${esc(j.wilaya)}</span><span class="tag">🏷️ ${esc(j.category)}</span>
          ${j.salary ? `<span class="tag">💰 ${esc(j.salary)}</span>` : ""}
        </div>
        <label>وصف الوظيفة</label>
        <div class="desc">${esc(j.description)}</div>
      </div>
      <div class="card">
        <h2 style="font-size:16px">التقدم لهذه الوظيفة</h2>
        <textarea id="apply-msg" rows="4" placeholder="رسالة تحفيزية (اختياري)..." style="margin-top:8px"></textarea>
        <div style="margin-top:10px"><button class="btn btn-primary" onclick="applyJob('${j.id}')">إرسال الطلب</button></div>
        <div id="apply-status"></div>
      </div>
    </div>`;
  },

  login() {
    return `<div class="container"><div class="card">
      <h2>تسجيل الدخول</h2>
      <label>البريد الإلكتروني</label><input id="l-email" type="email" />
      <label>كلمة المرور</label><input id="l-pass" type="password" />
      <div id="l-error"></div>
      <div style="margin-top:14px"><button class="btn btn-primary btn-block" onclick="doLogin()">دخول</button></div>
      <p class="muted" style="margin-top:12px;text-align:center">ليس لديك حساب؟ <a class="link" onclick="go('register')">إنشاء حساب</a></p>
    </div></div>`;
  },

  register() {
    return `<div class="container"><div class="card">
      <h2>إنشاء حساب جديد</h2>
      <label>الاسم الكامل</label><input id="r-name" />
      <label>البريد الإلكتروني</label><input id="r-email" type="email" />
      <label>كلمة المرور</label><input id="r-pass" type="password" />
      <label>نوع الحساب</label>
      <select id="r-role"><option value="seeker">باحث عن عمل</option><option value="employer">صاحب عمل</option></select>
      <div id="r-error"></div>
      <div style="margin-top:14px"><button class="btn btn-primary btn-block" onclick="doRegister()">إنشاء الحساب</button></div>
      <p class="muted" style="margin-top:12px;text-align:center">لديك حساب بالفعل؟ <a class="link" onclick="go('login')">تسجيل الدخول</a></p>
    </div></div>`;
  },

  post() {
    if (!currentUser()) { setTimeout(() => go("login"), 0); return ""; }
    return `<div class="container"><div class="card">
      <h2>نشر وظيفة جديدة</h2>
      <label>المسمى الوظيفي *</label><input id="p-title" />
      <label>الشركة *</label><input id="p-company" />
      <label>الولاية *</label><select id="p-wilaya"><option value="">اختر الولاية</option>${options(WILAYAS)}</select>
      <label>القطاع *</label><select id="p-category"><option value="">اختر القطاع</option>${options(CATEGORIES)}</select>
      <label>نوع الدوام</label><select id="p-type">${Object.entries(JOB_TYPES).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
      <label>الراتب (اختياري)</label><input id="p-salary" placeholder="مثال: 60,000 دج" />
      <label>وصف الوظيفة *</label><textarea id="p-desc" rows="5"></textarea>
      <div id="p-error"></div>
      <div style="margin-top:14px"><button class="btn btn-primary btn-block" onclick="postJob()">نشر الوظيفة</button></div>
    </div></div>`;
  },

  dashboard() {
    const user = currentUser();
    if (!user) { setTimeout(() => go("login"), 0); return ""; }
    const apps = db.get("applications", []).filter((a) => a.userEmail === user.email);
    const jobs = db.get("jobs", []);
    return `<div class="container">
      <h2>طلبات التوظيف الخاصة بي</h2>
      ${apps.length === 0
        ? `<p class="muted">لم تتقدم لأي وظيفة بعد. <a class="link" onclick="go('jobs')">تصفح الوظائف</a></p>`
        : apps.map((a) => {
            const j = jobs.find((x) => x.id === a.jobId);
            if (!j) return "";
            return `<div class="card job" onclick="go('detail',{id:'${j.id}'})">
              <div class="job-head">
                <div><div class="job-title">${esc(j.title)}</div><div class="job-company">${esc(j.company)} — ${esc(j.wilaya)}</div></div>
                <span class="pill">${JOB_TYPES[j.jobType] || esc(j.jobType)}</span>
              </div>
              <p class="muted" style="margin-top:8px;font-size:11px">تاريخ التقديم: ${new Date(a.createdAt).toLocaleDateString("ar-DZ")}</p>
            </div>`;
          }).join("")}
    </div>`;
  },
};

async function doRegister() {
  const name = document.getElementById("r-name").value.trim();
  const email = document.getElementById("r-email").value.trim().toLowerCase();
  const pass = document.getElementById("r-pass").value;
  const role = document.getElementById("r-role").value;
  const err = document.getElementById("r-error");
  if (!name || !email || !pass) { err.innerHTML = `<p class="error">جميع الحقول مطلوبة</p>`; return; }
  if (pass.length < 6) { err.innerHTML = `<p class="error">كلمة المرور يجب أن تكون 6 أحرف على الأقل</p>`; return; }
  const users = db.get("users", []);
  if (users.some((u) => u.email === email)) { err.innerHTML = `<p class="error">البريد الإلكتروني مستخدم بالفعل</p>`; return; }
  users.push({ name, email, passHash: await hashPassword(pass), role });
  db.set("users", users);
  db.set("session", { name, email, role });
  go("home");
}

async function doLogin() {
  const email = document.getElementById("l-email").value.trim().toLowerCase();
  const pass = document.getElementById("l-pass").value;
  const err = document.getElementById("l-error");
  const passHash = await hashPassword(pass);
  const user = db.get("users", []).find((u) => u.email === email && u.passHash === passHash);
  if (!user) { err.innerHTML = `<p class="error">البريد الإلكتروني أو كلمة المرور غير صحيحة</p>`; return; }
  db.set("session", { name: user.name, email: user.email, role: user.role });
  go("home");
}

function applyJob(jobId) {
  const user = currentUser();
  if (!user) { go("login"); return; }
  const status = document.getElementById("apply-status");
  const apps = db.get("applications", []);
  if (apps.some((a) => a.jobId === jobId && a.userEmail === user.email)) {
    status.innerHTML = `<p class="error">لقد تقدمت لهذه الوظيفة من قبل</p>`; return;
  }
  apps.push({ jobId, userEmail: user.email, message: document.getElementById("apply-msg").value, createdAt: Date.now() });
  db.set("applications", apps);
  status.innerHTML = `<p class="success">تم إرسال طلبك بنجاح!</p>`;
}

function postJob() {
  const v = (id) => document.getElementById(id).value.trim();
  const err = document.getElementById("p-error");
  if (!v("p-title") || !v("p-company") || !v("p-wilaya") || !v("p-category") || !v("p-desc")) {
    err.innerHTML = `<p class="error">جميع الحقول المطلوبة (*) يجب ملؤها</p>`; return;
  }
  const jobs = db.get("jobs", []);
  const job = { id: "j" + Date.now(), title: v("p-title"), company: v("p-company"), wilaya: v("p-wilaya"), category: v("p-category"), jobType: v("p-type"), salary: v("p-salary"), description: v("p-desc") };
  jobs.unshift(job);
  db.set("jobs", jobs);
  go("detail", { id: job.id });
}

function render() {
  const user = currentUser();
  document.getElementById("nav").innerHTML = user
    ? `<a class="link" onclick="go('jobs')">الوظائف</a>
       <a class="link" onclick="go('post')">نشر وظيفة</a>
       <a class="link" onclick="go('dashboard')">طلباتي</a>
       <button class="btn btn-outline" onclick="logout()">خروج</button>`
    : `<a class="link" onclick="go('jobs')">الوظائف</a>
       <button class="btn btn-outline" onclick="go('login')">دخول</button>
       <button class="btn btn-primary" onclick="go('register')">حساب جديد</button>`;
  document.getElementById("app").innerHTML = views[state.view]();
}

render();
