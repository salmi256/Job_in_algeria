/* Job in Algeria — offline demo app (localStorage-backed) */

const WILAYAS = ["أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة","تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة","سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة","وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة","سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان","تيميمون","برج باجي مختار","أولاد جلال","بني عباس","عين صالح","عين قزام","تقرت","جانت","المغير","المنيعة"];
const CATEGORIES = ["تكنولوجيا المعلومات","الصحة والطب","التعليم والتدريس","الهندسة","البناء والأشغال","التجارة والمبيعات","المالية والمحاسبة","النقل واللوجستيك","السياحة والفندقة","الإدارة والسكرتارية","الصناعة","الفلاحة","أخرى"];

const I18N = {
  ar: {
    dir: "rtl",
    demoBanner: "نسخة تجريبية — البيانات محفوظة محلياً على جهازك",
    footer: "Job in Algeria © 2026 — منصة الوظائف الأولى في الجزائر",
    navJobs: "الوظائف", navPost: "نشر وظيفة", navApps: "طلباتي", navLogout: "خروج", navLogin: "دخول", navRegister: "حساب جديد",
    heroTitle: "ابحث عن وظيفتك في الجزائر", heroSub: "آلاف الوظائف في جميع ولايات الوطن — ابدأ مسيرتك المهنية اليوم",
    searchPlaceholder: "المسمى الوظيفي أو الشركة...", allWilayas: "كل الولايات", search: "بحث",
    latestJobs: "أحدث الوظائف", browseByCategory: "تصفح حسب القطاع",
    jobsTitle: "البحث عن الوظائف", keyword: "كلمة البحث...", allCategories: "كل القطاعات", allTypes: "كل أنواع الدوام",
    jobsCount: "وظيفة", noResults: "لا توجد نتائج مطابقة لبحثك.", jobNotFound: "الوظيفة غير موجودة.",
    jobDesc: "وصف الوظيفة", applyTitle: "التقدم لهذه الوظيفة", applyMsg: "رسالة تحفيزية (اختياري)...",
    attachCv: "📎 إرفاق السيرة الذاتية (CV)", cvAttached: "✓ تم إرفاق: ", send: "إرسال الطلب",
    applySuccess: "تم إرسال طلبك بنجاح!", alreadyApplied: "لقد تقدمت لهذه الوظيفة من قبل",
    login: "تسجيل الدخول", email: "البريد الإلكتروني", password: "كلمة المرور", loginBtn: "دخول",
    noAccount: "ليس لديك حساب؟", createAccount: "إنشاء حساب", haveAccount: "لديك حساب بالفعل؟",
    register: "إنشاء حساب جديد", fullName: "الاسم الكامل", accountType: "نوع الحساب",
    seeker: "باحث عن عمل", employer: "صاحب عمل", registerBtn: "إنشاء الحساب",
    required: "جميع الحقول مطلوبة", passwordShort: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    emailUsed: "البريد الإلكتروني مستخدم بالفعل", badCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    postTitle: "نشر وظيفة جديدة", jobTitleL: "المسمى الوظيفي *", company: "الشركة *",
    wilaya: "الولاية *", chooseWilaya: "اختر الولاية", category: "القطاع *", chooseCategory: "اختر القطاع",
    jobType: "نوع الدوام", salary: "الراتب (اختياري)", salaryPh: "مثال: 60,000 دج", descL: "وصف الوظيفة *",
    requiredFields: "جميع الحقول المطلوبة (*) يجب ملؤها", postBtn: "نشر الوظيفة",
    myApps: "طلبات التوظيف الخاصة بي", noApps: "لم تتقدم لأي وظيفة بعد.", browseJobs: "تصفح الوظائف",
    appliedOn: "تاريخ التقديم: ", withCv: "📎 CV",
    types: { "full-time": "دوام كامل", "part-time": "دوام جزئي", contract: "عقد محدد", internship: "تربص", remote: "عن بعد" },
  },
  fr: {
    dir: "ltr",
    demoBanner: "Version démo — les données sont stockées localement sur votre appareil",
    footer: "Job in Algeria © 2026 — La première plateforme d'emploi en Algérie",
    navJobs: "Emplois", navPost: "Publier", navApps: "Mes candidatures", navLogout: "Déconnexion", navLogin: "Connexion", navRegister: "S'inscrire",
    heroTitle: "Trouvez votre emploi en Algérie", heroSub: "Des milliers d'offres dans toutes les wilayas — lancez votre carrière aujourd'hui",
    searchPlaceholder: "Poste ou entreprise...", allWilayas: "Toutes les wilayas", search: "Rechercher",
    latestJobs: "Dernières offres", browseByCategory: "Parcourir par secteur",
    jobsTitle: "Recherche d'emplois", keyword: "Mot-clé...", allCategories: "Tous les secteurs", allTypes: "Tous les types",
    jobsCount: "offre(s)", noResults: "Aucun résultat ne correspond à votre recherche.", jobNotFound: "Offre introuvable.",
    jobDesc: "Description du poste", applyTitle: "Postuler à cette offre", applyMsg: "Message de motivation (optionnel)...",
    attachCv: "📎 Joindre un CV", cvAttached: "✓ Joint : ", send: "Envoyer la candidature",
    applySuccess: "Votre candidature a été envoyée !", alreadyApplied: "Vous avez déjà postulé à cette offre",
    login: "Connexion", email: "E-mail", password: "Mot de passe", loginBtn: "Se connecter",
    noAccount: "Pas de compte ?", createAccount: "Créer un compte", haveAccount: "Vous avez déjà un compte ?",
    register: "Créer un nouveau compte", fullName: "Nom complet", accountType: "Type de compte",
    seeker: "Chercheur d'emploi", employer: "Employeur", registerBtn: "Créer le compte",
    required: "Tous les champs sont requis", passwordShort: "Le mot de passe doit contenir au moins 6 caractères",
    emailUsed: "Cet e-mail est déjà utilisé", badCredentials: "E-mail ou mot de passe incorrect",
    postTitle: "Publier une nouvelle offre", jobTitleL: "Intitulé du poste *", company: "Entreprise *",
    wilaya: "Wilaya *", chooseWilaya: "Choisir la wilaya", category: "Secteur *", chooseCategory: "Choisir le secteur",
    jobType: "Type de contrat", salary: "Salaire (optionnel)", salaryPh: "Ex : 60 000 DA", descL: "Description du poste *",
    requiredFields: "Tous les champs requis (*) doivent être remplis", postBtn: "Publier l'offre",
    myApps: "Mes candidatures", noApps: "Vous n'avez encore postulé à aucune offre.", browseJobs: "Parcourir les offres",
    appliedOn: "Date de candidature : ", withCv: "📎 CV",
    types: { "full-time": "Temps plein", "part-time": "Temps partiel", contract: "CDD", internship: "Stage", remote: "Télétravail" },
  },
  en: {
    dir: "ltr",
    demoBanner: "Demo version — data is stored locally on your device",
    footer: "Job in Algeria © 2026 — Algeria's #1 job platform",
    navJobs: "Jobs", navPost: "Post a job", navApps: "My applications", navLogout: "Logout", navLogin: "Login", navRegister: "Sign up",
    heroTitle: "Find your job in Algeria", heroSub: "Thousands of jobs across all wilayas — start your career today",
    searchPlaceholder: "Job title or company...", allWilayas: "All wilayas", search: "Search",
    latestJobs: "Latest jobs", browseByCategory: "Browse by sector",
    jobsTitle: "Job search", keyword: "Keyword...", allCategories: "All sectors", allTypes: "All job types",
    jobsCount: "job(s)", noResults: "No results match your search.", jobNotFound: "Job not found.",
    jobDesc: "Job description", applyTitle: "Apply for this job", applyMsg: "Motivation message (optional)...",
    attachCv: "📎 Attach CV", cvAttached: "✓ Attached: ", send: "Send application",
    applySuccess: "Your application has been sent!", alreadyApplied: "You have already applied for this job",
    login: "Login", email: "Email", password: "Password", loginBtn: "Sign in",
    noAccount: "No account?", createAccount: "Create account", haveAccount: "Already have an account?",
    register: "Create a new account", fullName: "Full name", accountType: "Account type",
    seeker: "Job seeker", employer: "Employer", registerBtn: "Create account",
    required: "All fields are required", passwordShort: "Password must be at least 6 characters",
    emailUsed: "This email is already in use", badCredentials: "Incorrect email or password",
    postTitle: "Post a new job", jobTitleL: "Job title *", company: "Company *",
    wilaya: "Wilaya *", chooseWilaya: "Choose wilaya", category: "Sector *", chooseCategory: "Choose sector",
    jobType: "Job type", salary: "Salary (optional)", salaryPh: "e.g. 60,000 DZD", descL: "Job description *",
    requiredFields: "All required fields (*) must be filled", postBtn: "Post job",
    myApps: "My job applications", noApps: "You haven't applied to any job yet.", browseJobs: "Browse jobs",
    appliedOn: "Applied on: ", withCv: "📎 CV",
    types: { "full-time": "Full-time", "part-time": "Part-time", contract: "Contract", internship: "Internship", remote: "Remote" },
  },
};

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

