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
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  button.textContent = theme === "dark" ? "light_mode" : "dark_mode";
}

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("anai-theme", next);
  syncThemeIcon();
});

syncThemeIcon();

// --- Mermaid diagrams (lazy-loaded only when a tutorial page has one) ---
const mermaidBlocks = Array.from(document.querySelectorAll("pre.mermaid"));
if (mermaidBlocks.length) {
  mermaidBlocks.forEach((block) => {
    block.dataset.mermaidSource = block.textContent;
  });
  import("https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs").then(({ default: mermaid }) => {
    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
    const darkVars = {
      fontFamily: "JetBrains Mono, monospace",
      background: "#0e141d",
      primaryColor: "#121a24",
      primaryBorderColor: "#3a4b5c",
      primaryTextColor: "#eef2ee",
      lineColor: "#f2b134",
      secondaryColor: "#1a2430",
      secondaryBorderColor: "#3a4b5c",
      secondaryTextColor: "#eef2ee",
      tertiaryColor: "#1a2430",
      tertiaryBorderColor: "#3a4b5c",
      tertiaryTextColor: "#eef2ee",
      edgeLabelBackground: "#0e141d",
      clusterBkg: "#0e141d",
      clusterBorder: "#253141",
      textColor: "#eef2ee",
      nodeTextColor: "#eef2ee",
    };
    const lightVars = {
      fontFamily: "JetBrains Mono, monospace",
      background: "#eef1e8",
      primaryColor: "#ffffff",
      primaryBorderColor: "#aab5a2",
      primaryTextColor: "#14181a",
      lineColor: "#9a6c00",
      secondaryColor: "#e2e8da",
      secondaryBorderColor: "#aab5a2",
      secondaryTextColor: "#14181a",
      tertiaryColor: "#e2e8da",
      tertiaryBorderColor: "#aab5a2",
      tertiaryTextColor: "#14181a",
      edgeLabelBackground: "#eef1e8",
      clusterBkg: "#eef1e8",
      clusterBorder: "#d7ddce",
      textColor: "#14181a",
      nodeTextColor: "#14181a",
    };
    function renderMermaid() {
      mermaidBlocks.forEach((block) => {
        block.removeAttribute("data-processed");
        block.innerHTML = block.dataset.mermaidSource;
      });
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: isLight() ? lightVars : darkVars,
      });
      mermaid.run({ nodes: mermaidBlocks });
    }
    renderMermaid();
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", renderMermaid);
  });
}

// Shared loader for CDN libraries that only ship a classic UMD build (no ESM
// build to `import()` the way Mermaid does above) — appends a <script> tag
// and resolves once it has attached its global (window.Chart, window.L).
// Named distinctly from the Square-SDK `loadScript()` further down this file
// — this file loads as `type="module"`, where two top-level functions with
// the same name is a SyntaxError that silently kills the entire script.
function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

// --- Research charts (lazy-loaded only when a research page has one) ---
const chartBlocks = Array.from(document.querySelectorAll(".research-chart[data-chart]"));
if (chartBlocks.length) {
  const chartSpecs = chartBlocks.map((block) => {
    try {
      return JSON.parse(block.dataset.chart);
    } catch {
      return null;
    }
  });
  loadExternalScript("https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js").then(() => {
    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
    const palette = ["#f2b134", "#5aa9e6", "#7fbf7f", "#e07a5f", "#9a6cff"];
    let charts = [];
    function renderCharts() {
      charts.forEach((chart) => chart.destroy());
      charts = [];
      const gridColor = isLight() ? "rgba(20,24,26,0.12)" : "rgba(238,242,238,0.14)";
      const textColor = isLight() ? "#14181a" : "#eef2ee";
      chartBlocks.forEach((block, index) => {
        const spec = chartSpecs[index];
        const canvas = block.querySelector("canvas");
        if (!spec || !canvas) return;
        charts.push(
          new window.Chart(canvas, {
            type: spec.type || "bar",
            data: {
              labels: spec.labels || [],
              datasets: (spec.series || []).map((series, seriesIndex) => ({
                label: series.name || "",
                data: series.data || [],
                backgroundColor: series.color || palette[seriesIndex % palette.length],
                borderColor: series.color || palette[seriesIndex % palette.length],
                borderWidth: (spec.type || "bar") === "line" ? 2 : 0,
                tension: 0.25,
              })),
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: spec.title ? { display: true, text: spec.title, color: textColor, font: { family: "JetBrains Mono, monospace", size: 13 } } : { display: false },
                legend: { display: (spec.series || []).length > 1, labels: { color: textColor, font: { family: "JetBrains Mono, monospace" } } },
              },
              scales: {
                x: { ticks: { color: textColor }, grid: { color: gridColor } },
                y: { ticks: { color: textColor }, grid: { color: gridColor }, beginAtZero: true },
              },
            },
          }),
        );
      });
    }
    renderCharts();
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", renderCharts);
  });
}

