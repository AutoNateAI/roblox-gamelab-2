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

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function cohortBadge(program, label = "Next cohort") {
  const date = formatDate(program?.startDate);
  if (!date) return "";
  return `<span class="cohort-date">${icon("calendar_month")} ${label}: ${escapeHtml(date)}</span>`;
}

function cohortCapacity(program) {
  const capacity = program?.offerings?.[0]?.capacity || 25;
  return `${capacity}-seat cohort`;
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
            <span class="kicker">${icon("terminal")} Workforce Systems Cohort</span>
            <h1>Train for the strategic tech jobs that do not exist yet.</h1>
            <p>Build inside Screeps, an online strategy world where JavaScript controls a live colony. You will write the systems that gather resources, survive hostile pressure, automate decisions, use AI responsibly, and adapt to changing rules. This is workforce development for tech-minded builders who want sharper judgment, not just more syntax.</p>
            <div class="cohort-date-row">
              ${cohortBadge(primaryProgram)}
              <span>${escapeHtml(primaryProgram.cohortNote || "")} Each cohort is capped at ${cohortCapacity(primaryProgram)} and gets a dedicated AutoNateAI Discord channel for coding help, Screeps strategy, build sessions, hackathons, and industry-leader networking.</span>
            </div>
            <div class="button-row">
              <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seat for ${primaryPrice} ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="/programs/${primaryProgram.handle}">See what you build</a>
            </div>
          </div>
          <aside class="hero-program-panel">
            <img src="${shot(3)}" alt="Screeps room showing a student-built colony system" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("sports_esports")} What they build</span>
              <h2>One colony. One repo. One tournament path.</h2>
              <p>Turn game strategy into real software habits, then prepare for the AutoNateAI league where colonies battle head-to-head.</p>
              <div class="hero-facts">
                <span>Strategic tech habits</span>
                <span>${cohortCapacity(primaryProgram)}</span>
                <span>Screeps bot repo</span>
                <span>Discord cohort channel</span>
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
            <p>Every concept connects to a colony you can see: loops move creeps, functions become reusable behaviors, Git protects working bot versions, APIs explain how code talks to systems, and automation helps the colony scale.</p>
          </div>
          <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
        <div class="value-grid">
          <article><span>${icon("functions")}</span><h3>Code that runs</h3><p>Variables, functions, conditionals, loops, and data structures control real creeps inside a persistent room.</p></article>
          <article><span>${icon("account_tree")}</span><h3>Git like builders</h3><p>Commit working bot versions, read diffs, recover from broken changes, and leave with a visible repo history.</p></article>
          <article><span>${icon("hub")}</span><h3>APIs and automation</h3><p>Screeps game objects make API thinking concrete while spawn logic, roles, and Memory teach automation loops.</p></article>
          <article><span>${icon("forum")}</span><h3>Discord cohort</h3><p>Every cohort gets a dedicated AutoNateAI Discord channel for coding questions, Screeps discussion, hackathons, and industry networking.</p></article>
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
                <p>Test whether your automation, debugging, and strategy can hold up when another bot is trying to win.</p>
              </div>
            </div>
            <div class="button-row compete-actions">
              <a class="primary-button" href="${primaryCheckoutHref}">Get the Course ${icon("arrow_forward")}</a>
              <a class="outline-button" href="/programs/${primaryProgram.handle}">View Curriculum</a>
            </div>
          </div>
          <div class="compete-copy">
            <span class="kicker">${icon("emoji_events")} Learn, Build, Battle</span>
            <h2>Learn to code, then compete against other people's code.</h2>
            <p>The course starts with programming fundamentals inside Screeps, then moves toward strategy: roles, memory, automation, Git branches, and Codex-supported improvements. By the end, you are not just showing a project. You are running a colony built from your own decisions.</p>
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
          <p>${escapeHtml(league.product?.cta || "")} Phase 1 gets you battle-ready. Phase 2 turns that work into a league where your logic, automation, and architecture have to hold up against other builders.</p>
          <div class="stat-grid">
            <div><strong>${escapeHtml(league.season?.format || "TBD")}</strong><span>Format</span></div>
            <div><strong>Included</strong><span>Final Tournament</span></div>
          </div>
          <div class="button-row">
            <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
            <a class="outline-button" href="/programs/${primaryProgram.handle}">View Program</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("article")} Articles</span>
            <h2>For builders who want to think in systems.</h2>
            <p>These reads explain the bigger picture: why the game matters, why the code matters, and how the cohort builds strategic habits for a future shaped by data, automation, AI, policy, resources, economies, and hostile pressure.</p>
          </div>
          <a class="primary-button" href="${primaryCheckoutHref}">Start Enrollment ${icon("arrow_forward")}</a>
        </div>
        <div class="article-grid">${landingArticles.map((article) => articleCard(article)).join("")}</div>
      </section>

      <section class="newsletter">
        <div>
          <h2>Reserve your seat for the next cohort.</h2>
          <p>${escapeHtml(primaryProgram.cohortNote || "New cohorts run every so often.")} The cohort is six weeks, virtual, Tuesdays and Thursdays from 6:30 PM to 8:30 PM Eastern, capped at ${cohortCapacity(primaryProgram)}, and supported inside a dedicated AutoNateAI Discord channel.</p>
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
    title: "AutoNateAI | Workforce Systems Programming Lab",
    active: "home",
    body,
    canonicalPath: "/",
    ogImage: "/assets/og/programs.jpg",
    description:
      "A 6-week workforce systems program where tech-minded builders learn coding foundations, Git, APIs, automation, scalable systems thinking, and Codex-assisted development through Screeps.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "AutoNateAI",
        "url": "https://autonateai.com",
        "description": "AutoNateAI teaches strategic software thinking, Git, APIs, automation, and responsible AI-assisted development for tech-minded builders.",
      },
    ],
  });
}

