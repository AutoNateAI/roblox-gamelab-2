document.querySelectorAll("button, .primary-button, .secondary-button, .outline-button, .filter-row button").forEach((element) => {
  element.addEventListener("mousedown", () => element.classList.add("pressed"));
  element.addEventListener("mouseup", () => element.classList.remove("pressed"));
  element.addEventListener("mouseleave", () => element.classList.remove("pressed"));
});

window.addEventListener("scroll", () => {
  document.querySelector(".top-shell")?.classList.toggle("scrolled", window.scrollY > 30);
});

// --- Dark mode toggle ---
function syncThemeIcon() {
  const button = document.querySelector("[data-theme-toggle] .material-symbols-outlined");
  if (!button) return;
  const theme = document.documentElement.getAttribute("data-theme") || "dark";
  button.textContent = theme === "dark" ? "light_mode" : "dark_mode";
}

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("anai-theme", next);
  syncThemeIcon();
});

syncThemeIcon();

// --- Mobile navigation ---
const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
mobileMenuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.toggle("open") || false;
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    mobileMenuToggle?.setAttribute("aria-expanded", "false");
  });
});

// --- Lightweight image carousel ---
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const main = carousel.querySelector("[data-carousel-main]");
  const controls = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  if (!main || controls.length < 2) return;

  let activeIndex = Math.max(
    0,
    controls.findIndex((control) => control.classList.contains("active")),
  );

  function showSlide(index) {
    activeIndex = (index + controls.length) % controls.length;
    const control = controls[activeIndex];
    main.src = control.dataset.carouselSlide;
    controls.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === activeIndex));
  }

  controls.forEach((control, index) => {
    control.addEventListener("click", () => showSlide(index));
  });

  setInterval(() => showSlide(activeIndex + 1), 3000);
});

// --- Mock checkout / success: read ?program=&offering= against the embedded catalog ---
function money(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(`${value}T00:00:00`),
  );
}

function readCatalog() {
  const script = document.getElementById("programs-data");
  if (!script) return null;
  try {
    return JSON.parse(script.textContent);
  } catch {
    return null;
  }
}

function findSelection(catalog) {
  const params = new URLSearchParams(window.location.search);
  const programHandle = params.get("program");
  const offeringId = params.get("offering");
  const program = catalog.programs.find((p) => p.handle === programHandle) || catalog.programs[0];
  const offering = program?.offerings.find((o) => o.id === offeringId) || program?.offerings[0];
  return { program, offering };
}

function cohortCapacity(program, offering) {
  return `${offering?.capacity || program?.offerings?.[0]?.capacity || 25} student max`;
}

const catalog = readCatalog();
const selection = catalog ? findSelection(catalog) : {};
const squareApiBase = "https://autonateai-learning-hub.web.app/api/marketplace/square";
let squareCard = null;
let squareConfig = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      if (window.Square) resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function setupSquareCard(config) {
  const container = document.querySelector("[data-square-card]");
  if (!container || !config.enabled) return;
  const scriptUrl =
    config.environment === "production"
      ? "https://web.squarecdn.com/v1/square.js"
      : "https://sandbox.web.squarecdn.com/v1/square.js";
  await loadScript(scriptUrl);
  const payments = window.Square.payments(config.applicationId, config.locationId);
  squareCard = await payments.card();
  await squareCard.attach("[data-square-card]");
  container.classList.add("ready");
  document.body.classList.add("square-enabled");
}

const squareStatusEl = document.querySelector("[data-square-status]");
if (squareStatusEl) {
  fetch(`${squareApiBase}/config`)
    .then((response) => response.json())
    .then(async (config) => {
      squareConfig = config;
      squareStatusEl.classList.toggle("ready", Boolean(config.enabled));
      squareStatusEl.innerHTML = config.enabled
        ? `<strong>Square payments ready</strong><span>${config.environment} environment connected. Enter card details below to complete enrollment.</span>`
        : `<strong>Square payment setup pending</strong><span>Add the ${config.environment} Square application ID, access token, and location ID to enable card payments. Use /api/square/locations after adding the access token to find the location ID.</span>`;
      if (config.enabled) await setupSquareCard(config);
    })
    .catch(() => {
      squareStatusEl.innerHTML = `<strong>Square status unavailable</strong><span>Checkout preview is still available, but payment configuration could not be checked.</span>`;
    });
}

