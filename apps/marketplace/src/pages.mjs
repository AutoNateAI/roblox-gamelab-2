import { articles, badgeProgression, screepsScreenshots } from "./data.mjs";
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
  const featured = programs.slice(0, 1);
  const primaryProgram = featured[0];

  const body = `
    <main>
      <section class="home-hero">
        <div class="hero-bg"><img src="${shot(0)}" alt="A Screeps room in progress" /></div>
        <div class="hero-content">
          <span class="kicker">${icon("terminal")} Youth AI + Coding Program</span>
          <h1>Teach students to think in systems by building a living AI-powered colony.</h1>
          <p>AutoNateAI uses Screeps &mdash; a real JavaScript strategy world &mdash; to help students learn critical thinking, Git, AI-assisted coding, debugging, and software architecture. They do not just watch lessons. They build a bot that has to survive, adapt, and compete.</p>
          <div class="button-row">
            <a class="primary-button" href="/programs/${primaryProgram.handle}">Enroll for $250 ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/articles/what-is-screeps">What is Screeps?</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("public")} Why this works</span>
            <h2>A game world where code has consequences.</h2>
            <p>Screeps makes software architecture visible. Students write code to control workers, manage energy, remember state, use Git, collaborate with AI, and test strategies against a live environment.</p>
          </div>
        </div>
        <div class="value-grid">
          <article><span>${icon("psychology")}</span><h3>Systems thinking</h3><p>Students learn loops, bottlenecks, resources, feedback, and tradeoffs through a colony they can see.</p></article>
          <article><span>${icon("smart_toy")}</span><h3>AI collaboration</h3><p>They use AI to build faster, then learn to inspect, question, and improve the generated code.</p></article>
          <article><span>${icon("account_tree")}</span><h3>Git foundations</h3><p>Every student stores and shares code in a repo, building the habits of real software work.</p></article>
          <article><span>${icon("emoji_events")}</span><h3>Battle day</h3><p>The final session is a private-server tournament where strategies meet reality.</p></article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("school")} First Program</span>
            <h2>AI Software Architect Path</h2>
            <p>Three weeks. Six live evening sessions. One student-owned bot repo. One final cohort battle.</p>
          </div>
          <a href="/programs">View program ${icon("arrow_forward")}</a>
        </div>
        <div class="trending-grid">${featured.map((program) => programCard(program)).join("")}</div>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="${shot(6)}" alt="Screeps combat room" /></div>
        <div>
          <span class="kicker">${icon("flag")} Final Session</span>
          <h2>${escapeHtml(league.season?.name || "Battle Day")}</h2>
          <p>${escapeHtml(league.product?.cta || "")} The competition is not just about winning. It gives students a reason to test assumptions, explain decisions, and see how systems behave under pressure.</p>
          <div class="stat-grid">
            <div><strong>${escapeHtml(league.season?.format || "TBD")}</strong><span>Format</span></div>
            <div><strong>Included</strong><span>Battle Day</span></div>
          </div>
          <a class="outline-button" href="/league">See Battle Day</a>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("article")} Articles</span>
            <h2>Explain the world before asking families to buy in.</h2>
            <p>Guides, strategy notes, and tutorials help students and parents understand what Screeps is and why it builds durable thinking skills.</p>
          </div>
          <a href="/articles">Browse articles ${icon("arrow_forward")}</a>
        </div>
        <div class="article-grid">${articles.slice(0, 3).map((article) => articleCard(article)).join("")}</div>
      </section>

      <section class="newsletter">
        <div>
          <h2>Ready for the August cohort?</h2>
          <p>Program week opens Monday, August 3. Live sessions run Tuesdays and Thursdays from 6:30 PM to 8:30 PM Eastern.</p>
          <form>
            <input placeholder="Enter your email" type="email" />
            <button type="button">Request Info</button>
          </form>
          <small>Discord onboarding, local setup help, and the program repo are included.</small>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "AutoNateAI | AI Software Architect Path for Youth",
    active: "home",
    body,
    ogImage: "/assets/og/programs.jpg",
    description:
      "A 3-week youth coding program where students learn systems thinking, Git, AI-assisted coding, and debugging by building bots in Screeps.",
  });
}

export function renderPrograms(data) {
  const { path, programs } = data;
  const body = `
    <main class="programs-page">
      <div class="page-toolbar">
        <div>
          <span class="kicker">${icon("route")} Program Marketplace</span>
          <h1>One focused program to start the path.</h1>
          <p>${escapeHtml(path.description)} ${escapeHtml(path.estimatedDuration)}. Tagged to the ${escapeHtml(path.name)} path.</p>
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
          <div class="detail-rating"><span class="status-pill ${program.status === "Active" ? "live" : ""}">${statusLabel(program.status)}</span><span>${program.durationWeeks || 3} weeks &middot; ${escapeHtml(program.liveSchedule || "Live cohort")}</span></div>
          <dl>
            <dt>Start</dt><dd>${escapeHtml(program.cohortNote || program.startDate || "Next cohort TBD")}</dd>
            <dt>Learning outcomes</dt><dd>${escapeHtml(program.learningOutcomes)}</dd>
            <dt>Project</dt><dd>${escapeHtml(program.projectSummary)}</dd>
            <dt>Portfolio artifact</dt><dd>${escapeHtml(program.portfolioArtifact)}</dd>
          </dl>
        </aside>
      </section>

      <section class="section compact">
        <div class="section-head"><div><h2>Enroll in the August cohort</h2><p>Setup help, Discord access, the preconfigured program repo, Git introduction, and battle day are included.</p></div></div>
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
                ${session.date ? `<p class="session-date">${escapeHtml(session.date)}</p>` : ""}
                <p>${escapeHtml(session.objectives)}</p>
                <div class="session-meta"><span><b>Live:</b> ${escapeHtml(session.liveActivity)}</span><span><b>Homework:</b> ${escapeHtml(session.homework)}</span></div>
              </div>
            </article>
          `,
            )
            .join("")}
        </div>
      </section>

      ${
        related.length
          ? `<section class="section compact">
        <div class="section-head"><h2>Other programs on the path</h2><a href="/programs">Back to all programs ${icon("arrow_forward")}</a></div>
        <div class="mini-grid">${related.map((p) => miniProgramCard(p)).join("")}</div>
      </section>`
          : ""
      }
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
          <div><span>Entry Fee</span><b>Included</b></div>
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

export function renderArticles() {
  const body = `
    <main class="articles-page">
      <div class="page-toolbar">
        <div>
          <span class="kicker">${icon("article")} Articles / Tutorials / Strategy</span>
          <h1>Learn the world before you enter it.</h1>
          <p>Searchable, filterable content for students, families, educators, and partners who want to understand how Screeps supports critical thinking through code.</p>
        </div>
      </div>
      <div class="content-tools">
        <label>${icon("search")} <input type="search" placeholder="Search articles, strategy, Git, Screeps..." data-article-search /></label>
        <div class="filter-row" data-article-filters>
          ${["All", ...new Set(articles.map((article) => article.category))].map((category) => `<button type="button" data-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("")}
        </div>
      </div>
      <div class="article-grid" data-article-grid>${articles.map((article) => articleCard(article)).join("")}</div>
    </main>
  `;

  return pageShell({
    title: "Articles | AutoNateAI",
    active: "articles",
    body,
    ogImage: "/assets/og/default.jpg",
    description:
      "Articles, tutorials, and strategy notes about Screeps, youth coding, AI-assisted development, Git, and systems thinking.",
  });
}

export function renderArticleDetail(article) {
  const body = `
    <main class="article-page">
      <nav class="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/articles">Articles</a><span>/</span><b>${escapeHtml(article.title)}</b></nav>
      <article class="article-detail">
        <header>
          <span class="kicker">${escapeHtml(article.category)} &middot; ${escapeHtml(article.readingTime)}</span>
          <h1>${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(article.summary)}</p>
          <div class="tag-row">${article.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </header>
        <img src="${article.image}" alt="${escapeHtml(article.title)}" />
        <div class="article-body">
          ${article.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </div>
      </article>
    </main>
  `;

  return pageShell({
    title: `${article.title} | AutoNateAI`,
    active: "articles",
    body,
    ogImage: article.image,
    description: article.summary,
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

function articleCard(article) {
  return `
    <article class="article-card" data-category="${escapeHtml(article.category)}" data-search="${escapeHtml(`${article.title} ${article.summary} ${article.tags.join(" ")}`.toLowerCase())}">
      <a href="/articles/${article.handle}">
        <img src="${article.image}" alt="${escapeHtml(article.title)}" />
        <div>
          <span class="kicker">${escapeHtml(article.category)} &middot; ${escapeHtml(article.readingTime)}</span>
          <h3>${escapeHtml(article.title)}</h3>
          <p>${escapeHtml(article.summary)}</p>
          <div class="tag-row">${article.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </a>
    </article>
  `;
}