export function renderPrograms(data) {
  const { path, programs } = data;
  const body = `
    <main class="programs-page">

      ${programs.map((program) => programFeature(program, "program-page-feature", 6, true)).join("")}
    </main>
  `;

  return pageShell({
    title: "Programs | AutoNateAI",
    active: "programs",
    body,
    canonicalPath: "/programs",
    ogImage: "/assets/og/programs.jpg",
    description: path.description,
  });
}

export function renderAbout() {
  const values = [
    ["Curiosity", "Builders should leave with better questions, not just memorized answers."],
    ["Systems", "We teach participants to see inputs, state, feedback loops, constraints, and tradeoffs."],
    ["Integrity", "AI is powerful, but builders still need to understand, explain, and own their work."],
    ["Creation", "The goal is to build, test, reflect, and improve, not passively consume technology."],
  ];
  const experience = [
    ["University of Michigan", "B.S. Computer Science and Computer Security instructional aide"],
    ["Microsoft Security", "Software developer experience on systems people depend on"],
    ["Citi", "Engineering work inside financial technology environments"],
    ["Veterans United", "AI software engineering for real organizational workflows"],
    ["Atomic Object", "Senior software consulting across products, teams, and architecture decisions"],
    ["Outlier", "Prompt engineering and AI workflow evaluation before it became mainstream"],
  ];

  const body = `
    <main class="about-page">
      <section class="about-hero">
        <div>
          <span class="kicker">${icon("psychology")} About AutoNateAI</span>
          <h1>We teach tech-minded builders how to think like modern software engineers.</h1>
          <p>AutoNateAI exists to develop exceptional thinkers through software engineering, AI, and systems design. Programming is more than writing code. It teaches you how to break down problems, design solutions, communicate ideas, and work with AI responsibly.</p>
          <div class="button-row">
            <a class="primary-button" href="/programs">View the Program ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/articles">Read the Learning Model</a>
          </div>
        </div>
        <aside class="about-founder-card">
          <img src="/assets/nathan-baker.jpeg" alt="Nathan Baker, founder of AutoNateAI" />
          <div>
            <span class="kicker">Founder / Instructor</span>
            <h2>Nathan Baker</h2>
            <p>Computer Science, University of Michigan. Software and AI engineering experience across Microsoft, Citi, Veterans United, Atomic Object, and Outlier.</p>
          </div>
        </aside>
      </section>

      <section class="about-mission">
        <span class="kicker">${icon("architecture")} Mission</span>
        <h2>Become an architect, not just a programmer.</h2>
        <p>Many people learn syntax. Fewer learn how software actually gets designed. Professional engineers spend a lot of time thinking: planning, debugging, communicating, decomposing problems, using Git, reviewing tradeoffs, and deciding what should be automated next. AutoNateAI closes that gap.</p>
      </section>

      <section class="section compact about-split">
        <div>
          <span class="kicker">${icon("verified")} Why the training is different</span>
          <h2>Built from real engineering work, not a generic coding worksheet.</h2>
          <p>For the last five years, Nathan has designed software systems, AI workflows, and software architectures used inside real organizations. AutoNateAI turns those same engineering methods into a practical training ground for people preparing for the next era of tech work.</p>
          <p>Before founding AutoNateAI, Nathan also taught Computer Security at the University of Michigan as an instructional aide, leading office hours, lab sections, and mentoring students learning software security and networking.</p>
        </div>
        <div class="about-proof-list">
          ${experience.map(([title, text]) => `<article><span>${icon("work_history")}</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div></article>`).join("")}
        </div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("school")} Teaching Philosophy</span>
            <h2>Technology changes. Thinking lasts.</h2>
            <p>Students are encouraged to experiment, prototype, question assumptions, design before coding, learn from mistakes, use AI responsibly, and communicate their ideas clearly.</p>
          </div>
          <a class="primary-button" href="/programs">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
        <div class="value-grid about-value-grid">
          <article><span>${icon("account_tree")}</span><h3>Architecture</h3><p>Learn to split large problems into smaller parts and explain how those parts work together.</p></article>
          <article><span>${icon("bug_report")}</span><h3>Debugging</h3><p>Practice finding the real cause of a problem instead of guessing and hoping.</p></article>
          <article><span>${icon("commit")}</span><h3>Git workflows</h3><p>Learn to save progress, read changes, recover working versions, and document decisions.</p></article>
          <article><span>${icon("smart_toy")}</span><h3>AI collaboration</h3><p>Use AI as a thinking partner while staying responsible for the final code and explanation.</p></article>
        </div>
      </section>

      <section class="about-logos">
        <div>
          <span class="kicker">${icon("groups")} Community and education work</span>
          <h2>Experience across classrooms, companies, and community tech initiatives.</h2>
          <p>AutoNateAI's work is shaped by collaborations, workshops, outreach, and education initiatives involving universities, technology companies, and community technology programs. The focus is not logos. The focus is helping builders think clearly, compete intelligently, and build with confidence.</p>
        </div>
        <div class="org-cloud">
          ${["Grand Valley State University", "Black Boys Code", "Salesforce", "Microsoft", "Endless Opportunities", "Churches", "Community Organizations", "Youth Education Initiatives"].map((org) => `<span>${escapeHtml(org)}</span>`).join("")}
        </div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("diamond")} Values</span>
            <h2>The standards behind the work.</h2>
          </div>
        </div>
        <div class="about-values">
          ${values.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("")}
        </div>
      </section>

      <section class="founder-letter">
        <span class="kicker">${icon("edit_note")} Letter from Nathan</span>
        <h2>Let's build the next generation of strategic technologists.</h2>
        <p>I grew up fascinated with technology because it gave me a way to turn ideas into something real. Over time, working across Microsoft, financial technology, AI, consulting, and education reinforced one lesson: the people who succeed are not always the people who memorize the most. They are the people who learn how to think.</p>
        <p>AutoNateAI exists because tech-minded people deserve to learn software the way modern engineers actually work: with planning, systems thinking, Git, debugging, communication, responsible AI use, and projects that feel alive.</p>
        <p>If you are preparing for a future in software, AI, automation, security, data, or technical leadership, I would love to build with you.</p>
        <strong>Nathan Baker<br /><span>Founder, AutoNateAI</span></strong>
      </section>

      <section class="section compact about-faq">
        <div class="section-head"><div><span class="kicker">${icon("help")} FAQ</span><h2>Common questions</h2></div></div>
        <div class="faq-grid">
          <article><h3>Is this only for people who already code?</h3><p>No. The program is structured so beginners can build fundamentals while experienced learners sharpen how they think through a working system.</p></article>
          <article><h3>How does AI fit into the class?</h3><p>You use AI to ask better questions, inspect code, debug, and improve ideas. AI does not replace understanding.</p></article>
          <article><h3>Why use Screeps?</h3><p>Screeps makes software visible. You can see state, automation, feedback loops, failure, hostile pressure, resources, and strategy play out in a live world.</p></article>
          <article><h3>Who is this built for?</h3><p>High school students, college CS students, junior software engineers, career switchers, and tech-interested builders who want durable strategic technology habits.</p></article>
        </div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("local_activity")} Current Program</span>
          <h2>AI Systems Programming Lab</h2>
          <p>A six-week workforce systems cohort where you build a Screeps colony, learn systems thinking, use Git, collaborate with AI, and prepare for tournament and league play.</p>
        </div>
        <a class="primary-button" href="/programs">Explore the Program ${icon("arrow_forward")}</a>
      </section>
    </main>
  `;

  return pageShell({
    title: "About AutoNateAI | Youth Programming and AI Systems Thinking",
    active: "about",
    body,
    canonicalPath: "/about",
    ogImage: "/assets/nathan-baker.jpeg",
    description:
      "AutoNateAI teaches tech-minded builders how to think like modern software engineers through software architecture, AI workflows, Git, debugging, and systems design.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Nathan Baker",
        "jobTitle": "Founder and Instructor",
        "worksFor": {
          "@type": "Organization",
          "name": "AutoNateAI",
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "University of Michigan",
        },
      },
    ],
  });
}