const summaryEl = document.querySelector("[data-order-summary]");
if (catalog && summaryEl) {
  const { program, offering } = selection;
  if (program && offering) {
    summaryEl.innerHTML = `
      <div class="summary-item">
        <img src="${program.thumbnail}" alt="${program.name}" />
        <div><strong>${program.name}</strong><span>${offering.deliveryType} &middot; ${offering.meetingFrequency || ""}</span><em>Next cohort opens ${formatDate(program.startDate)} &middot; ${cohortCapacity(program, offering)} &middot; Dedicated Discord cohort channel</em></div>
        <b>${money(offering.price)}</b>
      </div>
    `;
    document.querySelectorAll("[data-order-subtotal]").forEach((el) => (el.textContent = money(offering.price)));
    document.querySelectorAll("[data-order-total]").forEach((el) => (el.textContent = money(offering.price)));

    const completeButton = document.querySelector("[data-checkout-complete]");
    if (completeButton) {
      completeButton.href = `/success?program=${program.handle}&offering=${offering.id}`;
    }
  }
}

const completeButton = document.querySelector("[data-checkout-complete]");
completeButton?.addEventListener("click", async (event) => {
  if (!squareCard || !squareConfig?.enabled || !selection.program || !selection.offering) return;
  event.preventDefault();
  completeButton.setAttribute("aria-busy", "true");
  completeButton.classList.add("disabled");
  completeButton.innerHTML = "Processing...";

  try {
    const tokenResult = await squareCard.tokenize();
    if (tokenResult.status !== "OK") {
      throw new Error(tokenResult.errors?.[0]?.message || "Square could not tokenize the card.");
    }
    const response = await fetch(`${squareApiBase}/payments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sourceId: tokenResult.token,
        programHandle: selection.program.handle,
        offeringId: selection.offering.id,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || payload.errors?.[0]?.detail || "Square payment failed.");
    }
    window.location.href = `/success?program=${selection.program.handle}&offering=${selection.offering.id}`;
  } catch (error) {
    squareStatusEl?.classList.remove("ready");
    if (squareStatusEl) {
      squareStatusEl.innerHTML = `<strong>Payment failed</strong><span>${error.message}</span>`;
    }
    completeButton.removeAttribute("aria-busy");
    completeButton.classList.remove("disabled");
    completeButton.innerHTML = `Complete Purchase <span class="material-symbols-outlined">arrow_forward</span>`;
  }
});

const successProgramEl = document.querySelector("[data-success-program]");
if (catalog && successProgramEl) {
  const { program, offering } = findSelection(catalog);
  if (program && offering) {
    successProgramEl.textContent = program.name;
    const offeringEl = document.querySelector("[data-success-offering]");
    if (offeringEl) offeringEl.textContent = `${program.name} - ${offering.deliveryType}`;
    const totalEl = document.querySelector("[data-success-total]");
    if (totalEl) totalEl.textContent = money(offering.price);
  }
}

// --- Article search / category filters ---
const articleSearch = document.querySelector("[data-article-search]");
const articleGrid = document.querySelector("[data-article-grid]");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
let activeArticleFilter = "All";

function filterArticles() {
  if (!articleGrid) return;
  const query = (articleSearch?.value || "").trim().toLowerCase();
  const cards = Array.from(articleGrid.querySelectorAll("[data-category]"));

  cards.forEach((card) => {
    const categoryMatch = activeArticleFilter === "All" || card.dataset.category === activeArticleFilter;
    const textMatch = !query || (card.dataset.search || "").includes(query);
    card.hidden = !(categoryMatch && textMatch);
  });

  articleGrid.classList.toggle("is-empty", cards.every((card) => card.hidden));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeArticleFilter = button.dataset.filter || "All";
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    filterArticles();
  });
});

filterButtons[0]?.classList.add("active");
articleSearch?.addEventListener("input", filterArticles);
