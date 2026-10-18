// AutoNateAI studio pages (2026-10-18): a research and educational media company that builds animated series.
// Home, Our Series, Research, For Organizations, Pricing, About, Start a Project. Content: studio-data.mjs.
// Styles: the `st-` section of public/styles.css. The Operator OS pages are archived, not rendered.
import { escapeHtml, icon, pageShell } from "./components.mjs";
import { studioFaqs, studioMarkets, studioPackages, studioPillars, studioProcess, studioSeries } from "./studio-data.mjs";

const START = "/start-a-project";
const OG = "/assets/og/studio.jpg";
const yt = (id) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;

function faqSection(faqs, title = "Questions people ask.") {
  return `
    <section class="section compact st-faq">
      <div class="section-head"><div><span class="kicker">${icon("help")} FAQ</span><h2>${title}</h2></div></div>
      <div class="st-faq-list">
        ${faqs.map(([q, a]) => `<details><summary>${escapeHtml(q)}${icon("expand_more")}</summary><p>${escapeHtml(a)}</p></details>`).join("")}
      </div>
    </section>`;
}
const faqLd = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

function ctaBand(title, text) {
  return `
    <section class="st-cta">
      <div>
        <span class="kicker">${icon("movie")} Commission a Series</span>
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(text)}</p>
      </div>
      <div class="button-row">
        <a class="primary-button" href="${START}">Start a Project ${icon("arrow_forward")}</a>
        <a class="secondary-button" href="/series">Watch Our Work</a>
      </div>
    </section>`;
}

function seriesCard(s) {
  const links = [
    `<a class="outline-button" href="${s.playlist}" target="_blank" rel="noopener">${icon("play_circle")} Watch on YouTube</a>`,
    s.page ? `<a class="text-link" href="${s.page}" target="_blank" rel="noopener">Course page ${icon("arrow_outward")}</a>` : "",
  ].join("");
  return `
    <article class="st-series-card">
      <a class="st-series-media" href="${s.playlist}" target="_blank" rel="noopener"><img src="${s.image}" alt="${escapeHtml(s.title)}" loading="lazy" /><span class="st-play">${icon("play_arrow")}</span></a>
      <div class="st-series-body">
        <span class="kicker">${escapeHtml(s.kind)}</span>
        <h3>${escapeHtml(s.title)}</h3>
        <p class="st-subject">${escapeHtml(s.subject)}</p>
        <p>${escapeHtml(s.logline)}</p>
        <div class="st-tags">${s.extras.map((x) => `<span>${escapeHtml(x)}</span>`).join("")}</div>
        <div class="st-links">${links}</div>
      </div>
    </article>`;
}

