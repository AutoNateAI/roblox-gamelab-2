import { escapeHtml, money, pageShell } from "./components.mjs";

const STATUS_OPTIONS = ["Idea", "Draft", "Active", "Retired"];
const DELIVERY_OPTIONS = ["Self-Paced", "Cohort", "Small Group", "One-on-One", "Organization"];
const PRICE_UNIT_OPTIONS = ["Per Program", "Per Hour", "Per Session", "Per Month"];

function selectField(name, options, current) {
  return `<select name="${name}">${options
    .map((opt) => `<option value="${opt}" ${opt === current ? "selected" : ""}>${opt}</option>`)
    .join("")}</select>`;
}

function shell(title, body) {
  return pageShell({
    title: `${title} | AutoNateAI Admin`,
    active: "admin",
    body: `<main class="admin-page">${body}</main>`,
    ogImage: "/assets/og/default.jpg",
    description: "Local-only admin dashboard for AutoNateAI programs.",
  });
}

export function renderAdminDashboard({ programs, league, syncMessage }) {
  const rows = programs
    .map((p) => {
      const offerings = p.fields["Program Offerings__resolved"] || [];
      const priceRange = offerings.length
        ? `${money(Math.min(...offerings.map((o) => o.fields["Price"] || 0)))} – ${money(Math.max(...offerings.map((o) => o.fields["Price"] || 0)))}`
        : "No offerings";
      const status = p.fields["Status"] || "Draft";
      return `
        <tr>
          <td>${p.fields["Sequence Order"] ?? "—"}</td>
          <td><strong>${escapeHtml(p.fields["Program Name"] || "")}</strong><br /><span class="admin-muted">${escapeHtml(p.fields["Badge / Certificate"] || "")}</span></td>
          <td><span class="status-pill ${status === "Active" ? "live" : ""}">${status}</span></td>
          <td>${priceRange}</td>
          <td class="admin-actions">
            <a class="admin-link" href="/admin/programs/${p.id}/edit">Edit</a>
            <a class="admin-link" href="/admin/programs/${p.id}/offerings">Offerings (${offerings.length})</a>
          </td>
        </tr>
      `;
    })
    .join("");

  return shell(
    "Dashboard",
    `
    <div class="admin-toolbar">
      <div>
        <span class="kicker">Local Admin</span>
        <h1>AI Software Architect &mdash; Programs</h1>
        <p class="admin-muted">Runs only on localhost. Writes go straight to the Airtable base; use "Sync &amp; Rebuild" to pull those changes into the live site's data file.</p>
      </div>
      <div class="admin-toolbar-actions">
        <a class="secondary-button" href="/admin/programs/new">+ New Program</a>
        <form method="post" action="/admin/sync-and-rebuild"><button class="primary-button" type="submit">Sync &amp; Rebuild</button></form>
      </div>
    </div>
    ${syncMessage ? `<pre class="admin-sync-output">${escapeHtml(syncMessage)}</pre>` : ""}
    <table class="admin-table">
      <thead><tr><th>#</th><th>Program</th><th>Status</th><th>Price Range</th><th>Actions</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>

    <section class="admin-league">
      <h2>League</h2>
      <p><strong>${escapeHtml(league.product?.fields?.["Title"] || "AutoNateAI Screeps League")}</strong> &mdash; status: ${escapeHtml(league.product?.fields?.["Status"] || "Idea")}</p>
      <p class="admin-muted">Edit League Seasons directly in Airtable for now &mdash; the admin tool focuses on Programs and Offerings.</p>
    </section>
  `,
  );
}

export function renderProgramForm({ program, pathId }) {
  const isEdit = Boolean(program);
  const f = program?.fields || {};

  return shell(
    isEdit ? "Edit Program" : "New Program",
    `
    <a class="admin-link" href="/admin">&larr; Back to dashboard</a>
    <h1>${isEdit ? "Edit Program" : "New Program"}</h1>
    <form class="admin-form" method="post" action="${isEdit ? `/admin/programs/${program.id}/edit` : "/admin/programs/new"}">
      <label>Program Name<input name="name" required value="${escapeHtml(f["Program Name"] || "")}" /></label>
      <label>Description<textarea name="description" rows="3">${escapeHtml(f["Description"] || "")}</textarea></label>
      <div class="two-col">
        <label>Duration (Weeks)<input type="number" name="durationWeeks" value="${f["Duration (Weeks)"] ?? 3}" /></label>
        <label>Sequence Order<input type="number" name="sequenceOrder" value="${f["Sequence Order"] ?? ""}" /></label>
      </div>
      <label>Badge / Certificate<input name="badge" value="${escapeHtml(f["Badge / Certificate"] || "")}" /></label>
      <label>Status ${selectField("status", STATUS_OPTIONS, f["Status"] || "Draft")}</label>
      <label>Learning Outcomes<textarea name="learningOutcomes" rows="2">${escapeHtml(f["Learning Outcomes"] || "")}</textarea></label>
      <label>Project Summary<textarea name="projectSummary" rows="2">${escapeHtml(f["Project Summary"] || "")}</textarea></label>
      <label>Portfolio Artifact<input name="portfolioArtifact" value="${escapeHtml(f["Portfolio Artifact"] || "")}" /></label>
      <input type="hidden" name="pathId" value="${pathId}" />
      <button class="primary-button" type="submit">${isEdit ? "Save Changes" : "Create Program"}</button>
    </form>
  `,
  );
}

export function renderOfferingsPage({ program, offerings }) {
  const rows = offerings
    .map(
      (o) => `
    <form class="admin-form admin-offering-row" method="post" action="/admin/offerings/${o.id}/edit">
      <input type="hidden" name="programId" value="${program.id}" />
      <label>Name<input name="name" value="${escapeHtml(o.fields["Offering Name"] || "")}" /></label>
      <label>Delivery ${selectField("deliveryType", DELIVERY_OPTIONS, o.fields["Delivery Type"])}</label>
      <label>Price<input type="number" name="price" value="${o.fields["Price"] ?? ""}" /></label>
      <label>Unit ${selectField("priceUnit", PRICE_UNIT_OPTIONS, o.fields["Price Unit"])}</label>
      <label>Capacity<input type="number" name="capacity" value="${o.fields["Capacity"] ?? ""}" /></label>
      <label>Status ${selectField("status", STATUS_OPTIONS, o.fields["Status"] || "Active")}</label>
      <button class="secondary-button" type="submit">Save</button>
    </form>
  `,
    )
    .join("");

  return shell(
    `${program.fields["Program Name"]} Offerings`,
    `
    <a class="admin-link" href="/admin">&larr; Back to dashboard</a>
    <h1>${escapeHtml(program.fields["Program Name"])} &mdash; Offerings</h1>
    <div class="admin-offerings-list">${rows || "<p>No offerings yet.</p>"}</div>

    <h2>Add Offering</h2>
    <form class="admin-form" method="post" action="/admin/programs/${program.id}/offerings/new">
      <label>Name<input name="name" required placeholder="${escapeHtml(program.fields["Program Name"])} — Self-Paced" /></label>
      <label>Delivery ${selectField("deliveryType", DELIVERY_OPTIONS, "Self-Paced")}</label>
      <label>Price<input type="number" name="price" required /></label>
      <label>Unit ${selectField("priceUnit", PRICE_UNIT_OPTIONS, "Per Program")}</label>
      <label>Capacity<input type="number" name="capacity" /></label>
      <label>Status ${selectField("status", STATUS_OPTIONS, "Active")}</label>
      <button class="primary-button" type="submit">Add Offering</button>
    </form>
  `,
  );
}
