const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      community: "Community",
      admin: "Admin",
      signin: "Sign In",
      getStarted: "Get Started",
    },
    hero: {
      tag: "New updates",
      title: "Build your service portal in minutes.",
      subtitle:
        "Manage announcements, publish posts, and keep your team aligned with a bilingual experience tailored for your community.",
      cta: "Explore updates",
      cardTitle: "Latest activity",
      cardBody:
        "Admins can add posts and manage leadership updates directly from the admin dashboard.",
      adminsLabel: "Active admins",
    },
    posts: {
      title: "Recent posts",
    },
    footer: {
      description: "A modern hub for your service portal, connecting teams with clear updates.",
      company: "Company",
      about: "About",
      careers: "Careers",
      press: "Press",
      resources: "Resources",
      blog: "Blog",
      guides: "Guides",
      support: "Support",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      security: "Security",
      copy: "© 2024 SPG Portal. All rights reserved.",
      contact: "hello@spg-portal.com",
    },
    adminList: {
      title: "Current admins",
      empty: "No admins yet. Add one in the admin console.",
    },
    postsList: {
      empty: "No posts published yet.",
    },
    meta: {
      addedOn: "Added on",
      postedOn: "Posted on",
    },
  },
  ka: {
    nav: {
      home: "მთავარი",
      services: "სერვისები",
      community: "საზოგადოება",
      admin: "ადმინი",
      signin: "შესვლა",
      getStarted: "დაწყება",
    },
    hero: {
      tag: "ახალი განახლებები",
      title: "შექმენით თქვენი სერვისის პორტალი რამდენიმე წუთში.",
      subtitle:
        "მართეთ განცხადებები, გამოაქვეყნეთ პოსტები და შეინარჩუნეთ გუნდის ერთობა ორენოვანი გამოცდილებით.",
      cta: "განახლებების ნახვა",
      cardTitle: "ბოლო აქტივობა",
      cardBody:
        "ადმინისტრატორები ამატებენ პოსტებს და მართავენ განახლებებს ადმინისტრაციული გვერდიდან.",
      adminsLabel: "აქტიური ადმინები",
    },
    posts: {
      title: "ბოლო პოსტები",
    },
    footer: {
      description: "თანამედროვე ჰაბი, რომელიც აერთიანებს გუნდს მკაფიო განახლებებით.",
      company: "კომპანია",
      about: "ჩვენ შესახებ",
      careers: "კარიერა",
      press: "მედია",
      resources: "რესურსები",
      blog: "ბლოგი",
      guides: "გაიდები",
      support: "მხარდაჭერა",
      legal: "იურიდიული",
      privacy: "კონფიდენციალურობა",
      terms: "პირობები",
      security: "უსაფრთხოება",
      copy: "© 2024 SPG Portal. ყველა უფლება დაცულია.",
      contact: "hello@spg-portal.com",
    },
    adminList: {
      title: "აქტიური ადმინები",
      empty: "ადმინი ჯერ არ დამატებულა. დაამატეთ ადმინ გვერდიდან.",
    },
    postsList: {
      empty: "პოსტები ჯერ არ არის გამოქვეყნებული.",
    },
    meta: {
      addedOn: "დამატებულია",
      postedOn: "გამოქვეყნდა",
    },
  },
};

const STORAGE_KEYS = {
  admins: "spg.admins",
  posts: "spg.posts",
  language: "spg.language",
};

const languageToggle = document.getElementById("languageToggle");
const adminList = document.getElementById("adminList");
const postGrid = document.getElementById("postGrid");

const getStored = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const formatDate = (lang, value) => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const locale = lang === "ka" ? "ka-GE" : "en-US";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(date);
};

const setLanguage = (lang) => {
  const dictionary = translations[lang];
  document.documentElement.lang = lang === "ka" ? "ka" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.dataset.i18n.split(".");
    let value = dictionary;
    keys.forEach((key) => {
      value = value?.[key];
    });
    if (typeof value === "string") {
      el.textContent = value;
    }
  });

  localStorage.setItem(STORAGE_KEYS.language, lang);
};

const renderAdmins = (lang) => {
  const admins = getStored(STORAGE_KEYS.admins, []);
  adminList.innerHTML = "";
  if (!admins.length) {
    const empty = document.createElement("p");
    empty.textContent = translations[lang].adminList.empty;
    adminList.appendChild(empty);
    return;
  }
  admins.forEach((admin) => {
    const item = document.createElement("div");
    item.className = "list-item";
    const formatted = formatDate(lang, admin.createdAt);
    const label = formatted
      ? `${translations[lang].meta.addedOn} ${formatted}`
      : translations[lang].meta.addedOn;
    item.innerHTML = `
      <div class="list-meta">
        ${admin.name}
        <span>${admin.email}</span>
      </div>
      <span class="pill">${label}</span>
    `;
    adminList.appendChild(item);
  });
};

const renderPosts = (lang) => {
  const posts = getStored(STORAGE_KEYS.posts, []);
  postGrid.innerHTML = "";
  if (!posts.length) {
    const empty = document.createElement("p");
    empty.textContent = translations[lang].postsList.empty;
    postGrid.appendChild(empty);
    return;
  }
  posts.forEach((post) => {
    const card = document.createElement("article");
    card.className = "post-card";
    const formatted = formatDate(lang, post.createdAt);
    const label = formatted
      ? `${translations[lang].meta.postedOn} ${formatted}`
      : translations[lang].meta.postedOn;
    card.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <span class="pill">${label}</span>
    `;
    postGrid.appendChild(card);
  });
};

const initialize = () => {
  const initialLang = localStorage.getItem(STORAGE_KEYS.language) || "en";
  setLanguage(initialLang);
  renderAdmins(initialLang);
  renderPosts(initialLang);
};

languageToggle?.addEventListener("click", () => {
  const current = localStorage.getItem(STORAGE_KEYS.language) || "en";
  const next = current === "en" ? "ka" : "en";
  setLanguage(next);
  renderAdmins(next);
  renderPosts(next);
});

initialize();
