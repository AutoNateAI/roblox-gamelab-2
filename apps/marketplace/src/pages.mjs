import { readFileSync } from "node:fs";
import {
  bankEngagementLadder,
  bankingOfferings,
  businessTrainingCurriculum,
  currentInvestigation,
  evidenceLabels,
  foundingBankPilot,
  industries,
  investigations,
  investigationStatusLabels,
  labEvents,
  labExperiments,
  labProjects,
  labSources,
  openSourceRepos,
  organizationExamples,
  organizations,
  organizationStatusLabels,
  organizationTypeLabels,
  pillarLabels,
  regions,
  regionStatusLabels,
  sceneShots,
  sponsorshipTiers,
  systemCategoryLabels,
  systems,
  systemStatusLabels,
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
  if (pack.heroImage) return `<img src="${pack.heroImage}" alt="${escapeHtml(pack.title)}" />`;
  if (pack.heroShotIndex === undefined || pack.heroShotIndex === null) {
    return `<div class="media-icon-tile"><span class="material-symbols-outlined">${escapeHtml(pack.icon)}</span></div>`;
  }
  return `<img src="${shot(index ?? pack.heroShotIndex)}" alt="${escapeHtml(pack.title)}" />`;
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

function evidenceBadge(evidenceClass) {
  return `<span class="evidence-badge" data-evidence="${evidenceClass}">${escapeHtml(evidenceLabels[evidenceClass] || evidenceClass)}</span>`;
}

function eventDateRange(event) {
  const start = formatDate(event.start);
  if (!event.end || event.end === event.start) return start;
  return `${start} – ${formatDate(event.end)}`;
}

// ---------------------------------------------------------------------------
// Lab content library cards. Every card is one clickable <a> wrapping an
// .industry-card, thumbnail on top, linking to a full detail page — external
// links (GitHub, source URL, event registration) live on the detail page,
// not nested inside the card (nested anchors aren't valid HTML).
// ---------------------------------------------------------------------------

function projectCard(project) {
  return `
    <a class="lab-card" href="/projects/${project.slug}">
      <article class="industry-card">
        <div class="card-thumbnail"><img src="${project.thumbnail}" alt="" loading="lazy" /><span class="status-pill">${escapeHtml(project.status)}</span></div>
        <h3>${escapeHtml(project.name)}</h3>
        <p class="industry-hook">${escapeHtml(project.tagline)}</p>
        <ul class="industry-capabilities">
          ${project.desks.slice(0, 3).map((desk) => `<li>${icon("radar")}<span>${escapeHtml(desk)}</span></li>`).join("")}
        </ul>
        <span class="outline-button full">Enter Project ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

function experimentCard(experiment) {
  const project = labProjects.find((item) => item.slug === experiment.project);
  return `
    <a class="lab-card" href="/experiments/${experiment.slug}">
      <article class="industry-card">
        <div class="card-thumbnail"><img src="${experiment.thumbnail}" alt="" loading="lazy" /><span class="status-pill">${escapeHtml(experiment.status)}</span></div>
        <h3>${escapeHtml(experiment.name)}</h3>
        <p class="industry-hook">${escapeHtml(experiment.question)}</p>
        ${project ? `<span class="kicker">${icon("hub")} ${escapeHtml(project.name)}</span>` : ""}
        <span class="outline-button full">Read the Experiment ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

function repoCard(repo) {
  const project = labProjects.find((item) => item.slug === repo.project);
  return `
    <a class="lab-card" href="/open-source/${repo.slug}">
      <article class="industry-card">
        <div class="card-thumbnail"><img src="${repo.thumbnail}" alt="" loading="lazy" /><span class="status-pill">${escapeHtml(repo.status)}</span></div>
        <span class="kicker">${escapeHtml(repo.meta)}</span>
        <h3>${escapeHtml(repo.name)}</h3>
        <p class="industry-hook">${escapeHtml(repo.hook)}</p>
        ${project ? `<span class="kicker">${icon("hub")} ${escapeHtml(project.name)}</span>` : ""}
        <span class="outline-button full">View Repo Notes ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

function sourceCard(source) {
  return `
    <a class="lab-card" href="/sources/${source.slug}">
      <article class="industry-card">
        <div class="card-thumbnail"><img src="${source.thumbnail}" alt="" loading="lazy" /></div>
        <div class="card-title-row">${evidenceBadge(source.evidenceClass)}<span class="kicker">${escapeHtml(source.topic)}</span></div>
        <h3>${escapeHtml(source.title)}</h3>
        <p class="industry-hook">${escapeHtml(source.insight)}</p>
        <span class="outline-button full">Read the Breakdown ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

function labEventCard(event) {
  return `
    <a class="lab-card" href="/events/${event.slug}">
      <article class="industry-card">
        <div class="card-thumbnail"><img src="${event.thumbnail}" alt="" loading="lazy" /><span class="status-pill">${escapeHtml(event.status)}</span></div>
        <span class="kicker">${icon(event.virtual ? "videocam" : "location_on")} ${escapeHtml(event.type)}</span>
        <h3>${escapeHtml(event.name)}</h3>
        <p class="industry-hook">${escapeHtml(event.why)}</p>
        <ul class="industry-capabilities">
          <li>${icon("event")}<span>${escapeHtml(eventDateRange(event))}</span></li>
          <li>${icon(event.virtual ? "public" : "place")}<span>${escapeHtml(event.location)}</span></li>
        </ul>
        <span class="outline-button full">Event Details ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

// ---------------------------------------------------------------------------
// Pagination — perPage kept low deliberately so the mechanism is visibly
// real today, not just future-proofing. paginate() slices; paginationNav()
// renders prev/numbered/next. basePath is the listing route ("/experiments");
// page 1 always lives at basePath itself, page N>1 at `${basePath}/page/${N}`.
// ---------------------------------------------------------------------------

function paginate(items, page, perPage) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return { pageItems: items.slice(start, start + perPage), totalPages, page: current };
}

function pageHref(basePath, page) {
  return page <= 1 ? basePath : `${basePath}/page/${page}`;
}

function paginationNav(basePath, page, totalPages) {
  if (totalPages <= 1) return "";
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return `
    <nav class="pagination" aria-label="Pagination">
      <a class="${page <= 1 ? "pagination-disabled" : ""}" href="${pageHref(basePath, page - 1)}" aria-label="Previous page">${icon("chevron_left")}</a>
      ${pages
        .map((p) => (p === page ? `<span class="pagination-current">${p}</span>` : `<a href="${pageHref(basePath, p)}">${p}</a>`))
        .join("")}
      <a class="${page >= totalPages ? "pagination-disabled" : ""}" href="${pageHref(basePath, page + 1)}" aria-label="Next page">${icon("chevron_right")}</a>
    </nav>
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

// ---------------------------------------------------------------------------
// AGRICULTURAL ECONOMIC SYSTEMS INTELLIGENCE — Regions, Organizations,
// Systems, and Investigations. Cards follow the exact lab-card pattern above
// (projectCard/experimentCard/repoCard/sourceCard): one clickable <a> around
// an .industry-card, thumbnail (or a media-icon-tile fallback for entries
// with no generated image yet) on top. Detail pages follow the same
// breadcrumbs()/detail-field-grid()/detail-related-grid pattern as
// renderProjectDetail etc. below.
// ---------------------------------------------------------------------------

function thumbnailOrIcon(entity, iconName) {
  return entity.thumbnail
    ? `<img src="${entity.thumbnail}" alt="" loading="lazy" />`
    : `<div class="media-icon-tile"><span class="material-symbols-outlined">${escapeHtml(iconName)}</span></div>`;
}

function detailFieldLinks(title, items) {
  if (!items?.length) return "";
  return detailField(
    title,
    `<ul class="industry-capabilities">${items
      .map((item) => `<li>${icon("link")}<span>${item.url ? `<a href="${item.url}">${escapeHtml(item.label)}</a>` : escapeHtml(item.label)}${item.note ? ` — ${escapeHtml(item.note)}` : ""}</span></li>`)
      .join("")}</ul>`,
  );
}

function searchAttr(...parts) {
  return escapeHtml(parts.filter(Boolean).join(" ").toLowerCase());
}

function regionCard(region) {
  const isPlaceholder = region.status === "watchlist";
  return `
    <a class="lab-card" href="/research-and-case-studies/${region.slug}" data-category="Regions" data-search="${searchAttr(region.name, region.tagline, ...(region.commodities || []))}">
      <article class="industry-card">
        <div class="card-thumbnail">${thumbnailOrIcon(region, region.icon)}<span class="status-pill">${escapeHtml(regionStatusLabels[region.status] || region.status)}</span></div>
        <h3>${escapeHtml(region.name)}</h3>
        <p class="industry-hook">${escapeHtml(region.tagline)}</p>
        ${region.commodities?.length ? `<div class="tag-row">${region.commodities.slice(0, 4).map((c) => `<span>${escapeHtml(c)}</span>`).join("")}</div>` : ""}
        <span class="outline-button full">${isPlaceholder ? "Coming Soon" : "Read the Region Profile"} ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

function organizationCard(org) {
  const isPlaceholder = org.status === "watchlist";
  return `
    <a class="lab-card" href="/research-and-case-studies/${org.slug}" data-category="Organizations" data-search="${searchAttr(org.name, org.tagline)}">
      <article class="industry-card">
        <div class="card-thumbnail">${thumbnailOrIcon(org, org.icon)}<span class="status-pill">${escapeHtml(organizationStatusLabels[org.status] || org.status)}</span></div>
        <span class="kicker">${escapeHtml(organizationTypeLabels[org.orgType] || org.orgType)}</span>
        <h3>${escapeHtml(org.name)}</h3>
        <p class="industry-hook">${escapeHtml(org.tagline)}</p>
        <span class="outline-button full">${isPlaceholder ? "Coming Soon" : "Read the Profile"} ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

function systemCard(system) {
  const isPlaceholder = system.status === "planned";
  return `
    <a class="lab-card" href="/research-and-case-studies/${system.slug}" data-category="Systems" data-search="${searchAttr(system.name, system.tagline)}">
      <article class="industry-card">
        <div class="card-thumbnail">${thumbnailOrIcon(system, system.icon)}<span class="status-pill">${escapeHtml(systemStatusLabels[system.status] || system.status)}</span></div>
        <span class="kicker">${escapeHtml(systemCategoryLabels[system.category] || system.category)}</span>
        <h3>${escapeHtml(system.name)}</h3>
        <p class="industry-hook">${escapeHtml(system.tagline)}</p>
        <span class="outline-button full">${isPlaceholder ? "Coming Soon" : "Read How It Works"} ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

function investigationCard(investigation) {
  const region = regions.find((r) => r.slug === investigation.region);
  const isPlaceholder = !investigation.evidence?.length;
  return `
    <a class="lab-card" href="/research-and-case-studies/${investigation.slug}" data-category="Open Questions" data-search="${searchAttr(investigation.name, investigation.question)}">
      <article class="industry-card">
        <div class="card-thumbnail">${thumbnailOrIcon(investigation, investigation.icon)}<span class="status-pill">${escapeHtml(investigationStatusLabels[investigation.status] || investigation.status)}</span></div>
        ${region ? `<span class="kicker">${icon("landscape")} ${escapeHtml(region.shortName || region.name)}</span>` : ""}
        <h3>${escapeHtml(investigation.name)}</h3>
        <p class="industry-hook">${escapeHtml(investigation.question)}</p>
        <span class="outline-button full">${isPlaceholder ? "Coming Soon" : "Read What We Know So Far"} ${icon("arrow_forward")}</span>
      </article>
    </a>
  `;
}

export function renderRegions() {
  const body = `
    <main class="articles-page">
      <section class="home-hero articles-hero">
        <div class="hero-bg"><img src="/assets/ag-lab/regions-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("landscape")} Regions</span>
            <h1>How your area's farm economy actually works.</h1>
            <p>A county, a river corridor, a multi-state belt — whatever the natural boundary is, we walk through what's grown there, who finances it, and how it gets to market. Southeast Missouri is the deepest profile so far, because it's home.</p>
            <div class="button-row"><a class="outline-button" href="/research-and-case-studies">Browse Everything ${icon("arrow_forward")}</a></div>
          </div>
        </div>
      </section>
      <div class="industry-grid lab-grid">${regions.map((region) => regionCard(region)).join("")}</div>
    </main>
  `;

  return pageShell({
    title: "Regions | AutoNateAI Agricultural Systems Lab",
    active: "regions",
    body,
    canonicalPath: "/regions",
    ogImage: "/assets/og/regions.jpg",
    description: "U.S. agricultural regions AutoNateAI is profiling — production, capital, freight, and the organizations that connect them, with Southeast Missouri as the deepest profile so far.",
    ogTitle: "Regions | AutoNateAI Agricultural Systems Lab",
    ogDescription: "Agricultural regions profiled by AutoNateAI's economic-intelligence research, with Southeast Missouri as the deepest profile so far.",
  });
}

export function renderRegionDetail(region) {
  const relatedOrgs = organizations.filter((o) => region.organizations?.includes(o.slug));
  const relatedSystems = systems.filter((s) => region.systems?.includes(s.slug));
  const relatedInvestigations = investigations.filter((i) => region.investigations?.includes(i.slug));

  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["Research & Case Studies", "/research-and-case-studies"], [region.name, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${icon(region.icon)} Region &middot; ${escapeHtml(regionStatusLabels[region.status] || region.status)}</span>
          <h1>${escapeHtml(region.name)}</h1>
          <p>${escapeHtml(region.tagline)}</p>
          ${region.commodities?.length ? `<div class="tag-row">${region.commodities.map((c) => `<span>${escapeHtml(c)}</span>`).join("")}</div>` : ""}
        </header>
        ${region.thumbnail ? `<img src="${region.thumbnail}" alt="" />` : ""}
        ${region.stats?.length ? `<div class="stat-grid">${region.stats.map((s) => `<div><strong>${escapeHtml(s.value)}</strong><span>${escapeHtml(s.label)}</span></div>`).join("")}</div>` : ""}
        <div class="detail-field-grid">
          ${detailFieldText("Where This Is", region.geography)}
          ${region.coordinates ? detailFieldText("Central Point", region.coordinates) : ""}
          ${detailFieldText("What's Grown Here", region.production)}
          ${detailFieldText("How It's Financed", region.capital)}
          ${detailFieldText("How It Gets to Market", region.freight)}
        </div>
        ${detailFieldLinks("Sources", region.sources)}

        ${relatedOrgs.length ? `<h2>Lenders & Businesses Here</h2><div class="detail-related-grid">${relatedOrgs.map((o) => organizationCard(o)).join("")}</div>` : ""}
        ${relatedSystems.length ? `<h2>How Things Work Here</h2><div class="detail-related-grid">${relatedSystems.map((s) => systemCard(s)).join("")}</div>` : ""}
        ${relatedInvestigations.length ? `<h2>Open Questions About This Region</h2><div class="detail-related-grid">${relatedInvestigations.map((i) => investigationCard(i)).join("")}</div>` : ""}
      </article>
    </main>
  `;

  return pageShell({
    title: `${region.name} | AutoNateAI Agricultural Systems Lab`,
    active: "regions",
    body,
    canonicalPath: `/research-and-case-studies/${region.slug}`,
    // A "coming soon" stub gets the branded, text-baked-in category card
    // instead of a bare content photo with nothing behind it.
    ogImage: region.status === "watchlist" ? "/assets/og/regions.jpg" : region.thumbnail || "/assets/og/regions.jpg",
    description: region.tagline,
    ogTitle: region.name,
    ogDescription: region.tagline,
    structuredData: region.status === "watchlist" ? [] : [
      {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": region.name,
        "description": region.tagline,
        "url": `https://autonateai.com/research-and-case-studies/${region.slug}`,
      },
    ],
  });
}

export function renderOrganizations() {
  const body = `
    <main class="articles-page">
      <section class="home-hero articles-hero">
        <div class="hero-bg"><img src="/assets/ag-lab/organizations-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("account_balance")} Organizations</span>
            <h1>The lenders, elevators, and co-ops farmers actually deal with.</h1>
            <p>Not a scraped company page — real public numbers, sourced, and the open questions worth asking next. If you work at one of these, we'd genuinely like to hear where we got it wrong.</p>
            <div class="button-row"><a class="outline-button" href="/research-and-case-studies">Browse Everything ${icon("arrow_forward")}</a></div>
          </div>
        </div>
      </section>
      <div class="industry-grid lab-grid">${organizations.map((org) => organizationCard(org)).join("")}</div>
    </main>
  `;

  return pageShell({
    title: "Organizations | AutoNateAI Agricultural Systems Lab",
    active: "organizations",
    body,
    canonicalPath: "/organizations",
    ogImage: "/assets/og/organizations.jpg",
    description: "Agricultural lenders, elevators, and cooperatives profiled by AutoNateAI with verified public figures and sources, starting with Farm Credit Southeast Missouri.",
    ogTitle: "Organizations | AutoNateAI Agricultural Systems Lab",
    ogDescription: "Agricultural lenders, elevators, and cooperatives profiled with real, sourced public numbers, starting with Farm Credit Southeast Missouri.",
  });
}

export function renderOrganizationDetail(org) {
  const region = regions.find((r) => r.slug === org.region);
  const relatedSystems = systems.filter((s) => org.systems?.includes(s.slug));
  const relatedInvestigations = investigations.filter((i) => org.investigations?.includes(i.slug));

  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["Research & Case Studies", "/research-and-case-studies"], [org.name, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${icon(org.icon)} ${escapeHtml(organizationTypeLabels[org.orgType] || org.orgType)} &middot; ${escapeHtml(organizationStatusLabels[org.status] || org.status)}</span>
          <h1>${escapeHtml(org.name)}</h1>
          <p>${escapeHtml(org.tagline)}</p>
          ${region ? `<div class="tag-row"><span>${escapeHtml(region.shortName || region.name)}</span></div>` : ""}
        </header>
        ${org.thumbnail ? `<img src="${org.thumbnail}" alt="" />` : ""}
        <div class="detail-field-grid">
          ${detailFieldText("What They Actually Do", org.roleInSystem)}
        </div>
        ${
          org.facts?.length
            ? `<h2>Verified Public Numbers</h2><dl class="fact-list">${org.facts.map((f) => `<div><dt>${escapeHtml(f.label)}</dt><dd>${escapeHtml(f.value)}</dd></div>`).join("")}</dl>`
            : ""
        }
        ${
          org.portfolioMix?.length
            ? `<h2>What They Lend Against</h2>
               ${org.portfolioMixNote ? `<p class="field-note">${escapeHtml(org.portfolioMixNote)}</p>` : ""}
               <div class="portfolio-mix">${org.portfolioMix
                 .map((m) => `<div class="portfolio-mix-row"><span>${escapeHtml(m.label)}</span><div class="portfolio-mix-bar"><div style="width:${m.percent}%"></div></div><b>${m.percent}%</b></div>`)
                 .join("")}</div>`
            : ""
        }
        ${org.locations?.length ? `<h2>Where to Find Them</h2><div class="tag-row">${org.locations.map((l) => `<span>${escapeHtml(l.name)} — ${escapeHtml(l.city)}</span>`).join("")}</div>` : ""}
        ${detailFieldList("Systems They Run On", org.technologyStack)}
        ${detailFieldList("Questions Worth Asking", org.openQuestions)}
        ${detailFieldLinks("Sources", org.sources)}

        ${relatedSystems.length ? `<h2>How They Work</h2><div class="detail-related-grid">${relatedSystems.map((s) => systemCard(s)).join("")}</div>` : ""}
        ${relatedInvestigations.length ? `<h2>Related Open Questions</h2><div class="detail-related-grid">${relatedInvestigations.map((i) => investigationCard(i)).join("")}</div>` : ""}
        ${region ? `<h2>Part of</h2><div class="detail-related-grid">${regionCard(region)}</div>` : ""}
      </article>
    </main>
  `;

  return pageShell({
    title: `${org.name} | AutoNateAI Agricultural Systems Lab`,
    active: "organizations",
    body,
    canonicalPath: `/research-and-case-studies/${org.slug}`,
    // A "coming soon" stub gets the branded, text-baked-in category card
    // instead of a bare content photo with nothing behind it.
    ogImage: org.status === "watchlist" ? "/assets/og/organizations.jpg" : org.thumbnail || "/assets/og/organizations.jpg",
    description: org.tagline,
    ogTitle: org.name,
    ogDescription: org.tagline,
    structuredData: org.status === "watchlist" ? [] : [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": org.name,
        "description": org.tagline,
        "url": `https://autonateai.com/research-and-case-studies/${org.slug}`,
      },
    ],
  });
}

export function renderSystems() {
  const body = `
    <main class="articles-page">
      <section class="home-hero articles-hero">
        <div class="hero-bg"><img src="/assets/ag-lab/systems-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("account_tree")} Systems</span>
            <h1>How the industry actually operates, step by step.</h1>
            <p>Getting a loan, moving a crop to storage, getting it processed and sold — every deep dive walks through the real steps, the people involved, and where things tend to get stuck.</p>
            <div class="button-row"><a class="outline-button" href="/research-and-case-studies">Browse Everything ${icon("arrow_forward")}</a></div>
          </div>
        </div>
      </section>
      <div class="industry-grid lab-grid">${systems.map((system) => systemCard(system)).join("")}</div>
    </main>
  `;

  return pageShell({
    title: "Systems | AutoNateAI Agricultural Systems Lab",
    active: "systems",
    body,
    canonicalPath: "/systems",
    ogImage: "/assets/og/systems.jpg",
    description: "Agricultural system deep dives from AutoNateAI: how financing, freight & storage, and processing & market access actually work, step by step.",
    ogTitle: "Systems | AutoNateAI Agricultural Systems Lab",
    ogDescription: "Step-by-step deep dives into how financing, freight, storage, and processing actually work in agriculture.",
  });
}

export function renderSystemDetail(system) {
  const relatedRegions = regions.filter((r) => system.regions?.includes(r.slug));
  const relatedInvestigations = investigations.filter((i) => system.investigations?.includes(i.slug));

  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["Research & Case Studies", "/research-and-case-studies"], [system.name, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${icon(system.icon)} ${escapeHtml(systemCategoryLabels[system.category] || system.category)} &middot; ${escapeHtml(systemStatusLabels[system.status] || system.status)}</span>
          <h1>${escapeHtml(system.name)}</h1>
          <p>${escapeHtml(system.tagline)}</p>
        </header>
        ${system.thumbnail ? `<img src="${system.thumbnail}" alt="" />` : ""}
        <div class="detail-field-grid">${detailFieldText("The Short Version", system.overview)}</div>

        ${
          system.pipeline?.length
            ? `<h2>Step by Step</h2><ol class="stage-stepper">${system.pipeline
                .map((stage) => `<li><div><h4>${escapeHtml(stage.stage)}</h4><p>${escapeHtml(stage.description)}</p></div></li>`)
                .join("")}</ol>`
            : ""
        }

        ${
          system.pillars?.length
            ? `<h2>How We Look at It</h2><div class="detail-field-grid">${system.pillars.map((p) => detailFieldText(p.pillar, p.description)).join("")}</div>`
            : ""
        }

        ${
          system.dataModel
            ? `<h2>For the Data/BI Folks: An Illustrative Data Model</h2><p>${escapeHtml(system.dataModel.description)}</p><pre class="code-block language-sql"><code>${escapeHtml(system.dataModel.sql)}</code></pre>`
            : ""
        }

        ${
          system.datasets?.length
            ? `<h2>Where the Numbers Come From</h2><div class="markdown-table"><table><thead><tr><th>Dataset</th><th>Publisher</th><th>Cadence</th></tr></thead><tbody>${system.datasets
                .map((d) => `<tr><td><a href="${d.url}">${escapeHtml(d.name)}</a></td><td>${escapeHtml(d.publisher)}</td><td>${escapeHtml(d.cadence)}</td></tr>`)
                .join("")}</tbody></table></div>`
            : ""
        }

        ${detailFieldList("Who's Involved", system.stakeholders)}

        ${relatedRegions.length ? `<h2>Where This Shows Up</h2><div class="detail-related-grid">${relatedRegions.map((r) => regionCard(r)).join("")}</div>` : ""}
        ${relatedInvestigations.length ? `<h2>Related Open Questions</h2><div class="detail-related-grid">${relatedInvestigations.map((i) => investigationCard(i)).join("")}</div>` : ""}
      </article>
    </main>
  `;

  return pageShell({
    title: `${system.name} | AutoNateAI Agricultural Systems Lab`,
    active: "systems",
    body,
    canonicalPath: `/research-and-case-studies/${system.slug}`,
    // A "coming soon" stub gets the branded, text-baked-in category card
    // instead of a bare content photo with nothing behind it.
    ogImage: system.status === "planned" ? "/assets/og/systems.jpg" : system.thumbnail || "/assets/og/systems.jpg",
    description: system.tagline,
    ogTitle: system.name,
    ogDescription: system.tagline,
  });
}

export function renderInvestigations() {
  const openCount = investigations.filter((i) => i.status === "open").length;
  const body = `
    <main class="articles-page">
      <section class="home-hero articles-hero">
        <div class="hero-bg"><img src="/assets/ag-lab/investigations-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("help_center")} Open Questions</span>
            <h1>What we're still digging into.</h1>
            <p>${openCount} open question${openCount === 1 ? "" : "s"} right now. "Open" means genuinely open — what we know, what we still need, and who we still need to talk to are all public. We don't dress up a guess as an answer.</p>
            <div class="button-row"><a class="outline-button" href="/research-and-case-studies">Browse Everything ${icon("arrow_forward")}</a></div>
          </div>
        </div>
      </section>
      <div class="industry-grid lab-grid">${investigations.map((investigation) => investigationCard(investigation)).join("")}</div>
    </main>
  `;

  return pageShell({
    title: "Open Questions | AutoNateAI Agricultural Systems Lab",
    active: "investigations",
    body,
    canonicalPath: "/investigations",
    ogImage: "/assets/og/investigations.jpg",
    description: "Open agricultural business questions AutoNateAI is investigating — what's known, what's missing, and who we still need to talk to.",
    ogTitle: "Open Questions | AutoNateAI Agricultural Systems Lab",
    ogDescription: "Open, honestly-labeled agricultural business questions AutoNateAI is investigating.",
  });
}

export function renderInvestigationDetail(investigation) {
  const region = regions.find((r) => r.slug === investigation.region);
  const relatedSystems = systems.filter((s) => s.investigations?.includes(investigation.slug));
  const relatedOrgs = organizations.filter((o) => o.investigations?.includes(investigation.slug));

  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["Research & Case Studies", "/research-and-case-studies"], [investigation.name, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${icon(investigation.icon)} Open Question &middot; ${escapeHtml(investigationStatusLabels[investigation.status] || investigation.status)}</span>
          <h1>${escapeHtml(investigation.name)}</h1>
          <p>${escapeHtml(investigation.question)}</p>
          <div class="tag-row">${region ? `<span>${escapeHtml(region.shortName || region.name)}</span>` : ""}${investigation.commodity ? `<span>${escapeHtml(investigation.commodity)}</span>` : ""}</div>
        </header>
        ${investigation.thumbnail ? `<img src="${investigation.thumbnail}" alt="" />` : ""}

        ${investigation.sourcePath ? `<div class="markdown-body">${markdownToHtml(stripFirstHeading(readResearchMarkdown(investigation.sourcePath, investigation.name)))}</div>` : ""}

        <div class="detail-field-grid">
          ${detailField("Where This Stands", `<p><strong>${escapeHtml(investigationStatusLabels[investigation.status] || investigation.status)}</strong>${investigation.status === "open" ? " — we have a real plan for answering this, but we're not there yet." : ""}</p>`)}
          ${detailFieldText("Our Best Guess So Far", investigation.hypothesis)}
        </div>

        ${detailFieldLinks("What Got Us Asking This", investigation.evidence)}

        ${
          investigation.graphLayers && (investigation.graphLayers.physical || investigation.graphLayers.capital || investigation.graphLayers.business || investigation.graphLayers.information)
            ? `<h2>How This Connects</h2><div class="detail-field-grid">
                ${detailFieldText("The Physical Side", investigation.graphLayers.physical)}
                ${detailFieldText("The Money Side", investigation.graphLayers.capital)}
                ${detailFieldText("The Day-to-Day Work", investigation.graphLayers.business)}
                ${detailFieldText("The Data/Systems Side", investigation.graphLayers.information)}
              </div>`
            : ""
        }

        ${detailFieldList("Who We'd Like to Talk To", investigation.stakeholders)}
        ${detailFieldList("What We Still Need", investigation.dataNeeds)}
        ${detailFieldList("What We'll Build From This", investigation.artifacts)}
        ${detailFieldText("What We Found", investigation.findings)}
        ${detailFieldLinks("Sources", investigation.sources)}

        ${relatedSystems.length ? `<h2>How This Works</h2><div class="detail-related-grid">${relatedSystems.map((s) => systemCard(s)).join("")}</div>` : ""}
        ${relatedOrgs.length ? `<h2>Related Organizations</h2><div class="detail-related-grid">${relatedOrgs.map((o) => organizationCard(o)).join("")}</div>` : ""}
        ${region ? `<h2>Part of</h2><div class="detail-related-grid">${regionCard(region)}</div>` : ""}
      </article>
    </main>
  `;

  return pageShell({
    title: `${investigation.name} | AutoNateAI Agricultural Systems Lab`,
    active: "investigations",
    body,
    canonicalPath: `/research-and-case-studies/${investigation.slug}`,
    // A "coming soon" stub (no evidence yet) gets the branded, text-baked-in
    // category card instead of a bare content photo with nothing behind it.
    ogImage: investigation.evidence?.length ? investigation.thumbnail || "/assets/og/investigations.jpg" : "/assets/og/investigations.jpg",
    description: investigation.question,
    ogTitle: investigation.name,
    ogDescription: investigation.question,
  });
}

export function renderLab() {
  const body = `
    <main class="articles-page">
      <section class="home-hero articles-hero">
        <div class="hero-bg"><img src="/assets/ag-lab/lab-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("science")} The Lab</span>
            <h1>Methodology and instruments.</h1>
            <p>Underneath the regions, organizations, systems, and investigations is the same general research instrumentation Nathan has been running since the lab's Sept 9 general-purpose launch: multi-week projects, a real lab notebook of experiments, the open-source repos informing them, and an evidence-ranked reading list. Not agriculture-specific — the methodology this narrows down from.</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("hub")} Projects</span>
            <h2>Multi-week research programs.</h2>
          </div>
          <a class="primary-button" href="/projects">All Projects ${icon("arrow_forward")}</a>
        </div>
        <div class="industry-grid lab-grid">${labProjects.map((project) => projectCard(project)).join("")}</div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("science")} Experiments &amp; Open Source</span>
            <h2>The lab notebook.</h2>
          </div>
          <a class="primary-button" href="/experiments">All Experiments ${icon("arrow_forward")}</a>
        </div>
        <div class="industry-grid lab-grid">
          ${labExperiments.slice(0, 3).map((experiment) => experimentCard(experiment)).join("")}
          ${openSourceRepos.slice(0, 3).map((repo) => repoCard(repo)).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("menu_book")} What I'm Reading</span>
            <h2>The evidence ladder, applied.</h2>
          </div>
        </div>
        <div class="industry-grid lab-grid">${labSources.map((source) => sourceCard(source)).join("")}</div>
      </section>
    </main>
  `;

  return pageShell({
    title: "The Lab | AutoNateAI Agricultural Systems Lab",
    active: "lab",
    body,
    canonicalPath: "/lab",
    ogImage: "/assets/ag-lab/lab-hero.jpg",
    description: "The general research instrumentation behind AutoNateAI's agricultural intelligence work — projects, experiments, open source, and an evidence-ranked reading list.",
    ogTitle: "The Lab | AutoNateAI Agricultural Systems Lab",
    ogDescription: "Methodology and instruments: the projects, experiments, open source, and reading list behind AutoNateAI's research.",
  });
}

export function renderHome(data) {
  // Feature whichever investigation actually has content (evidence/sourcePath)
  // first — an empty "coming soon" stub with status "open" shouldn't win the
  // homepage hero slot over a real, sourced piece just because its status
  // label happens to say "open" too.
  const featuredInvestigation =
    investigations.find((i) => i.evidence?.length) || investigations.find((i) => i.status === "open");

  const body = `
    <main class="lab-home">
      <section class="home-hero lab-masthead">
        <div class="hero-bg"><img src="/assets/ag-lab/home-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("agriculture")} Agricultural Economic Intelligence</span>
            <h1>We study how farm country actually works — and publish it, free.</h1>
            <p>How financing works, how a crop gets from a field to a buyer, which businesses connect to which — we research it, source it, and write it up in plain language, one region at a time.</p>
            <div class="lab-byline">
              <img src="/assets/nathan-baker.jpeg" alt="Nathan Baker" />
              <div><strong>Nathan Baker</strong><span>Founder, AutoNateAI</span></div>
            </div>
            <div class="button-row">
              <a class="primary-button" href="/research-and-case-studies">Browse the Research ${icon("arrow_forward")}</a>
              <a class="secondary-button" href="/work-with-us">Work With Us</a>
            </div>
          </div>
          <a class="hero-program-panel" href="${featuredInvestigation ? `/research-and-case-studies/${featuredInvestigation.slug}` : "/research-and-case-studies?type=Open%20Questions"}">
            <div class="hero-panel-body">
              <span class="kicker">${icon("help_center")} Featured Research Question</span>
              <h2>${featuredInvestigation ? escapeHtml(featuredInvestigation.name) : "Nothing open yet"}</h2>
              <p>${featuredInvestigation ? escapeHtml(featuredInvestigation.question) : "Check back soon for the next open question."}</p>
              <div class="hero-facts">
                <span>Every Number, Sourced</span>
                <span>Never a Guess Dressed as Fact</span>
                <span>Farm Country, Actually Explained</span>
                <span>Free. Public. No Pitch Deck.</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section class="section">
        <div class="section-head section-head-center">
          <div>
            <span class="kicker">${icon("hub")} Research Library</span>
            <h2>Four kinds of research, all in one place.</h2>
            <p>Every piece we publish falls into one of these four types. Pick the one you need.</p>
          </div>
        </div>
        <div class="value-grid">
          <article><span>${icon("landscape")}</span><h3>Regions</h3><p>What's grown, who finances it, and how it gets to market — one farming region at a time.</p><a class="outline-button full" href="/research-and-case-studies?type=Regions">See Regions ${icon("arrow_forward")}</a></article>
          <article><span>${icon("account_balance")}</span><h3>Organizations</h3><p>Profiles of the real lenders, elevators, and cooperatives farmers deal with, with sourced public numbers.</p><a class="outline-button full" href="/research-and-case-studies?type=Organizations">See Organizations ${icon("arrow_forward")}</a></article>
          <article><span>${icon("account_tree")}</span><h3>How It Works</h3><p>Step-by-step breakdowns of real processes, like getting a loan or moving a crop to market.</p><a class="outline-button full" href="/research-and-case-studies?type=Systems">See How It Works ${icon("arrow_forward")}</a></article>
          <article><span>${icon("help_center")}</span><h3>Open Questions</h3><p>What we're actively researching but haven't answered yet, labeled honestly as open.</p><a class="outline-button full" href="/research-and-case-studies?type=Open%20Questions">See Open Questions ${icon("arrow_forward")}</a></article>
        </div>
      </section>

      ${(() => {
        // Only feature a region/org card once one actually has a real
        // profile again — right now that's neither, so this gracefully
        // drops to just the one investigation with real content instead of
        // leaving two empty slots in a fixed 3-column grid.
        const featuredCards = [
          ...regions.filter((r) => r.status === "laboratory").slice(0, 1).map((region) => regionCard(region)),
          ...organizations.filter((o) => o.status !== "watchlist").slice(0, 1).map((org) => organizationCard(org)),
          ...investigations.filter((i) => i.evidence?.length).slice(0, 1).map((investigation) => investigationCard(investigation)),
        ];
        if (!featuredCards.length) return "";
        return `
      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("landscape")} Featured Research</span>
            <h2>See the research in action.</h2>
            <p>Top articles from our library.</p>
          </div>
          <a class="primary-button" href="/research-and-case-studies">Browse Everything ${icon("arrow_forward")}</a>
        </div>
        <div class="industry-grid home-featured-grid${featuredCards.length < 3 ? " home-featured-grid-sparse" : ""}">
          ${featuredCards.join("")}
        </div>
      </section>
        `;
      })()}

      <section class="newsletter">
        <div>
          <h2>Are you a farm, lender, or agribusiness with a real system question?</h2>
          <p>Reach out directly — business analysis, data work, and software builds around agricultural operations are all on the table.</p>
          <div class="button-row">
            <a class="primary-button" href="/work-with-us">Work With Us ${icon("arrow_forward")}</a>
          </div>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "AutoNateAI | Agricultural Economic Systems Intelligence Lab",
    active: "home",
    body,
    canonicalPath: "/",
    ogImage: "/assets/og/default.jpg",
    description:
      "AutoNateAI researches how farm country's money, land, and grain actually move — regional profiles, organization profiles, how-things-work guides, and open questions, with Southeast Missouri as the deepest profile so far.",
    ogTitle: "Agricultural Economic Systems Intelligence Lab",
    ogDescription:
      "Real regions, real organizations, real numbers — how farm country actually works, researched and published free by Nathan Baker.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AutoNateAI",
        "url": "https://autonateai.com",
        "description": "AutoNateAI researches how farm country's money, land, and grain actually move, nationally, with Southeast Missouri as the deepest profile so far.",
        "founder": {
          "@type": "Person",
          "name": "Nathan Baker",
        },
      },
    ],
  });
}

export function renderProjects() {
  const body = `
    <main class="articles-page">
      <section class="home-hero articles-hero">
        <div class="hero-bg"><img src="/assets/scenes/scene-02.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("hub")} Projects</span>
            <h1>Multi-week research programs.</h1>
            <p>Each project aggregates the publications, experiments, sources, and code that accumulate around one research question over time. Status reflects reality — "Forming" and "Watching" mean exactly what they say, not a euphemism for "active."</p>
          </div>
        </div>
      </section>
      <div class="industry-grid lab-grid">${labProjects.map((project) => projectCard(project)).join("")}</div>
    </main>
  `;

  return pageShell({
    title: "Projects | AutoNateAI Lab",
    active: "projects",
    body,
    canonicalPath: "/projects",
    ogImage: "/assets/scenes/scene-02.jpg",
    description: "Active multi-week research programs from AutoNateAI, Nathan Baker's independent AI, software, and human-systems research lab.",
    ogTitle: "Projects | AutoNateAI Lab",
    ogDescription: "What's currently forming at the AutoNateAI lab, and which experiments and sources are attached to each research program.",
  });
}

export function renderExperiments(page = 1) {
  const { pageItems, totalPages, page: current } = paginate(labExperiments, page, 6);
  const body = `
    <main class="articles-page">
      <section class="home-hero articles-hero">
        <div class="hero-bg"><img src="/assets/scenes/scene-05.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("science")} Experiments</span>
            <h1>The lab notebook.</h1>
            <p>Question, hypothesis, method, result. Status is honest: "Proposed" means queued, not started — nothing here claims further progress than actually happened.</p>
          </div>
        </div>
      </section>
      ${
        labExperiments.length
          ? `<div class="industry-grid lab-grid">${pageItems.map((experiment) => experimentCard(experiment)).join("")}</div>
             ${paginationNav("/experiments", current, totalPages)}`
          : `<div class="section-head section-head-center"><div><p>No experiments running yet — check back after the next research cycle.</p></div></div>`
      }
    </main>
  `;

  return pageShell({
    title: current > 1 ? `Experiments — Page ${current} | AutoNateAI Lab` : "Experiments | AutoNateAI Lab",
    active: "experiments",
    body,
    canonicalPath: current > 1 ? `/experiments/page/${current}` : "/experiments",
    ogImage: "/assets/scenes/scene-05.jpg",
    description: "The AutoNateAI lab notebook: question, hypothesis, method, and result for every experiment Nathan Baker runs.",
    ogTitle: "Experiments | AutoNateAI Lab",
    ogDescription: "Proposed and running experiments from AutoNateAI's independent AI, software, and human-systems research lab.",
    robots: current > 1 ? "noindex,follow" : "index,follow",
  });
}

export function renderOpenSource(page = 1) {
  const { pageItems, totalPages, page: current } = paginate(openSourceRepos, page, 6);
  const body = `
    <main class="articles-page">
      <section class="home-hero articles-hero">
        <div class="hero-bg"><img src="/assets/scenes/scene-07.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("code")} Open Source</span>
            <h1>What I'm studying, building with, and contributing to.</h1>
            <p>Not a GitHub mirror — the repositories currently informing the lab's active projects, and why each one matters.</p>
          </div>
        </div>
      </section>
      ${
        openSourceRepos.length
          ? `<div class="industry-grid lab-grid">${pageItems.map((repo) => repoCard(repo)).join("")}</div>
             ${paginationNav("/open-source", current, totalPages)}`
          : `<div class="section-head section-head-center"><div><p>Nothing queued yet — check back after the next research cycle.</p></div></div>`
      }
    </main>
  `;

  return pageShell({
    title: current > 1 ? `Open Source — Page ${current} | AutoNateAI Lab` : "Open Source | AutoNateAI Lab",
    active: "open-source",
    body,
    canonicalPath: current > 1 ? `/open-source/page/${current}` : "/open-source",
    ogImage: "/assets/scenes/scene-07.jpg",
    description: "Open-source repositories AutoNateAI is studying, building with, or contributing to — and why each one matters to the lab's current research.",
    ogTitle: "Open Source | AutoNateAI Lab",
    ogDescription: "The repositories currently informing AutoNateAI's active research projects.",
    robots: current > 1 ? "noindex,follow" : "index,follow",
  });
}

function breadcrumbs(trail) {
  return `<nav class="breadcrumbs">${trail.map(([label, href], index) => (href ? `<a href="${href}">${escapeHtml(label)}</a><span>/</span>` : `<b>${escapeHtml(label)}</b>`)).join("")}</nav>`;
}

function detailField(title, content) {
  if (!content) return "";
  return `<div class="detail-field"><h3>${escapeHtml(title)}</h3>${content}</div>`;
}

function detailFieldText(title, text) {
  return detailField(title, text ? `<p>${escapeHtml(text)}</p>` : "");
}

function detailFieldList(title, items) {
  if (!items?.length) return "";
  return detailField(title, `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
}

export function renderProjectDetail(project) {
  const experiments = labExperiments.filter((e) => e.project === project.slug);
  const repos = openSourceRepos.filter((r) => r.project === project.slug);
  const sources = labSources.filter((s) => s.project === project.slug);
  const isCurrent = project.slug === currentInvestigation.slug;

  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["Projects", "/projects"], [project.name, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${icon(project.icon)} Project &middot; ${escapeHtml(project.status)}</span>
          <h1>${escapeHtml(project.name)}</h1>
          <p>${escapeHtml(project.tagline)}</p>
          <div class="tag-row">${project.desks.map((desk) => `<span>${escapeHtml(desk)}</span>`).join("")}</div>
        </header>
        <img src="${project.thumbnail}" alt="" />
        <div class="stat-grid">
          <div><strong>${experiments.length}</strong><span>Experiments</span></div>
          <div><strong>${repos.length}</strong><span>Repositories</span></div>
          <div><strong>${sources.length}</strong><span>Sources</span></div>
        </div>
        <div class="detail-field-grid">
          ${detailFieldText("Research Question", project.researchQuestion)}
          ${detailFieldText("Description", project.description)}
          ${isCurrent ? detailFieldText("Latest Lab Note", currentInvestigation.note) : ""}
        </div>

        ${
          experiments.length
            ? `<h2>Related Experiments</h2><div class="detail-related-grid">${experiments.map((e) => experimentCard(e)).join("")}</div>`
            : ""
        }
        ${
          repos.length
            ? `<h2>Related Open Source</h2><div class="detail-related-grid">${repos.map((r) => repoCard(r)).join("")}</div>`
            : ""
        }
        ${
          sources.length
            ? `<h2>Related Sources</h2><div class="detail-related-grid">${sources.map((s) => sourceCard(s)).join("")}</div>`
            : ""
        }
      </article>
    </main>
  `;

  return pageShell({
    title: `${project.name} | AutoNateAI Lab`,
    active: "projects",
    body,
    canonicalPath: `/projects/${project.slug}`,
    ogImage: project.thumbnail,
    description: project.description,
    ogTitle: project.name,
    ogDescription: project.tagline,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "ResearchProject",
        "name": project.name,
        "description": project.description,
        "url": `https://autonateai.com/projects/${project.slug}`,
      },
    ],
  });
}

