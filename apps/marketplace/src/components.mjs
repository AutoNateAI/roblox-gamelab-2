import { navItems } from "./data.mjs";

export function money(value) {
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
        <a class="brand" href="/">AutoNateAI</a>
        ${mode === "checkout" ? `<span class="secure-dot"><i></i>Secure Checkout</span>` : `<div class="nav-links">${links}</div>`}
        <div class="nav-actions">
          <button aria-label="Search">${icon("search")}</button>
          <a aria-label="Cart" href="/checkout">${icon("shopping_cart")}</a>
          <button aria-label="Favorite">${icon("favorite")}</button>
        </div>
      </nav>
    </header>
  `;
}

export function footer(active = "home") {
  return `
    <footer class="site-footer">
      <div class="footer-grid">
        <div>
          <strong>AutoNateAI</strong>
          <p>Empowering the next generation of Roblox creators with premium AI-driven assets and marketplace tools.</p>
        </div>
        ${footerColumn("Marketplace", ["Trending Now", "New Releases", "Creator Spotlight", "Enterprise Kits"], active)}
        ${footerColumn("Resources", ["Developer Portal", "Asset Guidelines", "Optimization Guide", "Support Hub"], active)}
        ${footerColumn("Company", ["About Us", "Terms of Service", "Privacy Policy", "Contact"], active)}
      </div>
      <div class="footer-bottom">
        <span>© 2026 AutoNateAI GameLab. All rights reserved. Built for the Roblox Creator Economy.</span>
        <span class="footer-icons">${icon("share")}${icon("language")}</span>
      </div>
    </footer>
  `;
}

function footerColumn(title, items) {
  return `
    <div>
      <h5>${title}</h5>
      <ul>${items.map((item) => `<li><a href="#">${item}</a></li>`).join("")}</ul>
    </div>
  `;
}

export function pageShell({ title, active, body, mode = "full" }) {
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        ${topNav(active, mode)}
        ${body}
        ${mode === "checkout" ? "" : footer(active)}
        <script type="module" src="/app.js"></script>
      </body>
    </html>`;
}

export function productCard(product, options = {}) {
  const variant = product.variants?.[0] || { price_usd: 0 };
  const featured = options.featured || product.badge === "Featured";

  return `
    <article class="market-card ${featured ? "featured-card" : ""}">
      <a class="card-media" href="/store/products/${product.handle}">
        <img src="${product.image}" alt="${escapeHtml(product.title)}" />
        <span class="card-badge">${escapeHtml(product.badge || product.collection_title)}</span>
        <span class="card-price">${money(variant.price_usd)}</span>
        <span class="quick-action">Quick Add</span>
      </a>
      <div class="card-body">
        <div class="card-title-row">
          <h3>${escapeHtml(product.title)}</h3>
          <span class="rating">${icon("star")} ${product.rating || "4.8"}</span>
        </div>
        <p>${escapeHtml(product.subtitle || product.description)}</p>
        <div class="card-meta">
          <span>By ${escapeHtml(product.creator || "AutoNateAI")}</span>
          <b>${escapeHtml(product.category || product.type)}</b>
        </div>
      </div>
    </article>
  `;
}

export function sidebarFilters() {
  return `
    <aside class="side-filters">
      <div>
        <h2>Filters</h2>
        <p>Refine Marketplace</p>
      </div>
      ${filterButton("category", "Categories", true)}
      <div class="filter-checks">
        <label><input type="checkbox" /> 3D Assets</label>
        <label><input type="checkbox" checked /> Scripts & AI</label>
        <label><input type="checkbox" /> UI Kits</label>
      </div>
      ${filterButton("label", "Tags")}
      ${filterButton("payments", "Price Range")}
      <input class="range" type="range" />
      <div class="range-labels"><span>$0</span><span>$7,500+</span></div>
      ${filterButton("speed", "Difficulty")}
      ${filterButton("inventory_2", "Asset Type")}
      ${filterButton("toggle_on", "Status")}
      <button class="filter-apply">Apply Filters</button>
    </aside>
  `;
}

function filterButton(symbol, label, active = false) {
  return `<button class="filter-button ${active ? "active" : ""}">${icon(symbol)}${label}</button>`;
}
