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
            <h1>Build smarter systems with AI, then prove them in competition.</h1>
            <p>Use JavaScript and AI to design a colony that can gather resources, make decisions, recover from failures, and compete in Screeps capture-the-flag. You will learn how to read a live environment, turn game mechanics into architecture, and explain why your system works under pressure.</p>
            <div class="cohort-date-row">
              ${cohortBadge(primaryProgram)}
              <span>${escapeHtml(primaryProgram.cohortNote || "")} Each cohort is capped at ${cohortCapacity(primaryProgram)} and gets a dedicated AutoNateAI Discord channel for setup help, colony design questions, Codex review, tournament prep, and build support between sessions.</span>
            </div>
            <div class="button-row">
              <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seat for ${primaryPrice} ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="/programs/${primaryProgram.handle}">See what you build</a>
            </div>
          </div>
          <aside class="hero-program-panel">
            <img src="${shot(3)}" alt="Screeps room showing a coded colony system" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("sports_esports")} What they build</span>
              <h2>Learn the mechanics. Design the system. Battle through code.</h2>
              <p>Turn Screeps strategy into engineering habits, then prepare for AutoNateAI capture-the-flag where colonies battle head-to-head.</p>
              <div class="hero-facts">
                <span>System design practice</span>
                <span>${cohortCapacity(primaryProgram)}</span>
                <span>Screeps bot repo</span>
                <span>CTF tournament week</span>
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
            <p>Every system-design choice connects to a colony you can see: environment signals become state, game objects become components, roles become architecture, Git protects strategy experiments, and automation helps the colony scale under pressure.</p>
          </div>
          <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
        <div class="value-grid">
          <article><span>${icon("functions")}</span><h3>Code that operates</h3><p>Existing coding knowledge gets applied to live colony mechanics: creeps, spawns, sources, controllers, memory, terrain, and hostile pressure.</p></article>
          <article><span>${icon("account_tree")}</span><h3>Git like engineers</h3><p>Commit working bot versions, read diffs, recover from broken strategy changes, and leave with a visible repo history.</p></article>
          <article><span>${icon("hub")}</span><h3>APIs and automation</h3><p>Screeps game objects make API thinking concrete while spawn logic, roles, Memory, and room state drive automation loops.</p></article>
          <article><span>${icon("forum")}</span><h3>Cohort build support</h3><p>Use Discord for setup help, Codex review, colony design questions, tournament prep, and build support between live sessions.</p></article>
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
                <p>See whether your architecture can keep making good decisions when another coded colony is trying to win.</p>
              </div>
            </div>
            <div class="button-row compete-actions">
              <a class="primary-button" href="${primaryCheckoutHref}">Get the Course ${icon("arrow_forward")}</a>
              <a class="outline-button" href="/programs/${primaryProgram.handle}">View Curriculum</a>
            </div>
          </div>
          <div class="compete-copy">
            <span class="kicker">${icon("emoji_events")} Design, Build, Battle</span>
            <h2>Design a colony system, then battle against other people's systems.</h2>
            <p>This is for people who are comfortable reading and modifying code. The work is learning how to read the Screeps environment, understand its mechanics, compose the available components, design roles, manage state, automate decisions, and improve the system before tournament week. By the end, you are not just showing a project. You are running a colony built from your own architecture.</p>
            <div class="compete-curriculum">
              <article><b>01</b><span>Map the Screeps environment, mechanics, components, resources, and constraints.</span></article>
              <article><b>02</b><span>Design roles, state, memory, automation loops, and Git-backed strategy experiments.</span></article>
              <article><b>03</b><span>Spend the final week tuning and battling a tournament branch in AutoNateAI capture-the-flag.</span></article>
            </div>
          </div>
        </div>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="${shot(6)}" alt="Screeps combat room" /></div>
        <div>
          <span class="kicker">${icon("flag")} Capstone</span>
          <h2>${escapeHtml(league.season?.name || "Tournament Day")}</h2>
          <p>${escapeHtml(league.product?.cta || "")} The match makes the learning visible: your code has to read the room, manage resources, defend priorities, and keep making decisions while another colony pushes back.</p>
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
            <h2>For builders who want sharper engineering judgment.</h2>
            <p>These reads explain why Screeps works as a systems lab: the code controls real mechanics, the colony exposes weak assumptions, Git makes experiments recoverable, and competition proves whether the design holds up.</p>
          </div>
          <a class="primary-button" href="${primaryCheckoutHref}">Start Enrollment ${icon("arrow_forward")}</a>
        </div>
        <div class="article-grid">${landingArticles.map((article) => articleCard(article)).join("")}</div>
      </section>

      <section class="newsletter">
        <div>
          <h2>Reserve your seat for the next cohort.</h2>
          <p>${escapeHtml(primaryProgram.cohortNote || "New cohorts run every so often.")} The cohort is four weeks, virtual, Tuesdays and Thursdays from 6:30 PM to 8:30 PM Eastern, capped at ${cohortCapacity(primaryProgram)}, and supported inside a dedicated AutoNateAI Discord channel.</p>
          <form>
            <input placeholder="Enter your email" type="email" />
            <button type="button">Request Info</button>
          </form>
          <small>Screeps setup help, cohort workspace, Git repo guidance, Codex workflow support, and tournament-week support are included.</small>
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
      "A 4-week workforce systems program where developers and technical builders design colony systems, automate strategy, use Git and Codex responsibly, and battle in Screeps capture-the-flag.",
    ogTitle: "Code the colony. Train the architect.",
    ogDescription:
      "A 4-week JavaScript + Codex cohort where builders design Screeps colonies, manage chaos with Git, and settle architecture debates in capture-the-flag.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "AutoNateAI",
        "url": "https://autonateai.com",
        "description": "AutoNateAI teaches developers and technical builders to design software systems, use AI responsibly, and prove their architecture through Screeps competition.",
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
    ogTitle: "No worksheets. Colonies that fight back.",
    ogDescription:
      "Build a Screeps colony with JavaScript and Codex, then find out whether your system can still think when the match gets messy.",
  });
}