export function renderExperimentDetail(experiment) {
  const project = labProjects.find((p) => p.slug === experiment.project);
  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["Experiments", "/experiments"], [experiment.name, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${icon(experiment.icon)} Experiment &middot; ${escapeHtml(experiment.status)}</span>
          <h1>${escapeHtml(experiment.name)}</h1>
          <p>${escapeHtml(experiment.question)}</p>
          ${project ? `<div class="tag-row"><span>${escapeHtml(project.name)}</span></div>` : ""}
        </header>
        <img src="${experiment.thumbnail}" alt="" />
        <div class="detail-field-grid">
          ${detailFieldText("Hypothesis", experiment.hypothesis)}
          ${detailFieldText("Background", experiment.background)}
          ${detailFieldText("Method", experiment.method)}
          ${detailFieldText("Measurement Plan", experiment.measurement)}
          ${detailFieldText("Expected Artifact", experiment.artifact)}
          ${detailFieldText("Limitations", experiment.limitations)}
          ${detailField("Status", `<p>This experiment is <strong>${escapeHtml(experiment.status)}</strong>${experiment.status === "Proposed" ? " — queued, not started. Results, data, and measurements will appear here once it actually runs." : ""}</p>`)}
        </div>
        ${
          experiment.sources?.length
            ? `<h2>Sources</h2><ul class="industry-capabilities">${experiment.sources.map((s) => `<li>${icon("link")}<span><a href="${s.url}">${escapeHtml(s.label)}</a></span></li>`).join("")}</ul>`
            : ""
        }
        ${project ? `<h2>Part of</h2><div class="detail-related-grid">${projectCard(project)}</div>` : ""}
      </article>
    </main>
  `;

  return pageShell({
    title: `${experiment.name} | AutoNateAI Lab`,
    active: "experiments",
    body,
    canonicalPath: `/experiments/${experiment.slug}`,
    ogImage: experiment.thumbnail,
    description: experiment.question,
    ogTitle: experiment.name,
    ogDescription: experiment.question,
  });
}

export function renderOpenSourceDetail(repo) {
  const project = labProjects.find((p) => p.slug === repo.project);
  const relatedExperiments = labExperiments.filter((e) => e.project === repo.project || e.sources?.some((s) => s.url === repo.url));
  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["Open Source", "/open-source"], [repo.name, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${icon(repo.icon)} Open Source &middot; ${escapeHtml(repo.status)}${repo.score ? ` &middot; ${escapeHtml(repo.score)}` : ""}</span>
          <h1>${escapeHtml(repo.name)}</h1>
          <p>${escapeHtml(repo.hook)}</p>
          <div class="tag-row"><span>${escapeHtml(repo.meta)}</span>${project ? `<span>${escapeHtml(project.name)}</span>` : ""}</div>
        </header>
        <img src="${repo.thumbnail}" alt="" />
        <div class="button-row">
          <a class="primary-button" href="${repo.url}">View on GitHub ${icon("open_in_new")}</a>
        </div>
        <div class="detail-field-grid">
          ${detailFieldText("Activity", repo.activity)}
          ${detailFieldText("What to Study", repo.whatToStudy)}
          ${detailFieldText("Why It Matters", repo.whyItMatters)}
          ${detailFieldText("Action", repo.action)}
          ${detailFieldList("Notes", repo.notes)}
        </div>
        ${relatedExperiments.length ? `<h2>AutoNateAI Experiments Using This</h2><div class="detail-related-grid">${relatedExperiments.map((e) => experimentCard(e)).join("")}</div>` : ""}
        ${project ? `<h2>Part of</h2><div class="detail-related-grid">${projectCard(project)}</div>` : ""}
      </article>
    </main>
  `;

  return pageShell({
    title: `${repo.name} | AutoNateAI Lab`,
    active: "open-source",
    body,
    canonicalPath: `/open-source/${repo.slug}`,
    ogImage: repo.thumbnail,
    description: repo.hook,
    ogTitle: repo.name,
    ogDescription: repo.hook,
  });
}

export function renderSourceDetail(source) {
  const project = labProjects.find((p) => p.slug === source.project);
  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["The Lab", "/lab"], [source.title, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${evidenceBadge(source.evidenceClass)} <span style="margin-left: 8px">${escapeHtml(source.topic)}</span></span>
          <h1>${escapeHtml(source.title)}</h1>
          <p>${escapeHtml(source.authors)}</p>
        </header>
        <img src="${source.thumbnail}" alt="" />
        <div class="button-row">
          <a class="primary-button" href="${source.url}">Read the Source ${icon("open_in_new")}</a>
        </div>
        <div class="detail-field-grid">
          ${detailFieldText("Key Insight", source.insight)}
          ${detailFieldText("What's Actually Supported", source.supported)}
          ${detailFieldText("Caveat / Limitations", source.caveat)}
        </div>
        ${project ? `<h2>Part of</h2><div class="detail-related-grid">${projectCard(project)}</div>` : ""}
      </article>
    </main>
  `;

  return pageShell({
    title: `${source.title} | AutoNateAI Lab`,
    active: "articles",
    body,
    canonicalPath: `/sources/${source.slug}`,
    ogImage: source.thumbnail,
    description: source.insight,
    ogTitle: source.title,
    ogDescription: source.insight,
  });
}

export function renderEventDetail(event) {
  const body = `
    <main class="article-page">
      ${breadcrumbs([["Home", "/"], ["Events", "/events"], [event.name, null]])}
      <article class="article-detail">
        <header>
          <span class="kicker">${icon(event.virtual ? "videocam" : "location_on")} ${escapeHtml(event.type)} &middot; ${escapeHtml(event.status)}</span>
          <h1>${escapeHtml(event.name)}</h1>
          <p>${escapeHtml(event.why)}</p>
          <div class="tag-row">${event.topics.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>
        </header>
        <img src="${event.thumbnail}" alt="" />
        <div class="detail-meta-row">
          <span class="status-pill">${icon("event")} ${escapeHtml(eventDateRange(event))}</span>
          <span class="status-pill">${icon(event.virtual ? "public" : "place")} ${escapeHtml(event.location)}</span>
          ${event.organizer ? `<span class="status-pill">${icon("apartment")} ${escapeHtml(event.organizer)}</span>` : ""}
        </div>
        <div class="button-row">
          <a class="primary-button" href="${event.url}">Event Page ${icon("open_in_new")}</a>
        </div>
        <div class="detail-field-grid">
          ${detailFieldText("Action / Networking Plan", event.actionPlan)}
          ${detailFieldText("Cost / Prize Notes", event.costNotes)}
        </div>
      </article>
    </main>
  `;

  return pageShell({
    title: `${event.name} | AutoNateAI Lab`,
    active: "events",
    body,
    canonicalPath: `/events/${event.slug}`,
    ogImage: event.thumbnail,
    description: event.why,
    ogTitle: event.name,
    ogDescription: event.why,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.name,
        "startDate": event.start,
        "endDate": event.end || event.start,
        "eventAttendanceMode": event.virtual ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
        "location": { "@type": "Place", "name": event.location },
        "url": event.url,
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
    title: "AI & Coding Training Program | AutoNateAI Lab",
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
    ["Curiosity", "Ask sharper questions about how a farm economy actually behaves, not just repeat what's already assumed."],
    ["Systems Thinking", "See the inputs, the money, the handoffs, and the failure points — not just the one piece in front of you."],
    ["Integrity", "Every number gets a source. Every open question stays labeled open until it's actually answered."],
    ["Creation", "Publish real analysis, dashboards, and tools — not just observations."],
  ];
  const faqs = [
    ["Why agriculture?", "It's family. I grew up in Michigan, but my family is from the Missouri Bootheel, and I spent every summer here growing up. Once I started looking closely at agriculture with the same systems thinking I'd used in software — mapping how data, money, and decisions actually move — I realized nobody was writing most of it up in plain language. So I started, and I'm not stopping at one region."],
    ["Do you only cover Southeast Missouri?", "No. Southeast Missouri — the Bootheel — is the deepest profile so far because it's where my family's from and where I'm building this. But the research and the consulting work are both national. If you're a farm operation, lender, elevator, or agribusiness anywhere in the country, I want to hear from you."],
    ["Are you a farmer, a banker, or an economist?", "No — I'm a software engineer and business analyst by background. I'm not pretending otherwise. What I bring is the ability to research a system carefully, source it honestly, and explain it clearly — the same way I'd document any other complex system."],
    ["How do you make sure this is accurate?", "Every fact on this site links to its public source — an annual report, a USDA dataset, a government filing. Where I don't have real data yet, the page says so instead of guessing. See any of the region or organization pages for examples."],
    ["Do you also do consulting and software work?", "Yes — business analysis, data work, and software builds for farm operations, lenders, elevators, and agribusinesses anywhere in the country. See Work With Us."],
  ];

  const body = `
    <main class="about-page">
      <section class="about-hero">
        <div>
          <span class="kicker">${icon("agriculture")} About</span>
          <h1>Raised in Michigan. Rooted in the Bootheel. All in on agriculture.</h1>
          <p>AutoNateAI is my independent research and consulting practice — where my software engineering and business-analytics background meets agriculture. I grew up in Michigan, where I first got curious about how farm economies actually work, but my family is from the Missouri Bootheel, and I spent every summer here growing up. I moved back down recently, and I'm building this from home now — researching agricultural economies nationally, not just the region I can see out the window. Consulting and software work are also on the table — see <a href="/work-with-us">Work With Us</a>.</p>
          <div class="button-row">
            <a class="primary-button" href="/work-with-us">Work With Us ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="/research-and-case-studies">Browse the Research</a>
          </div>
        </div>
        <aside class="about-founder-card">
          <img src="/assets/nathan-baker.jpeg" alt="Nathan Baker, founder of AutoNateAI" />
          <div>
            <span class="kicker">Founder, AutoNateAI</span>
            <h2>Nathan Baker</h2>
            <p>Computer Science, University of Michigan. Software engineering and business analytics experience across Microsoft, Citi, Veterans United, and Atomic Object — now pointed at agriculture nationally, with deep family roots in the Bootheel.</p>
          </div>
        </aside>
      </section>

      <section class="about-mission">
        <span class="kicker">${icon("architecture")} Mission</span>
        <h2>The parts of your industry nobody explains clearly.</h2>
        <p>A lot of what actually shapes an agricultural economy — how a lender underwrites a loan, how a crop-mix shift ripples through an elevator's harvest season, which roads and rail lines a region's grain really depends on — never gets written down anywhere a farm operation, a lender, or an agribusiness can just go read it. I research it, cite where every fact comes from, and publish it free.</p>
        <p>I don't pretend to know more than I do. When I haven't found the answer yet, the page says "open question," not a guess dressed up as fact.</p>
      </section>

      <section class="spotlight-section">
        <div class="spotlight-image"><img src="/assets/landing/tech-meets-agriculture.jpg" alt="A laptop showing a data chart, with farmland visible through the window behind it" /></div>
        <div>
          <span class="kicker">${icon("apartment")} Tech and Business Analytics, Pointed at Agriculture</span>
          <h2>Whatever runs your operation, someone built the system underneath it — I map that first.</h2>
          <p>Years before agriculture, I was a software engineer and business analyst at Microsoft, Citi, Veterans United, and Atomic Object — mapping how data, money, and decisions actually move through a complex system before anyone touched it. I grew up in Michigan, but my family's from the Missouri Bootheel, and I spent every summer here growing up. Once I pointed that same discipline at agriculture, it fit immediately: whether you're a farm operation, a lender, an elevator, or an agribusiness anywhere in the country, the approach is the same — map the real process, find where it actually breaks, source every claim before we build anything.</p>
          <div class="button-row">
            <a class="primary-button" href="/work-with-us">Speak With Nathan ${icon("arrow_forward")}</a>
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

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("handshake")} Work With Us</span>
          <h2>Bring me a real workflow — I'll tell you straight whether it's a fit.</h2>
          <p>Business analysis, data work, and software builds for farm operations, lenders, elevators, and agribusinesses anywhere in the country.</p>
        </div>
        <a class="primary-button" href="/work-with-us">Work With Us ${icon("arrow_forward")}</a>
      </section>

      <section class="section compact about-faq">
        <div class="section-head"><div><span class="kicker">${icon("help")} FAQ</span><h2>Common questions</h2></div></div>
        <div class="faq-grid">
          ${faqs.map(([q, a]) => `<article><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`).join("")}
        </div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("local_activity")} Ready to Talk?</span>
          <h2>Bring me a real question about your operation, or a real workflow to fix.</h2>
          <p>Farm operations, lenders, elevators, agribusinesses — wherever you are in the country, every path starts with a conversation.</p>
        </div>
        <a class="primary-button" href="/work-with-us">Work With Us ${icon("arrow_forward")}</a>
      </section>
    </main>
  `;

  return pageShell({
    title: "About Nathan Baker | AutoNateAI Agricultural Systems Lab",
    active: "about",
    body,
    canonicalPath: "/about",
    ogImage: "/assets/og/about.jpg",
    description:
      "Nathan Baker is the researcher behind AutoNateAI, studying how farm country's money, land, and grain actually move — a software engineer by background, ex-Microsoft, Citi, and Veterans United.",
    ogTitle: "Nathan Baker — AutoNateAI Agricultural Systems Lab",
    ogDescription:
      "A software engineering background, now applied to researching how farm country actually works — plus still-open consulting and training work.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Nathan Baker",
        "jobTitle": "Founder, AutoNateAI",
        "worksFor": {
          "@type": "Organization",
          "name": "AutoNateAI",
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "University of Michigan",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(([q, a]) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": a,
          },
        })),
      },
    ],
  });
}

export function renderWorkWithUs() {
  const body = `
    <main class="about-page">
      <section class="home-hero">
        <div class="hero-bg"><img src="/assets/landing/work-with-us-hero.jpg" alt="" /></div>
        <div class="hero-content">
          <div class="hero-copy">
            <span class="kicker">${icon("handshake")} Work With Us</span>
            <h1>Bring me a real workflow. I'll tell you straight whether it's a fit.</h1>
            <p>Farm operations, lenders, elevators, and agribusinesses anywhere in the country — if there's a real workflow eating your team's time, or a question about how your part of this actually works, tell me about it below. I read every message myself.</p>
          </div>
          <aside class="hero-program-panel">
            <img src="/assets/landing/work-with-us-panel.jpg" alt="" />
            <div class="hero-panel-body">
              <span class="kicker">${icon("checklist")} Who This Is For</span>
              <h2>Farm operations, lenders, elevators, agribusinesses.</h2>
              <p>Anywhere in the country — if a real workflow is eating your team's time, this is the place to start.</p>
              <div class="hero-facts">
                <span>Business &amp; Data Analysis</span>
                <span>Custom Software Builds</span>
                <span>Team AI Training</span>
                <span>National, Not Just Local</span>
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
              <label>Organization<input data-workwithus-field="organization" autocomplete="organization" placeholder="Rivera Family Farms" /></label>
              <label>What best describes you?
                <select data-workwithus-field="orgType">
                  <option value="">Select one</option>
                  <option value="Farm / Ranch Operation">Farm / Ranch Operation</option>
                  <option value="Lender / Bank / Credit Union">Lender / Bank / Credit Union</option>
                  <option value="Elevator / Cooperative">Elevator / Cooperative</option>
                  <option value="Agribusiness">Agribusiness</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <label>What do you need?
              <select data-workwithus-field="need">
                <option value="">Select one</option>
                <option value="Business & Data Analysis">Business & Data Analysis</option>
                <option value="Custom Software Build">Custom Software Build</option>
                <option value="Team AI Training">Team AI Training</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>
            <label>Tell me about what you're working on<textarea data-workwithus-field="details" rows="4" placeholder="What's the workflow, the question, or the problem you want solved?" required></textarea></label>
            <button class="primary-button full" type="submit">Send This to Nathan ${icon("arrow_forward")}</button>
            <p class="fine-print" data-workwithus-status>This opens your email app with everything you entered above, addressed to autonate.ai@gmail.com — review it and hit send.</p>
          </form>
          <aside class="book-sidebar">
            <div class="book-sidebar-block">
              <span class="kicker">${icon("checklist")} What happens next</span>
              <ol>
                <li>Your email app opens with a message pre-filled from what you entered — review it and hit send.</li>
                <li>I read every message myself — no auto-reply, an actual read.</li>
                <li>You'll hear back within 1-2 business days with a straight answer on fit and next steps.</li>
              </ol>
            </div>
            <div class="book-sidebar-block">
              <span class="kicker">${icon("verified")} Background</span>
              <p>Computer Science, University of Michigan. Software engineering and business-analytics experience across Microsoft, Citi, Veterans United, and Atomic Object — now applied to agriculture nationally.</p>
              <a class="outline-button full" href="/about">About Nathan ${icon("arrow_forward")}</a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  `;

  return pageShell({
    title: "Work With Us | AutoNateAI",
    active: "work-with-us",
    body,
    canonicalPath: "/work-with-us",
    ogImage: "/assets/landing/work-with-us-hero.jpg",
    description: "Business analysis, data work, and software builds for farm operations, lenders, elevators, and agribusinesses anywhere in the country — tell Nathan Baker what you need.",
    ogTitle: "Work With Us | AutoNateAI",
    ogDescription: "Bring a real workflow or a real question — business analysis, data work, and software builds for agricultural operations nationally.",
  });
}

export function renderProgramDetail(data, program) {
  const gallery = ["/assets/landing/hero-panel-two-builders.jpg", "/assets/landing/live-builds-spotlight.jpg", "/assets/landing/agent-review.jpg"];
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
            <p>A 4-day, 4-hours-a-day engagement using ChatGPT, Claude, Codex, and Claude Code — customized around your business, built on-site at your location or remote. Requested and scoped for the specific business that asks for it.</p>
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
        <a href="#outcomes"><b>On-site</b><span>Or remote</span></a>
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
          <article><img src="/assets/landing/api-data-model.jpg" alt="An internal dashboard built during a requested AutoNateAI training engagement" /><h3>Tools built for your organization</h3><p>Data models, API endpoints, agent workflows, and decisions shaped by your real business, not a hypothetical one.</p></article>
          <article><img src="/assets/landing/agent-review.jpg" alt="A builder reviewing AI-generated code changes during a training engagement" /><h3>AI-assisted engineering habits</h3><p>Use Claude Code and Codex to plan and build faster while Git commits, diffs, and architecture notes keep the work explainable.</p></article>
          <article><img src="/assets/landing/hero-panel-two-builders.jpg" alt="" /><h3>Real scenarios your team defines</h3><p>Define who each tool needs to work for, then run it against those scenarios before the engagement ends.</p></article>
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
    title: `${program.name} | Custom Business Training | AutoNateAI Lab`,
    active: "programs",
    body,
    canonicalPath: `/programs/${program.handle}`,
    ogImage: `/assets/og/${program.handle}.jpg`,
    description: program.description,
    ogTitle: "Custom AI & development training for your business.",
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
        <div class="hero-bg"><img src="/assets/scenes/scene-08.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("apartment")} Requested Team Training</span>
          <h1>Custom AI &amp; development training, built around your business.</h1>
          <p>A 4-day, 4-hours-a-day engagement — on-site at your business or remote — customized around your industry's real workflows using ChatGPT, Claude, Codex, and Claude Code. Every program is requested and built specifically for the business that asks for it.</p>
          <div class="button-row">
            <a class="primary-button" href="#request">Request Training For Your Team ${icon("arrow_forward")}</a>
            <a class="secondary-button" href="mailto:autonate.ai@gmail.com?subject=AutoNateAI%20training%20question">Talk With AutoNateAI</a>
          </div>
        </div>
        <aside class="hero-program-panel">
          <img src="/assets/landing/hero-panel-two-builders.jpg" alt="" />
          <div class="hero-panel-body">
            <span class="kicker">${icon("emoji_events")} What Your Team Leaves With</span>
            <h2>3 real internal tools, ready for work or home.</h2>
            <p>Not a certificate. Working software your team built themselves, chosen from a menu of 9 tools that could help your business immediately.</p>
            <div class="hero-facts">
              <span>4 days, 4 hrs/day</span>
              <span>On-site or remote</span>
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
                <span>4 days &middot; On-site or remote</span>
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
    title: "Custom AI Training for Local Businesses | AutoNateAI",
    active: "for-organizations",
    body,
    canonicalPath: "/for-organizations",
    ogImage: "/assets/og/for-organizations.jpg",
    description:
      "Custom, on-site AI training for Southeast Missouri businesses: 4 days, real ChatGPT/Claude/Codex workflows, and 3 real internal tools your team builds and keeps.",
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
  const isHumanSystems = (event) => event.topics.includes("Mindfulness") || event.topics.includes("Neurotech");
  const technicalEvents = labEvents.filter((event) => !isHumanSystems(event));
  const humanSystemsEvents = labEvents.filter(isHumanSystems);

  const body = `
    <main class="league-page consulting-page events-page">
      <section class="home-hero league-detail-hero">
        <div class="hero-bg"><img src="/assets/scenes/scene-03.jpg" alt="" /></div>
        <div class="hero-content">
        <div class="hero-copy">
          <span class="kicker">${icon("event")} Events</span>
          <h1>Where AutoNateAI shows up.</h1>
          <p>The conferences, hackathons, and research gatherings the lab's daily radars surface, tracked here as they're evaluated — not after the fact. Every card is real: a verified date, location, and link, and status that says exactly where things stand.</p>
        </div>
        <aside class="hero-program-panel">
          <div class="hero-panel-body">
            <span class="kicker">${icon("radar")} Radar Coverage</span>
            <h2>${labEvents.length} events currently tracked</h2>
            <p>Surfaced by the Events &amp; Build and Mindfulness Tech research desks on Sept 9, 2026 — status reflects what's actually true: Discovered or Considering, never claimed attendance.</p>
            <div class="hero-facts">
              <span>${technicalEvents.length} agent / software</span>
              <span>${humanSystemsEvents.length} human systems</span>
              <span>Updated daily</span>
              <span>Real, verified links</span>
            </div>
          </div>
        </aside>
        </div>
      </section>

      <section class="section" id="showing-up">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("radar")} Agent Systems &amp; Software</span>
            <h2>Where I'm showing up for the technical work.</h2>
            <p>Conferences, hackathons, and talks the lab is tracking — from a Microsoft build session to NASA Space Apps in November.</p>
          </div>
        </div>
        <div class="industry-grid lab-grid">${technicalEvents.map((event) => labEventCard(event)).join("")}</div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="kicker">${icon("psychology")} Human Systems Signals</span>
            <h2>Mindfulness, neurotech, and consciousness research.</h2>
            <p>Where the Human Systems desk finds its network — contemplative science, EEG/neurotech labs, and California's consciousness-research community.</p>
          </div>
        </div>
        <div class="industry-grid lab-grid">${humanSystemsEvents.map((event) => labEventCard(event)).join("")}</div>
      </section>

      <section class="detail-enroll-band">
        <div>
          <span class="kicker">${icon("business_center")} Want a system built for your organization?</span>
          <h2>See how the lab actually builds, then bring us the real thing.</h2>
          <p>Architecture, AI engineering, and requested team training are still very real — see how to work with me directly.</p>
        </div>
        <a class="primary-button" href="/work-with-us">Work With Me ${icon("arrow_forward")}</a>
      </section>
    </main>
  `;

  return pageShell({
    title: "Events | AutoNateAI Lab",
    active: "events",
    body,
    canonicalPath: "/events",
    ogImage: "/assets/og/events.jpg",
    description:
      "Where AutoNateAI is showing up: agent-systems and human-systems events the lab's daily radars track, with real dates, locations, and links.",
    ogTitle: "Where AutoNateAI shows up.",
    ogDescription:
      "The conferences, hackathons, and research events the lab's daily radars are watching — tracked with real dates and links, not after the fact.",
  });
}

export function renderConsulting(data) {
  const pilot = foundingBankPilot;
  const slotsRemaining = Math.max(pilot.slotsTotal - pilot.slotsFilled, 0);
  const body = `
    <main class="league-page consulting-page">
      <section class="home-hero league-detail-hero">
        <div class="hero-bg"><img src="/assets/scenes/scene-01.jpg" alt="" /></div>
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
      "AutoNateAI Consulting builds real internal AI tools for Southeast Missouri businesses, fixed-scope, priced for a business your size, not an enterprise contract.",
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
    title: "Free AI & Coding Courses | AutoNateAI Lab",
    active: "tutorials",
    body,
    canonicalPath: "/tutorials",
    ogImage: "/assets/og/courses.jpg",
    description:
      "A free course library: JavaScript fundamentals, prompt and context engineering, databases, and agentic AI, with Discord support included. No cost, no catch.",
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
    ogImage: pack.heroImage || `/assets/og/tutorial-pack-${pack.handle}.jpg`,
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
    ogImage: pack.heroImage || `/assets/og/tutorial-${tutorial.pack}-${tutorial.handle}.jpg`,
    description: tutorial.summary,
    ogTitle: `${tutorial.title}: keep the build moving.`,
    ogDescription: tutorial.summary,
  });
}