export function renderProgramDetail(data, program) {
  const related = data.programs.filter((p) => p.handle !== program.handle).slice(0, 3);
  const gallery = [shot(6), shot(7), shot(8)];
  const offering = program.offerings?.[0];
  const price = offering ? money(offering.price) : "$369";
  const checkoutHref = offering ? `/checkout?program=${program.handle}&offering=${offering.id}` : "/checkout";
  const sessionWeeks = chunkSessions(program.sessions || [], 2);
  const heroTitle =
    program.handle === "ai-software-architect"
      ? `<span class="hero-title-line">AI Systems</span><span class="hero-title-line">Programming Lab</span>`
      : escapeHtml(program.name);

  const body = `
    <main class="product-detail-page">
      <section class="home-hero program-detail-hero">
        <div class="hero-bg"><img src="${gallery[0]}" alt="${escapeHtml(program.name)} preview" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <nav class="breadcrumbs program-hero-breadcrumbs"><a href="/">Home</a><span>/</span><a href="/programs">Programs</a><span>/</span><b>${escapeHtml(program.name)}</b></nav>
            <span class="kicker">${icon("emoji_events")} Build, Commit, Compete</span>
            <h1>${heroTitle}</h1>
            <p>A six-week live cohort where you learn systems thinking by building a Screeps colony you can care about. Your JavaScript gathers resources, remembers state, automates decisions, recovers from failure, responds to hostile pressure, and prepares for competition, so real software ideas become visible instead of abstract.</p>
            <div class="cohort-date-row">
              ${cohortBadge(program)}
              <span>${escapeHtml(program.cohortNote || "")} ${cohortCapacity(program)}. Dedicated AutoNateAI Discord included for coding, Screeps strategy, build sessions, hackathons, league updates, and industry networking.</span>
            </div>
            <div class="button-row">
              <a class="primary-button" href="${checkoutHref}">Reserve Seat for ${price} ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="#curriculum">View 12 Sessions</a>
            </div>
          </div>
          <aside class="hero-program-panel program-hero-panel">
            <img src="${gallery[1]}" alt="Screeps tournament strategy preview" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("sports_esports")} Program Path</span>
              <h2>One bot. One repo. One tournament path.</h2>
              <p>Build a working colony system, keep your decisions in Git, then tune a battle branch for AutoNateAI capture-the-flag and Phase 2 league play.</p>
              <div class="hero-facts">
                <span>${cohortCapacity(program)}</span>
                <span>${program.durationWeeks || 6} weeks</span>
                <span>Your Git repo</span>
                <span>Codex coaching</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="detail-proof-strip">
        <a href="${checkoutHref}"><b>${price}</b><span>Full 6-week program</span></a>
        <a href="${checkoutHref}"><b>${formatDate(program.startDate) || "Soon"}</b><span>Next cohort opens</span></a>
        <a href="#curriculum"><b>25</b><span>Seat cohort</span></a>
        <a href="#outcomes"><b>Git</b><span>Your repo history</span></a>
      </section>

      <section class="section compact detail-sales-band" id="outcomes">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("architecture")} What Makes It Worth Buying</span>
            <h2>You get a system to operate and proof of how you think.</h2>
            <p>You do not just watch lessons. You build roles, automate decisions, debug failures, use Git checkpoints, and explain how the colony system works under tournament pressure. Screeps gives you something to protect and improve while you learn real architecture habits.</p>
          </div>
          <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
        <div class="outcome-grid">
          <article><img src="${shot(2)}" alt="Screeps room with active creeps" /><h3>Working colony bot</h3><p>Harvesters, upgraders, builders, spawn logic, Memory, and role-based behavior.</p></article>
          <article><img src="${shot(4)}" alt="Screeps room showing system growth" /><h3>Production habits</h3><p>Git commits, README notes, bug reports, diffs, and recoverable development checkpoints.</p></article>
          <article><img src="${shot(8)}" alt="Screeps map and room systems" /><h3>Tournament-ready strategy</h3><p>Tune your colony for AutoNateAI capture-the-flag, then use Phase 2 league play as the next arena for improvement.</p></article>
        </div>
      </section>

      <section class="program-instructor-section">
        <div class="program-instructor-photo">
          <img src="/assets/nathan-baker.jpeg" alt="Nathan Baker, founder and instructor at AutoNateAI" />
        </div>
        <div>
          <span class="kicker">${icon("verified")} About the Instructor</span>
          <h2>Learn from an engineer who has built AI and software systems across Microsoft, Citi, Veterans United, and Atomic Object.</h2>
          <p>Nathan Baker studied Computer Science at the University of Michigan and has spent the last five years building real software, AI workflows, and software architectures inside organizations where clarity and reliability matter.</p>
          <p>He also taught Computer Security at the University of Michigan as an instructional aide. That mix of industry engineering and hands-on teaching shapes the program: you learn fundamentals, but you also learn how modern engineers plan, debug, use Git, collaborate with AI, and explain systems.</p>
          <div class="button-row">
            <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
            <a class="outline-button" href="/about">About AutoNateAI</a>
          </div>
        </div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("local_activity")} Live Cohort Seat</span>
          <h2>${price} for the full program</h2>
          <p>${escapeHtml(program.cohortNote || "")} Includes Screeps setup help, cohort workspace access, Git repo guidance, Codex workflow coaching, dedicated AutoNateAI Discord access, and tournament-day support.</p>
        </div>
        <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
      </section>

      <section class="section compact" id="curriculum">
        <div class="section-head">
          <div><h2>12 sessions, grouped by the system you are growing.</h2><p>Because Screeps keeps running, you see the same pressures real software faces: changing state, feedback loops, dependencies, automation, failure recovery, resource constraints, hostile actors, and performance under competition.</p></div>
          <a class="primary-button" href="${checkoutHref}">Get the Course ${icon("arrow_forward")}</a>
        </div>
        <div class="week-grid">
          ${sessionWeeks.map((sessions, index) => weekCard(index, sessions)).join("")}
        </div>
        <div class="detail-bottom-cta">
          <div><strong>Ready to join the cohort?</strong><span>Seats include all 12 live sessions, tournament prep, and the tournament capstone.</span></div>
          <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
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
    canonicalPath: `/programs/${program.handle}`,
    ogImage: `/assets/og/${program.handle}.jpg`,
    description: program.description,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": program.name,
        "description": program.description,
        "provider": {
          "@type": "Organization",
          "name": "AutoNateAI",
          "sameAs": "https://autonateai.com",
        },
        "offers": offering
          ? {
              "@type": "Offer",
              "url": `https://autonateai.com${checkoutHref}`,
              "price": String(offering.price),
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
            }
          : undefined,
      },
    ],
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
          <h2>What you compete with</h2>
          <p>${escapeHtml(season?.winCondition || "TBD")}</p>
        </article>
        <aside class="league-facts">
          <div><span>Format</span><b>${escapeHtml(season?.format || "TBD")}</b></div>
          <div><span>Entry Fee</span><b>Included</b></div>
          <div><span>Status</span><b class="status-pill ${available ? "live" : ""}">${statusLabel(season?.status)}</b></div>
          <a class="primary-button full ${available ? "" : "disabled"}" href="/programs">${available ? "Reserve Seat" : "Register Interest"}</a>
        </aside>
      </section>

      <section class="section compact">
        <div class="section-head"><div><h2>How it works</h2><p>The final session turns your project into a head-to-head Screeps match. Phase 2 expands that tournament format into league play for builders who want to keep improving.</p></div><a class="primary-button" href="/programs">Get Seat ${icon("arrow_forward")}</a></div>
        <div class="league-how">
          <div><span class="material-symbols-outlined">account_tree</span><h3>Battle branch</h3><p>Submit a Git branch tuned for the tournament rules and ready to run on the match server.</p></div>
          <div><span class="material-symbols-outlined">flag</span><h3>Capture the flag</h3><p>Colonies face off head-to-head. The bot has to move, defend, make decisions, and react under pressure.</p></div>
          <div><span class="material-symbols-outlined">emoji_events</span><h3>Strategy review</h3><p>Explain what worked, what broke, and how you would improve the next version of the colony.</p></div>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "Tournament Day | AutoNateAI",
    active: "league",
    body,
    canonicalPath: "/league",
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
          <p>Searchable, filterable content for tech-minded builders who want to understand systems-based programming, Git, APIs, automation, AI-assisted coding, and competitive strategy.</p>
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
    canonicalPath: "/articles",
    ogImage: "/assets/og/default.jpg",
    description:
      "Articles, tutorials, and strategy notes about workforce systems programming, AI-assisted development, Git, APIs, automation, competition, and systems thinking.",
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
    canonicalPath: `/articles/${article.handle}`,
    ogImage: article.image,
    description: article.summary,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.summary,
        "image": `https://autonateai.com${article.image}`,
        "author": {
          "@type": "Organization",
          "name": "AutoNateAI",
        },
        "publisher": {
          "@type": "Organization",
          "name": "AutoNateAI",
        },
      },
    ],
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
          <span class="kicker">Secure seat reservation</span>
          <h1>Reserve your cohort seat</h1>
          <p class="checkout-lede">You are reserving one seat in the AI Systems Programming Lab. Card payment is processed securely through Square; learner onboarding details come next after payment is confirmed.</p>
          <div class="square-status" data-square-status>
            <strong>Square payment setup pending</strong>
            <span>Add Square credentials to enable live card payments. Until then, checkout stays in preview mode.</span>
          </div>
          <div class="checkout-product-strip">
            <div>
              <strong>AI Systems Programming Lab</strong>
              <span>6 weeks · 12 live sessions · 25-seat cohort</span>
            </div>
            <b>$369</b>
          </div>
          <div class="form-stack payment-fields">
            <label>Name on Card<input data-checkout-field="cardholderName" autocomplete="cc-name" placeholder="Nathan Baker" /></label>
            <label>Email<input data-checkout-field="buyerEmail" autocomplete="email" placeholder="autonate.ai@gmail.com" type="email" /></label>
          </div>
          <div class="square-card-label">
            <strong>Card Info</strong>
            <span>Encrypted and processed by Square</span>
          </div>
          <div class="square-card-container" data-square-card><span>Loading secure card fields...</span></div>
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
    <footer class="minimal-footer">&copy; 2026 AutoNateAI. Workforce Systems Programming Lab.</footer>
    ${dataScript(data)}
  `;

  return pageShell({
    title: "Checkout | AutoNateAI",
    active: "checkout",
    body,
    mode: "checkout",
    canonicalPath: "/checkout",
    robots: "noindex,nofollow",
  });
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
      <section class="student-onboarding-card">
        <div>
          <span class="kicker">Next step</span>
          <h2>Add student details</h2>
          <p>Tell us who the seat is for so onboarding, setup notes, and cohort access can be pointed to the right student.</p>
        </div>
        <form class="form-stack student-info-form" data-student-info-form>
          <div class="two-col">
            <label>Student Name<input data-student-field="studentName" autocomplete="off" placeholder="JORDAN RIVERA" required /></label>
            <label>Student Email<input data-student-field="studentEmail" autocomplete="email" placeholder="jordan@example.com" type="email" required /></label>
          </div>
          <button class="primary-button" type="submit">Save Student Info ${icon("arrow_forward")}</button>
          <p class="fine-print" data-student-info-status></p>
        </form>
      </section>
      <section class="section compact">
        <h2>Program details</h2>
        <div class="mini-grid">${recommendations.map((p) => miniProgramCard(p)).join("")}</div>
      </section>
    </main>
    ${dataScript(data)}
  `;

  return pageShell({
    title: "Enrollment Confirmed | AutoNateAI",
    active: "success",
    body,
    canonicalPath: "/success",
    robots: "noindex,nofollow",
  });
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

