// Operator OS pages (2026-09-28 repositioning). Home, the Operator OS
// product page, Pricing, the Research & Case Studies hub, the operator
// article detail page, About, and Work With Us. Content comes from
// operator-os-data.mjs. The earlier agricultural research is unpublished.
import { escapeHtml, icon, pageShell } from "./components.mjs";
import {
  breadcrumbs,
  formatDate,
  markdownToHtml,
  readResearchMarkdown,
  stripFirstHeading,
} from "./pages.mjs";
import {
  operatorArticles,
  operatorArticleStatusLabels,
  operatorFaqs,
  operatorGraphEntities,
  operatorModules,
  operatorPackages,
  operatorResearchSignal,
  operatorSegments,
  operatorStack,
} from "./operator-os-data.mjs";

const DISCOVERY_CTA = "/work-with-us";

function searchAttr(...parts) {
  return escapeHtml(parts.filter(Boolean).join(" ").toLowerCase());
}

function questionNumber(article) {
  return `Q${String(article.n).padStart(2, "0")}`;
}

export function operatorArticleCard(article) {
  return `
    <a class="lab-card" href="/research-and-case-studies/${article.slug}" data-category="Operator OS" data-search="${searchAttr(article.title, article.hook, ...article.audience)}">
      <article class="industry-card opos-article-card">
        <div class="card-thumbnail"><img src="${article.thumbnail}" alt="" loading="lazy" /><span class="status-pill">${escapeHtml(operatorArticleStatusLabels[article.status] || article.status)}</span></div>
        <span class="kicker">${icon(article.icon)} ${questionNumber(article)} &middot; ${escapeHtml(article.audience[0])}</span>
        <h3>${escapeHtml(article.title)}</h3>
        <p class="industry-hook">${escapeHtml(article.hook)}</p>
        <span class="outline-button full">${article.status === "published" ? "Read the Research" : "See What We're Investigating"} ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

// The hero "cockpit" — an illustrative, static rendering of what the
// operator sees: a conversation on the left writing into the graph, and the
// cockpit state it produces on the right. Deliberately generic sample data
// (no real prospects or clients).
function cockpitMock() {
  return `
    <div class="opos-cockpit" aria-label="Illustration of the Operator OS: a conversation updating a live business cockpit">
      <div class="opos-cockpit-bar"><i></i><i></i><i></i><span>operator-os / cockpit</span><b>${icon("sensors")} Live</b></div>
      <div class="opos-cockpit-body">
        <nav class="opos-cockpit-nav" aria-hidden="true">
          <span class="active">${icon("hub")} Focus</span>
          <span>${icon("person_search")} Prospects</span>
          <span>${icon("handshake")} Clients</span>
          <span>${icon("diversity_3")} Partners</span>
          <span>${icon("flag")} Goals</span>
          <span>${icon("schedule")} Timebox</span>
        </nav>
        <div class="opos-cockpit-main">
          <div class="opos-chat">
            <span class="opos-chat-label">${icon("forum")} You &rarr; ChatGPT</span>
            <p>"Met Dana at the chamber mixer. She runs a 4-agent brokerage and is drowning in follow-ups. Set up a demo Thursday."</p>
          </div>
          <div class="opos-writes">
            <span>${icon("check_circle")} Organization created</span>
            <span>${icon("check_circle")} Person linked</span>
            <span>${icon("check_circle")} Relationship &rarr; Prospect</span>
            <span>${icon("check_circle")} Touchpoint &middot; Thu 11:00</span>
          </div>
          <div class="opos-prospect">
            <div class="opos-prospect-head">
              <div><strong>Harbor Line Realty</strong><small>Real estate &middot; Referral &middot; New</small></div>
              <b>Score 87</b>
            </div>
            <div class="opos-meter"><i style="width:62%"></i></div>
            <div class="opos-prospect-meta"><span>Research 62%</span><span>Next: Demo Thu</span></div>
            <div class="opos-prospect-meta"><span>3 findings</span><span>2 tasks</span><span>1 touchpoint</span></div>
          </div>
          <div class="opos-timebox">
            <span class="opos-chat-label">${icon("schedule")} Tomorrow's timebox</span>
            <ol>
              <li><b>5:00</b> Deep build &middot; brokerage operating graph</li>
              <li><b>7:15</b> Revenue &middot; prep Thursday demo</li>
              <li><b>9:30</b> Pipeline &middot; 12 ranked contractor prospects</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  `;
}

function discoveryBand(title, text) {
  return `
      <section class="section compact">
        <div class="detail-enroll-band opos-cta-band">
          <div>
            <span class="kicker">${icon("call")} Discovery Call &middot; 20&ndash;30 min</span>
            <h2>${title}</h2>
            <p>${text}</p>
          </div>
          <a class="primary-button" href="${DISCOVERY_CTA}">Book a Discovery Call ${icon("arrow_forward")}</a>
        </div>
      </section>`;
}

function packageCard(pkg, { compact = false } = {}) {
  return `
    <article class="opos-package${pkg.featured ? " featured" : ""}">
      ${pkg.featured ? `<span class="opos-package-flag">Most operators start here</span>` : ""}
      <span class="kicker">${escapeHtml(pkg.name)}</span>
      <h3>${escapeHtml(pkg.price)}</h3>
      <small>${escapeHtml(pkg.unit)}</small>
      <p>${escapeHtml(pkg.summary)}</p>
      ${compact ? "" : `<ul>${pkg.includes.map((item) => `<li>${icon("check")} ${escapeHtml(item)}</li>`).join("")}</ul>`}
    </article>
  `;
}

function faqSection(faqs, heading = "Common questions") {
  return `
      <section class="section compact about-faq">
        <div class="section-head"><div><span class="kicker">${icon("help")} FAQ</span><h2>${heading}</h2></div></div>
        <div class="opos-faq">
          ${faqs.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary>${escapeHtml(q)}${icon("expand_more")}</summary><p>${escapeHtml(a)}</p></details>`).join("")}
        </div>
      </section>`;
}

function faqStructuredData(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  };
}

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AutoNateAI Operator OS",
  "serviceType": "Conversational AI operating system implementation for small businesses",
  "provider": { "@type": "Organization", "name": "AutoNateAI", "url": "https://autonateai.com" },
  "areaServed": { "@type": "Country", "name": "United States" },
  "audience": { "@type": "BusinessAudience", "audienceType": "Contractors, operators, and small businesses" },
  "offers": operatorPackages.map((pkg) => ({
    "@type": "Offer",
    "name": `Operator OS — ${pkg.name}`,
    "description": pkg.summary,
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "USD",
      "minPrice": Number(pkg.price.replace(/[^0-9–-]/g, "").split(/[–-]/)[0]),
    },
  })),
};

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------
export function renderHome() {
  const latest = [...operatorArticles].sort((a, b) => a.n - b.n).slice(0, 6);

  const tax = [
    ["neurology", "Remembering where everything lives"],
    ["swap_horiz", "Moving context between tools by hand"],
    ["notifications_off", "Checking whether follow-ups actually happened"],
    ["edit_note", "Translating ideas into software requirements"],
  ];
  const tools = ["CRM", "Email", "Calendar", "Spreadsheets", "Files", "Lead lists", "Texts", "ChatGPT"];

  const loop = [
    ["handshake", "Relationships", "Everyone you meet, scrape, or get referred — one graph."],
    ["flag", "Goals", "Created once research says the opportunity is real."],
    ["task_alt", "Tasks", "Generated under goals, flowing into your day."],
    ["schedule", "Attention", "Time-boxed, so no one node eats the week."],
    ["paid", "Outcomes", "Closed work, collected revenue, new relationships."],
  ];

  const day = [
    ["wb_twilight", "Morning", "\"What should I build first today?\"", "Your AI reads the graph — open goals, waiting dependencies, last night's reflection — and answers with tomorrow's plan already routed into time blocks."],
    ["phone_in_talk", "Midday", "\"Just got off with the HVAC guy. He wants a quote by Friday.\"", "The touchpoint is logged, the relationship stage moves, a quote task lands on Thursday's revenue block. The cockpit updates while you're still in the truck."],
    ["nights_stay", "Evening", "\"Here's how today went.\"", "Your reflection becomes graph changes: finished work closes, stale tasks drop, and tomorrow's timebox rewrites itself around what actually happened."],
  ];

  const body = `
    <main class="lab-home opos-home">
      <section class="home-hero lab-masthead opos-hero">
        <div class="hero-bg"><img src="/assets/operator-os/home-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("hub")} The AutoNateAI Operator OS</span>
            <h1>Run your business by talking to it.</h1>
            <p>We install a conversational operating system around your business. You talk to ChatGPT or Claude. Your business memory stays structured underneath. A custom cockpit shows you exactly what your AI sees. We handle the engineering.</p>
            <div class="lab-byline">
              <img src="/assets/nathan-baker.jpeg" alt="Nathan Baker" />
              <div><strong>Nathan Baker</strong><span>Founder &amp; Systems Architect, AutoNateAI</span></div>
            </div>
            <div class="button-row">
              <a class="primary-button" href="${DISCOVERY_CTA}">Book a Discovery Call ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="/operator-os">See How It Works</a>
            </div>
          </div>
          ${cockpitMock()}
        </div>
      </section>

      <section class="opos-signal">
        <div>
          <strong>${operatorResearchSignal.stat}</strong>
          <p>${escapeHtml(operatorResearchSignal.label)} <a href="${operatorResearchSignal.url}" rel="noopener" target="_blank">${escapeHtml(operatorResearchSignal.source)}</a></p>
        </div>
        <p class="opos-signal-turn">So the question isn't whether you use AI anymore. It's whether your business is <em>structured</em> so AI can operate inside it.</p>
      </section>

      <section class="section opos-problem">
        <div class="opos-problem-copy">
          <span class="kicker">${icon("warning")} The Problem</span>
          <h2>Right now, you are the integration layer.</h2>
          <p>Small-business software arrives one tool at a time. Each tool might work fine on its own. But the owner is still the thing connecting them, carrying the state of the business around in their head.</p>
          <ul class="opos-tax">
            ${tax.map(([ic, text]) => `<li>${icon(ic)} ${escapeHtml(text)}</li>`).join("")}
          </ul>
          <p>That hidden tax doesn't show up on an invoice. It shows up as missed follow-ups, slow quotes, and evenings spent catching up.</p>
        </div>
        <div class="opos-glue" aria-hidden="true">
          <div class="opos-glue-tools">${tools.map((t) => `<span>${t}</span>`).join("")}</div>
          <div class="opos-glue-arrow">${icon("south")}</div>
          <div class="opos-glue-head">${icon("psychology_alt")}<strong>The owner's head</strong><small>the only place it all connects</small></div>
        </div>
      </section>

      <section class="section opos-connect">
        <div class="section-head section-head-center">
          <div>
            <span class="kicker">${icon("account_tree")} How It All Connects</span>
            <h2>Talk. Remember. See. Execute.</h2>
            <p>Four layers, one shared memory. You only ever touch the top one and look at the third.</p>
          </div>
        </div>
        <div class="opos-layers">
          <article>
            <span class="opos-layer-num">01</span>
            ${icon("forum")}
            <h3>Talk</h3>
            <p>You operate through ChatGPT or Claude. Tell it what happened, ask what's next, approve what it proposes.</p>
            <small>ChatGPT &middot; Claude</small>
          </article>
          <article class="opos-layer-core">
            <span class="opos-layer-num">02</span>
            ${icon("database")}
            <h3>Remember</h3>
            <p>Every conversation writes to one structured graph: organizations, people, relationships, goals, projects, touchpoints, tasks, research.</p>
            <small>Structured memory &middot; Airtable</small>
          </article>
          <article>
            <span class="opos-layer-num">03</span>
            ${icon("monitoring")}
            <h3>See</h3>
            <p>A custom cockpit renders that graph live, so you can verify what the AI sees and manage every flow in one place.</p>
            <small>Custom web cockpit</small>
          </article>
          <article>
            <span class="opos-layer-num">04</span>
            ${icon("smart_toy")}
            <h3>Execute</h3>
            <p>Agents do the repetitive work: research, scraping, ranking, drafting, alerts. Coding agents grow the system when you need a new feature.</p>
            <small>Agents &middot; Codex &middot; Claude Code</small>
          </article>
        </div>
        <p class="opos-connect-foot">${icon("architecture")} <span><strong>AutoNateAI architects the whole thing</strong>: the data model, the integrations, the interface, and every feature that comes after. You bring the judgment, the relationships, and the final decisions.</span></p>
      </section>

      <section class="section opos-loop-section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("cycle")} The Operating Loop</span>
            <h2>Relationships become revenue on purpose.</h2>
            <p>The graph doesn't just store contacts. It connects every relationship to the attention it deserves.</p>
          </div>
        </div>
        <ol class="opos-loop">
          ${loop.map(([ic, name, text]) => `<li>${icon(ic)}<strong>${name}</strong><span>${text}</span></li>`).join("")}
        </ol>
      </section>

      <section class="spotlight-section opos-day">
        <div>
          <span class="kicker">${icon("chat")} What Operating It Looks Like</span>
          <h2>It's mostly just conversation.</h2>
          <p>No new software to learn. No fields to fill in. You talk the way you already talk about your business, and the system keeps the state.</p>
          <div class="button-row"><a class="primary-button" href="${DISCOVERY_CTA}">See It Live on a Call ${icon("arrow_forward")}</a></div>
        </div>
        <div class="opos-day-steps">
          ${day.map(([ic, when, said, what]) => `
            <article>
              <span class="kicker">${icon(ic)} ${when}</span>
              <p class="opos-said">${escapeHtml(said)}</p>
              <p>${escapeHtml(what)}</p>
            </article>`).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("groups")} Who It's For</span>
            <h2>Operators carrying too much in their heads.</h2>
            <p>The best fit isn't "a business that wants AI." It's a business where revenue, service quality, or growth is capped by scattered information and owner attention.</p>
          </div>
        </div>
        <div class="opos-segments">
          ${operatorSegments.map((seg) => `
            <article class="industry-card">
              <div class="industry-card-icon">${icon(seg.icon)}</div>
              <h3>${escapeHtml(seg.name)}</h3>
              <p class="industry-hook">${escapeHtml(seg.examples)}</p>
              <ul class="industry-capabilities">${seg.uses.map((u) => `<li>${icon("check")}<span>${escapeHtml(u)}</span></li>`).join("")}</ul>
            </article>`).join("")}
        </div>
      </section>

      <section class="section opos-demo">
        <div class="section-head section-head-center">
          <div>
            <span class="kicker">${icon("slideshow")} The Discovery Call</span>
            <h2>You don't have to imagine it.</h2>
            <p>Every discovery call walks the same three screens.</p>
          </div>
        </div>
        <div class="opos-demo-steps">
          <article><b>1</b><h3>Our production system</h3><p>AutoNateAI runs on its own Operator OS. You see the real cockpit running a real business: prospects, goals, research threads, tomorrow's timebox.</p></article>
          <article><b>2</b><h3>Your simulated system</h3><p>We model your operation from what we can already observe and show you what your graph and cockpit would look like.</p></article>
          <article><b>3</b><h3>Your production system</h3><p>If it fits, we scope the build: which workflows, which integrations, which package. If it doesn't fit, we'll say so.</p></article>
        </div>
      </section>

      <section class="section opos-pricing-teaser">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("sell")} Pricing</span>
            <h2>A managed operating system, priced like one.</h2>
            <p>One-time build, optional monthly care. Custom intelligence modules scoped separately.</p>
          </div>
          <a class="primary-button" href="/pricing">See Full Pricing ${icon("arrow_forward")}</a>
        </div>
        <div class="opos-packages opos-packages-compact">
          ${operatorPackages.map((pkg) => packageCard(pkg, { compact: true })).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("quiz")} Research &amp; Case Studies</span>
            <h2>Questions operators already feel.</h2>
            <p>We research one operational bottleneck at a time: map it, put a cost on it, and show the system that absorbs it.</p>
          </div>
          <a class="primary-button" href="/research-and-case-studies">All 14 Questions ${icon("arrow_forward")}</a>
        </div>
        <div class="industry-grid home-featured-grid">
          ${latest.map((a) => operatorArticleCard(a)).join("")}
        </div>
      </section>

      ${discoveryBand("Is your business ready for an Operator OS?", "Twenty to thirty minutes. We'll look at where your business is carrying too much in the owner's head, show you a live cockpit, and tell you straight whether it's a fit.")}
    </main>
  `;

  return pageShell({
    title: "AutoNateAI | The Operator OS — Run Your Business by Talking to It",
    active: "home",
    body,
    canonicalPath: "/",
    ogImage: "/assets/og/default.jpg",
    description:
      "AutoNateAI installs a conversational AI operating system around contractors, operators, and small businesses: operate through ChatGPT or Claude, keep structured business memory, and see everything in a custom cockpit.",
    ogTitle: "The Operator OS — Run Your Business by Talking to It",
    ogDescription:
      "Conversation for control, structured memory for state, a custom cockpit for visual context. AutoNateAI architects it; you operate it.",
    structuredData: [serviceStructuredData],
  });
}

