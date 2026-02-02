const translations = {
  en: {
    nav: {
      home: "Home",
      news: "News",
      about: "About us",
      aboutHistory: "History",
      aboutMission: "Mission",
      aboutVision: "Vision",
      aboutStructure: "Structure",
      aboutCareer: "Career growth plan",
      aboutMessage: "Director's message",
      team: "Team",
      teamPr: "PR & Event",
      teamAparati: "Administration",
      teamParlament: "Student parliament",
      teamGov: "Student government",
      contact: "Contact",
    },
    topbar: {
      phone: "📞 +995 591 037 047",
      email: "✉️ info@spg.ge",
      address: "📍 35-37 Zhiuli Shartava St, Tbilisi",
    },
    header: {
      signin: "🔐 Sign in",
      contactCta: "Contact us",
      registerCta: "Register",
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
      news: "სიახლეები",
      about: "ჩვენს შესახებ",
      aboutHistory: "ისტორია",
      aboutMission: "მისია",
      aboutVision: "ხედვა",
      aboutStructure: "სტრუქტურა",
      aboutCareer: "კარიერული განვითარების გეგმა",
      aboutMessage: "ხელმძღვანელის მიმართვა",
      team: "გუნდი",
      teamPr: "PR & EVENT",
      teamAparati: "აპარატი",
      teamParlament: "სტუდენტური პარლამენტი",
      teamGov: "სტუდენტური მთავრობა",
      contact: "კონტაქტი",
    },
    topbar: {
      phone: "📞 +995 591 037 047",
      email: "✉️ info@spg.ge",
      address: "📍 ჟიულ შარტავას 35-37, თბილისი",
    },
    header: {
      signin: "🔐 Sign in",
      contactCta: "მოგვწერე",
      registerCta: "რეგისტრაცია",
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

const languageButtons = document.querySelectorAll("[data-lang]");
const adminList = document.getElementById("adminList");
const postGrid = document.getElementById("postGrid");
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile");
const drops = Array.from(document.querySelectorAll(".drop"));
const header = document.getElementById("siteHeader");

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

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
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

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const next = button.dataset.lang || "en";
    setLanguage(next);
    renderAdmins(next);
    renderPosts(next);
  });
});

burger?.addEventListener("click", () => {
  mobileMenu?.classList.toggle("open");
});

drops.forEach((drop) => {
  const button = drop.querySelector("button");
  button?.addEventListener("click", (event) => {
    event.preventDefault();
    drops.forEach((item) => item !== drop && item.classList.remove("open"));
    drop.classList.toggle("open");
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".drop")) {
    drops.forEach((drop) => drop.classList.remove("open"));
  }
});

window.addEventListener(
  "scroll",
  () => {
    if (!header) {
      return;
    }
    header.classList.toggle("shrink", window.scrollY > 40);
  },
  { passive: true }
);

initialize();
