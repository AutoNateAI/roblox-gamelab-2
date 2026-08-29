import { readFileSync } from "node:fs";
import {
  articles,
  bankEngagementLadder,
  bankingOfferings,
  businessTrainingCurriculum,
  buildLabInfo,
  foundingBankPilot,
  industries,
  industryWeeks,
  organizationExamples,
  regionalVision,
  sceneShots,
  sponsorshipTiers,
  toolsMenu,
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
  const capacity = program?.offerings?.[0]?.capacity || 20;
  return `${capacity}-seat cohort`;
}

function orgExampleCard(example) {
  return `
    <article class="industry-card">
      <div class="industry-card-icon">${icon(example.icon)}</div>
      <h3>${escapeHtml(example.org)}</h3>
      <ul class="industry-capabilities">
        ${example.chain.map((step) => `<li>${icon("arrow_forward")}<span>${escapeHtml(step)}</span></li>`).join("")}
      </ul>
    </article>
  `;
}

function curriculumDayCard(day) {
  return `
    <article class="industry-card curriculum-day-card">
      <span class="kicker">${icon("event")} ${escapeHtml(day.day)} &middot; ${escapeHtml(day.hours)}</span>
      <h3>${escapeHtml(day.title)}</h3>
      <ul class="industry-capabilities">
        ${day.items.map((item) => `<li>${icon("arrow_forward")}<span>${escapeHtml(item)}</span></li>`).join("")}
      </ul>
    </article>
  `;
}

function toolMenuCard(tool) {
  return `
    <article class="industry-card">
      <div class="industry-card-icon">${icon(tool.icon)}</div>
      <h3>${escapeHtml(tool.name)}</h3>
      <p class="industry-hook">${escapeHtml(tool.description)}</p>
    </article>
  `;
}

function industryCard(industry) {
  return `
    <article class="industry-card">
      <div class="industry-card-icon">${icon(industry.icon)}</div>
      <h3>${escapeHtml(industry.name)}</h3>
      <p class="industry-hook">${escapeHtml(industry.tagline)}</p>
      <ul class="industry-capabilities">
        ${industry.workflows.map((step) => `<li>${icon("bolt")}<span>${escapeHtml(step)}</span></li>`).join("")}
      </ul>
    </article>
  `;
}

function shortDate(value) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function dayName(value) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(`${value}T00:00:00`));
}

function weekRangeLabel(days) {
  if (!days?.length) return "";
  return `${shortDate(days[0].date)}–${shortDate(days[days.length - 1].date)}`;
}