// ---------------------------------------------------------------------------
// OPERATOR OS (product / architecture page)
// ---------------------------------------------------------------------------
export function renderOperatorOs() {
  const roles = [
    ["person", "Operator", "Talks, reviews, decides, approves."],
    ["architecture", "AutoNateAI architecture", "Structures data, relationships, workflows, permissions, and scaling."],
    ["smart_toy", "AI agents", "Research, synthesize, draft, classify, rank, and implement."],
    ["monitoring", "Visual cockpit", "Shows the state of the business so the operator can verify what the AI sees."],
  ];
  const steps = [
    ["search", "Discovery", "We learn how your operation actually moves: people, information, decisions, handoffs."],
    ["account_tree", "Model the operating graph", "Your organizations, people, relationships, goals, and workflows, mapped before anything is built."],
    ["database", "Instantiate memory", "The structured data layer goes live with your real records."],
    ["monitoring", "Build the cockpit", "A custom interface over your graph, updating live as things change."],
    ["forum", "Connect the conversation", "ChatGPT or Claude wired to your memory so you can operate by talking."],
    ["trending_up", "Adopt &amp; evolve", "Onboarding, then new modules (scrapers, rankers, alerts) as the economics justify them."],
  ];

  const body = `
    <main class="lab-home opos-page">
      <section class="home-hero opos-subhero">
        <div class="hero-bg"><img src="/assets/operator-os/architecture-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("hub")} The Operator OS</span>
            <h1>A repeatable AI operating architecture for operators.</h1>
            <p>The interface gives you visual context. The conversation gives you control. The architecture underneath gives your business structure. Here's every piece, and how they fit.</p>
            <div class="button-row">
              <a class="primary-button" href="${DISCOVERY_CTA}">Book a Discovery Call ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="/pricing">Pricing</a>
            </div>
          </div>
          <aside class="hero-program-panel opos-premise">
            <div class="hero-panel-body">
              <span class="kicker">${icon("lightbulb")} The Premise</span>
              <h2>Operators don't need to become software engineers.</h2>
              <p>They need an engineered operating environment they can control through conversation. We design the architecture, connect the systems, build the cockpit, and manage feature growth as the operation gets more sophisticated.</p>
              <div class="hero-facts">
                <span>Operate by conversation</span>
                <span>One structured memory</span>
                <span>Live visual cockpit</span>
                <span>Managed feature growth</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("diversity_2")} The Design Principle</span>
            <h2>Everyone does the part they're best at.</h2>
          </div>
        </div>
        <div class="opos-roles">
          ${roles.map(([ic, name, text]) => `<article>${icon(ic)}<h3>${name}</h3><p>${text}</p></article>`).join("")}
        </div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("layers")} The Repeatable Stack</span>
            <h2>One architecture, many businesses.</h2>
            <p>The core doesn't get reinvented for every client. We maintain a reusable operating kernel and configure it to your graph.</p>
          </div>
        </div>
        <div class="opos-stack">
          ${operatorStack.map((row) => `
            <div class="opos-stack-row">
              <span class="opos-stack-layer">${icon(row.icon)} ${escapeHtml(row.layer)}</span>
              <span>${escapeHtml(row.role)}</span>
              <span class="opos-stack-tools">${escapeHtml(row.tools)}</span>
            </div>`).join("")}
        </div>
      </section>

      <section class="section compact opos-graph-section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("hub")} The Operating Graph</span>
            <h2>Prospects, clients, and partners are roles, not databases.</h2>
            <p>Someone can start as a prospect, become a client, and later send you referrals as a partner. One identity layer underneath means the system sees all of it, and your AI can reason about all of it.</p>
          </div>
        </div>
        <div class="opos-graph">
          ${operatorGraphEntities.map((e) => `<article>${icon(e.icon)}<h3>${escapeHtml(e.name)}</h3><p>${escapeHtml(e.note)}</p></article>`).join("")}
        </div>
        <p class="opos-connect-foot">${icon("route")} <span><strong>Relationships generate goals. Goals generate tasks. Tasks consume attention. Attention produces outcomes.</strong> A task created under a client goal lands in the same daily timebox as everything else, never lost inside a CRM profile.</span></p>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="/assets/operator-os/operators-spotlight.jpg" alt="An electrician beside a service van, checking a phone" /></div>
        <div>
          <span class="kicker">${icon("radar")} Custom Intelligence</span>
          <h2>Scrapers and rankers become graph-ingestion adapters.</h2>
          <p>State licensing portals, county records, websites, chamber directories, referrals, and manual entries all resolve into the same organizations and people. Each one gets a profile, a research thread, and a score. You review the ranked queue instead of 500 raw rows.</p>
          <p>Manual networking stays first-class too. The person you met at a golf event lands in the same graph as the scraped list.</p>
          <div class="button-row"><a class="primary-button" href="/pricing#modules">Module Pricing ${icon("arrow_forward")}</a></div>
        </div>
      </section>

      <section class="section compact">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("route")} How an Install Works</span>
            <h2>From discovery to a cockpit you actually use.</h2>
          </div>
        </div>
        <ol class="opos-steps">
          ${steps.map(([ic, name, text], i) => `<li><b>${String(i + 1).padStart(2, "0")}</b>${icon(ic)}<h3>${name}</h3><p>${text}</p></li>`).join("")}
        </ol>
      </section>

      <section class="section compact opos-positioning">
        <span class="kicker">${icon("verified")} What We're Actually Selling</span>
        <h2>Not "AI automation." Not "an Airtable." Not "a custom dashboard."</h2>
        <p>A conversational operating layer around your business. You talk to the system through ChatGPT or Claude, inspect the business through your cockpit, and hand deeper technical work to managed coding agents without carrying the engineering yourself. You keep what only you can provide: judgment, relationships, domain expertise, risk tolerance, final decisions. The system takes on more and more of the remembering, organizing, researching, routing, and repetitive work.</p>
      </section>

      ${discoveryBand("See the architecture running live.", "On the discovery call we show you AutoNateAI's own cockpit in production, then what yours would look like.")}
    </main>
  `;

  return pageShell({
    title: "The Operator OS — How It Works | AutoNateAI",
    active: "operator-os",
    body,
    canonicalPath: "/operator-os",
    ogImage: "/assets/og/operator-os.jpg",
    description:
      "How the AutoNateAI Operator OS works: a conversation layer (ChatGPT/Claude), structured business memory, a custom live cockpit, and managed AI agents — one repeatable architecture for contractors and small businesses.",
    ogTitle: "The Operator OS — Conversation, Memory, Cockpit, Agents",
    ogDescription: "One repeatable operating architecture: operate by conversation, keep one structured memory, see everything in a live cockpit.",
    structuredData: [serviceStructuredData],
  });
}