function chunkSessions(sessions, size) {
  const chunks = [];
  for (let index = 0; index < sessions.length; index += size) {
    chunks.push(sessions.slice(index, index + size));
  }
  return chunks;
}

function weekCard(index, sessions) {
  const weekMeta = [
    ["Setup and first code", "Meet the world, map the colony system, and see your first code become visible behavior you can protect and improve."],
    ["Functions and decisions", "Turn repeated actions into reusable behaviors and teach the colony to make choices when conditions change."],
    ["Git and debugging", "Learn how real builders protect progress, investigate failures, and recover working versions when a live system breaks."],
    ["APIs, Memory, and roles", "Connect game objects, persistent memory, and role-based design to how software systems communicate, remember, and divide work."],
    ["Automation and Codex", "Use automation and AI support to improve the bot while staying responsible for the decisions your system makes."],
    ["Tournament prep and battle day", "Tune a battle branch and test the system against another colony under competitive pressure."],
  ][index] || [`Week ${index + 1}`, "Keep improving the colony system."];
  const [title, summary] = weekMeta;

  return `
    <article class="week-card">
      <div class="week-card-head">
        <span>Week ${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(summary)}</p>
      </div>
      <div class="week-session-list">
        ${sessions
          .map(
            (session) => `
          <details>
            <summary><b>${String(session.number).padStart(2, "0")}</b><span>${escapeHtml(session.name.replace(/^Session \d+:\s*/, ""))}</span></summary>
            <p>${escapeHtml(session.objectives)}</p>
            <div class="week-session-detail"><span><strong>Live:</strong> ${escapeHtml(session.liveActivity)}</span><span><strong>Homework:</strong> ${escapeHtml(session.homework)}</span></div>
          </details>
        `,
          )
          .join("")}
      </div>
    </article>
  `;
}

