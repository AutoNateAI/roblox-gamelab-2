import {
  categories,
  events,
  retainers,
  services,
} from "./data.mjs";
import {
  footer,
  icon,
  money,
  pageShell,
  productCard,
  sidebarFilters,
} from "./components.mjs";

export function renderHome(catalog) {
  const products = catalog.products;

  const body = `
    <main>
      <section class="home-hero">
        <div class="hero-bg"><img src="/assets/eastbrook-dusk.jpg" alt="Season 1 Roblox world" /></div>
        <div class="hero-content">
          <span class="kicker">Spring 2026 Launch</span>
          <h1>Neon Vanguard Season</h1>
          <p>Access game kits, quest systems, Roblox publishing services, and organization-ready experiences built for the next generation of Roblox commerce.</p>
          <div class="button-row">
            <a class="primary-button" href="/marketplace">Explore Season Pass</a>
            <a class="secondary-button" href="/marketplace">View Collection</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <h2>Trending Experiences</h2>
            <p>The most useful GameLab offers this week.</p>
          </div>
          <a href="/marketplace">View all ${icon("arrow_forward")}</a>
        </div>
        <div class="trending-grid">${products.slice(0, 3).map((product) => productCard(product)).join("")}</div>
      </section>

      <section class="section">
        <h2>Browse by Category</h2>
        <div class="category-bento">
          ${categories.map(categoryTile).join("")}
        </div>
      </section>

      <section id="creators" class="spotlight-section">
        <div class="spotlight-image"><img src="/assets/vendor-and-bags.jpg" alt="Creator vendor workspace" /></div>
        <div>
          <span class="kicker">Creator Spotlight</span>
          <h2>Vertex Vanguard</h2>
          <p>Specializing in optimized Roblox environments, reusable quest kits, and custom procedural systems. The studio pattern: build, package, list, sell, and learn from demand.</p>
          <div class="stat-grid">
            <div><strong>98%</strong><span>Positive feedback</span></div>
            <div><strong>50k+</strong><span>Total player touches</span></div>
          </div>
          <a class="outline-button" href="/services">View Full Portfolio</a>
        </div>
      </section>

      <section class="newsletter">
        <div>
          <h2>Start Building Your Empire</h2>
          <p>Join the GameLab pipeline for weekly drops, Roblox quest opportunities, and marketplace build notes.</p>
          <form>
            <input placeholder="Enter your professional email" type="email" />
            <button type="button">Subscribe Now</button>
          </form>
          <small>By subscribing, you agree to our Terms of Service and Privacy Policy.</small>
        </div>
      </section>
    </main>
  `;

  return pageShell({ title: "AutoNateAI GameLab | Marketplace", active: "home", body });
}

export function renderMarketplace(catalog) {
  const body = `
    <main class="app-layout">
      ${sidebarFilters()}
      <section class="content-canvas">
        <div class="page-toolbar">
          <div>
            <h1>Marketplace</h1>
            <p>Discover ${catalog.products.length.toLocaleString()} premium products for your next Roblox experience.</p>
          </div>
          <label class="sort-control">Sort by:
            <select><option>Trending</option><option>Newest</option><option>Price: Low to High</option><option>Price: High to Low</option></select>
          </label>
        </div>
        <div class="market-grid">${catalog.products.map((product, index) => productCard(product, { featured: index === 0 })).join("")}</div>
        <div class="pagination">
          <button>${icon("chevron_left")}</button><button class="active">1</button><button>2</button><button>3</button><span>...</span><button>42</button><button>${icon("chevron_right")}</button>
        </div>
      </section>
    </main>
    ${mobileNav("marketplace")}
  `;

  return pageShell({ title: "AutoNateAI GameLab | Browse Marketplace", active: "marketplace", body });
}

export function renderCheckout(catalog) {
  const items = catalog.products.slice(0, 2);
  const subtotal = items.reduce((sum, product) => sum + product.variants[0].price_usd, 0);
  const fee = 125;
  const discount = 300;
  const total = subtotal + fee - discount;

  const body = `
    <main class="checkout-page">
      <div class="stepper">
        <span>01 Cart</span><i></i><b>02 Payment</b><i></i><span>03 Success</span>
      </div>
      <div class="checkout-grid">
        <section class="checkout-form">
          <h1>Payment Method</h1>
          <div class="payment-grid">
            ${paymentMethod("credit_card", "Credit Card", true)}
            ${paymentMethod("account_balance_wallet", "PayPal")}
            ${paymentMethod("currency_bitcoin", "Crypto")}
          </div>
          <div class="form-stack">
            <label>Cardholder Name<input placeholder="ALEX RIVERA" /></label>
            <label>Card Number<input placeholder="0000 0000 0000 0000" /></label>
            <div class="two-col">
              <label>Expiry Date<input placeholder="MM / YY" /></label>
              <label>CVV<input placeholder="***" type="password" /></label>
            </div>
            <label>Promo Code<input placeholder="CREATOR20" /></label>
          </div>
        </section>
        <aside class="order-summary">
          <h2>Order Summary</h2>
          <div class="summary-items">
            ${items.map((product) => `
              <div class="summary-item">
                <img src="${product.image}" alt="${product.title}" />
                <div><strong>${product.title}</strong><span>${product.subtitle}</span></div>
                <b>${money(product.variants[0].price_usd)}</b>
              </div>
            `).join("")}
          </div>
          ${summaryLine("Subtotal", subtotal)}
          ${summaryLine("Transaction Fee", fee)}
          ${summaryLine("Discount (CREATOR20)", -discount, true)}
          <div class="total-line"><span>Total</span><b>${money(total)}</b></div>
          <a class="primary-button full" href="/success">Complete Purchase ${icon("arrow_forward")}</a>
          <p class="fine-print">Digital products are delivered immediately upon confirmation.</p>
        </aside>
      </div>
    </main>
    <footer class="minimal-footer">© 2026 AutoNateAI GameLab. Built for the Roblox Creator Economy.</footer>
  `;

  return pageShell({ title: "Checkout | AutoNateAI GameLab", active: "checkout", body, mode: "checkout" });
}