// ---------------------------------------------------------------------------
// PRICING
// ---------------------------------------------------------------------------
export function renderPricing() {
  const body = `
    <main class="about-page opos-page">
      <section class="about-hero opos-pricing-hero">
        <div>
          <span class="kicker">${icon("sell")} Pricing</span>
          <h1>You're buying a managed operating system, not a pile of prompts.</h1>
          <p>Every package is architecture, implementation, and adoption: a working management layer around your business. Pay once for the build, then keep it healthy and growing with Care + Evolution.</p>
          <div class="button-row">
            <a class="primary-button" href="${DISCOVERY_CTA}">Find Your Fit on a Call ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/operator-os">What's in the System</a>
          </div>
        </div>
        <aside class="opos-pricing-note">
          <span class="kicker">${icon("info")} How Pricing Works</span>
          <ul>
            <li>${icon("construction")} <span><strong>Build price</strong> covers engineering, configuration, and onboarding. Paid once.</span></li>
            <li>${icon("autorenew")} <span><strong>Care + Evolution</strong> covers monitoring, tuning, schema changes, and small features. Monthly, optional.</span></li>
            <li>${icon("radar")} <span><strong>Custom intelligence modules</strong> are scoped individually, including their running costs.</span></li>
          </ul>
        </aside>
      </section>

      <section class="section compact">
        <div class="opos-packages">
          ${operatorPackages.map((pkg) => packageCard(pkg)).join("")}
        </div>
        <p class="fine-print opos-price-fine">Ranges reflect scope: number of workflows, integrations, roles, and how much existing data we're migrating. Your exact quote comes out of the discovery call.</p>
      </section>

      <section class="section compact" id="modules">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("extension")} Custom Intelligence Modules</span>
            <h2>Add capability when the economics justify it.</h2>
            <p>Modules plug into the same graph, so a scraper's output shows up as ranked, researchable profiles in your cockpit, not a CSV in your downloads folder.</p>
          </div>
        </div>
        <div class="opos-modules">
          ${operatorModules.map((m) => `
            <article>
              ${icon(m.icon)}
              <div><h3>${escapeHtml(m.name)}</h3><p>${escapeHtml(m.note)}</p></div>
              <strong>${escapeHtml(m.price)}</strong>
            </article>`).join("")}
        </div>
        <p class="fine-print opos-price-fine">Modules that depend on outside data (paid sources, high-volume scraping, anti-bot infrastructure, regulated datasets) carry running costs we'll quote up front before you commit.</p>
      </section>

      ${faqSection(operatorFaqs, "Pricing &amp; product questions")}

      ${discoveryBand("Not sure which package fits?", "That's the point of the call. Tell us where the owner's attention is going, and we'll tell you the smallest system that fixes it.")}
    </main>
  `;

  return pageShell({
    title: "Pricing | AutoNateAI Operator OS",
    active: "pricing",
    body,
    canonicalPath: "/pricing",
    ogImage: "/assets/og/pricing.jpg",
    description:
      "Operator OS pricing: Foundation $3,500–$5,000, Growth $6,500–$10,000, Operational $12,000–$20,000+, and Care + Evolution $500–$2,000/mo, plus custom scraper, ranker, and integration modules.",
    ogTitle: "What an Operator OS Costs | AutoNateAI",
    ogDescription: "Foundation, Growth, and Operational builds, monthly Care + Evolution, and custom intelligence modules, all priced in the open.",
    structuredData: [serviceStructuredData, faqStructuredData(operatorFaqs)],
  });
}

