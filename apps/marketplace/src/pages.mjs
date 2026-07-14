import { articles, screepsScreenshots } from "./data.mjs";
import {
  escapeHtml,
  icon,
  money,
  offeringCard,
  pageShell,
  statusLabel,
} from "./components.mjs";

function shot(index) {
  return screepsScreenshots[index % screepsScreenshots.length];
}

export function renderHome(data) {
  const { programs, league } = data;
  const featured = programs.slice(0, 1);
  const primaryProgram = featured[0];
  const primaryOffering = primaryProgram.offerings?.[0];
  const primaryPrice = primaryOffering ? money(primaryOffering.price) : "$369";
  const primaryCheckoutHref = primaryOffering
    ? `/checkout?program=${primaryProgram.handle}&offering=${primaryOffering.id}`
    : `/programs/${primaryProgram.handle}`;
  const landingArticles = [
    "coding-as-workforce-development",
    "why-tournament-day-matters",
    "systems-thinking-through-code",
  ]
    .map((handle) => articles.find((article) => article.handle === handle))
    .filter(Boolean);

  const body = `
    <main>
      <section class="home-hero">
        <div class="hero-bg"><img src="${shot(0)}" alt="A Screeps room in progress" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("terminal")} Youth Programming Cohort</span>
            <h1>A coding cohort students actually want to show up for.</h1>
            <p>Students build inside Screeps, an online strategy world where JavaScript controls a live colony. They code the systems that keep that colony running and leave with Git-backed proof of how they think. For parents, schools, churches, and program directors, it is a six-week workforce-development experience that blends fun, community, AI literacy, and real software habits.</p>
            <div class="button-row">
              <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seat for ${primaryPrice} ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="/programs/${primaryProgram.handle}">See what students build</a>
            </div>
          </div>
          <aside class="hero-program-panel">
            <img src="${shot(3)}" alt="Screeps room showing a student-built colony system" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("sports_esports")} What they build</span>
              <h2>One colony. One repo. One tournament.</h2>
              <p>Students turn game strategy into real software habits, then battle their colonies head-to-head in AutoNateAI capture-the-flag.</p>
              <div class="hero-facts">
                <span>Workforce-ready habits</span>
                <span>Community cohort</span>
                <span>Screeps bot repo</span>
                <span>Tournament day</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("public")} Why this works</span>
            <h2>Screeps makes scalable software visible.</h2>
            <p>Every concept connects to a colony students can see: loops move creeps, functions become reusable behaviors, Git protects working bot versions, APIs explain how code talks to systems, and automation helps the colony scale.</p>
          </div>
          <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seats ${icon("arrow_forward")}</a>
        </div>
        <div class="value-grid">
          <article><span>${icon("functions")}</span><h3>Code that runs</h3><p>Variables, functions, conditionals, loops, and data structures control real creeps inside a persistent room.</p></article>
          <article><span>${icon("account_tree")}</span><h3>Git like builders</h3><p>Students commit working bot versions, read diffs, recover from broken changes, and leave with a visible repo history.</p></article>
          <article><span>${icon("hub")}</span><h3>APIs and automation</h3><p>Screeps game objects make API thinking concrete while spawn logic, roles, and Memory teach automation loops.</p></article>
          <article><span>${icon("smart_toy")}</span><h3>Codex workflows</h3><p>Codex helps students plan, generate, debug, and review bot features, but they only keep code they can explain.</p></article>
        </div>
      </section>

      <section class="section compete-section">
        <div class="compete-layout">
          <div class="compete-visual">
            <div class="compete-media">
              <img src="${shot(7)}" alt="Screeps battle with colonies competing" />
              <div class="compete-callout">
                <span>${icon("flag")} Tournament capstone</span>
                <strong>Head-to-head colony battles</strong>
                <p>Students test whether their automation, debugging, and strategy can hold up when another bot is trying to win.</p>
              </div>
            </div>
            <div class="button-row compete-actions">
              <a class="primary-button" href="${primaryCheckoutHref}">Get the Course ${icon("arrow_forward")}</a>
              <a class="outline-button" href="/league">See Tournament Day</a>
            </div>
          </div>
          <div class="compete-copy">
            <span class="kicker">${icon("emoji_events")} Learn, Build, Battle</span>
            <h2>Students learn to code, then compete against each other's code.</h2>
            <p>The course starts with programming fundamentals inside Screeps, then moves toward strategy: roles, memory, automation, Git branches, and Codex-supported improvements. By the end, students are not just showing a project. They are running a colony built from their own decisions.</p>
            <div class="compete-curriculum">
              <article><b>01</b><span>Set up Screeps, map the colony, and write the first creep behavior.</span></article>
              <article><b>02</b><span>Use functions, logic, Memory, and Git to turn scripts into a system.</span></article>
              <article><b>03</b><span>Prepare a tournament branch for AutoNateAI capture-the-flag.</span></article>
            </div>
          </div>
        </div>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="${shot(6)}" alt="Screeps combat room" /></div>
        <div>
          <span class="kicker">${icon("flag")} Capstone</span>
          <h2>${escapeHtml(league.season?.name || "Tournament Day")}</h2>
          <p>${escapeHtml(league.product?.cta || "")} This is where the course gets loud: students see whether their logic, automation, and architecture hold up when another colony is trying to win.</p>
          <div class="stat-grid">
            <div><strong>${escapeHtml(league.season?.format || "TBD")}</strong><span>Format</span></div>
            <div><strong>Included</strong><span>Final Tournament</span></div>
          </div>
          <div class="button-row">
            <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seats ${icon("arrow_forward")}</a>
            <a class="outline-button" href="/league">See Tournament Day</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("article")} Articles</span>
            <h2>For the adults deciding where students spend their time.</h2>
            <p>These reads help families and program leaders see the bigger picture: why the game is fun, why the code matters, and how the cohort turns curiosity into workforce-ready habits.</p>
          </div>
          <a class="primary-button" href="${primaryCheckoutHref}">Start Enrollment ${icon("arrow_forward")}</a>
        </div>
        <div class="article-grid">${landingArticles.map((article) => articleCard(article)).join("")}</div>
      </section>

      <section class="newsletter">
        <div>
          <h2>Reserve seats for the next cohort.</h2>
          <p>New cohorts run every so often. The August cohort is six weeks, virtual, Tuesdays and Thursdays from 6:30 PM to 8:30 PM Eastern.</p>
          <form>
            <input placeholder="Enter your email" type="email" />
            <button type="button">Request Info</button>
          </form>
          <small>Screeps setup help, cohort workspace, Git repo guidance, and tournament-day support are included.</small>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "AutoNateAI | Youth Systems Programming Lab",
    active: "home",
    body,
    ogImage: "/assets/og/programs.jpg",
    description:
      "A 6-week youth programming program where students learn coding foundations, Git, APIs, automation, scalable systems thinking, and Codex-assisted development through Screeps.",
  });
}

export function renderPrograms(data) {
  const { path, programs } = data;
  const body = `
    <main class="programs-page">
      <div class="page-toolbar">
        <div>
          <span class="kicker">${icon("route")} Youth Programming Program</span>
          <h1>One focused cohort. Built to run again.</h1>
          <p>${escapeHtml(path.description)} ${escapeHtml(path.estimatedDuration)}. Built for organizations and families purchasing seats for students.</p>
        </div>
      </div>
      ${programs.map((program) => programFeature(program, "program-page-feature")).join("")}
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
  const offering = program.offerings?.[0];
  const price = offering ? money(offering.price) : "$369";
  const checkoutHref = offering ? `/checkout?program=${program.handle}&offering=${offering.id}` : "/checkout";

  const body = `
    <main class="product-detail-page">
      <nav class="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/programs">Programs</a><span>/</span><b>${escapeHtml(program.name)}</b></nav>
      <section class="program-detail-hero">
        <div class="product-gallery">
          <img src="${gallery[0]}" alt="${escapeHtml(program.name)} preview" />
          <div>${gallery.map((src) => `<img src="${src}" alt="Screeps gameplay" />`).join("")}</div>
        </div>
        <aside class="buy-panel">
          <span class="kicker">${escapeHtml(program.badge)}</span>
          <h1>${escapeHtml(program.name)}</h1>
          <p>${escapeHtml(program.description)}</p>
          <div class="detail-rating"><span class="status-pill ${program.status === "Active" ? "live" : ""}">${statusLabel(program.status)}</span><span>${program.durationWeeks || 6} weeks &middot; ${escapeHtml(program.liveSchedule || "Live cohort")}</span></div>
          <div class="detail-cta-box">
            <strong>${price}<small> per student</small></strong>
            <a class="primary-button full" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
            <a class="outline-button full" href="#curriculum">View 12 Sessions</a>
          </div>
          <dl>
            <dt>Start</dt><dd>${escapeHtml(program.cohortNote || program.startDate || "Next cohort TBD")}</dd>
            <dt>Learning outcomes</dt><dd>${escapeHtml(program.learningOutcomes)}</dd>
            <dt>Project</dt><dd>${escapeHtml(program.projectSummary)}</dd>
            <dt>Portfolio artifact</dt><dd>${escapeHtml(program.portfolioArtifact)}</dd>
          </dl>
        </aside>
      </section>

      <section class="detail-proof-strip">
        <a href="${checkoutHref}"><b>${price}</b><span>Full 6-week program</span></a>
        <a href="#curriculum"><b>12</b><span>Live Screeps sessions</span></a>
        <a href="#outcomes"><b>Git</b><span>Student-owned repo</span></a>
        <a href="/league"><b>CTF</b><span>Tournament day</span></a>
      </section>

      <section class="section compact" id="outcomes">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("architecture")} What They Build</span>
            <h2>A Screeps colony that behaves like a real software system.</h2>
            <p>Students do not just learn syntax. They design roles, automate decisions, persist state in Memory, debug failures, use Git checkpoints, and explain how their system could scale.</p>
          </div>
          <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
        <div class="outcome-grid">
          <article><img src="${shot(2)}" alt="Screeps room with active creeps" /><h3>Working colony bot</h3><p>Harvesters, upgraders, builders, spawn logic, Memory, and role-based behavior.</p></article>
          <article><img src="${shot(4)}" alt="Screeps room showing system growth" /><h3>Production habits</h3><p>Git commits, README notes, bug reports, diffs, and recoverable development checkpoints.</p></article>
          <article><img src="${shot(8)}" alt="Screeps map and room systems" /><h3>Tournament-ready strategy</h3><p>Students tune their colony for AutoNateAI capture-the-flag and explain what they would scale next.</p></article>
        </div>
      </section>

      <section class="section compact">
        <div class="section-head"><div><h2>Enroll in the next cohort</h2><p>Setup help, cohort workspace access, Git repo guidance, Codex workflow coaching, and tournament-day support are included.</p></div></div>
        <div class="offerings-grid">${program.offerings.map((offering) => offeringCard(offering, program)).join("")}</div>
      </section>

      <section class="section compact" id="curriculum">
        <div class="section-head">
          <div><h2>Inside the ${program.durationWeeks || 6} weeks</h2><p>Every live session and homework task moves the Screeps colony forward.</p></div>
          <a class="primary-button" href="${checkoutHref}">Get the Course ${icon("arrow_forward")}</a>
        </div>
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
        <div class="section-head"><h2>Related cohorts</h2><a href="/programs">Back to program ${icon("arrow_forward")}</a></div>
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
          <span class="kicker">${icon("flag")} Tournament Day</span>
          <h1>${escapeHtml(season?.name || "AutoNateAI Tournament Day")}</h1>
          <p>${escapeHtml(product?.cta || "")}</p>
        </div>
      </header>

      <section class="league-grid">
        <article class="league-rules">
          <h2>What students compete with</h2>
          <p>${escapeHtml(season?.winCondition || "TBD")}</p>
        </article>
        <aside class="league-facts">
          <div><span>Format</span><b>${escapeHtml(season?.format || "TBD")}</b></div>
          <div><span>Entry Fee</span><b>Included</b></div>
          <div><span>Status</span><b class="status-pill ${available ? "live" : ""}">${statusLabel(season?.status)}</b></div>
          <a class="primary-button full ${available ? "" : "disabled"}" href="/programs">${available ? "Reserve Seats" : "Register Interest"}</a>
        </aside>
      </section>

      <section class="section compact">
        <div class="section-head"><div><h2>How it works</h2><p>The final session turns the project into a head-to-head Screeps match students can explain to parents, educators, and program partners.</p></div><a class="primary-button" href="/programs">Get Seats ${icon("arrow_forward")}</a></div>
        <div class="league-how">
          <div><span class="material-symbols-outlined">account_tree</span><h3>Battle branch</h3><p>Students submit a Git branch tuned for the tournament rules and ready to run on the match server.</p></div>
          <div><span class="material-symbols-outlined">flag</span><h3>Capture the flag</h3><p>Colonies face off head-to-head. The bot has to move, defend, make decisions, and react under pressure.</p></div>
          <div><span class="material-symbols-outlined">emoji_events</span><h3>Strategy review</h3><p>Students explain what worked, what broke, and how they would improve the next version of the colony.</p></div>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "Tournament Day | AutoNateAI",
    active: "league",
    body,
    ogImage: "/assets/og/league.jpg",
    description: season?.winCondition || "",
  });
}

export function renderArticles() {
  const featuredArticle = articles.find((article) => article.handle === "systems-thinking-through-code");
  const listedArticles = articles.filter((article) => article.handle !== featuredArticle?.handle);
  const body = `
    <main class="articles-page">
      <div class="page-toolbar">
        <div>
          <span class="kicker">${icon("article")} Articles / Tutorials / Strategy</span>
          <h1>Learn the world before you enter it.</h1>
          <p>Searchable, filterable content for students, families, educators, and partners who want to understand systems-based programming, Git, APIs, automation, and AI-assisted coding.</p>
        </div>
      </div>
      ${featuredArticle ? featuredArticleCard(featuredArticle) : ""}
      <div class="content-tools">
        <label>${icon("search")} <input type="search" placeholder="Search articles, strategy, Git, Screeps..." data-article-search /></label>
        <div class="filter-row" data-article-filters>
          ${["All", ...new Set(articles.map((article) => article.category))].map((category) => `<button type="button" data-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("")}
        </div>
      </div>
      <div class="article-grid" data-article-grid>${listedArticles.map((article) => articleCard(article)).join("")}</div>
    </main>
  `;

  return pageShell({
    title: "Articles | AutoNateAI",
    active: "articles",
    body,
    ogImage: "/assets/og/default.jpg",
    description:
      "Articles, tutorials, and strategy notes about youth programming, AI-assisted development, Git, APIs, automation, and systems thinking.",
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
    <footer class="minimal-footer">&copy; 2026 AutoNateAI. Youth Systems Programming Lab.</footer>
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
            <span class="kicker">Seat Reserved</span>
            <h2 data-success-program>Loading&hellip;</h2>
            <p>Onboarding, setup instructions, cohort workspace access, and the first live-session details are sent before the cohort begins.</p>
            <a class="primary-button" href="/programs">View Program</a>
          </div>
        </article>
        <aside class="order-details">
          <h3>Order Details</h3>
          <dl><dt>Order ID</dt><dd>#AN-${Math.floor(10000 + Math.random() * 89999)}</dd><dt>Offering</dt><dd data-success-offering>&mdash;</dd><dt>Total Paid</dt><dd data-success-total>&mdash;</dd></dl>
        </aside>
      </section>
      <section class="section compact">
        <h2>Program details</h2>
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

function programFeature(program, extraClass = "") {
  const offering = program.offerings?.[0];
  const price = offering ? money(offering.price) : "$369";
  const checkoutHref = offering ? `/checkout?program=${program.handle}&offering=${offering.id}` : "/checkout";

  return `
    <article class="program-feature ${extraClass}">
      <a class="program-feature-media" href="/programs/${program.handle}">
        <img src="${shot(program.sequence + 1)}" alt="Screeps colony system preview" />
      </a>
      <div class="program-feature-body">
        <div class="program-feature-topline">
          <span class="status-pill ${program.status === "Active" ? "live" : ""}">${statusLabel(program.status)}</span>
          <span>${program.durationWeeks || 6} weeks &middot; 12 live sessions &middot; Virtual</span>
        </div>
        <h3>${escapeHtml(program.name)}</h3>
        <p>${escapeHtml(program.description)}</p>
        <div class="program-feature-points">
          <span>${icon("sports_esports")} Screeps colony bot</span>
          <span>${icon("account_tree")} Git repo</span>
          <span>${icon("hub")} API thinking</span>
          <span>${icon("smart_toy")} Codex workflows</span>
        </div>
        <div class="program-feature-actions">
          <a class="primary-button" href="${checkoutHref}">Reserve Seat for ${price} ${icon("arrow_forward")}</a>
          <a class="outline-button" href="/programs/${program.handle}">View Curriculum</a>
        </div>
      </div>
    </article>
  `;
}

function miniProgramCard(program) {
  const cheapest = program.offerings?.[0];
  return `<a class="mini-card" href="/programs/${program.handle}"><img src="${shot(program.sequence)}" alt="${escapeHtml(program.name)}" /><div><strong>${escapeHtml(program.name)}</strong><span>${escapeHtml(program.badge)}</span></div><b>${cheapest ? `${money(cheapest.price)}+` : "TBD"}</b></a>`;
}

function featuredArticleCard(article) {
  return `
    <article class="featured-article">
      <a href="/articles/${article.handle}">
        <img src="${article.image}" alt="${escapeHtml(article.title)}" />
        <div>
          <span class="kicker">Featured &middot; ${escapeHtml(article.category)} &middot; ${escapeHtml(article.readingTime)}</span>
          <h2>${escapeHtml(article.title)}</h2>
          <p>${escapeHtml(article.summary)}</p>
          <div class="tag-row">${article.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </a>
    </article>
  `;
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