export function renderProductDetail(catalog, product) {
  const related = catalog.products
    .filter((item) => item.handle !== product.handle)
    .slice(0, 4);
  const variant = product.variants[0];

  const body = `
    <main class="product-detail-page">
      <nav class="breadcrumbs"><a href="/">Marketplace</a><span>/</span><a href="/marketplace">${product.category}</a><span>/</span><b>${product.title}</b></nav>
      <section class="product-detail">
        <div class="product-gallery">
          <img src="${product.image}" alt="${product.title}" />
          <div><img src="${product.image}" alt="${product.title} preview" /><img src="/assets/title-screen.jpg" alt="Roblox preview" /><img src="/assets/vendor-and-bags.jpg" alt="Vendor preview" /></div>
        </div>
        <aside class="buy-panel">
          <span class="kicker">${product.badge}</span>
          <h1>${product.title}</h1>
          <p>${product.description}</p>
          <div class="detail-rating">${icon("star")} ${product.rating} <span>By ${product.creator}</span></div>
          <div class="detail-price">${money(variant.price_usd)}<small>${variant.title}</small></div>
          <div class="button-row">
            <a class="primary-button" href="/checkout">Add to Cart</a>
            <a class="secondary-button" href="/success">Preview Delivery</a>
          </div>
          <dl>
            <dt>SKU</dt><dd>${variant.sku}</dd>
            <dt>Category</dt><dd>${product.category}</dd>
            <dt>Engine</dt><dd>${product.metadata.engine}</dd>
            <dt>Status</dt><dd>${product.status}</dd>
          </dl>
        </aside>
      </section>
      <section class="section compact">
        <div class="section-head"><h2>Related products</h2><a href="/marketplace">Back to marketplace ${icon("arrow_forward")}</a></div>
        <div class="mini-grid">${related.map(miniCard).join("")}</div>
      </section>
    </main>
  `;

  return pageShell({ title: `${product.title} | AutoNateAI GameLab`, active: "marketplace", body });
}

export function renderSuccess(catalog) {
  const product = catalog.products[0];
  const recommendations = catalog.products.slice(1, 5);

  const body = `
    <main class="success-page">
      <section class="success-header">
        <div class="success-mark">${icon("check_circle")}</div>
        <h1>Order Confirmed</h1>
        <p>Your transaction was successful. The product has been added to your GameLab library and is ready for integration.</p>
      </section>
      <section class="success-grid">
        <article class="access-card">
          <img src="${product.image}" alt="${product.title}" />
          <div>
            <span class="kicker">Product Ready</span>
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <a class="primary-button" href="/marketplace">Access Product</a>
          </div>
        </article>
        <aside class="order-details">
          <h3>Order Details</h3>
          <dl><dt>Order ID</dt><dd>#AN-82941-X</dd><dt>Date</dt><dd>Jul 05, 2026</dd><dt>Payment</dt><dd>•••• 4242</dd><dt>Total Paid</dt><dd>${money(product.variants[0].price_usd)}</dd></dl>
          <p>${icon("auto_awesome")} Bonus creator credits added</p>
        </aside>
      </section>
      <section class="section compact">
        <h2>Recommended for your project</h2>
        <div class="mini-grid">${recommendations.map(miniCard).join("")}</div>
      </section>
    </main>
  `;

  return pageShell({ title: "Purchase Confirmed | AutoNateAI GameLab", active: "library", body });
}