export function renderAbout() {
  const values = [
    ["Curiosity", "Builders should leave with sharper questions about how a system behaves, not just answers about syntax."],
    ["Systems", "We teach builders to see inputs, state, feedback loops, constraints, tradeoffs, and failure modes."],
    ["Integrity", "AI is powerful, but builders still need to understand, test, explain, and own their work."],
    ["Creation", "The goal is to build, battle-test, reflect, and improve, not passively consume technology."],
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
          <h1>We teach builders how to design systems that survive contact with reality.</h1>
          <p>AutoNateAI helps developers and technical builders practice the work behind good software: reading an environment, modeling state, designing components, using AI responsibly, testing assumptions, and explaining why the system behaves the way it does.</p>
          <div class="button-row">
            <a class="primary-button" href="/programs/ai-software-architect">View the Program ${icon("arrow_forward")}</a>
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
        <h2>Good code is not enough. The system has to work.</h2>
        <p>Professional engineers spend a lot of time reading unfamiliar systems, identifying constraints, debugging behavior, communicating tradeoffs, using Git, and deciding what should be automated next. AutoNateAI turns those habits into a live practice environment where the design either works or the colony exposes the gap.</p>
      </section>

      <section class="section compact about-split">
        <div>
          <span class="kicker">${icon("verified")} Why the training is different</span>
          <h2>Built from real engineering work, not generic coding practice.</h2>
          <p>For the last five years, Nathan has designed software systems, AI workflows, and software architectures used inside organizations where clarity, reliability, and communication matter. AutoNateAI turns those same engineering methods into a practical training ground.</p>
          <p>Before founding AutoNateAI, Nathan also taught Computer Security at the University of Michigan as an instructional aide, leading office hours, lab sections, and mentoring students through software security, networking, and systems problems.</p>
        </div>
        <div class="about-proof-list">
          ${experience.map(([title, text]) => `<article><span>${icon("work_history")}</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div></article>`).join("")}
        </div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("school")} Teaching Philosophy</span>
            <h2>Technology changes. Engineering judgment lasts.</h2>
            <p>Builders practice reading the environment first, designing before changing code, using AI with context, testing the result, and explaining the tradeoffs behind their decisions.</p>
          </div>
          <a class="primary-button" href="/programs/ai-software-architect">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
        <div class="value-grid about-value-grid">
          <article><span>${icon("account_tree")}</span><h3>Architecture</h3><p>Turn mechanics, components, state, and constraints into a system you can explain.</p></article>
          <article><span>${icon("bug_report")}</span><h3>Debugging</h3><p>Find the real cause of broken behavior by reading logs, state, and what the system visibly does.</p></article>
          <article><span>${icon("commit")}</span><h3>Git workflows</h3><p>Save strategy experiments, read diffs, recover working versions, and document design decisions.</p></article>
          <article><span>${icon("smart_toy")}</span><h3>AI collaboration</h3><p>Use AI to plan and review changes while staying responsible for the architecture and final explanation.</p></article>
        </div>
      </section>

      <section class="about-logos">
        <div>
          <span class="kicker">${icon("groups")} Engineering and education work</span>
          <h2>Experience across classrooms, companies, and technical training spaces.</h2>
          <p>AutoNateAI's work is shaped by engineering practice, teaching, workshops, outreach, and technology initiatives involving universities, companies, and community programs. The focus is not logos. The focus is helping builders think clearly, use AI responsibly, and prove their decisions through working systems.</p>
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
        <h2>Let's build stronger engineering judgment.</h2>
        <p>I grew up fascinated with technology because it gave me a way to turn ideas into something real. Over time, working across Microsoft, financial technology, AI, consulting, and education reinforced one lesson: the strongest builders are not just the people who can write code. They are the people who can understand a system.</p>
        <p>AutoNateAI exists because developers and technical builders deserve practice that feels closer to real engineering work: reading an environment, planning changes, using Git, debugging behavior, working with AI responsibly, and building projects that can fail in visible ways.</p>
        <p>If you are preparing for software, AI, automation, security, data, or technical leadership, I would love to build with you.</p>
        <strong>Nathan Baker<br /><span>Founder, AutoNateAI</span></strong>
      </section>

      <section class="section compact about-faq">
        <div class="section-head"><div><span class="kicker">${icon("help")} FAQ</span><h2>Common questions</h2></div></div>
        <div class="faq-grid">
          <article><h3>Is this for complete beginners?</h3><p>No. This is best for people who are comfortable reading and modifying code and want to become better at designing systems inside a live environment with components, constraints, resources, and competition.</p></article>
          <article><h3>How does AI fit into the class?</h3><p>You use AI to plan features, inspect code, explain errors, and review tradeoffs. AI speeds up the work, but it does not replace understanding.</p></article>
          <article><h3>Why use Screeps?</h3><p>Screeps makes software visible. You can see state, automation, feedback loops, failure, hostile pressure, resources, and strategy play out in a live world controlled by code.</p></article>
          <article><h3>Who is this built for?</h3><p>High school programmers, college CS students, junior software engineers, career switchers, and technical builders who want stronger systems thinking and AI-assisted engineering habits.</p></article>
        </div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("local_activity")} Current Program</span>
          <h2>AI Systems Programming Lab</h2>
          <p>A four-week workforce systems cohort where developers and technical builders design a Screeps colony, learn the game mechanics, automate strategy, use Git, collaborate with AI, and spend the final week in capture-the-flag tournament play.</p>
        </div>
        <a class="primary-button" href="/programs/ai-software-architect">Explore the Program ${icon("arrow_forward")}</a>
      </section>
    </main>
  `;

  return pageShell({
    title: "About AutoNateAI | AI Systems Engineering Practice",
    active: "about",
    body,
    canonicalPath: "/about",
    ogImage: "/assets/nathan-baker.jpeg",
    description:
      "AutoNateAI teaches developers and technical builders to design systems, use AI responsibly, debug behavior, and prove their work through Screeps competition.",
    ogTitle: "Meet the engineer behind the colony lab.",
    ogDescription:
      "AutoNateAI turns real engineering habits into a Screeps systems lab where builders design, debug, commit, and compete through code.",
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
            <nav class="breadcrumbs program-hero-breadcrumbs"><a href="/">Home</a><span>/</span><a href="/programs/ai-software-architect">Program</a><span>/</span><b>${escapeHtml(program.name)}</b></nav>
            <span class="kicker">${icon("emoji_events")} JavaScript + AI + CTF</span>
            <h1>${heroTitle}</h1>
            <p>This is where coding starts feeling like systems engineering. Use JavaScript and Codex to design a Screeps colony that reads the room, gathers resources, assigns roles, fixes problems, and makes decisions on its own. Then take that colony into capture-the-flag and see how your architecture performs when another coded system pushes back.</p>
            <div class="cohort-date-row">
              ${cohortBadge(program)}
              <span>${escapeHtml(program.cohortNote || "")} ${cohortCapacity(program)}. Dedicated AutoNateAI Discord included for setup help, Codex review, colony design questions, tournament prep, and build support between sessions.</span>
            </div>
            <div class="button-row">
              <a class="primary-button" href="${checkoutHref}">Reserve Seat for ${price} ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="#curriculum">View 8 Sessions</a>
            </div>
          </div>
          <aside class="hero-program-panel program-hero-panel">
            <img src="${gallery[1]}" alt="Screeps tournament strategy preview" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("sports_esports")} What You Build</span>
              <h2>A colony that has to think while the game keeps moving.</h2>
              <p>Learn the mechanics, design the architecture, keep decisions in Git, then tune a battle branch where every move, defense, and resource decision comes from code.</p>
              <div class="hero-facts">
                <span>${cohortCapacity(program)}</span>
                <span>${program.durationWeeks || 4} weeks</span>
                <span>Your Git repo</span>
                <span>Codex coaching</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="detail-proof-strip">
        <a href="${checkoutHref}"><b>${price}</b><span>Full 4-week cohort</span></a>
        <a href="${checkoutHref}"><b>${formatDate(program.startDate) || "Soon"}</b><span>Next cohort opens</span></a>
        <a href="#curriculum"><b>8</b><span>Live build sessions</span></a>
        <a href="#outcomes"><b>CTF</b><span>Tournament week</span></a>
      </section>

      <section class="section compact detail-sales-band" id="outcomes">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("architecture")} What Actually Changes</span>
            <h2>You start seeing code as a living system, not a file of instructions.</h2>
            <p>You learn the environment, turn game mechanics into components, design roles, automate decisions, debug failures, use Git checkpoints, and explain how the colony works under pressure. Screeps makes system design visible because your code has to survive, gather resources, respond to changing conditions, and compete.</p>
          </div>
          <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
        <div class="outcome-grid">
          <article><img src="${shot(2)}" alt="Screeps room with active creeps" /><h3>A colony with real behavior</h3><p>Harvesters, upgraders, builders, spawn logic, Memory, role behavior, and decisions shaped by the room.</p></article>
          <article><img src="${shot(4)}" alt="Screeps room showing system growth" /><h3>AI-assisted engineering habits</h3><p>Use Codex to plan and build faster while Git commits, diffs, README notes, and architecture notes keep the work explainable.</p></article>
          <article><img src="${shot(8)}" alt="Screeps map and room systems" /><h3>A tournament-ready branch</h3><p>Tune your colony for AutoNateAI capture-the-flag, then use Phase 2 league play as the next arena for improvement.</p></article>
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
          <p>He also taught Computer Security at the University of Michigan as an instructional aide. That mix of industry engineering and hands-on teaching shapes the program: you bring development experience, then practice how modern engineers read environments, design systems, debug behavior, use Git, collaborate with AI, and explain tradeoffs.</p>
          <div class="button-row">
            <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
            <a class="outline-button" href="/about">About AutoNateAI</a>
          </div>
        </div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("local_activity")} Live Cohort Seat</span>
          <h2>${price} for the full 4-week cohort</h2>
          <p>${escapeHtml(program.cohortNote || "")} Includes Screeps setup help, cohort workspace access, Git repo guidance, Codex workflow coaching, dedicated AutoNateAI Discord access, and tournament-week support.</p>
        </div>
        <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
      </section>

      <section class="section compact" id="curriculum">
        <div class="section-head">
          <div><h2>8 sessions from environment mapping to tournament battles.</h2><p>Because Screeps keeps running, you see the same pressures real software faces: unfamiliar environments, changing state, feedback loops, dependencies, automation, failure recovery, resource constraints, hostile actors, and performance under competition.</p></div>
          <a class="primary-button" href="${checkoutHref}">Get the Course ${icon("arrow_forward")}</a>
        </div>
        <div class="week-grid">
          ${sessionWeeks.map((sessions, index) => weekCard(index, sessions)).join("")}
        </div>
        <div class="detail-bottom-cta">
          <div><strong>Ready to join the cohort?</strong><span>Seats include all 8 live sessions, with the final week dedicated to tournament prep and capture-the-flag battles.</span></div>
          <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
      </section>

      ${
        related.length
          ? `<section class="section compact">
        <div class="section-head"><h2>Related cohorts</h2><a href="/programs/ai-software-architect">Back to program ${icon("arrow_forward")}</a></div>
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
    ogTitle: "AI Systems Programming Lab: your architecture has to survive.",
    ogDescription:
      "Use JavaScript and Codex to build a Screeps colony, tune the system in Git, and battle through capture-the-flag when another bot pushes back.",
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
          <a class="primary-button full ${available ? "" : "disabled"}" href="/programs/ai-software-architect">${available ? "Reserve Seat" : "Register Interest"}</a>
        </aside>
      </section>

      <section class="section compact">
        <div class="section-head"><div><h2>How it works</h2><p>The final week turns your colony architecture into head-to-head Screeps capture-the-flag. Phase 2 expands that tournament format into league play for builders who want to keep improving.</p></div><a class="primary-button" href="/programs/ai-software-architect">Get Seat ${icon("arrow_forward")}</a></div>
        <div class="league-how">
          <div><span class="material-symbols-outlined">account_tree</span><h3>Battle branch</h3><p>Submit a Git branch tuned for the tournament rules, game mechanics, resource map, and match server.</p></div>
          <div><span class="material-symbols-outlined">flag</span><h3>Capture the flag</h3><p>Colonies face off head-to-head. The bot has to move, defend, manage resources, make decisions, and react under pressure through code.</p></div>
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
    ogTitle: "Tournament Week: your code has to hold the flag.",
    ogDescription:
      "The capstone is code versus code: submit a battle branch, run your Screeps colony head-to-head, and explain what survived contact.",
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
          <h1>Read the system before you battle in it.</h1>
          <p>Strategy notes for builders using JavaScript, Codex, Git, and Screeps to design colonies that can operate, adapt, and compete in capture-the-flag.</p>
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
      "Articles and strategy notes about Screeps, AI-assisted development, Git, automation, capture-the-flag competition, and systems thinking.",
    ogTitle: "Field notes before the code battle.",
    ogDescription:
      "Read the Screeps mechanics, Git habits, Codex workflows, and system-design tradeoffs before your colony has to compete.",
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
    ogTitle: `${article.title} | Field Notes`,
    ogDescription: article.summary,
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
              <span>4 weeks · 8 live sessions · 25-seat cohort</span>
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
    ogImage: "/assets/og/ai-software-architect.jpg",
    description: "Reserve a seat in the AI Systems Programming Lab.",
    ogTitle: "Reserve the seat. Build the battle branch.",
    ogDescription:
      "Secure your spot in the 4-week JavaScript + Codex cohort where the final exam is a Screeps capture-the-flag match.",
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
            <a class="primary-button" href="/programs/ai-software-architect">View Program</a>
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
    ogImage: "/assets/og/ai-software-architect.jpg",
    description: "Enrollment confirmed for the AI Systems Programming Lab.",
    ogTitle: "Seat locked. Colony loading.",
    ogDescription:
      "Your AI Systems Programming Lab seat is reserved. Next comes setup, Git, Codex, colony design, and tournament prep.",
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
    ["Environment and system map", "Read the Screeps world, identify available components, and map the signals your colony needs to understand."],
    ["Components and decisions", "Turn game mechanics into reusable behaviors and teach the colony to make choices when conditions change."],
    ["Codex-assisted colony builds", "Use Codex with Screeps API context to build project-grade colony subsystems while keeping the architecture explainable."],
    ["Tournament week", "Tune a battle branch, play capture-the-flag, and analyze how code-driven strategy performs against another colony."],
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
          <details open>
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
          <p>Builders finish by running their Screeps colonies head-to-head in AutoNateAI capture-the-flag.</p>
        </div>`
            : ""
        }
      </a>
      <div class="program-feature-body">
        <div class="program-feature-topline">
          <span class="status-pill ${program.status === "Active" ? "live" : ""}">${statusLabel(program.status)}</span>
          <span>${program.durationWeeks || 4} weeks &middot; ${(program.sessions || []).length || 8} live sessions &middot; Virtual</span>
        </div>
        <h3>${escapeHtml(program.name)}</h3>
        <p>${escapeHtml(program.description)}</p>
        <div class="cohort-date-row compact">
          ${cohortBadge(program)}
          <span>${escapeHtml(program.cohortNote || "")} ${cohortCapacity(program)}. Dedicated AutoNateAI Discord included for setup help, Codex review, colony design questions, tournament prep, and build support.</span>
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