// ---------------------------------------------------------------------------- HOME
export function renderStudioHome() {
  const curve = studioSeries[0];
  const assets = [
    ["movie", "Episodes", "5–8 minute animated episodes with a real arc"],
    ["smartphone", "Reels", "Vertical can-you-solve-it clips for social"],
    ["menu_book", "Workbooks", "Homework, worked solutions, answer keys"],
    ["co_present", "Instructor guides", "Run it as a class or discussion section"],
    ["web", "Landing pages", "A course page with the playlist and downloads"],
    ["image", "Thumbnails + cards", "Share-ready art for every episode"],
  ];
  const body = `
    <main class="st-home">
      <section class="st-hero">
        <div class="st-hero-copy">
          <span class="kicker">${icon("auto_stories")} AutoNateAI · Research &amp; Educational Media</span>
          <h1>Complex ideas. Extraordinary stories.</h1>
          <p>We're an independent research and educational media company. We investigate hard subjects, then turn them into original animated series that people actually finish, for our own channels and for the organizations we work with.</p>
          <div class="button-row">
            <a class="primary-button" href="${START}">Commission a Series ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/research">Explore Our Research</a>
          </div>
          <div class="st-proof">
            <span><b>4</b> series</span><span><b>24</b> episodes</span><span><b>18</b> proofs in one season</span>
          </div>
        </div>
        <figure class="st-hero-player">
          <div class="st-player-frame"><iframe src="${yt(curve.featured)}" title="The Curve — Episode 1" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
          <figcaption><b>Now playing:</b> The Curve, Ep 1 — a six-episode discrete math series we researched, wrote and animated. <a href="${curve.playlist}" target="_blank" rel="noopener">Watch the season ${icon("arrow_outward")}</a></figcaption>
        </figure>
      </section>

      <section class="section st-pillars">
        <div class="section-head section-head-center"><div>
          <span class="kicker">${icon("hub")} What We Do</span>
          <h2>Research is the advantage. Animation is how it lands.</h2>
          <p>Anyone can make a cartoon. We make the investigation first, then build the story around what's true.</p>
        </div></div>
        <div class="st-grid-4">
          ${studioPillars.map((p) => `<article class="st-card">${icon(p.icon)}<h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.text)}</p></article>`).join("")}
        </div>
      </section>

      <section class="section st-work">
        <div class="section-head"><div>
          <span class="kicker">${icon("video_library")} Our Work</span>
          <h2>Series you can watch right now.</h2>
          <p>Originals we publish through Bot That Lyfe, and series commissioned by organizations.</p>
        </div><a class="outline-button" href="/series">All series ${icon("arrow_forward")}</a></div>
        <div class="st-series-grid">${studioSeries.map(seriesCard).join("")}</div>
      </section>

      <section class="section st-process-section">
        <div class="section-head section-head-center"><div>
          <span class="kicker">${icon("route")} How a Series Gets Made</span>
          <h2>From a question to a season.</h2>
        </div></div>
        <ol class="st-process">
          ${studioProcess.map(([ic, t, d], i) => `<li><span class="st-step">${String(i + 1).padStart(2, "0")}</span>${icon(ic)}<h3>${t}</h3><p>${escapeHtml(d)}</p></li>`).join("")}
        </ol>
      </section>

      <section class="section st-assets">
        <div class="st-assets-copy">
          <span class="kicker">${icon("inventory_2")} One Investigation, Many Assets</span>
          <h2>A series is more than episodes.</h2>
          <p>The research behind a season becomes everything your audience, your instructors and your marketing need, from the same source of truth.</p>
          <a class="primary-button" href="/pricing">See Packages ${icon("arrow_forward")}</a>
        </div>
        <div class="st-asset-grid">
          ${assets.map(([ic, t, d]) => `<div>${icon(ic)}<b>${t}</b><span>${d}</span></div>`).join("")}
        </div>
      </section>

      <section class="section st-markets">
        <div class="section-head"><div>
          <span class="kicker">${icon("groups")} Who We Work With</span>
          <h2>Organizations with something worth explaining.</h2>
        </div><a class="outline-button" href="/for-organizations">For organizations ${icon("arrow_forward")}</a></div>
        <div class="st-grid-3">
          ${studioMarkets.map((m) => `<article class="st-card">${icon(m.icon)}<h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(m.text)}</p><p class="st-example">${icon("play_circle")} ${escapeHtml(m.example)}</p></article>`).join("")}
        </div>
      </section>

      <section class="section st-brands">
        <div class="st-brand-card">
          <span class="kicker">AutoNateAI</span>
          <h3>Research &amp; commercial</h3>
          <p>Independent investigations, commissioned series, organizational partnerships and client services.</p>
          <b>autonateai.com</b>
        </div>
        <div class="st-brand-engine">${icon("sync_alt")}<span>One research &amp; production engine</span><small>research → evidence → scripts → characters → animation</small></div>
        <div class="st-brand-card st-brand-btl">
          <span class="kicker">Bot That Lyfe</span>
          <h3>Original CS series</h3>
          <p>Free animated courses on proofs, algorithms, AI and data, with workbooks. Our proof of what the studio makes.</p>
          <a href="https://botthatlyfe.com" target="_blank" rel="noopener"><b>botthatlyfe.com ${icon("arrow_outward")}</b></a>
        </div>
      </section>

      ${faqSection(studioFaqs.slice(0, 4))}
      ${ctaBand("Have a subject people keep getting lost in?", "Tell us about your audience and what they need to understand. We'll come back with a research plan, a story idea and a scope.")}
    </main>`;

  return pageShell({
    title: "AutoNateAI | Research-Driven Animated Series & Educational Media",
    active: "home",
    body,
    canonicalPath: "/",
    ogImage: OG,
    description: "AutoNateAI is an independent research and educational media company. We turn complex subjects into original animated series — with workbooks, reels and course pages — for our channels and for schools, nonprofits and startups.",
    ogTitle: "AutoNateAI — Complex ideas. Extraordinary stories.",
    ogDescription: "Deep research. Original characters. Animated series that make complicated ideas easy to understand.",
    structuredData: [faqLd(studioFaqs.slice(0, 4))],
  });
}