export function renderServices() {
  const body = `
    <main class="app-layout">
      ${sidebarFilters()}
      <section class="content-canvas">
        <section class="service-hero">
          <img src="/assets/eastbrook-dusk.jpg" alt="Professional Roblox services" />
          <div><h1>Professional Organization Services</h1><p>Enterprise-grade custom Roblox worlds, training simulations, optimization, and monetization systems.</p></div>
        </section>
        <div class="service-grid">
          ${services.map(serviceCard).join("")}
        </div>
        <section id="retainers" class="retainers">
          <div class="section-head"><h2>Recurring Studio Retainers</h2><a href="#">See all subscription tiers</a></div>
          <div class="retainer-grid">${retainers.map(retainerCard).join("")}</div>
        </section>
      </section>
    </main>
  `;

  return pageShell({ title: "Organization Services | AutoNateAI GameLab", active: "services", body });
}

export function renderEvents() {
  const body = `
    <main class="app-layout">
      ${sidebarFilters()}
      <section class="content-canvas">
        <header class="events-hero">
          <img src="/assets/party-questing.jpg" alt="Live GameLab event" />
          <div><h1>Upcoming Events</h1><p>Master Roblox commerce with live workshops, build-offs, launches, and creator education sessions.</p></div>
        </header>
        <section class="discord-bento">
          <div><span class="kicker">${icon("rocket_launch")} Community Exclusive</span><h2>Join the Discord for Early Access</h2><p>Get priority registration for high-demand events and exclusive creator channels.</p><button>Join Discord</button></div>
          <aside><h3>Host Your Own Event</h3><p>Submit your experience for the official marketplace calendar.</p><a href="#">Become a Partner ${icon("arrow_forward")}</a></aside>
        </section>
        <section>
          <div class="section-head"><h2>Scheduled Events</h2><div>${icon("calendar_today")}${icon("view_list")}</div></div>
          <div class="event-list">${events.map(eventCard).join("")}</div>
        </section>
      </section>
    </main>
    ${mobileNav("events")}
  `;

  return pageShell({ title: "Live Events | AutoNateAI GameLab", active: "events", body });
}

function categoryTile(category) {
  return `
    <a class="category-tile ${category.size || ""}" href="/marketplace">
      <img src="${category.image}" alt="${category.title}" />
      <div><h3>${category.title}</h3><p>${category.stat}</p></div>
    </a>
  `;
}

function paymentMethod(symbol, label, active = false) {
  return `<button class="payment-method ${active ? "active" : ""}">${icon(symbol)}<span>${label}</span></button>`;
}

function summaryLine(label, value, discount = false) {
  return `<div class="summary-line ${discount ? "discount" : ""}"><span>${label}</span><b>${value < 0 ? "-" : ""}${money(Math.abs(value))}</b></div>`;
}

function miniCard(product) {
  return `<article class="mini-card"><img src="${product.image}" alt="${product.title}" /><div><strong>${product.title}</strong><span>${product.category}</span></div><b>${money(product.variants[0].price_usd)}</b></article>`;
}

function serviceCard(service) {
  if (service.image) {
    return `
      <article class="service-card ${service.featured ? "wide" : ""}">
        <img src="${service.image}" alt="${service.title}" />
        <div>
          <h2>${service.title}</h2>
          <p>${service.description}</p>
          <div class="service-meta">${service.meta.map((item) => `<span>${item}</span>`).join("")}</div>
          <b>${service.price}</b>
          <button>Book Consultation ${icon("arrow_forward")}</button>
        </div>
      </article>
    `;
  }
  return `<article class="service-pill">${icon(service.icon)}<div><h3>${service.title}</h3><p>${service.description}</p><a href="#">Request ${icon("open_in_new")}</a></div><b>${service.price}</b></article>`;
}

function retainerCard(plan) {
  return `<article class="retainer-card ${plan.featured ? "featured" : ""}"><span>${plan.name}</span><h3>${plan.price}<small>${plan.cadence}</small></h3><ul>${plan.benefits.map((item) => `<li>${icon("check_circle")} ${item}</li>`).join("")}</ul><button>${plan.featured ? "Select Plan" : "Subscribe"}</button></article>`;
}

function eventCard(event) {
  return `
    <article class="event-card">
      <img src="${event.image}" alt="${event.title}" />
      <div class="event-body">
        <span class="event-type">${event.type}</span>
        <h3>${event.title}</h3>
        <div class="event-meta"><span>${icon("calendar_month")} ${event.date}</span><span>${icon("schedule")} ${event.time}</span><span>${icon("person")} ${event.host}</span></div>
        <p>${event.description}</p>
      </div>
      <aside><span>Seats Remaining</span><b class="${event.disabled ? "full" : ""}">${event.seats}</b><button ${event.disabled ? "disabled" : ""}>${event.action}</button></aside>
    </article>
  `;
}

function mobileNav(active) {
  const items = [
    ["home", "Home", "/", "home"],
    ["marketplace", "Market", "/marketplace", "marketplace"],
    ["design_services", "Services", "/services", "services"],
    ["event", "Events", "/events", "events"],
    ["favorite", "Saved", "#", "saved"],
  ];
  return `<nav class="mobile-nav">${items.map(([symbol, label, href, key]) => `<a class="${active === key ? "active" : ""}" href="${href}">${icon(symbol)}<span>${label}</span></a>`).join("")}</nav>`;
}