// ---------------------------------------------------------------------------
// RESEARCH & CASE STUDIES hub
// ---------------------------------------------------------------------------
export function renderArticles() {
  const ordered = [...operatorArticles].sort((a, b) => a.n - b.n);
  const featured = ordered.find((a) => a.status === "published") || ordered[0];

  const body = `
    <main class="articles-page">
      <section class="about-hero">
        <div>
          <span class="kicker">${icon("quiz")} Research &amp; Case Studies</span>
          <h1>The operational questions owners already feel.</h1>
          <p>Each piece takes one coordination problem, maps how the work actually moves, puts a cost on the hidden tax, and shows the system that takes it off the owner. Fourteen questions, one a day.</p>
        </div>
        <a class="about-founder-card" href="/research-and-case-studies/${featured.slug}">
          <img src="${featured.thumbnail}" alt="${escapeHtml(featured.title)}" />
          <div>
            <span class="kicker">${icon("star")} Start Here &middot; ${questionNumber(featured)}</span>
            <h2>${escapeHtml(featured.title)}</h2>
            <p>${escapeHtml(featured.hook)}</p>
          </div>
        </a>
      </section>

      <div class="content-tools">
        <label>${icon("search")} <input type="search" placeholder="Search questions, industries, workflows..." data-article-search /></label>
      </div>
      <div class="industry-grid lab-grid" data-article-grid>
        ${ordered.map((a) => operatorArticleCard(a)).join("")}
      </div>
      <nav class="pagination" data-article-pagination aria-label="Pagination"></nav>
    </main>
  `;

  return pageShell({
    title: "Research & Case Studies | AutoNateAI Operator OS",
    active: "articles",
    body,
    canonicalPath: "/research-and-case-studies",
    ogImage: "/assets/og/research-and-case-studies.jpg",
    description:
      "Research on the operational bottlenecks contractors, operators, and small businesses feel every day — follow-up, quoting, prospect ranking, owner attention — and the systems that absorb them.",
    ogTitle: "Research & Case Studies | AutoNateAI",
    ogDescription: "The operational questions owners already feel, researched one at a time, with the system that fixes each one.",
  });
}