// ---------------------------------------------------------------------------- SERIES
export function renderSeries() {
  const curve = studioSeries[0];
  const body = `
    <main class="st-page">
      <section class="st-page-hero">
        <span class="kicker">${icon("video_library")} Our Series</span>
        <h1>Watch the work.</h1>
        <p>Every series here started as a research question. The originals are free on YouTube through Bot That Lyfe; the commissioned ones were built with and for the organizations named.</p>
      </section>
      <section class="section compact">
        <div class="st-featured">
          <div class="st-player-frame"><iframe src="${yt(curve.featured)}" title="The Curve — Episode 1" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
          <div>
            <span class="kicker">Featured · ${escapeHtml(curve.kind)}</span>
            <h2>${escapeHtml(curve.title)}</h2>
            <p>${escapeHtml(curve.logline)}</p>
            <ul class="st-checks">
              <li>${icon("check_circle")} Six 5–9 minute episodes with a full story arc</li>
              <li>${icon("check_circle")} 3Blue1Brown-style lessons: picture first, then the proof</li>
              <li>${icon("check_circle")} Six can-you-solve-it reels for social</li>
              <li>${icon("check_circle")} Workbook with homework + answer key, instructor guide, course page</li>
            </ul>
            <div class="button-row">
              <a class="primary-button" href="${curve.playlist}" target="_blank" rel="noopener">Watch the Season ${icon("arrow_outward")}</a>
              <a class="secondary-button" href="${curve.page}" target="_blank" rel="noopener">Course Page</a>
            </div>
          </div>
        </div>
      </section>
      <section class="section compact">
        <div class="st-series-grid">${studioSeries.map(seriesCard).join("")}</div>
      </section>
      ${ctaBand("Want a series like these for your audience?", "Commissioned series are researched, written and produced end to end, with a private review link before anything goes public.")}
    </main>`;
  return pageShell({
    title: "Our Series | AutoNateAI Animated Series",
    active: "series",
    body,
    canonicalPath: "/series",
    ogImage: OG,
    description: "Watch AutoNateAI's animated series: The Curve (discrete math), The Next Step (a STEM expo series), The Context Window (AI and data) and Search Party (faith and AI).",
    ogTitle: "AutoNateAI — Our Series",
  });
}