// --- Research maps (lazy-loaded only when a research page has one) ---
const mapBlocks = Array.from(document.querySelectorAll(".research-map[data-map]"));
if (mapBlocks.length) {
  const mapSpecs = mapBlocks.map((block) => {
    try {
      return JSON.parse(block.dataset.map);
    } catch {
      return null;
    }
  });
  const leafletCss = document.createElement("link");
  leafletCss.rel = "stylesheet";
  leafletCss.href = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(leafletCss);
  loadExternalScript("https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js").then(() => {
    const L = window.L;
    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
    const tileUrl = () =>
      isLight() ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    let maps = [];
    function renderMaps() {
      maps.forEach((map) => map.remove());
      maps = [];
      mapBlocks.forEach((block, index) => {
        const spec = mapSpecs[index];
        const container = block.querySelector(".map-canvas");
        if (!spec || !container) return;
        container.innerHTML = "";
        const markers = spec.markers || [];
        const center = spec.center || (markers[0] ? [markers[0].lat, markers[0].lng] : [37.5, -92]);
        const map = L.map(container, { scrollWheelZoom: false }).setView(center, spec.zoom || 7);
        L.tileLayer(tileUrl(), { attribution: "&copy; OpenStreetMap &copy; CARTO", maxZoom: 18 }).addTo(map);
        markers.forEach((marker) => {
          if (typeof marker.lat === "number" && typeof marker.lng === "number") {
            L.marker([marker.lat, marker.lng]).addTo(map).bindPopup(marker.label || "");
          }
        });
        if (markers.length > 1) {
          map.fitBounds(markers.map((marker) => [marker.lat, marker.lng]), { padding: [24, 24] });
        }
        maps.push(map);
      });
    }
    renderMaps();
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", renderMaps);
  });
}

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
  return `${offering?.capacity || program?.offerings?.[0]?.capacity || 25}-seat cohort`;
}

const catalog = readCatalog();
const selection = catalog ? findSelection(catalog) : {};
const marketplaceApiBase = "https://autonateai-learning-hub.web.app/api/marketplace";
const squareApiBase = `${marketplaceApiBase}/square`;
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
  container.innerHTML = "";
  container.classList.remove("unavailable");
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
  // Whichever pay button this page has — single-seat checkout or the
  // multi-seat sponsorship form — becomes clickable once the card field
  // actually attaches.
  document.querySelectorAll("[data-checkout-complete], [data-sponsorship-submit]").forEach((button) => {
    button.classList.remove("disabled");
    button.removeAttribute("aria-disabled");
  });
}