function programFeature(program, extraClass = "", imageIndex = program.sequence + 1, showOverlay = false) {
  const offering = program.offerings?.[0];
  const price = offering ? money(offering.price) : "$369";
  const checkoutHref = offering ? `/checkout?program=${program.handle}&offering=${offering.id}` : "/checkout";

  return `
    <article class="program-feature ${extraClass}">
      <a class="program-feature-media" href="/programs/${program.handle}">
        <img src="${shot(imageIndex)}" alt="Screeps colony system preview" />
        ${
          showOverlay
            ? `<div class="program-media-callout">
          <span>${icon("flag")} Tournament capstone</span>
          <strong>Build the colony. Battle the code.</strong>
          <p>Students finish by running their Screeps bots head-to-head in AutoNateAI capture-the-flag.</p>
        </div>`
            : ""
        }
      </a>
      <div class="program-feature-body">
        <div class="program-feature-topline">
          <span class="status-pill ${program.status === "Active" ? "live" : ""}">${statusLabel(program.status)}</span>
          <span>${program.durationWeeks || 6} weeks &middot; 12 live sessions &middot; Virtual</span>
        </div>
        <h3>${escapeHtml(program.name)}</h3>
        <p>${escapeHtml(program.description)}</p>
        <div class="cohort-date-row compact">
          ${cohortBadge(program)}
          <span>${escapeHtml(program.cohortNote || "")} ${cohortCapacity(program)}. Dedicated AutoNateAI Discord channel included for coding, Screeps, hackathons, and industry networking.</span>
        </div>
        <div class="program-feature-points">
          <span>Screeps colony bot</span>
          <span>Student Git repo</span>
          <span>${cohortCapacity(program)}</span>
          <span>Discord cohort channel</span>
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