// One "calendar" tile for an industry's spotlight week — the week range up top,
// then its three build sessions (Tue/Wed/Thu, 11:30 AM Central) underneath.
function industryWeekCalendarCard(week, industryBySlug, isNext = false) {
  const industry = industryBySlug.get(week.industry);
  if (!industry) return "";
  return `
    <article class="industry-card week-calendar-card${isNext ? " week-calendar-next" : ""}">
      <div class="week-calendar-head">
        <div class="industry-card-icon">${icon(industry.icon)}</div>
        <div>
          ${isNext ? `<span class="kicker">${icon("bolt")} Up Next</span>` : ""}
          <h3>${escapeHtml(industry.name)}</h3>
          <span class="week-range">${weekRangeLabel(week.days)}</span>
        </div>
      </div>
      <div class="week-calendar-days">
        ${week.days
          .map(
            (d) => `
          <div class="week-calendar-day">
            <div class="week-calendar-day-label">
              <strong>${escapeHtml(dayName(d.date))}</strong>
              <span>${escapeHtml(shortDate(d.date))} · 11:30 AM CST</span>
            </div>
            <p>"${escapeHtml(d.topic)}"</p>
            <div class="button-row">
              <a class="primary-button" href="${d.meetUrl}">Join ${icon("videocam")}</a>
              <a class="outline-button" href="${d.calendarUrl}">Add to Calendar</a>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </article>
  `;
}

function sponsorshipTierCard(tier) {
  return `
    <button type="button" class="offering-card tier-select-card" data-seat-tier="${tier.seats}">
      <span class="kicker">${tier.seats} seat${tier.seats === 1 ? "" : "s"}</span>
      <h3>${money(tier.price)}</h3>
      <p>${escapeHtml(tier.label)}</p>
      <span class="primary-button full">Select ${icon("arrow_forward")}</span>
    </button>
  `;
}

export function renderHome(data) {
  const { programs } = data;
  const primaryProgram = programs?.[0];
  const landingArticles = [
    "why-southeast-missouri-businesses-need-internal-ai-capability",
    "what-ai-workforce-readiness-looks-like-for-sikeston-students",
    "coding-as-workforce-development",
  ]
    .map((handle) => articles.find((article) => article.handle === handle))
    .filter(Boolean);

  const body = `
    <main>
      <section class="home-hero">
        <div class="hero-bg"><img src="/assets/landing/sikeston-consulting-industries.jpg" alt="Nathan Baker architecting a system for a Southeast Missouri business" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("hub")} AI Consulting &amp; Development · Southeast Missouri</span>
            <h1>Enterprise-grade AI systems, at Southeast Missouri prices.</h1>
            <p>Agentic AI is democratizing access to engineering workflows that used to require a full in-house team. AutoNateAI brings that capability directly to Sikeston and the rest of Southeast Missouri — real internal tools, built fast, priced for a business your size, not an enterprise vendor contract.</p>
            <div class="button-row">
              <a class="primary-button" href="/consulting#book">Talk to AutoNateAI ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="/for-organizations">Request Team Training</a>
            </div>
            <div class="button-row">
              <a class="outline-button" href="/tutorials">Free Course Library</a>
            </div>
          </div>
          <aside class="hero-program-panel">
            <img src="/assets/sikeston/downtown-street.jpg" alt="Historic downtown Sikeston, Missouri" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("event")} See It Built, Live, Free</span>
              <h2>Every week, we build a real internal tool for a different regional industry — live.</h2>
              <p>No slides. A real workflow, researched and architected on the spot, built into working software, with an open floor for Q&amp;A.</p>
              <div class="hero-facts">
                <span>Fixed-scope pricing</span>
                <span>Built in Southeast Missouri</span>
                <span>Free weekly live builds</span>
                <span>Discord support included</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="section">
        <div class="section-head section-head-center">
          <div>
            <span class="kicker">${icon("route")} What We Offer</span>
            <h2>Four ways to work with AutoNateAI.</h2>
            <p>Whether you want us to build it, want your team trained to build it, want to watch it happen first, or want to learn the fundamentals yourself — there's a starting point here.</p>
          </div>
        </div>
        <div class="value-grid">
          <article><span>${icon("hub")}</span><h3>Consulting</h3><p>Bring us a real workflow. We research it, architect it, and build the internal tool — your team owns it when we're done.</p><a class="outline-button full" href="/consulting">Learn More ${icon("arrow_forward")}</a></article>
          <article><span>${icon("groups")}</span><h3>For Organizations</h3><p>A custom, on-site training engagement for your team — they leave with 3 real internal tools built for your business.</p><a class="outline-button full" href="/for-organizations">Learn More ${icon("arrow_forward")}</a></article>
          <article><span>${icon("event")}</span><h3>Industry Build Labs</h3><p>Free, live, every week — watch a real internal tool get built for a different regional industry, no cost to attend.</p><a class="outline-button full" href="/events">Learn More ${icon("arrow_forward")}</a></article>
          <article><span>${icon("auto_stories")}</span><h3>Free Courses</h3><p>A free library of technical courses for sharpening your own skills, with Discord support built in.</p><a class="outline-button full" href="/tutorials">Learn More ${icon("arrow_forward")}</a></article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("public")} Why This Works Here</span>
            <h2>Real Southeast Missouri organizations make architecture visible.</h2>
            <p>Not a made-up case study — the business, school, or nonprofit you already know around town. Requirements become data models, decisions become components, Git protects every experiment, and every AI-generated change gets reviewed, not blindly trusted. The system has to actually work for someone here, not just demo well — and agentic AI means we can build it for a fraction of what it used to cost.</p>
          </div>
          <a class="primary-button" href="/consulting#book">Talk to AutoNateAI ${icon("arrow_forward")}</a>
        </div>
        <div class="value-grid">
          <article><span>${icon("functions")}</span><h3>Built for someone local</h3><p>Every engagement is a real system for a real Southeast Missouri organization: databases, APIs, architecture, and the tradeoffs that come with an actual business depending on it.</p></article>
          <article><span>${icon("account_tree")}</span><h3>Engineered like engineers</h3><p>Working versions committed, diffs reviewed, changes recoverable — a repo history that explains exactly what was built and why, not a black box.</p></article>
          <article><span>${icon("hub")}</span><h3>Databases and APIs</h3><p>Relational and graph data models for your organization's actual data, a real API, and architecture documented so your team can maintain it.</p></article>
          <article><span>${icon("forum")}</span><h3>A community that outlasts the engagement</h3><p>The Discord is open all day, every day — for anyone working through the free courses, anyone in a training engagement, and anyone who's been through either.</p></article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("auto_stories")} Free Course Library</span>
            <h2>Sharpen your technical skills, free, whenever you're ready.</h2>
            <p>Each course is a standalone, story-driven guide following Nate and Kai as they build AutoNateAI from a meetup back room to a real, shipped system. Read one, or read all four — no cost, no catch.</p>
            <p>These four pillars are the same foundation our training engagements and Build Labs build on — the fundamentals behind every internal tool we ship for a real Southeast Missouri organization.</p>
          </div>
          <a class="primary-button" href="/tutorials">Browse Free Courses ${icon("arrow_forward")}</a>
        </div>
        <div class="pack-grid">${tutorialPacks.map((pack) => packCard(pack)).join("")}</div>
      </section>

      <section class="section compete-section">
        <div class="compete-layout">
          <div class="compete-visual">
            <div class="compete-media">
              <img src="/assets/landing/sikeston-internal-tool-laptop.jpg" alt="A laptop screen showing an internal business dashboard built for a Southeast Missouri organization" />
              <div class="compete-callout">
                <span>${icon("flag")} Live, every week</span>
                <strong>A real internal tool, built in front of you</strong>
                <p>See whether an architecture like yours can hold up — before you commit to anything.</p>
              </div>
            </div>
            <div class="button-row compete-actions">
              <a class="primary-button" href="/events">See a Build Lab ${icon("arrow_forward")}</a>
              <a class="outline-button" href="/for-organizations">Request Team Training</a>
            </div>
          </div>
          <div class="compete-copy">
            <span class="kicker">${icon("emoji_events")} Research, Architect, Build, Ship</span>
            <h2>The same process, whether it's your workflow or a Build Lab audience watching.</h2>
            <p>This is the methodology behind everything AutoNateAI ships: a real workflow from a real Southeast Missouri organization, researched, architected, and built into working software — with the people who'll actually use it in the room.</p>
            <div class="compete-curriculum">
              <article><b>01</b><span>Research the real workflow — terminology, constraints, what actually happens today.</span></article>
              <article><b>02</b><span>Architect the system — data model, API, and a documented plan before a line of code ships.</span></article>
              <article><b>03</b><span>Build and refine it live, then hand off a system your team can actually run.</span></article>
            </div>
          </div>
        </div>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="/assets/landing/sikeston-organizations-handshake.jpg" alt="Nathan Baker shaking hands with a local employer partner in the Sikeston classroom" /></div>
        <div>
          <span class="kicker">${icon("forum")} Always-On Support</span>
          <h2>The Discord doesn't close when a session does.</h2>
          <p>Get help with the free courses, get help during a training engagement, or get help designing and building a system you've already got an idea for. It's open all day, every day, not just during scheduled sessions.</p>
          <div class="stat-grid">
            <div><strong>All day, every day</strong><span>Availability</span></div>
            <div><strong>Free</strong><span>Open to Everyone</span></div>
          </div>
          <div class="button-row">
            <a class="primary-button" href="https://discord.gg/4HkkuntdSs">Join the Discord ${icon("open_in_new")}</a>
            <a class="outline-button" href="/tutorials">Start the Free Courses</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head section-head-center">
          <div>
            <span class="kicker">${icon("route")} How It All Connects</span>
            <h2>Consulting. Team training. Live builds. Free courses. It's one system.</h2>
            <p>Every path teaches and ships the same skill, pointed at real Southeast Missouri organizations — the difference is just who's driving.</p>
          </div>
        </div>
        <div class="compete-curriculum">
          <article><b>01</b><span><a href="/consulting">Hire it out</a> — AutoNateAI researches, architects, and builds the internal tool for you.</span></article>
          <article><b>02</b><span><a href="/for-organizations">Train your team</a> — a custom, on-site engagement, and your people leave able to build it themselves.</span></article>
          <article><b>03</b><span><a href="/events">See it live</a> — free weekly Industry Build Labs, no cost to attend.</span></article>
          <article><b>04</b><span><a href="/tutorials">Start free</a> — a self-paced course library for sharpening your own skills.</span></article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("article")} Articles</span>
            <h2>Research, workforce insights, and build notes.</h2>
            <p>We write up research on AI adoption in Southeast Missouri, notes from real engagements, and behind-the-scenes looks at how these systems actually get built.</p>
          </div>
          <a class="primary-button" href="/articles">Read More Articles ${icon("arrow_forward")}</a>
        </div>
        <div class="article-grid">${landingArticles.map((article) => articleCard(article)).join("")}</div>
      </section>

      <section class="newsletter">
        <div>
          <h2>Have a workflow that's eating your team's time?</h2>
          <p>Tell us about it. We'll tell you honestly whether an internal tool makes sense, what it would take to build, and what it would cost — fixed scope, no enterprise-length contract.</p>
          <form>
            <input placeholder="Enter your email" type="email" />
            <button type="button">Get in Touch</button>
          </form>
          <small>Prefer to start free? The <a href="/tutorials">course library</a> and the weekly <a href="/events">Industry Build Labs</a> cost nothing.</small>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "AutoNateAI | Building Southeast Missouri's AI Workforce",
    active: "home",
    body,
    canonicalPath: "/",
    ogImage: "/assets/og/programs.jpg",
    description:
      "AutoNateAI trains students and professionals in Sikeston, MO to design software systems with AI, then apply those skills to real problems inside businesses, schools, and community organizations across Southeast Missouri.",
    ogTitle: "Building Southeast Missouri's AI Workforce.",
    ogDescription:
      "An in-person cohort in Sikeston, MO, four free digital courses, and an always-on Discord where students and professionals design databases, APIs, and architecture with Claude Code and Codex, then ship a real system for a real organization.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "AutoNateAI",
        "url": "https://autonateai.com",
        "description": "AutoNateAI develops Southeast Missouri's AI and software workforce, training students and professionals to design real software systems, direct AI agents responsibly, and ship real systems for real organizations.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Sikeston",
          "addressRegion": "MO",
          "addressCountry": "US",
        },
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
    title: "AI & Coding Training Program | Sikeston, MO | AutoNateAI",
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
          <h1>AutoNateAI builds AI systems for Southeast Missouri businesses.</h1>
          <p>AutoNateAI is an AI consulting and development studio — Nathan Baker builds real internal tools for real Southeast Missouri organizations, and trains teams to build and run that capability themselves, starting in Sikeston.</p>
          <div class="button-row">
            <a class="primary-button" href="/consulting">See Consulting ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/articles">Read the Learning Model</a>
          </div>
        </div>
        <aside class="about-founder-card">
          <img src="/assets/nathan-baker.jpeg" alt="Nathan Baker, founder of AutoNateAI" />
          <div>
            <span class="kicker">Founder &amp; Principal Consultant</span>
            <h2>Nathan Baker</h2>
            <p>Computer Science, University of Michigan. Software and AI engineering experience across Microsoft, Citi, Veterans United, Atomic Object, and Outlier.</p>
          </div>
        </aside>
      </section>

      <section class="about-mission">
        <span class="kicker">${icon("architecture")} Mission</span>
        <h2>AutoNateAI is Southeast Missouri's AI and development service provider.</h2>
        <p>AI skills aren't only for technology companies. Missouri's 2026 Technology2030 report found more than 223,000 Missourians already work in technology occupations, many of them outside traditional tech companies. Agentic AI is what makes that capability affordable at a local-business scale: AutoNateAI researches a real workflow, architects the system, and builds it — either directly through Consulting, or by training your own team to build it through a requested engagement.</p>
        <p>That practice is not hypothetical. Every engagement — and every free weekly Industry Build Lab — builds toward a real internal tool for a real organization. The Discord keeps that same discipline moving every day in between, and the free course library is open to anyone sharpening the fundamentals on their own.</p>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="/assets/landing/sikeston-nathan-consulting-portrait.jpg" alt="Nathan Baker consulting with a Southeast Missouri business owner in Sikeston, Missouri" /></div>
        <div>
          <span class="kicker">${icon("apartment")} World-Class Experience. Local Investment.</span>
          <h2>Now applying that experience locally — starting in Sikeston.</h2>
          <p>Nathan built software and AI systems across the University of Michigan, Microsoft, Citi, Veterans United, and Atomic Object, working inside organizations where clarity, reliability, and communication matter. That's not a résumé to be impressed by — it's capability now being reinvested close to home, priced for a Southeast Missouri business, not an enterprise vendor contract.</p>
          <div class="button-row">
            <a class="primary-button" href="/consulting">See Consulting ${icon("arrow_forward")}</a>
          </div>
        </div>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="/assets/landing/nate-and-kai.jpg" alt="Nate and Kai, the two builders behind the AutoNateAI free digital courses" /></div>
        <div>
          <span class="kicker">${icon("auto_stories")} The Free Digital Courses</span>
          <h2>The same mission, told as a story: meet Nate and Kai.</h2>
          <p>The four free digital courses follow Nate and Kai, two builders founding a studio from a meetup back room to a real, shipped system, learning JavaScript, AI agents, databases, and civic tech along the way. It's the same engineering practice this page describes, just easier to actually finish reading.</p>
          <div class="button-row">
            <a class="primary-button" href="/tutorials">Take the Free Courses ${icon("arrow_forward")}</a>
          </div>
        </div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("timeline")} Starting in Sikeston. Built to Grow Regionally.</span>
            <h2>The five-year vision.</h2>
          </div>
        </div>
        <div class="about-values">
          ${regionalVision.map((step) => `<article><h3>${escapeHtml(step.period)}</h3><p>${escapeHtml(step.text)}</p></article>`).join("")}
        </div>
        <div class="league-gallery">
          <img src="/assets/sikeston/city-welcome-sign.jpg" alt="City of Sikeston welcome sign" />
          <img src="/assets/sikeston/historic-downtown.jpg" alt="Historic Downtown Sikeston" />
          <img src="/assets/sikeston/downtown-street.jpg" alt="Downtown Sikeston, Missouri" />
        </div>
      </section>

      <section class="section compact about-split">
        <div>
          <span class="kicker">${icon("verified")} Why the work is different</span>
          <h2>Built from real engineering work, not generic coding practice.</h2>
          <p>For the last five years, Nathan has designed software systems, AI workflows, and software architectures used inside organizations where clarity, reliability, and communication matter — most recently as Senior Software Consultant and Developer at Atomic Object. AutoNateAI turns those same engineering methods into what it delivers for clients.</p>
          <p>Before founding AutoNateAI, Nathan also taught Computer Security at the University of Michigan as an instructional aide, leading office hours, lab sections, and mentoring students through software security, networking, and systems problems.</p>
        </div>
        <div class="about-proof-list">
          ${experience.map(([title, text]) => `<article><span>${icon("work_history")}</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></div></article>`).join("")}
        </div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("school")} How We Work</span>
            <h2>Technology changes. Engineering judgment lasts.</h2>
            <p>Every engagement reads the environment first, designs before changing code, uses AI with context, tests the result, and explains the tradeoffs behind every decision — whether AutoNateAI builds it or your team does.</p>
          </div>
          <a class="primary-button" href="/consulting#book">Talk to AutoNateAI ${icon("arrow_forward")}</a>
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
        <h2>Let's build something your team can actually run.</h2>
        <p>I grew up fascinated with technology because it gave me a way to turn ideas into something real. Over time, working across Microsoft, financial technology, AI, and consulting at Atomic Object reinforced one lesson: the strongest engineers are not just the people who can write code. They are the people who can understand a system, and explain it clearly to the people depending on it.</p>
        <p>AutoNateAI exists because Southeast Missouri businesses deserve access to that same caliber of engineering — not a generic SaaS platform, not an enterprise vendor contract, but a real system built for how your organization actually works, priced for a business your size. Agentic AI is what finally makes that math work.</p>
        <p>If you have a workflow eating your team's time, or want your own people capable of building the next one, I would love to build with you.</p>
        <strong>Nathan Baker<br /><span>Founder, AutoNateAI</span></strong>
      </section>

      <section class="section compact about-faq">
        <div class="section-head"><div><span class="kicker">${icon("help")} FAQ</span><h2>Common questions</h2></div></div>
        <div class="faq-grid">
          <article><h3>Do you build it, or train us to build it?</h3><p>Both are on the table. Consulting means AutoNateAI researches, architects, and builds the tool for you. Requested team training means your own people learn to build it themselves, over a 4-day on-site engagement.</p></article>
          <article><h3>How does AI fit into the work?</h3><p>Every build uses agents like Claude Code and Codex to plan features, inspect code, explain errors, and review tradeoffs. AI speeds up the work, but it doesn't replace understanding — every engagement stays reviewed and explainable.</p></article>
          <article><h3>Why is this more affordable than I'd expect?</h3><p>Agentic AI collapses the distance between architecture and working software. Work that used to require a full in-house engineering team can now be scoped, built, and delivered by a much smaller one — and that savings gets passed on.</p></article>
          <article><h3>Who is this for?</h3><p>Any Southeast Missouri business, school, or nonprofit with a real workflow that's eating staff time — plus anyone who wants to sharpen their own technical skills through the free course library.</p></article>
        </div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("local_activity")} Ready to Talk?</span>
          <h2>Bring us a real workflow.</h2>
          <p>Whether you want AutoNateAI to build it, want your team trained to build it, or just want to see how it's done first — every path starts with a conversation.</p>
        </div>
        <a class="primary-button" href="/consulting#book">Talk to AutoNateAI ${icon("arrow_forward")}</a>
      </section>
    </main>
  `;

  return pageShell({
    title: "About AutoNateAI | Southeast Missouri AI Consulting & Development",
    active: "about",
    body,
    canonicalPath: "/about",
    ogImage: "/assets/og/about.jpg",
    description:
      "AutoNateAI is Southeast Missouri's AI consulting and development studio. World-class experience across Michigan, Microsoft, Citi, Veterans United, and Atomic Object, now reinvested locally in Sikeston, MO.",
    ogTitle: "Meet the team behind AutoNateAI.",
    ogDescription:
      "Real engineering experience, real Southeast Missouri clients, and a five-year regional vision: prove the model in Sikeston, expand consulting and training across the region, become the region's standing AI partner.",
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
  const gallery = ["/assets/landing/sikeston-presenting-fullbody.jpg", "/assets/landing/sikeston-mentoring.jpg", "/assets/landing/agent-review.jpg"];
  const offering = program.offerings?.[0];
  const price = offering ? money(offering.price) : "$499";
  const checkoutHref = offering ? `/checkout?program=${program.handle}&offering=${offering.id}` : "/checkout";
  const heroTitle = escapeHtml(program.name);

  const body = `
    <main class="product-detail-page">
      <section class="home-hero program-detail-hero">
        <div class="hero-bg"><img src="${gallery[0]}" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <nav class="breadcrumbs program-hero-breadcrumbs"><a href="/">Home</a><span>/</span><a href="/for-organizations">For Organizations</a><span>/</span><b>${escapeHtml(program.name)}</b></nav>
            <span class="kicker">${icon("apartment")} Requested Team Training</span>
            <h1>${heroTitle}</h1>
            <p>A 4-day, 4-hours-a-day engagement using ChatGPT, Claude, Codex, and Claude Code — customized around your business, built on-site at your location or at Center Street Station in Sikeston, MO. Requested and scoped for the specific business that asks for it.</p>
            <div class="button-row">
              <a class="primary-button" href="/for-organizations#request">Request This Training ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="#curriculum">View the 4-Day Curriculum</a>
            </div>
          </div>
          <aside class="hero-program-panel program-hero-panel">
            <img src="${gallery[1]}" alt="" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("sports_esports")} What You Build</span>
              <h2>3 real internal tools, ready for work or home.</h2>
              <p>Learn the tools, design the architecture, and build toward real internal tools chosen from a menu of 9 that could help your business immediately.</p>
              <div class="hero-facts">
                <span>4 days, 4 hrs/day</span>
                <span>3 tools built</span>
                <span>Your Git repo</span>
                <span>Agent coaching</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="detail-proof-strip">
        <a href="/for-organizations#request"><b>From ${price}</b><span>Per employee trained</span></a>
        <a href="#curriculum"><b>4</b><span>Days, 4 hrs/day</span></a>
        <a href="#tools"><b>3 of 9</b><span>Internal tools built</span></a>
        <a href="#outcomes"><b>On-site</b><span>Or Sikeston, MO</span></a>
      </section>

      <section class="section" id="curriculum">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("route")} How the 4 Days Break Down</span>
            <h2>Days 1-2 are the foundation. Days 3-4 are your real tools.</h2>
            <p>Heavy emphasis on prompt engineering and context engineering — the skill that makes your team context specialists and junior engineering managers, judging the quality of what an AI coding agent produces, not necessarily typing every line of it themselves.</p>
          </div>
        </div>
        <div class="pack-grid">${businessTrainingCurriculum.map((day) => curriculumDayCard(day)).join("")}</div>
      </section>

      <section class="section compact" id="tools">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("build")} Choose 3 of 9</span>
            <h2>A menu of internal tools that could help your business immediately.</h2>
          </div>
        </div>
        <div class="industry-grid">${toolsMenu.map((tool) => toolMenuCard(tool)).join("")}</div>
      </section>

      <section class="section compact detail-sales-band" id="outcomes">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("architecture")} What Actually Changes</span>
            <h2>Your team starts seeing code as a living system, not a file of instructions.</h2>
            <p>They learn to direct AI agents, design data models and APIs, debug failures, and use Git checkpoints — then go further than a generic course: build 3 real internal tools for your actual business, and ship against real scenarios.</p>
          </div>
          <a class="primary-button" href="/for-organizations#request">Request Training ${icon("arrow_forward")}</a>
        </div>
        <div class="outcome-grid">
          <article><img src="/assets/landing/sikeston-org-system-dashboard.jpg" alt="A builder and a local business owner reviewing an internal dashboard built during a requested AutoNateAI training engagement" /><h3>Tools built for your organization</h3><p>Data models, API endpoints, agent workflows, and decisions shaped by your real business, not a hypothetical one.</p></article>
          <article><img src="/assets/landing/sikeston-agent-review.jpg" alt="A builder reviewing AI-generated code changes during a training engagement" /><h3>AI-assisted engineering habits</h3><p>Use Claude Code and Codex to plan and build faster while Git commits, diffs, and architecture notes keep the work explainable.</p></article>
          <article><img src="/assets/landing/sikeston-group-collaboration.jpg" alt="" /><h3>Real scenarios your team defines</h3><p>Define who each tool needs to work for, then run it against those scenarios before the engagement ends.</p></article>
        </div>
      </section>

      <section class="program-instructor-section">
        <div class="program-instructor-photo">
          <img src="/assets/nathan-baker.jpeg" alt="Nathan Baker, founder of AutoNateAI" />
        </div>
        <div>
          <span class="kicker">${icon("verified")} Who's Leading It</span>
          <h2>Led by an engineer who has built AI and software systems across Microsoft, Citi, Veterans United, and Atomic Object.</h2>
          <p>Nathan Baker studied Computer Science at the University of Michigan and has spent the last five years building real software, AI workflows, and software architectures inside organizations where clarity and reliability matter — most recently as Senior Software Consultant and Developer at Atomic Object.</p>
          <p>That consulting background shapes every engagement: showing up, understanding your real workflow, and building something your team can actually run — not a generic curriculum with your logo on it.</p>
          <div class="button-row">
            <a class="primary-button" href="/for-organizations#request">Request Training ${icon("arrow_forward")}</a>
            <a class="outline-button" href="/about">About AutoNateAI</a>
          </div>
        </div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("local_activity")} Requested Training</span>
          <h2>From ${price} per employee for the full 4-day engagement</h2>
          <p>Includes agent setup help, Git repo guidance, architecture coaching, dedicated AutoNateAI Discord access, and the 4-day on-site engagement itself. <a href="/for-organizations">See full pricing and request the engagement</a>.</p>
        </div>
        <a class="primary-button" href="/for-organizations#request">Request Training ${icon("arrow_forward")}</a>
      </section>
    </main>
  `;

  return pageShell({
    title: `${program.name} | Custom Business Training | Sikeston, MO | AutoNateAI`,
    active: "programs",
    body,
    canonicalPath: `/programs/${program.handle}`,
    ogImage: `/assets/og/${program.handle}.jpg`,
    description: program.description,
    ogTitle: "Custom AI & development training for Southeast Missouri businesses.",
    ogDescription:
      "A requested, 4-day on-site training engagement: prompt and context engineering, real ChatGPT/Claude/Codex/Claude Code workflows, and 3 real internal tools built for your business.",
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

export function renderForOrganizations(data) {
  const primaryProgram = data.programs?.[0];
  const body = `
    <main class="league-page consulting-page">
      <section class="home-hero league-detail-hero">
        <div class="hero-bg"><img src="/assets/landing/sikeston-business-training-terminal.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("apartment")} Requested Team Training</span>
          <h1>Custom AI &amp; development training, built around your business.</h1>
          <p>A 4-day, 4-hours-a-day engagement — on-site at your business or at Center Street Station in Sikeston — customized around your industry's real workflows using ChatGPT, Claude, Codex, and Claude Code. Every program is requested and built specifically for the business that asks for it.</p>
          <div class="button-row">
            <a class="primary-button" href="#request">Request Training For Your Team ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="mailto:autonate.ai@gmail.com?subject=AutoNateAI%20training%20question">Talk With AutoNateAI</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/sikeston-internal-tool-laptop.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("emoji_events")} What Your Team Leaves With</span>
            <h2>3 real internal tools, ready for work or home.</h2>
            <p>Not a certificate. Working software your team built themselves, chosen from a menu of 9 tools that could help your business immediately.</p>
            <div class="hero-facts">
              <span>4 days, 4 hrs/day</span>
              <span>On-site or in Sikeston</span>
              <span>3 real tools built</span>
              <span>Discord support included</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <section class="section compact" id="who">
        <div class="section-head section-head-center">
          <div>
            <span class="kicker">${icon("groups")} Built for Teams Ready to Build</span>
            <h2>Frontline staff, managers, and technical leads — side by side.</h2>
            <p>Missouri's 2026 Technology2030 report found technology talent is needed across every industry, not just tech companies — the same democratization behind agentic AI is why this is finally affordable for a business your size.</p>
          </div>
        </div>
        <div class="value-grid audience-grid">
          <article><span>${icon("work")}</span><h3>Frontline &amp; operational staff</h3><p>The people closest to the workflow that's eating the most time — they know exactly where it breaks.</p></article>
          <article><span>${icon("supervisor_account")}</span><h3>Managers &amp; team leads</h3><p>Learn to direct and evaluate AI-assisted work as it happens, not just approve it after the fact.</p></article>
          <article><span>${icon("autorenew")}</span><h3>Anyone who touches repetitive work</h3><p>If a workflow repeats every week, there's probably a tool in it — this training teaches you to build that tool yourself.</p></article>
        </div>
      </section>

      <section class="section" id="curriculum">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("route")} How the 4 Days Break Down</span>
            <h2>Days 1-2 are the foundation. Days 3-4 are your real tools.</h2>
            <p>Heavy emphasis on prompt engineering and context engineering — the skill that makes your team context specialists and junior engineering managers, judging the quality of what an AI coding agent produces, not necessarily typing every line of it themselves.</p>
          </div>
        </div>
        <div class="pack-grid">${businessTrainingCurriculum.map((day) => curriculumDayCard(day)).join("")}</div>
      </section>

      <section class="section compact" id="tools">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("build")} Choose 3 of 9</span>
            <h2>A menu of internal tools that could help your business immediately.</h2>
            <p>Every engagement picks 3 from this list, customized to your real workflows. One is the focus of Days 1-2 while your team learns the flow; the other two get built in parallel on Day 3.</p>
          </div>
        </div>
        <div class="industry-grid">${toolsMenu.map((tool) => toolMenuCard(tool)).join("")}</div>
      </section>

      <section class="section compact" id="request">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("payments")} Team Training Pricing</span>
            <h2>Train 1 employee or 20 — one request, done.</h2>
            <p>Pick how many employees you're training below. Every seat includes the full 4-day, 4-hour/day custom engagement, 3 real internal tools built for your business, and dedicated AutoNateAI Discord access. Need a different number? Enter it directly in the form.</p>
          </div>
        </div>
        <div class="industry-grid offer-grid">${sponsorshipTiers.map((tier) => sponsorshipTierCard(tier)).join("")}</div>
      </section>

      <section class="section compact" id="pay">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("shopping_cart")} Complete Your Training Request</span>
            <h2>Reserve training for your team.</h2>
            <p>Card payment is processed securely through Square. Once payment is confirmed, we reach out to schedule your 4-day engagement and customize the curriculum around your business's real workflows.</p>
          </div>
        </div>
        <div class="checkout-grid sponsorship-checkout" data-sponsorship-form>
          <section class="checkout-form">
            <div class="form-stack payment-fields">
              <label>Number of Employees
                <input type="number" min="1" max="200" step="1" value="1" data-sponsorship-field="seats" data-sponsorship-seats />
              </label>
              <div class="two-col">
                <label>Organization<input data-sponsorship-field="organization" autocomplete="organization" placeholder="Your business name" required /></label>
                <label>Contact Name<input data-sponsorship-field="name" autocomplete="name" placeholder="Jordan Rivera" required /></label>
              </div>
              <label>Contact Email<input data-sponsorship-field="email" autocomplete="email" type="email" placeholder="jordan@example.com" required /></label>
            </div>
            <div class="square-status" data-square-status hidden></div>
            <div class="form-stack payment-fields">
              <label>Name on Card<input data-sponsorship-field="cardholderName" autocomplete="cc-name" placeholder="Jordan Rivera" /></label>
            </div>
            <div class="square-card-label">
              <strong>Card Info</strong>
              <span>Encrypted and processed by Square</span>
            </div>
            <div class="square-card-container" data-square-card><span>Loading secure card fields...</span></div>
            <p class="fine-print" data-sponsorship-status>Prefer to pay by invoice, or have questions first? Write to <a href="mailto:autonate.ai@gmail.com?subject=AutoNateAI%20training%20invoice">autonate.ai@gmail.com</a>.</p>
          </section>
          <aside class="order-summary">
            <h2>Order Summary</h2>
            <div class="checkout-product-strip">
              <div>
                <strong>Custom Team Training</strong>
                <span>4 days &middot; On-site or Center Street Station, Sikeston, MO</span>
                <em data-sponsorship-seats-label>1 seat &middot; $499 per seat</em>
              </div>
            </div>
            <div class="summary-line"><span>Subtotal</span><b data-sponsorship-total>$499</b></div>
            <div class="summary-line"><span>Transaction Fee</span><b>$0</b></div>
            <div class="total-line"><span>Total</span><b data-sponsorship-total-2>$499</b></div>
            <button type="button" class="primary-button full disabled" data-sponsorship-submit aria-disabled="true">Complete Purchase ${icon("arrow_forward")}</button>
            <p class="fine-print">You'll get a confirmation on screen once payment clears. Our team follows up within 1-2 business days to schedule your engagement.</p>
          </aside>
        </div>
        <div class="sponsorship-success" data-sponsorship-success hidden>
          <div class="success-mark">${icon("check_circle")}</div>
          <h2>Training request confirmed.</h2>
          <p data-sponsorship-success-detail>Payment received. We'll reach out to schedule your engagement.</p>
          <p>Next: we work with you to pick the 3 tools, schedule your 4 days, and get your team added to the AutoNateAI Discord to prepare.</p>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "Custom AI Training for Local Businesses | Sikeston, MO | AutoNateAI",
    active: "for-organizations",
    body,
    canonicalPath: "/for-organizations",
    ogImage: "/assets/og/for-organizations.jpg",
    description:
      "Custom, on-site AI and development training for Southeast Missouri businesses: 4 days, real ChatGPT/Claude/Codex/Claude Code workflows, and 3 real internal tools your team builds and keeps.",
    ogTitle: "Custom AI & development training, built around your business.",
    ogDescription:
      "A requested, customized 4-day training engagement for your team — prompt and context engineering, real internal tools chosen from a menu of 9, built for your industry.",
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