let lang = db.get("lang", "ar");
if (!I18N[lang]) lang = "ar";
const t = (key) => I18N[lang][key] ?? key;
const typeName = (jobType) => I18N[lang].types[jobType] || jobType;

const state = { view: "home", params: {} };
let pendingCv = null;
const currentUser = () => db.get("session", null);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function hashPassword(pass) {
  const data = new TextEncoder().encode(pass);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function setLang(newLang) {
  lang = newLang;
  db.set("lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = I18N[lang].dir;
  render();
}

function go(view, params = {}) {
  state.view = view;
  state.params = params;
  pendingCv = null;
  render(true);
  window.scrollTo(0, 0);
}

function logout() { localStorage.removeItem("session"); go("home"); }

function showSuccessOverlay() {
  const el = document.createElement("div");
  el.className = "success-overlay";
  el.innerHTML = `<div class="check">✅</div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

function options(list, selected) {
  return list.map((x) => `<option value="${esc(x)}" ${x === selected ? "selected" : ""}>${esc(x)}</option>`).join("");
}

function jobCard(j, i = 0) {
  return `<div class="card job stagger" style="animation-delay:${Math.min(i * 60, 420)}ms" onclick="go('detail',{id:'${j.id}'})">
    <div class="job-head">
      <div><div class="job-title">${esc(j.title)}</div><div class="job-company">${esc(j.company)}</div></div>
      <span class="pill">${typeName(j.jobType)}</span>
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
    `<p class="muted">${jobs.length} ${t("jobsCount")}</p>` +
    (jobs.length ? jobs.map((j, i) => jobCard(j, i)).join("") : `<p class="muted">${t("noResults")}</p>`);
}

function onCvChange(input) {
  const file = input.files && input.files[0];
  const drop = document.getElementById("cv-drop");
  if (!file) { pendingCv = null; drop.classList.remove("has-file"); drop.textContent = t("attachCv"); return; }
  const reader = new FileReader();
  reader.onload = () => {
    pendingCv = { name: file.name, data: reader.result };
    drop.classList.add("has-file");
    drop.textContent = t("cvAttached") + file.name;
  };
  reader.readAsDataURL(file);
}

const views = {
  home() {
    const jobs = db.get("jobs", []).slice(0, 6);
    return `
      <div class="hero">
        <h1>${t("heroTitle")}</h1>
        <p>${t("heroSub")}</p>
        <div class="searchbox">
          <input id="h-q" placeholder="${t("searchPlaceholder")}" />
          <select id="h-wilaya"><option value="">${t("allWilayas")}</option>${options(WILAYAS)}</select>
          <button class="btn btn-primary btn-block" onclick="go('jobs',{q:document.getElementById('h-q').value,wilaya:document.getElementById('h-wilaya').value})">${t("search")}</button>
        </div>
      </div>
      <div class="container">
        <h2>${t("latestJobs")}</h2>
        ${jobs.map((j, i) => jobCard(j, i)).join("")}
        <h2>${t("browseByCategory")}</h2>
        <div class="tags">${CATEGORIES.map((c) => `<span class="tag" style="cursor:pointer;padding:8px 12px;font-size:13px" onclick="go('jobs',{category:'${esc(c)}'})">${esc(c)}</span>`).join("")}</div>
      </div>`;
  },

  jobs() {
    setTimeout(filterJobs, 0);
    const p = state.params;
    return `<div class="container">
      <h2>${t("jobsTitle")}</h2>
      <div class="filters">
        <input id="f-q" placeholder="${t("keyword")}" value="${esc(p.q || "")}" oninput="filterJobs()" />
        <select id="f-wilaya" onchange="filterJobs()"><option value="">${t("allWilayas")}</option>${options(WILAYAS, p.wilaya)}</select>
        <select id="f-category" onchange="filterJobs()"><option value="">${t("allCategories")}</option>${options(CATEGORIES, p.category)}</select>
        <select id="f-type" onchange="filterJobs()" style="grid-column:1/-1"><option value="">${t("allTypes")}</option>${Object.entries(I18N[lang].types).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
      </div>
      <div id="results"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>
    </div>`;
  },

  detail() {
    const j = db.get("jobs", []).find((x) => x.id === state.params.id);
    if (!j) return `<div class="container"><p class="muted">${t("jobNotFound")}</p></div>`;
    return `<div class="container">
      <div class="card stagger">
        <div class="job-head">
          <div><div class="job-title" style="font-size:19px">${esc(j.title)}</div><div class="job-company">${esc(j.company)}</div></div>
          <span class="pill">${typeName(j.jobType)}</span>
        </div>
        <div class="tags">
          <span class="tag">📍 ${esc(j.wilaya)}</span><span class="tag">🏷️ ${esc(j.category)}</span>
          ${j.salary ? `<span class="tag">💰 ${esc(j.salary)}</span>` : ""}
        </div>
        <label>${t("jobDesc")}</label>
        <div class="desc">${esc(j.description)}</div>
      </div>
      <div class="card stagger" style="animation-delay:.12s">
        <h2 style="font-size:16px">${t("applyTitle")}</h2>
        <textarea id="apply-msg" rows="4" placeholder="${t("applyMsg")}" style="margin-top:8px"></textarea>
        <div id="cv-drop" class="file-drop" style="margin-top:10px" onclick="document.getElementById('cv-file').click()">${t("attachCv")}</div>
        <input id="cv-file" type="file" accept=".pdf,.doc,.docx,image/*" style="display:none" onchange="onCvChange(this)" />
        <div style="margin-top:10px"><button class="btn btn-primary" onclick="applyJob('${j.id}')">${t("send")}</button></div>
        <div id="apply-status"></div>
      </div>
    </div>`;
  },

  login() {
    return `<div class="container"><div class="card stagger">
      <h2>${t("login")}</h2>
      <label>${t("email")}</label><input id="l-email" type="email" />
      <label>${t("password")}</label><input id="l-pass" type="password" />
      <div id="l-error"></div>
      <div style="margin-top:14px"><button class="btn btn-primary btn-block" onclick="doLogin()">${t("loginBtn")}</button></div>
      <p class="muted" style="margin-top:12px;text-align:center">${t("noAccount")} <a class="link" onclick="go('register')">${t("createAccount")}</a></p>
    </div></div>`;
  },

  register() {
    return `<div class="container"><div class="card stagger">
      <h2>${t("register")}</h2>
      <label>${t("fullName")}</label><input id="r-name" />
      <label>${t("email")}</label><input id="r-email" type="email" />
      <label>${t("password")}</label><input id="r-pass" type="password" />
      <label>${t("accountType")}</label>
      <select id="r-role"><option value="seeker">${t("seeker")}</option><option value="employer">${t("employer")}</option></select>
      <div id="r-error"></div>
      <div style="margin-top:14px"><button class="btn btn-primary btn-block" onclick="doRegister()">${t("registerBtn")}</button></div>
      <p class="muted" style="margin-top:12px;text-align:center">${t("haveAccount")} <a class="link" onclick="go('login')">${t("login")}</a></p>
    </div></div>`;
  },

  post() {
    if (!currentUser()) { setTimeout(() => go("login"), 0); return ""; }
    return `<div class="container"><div class="card stagger">
      <h2>${t("postTitle")}</h2>
      <label>${t("jobTitleL")}</label><input id="p-title" />
      <label>${t("company")}</label><input id="p-company" />
      <label>${t("wilaya")}</label><select id="p-wilaya"><option value="">${t("chooseWilaya")}</option>${options(WILAYAS)}</select>
      <label>${t("category")}</label><select id="p-category"><option value="">${t("chooseCategory")}</option>${options(CATEGORIES)}</select>
      <label>${t("jobType")}</label><select id="p-type">${Object.entries(I18N[lang].types).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
      <label>${t("salary")}</label><input id="p-salary" placeholder="${t("salaryPh")}" />
      <label>${t("descL")}</label><textarea id="p-desc" rows="5"></textarea>
      <div id="p-error"></div>
      <div style="margin-top:14px"><button class="btn btn-primary btn-block" onclick="postJob()">${t("postBtn")}</button></div>
    </div></div>`;
  },

  dashboard() {
    const user = currentUser();
    if (!user) { setTimeout(() => go("login"), 0); return ""; }
    const apps = db.get("applications", []).filter((a) => a.userEmail === user.email);
    const jobs = db.get("jobs", []);
    return `<div class="container">
      <h2>${t("myApps")}</h2>
      ${apps.length === 0
        ? `<p class="muted">${t("noApps")} <a class="link" onclick="go('jobs')">${t("browseJobs")}</a></p>`
        : apps.map((a, i) => {
            const j = jobs.find((x) => x.id === a.jobId);
            if (!j) return "";
            return `<div class="card job stagger" style="animation-delay:${Math.min(i * 60, 420)}ms" onclick="go('detail',{id:'${j.id}'})">
              <div class="job-head">
                <div><div class="job-title">${esc(j.title)}</div><div class="job-company">${esc(j.company)} — ${esc(j.wilaya)}</div></div>
                <span class="pill">${typeName(j.jobType)}</span>
              </div>
              <p class="muted" style="margin-top:8px;font-size:11px">${t("appliedOn")}${new Date(a.createdAt).toLocaleDateString(lang === "ar" ? "ar-DZ" : lang === "fr" ? "fr-DZ" : "en-GB")}${a.cvName ? ` — <span class="pill">${t("withCv")} ${esc(a.cvName)}</span>` : ""}</p>
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
  if (!name || !email || !pass) { err.innerHTML = `<p class="error">${t("required")}</p>`; return; }
  if (pass.length < 6) { err.innerHTML = `<p class="error">${t("passwordShort")}</p>`; return; }
  const users = db.get("users", []);
  if (users.some((u) => u.email === email)) { err.innerHTML = `<p class="error">${t("emailUsed")}</p>`; return; }
  users.push({ name, email, passHash: await hashPassword(pass), role });
  db.set("users", users);
  db.set("session", { name, email, role });
  showSuccessOverlay();
  setTimeout(() => go("home"), 500);
}

async function doLogin() {
  const email = document.getElementById("l-email").value.trim().toLowerCase();
  const pass = document.getElementById("l-pass").value;
  const err = document.getElementById("l-error");
  const passHash = await hashPassword(pass);
  const user = db.get("users", []).find((u) => u.email === email && u.passHash === passHash);
  if (!user) { err.innerHTML = `<p class="error">${t("badCredentials")}</p>`; return; }
  db.set("session", { name: user.name, email: user.email, role: user.role });
  showSuccessOverlay();
  setTimeout(() => go("home"), 500);
}

function applyJob(jobId) {
  const user = currentUser();
  if (!user) { go("login"); return; }
  const status = document.getElementById("apply-status");
  const apps = db.get("applications", []);
  if (apps.some((a) => a.jobId === jobId && a.userEmail === user.email)) {
    status.innerHTML = `<p class="error">${t("alreadyApplied")}</p>`; return;
  }
  apps.push({
    jobId,
    userEmail: user.email,
    message: document.getElementById("apply-msg").value,
    cvName: pendingCv ? pendingCv.name : null,
    cvData: pendingCv ? pendingCv.data : null,
    createdAt: Date.now(),
  });
  db.set("applications", apps);
  showSuccessOverlay();
  status.innerHTML = `<p class="success">${t("applySuccess")}</p>`;
}

function postJob() {
  const v = (id) => document.getElementById(id).value.trim();
  const err = document.getElementById("p-error");
  if (!v("p-title") || !v("p-company") || !v("p-wilaya") || !v("p-category") || !v("p-desc")) {
    err.innerHTML = `<p class="error">${t("requiredFields")}</p>`; return;
  }
  const jobs = db.get("jobs", []);
  const job = { id: "j" + Date.now(), title: v("p-title"), company: v("p-company"), wilaya: v("p-wilaya"), category: v("p-category"), jobType: v("p-type"), salary: v("p-salary"), description: v("p-desc") };
  jobs.unshift(job);
  db.set("jobs", jobs);
  showSuccessOverlay();
  setTimeout(() => go("detail", { id: job.id }), 500);
}

function render(animate = false) {
  const user = currentUser();
  const langSelect = `<select class="lang-select" onchange="setLang(this.value)">
    <option value="ar" ${lang === "ar" ? "selected" : ""}>العربية</option>
    <option value="fr" ${lang === "fr" ? "selected" : ""}>Français</option>
    <option value="en" ${lang === "en" ? "selected" : ""}>English</option>
  </select>`;
  document.getElementById("nav").innerHTML = (user
    ? `<a class="link" onclick="go('jobs')">${t("navJobs")}</a>
       <a class="link" onclick="go('post')">${t("navPost")}</a>
       <a class="link" onclick="go('dashboard')">${t("navApps")}</a>
       <button class="btn btn-outline" onclick="logout()">${t("navLogout")}</button>`
    : `<a class="link" onclick="go('jobs')">${t("navJobs")}</a>
       <button class="btn btn-outline" onclick="go('login')">${t("navLogin")}</button>
       <button class="btn btn-primary" onclick="go('register')">${t("navRegister")}</button>`) + langSelect;
  document.querySelector(".demo-banner").textContent = t("demoBanner");
  document.getElementById("footer").textContent = t("footer");
  const app = document.getElementById("app");
  app.classList.remove("page-enter");
  app.innerHTML = views[state.view]();
  if (animate) {
    void app.offsetWidth;
    app.classList.add("page-enter");
  }
}

document.documentElement.lang = lang;
document.documentElement.dir = I18N[lang].dir;
render(true);