// ---------------------------------------------------------------------------
// OPERATOR ARTICLE detail
// ---------------------------------------------------------------------------
export function renderOperatorArticleDetail(article) {
  const isDraft = article.status !== "published";
  const markdown = readResearchMarkdown(article.sourcePath, article.title).replace(/<!--[\s\S]*?-->\n*/g, "");
  const index = operatorArticles.findIndex((a) => a.slug === article.slug);
  const next = operatorArticles[(index + 1) % operatorArticles.length];
  const related = operatorArticles
    .filter((a) => a.slug !== article.slug && a.audience.some((aud) => article.audience.includes(aud)))
    .slice(0, 3);

  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["Research & Case Studies", "/research-and-case-studies"], [`${questionNumber(article)}`, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${icon(article.icon)} Operator Question ${questionNumber(article)} &middot; ${escapeHtml(operatorArticleStatusLabels[article.status])}</span>
          <h1>${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(article.hook)}</p>
          <div class="article-byline">By Nathan Baker, AutoNateAI${article.publishedDate ? ` &middot; <time datetime="${escapeHtml(article.publishedDate)}">${escapeHtml(formatDate(article.publishedDate))}</time>` : ""}</div>
          <div class="tag-row">${article.audience.map((a) => `<span>${escapeHtml(a)}</span>`).join("")}</div>
        </header>
        <img src="${article.thumbnail}" alt="${escapeHtml(article.title)}" />
        ${isDraft ? `<div class="opos-draft-note">${icon("science")}<p><strong>In research.</strong> This question is part of AutoNateAI's 14-question Operator OS series. The full, sourced write-up is on its way. Below is the outline we're investigating.</p></div>` : ""}
        <div class="markdown-body">${markdownToHtml(stripFirstHeading(markdown))}</div>

        <div class="detail-enroll-band opos-cta-band">
          <div>
            <span class="kicker">${icon("call")} Does this sound like your business?</span>
            <h2>Book a 20&ndash;30 minute discovery call.</h2>
            <p>We'll show you a live Operator OS cockpit and tell you straight whether it fits.</p>
          </div>
          <a class="primary-button" href="${DISCOVERY_CTA}">Book a Discovery Call ${icon("arrow_forward")}</a>
        </div>

        ${related.length ? `<h2>Related questions</h2><div class="detail-related-grid">${related.map((a) => operatorArticleCard(a)).join("")}</div>` : ""}
        <p class="opos-next"><a href="/research-and-case-studies/${next.slug}">Next: ${questionNumber(next)} &mdash; ${escapeHtml(next.title)} ${icon("arrow_forward")}</a></p>
      </article>
    </main>
  `;

  return pageShell({
    title: `${article.title} | AutoNateAI`,
    active: "articles",
    body,
    canonicalPath: `/research-and-case-studies/${article.slug}`,
    ogImage: article.thumbnail,
    description: article.hook,
    ogTitle: article.title,
    ogDescription: article.hook,
    // Scaffolds stay out of the index until the real article lands.
    robots: isDraft ? "noindex,follow" : "index,follow",
    structuredData: isDraft
      ? []
      : [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.hook,
            "image": `https://autonateai.com${article.thumbnail}`,
            "datePublished": article.publishedDate,
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://autonateai.com/research-and-case-studies/${article.slug}` },
            "author": { "@type": "Person", "name": "Nathan Baker", "url": "https://autonateai.com/about" },
            "publisher": { "@type": "Organization", "name": "AutoNateAI", "logo": { "@type": "ImageObject", "url": "https://autonateai.com/assets/brand/logo-512.png" } },
          },
        ],
  });
}