// ---------------------------------------------------------------------------- RESEARCH
export function renderResearch() {
  const body = `
    <main class="st-page">
      <section class="st-page-hero">
        <span class="kicker">${icon("travel_explore")} Research</span>
        <h1>The investigation comes first.</h1>
        <p>Before we write a line of dialogue, we map the subject: what's true, what's commonly misunderstood, what the audience already knows, and what they'll recognize. Here's the research behind each series, and how we work.</p>
      </section>
      <section class="section compact">
        <div class="st-method">
          ${[
            ["fact_check", "Every claim checked", "Math is worked and verified; numbers are labeled sourced or illustrative; fiction is labeled as fiction."],
            ["menu_book", "Sources you can read", "Each series ships a source list, in the descriptions and the learning materials."],
            ["record_voice_over", "Real names, no impersonation", "We name real organizations, programs and places. We never portray real people or invent their words."],
            ["psychology", "Teach the misconception", "The most common wrong answer becomes a scene, so the viewer unlearns it on screen."],
          ].map(([ic, t, d]) => `<article class="st-card">${icon(ic)}<h3>${t}</h3><p>${d}</p></article>`).join("")}
        </div>
      </section>
      <section class="section compact">
        <div class="section-head"><div><span class="kicker">${icon("library_books")} Research Library</span><h2>Behind each series.</h2></div></div>
        <div class="st-research-list">
          ${studioSeries
            .map(
              (s) => `
            <article class="st-research">
              <img src="${s.image}" alt="" loading="lazy" />
              <div>
                <span class="kicker">${escapeHtml(s.kind)}</span>
                <h3>${escapeHtml(s.title)} <small>${escapeHtml(s.subject)}</small></h3>
                <p>${escapeHtml(s.research)}</p>
                <h4>Sources</h4>
                <ul>${s.sources.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
                <a class="text-link" href="${s.page || s.playlist}" target="_blank" rel="noopener">${s.page ? "Course page + materials" : "Watch the series"} ${icon("arrow_outward")}</a>
              </div>
            </article>`,
            )
            .join("")}
        </div>
      </section>
      ${ctaBand("Have research that deserves an audience?", "Reports, studies and programs make great series. We'll turn yours into something people watch and share.")}
    </main>`;
  return pageShell({
    title: "Research | AutoNateAI",
    active: "research",
    body,
    canonicalPath: "/research",
    ogImage: OG,
    description: "How AutoNateAI researches every animated series, and the sources behind The Curve, The Next Step, The Context Window and Search Party.",
    ogTitle: "AutoNateAI — The investigation comes first",
  });
}

// ---------------------------------------------------------------------------- FOR ORGANIZATIONS
export function renderStudioForOrganizations() {
  const body = `
    <main class="st-page">
      <section class="st-page-hero">
        <span class="kicker">${icon("groups")} For Organizations</span>
        <h1>Your subject. Your audience. A series they finish.</h1>
        <p>We partner with schools, universities, nonprofits, community programs and startups to turn what they know into animated series with real stories, plus everything needed to use them.</p>
        <div class="button-row"><a class="primary-button" href="${START}">Start a Project ${icon("arrow_forward")}</a><a class="secondary-button" href="/pricing">See Packages</a></div>
      </section>
      <section class="section compact">
        <div class="st-grid-3">
          ${studioMarkets.map((m) => `<article class="st-card">${icon(m.icon)}<h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(m.text)}</p><p class="st-example">${icon("play_circle")} ${escapeHtml(m.example)}</p></article>`).join("")}
        </div>
      </section>
      <section class="section compact">
        <div class="section-head section-head-center"><div><span class="kicker">${icon("route")} The Process</span><h2>What working together looks like.</h2></div></div>
        <ol class="st-process">
          ${studioProcess.map(([ic, t, d], i) => `<li><span class="st-step">${String(i + 1).padStart(2, "0")}</span>${icon(ic)}<h3>${t}</h3><p>${escapeHtml(d)}</p></li>`).join("")}
        </ol>
      </section>
      ${faqSection(studioFaqs)}
      ${ctaBand("Let's scope your series.", "A 30-minute call: your audience, your subject, your timeline. We'll follow up with a research plan and a quote.")}
    </main>`;
  return pageShell({
    title: "For Organizations | Commissioned Animated Series | AutoNateAI",
    active: "organizations",
    body,
    canonicalPath: "/for-organizations",
    ogImage: OG,
    description: "Commission a research-driven animated series for your school, nonprofit, program or startup — with reels, workbooks and a landing page.",
    ogTitle: "AutoNateAI — Commissioned animated series",
    structuredData: [faqLd(studioFaqs)],
  });
}

