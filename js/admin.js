const translations = {
  en: {
    admin: {
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
      title: "Admin Console",
      subtitle: "Manage administrators and publish posts that appear on the portal homepage.",
      manageAdmins: "Manage admins",
      managePosts: "Create posts",
      adminsLabel: "Current admins",
      postsLabel: "Published posts",
      adminName: "Admin name",
      adminEmail: "Admin email",
      addAdmin: "Add admin",
      removeAdmin: "Remove",
      postTitle: "Post title",
      postBody: "Write the post summary...",
      addPost: "Publish post",
      removePost: "Remove",
      emptyAdmins: "No admins yet. Add one below.",
      emptyPosts: "No posts yet. Publish one below.",
      addedOn: "Added on",
      postedOn: "Posted on",
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
  },
  ka: {
    admin: {
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
      title: "ადმინისტრაციული პანელი",
      subtitle: "მართეთ ადმინისტრატორები და გამოაქვეყნეთ პოსტები პორტალზე.",
      manageAdmins: "ადმინების მართვა",
      managePosts: "პოსტების შექმნა",
      adminsLabel: "აქტიური ადმინები",
      postsLabel: "გამოქვეყნებული პოსტები",
      adminName: "ადმინის სახელი",
      adminEmail: "ადმინის ელ.ფოსტა",
      addAdmin: "ადმინის დამატება",
      removeAdmin: "წაშლა",
      postTitle: "პოსტის სათაური",
      postBody: "დაწერეთ პოსტის მოკლე აღწერა...",
      addPost: "პოსტის გამოქვეყნება",
      removePost: "წაშლა",
      emptyAdmins: "ადმინები ჯერ არ არის. დაამატეთ ქვემოთ.",
      emptyPosts: "პოსტები ჯერ არ არის. გამოაქვეყნეთ ქვემოთ.",
      addedOn: "დამატებულია",
      postedOn: "გამოქვეყნდა",
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
  },
};

const STORAGE_KEYS = {
  admins: "spg.admins",
  posts: "spg.posts",
  language: "spg.language",
};

const adminForm = document.getElementById("adminForm");
const postForm = document.getElementById("postForm");
const adminList = document.getElementById("adminList");
const postList = document.getElementById("postList");
const languageButtons = document.querySelectorAll("[data-lang]");
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

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const keys = el.dataset.i18nPlaceholder.split(".");
    let value = dictionary;
    keys.forEach((key) => {
      value = value?.[key];
    });
    if (typeof value === "string") {
      el.placeholder = value;
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
    empty.textContent = translations[lang].admin.emptyAdmins;
    adminList.appendChild(empty);
    return;
  }
  admins.forEach((admin, index) => {
    const item = document.createElement("div");
    item.className = "list-item";
    const formatted = formatDate(lang, admin.createdAt);
    const label = formatted
      ? `${translations[lang].admin.addedOn} ${formatted}`
      : translations[lang].admin.addedOn;
    item.innerHTML = `
      <div class="list-meta">
        ${admin.name}
        <span>${admin.email}</span>
      </div>
      <div>
        <span class="pill">${label}</span>
        <button class="btn small secondary" data-admin-index="${index}" type="button">
          ${translations[lang].admin.removeAdmin}
        </button>
      </div>
    `;
    adminList.appendChild(item);
  });
};

const renderPosts = (lang) => {
  const posts = getStored(STORAGE_KEYS.posts, []);
  postList.innerHTML = "";
  if (!posts.length) {
    const empty = document.createElement("p");
    empty.textContent = translations[lang].admin.emptyPosts;
    postList.appendChild(empty);
    return;
  }
  posts.forEach((post, index) => {
    const item = document.createElement("div");
    item.className = "list-item";
    const formatted = formatDate(lang, post.createdAt);
    const label = formatted
      ? `${translations[lang].admin.postedOn} ${formatted}`
      : translations[lang].admin.postedOn;
    item.innerHTML = `
      <div class="list-meta">
        ${post.title}
        <span>${post.body}</span>
      </div>
      <div>
        <span class="pill">${label}</span>
        <button class="btn small secondary" data-post-index="${index}" type="button">
          ${translations[lang].admin.removePost}
        </button>
      </div>
    `;
    postList.appendChild(item);
  });
};

const initialize = () => {
  const initialLang = localStorage.getItem(STORAGE_KEYS.language) || "en";
  setLanguage(initialLang);
  renderAdmins(initialLang);
  renderPosts(initialLang);
};

adminForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(adminForm);
  const admins = getStored(STORAGE_KEYS.admins, []);
  const name = formData.get("name");
  const email = formData.get("email");
  if (!name || !email) {
    return;
  }
  admins.push({
    name: String(name).trim(),
    email: String(email).trim(),
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEYS.admins, JSON.stringify(admins));
  adminForm.reset();
  const lang = localStorage.getItem(STORAGE_KEYS.language) || "en";
  renderAdmins(lang);
});

postForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(postForm);
  const posts = getStored(STORAGE_KEYS.posts, []);
  const title = formData.get("title");
  const body = formData.get("body");
  if (!title || !body) {
    return;
  }
  posts.unshift({
    title: String(title).trim(),
    body: String(body).trim(),
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts));
  postForm.reset();
  const lang = localStorage.getItem(STORAGE_KEYS.language) || "en";
  renderPosts(lang);
});

adminList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-admin-index]");
  if (!button) {
    return;
  }
  const index = Number(button.dataset.adminIndex);
  const admins = getStored(STORAGE_KEYS.admins, []);
  admins.splice(index, 1);
  localStorage.setItem(STORAGE_KEYS.admins, JSON.stringify(admins));
  const lang = localStorage.getItem(STORAGE_KEYS.language) || "en";
  renderAdmins(lang);
});

postList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-post-index]");
  if (!button) {
    return;
  }
  const index = Number(button.dataset.postIndex);
  const posts = getStored(STORAGE_KEYS.posts, []);
  posts.splice(index, 1);
  localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts));
  const lang = localStorage.getItem(STORAGE_KEYS.language) || "en";
  renderPosts(lang);
});

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
