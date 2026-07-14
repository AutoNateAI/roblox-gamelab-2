import { navItems, screepsScreenshots } from "./data.mjs";

function cardShot(program) {
  return screepsScreenshots[(program.sequence || 0) % screepsScreenshots.length];
}

export function money(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function icon(name) {
  return `<span class="material-symbols-outlined">${name}</span>`;
}

export function statusLabel(status) {
  return status === "Active" ? "Enrolling Now" : "Coming Soon";
}

export function topNav(active = "home", mode = "full") {
  const links = navItems
    .map((item) => {
      const isActive = item.keys.includes(active);
      return `<a class="${isActive ? "active" : ""}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `
    <header class="top-shell ${mode === "checkout" ? "checkout-shell" : ""}">
      <nav class="top-nav">
        <a class="brand" href="/">AutoNateAI<span class="brand-dot">_</span></a>
        ${
          mode === "checkout"
            ? `<span class="secure-dot"><i></i>Secure Checkout</span>`
            : `<div class="nav-links" data-mobile-menu>${links}</div>`
        }
        <div class="nav-actions">
          ${mode === "checkout" ? "" : `<button class="mobile-menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-mobile-menu-toggle>${icon("menu")}</button>`}
          <button class="theme-toggle" aria-label="Toggle dark mode" data-theme-toggle>${icon("dark_mode")}</button>
          ${mode === "checkout" ? "" : `<a class="nav-cta" href="/programs">Reserve Seats</a>`}
        </div>
      </nav>
    </header>
  `;
}

export function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-grid">
        <div>
          <strong>AutoNateAI<span class="brand-dot">_</span></strong>
          <p>A focused youth programming cohort that turns coding foundations, Git, APIs, automation, and Codex into systems students can operate, explain, and improve.</p>
        </div>
        ${footerColumn("Program", [["AI Systems Programming Lab", "/programs/ai-software-architect"], ["Cohort Details", "/programs"], ["Articles", "/articles"]])}
        ${footerColumn("Company", [["About AutoNateAI", "/about"], ["Terms of Service", "#"], ["Privacy Policy", "#"], ["Contact", "#"]])}
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 AutoNateAI. Youth programming cohorts for systems thinking, Git, APIs, automation, and AI-assisted development.</span>
      </div>
    </footer>
  `;
}

function footerColumn(title, items) {
  return `
    <div>
      <h5>${title}</h5>
      <ul>${items.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
    </div>
  `;
}

const SITE_NAME = "AutoNateAI";
const DEFAULT_OG_IMAGE = "/assets/og/default.jpg";
const DEFAULT_DESCRIPTION =
  "AutoNateAI teaches youth programming, critical thinking, Git, APIs, automation, AI-assisted coding, and software architecture through a live six-week cohort.";

export function pageShell({
  title,
  active,
  body,
  mode = "full",
  ogImage = DEFAULT_OG_IMAGE,
  description = DEFAULT_DESCRIPTION,
}) {
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <meta name="description" content="${escapeHtml(description)}" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="${escapeHtml(title)}" />
        <meta property="og:description" content="${escapeHtml(description)}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:site_name" content="${SITE_NAME}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${escapeHtml(title)}" />
        <meta name="twitter:description" content="${escapeHtml(description)}" />
        <script>
          (function () {
            var stored = localStorage.getItem("anai-theme");
            var theme = stored || "dark";
            document.documentElement.setAttribute("data-theme", theme);
          })();
        </script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        ${topNav(active, mode)}
        ${body}
        ${mode === "checkout" ? "" : footer()}
        <script type="module" src="/app.js"></script>
      </body>
    </html>`;
}

export function programCard(program) {
  const cheapest = program.offerings?.[0];
  const available = program.status === "Active";

  return `
    <article class="market-card ${available ? "" : "coming-soon"}">
      <a class="card-media" href="/programs/${program.handle}">
        <img src="${cardShot(program)}" alt="${escapeHtml(program.name)}" />
        <span class="card-badge">${escapeHtml(program.badge)}</span>
        <span class="card-price">${cheapest ? money(cheapest.price) : "TBD"}</span>
      </a>
      <div class="card-body">
        <div class="card-title-row">
          <span class="program-sequence">Cohort Program</span>
          <span class="status-pill ${available ? "live" : ""}">${statusLabel(program.status)}</span>
        </div>
        <h3>${escapeHtml(program.name)}</h3>
        <p>${escapeHtml(program.description)}</p>
        <div class="card-meta">
          <span>${icon("calendar_month")} ${program.durationWeeks || 6} weeks</span>
          <b>${escapeHtml(program.badge)}</b>
        </div>
      </div>
    </article>
  `;
}

export function offeringCard(offering, program) {
  return `
    <article class="offering-card">
      <span class="kicker">${escapeHtml(offering.deliveryType)}</span>
      <h3>${money(offering.price)}<small>${escapeHtml(offering.priceUnit || "")}</small></h3>
      <p>${escapeHtml(offering.meetingFrequency || "")}</p>
      ${offering.capacity ? `<p class="offering-capacity">${icon("group")} Capped at ${offering.capacity} students</p>` : ""}
      <a class="primary-button full" href="/checkout?program=${program.handle}&offering=${offering.id}">Reserve Seat &mdash; ${escapeHtml(offering.deliveryType)}</a>
    </article>
  `;
}