// ---------------------------------------------------------------------------- PRICING
export function renderStudioPricing() {
  const body = `
    <main class="st-page">
      <section class="st-page-hero">
        <span class="kicker">${icon("sell")} Pricing</span>
        <h1>Clear packages. Every series scoped on a call.</h1>
        <p>Introductory starting prices. The final quote depends on length, research depth and the learning materials you need.</p>
      </section>
      <section class="section compact">
        <div class="st-packages">
          ${studioPackages
            .map(
              (p) => `
            <article class="st-package ${p.featured ? "featured" : ""}">
              ${p.featured ? `<span class="st-badge">Flagship</span>` : ""}
              <h3>${escapeHtml(p.name)}</h3>
              <div class="st-price">${escapeHtml(p.price)}<small>${escapeHtml(p.unit)}</small></div>
              <p>${escapeHtml(p.text)}</p>
              <ul>${p.includes.map((x) => `<li>${icon("check")} ${escapeHtml(x)}</li>`).join("")}</ul>
              <a class="${p.featured ? "primary-button" : "outline-button"} full" href="${START}">Start a Project ${icon("arrow_forward")}</a>
            </article>`,
            )
            .join("")}
        </div>
        <p class="fine-print st-center">Prefer to see the work first? <a href="/series">Watch our series</a> — The Curve is an example of the Research Series package.</p>
      </section>
      ${faqSection(studioFaqs.slice(2))}
    </main>`;
  return pageShell({
    title: "Pricing | AutoNateAI Animated Series",
    active: "pricing",
    body,
    canonicalPath: "/pricing",
    ogImage: OG,
    description: "AutoNateAI animated series packages: explainers, three-episode mini-series, six-episode research series and custom institutional series.",
    ogTitle: "AutoNateAI — Pricing",
  });
}

// ---------------------------------------------------------------------------- ABOUT
export function renderStudioAbout() {
  const body = `
    <main class="about-page">
      <section class="about-hero">
        <div>
          <span class="kicker">${icon("person")} About</span>
          <h1>An engineer who turns research into stories.</h1>
          <p>I'm Nathan Baker. I spent years as a software engineer and business analyst, mapping how information moves through complex organizations. AutoNateAI is where that turned into storytelling: we investigate a subject the way an engineer would, then build the series a teacher, a mentor or a really good friend would.</p>
          <div class="button-row">
            <a class="primary-button" href="${START}">Start a Project ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/series">Watch Our Series</a>
          </div>
        </div>
        <aside class="about-founder-card">
          <img src="/assets/nathan-baker.jpeg" alt="Nathan Baker, founder of AutoNateAI" />
          <div>
            <span class="kicker">Founder, AutoNateAI · Creator, Bot That Lyfe</span>
            <h2>Nathan Baker</h2>
            <p>Computer Science, University of Michigan. Software engineering and business-analytics experience across Microsoft, Citi, Veterans United and Atomic Object.</p>
          </div>
        </aside>
      </section>
      <section class="about-mission">
        <span class="kicker">${icon("auto_stories")} Mission</span>
        <h2>Make hard things understandable, and worth watching.</h2>
        <p>The most important ideas are often the hardest to explain: proofs, data, money, health, how a program or a community actually works. We believe the best way to teach them is the oldest one: a good story, with characters people care about and a lesson they remember. The research makes it true. The story makes it stick.</p>
      </section>
      <section class="section compact">
        <div class="section-head"><div><span class="kicker">${icon("diamond")} Standards</span><h2>How we work.</h2></div></div>
        <div class="about-values">
          ${[
            ["Research first", "We don't write a scene we haven't understood. Every series starts with an investigation and ships with its sources."],
            ["Picture first", "We teach the way people learn: the picture, then the numbers, then the words, then the symbols."],
            ["Integrity", "Fiction is labeled as fiction, real people are named but never portrayed, and claims are checked."],
            ["Made to be used", "A series comes with what teachers, programs and marketers need to put it to work."],
          ].map(([t, d]) => `<article><h3>${t}</h3><p>${d}</p></article>`).join("")}
        </div>
      </section>
      ${ctaBand("Bring us the subject nobody can explain.", "We'll research it, find the story in it, and make the series.")}
    </main>`;
  return pageShell({
    title: "About Nathan Baker | AutoNateAI",
    active: "about",
    body,
    canonicalPath: "/about",
    ogImage: OG,
    description: "Nathan Baker founded AutoNateAI, a research and educational media company that builds animated series, and Bot That Lyfe, its free computer-science series.",
    ogTitle: "Nathan Baker — AutoNateAI",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Nathan Baker",
        jobTitle: "Founder, AutoNateAI",
        worksFor: { "@type": "Organization", name: "AutoNateAI" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of Michigan" },
      },
    ],
  });
}

