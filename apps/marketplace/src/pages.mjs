import { badgeProgression, screepsScreenshots } from "./data.mjs";
import {
  escapeHtml,
  footer,
  icon,
  money,
  offeringCard,
  pageShell,
  programCard,
  statusLabel,
  topNav,
} from "./components.mjs";

function shot(index) {
  return screepsScreenshots[index % screepsScreenshots.length];
}

export function renderHome(data) {
  const { path, programs, league } = data;
  const featured = programs.slice(0, 3);

  const body = `
    <main>
      <section class="home-hero">
        <div class="hero-bg"><img src="${shot(0)}" alt="A Screeps room in progress" /></div>
        <div class="hero-content">
          <span class="kicker">${icon("terminal")} AI Software Architect League</span>
          <h1>Build Systems Inside a Living Screeps Colony</h1>
          <p>${escapeHtml(path.description)} Screeps is a real, persistent JavaScript game &mdash; the code you write runs 24/7, whether you're watching or not. You build with an AI coding agent first, then dissect the architecture until it's genuinely yours.</p>
          <div class="button-row">
            <a class="primary-button" href="/programs">View the Path ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/league">See the League</a>
          </div>
        </div>
      </section>

      <section class="section badge-strip-section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("military_tech")} Progression</span>
            <h2>Explorer &rarr; Certificate</h2>
            <p>Six programs. One continuously-running bot. Every badge is earned by shipping a working system, not finishing a video.</p>
          </div>
        </div>
        <div class="badge-strip">
          ${badgeProgression.map((badge, i) => `<div class="badge-step"><span>${String(i + 1).padStart(2, "0")}</span><b>${badge}</b></div>`).join(`<i class="badge-connector"></i>`)}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <h2>The Path</h2>
            <p>${escapeHtml(path.targetAudience)}</p>
          </div>
          <a href="/programs">View all programs ${icon("arrow_forward")}</a>
        </div>
        <div class="trending-grid">${featured.map((program) => programCard(program)).join("")}</div>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="${shot(6)}" alt="Screeps combat room" /></div>
        <div>
          <span class="kicker">${icon("flag")} League</span>
          <h2>${escapeHtml(league.season?.name || "AutoNateAI Screeps League")}</h2>
          <p>${escapeHtml(league.season?.winCondition?.split(".")[0] || "")}. Run on our own private Screeps server &mdash; students' bots compete directly, no live public-world risk, fully within our control.</p>
          <div class="stat-grid">
            <div><strong>${escapeHtml(league.season?.format || "TBD")}</strong><span>Format</span></div>
            <div><strong>${league.season?.entryFee ? money(league.season.entryFee) : "TBD"}</strong><span>Entry Fee</span></div>
          </div>
          <a class="outline-button" href="/league">${statusLabel(league.season?.status)} &mdash; Learn More</a>
        </div>
      </section>

      <section class="newsletter">
        <div>
          <h2>Get Notified When Enrollment Opens</h2>
          <p>New cohorts, self-paced access, and League season dates &mdash; straight to your inbox.</p>
          <form>
            <input placeholder="Enter your email" type="email" />
            <button type="button">Notify Me</button>
          </form>
          <small>By subscribing, you agree to our Terms of Service and Privacy Policy.</small>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "AutoNateAI | AI Software Architect League",
    active: "home",
    body,
    ogImage: "/assets/og/programs.jpg",
  });
}

export function renderPrograms(data) {
  const { path, programs } = data;
  const body = `
    <main class="programs-page">
      <div class="page-toolbar">
        <div>
          <span class="kicker">${icon("route")} ${escapeHtml(path.name)}</span>
          <h1>The Path</h1>
          <p>${escapeHtml(path.description)} ${escapeHtml(path.estimatedDuration)}.</p>
        </div>
      </div>
      <div class="market-grid">${programs.map((program) => programCard(program)).join("")}</div>
    </main>
  `;

  return pageShell({
    title: "Programs | AutoNateAI",
    active: "programs",
    body,
    ogImage: "/assets/og/programs.jpg",
    description: path.description,
  });
}

export function renderProgramDetail(data, program) {
  const related = data.programs.filter((p) => p.handle !== program.handle).slice(0, 3);
  const gallery = [shot(program.sequence), shot(program.sequence + 3), shot(program.sequence + 6)];

  const body = `
    <main class="product-detail-page">
      <nav class="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/programs">Programs</a><span>/</span><b>${escapeHtml(program.name)}</b></nav>
      <section class="product-detail">
        <div class="product-gallery">
          <img src="${gallery[0]}" alt="${escapeHtml(program.name)} preview" />
          <div>${gallery.map((src) => `<img src="${src}" alt="Screeps gameplay" />`).join("")}</div>
        </div>
        <aside class="buy-panel">
          <span class="kicker">${escapeHtml(program.badge)}</span>
          <h1>${escapeHtml(program.name)}</h1>
          <p>${escapeHtml(program.description)}</p>
          <div class="detail-rating"><span class="status-pill ${program.status === "Active" ? "live" : ""}">${statusLabel(program.status)}</span><span>Program ${program.sequence} of 6 &middot; ${program.durationWeeks || 3} weeks</span></div>
          <dl>
            <dt>Learning outcomes</dt><dd>${escapeHtml(program.learningOutcomes)}</dd>
            <dt>Project</dt><dd>${escapeHtml(program.projectSummary)}</dd>
            <dt>Portfolio artifact</dt><dd>${escapeHtml(program.portfolioArtifact)}</dd>
          </dl>
        </aside>
      </section>

      <section class="section compact">
        <div class="section-head"><div><h2>Choose how you enroll</h2><p>Every offering covers the same six sessions and the same badge.</p></div></div>
        <div class="offerings-grid">${program.offerings.map((offering) => offeringCard(offering, program)).join("")}</div>
      </section>

      <section class="section compact">
        <div class="section-head"><h2>Inside the ${program.durationWeeks || 3} weeks</h2></div>
        <div class="session-list">
          ${program.sessions
            .map(
              (session) => `
            <article class="session-card">
              <span class="session-number">${String(session.number).padStart(2, "0")}</span>
              <div>
                <h3>${escapeHtml(session.name)}</h3>
                <p>${escapeHtml(session.objectives)}</p>
                <div class="session-meta"><span><b>Live:</b> ${escapeHtml(session.liveActivity)}</span><span><b>Homework:</b> ${escapeHtml(session.homework)}</span></div>
              </div>
            </article>
          `,
            )
            .join("")}
        </div>
      </section>

      <section class="section compact">
        <div class="section-head"><h2>Other programs on the path</h2><a href="/programs">Back to all programs ${icon("arrow_forward")}</a></div>
        <div class="mini-grid">${related.map((p) => miniProgramCard(p)).join("")}</div>
      </section>
    </main>
  `;

  return pageShell({
    title: `${program.name} | AutoNateAI`,
    active: "programs",
    body,
    ogImage: `/assets/og/${program.handle}.jpg`,
    description: program.description,
  });
}

export function renderLeague(data) {
  const { league } = data;
  const season = league.season;
  const product = league.product;
  const available = season?.status === "Active";

  const body = `
    <main class="league-page">
      <header class="events-hero">
        <img src="${shot(7)}" alt="Screeps arena combat" />
        <div>
          <span class="kicker">${icon("flag")} League / Tournament</span>
          <h1>${escapeHtml(season?.name || "AutoNateAI Screeps League")}</h1>
          <p>${escapeHtml(product?.cta || "")}</p>
        </div>
      </header>

      <section class="league-grid">
        <article class="league-rules">
          <h2>Win condition</h2>
          <p>${escapeHtml(season?.winCondition || "TBD")}</p>
        </article>
        <aside class="league-facts">
          <div><span>Format</span><b>${escapeHtml(season?.format || "TBD")}</b></div>
          <div><span>Entry Fee</span><b>${season?.entryFee ? money(season.entryFee) : "TBD"}</b></div>
          <div><span>Status</span><b class="status-pill ${available ? "live" : ""}">${statusLabel(season?.status)}</b></div>
          <button ${available ? "" : "disabled"}>${available ? "Register Your Bot" : "Register Interest"}</button>
        </aside>
      </section>

      <section class="section compact">
        <div class="section-head"><div><h2>How it works</h2><p>Run on our own private Screeps server &mdash; not the public World.</p></div></div>
        <div class="league-how">
          <div><span class="material-symbols-outlined">dns</span><h3>Our own server</h3><p>Every match runs on infrastructure we control. No live PvP risk to a student's room outside of a scheduled match.</p></div>
          <div><span class="material-symbols-outlined">flag</span><h3>Capture the Flag</h3><p>Each side gets one flag that can't be destroyed or moved. First creep to touch the enemy's flag wins instantly.</p></div>
          <div><span class="material-symbols-outlined">emoji_events</span><h3>Bracket season</h3><p>Bots &mdash; often capstone projects from the AI Software Architect path &mdash; face off in a scheduled, spectator-friendly bracket.</p></div>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "League | AutoNateAI",
    active: "league",
    body,
    ogImage: "/assets/og/league.jpg",
    description: season?.winCondition || "",
  });
}

