# Airtable agricultural knowledge graph — table/field reference

Base: `AutoNateAI Agricultural Intelligence`, id `appcgGb8QHxrgrQB1`. Verified live via `mcp__claude_ai_Airtable__list_tables_for_base` — if anything here looks stale, re-run that instead of trusting this file blindly. Every table below has real `multipleRecordLinks` relationships to the others (Airtable auto-creates the inverse link field), so linking one direction is enough.

Use field **names**, not field IDs, when calling `create_records_for_table`/`update_records_for_table` — the MCP tools accept either, names are what stays readable. For `singleSelect` fields, write the plain choice string (e.g. `"Completed"`), not an object — the tools resolve it.

## `Research Questions` (`tblCN6mQPRuEj2c8B`)

One record per published article — mirrors the `investigations[]` entry field-for-field:

| Airtable field | Source |
|---|---|
| `Title` | `investigation.name` (the provocative headline) |
| `Slug` | `investigation.slug` |
| `Question` | `investigation.question` |
| `Short Answer` | first paragraph of the Markdown's `## Short Answer` |
| `Status` | `Open Question` \| `Investigating` \| `Answered` — matches the article's `status` (`open`→Open Question, `investigating`→Investigating, `published`→Answered) |
| `Confidence` | `Low` \| `Medium` \| `High` — your honest read of how solid the finding is, not a site field |
| `Commodities` | `investigation.commodity` |
| `Stakeholders` | `investigation.stakeholders`, joined |
| `Hypothesis` | `investigation.hypothesis` |
| `Historical Context` | the history/context section(s) of the Markdown body, condensed |
| `Policy & Incentive Signals` | the policy/incentive section(s), condensed |
| `Findings` | `investigation.findings` (leave blank if still `null`) |
| `What's Still Needed` | `investigation.dataNeeds`, joined |
| `Moral of the Story` | the `## Moral of the Story` section, condensed |
| `Evidence & Sources` | `investigation.sources`, formatted as `label — url` lines |
| `Mermaid Diagram` | the raw ` ```mermaid ` block source from the Markdown |
| `Chart Specs (JSON)` | the raw ` ```chart ` block(s) JSON |
| `Map Spec (JSON)` | the raw ` ```map ` block JSON, if present |
| `Page URL` | live URL once deployed (Phase 6) — leave blank until the push actually happens |
| `Source File Path` | `content/research/<slug>.md` |
| `Deployed` | checked only after Phase 6's push is confirmed live |
| `Created At` / `Updated At` | today, ISO date |
| `LinkedIn/Facebook/Email/YouTube Draft` | leave blank — out of scope, see SKILL.md |
| `Region` / `Related Organizations` / `Related Systems` | linked records — see linking policy below |
| `Research Backlog` / `Open Questions` | link back to whatever backlog/question row this article resolves |
| `People` / `Infrastructure & Facilities` / `Interactions` / `Claims & Observations` / `Opportunities` | only link if the research pass genuinely touched a record in one of these tables — don't force a link to look thorough |

## `Research Backlog` (`tblNYpHHOu6y9NNqd`)

The queue this skill both reads (Phase 0) and writes (Phase 5 resolve, Phase 7 add). Key fields: `Research Candidate` (short title), `Research Question` (the actual question), `Type` (`Gap Closure` / `New Investigation` / `Entity Expansion` / `Relationship / Edge` / `Dataset` / `Field Interview` / `Model / Simulation`), `Priority` (`Critical` / `High` / `Medium` / `Low`), `Status` (`Suggested` → `Selected` → `Researching` → `Completed`, or `Blocked` / `Rejected`), `Why It Matters`, `Expected Graph Contribution`, `Suggested Sources`, `Geography`, `Commodities`, `Evidence Needed`, `Radar Date`. Links: `Related Research Questions`, `Related Regions`, `Related Organizations`, `Related Systems`.

Phase 5: when today's article resolves a backlog row, set `Status: Completed` and link `Related Research Questions` to the new record — don't delete the row, the completed trail is the point.

Phase 7: new candidates get `Status: Suggested`, `Radar Date` = today. Check existing rows (by `Research Candidate`/`Research Question` text) before adding — update an existing `Suggested` row rather than creating a near-duplicate.

## `Open Questions` (`tblJ7ymASAXf0RQnq`)

Atomic unresolved questions, finer-grained than the backlog. `Question`, `Context`, `Question Type` (`Data Gap` / `Causal` / `Operational` / `Financial` / `Policy` / `Infrastructure` / `Ownership` / `People / Interview` / `Validation`), `Status` (`Open` → `Researching` → `Partially Answered` → `Answered`, or `Unanswerable / Private`), `Priority` (`Critical`/`High`/`Medium`/`Low`), `What Would Answer It`, `Answer / Current Best Evidence`, `Source Notes`, `Created Date`, `Last Checked`. Links: `Related Research Questions`, `Related Regions`, `Related Organizations`, `Related Systems`, `Interactions`, `Claims & Observations`.

Phase 5: update `Status`/`Answer / Current Best Evidence`/`Last Checked` on any row this research pass actually moved forward — most passes will leave most linked open questions untouched, that's expected (they existed for a reason).

## `Regions` / `Organizations` / `Systems`

**As of 2026-09-17 these are Airtable-only durable graph nodes — they no longer mirror anything in `src/data.mjs`.** The site's own `regions[]`/`organizations[]`/`systems[]` arrays were emptied that day (they were nothing but unwritten "Coming Soon" stub pages; the site now shows only real investigation articles — see `src/data.mjs`'s comments above each empty array and the `daily-dossier/SKILL.md` "Featured placement" section). The Airtable tables keep existing for their original purpose — linking a `Research Questions` record to a durable Region/Organization/System node in the knowledge graph — that's unaffected by the site cleanup. **Read-only for this skill either way** — search by `Name` via `list_records_for_table` to find the record to link, never create a new one here. If the dossier's question genuinely needs a Region/Organization/System that doesn't exist yet in Airtable, that's fine to add there (it's just a graph node); a new *site page* for it is the bigger scope decision — flag that to Nathan instead of touching `data.mjs`'s arrays as a side effect of a normal run.

Current real records as of the last check: Region `Southeast Missouri (The Bootheel)`, Organization `Farm Credit Southeast Missouri`, System `Agricultural Finance & Capital`. Re-check live rather than assuming this list is still complete — Regions/Organizations/Systems grow independently of this skill.

## `People` / `Infrastructure & Facilities` / `Interactions` / `Claims & Observations` / `Opportunities`

The relationship-and-networking layer from the Sept-16 ChatGPT session. This skill only touches these in Phase 7, and only additively:

- **`People`**: a real, publicly-identifiable stakeholder the dossier or research surfaced (`Stakeholder Type`, `Relationship Stage` starts at `Discovered`). Never seed a person from a guess — a name mentioned in passing in a dossier without a public profile isn't enough.
- **`Infrastructure & Facilities`**: a real facility (elevator, dryer, terminal, etc.) with at least a name and location from a verifiable source. `Confidence` field exists precisely because these often start as `Low / Needs Validation`.
- **`Interactions`** / **`Claims & Observations`** / **`Opportunities`**: these are populated by actual networking/outreach activity (per the Sept-16 conversation's LinkedIn/Facebook plan), not by this daily article-production skill. Leave them alone unless Nathan explicitly reports a real interaction to log.