export function renderEvents() {
  const industryBySlug = new Map(industries.map((industry) => [industry.slug, industry]));
  const [nextWeek, ...laterWeeks] = industryWeeks;
  const nextIndustry = industryBySlug.get(nextWeek?.industry);
  const body = `
    <main class="league-page consulting-page">
      <section class="home-hero league-detail-hero">
        <div class="hero-bg"><img src="/assets/landing/sikeston-build-lab-live.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("event")} AutoNateAI Industry Build Labs</span>
          <h1>We build a real internal tool live, every week, free.</h1>
          <p>One industry gets the spotlight each week. Three live sessions — Tuesday, Wednesday, Thursday, 11:30 AM Central — each building a different internal tool for that week's industry. No slides, no theory-only session: real workflow, researched and built live, on Google Meet.</p>
          <div class="button-row">
            <a class="primary-button" href="#schedule">See the Schedule ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/consulting">Bring Us Your Workflow</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/sikeston-internal-tool-laptop.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("route")} How a Build Lab Works</span>
            <h2>${escapeHtml(buildLabInfo.format)}</h2>
            <div class="hero-facts">
              <span>Free, every week</span>
              <span>3 sessions/week</span>
              <span>Google Meet</span>
              <span>Guest operators welcome</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <section class="section compact">
        <div class="section-head section-head-center">
          <div>
            <span class="kicker">${icon("route")} The Methodology, Live</span>
            <h2>Research, architecture, build, refine — the same process every session.</h2>
          </div>
        </div>
        <div class="compete-curriculum">
          <article><b>01</b><span>Research the real workflow with ChatGPT — terminology, constraints, what actually happens today.</span></article>
          <article><b>02</b><span>Architect the system with Claude — requirements, data model, system diagram.</span></article>
          <article><b>03</b><span>Scaffold it with Codex — database, API, and a working UI, live.</span></article>
          <article><b>04</b><span>Refine it with Claude Code, then open the floor — would this actually work inside your operation?</span></article>
        </div>
      </section>

      ${
        nextIndustry
          ? `<section class="section compact">
        <div class="section-head section-head-center">
          <div>
            <span class="kicker">${icon("bolt")} Up Next</span>
            <h2>${escapeHtml(nextIndustry.name)} — ${escapeHtml(weekRangeLabel(nextWeek.days))}</h2>
            <p>${escapeHtml(nextIndustry.tagline)}</p>
          </div>
        </div>
        <div class="week-calendar-solo">${industryWeekCalendarCard(nextWeek, industryBySlug, true)}</div>
      </section>`
          : ""
      }

      <section class="section" id="schedule">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("calendar_month")} The Rotation</span>
            <h2>One industry a week, three builds each.</h2>
            <p>We cycle through the region's industries, one spotlight week at a time. This list grows as we schedule more.</p>
          </div>
        </div>
        <div class="industry-grid week-calendar-grid">${laterWeeks.map((week) => industryWeekCalendarCard(week, industryBySlug)).join("")}</div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("business_center")} Want this built for your organization?</span>
          <h2>See a workflow like yours built live, then bring us the real one.</h2>
          <p>Every Build Lab session doubles as a live demonstration of AutoNateAI Consulting's process. If you like what you see, bring us your actual workflow.</p>
        </div>
        <a class="primary-button" href="/consulting#book">Talk to AutoNateAI ${icon("arrow_forward")}</a>
      </section>
    </main>
  `;

  return pageShell({
    title: "Industry Build Labs | Free Weekly AI Live Builds | AutoNateAI",
    active: "events",
    body,
    canonicalPath: "/events",
    ogImage: "/assets/og/events.jpg",
    description:
      "AutoNateAI's free weekly Industry Build Labs: a real Southeast Missouri industry workflow, built live into a real internal AI tool, three sessions a week, over Google Meet.",
    ogTitle: "We build a real internal tool live, every week, free.",
    ogDescription:
      "One industry gets the spotlight each week — three live build sessions, Tuesday through Thursday, 11:30 AM Central. Free, over Google Meet.",
  });
}