// ---------------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------------
export function renderAbout() {
  const values = [
    ["Research First", "Every build starts by mapping how the operation actually moves. We don't automate a workflow we haven't understood."],
    ["Systems Thinking", "See the people, the information, the handoffs, and the failure points, not just the one tool in front of you."],
    ["Integrity", "We'll tell you when the Operator OS isn't a fit. Numbers get labeled as sourced or estimated, never dressed up."],
    ["Owner Leverage", "The measure of the system is how much it takes off the owner's head, not how many features it has."],
  ];
  const faqs = [
    ["Why build operating systems for small businesses?", "Because I built one for myself first. AutoNateAI runs on its own Operator OS: a weekly attention graph, prospects, clients and partners in one relationship graph, nested research memory, and a live cockpit, all operated by talking to ChatGPT and Claude. The moment it started working, it was obvious that every contractor and operator I talk to needs the same thing."],
    ["Are you an agency?", "No. AutoNateAI is an architecture practice. Nathan designs the system and manages how it grows; AI agents do much of the implementation and repetitive work. That's how a small practice delivers a system a big firm would charge far more for."],
    ["Do I have to be technical?", "No, and that's the whole point. You operate through conversation and look at your cockpit. The engineering and architecture are our job."],
    ["Where do you work?", "With operators across the U.S., remotely, and in person when it makes sense for discovery and onboarding."],
  ];

  const body = `
    <main class="about-page">
      <section class="about-hero">
        <div>
          <span class="kicker">${icon("person")} About</span>
          <h1>A systems architect who built his own operating system first.</h1>
          <p>AutoNateAI is my systems practice. I'm Nathan Baker, a software engineer and business analyst who spent years mapping how data, money, and decisions move through complex organizations. Now I build conversational operating systems for the contractors, operators, and small businesses who run everything out of their own heads. AutoNateAI runs on the same system we install for clients.</p>
          <div class="button-row">
            <a class="primary-button" href="${DISCOVERY_CTA}">Book a Discovery Call ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/operator-os">How the Operator OS Works</a>
          </div>
        </div>
        <aside class="about-founder-card">
          <img src="/assets/nathan-baker.jpeg" alt="Nathan Baker, founder of AutoNateAI" />
          <div>
            <span class="kicker">Founder &amp; Systems Architect, AutoNateAI</span>
            <h2>Nathan Baker</h2>
            <p>Computer Science, University of Michigan. Software engineering and business-analytics experience across Microsoft, Citi, Veterans United, and Atomic Object, now aimed at the operating systems small businesses never got.</p>
          </div>
        </aside>
      </section>

      <section class="about-mission">
        <span class="kicker">${icon("architecture")} Mission</span>
        <h2>Give small operators the information discipline of a big company, without making them become engineers.</h2>
        <p>Large companies pay whole departments to keep their state straight: who they know, what was promised, what's next, what's blocked. Small operators pay for it with evenings and missed follow-ups. The Operator OS gives them a structured memory, a live cockpit, and an AI they can simply talk to. The architecture is our problem.</p>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="/assets/operator-os/operators-spotlight.jpg" alt="An electrician beside a service van, checking a phone" /></div>
        <div>
          <span class="kicker">${icon("hub")} Built on Ourselves First</span>
          <h2>The demo is our production system.</h2>
          <p>Every week at AutoNateAI starts with an attention graph: goals, relationships, and time-boxed tasks, reflected on every night and rerouted every morning. Prospects from networking and data scrapers land in the same graph as clients and partners. ChatGPT and Claude read and write it; coding agents extend it; the cockpit shows all of it live.</p>
          <p>So when you get on a discovery call, you're not looking at a mockup. You're looking at the real thing running a real business, and then at yours.</p>
          <div class="button-row">
            <a class="primary-button" href="${DISCOVERY_CTA}">See It Live ${icon("arrow_forward")}</a>
          </div>
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

      ${faqSection(faqs)}

      ${discoveryBand("Bring me the workflow that's eating your week.", "Contractors, brokerages, service firms, nonprofits: every Operator OS starts with a conversation about where the owner's attention is going.")}
    </main>
  `;

  return pageShell({
    title: "About Nathan Baker | AutoNateAI",
    active: "about",
    body,
    canonicalPath: "/about",
    ogImage: "/assets/og/about.jpg",
    description:
      "Nathan Baker is the systems architect behind AutoNateAI, which builds conversational AI operating systems for contractors, operators, and small businesses. Ex-Microsoft, Citi, Veterans United, and Atomic Object.",
    ogTitle: "Nathan Baker — AutoNateAI",
    ogDescription: "A software engineer and systems architect who built his own AI operating system first, and now installs it for operators.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Nathan Baker",
        "jobTitle": "Founder & Systems Architect, AutoNateAI",
        "worksFor": { "@type": "Organization", "name": "AutoNateAI" },
        "alumniOf": { "@type": "CollegeOrUniversity", "name": "University of Michigan" },
      },
      faqStructuredData(faqs),
    ],
  });
}