export function renderCommunity() {
  const body = `
    <main class="community-page">
      <section class="home-hero community-detail-hero">
        <div class="hero-bg"><img src="/assets/scenes/scene-06.jpg" alt="" /></div>
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
    title: "Community & Discord Support | AutoNateAI Lab",
    active: "community",
    body,
    canonicalPath: "/community",
    ogImage: "/assets/og/community.jpg",
    description:
      "Join the AutoNateAI Discord community for help with the four free AI and coding courses, requested team training, and any system you're building on your own — all day, every day.",
    ogTitle: "The systems lab has a Discord.",
    ogDescription:
      "Get setup help, code review, agent workflow practice, and project help with the AutoNateAI community — open all day, every day.",
  });
}

// Research & Case Studies — the single browsing hub. Regions, Organizations,
// Systems, and Open Questions all live here as filters (see the second-pass
// nav simplification note on navItems in data.mjs). The old general-lab
// articles no longer show here (third pass: this hub is agriculture-only —
// the articles/renderArticleDetail plumbing stays for their own URLs, just
// not listed on this catalog). Everything still has its own real URL for
// direct links and SEO — this page is the front door for browsing and
// discovery, not the only way in. Filtering is plain client-side JS
// (public/app.js filterArticles()); the catalog shows unpaginated, since
// the combined set is small enough that pagination would just get in the
// way of a farmer scanning for what applies to them.
const FILTER_TYPES = ["All", "Regions", "Organizations", "Systems", "Open Questions"];

export function renderArticles() {
  const featured = regions.find((r) => r.slug === "southeast-missouri");

  const body = `
    <main class="articles-page">
      <section class="about-hero">
        <div>
          <span class="kicker">${icon("search")} Research & Case Studies</span>
          <h1>Everything we've researched, in one place.</h1>
          <p>Regions, the lenders and businesses in them, how the money and the grain actually move, and the questions we're still chasing down. Search below, or filter by what you're actually looking for.</p>
        </div>
        ${
          featured
            ? `<a class="about-founder-card" href="/research-and-case-studies/${featured.slug}">
                <img src="${featured.thumbnail}" alt="${escapeHtml(featured.name)}" />
                <div>
                  <span class="kicker">${icon("star")} Featured &middot; ${escapeHtml(regionStatusLabels[featured.status] || featured.status)}</span>
                  <h2>${escapeHtml(featured.name)}</h2>
                  <p>${escapeHtml(featured.tagline)}</p>
                </div>
              </a>`
            : ""
        }
      </section>

      <div class="content-tools">
        <label>${icon("search")} <input type="search" placeholder="Search regions, lenders, questions..." data-article-search /></label>
        <div class="filter-row" data-article-filters>
          ${FILTER_TYPES.map((type) => `<button type="button" data-filter="${escapeHtml(type)}">${escapeHtml(type)}</button>`).join("")}
        </div>
      </div>
      <div class="industry-grid lab-grid" data-article-grid>
        ${regions.map((region) => regionCard(region)).join("")}
        ${organizations.map((org) => organizationCard(org)).join("")}
        ${systems.map((system) => systemCard(system)).join("")}
        ${investigations.map((investigation) => investigationCard(investigation)).join("")}
      </div>
      <nav class="pagination" data-article-pagination aria-label="Pagination"></nav>
    </main>
  `;

  return pageShell({
    title: "Research & Case Studies | AutoNateAI Agricultural Systems Lab",
    active: "articles",
    body,
    canonicalPath: "/research-and-case-studies",
    ogImage: "/assets/og/research-and-case-studies.jpg",
    description:
      "Regional profiles, organization profiles, how-things-work explainers, and open questions from AutoNateAI's agricultural economic-intelligence research — all in one searchable, filterable place.",
    ogTitle: "Research & Case Studies | AutoNateAI Agricultural Systems Lab",
    ogDescription:
      "Everything AutoNateAI has researched about how farm country's money, land, and grain actually move — search or filter to find what applies to you.",
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
          ${article.question ? `<p class="article-question">${icon("help_center")} ${escapeHtml(article.question)}</p>` : ""}
          <p>${escapeHtml(article.summary)}</p>
          <div class="article-byline">By Nathan Baker, AutoNateAI${article.datePublished ? ` &middot; <time datetime="${escapeHtml(article.datePublished)}">${escapeHtml(formatDate(article.datePublished))}</time>` : ""}${article.dateModified && article.dateModified !== article.datePublished ? ` &middot; Updated ${escapeHtml(formatDate(article.dateModified))}` : ""}</div>
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
        "datePublished": article.datePublished,
        "dateModified": article.dateModified || article.datePublished,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://autonateai.com/articles/${article.handle}`,
        },
        "author": {
          "@type": "Person",
          "name": "Nathan Baker",
          "url": "https://autonateai.com/about",
        },
        "publisher": {
          "@type": "Organization",
          "name": "AutoNateAI",
          "logo": {
            "@type": "ImageObject",
            "url": "https://autonateai.com/assets/brand/logo-512.png",
          },
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

// Same pattern as readTutorialMarkdown, for research entries (investigations,
// and eventually regions/organizations/systems) that carry their long-form
// narrative in content/research/<slug>.md instead of an inline string field
// in data.mjs. See apps/marketplace/.claude/skills/research-brief/.
function readResearchMarkdown(sourcePath, fallbackTitle) {
  try {
    return readFileSync(new URL(sourcePath, import.meta.url), "utf8");
  } catch {
    return `# ${fallbackTitle}\n\nThis research write-up could not be loaded yet.`;
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
  if (lang === "chart" || lang === "map") {
    return dataBlockHtml(lang, raw);
  }
  const highlighted = ["js", "javascript"].includes(lang) ? highlightJavaScript(raw) : escapeHtml(raw);
  return `<pre class="code-block language-${escapeHtml(lang)}"><code>${highlighted}</code></pre>`;
}

// ```chart / ```map fences hold a JSON spec and render client-side (see
// public/app.js) — same lazy-load-only-if-present pattern as Mermaid above.
// Chart.js / Leaflet only ever load on a page that actually uses one, so
// pages without research visuals pay zero cost. A malformed block degrades
// to a visible error instead of failing the whole static build.
function dataBlockHtml(kind, raw) {
  let spec;
  try {
    spec = JSON.parse(raw);
  } catch {
    return `<p class="data-block-error">Could not parse this \`\`\`${escapeHtml(kind)} block — check its JSON.</p>`;
  }
  const caption = spec.sourceLabel || spec.source || "";
  const className = kind === "chart" ? "research-chart" : "research-map";
  // Chart.js with responsive:true/maintainAspectRatio:false needs its
  // immediate parent to carry the fixed height — a height set on the canvas
  // itself (or on an ancestor further up, like the <figure>) lets Chart.js's
  // resize observer feed back into its own measurement and grow the canvas
  // without bound. The wrapper div is what's fixed-height; the canvas fills it.
  const inner = kind === "chart" ? `<div class="chart-canvas-wrap"><canvas></canvas></div>` : `<div class="map-canvas"></div>`;
  return `<figure class="${className}" data-${kind}="${escapeHtml(JSON.stringify(spec))}">${inner}${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}</figure>`;
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
  return program.handle === "ai-agent-systems" ? "/assets/landing/hero-panel-two-builders.jpg" : shot(program.sequence);
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
    <article class="article-card" data-category="Field Notes" data-search="${escapeHtml(`${article.title} ${article.summary} ${article.tags.join(" ")}`.toLowerCase())}">
      <a href="/articles/${article.handle}">
        <img src="${article.image}" alt="${escapeHtml(article.title)}" />
        <div>
          <span class="kicker">${escapeHtml(article.category)} &middot; ${escapeHtml(article.readingTime)}</span>
          <h3>${escapeHtml(article.title)}</h3>
          ${article.question ? `<p class="article-question">${escapeHtml(article.question)}</p>` : ""}
          <p>${escapeHtml(article.summary)}</p>
          <div class="tag-row">${article.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </a>
    </article>
  `;
}
