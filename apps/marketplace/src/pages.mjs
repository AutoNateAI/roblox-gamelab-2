import { readFileSync } from "node:fs";
import {
  articles,
  bankEngagementLadder,
  bankingOfferings,
  foundingBankPilot,
  sceneShots,
  targetUniversities,
  tutorialPacks,
  tutorials,
} from "./data.mjs";
import {
  escapeHtml,
  icon,
  money,
  offeringCard,
  pageShell,
  statusLabel,
} from "./components.mjs";

function shot(index) {
  return sceneShots[index % sceneShots.length];
}

function packMedia(pack, index) {
  if (pack.heroImage) return `<img src="${pack.heroImage}" alt="" />`;
  if (pack.heroShotIndex === undefined || pack.heroShotIndex === null) {
    return `<div class="media-icon-tile"><span class="material-symbols-outlined">${escapeHtml(pack.icon)}</span></div>`;
  }
  return `<img src="${shot(index ?? pack.heroShotIndex)}" alt="" />`;
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
  const primaryPrice = primaryOffering ? money(primaryOffering.price) : "$499";
  const primaryCheckoutHref = primaryOffering
    ? `/checkout?program=${primaryProgram.handle}&offering=${primaryOffering.id}`
    : `/programs/${primaryProgram.handle}`;
  const landingArticles = [
    "coding-as-workforce-development",
    "systems-thinking-through-code",
    "why-git-matters-for-builders",
  ]
    .map((handle) => articles.find((article) => article.handle === handle))
    .filter(Boolean);

  const body = `
    <main>
      <section class="home-hero">
        <div class="hero-bg"><img src="/assets/landing/hero-simulation.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("hub")} Software Systems + Simulated Populations</span>
            <h1>Don't just build the software. Simulate the people who'll use it.</h1>
            <p>AutoNateAI trains first- and second-year CS students to build real software, then simulate the people who'll use it — reverse-engineered from MatrAIx's persona architecture. We sell that same discipline to community and regional banks as AutoNateAI Consulting.</p>
            <div class="cohort-date-row">
              ${cohortBadge(primaryProgram)}
              <span>${escapeHtml(primaryProgram.cohortNote || "")} Capped at ${cohortCapacity(primaryProgram)}.</span>
            </div>
            <div class="button-row">
              <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seat for ${primaryPrice} ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="https://discord.gg/4HkkuntdSs">Join the Discord ${icon("open_in_new")}</a>
            </div>
          </div>
          <aside class="hero-program-panel">
            <img src="/assets/landing/hero-simulation.jpg" alt="" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("account_tree")} Two Pillars, One Discipline</span>
              <h2>Programming for CS students. Consulting for banks.</h2>
              <p>Free tutorial packs and a live cohort train the skill. AutoNateAI Consulting sells it to the banks who hire us.</p>
              <div class="hero-facts">
                <span>4 tutorial packs</span>
                <span>2-week cohort</span>
                <span>Bank consulting</span>
                <span>Discord community</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("public")} Why this works</span>
            <h2>Real systems make architecture visible.</h2>
            <p>Requirements become data models, decisions become components, Git protects every experiment, and every AI-generated change gets reviewed, not blindly trusted. It's the same discipline whether you're a CS student shipping your first simulated population or a bank running one of our consulting offerings.</p>
          </div>
          <a class="primary-button" href="${primaryCheckoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
        <div class="value-grid">
          <article><span>${icon("functions")}</span><h3>Code that ships</h3><p>Existing coding knowledge gets applied to a real system: databases, APIs, architecture, and the tradeoffs that come with a real organization depending on it.</p></article>
          <article><span>${icon("account_tree")}</span><h3>Git like engineers</h3><p>Commit working versions, read diffs, recover from broken changes, and leave with a visible repo history that explains the system.</p></article>
          <article><span>${icon("hub")}</span><h3>Databases and APIs</h3><p>Design relational and graph data models, build the API that serves them, and document how it fits together with Mermaid diagrams.</p></article>
          <article><span>${icon("forum")}</span><h3>A real community</h3><p>Use Discord for setup help, architecture reviews, agent workflow coaching, simulation design, and Saturday Live Builds with other systems developers.</p></article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("auto_stories")} The Four Pillars</span>
            <h2>Four free packs. The exact systems this community builds.</h2>
            <p>Each pack is a standalone, story-driven guide following Nate and Kai as they build AutoNateAI from a meetup back room to a real, shipped system. Read one, or read all four for the full arc.</p>
          </div>
          <a class="primary-button" href="/tutorials">Browse Tutorials ${icon("arrow_forward")}</a>
        </div>
        <div class="pack-grid">${tutorialPacks.map((pack) => packCard(pack)).join("")}</div>
      </section>

      <section class="section compete-section">
        <div class="compete-layout">
          <div class="compete-visual">
            <div class="compete-media">
              <img src="/assets/landing/design-build-ship.jpg" alt="A developer at a multi-monitor desk designing a system architecture diagram" />
              <div class="compete-callout">
                <span>${icon("flag")} Live capstone</span>
                <strong>A real system, built live</strong>
                <p>See whether your architecture can hold up when a real organization is the one depending on it.</p>
              </div>
            </div>
            <div class="button-row compete-actions">
              <a class="primary-button" href="${primaryCheckoutHref}">Get the Course ${icon("arrow_forward")}</a>
              <a class="outline-button" href="/programs/${primaryProgram.handle}">View Curriculum</a>
            </div>
          </div>
          <div class="compete-copy">
            <span class="kicker">${icon("emoji_events")} Design, Build, Ship</span>
            <h2>Design a real system, then ship it for a real organization.</h2>
            <p>This is for builders who want to get sharper at directing AI agents: designing data models and APIs, documenting architecture, and reverse-engineering the persona architecture behind research like MatrAIx to build a simulated population. By the end, you're pointing at a real system you designed, built, and simulation-tested yourself.</p>
            <div class="compete-curriculum">
              <article><b>01</b><span>Set up Claude Code and Codex, and learn to engineer prompts and context for real projects.</span></article>
              <article><b>02</b><span>Design databases and APIs, and document architecture with Mermaid diagrams.</span></article>
              <article><b>03</b><span>Spend the second week building a simulated population and shipping a system built live against it.</span></article>
            </div>
          </div>
        </div>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="/assets/landing/live-builds-spotlight.jpg" alt="A team on a video call collaboratively building software, screen-sharing a system diagram and code" /></div>
        <div>
          <span class="kicker">${icon("flag")} Every Saturday</span>
          <h2>${escapeHtml(league.season?.name || "Live Builds")}</h2>
          <p>${escapeHtml(league.product?.cta || "")} Come watch, ask questions, or build along as a real bank workflow and its simulated population take shape.</p>
          <div class="stat-grid">
            <div><strong>${escapeHtml(league.season?.format || "Sat 10-12 CST, Discord")}</strong><span>Format</span></div>
            <div><strong>Free</strong><span>Open to Everyone</span></div>
          </div>
          <div class="button-row">
            <a class="primary-button" href="https://discord.gg/4HkkuntdSs">Join the Discord ${icon("open_in_new")}</a>
            <a class="outline-button" href="/live-builds">See How It Works</a>
          </div>
        </div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("business_center")} Where It Leads</span>
            <h2>Live Builds prove the skill. Consulting is where it becomes client work.</h2>
            <p>Live Builds are public practice: building the simulated populations and software behind AutoNateAI's real banking consulting offerings, every Saturday. AutoNateAI Consulting is the separate, private practice where that same engineering discipline builds real custom software for the banks who hire us. Builders who show up and do strong work get noticed — sometimes that means an introduction to real client work, or a partner organization hiring for these skills.</p>
          </div>
          <a class="primary-button" href="/consulting">See How It Works ${icon("arrow_forward")}</a>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("article")} Articles</span>
            <h2>Research, impact reports, and build notes.</h2>
            <p>We write up research on financial workflows and simulation, impact reports from our banking and sponsor partnerships, and behind-the-scenes notes on how these systems actually get built.</p>
          </div>
          <a class="primary-button" href="${primaryCheckoutHref}">Start Enrollment ${icon("arrow_forward")}</a>
        </div>
        <div class="article-grid">${landingArticles.map((article) => articleCard(article)).join("")}</div>
      </section>

      <section class="newsletter">
        <div>
          <h2>Reserve your seat for the next cohort.</h2>
          <p>${escapeHtml(primaryProgram.cohortNote || "New cohorts run every so often.")} The cohort is two weeks, virtual, Monday through Thursday, 6:00 PM-7:30 PM CST, capped at ${cohortCapacity(primaryProgram)}, and supported inside a dedicated AutoNateAI Discord channel.</p>
          <form>
            <input placeholder="Enter your email" type="email" />
            <button type="button">Request Info</button>
          </form>
          <small>Agent setup help, cohort workspace, Git repo guidance, architecture coaching, and simulation-build support are included.</small>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "AutoNateAI | Software Systems With AI Agents",
    active: "home",
    body,
    canonicalPath: "/",
    ogImage: "/assets/og/programs.jpg",
    description:
      "AutoNateAI is a community of systems developers who build production-worthy apps with agentic AI, then reverse-engineer the persona architecture behind research like MatrAIx to simulate the people who'll use them. Four free tutorial packs, a 2-week live cohort, and Saturday Live Builds in Discord.",
    ogTitle: "Don't just build the software. Simulate the people who'll use it.",
    ogDescription:
      "A community of systems developers, a 2-week live cohort, and Saturday Live Builds where builders design databases, APIs, and architecture with Claude Code and Codex, then build a simulated population — reverse-engineered from research like MatrAIx — and ship a real system against it.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "AutoNateAI",
        "url": "https://autonateai.com",
        "description": "AutoNateAI teaches developers and technical builders to design real software systems, direct AI agents responsibly, and prove their architecture by shipping real systems.",
      },
    ],
  });
}

export function renderPrograms(data) {
  const { path, programs } = data;
  const body = `
    <main class="programs-page">

      ${programs.map((program) => programFeature(program, "program-page-feature", true)).join("")}
    </main>
  `;

  return pageShell({
    title: "Programs | AutoNateAI",
    active: "programs",
    body,
    canonicalPath: "/programs",
    ogImage: "/assets/og/programs.jpg",
    description: path.description,
    ogTitle: "No worksheets. Real systems for real organizations.",
    ogDescription:
      "Design a real system with Claude Code and Codex, then find out whether it holds up when a real organization is depending on it.",
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
          <p>AutoNateAI helps first- and second-year CS students, bootcamp builders, and self-taught developers practice the work behind good software: reading an environment, modeling state, designing components, using AI agents responsibly, testing assumptions, and explaining why the system behaves the way it does.</p>
          <div class="button-row">
            <a class="primary-button" href="/programs/ai-agent-systems">View the Program ${icon("arrow_forward")}</a>
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
        <p>AutoNateAI's vision is that more people become system architects: not just software architects, but people who can design the systems around them, technical and civic alike. Software is the vehicle because AI now makes it fast and cheap to build. Professional engineers spend their time reading unfamiliar systems, identifying constraints, debugging behavior, communicating tradeoffs, using Git, and deciding what should be automated next. AutoNateAI turns those habits into a live practice environment where the design either works or the real system exposes the gap.</p>
        <p>In August 2026, we reverse-engineered <a href="https://arxiv.org/abs/2608.04205" target="_blank" rel="noopener">MatrAIx</a> — the Harvard- and MIT-led system that simulates 8.3 billion AI personas — and built our own version of it. AutoNateAI doesn't just teach people to build software; it teaches them to simulate the borrowers, employees, and customers that software actually serves, and test against them before anything ships.</p>
        <p>That practice environment is not hypothetical. Live Builds put real, simulation-driven bank workflows in front of the community every Saturday. <a href="/consulting">AutoNateAI Consulting</a> is the private practice where that same discipline builds real software for the banks who hire us — and standout builders get noticed.</p>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="/assets/landing/nate-and-kai.jpg" alt="Nate and Kai, the two builders behind the AutoNateAI tutorial packs" /></div>
        <div>
          <span class="kicker">${icon("auto_stories")} The Free Tutorial Packs</span>
          <h2>The same mission, told as a story: meet Nate and Kai.</h2>
          <p>The four free tutorial packs follow Nate and Kai, two builders founding a studio from a meetup back room to a real, shipped system, learning JavaScript, AI agents, databases, and civic tech along the way. It's the same engineering practice this page describes, just easier to actually finish reading.</p>
          <div class="button-row">
            <a class="primary-button" href="/tutorials">Read the Tutorial Packs ${icon("arrow_forward")}</a>
          </div>
        </div>
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
          <a class="primary-button" href="/programs/ai-agent-systems">Reserve Seat ${icon("arrow_forward")}</a>
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
          <article><h3>Is this for complete beginners?</h3><p>The free tutorial packs start from zero. The paid program is best once you are comfortable reading and modifying code and want to get sharper at designing systems: data models, APIs, and architecture.</p></article>
          <article><h3>How does AI fit into the class?</h3><p>You use agents like Claude Code and Codex to plan features, inspect code, explain errors, and review tradeoffs. AI speeds up the work, but it does not replace understanding.</p></article>
          <article><h3>Why build real systems instead of exercises?</h3><p>A real bank workflow and the simulated population you build to test it make tradeoffs visible in a way an exercise can't. You can see requirements, constraints, feedback, failure, and whether your design actually holds up against the people who'd use it.</p></article>
          <article><h3>Who is this built for?</h3><p>First- and second-year CS and CS-adjacent students, also open to coding bootcamp participants, self-taught builders, career switchers, and technical builders who want stronger systems thinking and AI-assisted engineering habits.</p></article>
        </div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("local_activity")} Current Program</span>
          <h2>How to Create Software Systems with AI Agents</h2>
          <p>A two-week live cohort, Monday through Thursday, where builders design databases, APIs, and architecture with Claude Code and Codex, use Git, and spend the second week building a simulated population, reverse-engineered from research like MatrAIx, and shipping a real system tested against it.</p>
        </div>
        <a class="primary-button" href="/programs/ai-agent-systems">Explore the Program ${icon("arrow_forward")}</a>
      </section>
    </main>
  `;

  return pageShell({
    title: "About AutoNateAI | AI-Agent Systems Engineering Practice",
    active: "about",
    body,
    canonicalPath: "/about",
    ogImage: "/assets/nathan-baker.jpeg",
    description:
      "AutoNateAI teaches first- and second-year CS students to design systems and direct AI agents responsibly, then reverse-engineers the persona architecture behind research like MatrAIx to simulate who that software actually serves — the same discipline sold to community and regional banks as consulting.",
    ogTitle: "Meet the engineer behind the program.",
    ogDescription:
      "Real engineering habits, a reverse-engineered MatrAIx-style simulation practice, and one discipline split two ways: training for CS students, consulting for community and regional banks.",
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
  const gallery = ["/assets/landing/hero-bg.jpg", "/assets/landing/what-they-build.jpg", "/assets/landing/agent-review.jpg"];
  const offering = program.offerings?.[0];
  const price = offering ? money(offering.price) : "$499";
  const checkoutHref = offering ? `/checkout?program=${program.handle}&offering=${offering.id}` : "/checkout";
  const sessionWeeks = chunkSessions(program.sessions || [], 4);
  const heroTitle = escapeHtml(program.name);

  const body = `
    <main class="product-detail-page">
      <section class="home-hero program-detail-hero">
        <div class="hero-bg"><img src="${gallery[0]}" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <nav class="breadcrumbs program-hero-breadcrumbs"><a href="/">Home</a><span>/</span><a href="/programs/${program.handle}">Program</a><span>/</span><b>${escapeHtml(program.name)}</b></nav>
            <span class="kicker">${icon("school")} Built for First- and Second-Year CS Students</span>
            <h1>${heroTitle}</h1>
            <p>Most intro CS sequences are still teaching syntax and test suites. This program gets you there years early: use Claude Code and Codex to design a real system, then reverse-engineer the persona architecture behind MatrAIx to build a simulated population and see how your system holds up against it.</p>
            <div class="cohort-date-row">
              ${cohortBadge(program)}
              <span>${escapeHtml(program.cohortNote || "")} ${cohortCapacity(program)}. Dedicated AutoNateAI Discord included for setup help, architecture reviews, agent workflow coaching, and build support between sessions.</span>
            </div>
            <div class="button-row">
              <a class="primary-button" href="${checkoutHref}">Reserve Seat for ${price} ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="#curriculum">View 8 Sessions</a>
            </div>
          </div>
          <aside class="hero-program-panel program-hero-panel">
            <img src="${gallery[1]}" alt="" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("sports_esports")} What You Build</span>
              <h2>A system that has to hold up while a real organization is watching.</h2>
              <p>Learn the tools, design the architecture, keep decisions in Git, then build the simulated population that tests your system and ship it live against them.</p>
              <div class="hero-facts">
                <span>${cohortCapacity(program)}</span>
                <span>${program.durationWeeks || 2} weeks</span>
                <span>Your Git repo</span>
                <span>Agent coaching</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="detail-proof-strip">
        <a href="${checkoutHref}"><b>${price}</b><span>Full ${program.durationWeeks || 2}-week cohort</span></a>
        <a href="${checkoutHref}"><b>${formatDate(program.startDate) || "Soon"}</b><span>Next cohort opens</span></a>
        <a href="#curriculum"><b>8</b><span>Live build sessions</span></a>
        <a href="#outcomes"><b>Sim</b><span>Simulated population week</span></a>
      </section>

      <section class="section compact school-proof-section" id="schools">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("public")} Where the Frontier Work Is Happening</span>
            <h2>Researchers at your school are already building agentic AI. Your intro courses probably aren't, yet.</h2>
            <p>In August 2026, 93 researchers across 39 institutional affiliations — MIT, Stanford, Harvard, Michigan, and dozens more — published <a href="https://arxiv.org/abs/2608.04205" target="_blank" rel="noopener">MatrAIx</a>, a system that simulates 8.3 billion AI personas to test how real products actually behave. That's the caliber of agentic-AI systems work already coming out of research labs at these schools. You don't have to wait for grad school, or for your curriculum to catch up, to start building with agents yourself.</p>
          </div>
        </div>
        <div class="tag-row school-tag-row">
          ${targetUniversities
            .map((school) => `<span class="${school.featured ? "school-featured" : ""}">${escapeHtml(school.name)}</span>`)
            .join("")}
        </div>
        <p class="industries-footnote">Nathan, who teaches this program, studied Computer Science at the University of Michigan — one of the 39.</p>
      </section>

      <section class="section compact detail-sales-band" id="outcomes">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("architecture")} What Actually Changes</span>
            <h2>You start seeing code as a living system, not a file of instructions.</h2>
            <p>You learn to direct AI agents, design data models and APIs, debug failures, and use Git checkpoints. Then you go further than most programs: reverse-engineer the persona architecture behind MatrAIx, build a simulated population of the people who'd use your system, and ship against it.</p>
          </div>
          <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
        <div class="outcome-grid">
          <article><img src="/assets/landing/api-data-model.jpg" alt="" /><h3>A system built for a real bank workflow</h3><p>Data models, API endpoints, agent workflows, and decisions shaped by one of AutoNateAI's actual banking consulting offerings.</p></article>
          <article><img src="/assets/landing/agent-review.jpg" alt="" /><h3>AI-assisted engineering habits</h3><p>Use Claude Code and Codex to plan and build faster while Git commits, diffs, README notes, and architecture notes keep the work explainable.</p></article>
          <article><img src="/assets/landing/live-builds-spotlight.jpg" alt="" /><h3>A simulated population you build yourself</h3><p>Reverse-engineer the persona-and-verifier pattern behind population-scale AI research like MatrAIx, then run your system against a synthetic population before it ships. Standout builders get noticed — sometimes that means real work on <a href="/consulting">AutoNateAI Consulting</a>'s banking offerings.</p></article>
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
          <h2>${price} for the full ${program.durationWeeks || 2}-week cohort</h2>
          <p>${escapeHtml(program.cohortNote || "")} Includes agent setup help, cohort workspace access, Git repo guidance, architecture coaching, dedicated AutoNateAI Discord access, and live build-week support.</p>
        </div>
        <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
      </section>

      <section class="section compact" id="curriculum">
        <div class="section-head">
          <div><h2>8 sessions from meeting your agents to shipping a real system.</h2><p>Because you're building a real bank workflow and the simulated population that tests it, you see the same pressures real software faces: unfamiliar environments, changing requirements, dependencies, automation, failure recovery, resource constraints, and performance under real deadlines.</p></div>
          <a class="primary-button" href="${checkoutHref}">Get the Course ${icon("arrow_forward")}</a>
        </div>
        <div class="week-grid">
          ${sessionWeeks.map((sessions, index) => weekCard(index, sessions)).join("")}
        </div>
        <div class="detail-bottom-cta">
          <div><strong>Ready to join the cohort?</strong><span>Seats include all 8 live sessions, with the final week dedicated to building your simulated population and shipping a real system against it.</span></div>
          <a class="primary-button" href="${checkoutHref}">Reserve Seat ${icon("arrow_forward")}</a>
        </div>
      </section>

      ${
        related.length
          ? `<section class="section compact">
        <div class="section-head"><h2>Related cohorts</h2><a href="/programs/${program.handle}">Back to program ${icon("arrow_forward")}</a></div>
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
    ogTitle: "For first- and second-year CS students: your architecture has to survive a real simulated population.",
    ogDescription:
      "Use Claude Code and Codex to design a real system, tune it in Git, then reverse-engineer the persona architecture behind MatrAIx to build a simulated population and ship it live against them.",
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
  const league = data.league || {};
  const body = `
    <main class="league-page">
      <section class="home-hero league-detail-hero">
        <div class="hero-bg"><img src="/assets/landing/hero-bg.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("emoji_events")} AutoNateAI Live Builds</span>
          <h1>Real systems, real simulations, built live.</h1>
          <p>${escapeHtml(league.product?.cta || "")} Anyone in the Discord can watch, ask questions, and follow along.</p>
          <div class="button-row">
            <a class="primary-button" href="https://discord.gg/4HkkuntdSs">Join the Discord ${icon("open_in_new")}</a>
            <a class="secondary-button" href="/programs/ai-agent-systems">View the Program</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/design-build-ship.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("flag")} Schedule</span>
            <h2>Saturdays, 10 AM-12 PM CST</h2>
            <p>Every Saturday, 10:00 AM-12:00 PM CST, live in the AutoNateAI Discord. Pull up in the voice channel, or catch the replay after.</p>
            <div class="hero-facts">
              <span>Simulation-driven</span>
              <span>No lecturing</span>
              <span>Discord-only</span>
              <span>Open to everyone</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <section class="league-grid">
        <article class="league-rules">
          <span class="kicker">${icon("sports_esports")} The Format</span>
          <h2>A real bank workflow. A real simulation. No script.</h2>
          <p>Every session starts with one of AutoNateAI's real banking offerings — commercial lending intelligence, fraud simulation, whatever's next. The team designs a small simulated population for it, reverse-engineered from MatrAIx's persona architecture, then builds the software live in Discord.</p>
          <p>${escapeHtml(league.season?.winCondition || "")}</p>
          <p>It's a real simulated population and a real system, built in public with nothing cut. <a href="/consulting">AutoNateAI Consulting</a> is the private practice where that same discipline builds real software for the banks who hire us — and standout builders get noticed.</p>
        </article>
        <aside class="league-facts">
          <div><span>Sat</span><b>10:00 AM-12:00 PM CST</b></div>
          <div><span>Where</span><b>AutoNateAI Discord</b></div>
          <div><span>Mode</span><b>${escapeHtml(league.season?.format || "Simulation + Live Build")}</b></div>
          <div><span>Status</span><b class="status-pill live">${escapeHtml(league.season?.status || "Active")}</b></div>
          <a class="primary-button full" href="https://discord.gg/4HkkuntdSs">Join the Discord</a>
        </aside>
      </section>

      <section class="section compact league-section">
        <div class="section-head"><div><span class="kicker">${icon("visibility")} What You'll See</span><h2>Not a highlight reel. The actual process.</h2><p>Every session is the real thing: real requirements, real dead ends, real fixes. Nothing is rehearsed and nothing is cut.</p></div></div>
        <div class="league-how league-awards">
          <div><span class="material-symbols-outlined">travel_explore</span><h3>Picking the Workflow</h3><p>One of AutoNateAI's real banking offerings gets picked apart into what the software needs to do and who it needs to work for.</p></div>
          <div><span class="material-symbols-outlined">smart_toy</span><h3>Agent-Directed Builds</h3><p>Real prompts, real context, real review of what the agent got right and what needed a fix.</p></div>
          <div><span class="material-symbols-outlined">account_tree</span><h3>System Architecture</h3><p>Data model and API decisions made out loud, with the tradeoffs explained as they happen.</p></div>
          <div><span class="material-symbols-outlined">bug_report</span><h3>Clutch Debugging</h3><p>The real bug, found live, fixed live, no cut scenes.</p></div>
          <div><span class="material-symbols-outlined">groups</span><h3>Persona Design</h3><p>A small simulated population takes shape: who they are, what they're trying to do, and how the system should respond.</p></div>
          <div><span class="material-symbols-outlined">flag</span><h3>Ship Day</h3><p>The moment a system goes from "in progress" to something tested against its simulated population and ready to show a bank.</p></div>
        </div>
      </section>

      <section class="league-gallery">
        <img src="/assets/landing/hero-simulation.jpg" alt="" />
        <img src="/assets/landing/live-builds-spotlight.jpg" alt="" />
        <img src="/assets/landing/agent-review.jpg" alt="" />
      </section>
    </main>
  `;

  return pageShell({
    title: "Live Builds | AutoNateAI",
    active: "live-builds",
    body,
    canonicalPath: "/live-builds",
    ogImage: "/assets/og/live-builds.jpg",
    description:
      "AutoNateAI Live Builds: every Saturday, 10 AM-12 PM CST, the community builds real software systems and the simulated populations that test them, live in Discord, mapped to real AutoNateAI banking offerings.",
    ogTitle: "AutoNateAI Live Builds: real systems, real simulations, built live.",
    ogDescription:
      "Saturdays, 10:00 AM-12:00 PM CST, live in Discord. A real bank workflow, a real simulated population, a real build, no script.",
  });
}

function bankPriceRange(offering) {
  const low = money(offering.priceLow);
  const high = offering.priceHigh ? money(offering.priceHigh) : "";
  return high ? `${low}&ndash;${high}` : low;
}

function bankOfferCard(offering) {
  return `
    <article class="industry-card offer-card">
      <div class="industry-card-icon">${icon(offering.icon)}</div>
      <h3>${escapeHtml(offering.name)}</h3>
      <p class="industry-hook">${escapeHtml(offering.hook)}</p>
      <ul class="industry-capabilities">
        ${offering.capabilities.map((item) => `<li>${icon("check")}<span>${escapeHtml(item)}</span></li>`).join("")}
      </ul>
      <p class="offer-transform">${escapeHtml(offering.transformation)}</p>
      <div class="offer-price"><b>${bankPriceRange(offering)}</b><span>${escapeHtml(offering.priceUnit)}</span></div>
    </article>
  `;
}

function bankLadderStrip() {
  return `
    <div class="badge-strip bank-ladder">
      ${bankEngagementLadder
        .map(
          (step, index) => `
            ${index > 0 ? `<div class="badge-connector"></div>` : ""}
            <div class="badge-step"><span>${escapeHtml(step.step)}</span><b>${escapeHtml(step.label)}</b></div>
          `,
        )
        .join("")}
    </div>
  `;
}

export function renderConsulting(data) {
  const pilot = foundingBankPilot;
  const slotsRemaining = Math.max(pilot.slotsTotal - pilot.slotsFilled, 0);
  const body = `
    <main class="league-page consulting-page">
      <section class="home-hero league-detail-hero">
        <div class="hero-bg"><img src="/assets/landing/design-build-ship.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("account_balance")} AutoNateAI Consulting for Community &amp; Regional Banks</span>
          <h1>Enterprise-grade AI systems, priced for a community bank's budget.</h1>
          <p>AutoNateAI Consulting builds AI workflow intelligence, simulation, and custom software for community and regional banks — the institutions with real operational complexity but without a 125-person AI R&D team like the big national banks have. Nathan built AI research and document/call-processing systems inside Veterans United Home Loans' AI R&D team. Same caliber of engineering, scoped and priced for a bank your size.</p>
          <div class="button-row">
            <a class="primary-button" href="#book">Book a Call ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="#offerings">See What We Offer</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/api-data-model.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("apartment")} For Bank Leadership</span>
            <h2>Bring us the workflow that's eating staff time. We'll show you what changes.</h2>
            <p>Commercial lending, document review, deposit ops, compliance — we model how it actually works today, simulate what a change would do, then build it if the numbers hold up.</p>
            <div class="hero-facts">
              <span>Fixed-scope pricing</span>
              <span>PII-aware by design</span>
              <span>Ex-Veterans United AI R&D</span>
              <span>No enterprise-length contracts</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <section class="section compact bank-ladder-section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("route")} How Engagements Grow</span>
            <h2>Most banking-AI vendors sell you a platform first. We start by studying how your bank actually works.</h2>
            <p>Every relationship starts small and earns its way up: research your real workflow, run a scoped pilot, build the production system, then stay on as a standing AI and data partner if it's a fit.</p>
          </div>
        </div>
        ${bankLadderStrip()}
      </section>

      <section class="section industries-section" id="offerings">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("apartment")} Offerings</span>
            <h2>Our Nine Service Offerings</h2>
            <p>Each one maps to a specific daily stress inside a bank, what we'd do about it, and a fixed price range for that scope.</p>
          </div>
        </div>
        <div class="industry-grid offer-grid">${bankingOfferings.map((offering) => bankOfferCard(offering)).join("")}</div>
        <p class="industries-footnote">Don't see your workflow listed? If it runs on data, documents, or decisions, we can probably help — <a href="#book">let's talk</a>.</p>
      </section>

      ${
        slotsRemaining > 0
          ? `<section class="detail-enroll-band pilot-band">
        <div>
          <span class="kicker">${icon("eco")} Founding Bank Pilot &mdash; ${escapeHtml(pilot.region)}</span>
          <h2><del>${money(pilot.standardPrice)}</del> ${money(pilot.pilotPrice)} for the ${escapeHtml(pilot.offeringName)}</h2>
          <p>Open to the first ${pilot.slotsTotal} community or regional banks in ${escapeHtml(pilot.region)} &mdash; ${pilot.slotsFilled} of ${pilot.slotsTotal} slots claimed. In exchange for founding pricing, partners get first access to every simulation we build and permission to use approved, anonymized results as a case study. Once all ${pilot.slotsTotal} slots are claimed, standard pricing takes over for everyone after.</p>
        </div>
        <a class="primary-button" href="#book">Claim a Founding Slot ${icon("arrow_forward")}</a>
      </section>`
          : ""
      }

      <section class="section compact" id="book">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("event")} Book a Call</span>
            <h2>Tell us what you're building.</h2>
            <p>Discovery calls are 15 or 30 minutes and are for organizations exploring whether AutoNateAI Consulting is a fit. Follow-ups run 30, 45, 60, 90, or 120 minutes for engagements already underway. Calls run 8:00 AM-6:00 PM Central, Monday-Friday.</p>
          </div>
        </div>
        <div class="book-layout">
          <form class="form-stack booking-card booking-form" data-booking-form>
            <div class="two-col">
              <label>Name<input data-booking-field="name" autocomplete="name" placeholder="Jordan Rivera" required /></label>
              <label>Email<input data-booking-field="email" autocomplete="email" type="email" placeholder="jordan@example.com" required /></label>
            </div>
            <label>Organization<input data-booking-field="organization" autocomplete="organization" placeholder="First State Community Bank" /></label>
            <div class="two-col">
              <label>Call Type
                <select data-booking-field="callType" data-booking-call-type required>
                  <option value="">Select one</option>
                  <option value="Discovery">Discovery</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </label>
              <label>Duration
                <select data-booking-field="duration" data-booking-duration required disabled>
                  <option value="">Pick a call type first</option>
                </select>
              </label>
            </div>
            <div class="two-col">
              <label>Preferred Date &amp; Time <small>(Central Time, 8 AM-6 PM)</small><input data-booking-field="preferredDateTime" type="datetime-local" required /></label>
              <label>Alternate Date &amp; Time <small>(Central Time, 8 AM-6 PM)</small><input data-booking-field="alternateDateTime" type="datetime-local" /></label>
            </div>
            <div class="two-col">
              <label>Your Timezone
                <select data-booking-field="timezone">
                  <option value="CST">Central (CST)</option>
                  <option value="EST">Eastern (EST)</option>
                  <option value="MST">Mountain (MST)</option>
                  <option value="PST">Pacific (PST)</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>How did you hear about us?
                <select data-booking-field="howHeard">
                  <option value="Met in Person / Networking Event">Met in Person / Networking Event</option>
                  <option value="Website">Website</option>
                  <option value="Founding Bank Pilot">Founding Bank Pilot</option>
                  <option value="Live Build">Live Build</option>
                  <option value="Referral">Referral</option>
                  <option value="RFP">RFP</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <label>What do you want out of this call?<textarea data-booking-field="goals" rows="3" placeholder="What decision or outcome are you hoping to walk away with?"></textarea></label>
            <label>Project / Organization Context<textarea data-booking-field="context" rows="3" placeholder="What are you building, or what does the RFP ask for?"></textarea></label>
            <button class="primary-button full" type="submit">Request the Call ${icon("arrow_forward")}</button>
            <p class="fine-print" data-booking-status>Prefer email? Write to <a href="mailto:autonate.ai@gmail.com?subject=AutoNateAI%20Consulting%20inquiry">autonate.ai@gmail.com</a>.</p>
          </form>
          <aside class="book-sidebar">
            <div class="book-sidebar-block">
              <span class="kicker">${icon("checklist")} What happens next</span>
              <ol>
                <li>We read what you send — no auto-reply, an actual read.</li>
                <li>You'll hear back within 1-2 business days to confirm a time.</li>
                <li>We meet, scope the real problem, and you get a straight answer on fit and cost.</li>
              </ol>
            </div>
            <div class="book-sidebar-block">
              <span class="kicker">${icon("verified")} Background</span>
              <p>Computer Science, University of Michigan. AI research and engineering inside Veterans United Home Loans' AI R&D team, plus financial-technology engineering at Citi and security engineering at Microsoft.</p>
              <a class="outline-button full" href="/about">About Nathan ${icon("arrow_forward")}</a>
            </div>
          </aside>
        </div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("local_activity")} Not ready to book yet?</span>
          <h2>See the engineering process before you commit to anything.</h2>
          <p>Watch how real systems get designed and built, live, every Saturday in the AutoNateAI Discord.</p>
        </div>
        <a class="primary-button" href="/live-builds">See Live Builds ${icon("arrow_forward")}</a>
      </section>
    </main>
  `;

  return pageShell({
    title: "Consulting for Community & Regional Banks | AutoNateAI",
    active: "consulting",
    body,
    canonicalPath: "/consulting",
    ogImage: "/assets/og/consulting.jpg",
    description:
      "AutoNateAI Consulting builds AI workflow intelligence, simulation, and custom software for community and regional banks, priced fixed-scope and scoped to a bank's budget, not an enterprise vendor contract.",
    ogTitle: "Enterprise-grade AI systems, priced for a community bank's budget.",
    ogDescription:
      "Nine fixed-scope offerings for community and regional banks, from workflow assessments to custom lending and compliance software, built by an engineer who worked inside Veterans United's AI R&D team.",
  });
}

export function renderTutorials() {
  const body = `
    <main class="tutorials-page">
      <section class="home-hero tutorials-detail-hero">
        <div class="hero-bg"><img src="/assets/landing/hero-bg.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("menu_book")} Free for First- and Second-Year CS Students</span>
          <h1>The reps your intro courses haven't gotten to yet.</h1>
          <p>If you're a first- or second-year CS (or CS-adjacent) student, you're deep in syntax and problem sets, nowhere near agentic AI or shipping a real system yet. These four free packs close that gap: follow Nate and Kai build AutoNateAI from a meetup back room to a shipped system, covering JavaScript from zero, prompt and context engineering, databases and graphs, and reading a real ask like an engineer. No enrollment, no cost, just the reps your program hasn't gotten to.</p>
          <div class="button-row">
            <a class="primary-button" href="/programs/ai-agent-systems">Take the Program ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/community">Ask in Discord</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/learning-path.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("terminal")} Built for Where You're At</span>
            <h2>Setup is free. System judgment is the program.</h2>
            <p>New to code, or just past your first data structures course? Start with Nate and Kai's story and learn JavaScript from zero, or jump into whichever pack matches what your classes haven't covered yet. Either way, the packs build toward the same system-architect habits the live program practices.</p>
            <div class="hero-facts">
              <span>${tutorialPacks.length} tutorial packs</span>
              <span>Copy-ready code</span>
              <span>Local setup</span>
              <span>Program pathway</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <section class="section pack-catalog-section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("view_module")} Pick a Pack</span>
            <h2>Each pack is a complete path, start to finish.</h2>
            <p>Open a pack to see its lessons in order. New packs show up here as they ship.</p>
          </div>
        </div>
        <div class="pack-grid">${tutorialPacks.map((pack) => packCard(pack)).join("")}</div>
      </section>
    </main>
  `;

  return pageShell({
    title: "Tutorial Packs | AutoNateAI",
    active: "tutorials",
    body,
    canonicalPath: "/tutorials",
    ogImage: "/assets/og/default.jpg",
    description:
      "Free tutorial packs for builders learning JavaScript fundamentals, prompt and context engineering, relational databases and graphs, and civics with agentic AI, following Nate and Kai as they build AutoNateAI.",
    ogTitle: "Tutorial packs before you go further.",
    ogDescription:
      "Start with Nate and Kai's story, then pick whichever pack matches what you're building next. Free guides, real curriculum, before you join the cohort.",
  });
}

export function renderTutorialPack(pack) {
  const items = tutorials.filter((tutorial) => tutorial.pack === pack.handle);
  const tracks = [...new Set(items.map((tutorial) => tutorial.track))];
  const comingSoon = pack.status !== "Active";

  const body = `
    <main class="tutorials-page pack-page">
      <nav class="breadcrumbs pack-breadcrumbs"><a href="/">Home</a><span>/</span><a href="/tutorials">Tutorials</a><span>/</span><b>${escapeHtml(pack.title)}</b></nav>
      <section class="home-hero tutorials-detail-hero">
        <div class="hero-bg">${packMedia(pack)}</div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon(pack.icon)} ${escapeHtml(pack.tagline)}</span>
          <h1>${escapeHtml(pack.title)}</h1>
          <p>${escapeHtml(pack.summary)}</p>
          <div class="button-row">
            <a class="primary-button" href="/programs/ai-agent-systems">Take the Program ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/tutorials">All Packs</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          ${packMedia(pack)}
          <div class="hero-panel-body">
            <span class="kicker">${icon("terminal")} This Pack</span>
            <h2>${comingSoon ? "Lessons are in progress." : "Work through it in order."}</h2>
            <p>${comingSoon ? "The outline below is locked in and full lessons are being written now." : "Each lesson builds on the last, from setup to competition-ready."}</p>
            <div class="hero-facts">
              <span>${items.length} lesson${items.length === 1 ? "" : "s"}</span>
              <span>${escapeHtml(packStatusLabel(pack))}</span>
              <span>Copy-ready code</span>
              <span>Program pathway</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <div class="docs-layout">
        <aside class="docs-sidebar">
          <strong>${escapeHtml(pack.title)}</strong>
          ${tracks.map((track) => `<a href="#${slugify(track)}">${escapeHtml(track)}</a>`).join("")}
          <a href="/tutorials">All Packs</a>
          <a href="/programs/ai-agent-systems">Full cohort</a>
        </aside>
        <div class="docs-content">
          ${comingSoon ? packStatusBanner() : ""}
          ${tracks.map((track) => tutorialTrack(track, items.filter((item) => item.track === track), pack)).join("")}
        </div>
      </div>
    </main>
  `;

  return pageShell({
    title: `${pack.title} | AutoNateAI Tutorials`,
    active: "tutorials",
    body,
    canonicalPath: `/tutorials/${pack.handle}`,
    ogImage: `/assets/og/tutorial-pack-${pack.handle}.jpg`,
    description: pack.summary,
    ogTitle: `${pack.title}: ${comingSoon ? "coming soon." : "start here."}`,
    ogDescription: pack.summary,
  });
}

export function renderTutorialDetail(pack, tutorial) {
  const markdown = readTutorialMarkdown(tutorial);
  const packTutorials = tutorials.filter((item) => item.pack === pack.handle);
  const currentIndex = packTutorials.findIndex((item) => item.handle === tutorial.handle);
  const prevTutorial = currentIndex > 0 ? packTutorials[currentIndex - 1] : null;
  const nextTutorial = currentIndex >= 0 && currentIndex < packTutorials.length - 1 ? packTutorials[currentIndex + 1] : null;
  const body = `
    <main class="tutorial-detail-page">
      <nav class="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/tutorials">Tutorials</a><span>/</span><a href="/tutorials/${pack.handle}">${escapeHtml(pack.title)}</a><span>/</span><b>${escapeHtml(tutorial.title)}</b></nav>
      <div class="tutorial-detail-layout">
        <aside class="docs-sidebar tutorial-detail-sidebar">
          <strong>${escapeHtml(pack.title)}</strong>
          ${packTutorials.map((item) => `<a class="${item.handle === tutorial.handle ? "active" : ""}" href="/tutorials/${pack.handle}/${escapeHtml(item.handle)}">${escapeHtml(item.episode)} ${escapeHtml(item.title)}${item.draft ? " (soon)" : ""}</a>`).join("")}
          <a href="/tutorials">All Packs</a>
          <a href="/programs/ai-agent-systems">Join the cohort</a>
          <a href="/community">Ask in Discord</a>
        </aside>
        <article class="tutorial-document">
          <header>
            <span class="kicker">${escapeHtml(tutorial.track)} / Tutorial ${escapeHtml(tutorial.episode)}${tutorial.draft ? ` <span class="draft-tag">Coming Soon</span>` : ""}</span>
            <h1>${escapeHtml(tutorial.title)}</h1>
            <p>${escapeHtml(tutorial.summary)}</p>
            <div class="tag-row">${tutorial.outcomes.map((outcome) => `<span>${escapeHtml(outcome)}</span>`).join("")}</div>
          </header>
          <div class="markdown-body">${markdownToHtml(stripFirstHeading(markdown))}</div>
          ${
            prevTutorial || nextTutorial
              ? `<nav class="tutorial-pager">
            ${prevTutorial ? `<a class="tutorial-pager-link prev" href="/tutorials/${pack.handle}/${escapeHtml(prevTutorial.handle)}">${icon("arrow_back")}<span><small>Previous</small>${escapeHtml(prevTutorial.title)}</span></a>` : "<span></span>"}
            ${nextTutorial ? `<a class="tutorial-pager-link next" href="/tutorials/${pack.handle}/${escapeHtml(nextTutorial.handle)}"><span><small>Next</small>${escapeHtml(nextTutorial.title)}</span>${icon("arrow_forward")}</a>` : "<span></span>"}
          </nav>`
              : ""
          }
          <footer class="tutorial-next-step">
            <div>
              <span class="kicker">${icon("architecture")} Want the architecture layer?</span>
              <h2>The free guide gets you moving. The cohort teaches the system to hold up.</h2>
              <p>Bring this into How to Create Software Systems with AI Agents to practice agent workflows, Git strategy, debugging under pressure, and shipping a real RFP-built system.</p>
            </div>
            <a class="primary-button" href="/programs/ai-agent-systems">View the Program ${icon("arrow_forward")}</a>
          </footer>
        </article>
      </div>
    </main>
  `;

  return pageShell({
    title: `${tutorial.title} | AutoNateAI Tutorials`,
    active: "tutorials",
    body,
    canonicalPath: `/tutorials/${pack.handle}/${tutorial.handle}`,
    ogImage: `/assets/og/tutorial-${tutorial.pack}-${tutorial.handle}.jpg`,
    description: tutorial.summary,
    ogTitle: `${tutorial.title}: keep the build moving.`,
    ogDescription: tutorial.summary,
  });
}

export function renderCommunity() {
  const body = `
    <main class="community-page">
      <section class="home-hero community-detail-hero">
        <div class="hero-bg"><img src="/assets/landing/hero-bg.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("groups")} AutoNateAI Community</span>
          <h1>A place to build, ask, debug, and talk systems all day.</h1>
          <p>The program is the structured path. The community is where the energy keeps moving: setup help, architecture questions, agent workflow reviews, RFP research, Live Build updates, and the kind of build chatter that turns one stuck builder into ten sharper ones.</p>
          <div class="button-row">
            <a class="primary-button" href="https://discord.gg/4HkkuntdSs">Join the Discord ${icon("open_in_new")}</a>
            <a class="secondary-button" href="/tutorials">Start Tutorials</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/community-discord.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("forum")} Discord</span>
            <h2>Join the build room.</h2>
            <p>Come for setup. Stay for the build reviews, live RFP research, strange bugs, and Live Build updates.</p>
            <div class="hero-facts">
              <span>Setup help</span>
              <span>Code review</span>
              <span>Agent prompts</span>
              <span>Live Build updates</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <section class="section compact community-section">
        <div class="section-head"><div><span class="kicker">${icon("forum")} What Happens There</span><h2>The lab does not go quiet between sessions.</h2><p>Builders need a place to compare notes while a real system is still breaking in interesting ways.</p></div></div>
        <div class="league-how community-grid">
          <div><span class="material-symbols-outlined">construction</span><h3>Setup Help</h3><p>Get unstuck on local setup, repo structure, first scripts, and the small configuration issues that can steal a whole afternoon.</p></div>
          <div><span class="material-symbols-outlined">code_blocks</span><h3>Code Review</h3><p>Share snippets, ask why something is broken, and learn how to explain the bug instead of just staring at it.</p></div>
          <div><span class="material-symbols-outlined">smart_toy</span><h3>Agent Prompts</h3><p>Practice asking AI agents for architecture help with enough context that the answer has a chance to be useful.</p></div>
          <div><span class="material-symbols-outlined">travel_explore</span><h3>RFP Research</h3><p>Trade notes on real RFPs and civic problems worth building toward, before the next Live Build session.</p></div>
          <div><span class="material-symbols-outlined">emoji_events</span><h3>Live Build Updates</h3><p>Follow along as Live Builds ship real systems, week after week, for real organizations.</p></div>
          <div><span class="material-symbols-outlined">edit_note</span><h3>Builder Notes</h3><p>Post reflections, architecture notes, and lessons learned so the whole community gets sharper.</p></div>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "Community | AutoNateAI",
    active: "community",
    body,
    canonicalPath: "/community",
    ogImage: "/assets/og/default.jpg",
    description:
      "Join the AutoNateAI Discord community for setup help, architecture questions, AI agent workflow reviews, RFP research, and Live Build updates.",
    ogTitle: "The systems lab has a Discord.",
    ogDescription:
      "Get setup help, code review, agent workflow practice, RFP research, and Live Build updates with the AutoNateAI community.",
  });
}

export function renderArticles() {
  const featuredArticle = articles.find((article) => article.handle === "systems-thinking-through-code");
  const listedArticles = articles.filter((article) => article.handle !== featuredArticle?.handle);
  const body = `
    <main class="articles-page">
      <div class="page-toolbar">
        <div>
          <span class="kicker">${icon("article")} Articles</span>
          <h1>Systems notes for CS students and bank leaders.</h1>
          <p>Written for first- and second-year CS students building real software, and for the community and regional banks putting AI to work responsibly. Expect research on financial workflows and simulation, impact reports from our banking and sponsor partnerships, and behind-the-scenes notes on how these systems actually get built.</p>
        </div>
      </div>
      ${featuredArticle ? featuredArticleCard(featuredArticle) : ""}
      <div class="content-tools">
        <label>${icon("search")} <input type="search" placeholder="Search articles, AI agents, systems, Git..." data-article-search /></label>
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
      "Research on financial workflows and simulation, impact reports from our banking and sponsor partnerships, and build notes for CS students and bank leaders working with agentic AI.",
    ogTitle: "Systems notes for CS students and bank leaders.",
    ogDescription:
      "Financial workflow research, banking and sponsor impact reports, and behind-the-scenes build notes — for CS students and the banks who hire us.",
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
  const program = data.programs?.[0];
  const offering = program?.offerings?.[0];
  const body = `
    <main class="checkout-page">
      <div class="stepper">
        <span>01 Program</span><i></i><b>02 Payment</b><i></i><span>03 Success</span>
      </div>
      <div class="checkout-grid">
        <section class="checkout-form">
          <span class="kicker">Secure seat reservation</span>
          <h1>Reserve your cohort seat</h1>
          <p class="checkout-lede">You are reserving one seat in ${escapeHtml(program?.name || "the AutoNateAI program")}. Card payment is processed securely through Square; learner onboarding details come next after payment is confirmed.</p>
          <div class="square-status" data-square-status>
            <strong>Square payment setup pending</strong>
            <span>Add Square credentials to enable live card payments. Until then, checkout stays in preview mode.</span>
          </div>
          <div class="checkout-product-strip">
            <div>
              <strong>${escapeHtml(program?.name || "AutoNateAI Program")}</strong>
              <span>${program?.durationWeeks || 2} weeks &middot; ${(program?.sessions || []).length || 8} live sessions &middot; ${offering?.capacity || 25}-seat cohort</span>
            </div>
            <b>${offering ? money(offering.price) : "$499"}</b>
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
    <footer class="minimal-footer">&copy; 2026 AutoNateAI. Software systems, built with AI agents.</footer>
    ${dataScript(data)}
  `;

  return pageShell({
    title: "Checkout | AutoNateAI",
    active: "checkout",
    body,
    mode: "checkout",
    canonicalPath: "/checkout",
    robots: "noindex,nofollow",
    ogImage: `/assets/og/${program?.handle || "ai-agent-systems"}.jpg`,
    description: `Reserve a seat in ${program?.name || "the AutoNateAI program"}.`,
    ogTitle: "Reserve the seat. Ship the system.",
    ogDescription:
      "Secure your spot in the 2-week AI-agent systems cohort where the final exam is shipping a real system for a real organization.",
  });
}

export function renderSuccess(data) {
  const recommendations = data.programs.slice(0, 4);
  const primaryProgram = data.programs?.[0];

  const body = `
    <main class="success-page">
      <section class="success-header">
        <div class="success-mark">${icon("check_circle")}</div>
        <h1>Enrollment Confirmed</h1>
        <p>You're in. Onboarding instructions and your first session details are on their way to your inbox.</p>
      </section>
      <section class="success-grid">
        <article class="access-card">
          <img src="/assets/landing/success-confirmed.jpg" alt="" />
          <div>
            <span class="kicker">Seat Reserved</span>
            <h2 data-success-program>Loading&hellip;</h2>
            <p>Onboarding, setup instructions, cohort workspace access, and the first live-session details are sent before the cohort begins.</p>
            <a class="primary-button" href="/programs/${primaryProgram?.handle || "ai-agent-systems"}">View Program</a>
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
    ogImage: `/assets/og/${primaryProgram?.handle || "ai-agent-systems"}.jpg`,
    description: `Enrollment confirmed for ${primaryProgram?.name || "the AutoNateAI program"}.`,
    ogTitle: "Seat locked. Build loading.",
    ogDescription:
      "Your seat is reserved. Next comes setup, Git, AI agents, system design, and building your simulated population.",
  });
}

function slugify(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function readTutorialMarkdown(tutorial) {
  try {
    return readFileSync(new URL(tutorial.sourcePath, import.meta.url), "utf8");
  } catch {
    return `# ${tutorial.title}\n\nThis tutorial source could not be loaded yet.`;
  }
}

function stripFirstHeading(markdown = "") {
  return markdown.replace(/^# .+\n+/, "");
}

function markdownToHtml(markdown = "") {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let list = [];
  let code = null;
  let table = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    list = [];
  }

  function flushTable() {
    if (!table.length) return;
    const rows = table
      .filter((row) => !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(row))
      .map((row) => row.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
    if (rows.length) {
      const [head, ...body] = rows;
      html.push(`<div class="markdown-table"><table><thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
    }
    table = [];
  }

  for (const line of lines) {
    const fence = line.match(/^```(\w+)?\s*$/);
    if (fence) {
      flushParagraph();
      flushList();
      flushTable();
      if (code) {
        html.push(codeBlockHtml(code));
        code = null;
      } else {
        code = { lang: (fence[1] || "").toLowerCase(), lines: [] };
      }
      continue;
    }

    if (code) {
      code.lines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    if (/^\|.+\|$/.test(line.trim())) {
      flushParagraph();
      flushList();
      table.push(line);
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushTable();
      const level = Math.min(heading[1].length + 1, 5);
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/);
    if (image) {
      flushParagraph();
      flushList();
      flushTable();
      const [, alt, src, caption] = image;
      html.push(
        `<figure class="markdown-figure"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" />${caption ? `<figcaption>${inlineMarkdown(caption)}</figcaption>` : ""}</figure>`,
      );
      continue;
    }

    const bullet = line.match(/^\s*-\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      flushTable();
      list.push(bullet[1]);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushTable();
  if (code) html.push(codeBlockHtml(code));
  return html.join("\n");
}

function codeBlockHtml(code) {
  const lang = code.lang || "text";
  const raw = code.lines.join("\n");
  if (lang === "mermaid") {
    return `<pre class="mermaid">${escapeHtml(raw)}</pre>`;
  }
  const highlighted = ["js", "javascript"].includes(lang) ? highlightJavaScript(raw) : escapeHtml(raw);
  return `<pre class="code-block language-${escapeHtml(lang)}"><code>${highlighted}</code></pre>`;
}

function highlightJavaScript(source = "") {
  const placeholders = [];
  let html = escapeHtml(source);
  const stash = (className, value) => {
    const token = `__ANAI_TOKEN_${placeholders.length}__`;
    placeholders.push(`<span class="${className}">${value}</span>`);
    return token;
  };

  html = html.replace(/(\/\/[^\n]*)/g, (match) => stash("token-comment", match));
  html = html.replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g, (match) => stash("token-string", match));
  html = html.replace(/\b(const|let|var|function|return|if|else|for|in|of|new|class|module|exports|require|continue|break)\b/g, '<span class="token-keyword">$1</span>');
  html = html.replace(/\b(Game|Memory|RoomPosition|FIND_[A-Z_]+|ERR_[A-Z_]+|RESOURCE_[A-Z_]+|STRUCTURE_[A-Z_]+|WORK|CARRY|MOVE|ATTACK|RANGED_ATTACK|HEAL|TOUGH|CLAIM)\b/g, '<span class="token-constant">$1</span>');
  html = html.replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');

  placeholders.forEach((value, index) => {
    html = html.replace(`__ANAI_TOKEN_${index}__`, value);
  });
  return html;
}

function inlineMarkdown(value = "") {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function tutorialTrack(track, items, pack) {
  return `
    <section class="docs-panel" id="${slugify(track)}">
      <div class="docs-panel-head">
        <span class="kicker">${escapeHtml(track)}</span>
        <h2>${escapeHtml(track)}</h2>
      </div>
      <div class="tutorial-list">
        ${items
          .map(
            (tutorial) => `
          <article class="tutorial-row ${tutorial.draft ? "draft" : ""}">
            <a class="tutorial-row-media" href="/tutorials/${pack.handle}/${escapeHtml(tutorial.handle)}">
              ${packMedia(pack, Number(tutorial.episode) || 0)}
              <span class="tutorial-index">${escapeHtml(tutorial.episode)}</span>
            </a>
            <div>
              <h3><a href="/tutorials/${pack.handle}/${escapeHtml(tutorial.handle)}">${escapeHtml(tutorial.title)}</a></h3>
              <p>${escapeHtml(tutorial.summary)}</p>
              <div class="tag-row">${tutorial.outcomes.map((outcome) => `<span>${escapeHtml(outcome)}</span>`).join("")}${tutorial.draft ? `<span class="draft-tag">Coming Soon</span>` : ""}</div>
              <a class="tutorial-link" href="/tutorials/${pack.handle}/${escapeHtml(tutorial.handle)}">${tutorial.draft ? "Preview Outline" : "Open Tutorial"} ${icon("arrow_forward")}</a>
            </div>
          </article>
        `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function packStatusLabel(pack) {
  return pack.status === "Active" ? "Available Now" : "Coming Soon";
}

function packStatusBanner() {
  return `
    <div class="pack-status-banner">
      <span class="kicker">${icon("hourglass_top")} Coming Soon</span>
      <p>This pack's lessons are still being written. The outline below shows what's planned — check back soon, or ask in Discord for early access.</p>
      <a class="outline-button" href="/community">Ask in Discord</a>
    </div>
  `;
}

function packCard(pack) {
  const items = tutorials.filter((tutorial) => tutorial.pack === pack.handle);
  const available = pack.status === "Active";
  return `
    <a class="pack-card ${available ? "" : "coming-soon"}" href="/tutorials/${pack.handle}">
      <div class="pack-card-media">
        ${packMedia(pack)}
        <span class="status-pill ${available ? "live" : ""}">${packStatusLabel(pack)}</span>
      </div>
      <div class="pack-card-body">
        <span class="kicker">${icon(pack.icon)} ${escapeHtml(pack.tagline)}</span>
        <h3>${escapeHtml(pack.title)}</h3>
        <p>${escapeHtml(pack.summary)}</p>
        <div class="pack-card-meta">
          <span>${icon("auto_stories")} ${items.length} lesson${items.length === 1 ? "" : "s"}</span>
          <span class="pack-card-link">${available ? "View Pack" : "Preview Pack"} ${icon("arrow_forward")}</span>
        </div>
      </div>
    </a>
  `;
}

function programThumbnail(program) {
  return program.handle === "ai-agent-systems" ? "/assets/landing/what-they-build.jpg" : shot(program.sequence);
}

function dataScript(data) {
  const withThumbnails = {
    ...data,
    programs: data.programs.map((p) => ({ ...p, thumbnail: programThumbnail(p) })),
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
    ["Agents, prompting, databases, and architecture", "Set up Claude Code and Codex, engineer prompts and context for real projects, design relational and graph data models, build APIs, and document the system with Mermaid diagrams."],
    ["Simulation, design, and the real build", "Review AI-generated code like an engineer, design a simulated population using the persona-and-verifier pattern behind MatrAIx, then turn it into a real system design and ship it live against them."],
  ][index] || [`Week ${index + 1}`, "Keep improving the system."];
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

function programFeature(program, extraClass = "", showOverlay = false) {
  const offering = program.offerings?.[0];
  const price = offering ? money(offering.price) : "$499";
  const checkoutHref = offering ? `/checkout?program=${program.handle}&offering=${offering.id}` : "/checkout";

  return `
    <article class="program-feature ${extraClass}">
      <a class="program-feature-media" href="/programs/${program.handle}">
        <img src="${programThumbnail(program)}" alt="" />
        ${
          showOverlay
            ? `<div class="program-media-callout">
          <span>${icon("flag")} Live capstone</span>
          <strong>Design the system. Ship it for real.</strong>
          <p>Builders finish by shipping a real system, built live, tested against a simulated population they build themselves.</p>
        </div>`
            : ""
        }
      </a>
      <div class="program-feature-body">
        <div class="program-feature-topline">
          <span class="status-pill ${program.status === "Active" ? "live" : ""}">${statusLabel(program.status)}</span>
          <span>${program.durationWeeks || 2} weeks &middot; ${(program.sessions || []).length || 8} live sessions &middot; Virtual</span>
        </div>
        <h3>${escapeHtml(program.name)}</h3>
        <p>${escapeHtml(program.description)}</p>
        <div class="cohort-date-row compact">
          ${cohortBadge(program)}
          <span>${escapeHtml(program.cohortNote || "")} ${cohortCapacity(program)}. Dedicated AutoNateAI Discord included for setup help, architecture reviews, agent workflow coaching, and build support.</span>
        </div>
        <div class="program-feature-points">
          <span>Real, shipped system</span>
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
  return `<a class="mini-card" href="/programs/${program.handle}"><img src="${programThumbnail(program)}" alt="${escapeHtml(program.name)}" /><div><strong>${escapeHtml(program.name)}</strong><span>${escapeHtml(program.badge)}</span></div><b>${cheapest ? `${money(cheapest.price)}+` : "TBD"}</b></a>`;
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