async function fetchSquareConfig() {
  const response = await fetch(`${squareApiBase}/config`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Square config returned ${response.status}`);
  return response.json();
}

function markSquareUnavailable(message) {
  const container = document.querySelector("[data-square-card]");
  if (container) {
    container.classList.add("unavailable");
    container.innerHTML = `<span>${message}</span>`;
  }
}

// Square's routine "payment setup pending / ready" status banner is gone from
// the customer-facing checkout UI — this element (present but hidden by
// default on both /checkout and /for-organizations) only surfaces if
// something actually goes wrong, so a real failure is never silent.
const squareStatusEl = document.querySelector("[data-square-status]");
if (squareStatusEl) {
  fetchSquareConfig()
    .then(async (config) => {
      squareConfig = config;
      if (config.enabled) {
        try {
          await setupSquareCard(config);
        } catch (error) {
          squareConfig = null;
          squareStatusEl.hidden = false;
          squareStatusEl.innerHTML = `<strong>Card fields could not load</strong><span>${error.message || "Square could not mount the secure card field. Refresh the page, or contact us to complete this by invoice."}</span>`;
          markSquareUnavailable("Card fields could not load. Refresh the page or contact us to complete this by invoice.");
        }
      } else {
        squareStatusEl.hidden = false;
        squareStatusEl.innerHTML = `<strong>Card payment is temporarily unavailable</strong><span>Contact us at autonate.ai@gmail.com and we'll get this sorted out.</span>`;
        markSquareUnavailable("Card payment is temporarily unavailable — contact us to complete this by invoice.");
      }
    })
    .catch((error) => {
      squareStatusEl.hidden = false;
      squareStatusEl.innerHTML = `<strong>Square status unavailable</strong><span>${error.message || "Payment configuration could not be checked. Refresh the page, or contact us to complete this by invoice."}</span>`;
      markSquareUnavailable("Card fields are unavailable until Square status loads.");
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
  event.preventDefault();
  if (!squareCard || !squareConfig?.enabled || !selection.program || !selection.offering) {
    if (squareStatusEl) {
      squareStatusEl.hidden = false;
      squareStatusEl.innerHTML = `<strong>Card fields still loading</strong><span>Square has to finish loading before payment can be processed. Refresh the page if the card field does not appear.</span>`;
    }
    return;
  }
  const checkoutFields = Object.fromEntries(
    Array.from(document.querySelectorAll("[data-checkout-field]")).map((field) => [
      field.dataset.checkoutField,
      field.value.trim(),
    ]),
  );
  const purchaserEmail = checkoutFields.buyerEmail || "";
  if (!checkoutFields.cardholderName || !purchaserEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(purchaserEmail)) {
    if (squareStatusEl) {
      squareStatusEl.hidden = false;
      squareStatusEl.innerHTML = `<strong>Missing checkout details</strong><span>Add the name on card and a valid purchaser email before payment.</span>`;
    }
    return;
  }
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
        buyer: checkoutFields,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || payload.errors?.[0]?.detail || "Square payment failed.");
    }
    const paymentId = payload.payment?.id || "";
    localStorage.setItem(
      "anai-latest-payment",
      JSON.stringify({
        paymentId,
        buyerEmail: checkoutFields.buyerEmail,
        cardholderName: checkoutFields.cardholderName,
        programHandle: selection.program.handle,
        offeringId: selection.offering.id,
        paidAt: new Date().toISOString(),
      }),
    );
    const paymentParam = paymentId ? `&payment=${encodeURIComponent(paymentId)}` : "";
    window.location.href = `/success?program=${selection.program.handle}&offering=${selection.offering.id}${paymentParam}`;
  } catch (error) {
    if (squareStatusEl) {
      squareStatusEl.hidden = false;
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

const studentInfoForm = document.querySelector("[data-student-info-form]");
studentInfoForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const studentFields = Object.fromEntries(
    Array.from(studentInfoForm.querySelectorAll("[data-student-field]")).map((field) => [
      field.dataset.studentField,
      field.value.trim(),
    ]),
  );
  const statusEl = document.querySelector("[data-student-info-status]");
  if (!studentFields.studentName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentFields.studentEmail || "")) {
    if (statusEl) statusEl.textContent = "Add the student's name and a valid student email.";
    return;
  }
  const params = new URLSearchParams(window.location.search);
  let latestPayment = {};
  try {
    latestPayment = JSON.parse(localStorage.getItem("anai-latest-payment") || "{}");
  } catch {
    latestPayment = {};
  }
  const submitButton = studentInfoForm.querySelector("button");
  submitButton?.setAttribute("disabled", "true");
  if (statusEl) statusEl.textContent = "Saving student details...";
  localStorage.setItem(
    "anai-latest-student-info",
    JSON.stringify({ ...studentFields, savedAt: new Date().toISOString() }),
  );
  try {
    const response = await fetch(`${marketplaceApiBase}/enrollments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...studentFields,
        buyerEmail: latestPayment.buyerEmail || "",
        paymentId: params.get("payment") || latestPayment.paymentId || "",
        programHandle: params.get("program") || latestPayment.programHandle || "",
        offeringId: params.get("offering") || latestPayment.offeringId || "",
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Student details could not be saved.");
    if (statusEl) statusEl.textContent = "Student details saved for onboarding.";
  } catch (error) {
    submitButton?.removeAttribute("disabled");
    if (statusEl) statusEl.textContent = `${error.message} Your browser kept a local backup.`;
  }
});

// --- Work With Us: opens the visitor's email client with a pre-filled
// message instead of posting anywhere — no backend needed for this form.
const workWithUsForm = document.querySelector("[data-workwithus-form]");
workWithUsForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = Object.fromEntries(
    Array.from(workWithUsForm.querySelectorAll("[data-workwithus-field]")).map((field) => [
      field.dataset.workwithusField,
      field.value.trim(),
    ]),
  );
  const statusEl = workWithUsForm.querySelector("[data-workwithus-status]");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email || "");
  if (!fields.name || !emailValid || !fields.details) {
    if (statusEl) statusEl.textContent = "Add your name, a valid email, and a bit about what you need before continuing.";
    return;
  }
  const subject = `Work With AutoNateAI — ${fields.orgType || "Inquiry"} from ${fields.name}`;
  const bodyLines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.organization ? `Organization: ${fields.organization}` : null,
    fields.orgType ? `Type: ${fields.orgType}` : null,
    fields.need ? `What they need: ${fields.need}` : null,
    "",
    "Details:",
    fields.details,
  ].filter((line) => line !== null);
  window.location.href = `mailto:autonate.ai@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
});

// --- Consulting booking form ---
const bookingForm = document.querySelector("[data-booking-form]");
const bookingDurations = {
  Discovery: ["15", "30"],
  "Follow-up": ["30", "45", "60", "90", "120"],
};

function refreshBookingDurations() {
  const callTypeField = bookingForm?.querySelector("[data-booking-call-type]");
  const durationField = bookingForm?.querySelector("[data-booking-duration]");
  if (!callTypeField || !durationField) return;
  const options = bookingDurations[callTypeField.value] || [];
  durationField.innerHTML = options.length
    ? options.map((minutes) => `<option value="${minutes}">${minutes} min</option>`).join("")
    : `<option value="">Pick a call type first</option>`;
  durationField.disabled = options.length === 0;
}

bookingForm?.querySelector("[data-booking-call-type]")?.addEventListener("change", refreshBookingDurations);

const BOOKING_WINDOW_START_MINUTES = 8 * 60;
const BOOKING_WINDOW_END_MINUTES = 18 * 60;

function bookingTimeOfDayMinutes(datetimeLocalValue) {
  const match = /T(\d{2}):(\d{2})/.exec(datetimeLocalValue || "");
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function bookingFitsBusinessHours(datetimeLocalValue, durationMinutes) {
  const start = bookingTimeOfDayMinutes(datetimeLocalValue);
  if (start === null) return true;
  return start >= BOOKING_WINDOW_START_MINUTES && start + durationMinutes <= BOOKING_WINDOW_END_MINUTES;
}

bookingForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const statusEl = bookingForm.querySelector("[data-booking-status]");
  const submitButton = bookingForm.querySelector("button[type=submit]");
  const fields = Object.fromEntries(
    Array.from(bookingForm.querySelectorAll("[data-booking-field]")).map((field) => [
      field.dataset.bookingField,
      field.value.trim(),
    ]),
  );

  if (!fields.name || !fields.email || !fields.callType || !fields.duration || !fields.preferredDateTime) {
    if (statusEl) statusEl.textContent = "Fill in your name, email, call type, duration, and a preferred time.";
    return;
  }

  const durationMinutes = Number(fields.duration) || 0;
  if (!bookingFitsBusinessHours(fields.preferredDateTime, durationMinutes)) {
    if (statusEl) statusEl.textContent = "Preferred time must start and end between 8:00 AM and 6:00 PM Central.";
    return;
  }
  if (fields.alternateDateTime && !bookingFitsBusinessHours(fields.alternateDateTime, durationMinutes)) {
    if (statusEl) statusEl.textContent = "Alternate time must start and end between 8:00 AM and 6:00 PM Central.";
    return;
  }

  submitButton?.setAttribute("disabled", "true");
  if (statusEl) statusEl.textContent = "Sending your request...";

  try {
    const response = await fetch(`${marketplaceApiBase}/consulting/booking`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(fields),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Booking could not be submitted.");
    bookingForm.reset();
    refreshBookingDurations();
    if (statusEl) {
      statusEl.textContent = "Request sent. We'll confirm your time by email shortly.";
    }
  } catch (error) {
    if (statusEl) statusEl.textContent = error.message;
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});

// --- Article search / category filters / pagination ---
const articleSearch = document.querySelector("[data-article-search]");
const articleGrid = document.querySelector("[data-article-grid]");
const articlePagination = document.querySelector("[data-article-pagination]");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const ARTICLES_PER_PAGE = 9;
let activeArticleFilter = "All";
let articlePage = 1;

function renderArticlePagination(totalPages) {
  if (!articlePagination) return;
  if (totalPages <= 1) {
    articlePagination.innerHTML = "";
    return;
  }
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  articlePagination.innerHTML = `
    <button type="button" data-article-page="prev" ${articlePage <= 1 ? "disabled" : ""} aria-label="Previous page"><span class="material-symbols-outlined">chevron_left</span></button>
    ${pages
      .map((p) => (p === articlePage ? `<span class="pagination-current">${p}</span>` : `<button type="button" data-article-page="${p}">${p}</button>`))
      .join("")}
    <button type="button" data-article-page="next" ${articlePage >= totalPages ? "disabled" : ""} aria-label="Next page"><span class="material-symbols-outlined">chevron_right</span></button>
  `;
  articlePagination.querySelectorAll("[data-article-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.articlePage === "prev" ? articlePage - 1 : button.dataset.articlePage === "next" ? articlePage + 1 : Number(button.dataset.articlePage);
      if (!target || target < 1 || target > totalPages || target === articlePage) return;
      articlePage = target;
      filterArticles();
      articleGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function filterArticles() {
  if (!articleGrid) return;
  const query = (articleSearch?.value || "").trim().toLowerCase();
  const cards = Array.from(articleGrid.querySelectorAll("[data-category]"));
  const matches = cards.filter((card) => {
    const categoryMatch = activeArticleFilter === "All" || card.dataset.category === activeArticleFilter;
    const textMatch = !query || (card.dataset.search || "").includes(query);
    return categoryMatch && textMatch;
  });

  const totalPages = Math.max(1, Math.ceil(matches.length / ARTICLES_PER_PAGE));
  articlePage = Math.min(Math.max(1, articlePage), totalPages);
  const start = (articlePage - 1) * ARTICLES_PER_PAGE;
  const visible = new Set(matches.slice(start, start + ARTICLES_PER_PAGE));

  cards.forEach((card) => {
    card.hidden = !visible.has(card);
  });

  articleGrid.classList.toggle("is-empty", matches.length === 0);
  renderArticlePagination(totalPages);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeArticleFilter = button.dataset.filter || "All";
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    articlePage = 1;
    filterArticles();
  });
});

// Allow a link into Research & Case Studies to land pre-filtered, e.g.
// /articles?type=Regions from the homepage's "All Regions" button.
const presetType = new URLSearchParams(window.location.search).get("type");
const presetButton = presetType && filterButtons.find((button) => button.dataset.filter === presetType);
(presetButton || filterButtons[0])?.classList.add("active");
if (presetButton) activeArticleFilter = presetType;
articleSearch?.addEventListener("input", () => {
  articlePage = 1;
  filterArticles();
});
filterArticles();

// --- For Organizations: seat-based sponsorship checkout ---
// Reuses the same Square SDK load/attach flow as the single-seat checkout
// above (both pages declare a [data-square-status]/[data-square-card] pair,
// so `squareCard`/`squareConfig` end up populated the same way here). The
// server is always the source of truth for the charged amount — this
// SPONSORSHIP_UNIT_PRICE is display-only, for the live total shown before
// payment.
const sponsorshipForm = document.querySelector("[data-sponsorship-form]");
if (sponsorshipForm) {
  const SPONSORSHIP_UNIT_PRICE = 499;
  const seatsInput = sponsorshipForm.querySelector("[data-sponsorship-seats]");
  const tierButtons = Array.from(document.querySelectorAll("[data-seat-tier]"));
  const submitButton = document.querySelector("[data-sponsorship-submit]");
  const statusEl = document.querySelector("[data-sponsorship-status]");
  const successEl = document.querySelector("[data-sponsorship-success]");
  const successDetailEl = document.querySelector("[data-sponsorship-success-detail]");

  function currentSeats() {
    const value = Math.round(Number(seatsInput?.value));
    if (!Number.isFinite(value) || value < 1) return 1;
    return Math.min(value, 200);
  }

  function syncTierSelection(seats) {
    tierButtons.forEach((button) => {
      button.classList.toggle("selected", Number(button.dataset.seatTier) === seats);
    });
  }

  function recomputeTotal() {
    const seats = currentSeats();
    const total = seats * SPONSORSHIP_UNIT_PRICE;
    document.querySelectorAll("[data-sponsorship-total], [data-sponsorship-total-2]").forEach((el) => {
      el.textContent = money(total);
    });
    const label = document.querySelector("[data-sponsorship-seats-label]");
    if (label) label.textContent = `${seats} seat${seats === 1 ? "" : "s"} · ${money(SPONSORSHIP_UNIT_PRICE)} per seat`;
    syncTierSelection(seats);
  }

  tierButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (seatsInput) seatsInput.value = String(button.dataset.seatTier);
      recomputeTotal();
      document.querySelector("#pay")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  seatsInput?.addEventListener("input", recomputeTotal);
  recomputeTotal();

  submitButton?.addEventListener("click", async () => {
    if (!squareCard || !squareConfig?.enabled) {
      if (statusEl) statusEl.textContent = "Card fields still loading. Refresh the page if this does not clear in a few seconds.";
      return;
    }

    const fields = Object.fromEntries(
      Array.from(sponsorshipForm.querySelectorAll("[data-sponsorship-field]")).map((field) => [
        field.dataset.sponsorshipField,
        field.value.trim(),
      ]),
    );
    const seats = currentSeats();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email || "");
    if (!fields.organization || !fields.name || !emailValid || !fields.cardholderName) {
      if (statusEl) statusEl.textContent = "Add your organization, contact name, contact email, and the name on the card before paying.";
      return;
    }

    submitButton.setAttribute("aria-busy", "true");
    submitButton.classList.add("disabled");
    submitButton.setAttribute("aria-disabled", "true");
    const originalLabel = submitButton.innerHTML;
    submitButton.innerHTML = "Processing...";

    try {
      const tokenResult = await squareCard.tokenize();
      if (tokenResult.status !== "OK") {
        throw new Error(tokenResult.errors?.[0]?.message || "Square could not tokenize the card.");
      }
      const response = await fetch(`${squareApiBase}/sponsorship-payment`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          seats,
          buyer: fields,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || payload.errors?.[0]?.detail || "Square payment failed.");
      }

      // Best-effort log for follow-up; payment already succeeded above regardless of this call.
      fetch(`${marketplaceApiBase}/sponsorships`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          seats,
          organization: fields.organization,
          contactName: fields.name,
          contactEmail: fields.email,
          amountPaid: seats * SPONSORSHIP_UNIT_PRICE,
          paymentId: payload.payment?.id || "",
        }),
      }).catch(() => {});

      sponsorshipForm.hidden = true;
      if (successEl) {
        successEl.hidden = false;
        if (successDetailEl) {
          successDetailEl.textContent = `${seats} seat${seats === 1 ? "" : "s"} for ${fields.organization} — ${money(seats * SPONSORSHIP_UNIT_PRICE)} paid. A confirmation has gone to our team.`;
        }
        successEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (error) {
      if (statusEl) statusEl.textContent = error.message;
    } finally {
      submitButton.removeAttribute("aria-busy");
      submitButton.classList.remove("disabled");
      submitButton.removeAttribute("aria-disabled");
      submitButton.innerHTML = originalLabel;
    }
  });
}