// ---------------------------------------------------------------------------
// WORK WITH US — discovery call request
// ---------------------------------------------------------------------------
export function renderWorkWithUs() {
  const orgTypes = ["Contractor / Trades", "Real Estate (Brokerage, Investor, Property Manager)", "Professional Services", "Nonprofit / Community Org", "Local B2B Operator", "Other"];
  const needs = ["Operator OS — Foundation", "Operator OS — Growth", "Operator OS — Operational", "Custom module (scraper, ranker, integration)", "Not sure yet — that's what the call is for"];

  const body = `
    <main class="about-page">
      <section class="home-hero">
        <div class="hero-bg"><img src="/assets/operator-os/work-with-us-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("call")} Book a Discovery Call</span>
            <h1>Let's find out if your business is ready for an Operator OS.</h1>
            <p>Twenty to thirty minutes. Tell me where your business lives today, meaning the tools, the handoffs, and what's stuck in your head, and I'll show you a live cockpit and give you a straight answer on fit.</p>
          </div>
          <aside class="hero-program-panel">
            <div class="hero-panel-body">
              <span class="kicker">${icon("checklist")} On the Call</span>
              <h2>Three screens, one straight answer.</h2>
              <ol class="opos-call-steps">
                <li><b>1</b><span>We map where your operation lives today, and where the owner is the glue.</span></li>
                <li><b>2</b><span>You see AutoNateAI's own Operator OS running live.</span></li>
                <li><b>3</b><span>We sketch what yours would look like, and whether it's worth building.</span></li>
              </ol>
              <div class="hero-facts">
                <span>Contractors &amp; Trades</span>
                <span>Real Estate</span>
                <span>Professional Services</span>
                <span>Small Teams, Nationally</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="section compact">
        <div class="book-layout">
          <form class="form-stack booking-card booking-form" data-workwithus-form>
            <div class="two-col">
              <label>Name<input data-workwithus-field="name" autocomplete="name" placeholder="Jordan Rivera" required /></label>
              <label>Email<input data-workwithus-field="email" autocomplete="email" type="email" placeholder="jordan@example.com" required /></label>
            </div>
            <div class="two-col">
              <label>Business<input data-workwithus-field="organization" autocomplete="organization" placeholder="Rivera Heating &amp; Air" /></label>
              <label>What best describes you?
                <select data-workwithus-field="orgType">
                  <option value="">Select one</option>
                  ${orgTypes.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}
                </select>
              </label>
            </div>
            <label>What are you interested in?
              <select data-workwithus-field="need">
                <option value="">Select one</option>
                ${needs.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}
              </select>
            </label>
            <label>Where is the owner carrying too much?<textarea data-workwithus-field="details" rows="4" placeholder="Leads falling through the cracks? Quotes going out late? Five tools that don't talk to each other? Tell me what's eating your week." required></textarea></label>
            <button class="primary-button full" type="submit">Request a Discovery Call ${icon("arrow_forward")}</button>
            <p class="fine-print" data-workwithus-status>This opens your email app with everything you entered above, addressed to autonate.ai@gmail.com. Review it and hit send, and I'll reply with times.</p>
          </form>
          <aside class="book-sidebar">
            <div class="book-sidebar-block">
              <span class="kicker">${icon("checklist")} What happens next</span>
              <ol>
                <li>Your email app opens with a message pre-filled from what you entered. Review it and hit send.</li>
                <li>I read every message myself. No auto-reply.</li>
                <li>Within 1&ndash;2 business days you'll get call times, plus anything worth looking at before we talk.</li>
              </ol>
            </div>
            <div class="book-sidebar-block">
              <span class="kicker">${icon("sell")} Pricing, in the open</span>
              <p>Operator OS builds start at $3,500. Care + Evolution runs $500&ndash;$2,000/mo. Custom modules are scoped separately.</p>
              <a class="outline-button full" href="/pricing">See Pricing ${icon("arrow_forward")}</a>
            </div>
            <div class="book-sidebar-block">
              <span class="kicker">${icon("verified")} Background</span>
              <p>Computer Science, University of Michigan. Software engineering and business analytics across Microsoft, Citi, Veterans United, and Atomic Object.</p>
              <a class="outline-button full" href="/about">About Nathan ${icon("arrow_forward")}</a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "Book a Discovery Call | AutoNateAI Operator OS",
    active: "work-with-us",
    body,
    canonicalPath: "/work-with-us",
    ogImage: "/assets/og/work-with-us.jpg",
    description:
      "Book a 20–30 minute Operator OS discovery call with Nathan Baker. See a live AI operating cockpit and get a straight answer on whether it fits your business.",
    ogTitle: "Is Your Business Ready for an Operator OS?",
    ogDescription: "A 20–30 minute discovery call: where your business lives today, a live cockpit demo, and a straight answer on fit.",
  });
}