export function renderConsulting(data) {
  const pilot = foundingBankPilot;
  const slotsRemaining = Math.max(pilot.slotsTotal - pilot.slotsFilled, 0);
  const body = `
    <main class="league-page consulting-page">
      <section class="home-hero league-detail-hero">
        <div class="hero-bg"><img src="/assets/landing/sikeston-consulting-industries.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("hub")} AutoNateAI Consulting</span>
          <h1>We build the internal AI tools your business wishes existed.</h1>
          <p>Your team knows the business. AutoNateAI knows intelligent systems. Together, we turn a real daily workflow — in agriculture, automotive, construction, finance, government, graphic arts, healthcare, manufacturing, or tourism — into an internal tool your own people can run and maintain. See it happen for free every week at the <a href="/events">Industry Build Labs</a>, or bring us your workflow directly.</p>
          <div class="button-row">
            <a class="primary-button" href="#book">Bring Us a Workflow ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="#industries">See the Nine Industries</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/api-data-model.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("apartment")} How It Works</span>
            <h2>Domain expertise + agentic AI = an internal tool your team owns.</h2>
            <p>We research the workflow, architect the system, build it, and hand it off — with your own people capable of running and extending it, not waiting on a vendor.</p>
            <div class="hero-facts">
              <span>Fixed-scope pricing</span>
              <span>Nine regional industries</span>
              <span>Ex-Veterans United AI R&D</span>
              <span>Free weekly build labs</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <section class="section regional-industries-section" id="industries">
        <div class="section-head section-head-center">
          <div>
            <span class="kicker">${icon("map")} Nine Regional Industries</span>
            <h2>The industries carrying Southeast Missouri's economy — and where internal AI tooling pays off inside each one.</h2>
            <p>These are the same nine industries behind the weekly <a href="/events">Industry Build Labs</a>: real workflows, reverse-engineered or reimagined into working internal tools, live.</p>
          </div>
        </div>
        <div class="industry-grid">${industries.map((industry) => industryCard(industry)).join("")}</div>
      </section>

      <section class="section compact bank-ladder-section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("route")} How Engagements Grow</span>
            <h2>Most AI vendors sell you a platform first. We start by studying how your organization actually works.</h2>
            <p>Every relationship starts small and earns its way up: research your real workflow, run a scoped pilot, build the production system, then stay on as a standing AI and data partner if it's a fit.</p>
          </div>
        </div>
        ${bankLadderStrip()}
      </section>

      <section class="section industries-section" id="offerings">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("apartment")} Finance &amp; Banking — Our Flagship Vertical</span>
            <h2>The most fully scoped of the nine: nine fixed-price offerings for community and regional banks.</h2>
            <p>Community and regional banks have real operational complexity but no 125-person AI R&D team like the national banks. Nathan built AI research and document/call-processing systems inside Veterans United Home Loans' AI R&D team — same caliber of engineering, scoped and priced for a bank your size. The other eight industries follow this same fixed-scope model once we've mapped your workflow.</p>
          </div>
        </div>
        <div class="section-head" style="margin-top:0;">
          <div>
            <h3 style="margin:0;">Our Nine Banking Service Offerings</h3>
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
                  <option value="Discord">Discord</option>
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
          <h2>Watch a real internal tool get built live, free, every week.</h2>
          <p>The Industry Build Labs are the same methodology in public: a real workflow, researched and architected on the spot, built live, with an open floor for Q&amp;A. Or start with the four free digital courses to see the fundamentals first.</p>
        </div>
        <div class="button-row">
          <a class="primary-button" href="/events">See the Build Lab Schedule ${icon("arrow_forward")}</a>
          <a class="outline-button" href="/tutorials">See the Free Courses</a>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "AI Consulting for Southeast Missouri Businesses | AutoNateAI",
    active: "consulting",
    body,
    canonicalPath: "/consulting",
    ogImage: "/assets/og/consulting.jpg",
    description:
      "AutoNateAI Consulting builds internal AI tools for Southeast Missouri businesses across nine regional industries — agriculture, automotive, construction, finance, government, graphic arts, healthcare, manufacturing, and tourism.",
    ogTitle: "We build the internal AI tools your business wishes existed.",
    ogDescription:
      "Nine regional industries, one methodology: research the workflow, architect the system, build it live, hand it off to a team that can run it. See it happen free every week at the Industry Build Labs.",
  });
}

export function renderTutorials() {
  const body = `
    <main class="tutorials-page">
      <section class="home-hero tutorials-detail-hero">
        <div class="hero-bg"><img src="/assets/landing/learning-path.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("menu_book")} Free Course Library</span>
          <h1>Sharpen your technical skills. Free.</h1>
          <p>A free library of technical courses — JavaScript fundamentals, prompt and context engineering, databases, and agentic AI — with real curriculum, real code, and Discord support the whole way through. No enrollment, no cost, no catch.</p>
          <div class="button-row">
            <a class="primary-button" href="https://discord.gg/4HkkuntdSs">Join the Discord ${icon("open_in_new")}</a>
            <a class="secondary-button" href="#catalog">Browse the Courses</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/learning-path.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("terminal")} Built for Where You're At</span>
            <h2>Start wherever you are, free, always.</h2>
            <p>New to programming? Start with Nate and Kai's story and learn JavaScript from zero. Know some code already? Jump straight into whichever course matches what you're building next. These are the same fundamentals behind every internal tool AutoNateAI ships.</p>
            <div class="hero-facts">
              <span>${tutorialPacks.length} free digital courses</span>
              <span>Copy-ready code</span>
              <span>Local setup</span>
              <span>Discord support included</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("route")} Many Ways In</span>
            <h2>There's no single right way to start.</h2>
            <p>Self-taught builder or working professional — these four courses stand on their own, no matter why you're here.</p>
          </div>
        </div>
        <div class="value-grid">
          <article><span>${icon("looks_one")}</span><h3>New to programming?</h3><p>Start here with Intro to JavaScript for Beginners.</p></article>
          <article><span>${icon("looks_two")}</span><h3>Know some code?</h3><p>Start with Prompt and Context Engineering.</p></article>
          <article><span>${icon("looks_3")}</span><h3>Ready for systems?</h3><p>Move on to Relational Databases and Graphs.</p></article>
          <article><span>${icon("looks_4")}</span><h3>Ready for real problems?</h3><p>Finish with Civics and Agentic AI.</p></article>
        </div>
      </section>

      <section class="section pack-catalog-section" id="catalog">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("view_module")} Pick a Course</span>
            <h2>Each course is a complete path, start to finish.</h2>
            <p>Open a course to see its lessons in order. New courses show up here as they ship.</p>
          </div>
        </div>
        <div class="pack-grid">${tutorialPacks.map((pack) => packCard(pack)).join("")}</div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("forum")} Help Whenever You Need It</span>
            <h2>The Discord is where the community lives.</h2>
            <p>It's open all day, every day: setup and concept help for anyone working through the courses, and a place to talk through a system you're designing or stuck on, whether it's from a course or an idea of your own.</p>
          </div>
          <a class="primary-button" href="https://discord.gg/4HkkuntdSs">Join the Discord ${icon("open_in_new")}</a>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "Free AI & Coding Courses | Southeast Missouri | AutoNateAI",
    active: "tutorials",
    body,
    canonicalPath: "/tutorials",
    ogImage: "/assets/og/courses.jpg",
    description:
      "A free library of technical courses: JavaScript fundamentals, prompt and context engineering, relational databases and graphs, and civics with agentic AI, following Nate and Kai as they build AutoNateAI. Discord support included.",
    ogTitle: "Sharpen your technical skills. Free.",
    ogDescription:
      "A free course library with real curriculum and real code, plus a Discord community for help along the way. No enrollment, no cost, no catch.",
  });
}