export function renderCheckout(data) {
  const body = `
    <main class="checkout-page">
      <div class="stepper">
        <span>01 Program</span><i></i><b>02 Payment</b><i></i><span>03 Success</span>
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
            <label>Promo Code<input placeholder="EXPLORER10" /></label>
          </div>
        </section>
        <aside class="order-summary">
          <h2>Order Summary</h2>
          <div class="summary-items" data-order-summary><p>Loading your selection&hellip;</p></div>
          <div class="summary-line"><span>Subtotal</span><b data-order-subtotal>&mdash;</b></div>
          <div class="summary-line"><span>Transaction Fee</span><b>$0</b></div>
          <div class="total-line"><span>Total</span><b data-order-total>&mdash;</b></div>
          <a class="primary-button full" data-checkout-complete href="/success">Complete Purchase ${icon("arrow_forward")}</a>
          <p class="fine-print">Enrollment access is delivered by email immediately upon confirmation.</p>
        </aside>
      </div>
    </main>
    <footer class="minimal-footer">&copy; 2026 AutoNateAI. The AI Software Architect League.</footer>
    ${dataScript(data)}
  `;

  return pageShell({ title: "Checkout | AutoNateAI", active: "checkout", body, mode: "checkout" });
}

export function renderSuccess(data) {
  const recommendations = data.programs.slice(0, 4);

  const body = `
    <main class="success-page">
      <section class="success-header">
        <div class="success-mark">${icon("check_circle")}</div>
        <h1>Enrollment Confirmed</h1>
        <p>You're in. Onboarding instructions and your first session details are on their way to your inbox.</p>
      </section>
      <section class="success-grid">
        <article class="access-card">
          <img src="${shot(2)}" alt="Screeps colony" />
          <div>
            <span class="kicker">Program Ready</span>
            <h2 data-success-program>Loading&hellip;</h2>
            <p>Your badge track starts with Session 1. Everything you need lands in your inbox before your first login.</p>
            <a class="primary-button" href="/programs">View the Path</a>
          </div>
        </article>
        <aside class="order-details">
          <h3>Order Details</h3>
          <dl><dt>Order ID</dt><dd>#AN-${Math.floor(10000 + Math.random() * 89999)}</dd><dt>Offering</dt><dd data-success-offering>&mdash;</dd><dt>Total Paid</dt><dd data-success-total>&mdash;</dd></dl>
        </aside>
      </section>
      <section class="section compact">
        <h2>Keep going on the path</h2>
        <div class="mini-grid">${recommendations.map((p) => miniProgramCard(p)).join("")}</div>
      </section>
    </main>
    ${dataScript(data)}
  `;

  return pageShell({ title: "Enrollment Confirmed | AutoNateAI", active: "success", body });
}

function dataScript(data) {
  const withThumbnails = {
    ...data,
    programs: data.programs.map((p) => ({ ...p, thumbnail: shot(p.sequence) })),
  };
  return `<script id="programs-data" type="application/json">${JSON.stringify(withThumbnails)}</script>`;
}

function paymentMethod(symbol, label, active = false) {
  return `<button class="payment-method ${active ? "active" : ""}">${icon(symbol)}<span>${label}</span></button>`;
}

function miniProgramCard(program) {
  const cheapest = program.offerings?.[0];
  return `<a class="mini-card" href="/programs/${program.handle}"><img src="${shot(program.sequence)}" alt="${escapeHtml(program.name)}" /><div><strong>${escapeHtml(program.name)}</strong><span>${escapeHtml(program.badge)}</span></div><b>${cheapest ? `${money(cheapest.price)}+` : "TBD"}</b></a>`;
}