// ---------------------------------------------------------------------------- START A PROJECT
export function renderStartProject() {
  const orgTypes = ["School / University", "EdTech", "Nonprofit / Community Program", "Startup / Company", "Event / Expo", "Other"];
  const needs = ["Animated Explainer (60–90s)", "Mini-Series (3 episodes)", "Research Series (6 episodes)", "Institutional / multi-season series", "Not sure yet — that's what the call is for"];
  const body = `
    <main class="about-page">
      <section class="st-page-hero">
        <span class="kicker">${icon("movie")} Start a Project</span>
        <h1>Tell us what your audience needs to understand.</h1>
        <p>A few details and we'll reply with times for a 30-minute call, plus a first idea for the story.</p>
      </section>
      <section class="section compact">
        <div class="book-layout">
          <form class="form-stack booking-card booking-form" data-workwithus-form>
            <div class="two-col">
              <label>Name<input data-workwithus-field="name" autocomplete="name" placeholder="Jordan Rivera" required /></label>
              <label>Email<input data-workwithus-field="email" autocomplete="email" type="email" placeholder="jordan@example.com" required /></label>
            </div>
            <div class="two-col">
              <label>Organization<input data-workwithus-field="organization" autocomplete="organization" placeholder="Riverside STEM Academy" /></label>
              <label>What best describes you?
                <select data-workwithus-field="orgType"><option value="">Select one</option>${orgTypes.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}</select>
              </label>
            </div>
            <label>What are you thinking about?
              <select data-workwithus-field="need"><option value="">Select one</option>${needs.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")}</select>
            </label>
            <label>The subject, the audience, the timeline<textarea data-workwithus-field="details" rows="5" placeholder="Who's watching? What do they need to understand? Any dates (an event, a semester, a launch)?" required></textarea></label>
            <button class="primary-button full" type="submit">Send Project Details ${icon("arrow_forward")}</button>
            <p class="fine-print" data-workwithus-status>This opens your email app with everything above, addressed to autonate.ai@gmail.com. Review it and hit send.</p>
          </form>
          <aside class="book-sidebar">
            <div class="book-sidebar-block">
              <span class="kicker">${icon("checklist")} What happens next</span>
              <ol>
                <li>Your email app opens with your details filled in. Hit send.</li>
                <li>Nathan reads every message and replies within 1–2 business days with call times.</li>
                <li>On the call: your audience, your subject, a story idea, and a scope.</li>
              </ol>
            </div>
            <div class="book-sidebar-block">
              <span class="kicker">${icon("sell")} Packages</span>
              <p>Explainers from $500. Six-episode research series from $3,000. Institutional series quoted.</p>
              <a class="outline-button full" href="/pricing">See Pricing ${icon("arrow_forward")}</a>
            </div>
            <div class="book-sidebar-block">
              <span class="kicker">${icon("play_circle")} See the work</span>
              <p>Watch The Curve, our six-episode discrete math series, before we talk.</p>
              <a class="outline-button full" href="/series">Our Series ${icon("arrow_forward")}</a>
            </div>
          </aside>
        </div>
      </section>
    </main>`;
  return pageShell({
    title: "Start a Project | Commission an Animated Series | AutoNateAI",
    active: "start",
    body,
    canonicalPath: "/start-a-project",
    ogImage: OG,
    description: "Commission a research-driven animated series from AutoNateAI. Tell us your audience, subject and timeline.",
    ogTitle: "Start a project with AutoNateAI",
  });
}