export function renderTutorialPack(pack) {
  const items = tutorials.filter((tutorial) => tutorial.pack === pack.handle);
  const tracks = [...new Set(items.map((tutorial) => tutorial.track))];
  const comingSoon = pack.status !== "Active";

  const body = `
    <main class="tutorials-page pack-page">
      <nav class="breadcrumbs pack-breadcrumbs"><a href="/">Home</a><span>/</span><a href="/tutorials">Free Courses</a><span>/</span><b>${escapeHtml(pack.title)}</b></nav>
      <section class="home-hero tutorials-detail-hero">
        <div class="hero-bg">${packMedia(pack)}</div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon(pack.icon)} ${escapeHtml(pack.tagline)}</span>
          <h1>${escapeHtml(pack.title)}</h1>
          <p>${escapeHtml(pack.summary)}</p>
          <div class="button-row">
            <a class="primary-button" href="/programs/ai-agent-systems">Take the Program ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/tutorials">All Courses</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          ${packMedia(pack)}
          <div class="hero-panel-body">
            <span class="kicker">${icon("terminal")} This Course</span>
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
          <a href="/tutorials">All Courses</a>
          <a href="/for-organizations">For Organizations</a>
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
      <nav class="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/tutorials">Free Courses</a><span>/</span><a href="/tutorials/${pack.handle}">${escapeHtml(pack.title)}</a><span>/</span><b>${escapeHtml(tutorial.title)}</b></nav>
      <div class="tutorial-detail-layout">
        <aside class="docs-sidebar tutorial-detail-sidebar">
          <strong>${escapeHtml(pack.title)}</strong>
          ${packTutorials.map((item) => `<a class="${item.handle === tutorial.handle ? "active" : ""}" href="/tutorials/${pack.handle}/${escapeHtml(item.handle)}">${escapeHtml(item.episode)} ${escapeHtml(item.title)}${item.draft ? " (soon)" : ""}</a>`).join("")}
          <a href="/tutorials">All Courses</a>
          <a href="/consulting">Consulting</a>
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
              <span class="kicker">${icon("architecture")} Want to see this at real scale?</span>
              <h2>The free guide gets you moving. Consulting builds the real thing.</h2>
              <p>See these same skills — agent workflows, Git strategy, architecture, debugging under pressure — turned into a real internal tool for a real Southeast Missouri business.</p>
            </div>
            <a class="primary-button" href="/consulting">See Consulting ${icon("arrow_forward")}</a>
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
        <div class="hero-bg"><img src="/assets/landing/sikeston-group-collaboration.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("groups")} AutoNateAI Community</span>
          <h1>A place to build, ask, debug, and talk systems all day.</h1>
          <p>The four free courses and the in-person program are the structured path. The Discord is where the help never stops: setup and concept questions on the courses, architecture reviews and build support on the program, and project help for builders who already know the pillars and need to design or build something they came up with themselves.</p>
          <div class="button-row">
            <a class="primary-button" href="https://discord.gg/4HkkuntdSs">Join the Discord ${icon("open_in_new")}</a>
            <a class="secondary-button" href="/tutorials">Start the Free Courses</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/community-discord.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("forum")} Discord</span>
            <h2>Join the build room.</h2>
            <p>Come for setup on the courses. Stay for build reviews, project help, and strange bugs — any day of the week.</p>
            <div class="hero-facts">
              <span>Setup help</span>
              <span>Code review</span>
              <span>Agent prompts</span>
              <span>Project help</span>
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
          <div><span class="material-symbols-outlined">travel_explore</span><h3>Project Research</h3><p>Trade notes on real organizational problems worth building toward, whether it's for the program or something you're building on your own.</p></div>
          <div><span class="material-symbols-outlined">auto_stories</span><h3>Course Help</h3><p>Ask questions on any of the four free courses — JavaScript, prompting, databases, or civics and agentic AI.</p></div>
          <div><span class="material-symbols-outlined">edit_note</span><h3>Builder Notes</h3><p>Post reflections, architecture notes, and lessons learned so the whole community gets sharper.</p></div>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "Community & Discord Support | Sikeston, MO | AutoNateAI",
    active: "community",
    body,
    canonicalPath: "/community",
    ogImage: "/assets/og/community.jpg",
    description:
      "Join the AutoNateAI Discord community in Sikeston, MO for help with the four free AI and coding courses, the in-person program, and any system you're building on your own — Southeast Missouri workforce development, all day, every day.",
    ogTitle: "The systems lab has a Discord.",
    ogDescription:
      "Get setup help, code review, agent workflow practice, and project help with the AutoNateAI community — open all day, every day.",
  });
}

export function renderArticles() {
  const featuredArticle = articles.find((article) => article.handle === "why-southeast-missouri-businesses-need-internal-ai-capability");
  const listedArticles = articles.filter((article) => article.handle !== featuredArticle?.handle);
  const body = `
    <main class="articles-page">
      <section class="home-hero articles-hero">
        <div class="hero-bg">${featuredArticle ? `<img src="${featuredArticle.image}" alt="" />` : ""}</div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("article")} Articles</span>
            <h1>AI, Workforce &amp; Systems in Southeast Missouri.</h1>
            <p>Research, practical guides, workforce insights, and field notes documenting how AI and software systems are changing the organizations and careers around us — written for students, working professionals, and the employers, schools, and nonprofits sponsoring them.</p>
            ${featuredArticle ? `<div class="button-row"><a class="primary-button" href="/articles/${featuredArticle.handle}">Read Featured Article ${icon("arrow_forward")}</a></div>` : ""}
          </div>
          ${
            featuredArticle
              ? `<aside class="hero-program-panel">
            <img src="${featuredArticle.image}" alt="${escapeHtml(featuredArticle.title)}" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("bookmark")} Featured &middot; ${escapeHtml(featuredArticle.category)} &middot; ${escapeHtml(featuredArticle.readingTime)}</span>
              <h2>${escapeHtml(featuredArticle.title)}</h2>
              <p>${escapeHtml(featuredArticle.summary)}</p>
              <div class="hero-facts">${featuredArticle.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
            </div>
          </aside>`
              : ""
          }
        </div>
      </section>
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
    title: "AI & Workforce Development Articles | Southeast Missouri | AutoNateAI",
    active: "articles",
    body,
    canonicalPath: "/articles",
    ogImage: "/assets/og/articles.jpg",
    description:
      "Research, workforce insights, and field notes on how AI and software systems are changing the organizations and careers around Southeast Missouri.",
    ogTitle: "AI, Workforce & Systems in Southeast Missouri.",
    ogDescription:
      "Workforce readiness research, employer and school impact reports, and behind-the-scenes build notes for students, professionals, and the organizations sponsoring them.",
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
          <div class="square-status" data-square-status hidden></div>
          <div class="checkout-product-strip">
            <div>
              <strong>${escapeHtml(program?.name || "AutoNateAI Program")}</strong>
              <span>${program?.durationWeeks || 2} weeks &middot; ${(program?.sessions || []).length || 8} live sessions &middot; ${offering?.capacity || 20}-seat cohort</span>
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
      "Your seat is reserved. Next comes setup, Git, AI agents, system design, and building a real system for your organizational project.",
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
      <p>This course's lessons are still being written. The outline below shows what's planned — check back soon, or ask in Discord for early access.</p>
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
          <span class="pack-card-link">${available ? "View Course" : "Preview Course"} ${icon("arrow_forward")}</span>
        </div>
      </div>
    </a>
  `;
}

function programThumbnail(program) {
  return program.handle === "ai-agent-systems" ? "/assets/landing/sikeston-hero-teaching.jpg" : shot(program.sequence);
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
    ["Your project, design, and the real build", "Review AI-generated code like an engineer, pick your organizational project and define the real user scenarios it needs to handle, then turn it into a real system design and ship it live against them."],
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
          <p>Builders finish by shipping a real system, built live, for a real organizational project they chose themselves.</p>
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
