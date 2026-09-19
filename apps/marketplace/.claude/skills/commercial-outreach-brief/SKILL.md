---
name: commercial-outreach-brief
description: Turns one specific `People` target already linked to a published AutoNateAI Research Questions record into a real, sendable outreach package — a personalized 1-3 page micro-brief PDF (why this finding matters to them specifically, the key finding, links to the live article and video), a personalized LinkedIn/email draft, and (for email targets) an actual Gmail draft — then logs a Signal-stage `Opportunities` record so the commercial funnel has something to track. Use when Nathan names a specific target and asks to build outreach for them (e.g. "build a brief for the processor from today's Bootheel piece") after a daily-dossier or dossier-second-look run has seeded that person into the graph. Never runs automatically as part of the daily loop, and never sends anything itself.
---

# Commercial Outreach Brief

Downstream of `../daily-dossier/SKILL.md` (Phase 7 seeds `People` targets from each dossier question's commercial-layer target list) and `../dossier-second-look/SKILL.md`. This skill turns **one target Nathan has explicitly chosen to pursue** into a real outreach package. It does not run for all 5-15 targets a dossier surfaces — only the one(s) Nathan names — and it never sends anything on its own.

Load `../daily-dossier/reference/airtable-graph.md` for table/field names and `../daily-dossier/reference/commercial-funnel.md` for the funnel model this skill writes into. Base: `AutoNateAI Agricultural Intelligence` (`appcgGb8QHxrgrQB1`), same as `daily-dossier`.

## 0. Inputs

Nathan names a target (by name, or descriptively — "the lender from today's Bootheel piece") and, implicitly or explicitly, which article the outreach should hang off. If it's ambiguous which person or which research question, ask — don't guess at which `People` record to attach a real outreach package to.

1. Search `People` by `Name` (`mcp__claude_ai_Airtable__list_records_for_table` / `search_records`). Confirm it's linked to a `Research Questions` record via `Research Questions`.
2. If the target isn't in `People` yet (Nathan wants outreach for someone the dossier didn't flag), that's a bigger step than this skill normally takes — confirm with Nathan whether to seed the `People` record now, same evidence bar as `daily-dossier` Phase 7 (real, publicly verifiable, `Relationship Stage: Discovered`), before continuing.
3. Pull the linked `Research Questions` record: `Page URL`, `Short Answer`, `Findings`. Ask Nathan for the published video link(s) (YouTube/LinkedIn/Facebook) if relevant — this skill doesn't own video publishing and shouldn't assume a link exists without checking.
4. If this session still has the dossier's original commercial-layer notes for this target (conversation objective, outreach-concept angle) in context, use them as the starting angle rather than re-deriving from scratch. If they're gone (new session), work from `People.Why Relevant` and the article's actual findings instead.

## 1. Draft the micro-brief (PDF)

One to three pages. Structure:

- Header: AutoNateAI Agricultural Economic Systems Intelligence Lab, the target's name/org, today's date.
- One paragraph on why this specific finding is relevant to *them* — grounded in their `Stakeholder Type` and `Why Relevant`, never generic boilerplate that could go to anyone.
- The key finding, stated plainly (from `Short Answer`/`Findings` — the headline result, not the full article).
- Links: the live article URL, the video if published.
- One clear, specific ask — the conversation objective (e.g. "15 minutes to walk through what this means for your grain marketing this fall") — never a vague "let's connect."

Use the `pdf` skill to generate it. If Nathan wants the visual style matched closely to `AutoNateAI_Commercial_Intelligence_Funnel_Playbook_v1.0.pdf` (structure/tone, not its funnel-math content, which is specific to that document), ask him for it — it's local to his machine, not in this repo. Save the output at `content/outreach/<slug>/<person-slug>-brief.pdf` (create the directory if new). This path is a private send-asset, not part of the site build — don't wire it into `investigations[]` or `src/data.mjs`.

## 2. Draft the outreach copy

Two short drafts, saved as Markdown next to the PDF: `content/outreach/<slug>/<person-slug>-linkedin.md`, `content/outreach/<slug>/<person-slug>-email.md`. Personalized, referencing the specific finding, linking the brief/article, ending on the same conversation objective as the brief. Keep them at what a real person would actually read — LinkedIn message ~80-120 words, email ~120-180 words with a subject line.

For an email-path target, also create an actual Gmail draft with this copy (`mcp__claude_ai_Gmail__create_draft`) — draft only, never send. There's no send-capable MCP tool for LinkedIn/Facebook here, so the Markdown draft is the deliverable for those channels; Nathan sends it manually.

## 3. Log the funnel state

Write one `Opportunities` record (this skill is the only one allowed to create these — see `commercial-funnel.md`):

- `Opportunity`: short title, e.g. `"<Target name> — <question slug>"`.
- `Opportunity Type`: best fit from the existing choices.
- `Stage: Signal` — a drafted-and-ready outreach is more than a bare name, but nothing has actually happened yet; don't jump ahead to `Outreach Planned`/`Conversation` here.
- `Problem / Need`: the hypothesis for why this target has a need this research speaks to.
- `Why Fit`: why this specific article/finding is the right hook.
- `Next Action`: literally where the send-ready assets are, e.g. `"Send LinkedIn/email draft at content/outreach/<slug>/<person-slug>-*"`.
- Linked `People`, `Organizations` (if any), `Research Questions`.

Don't touch `People.Relationship Stage` yet — that only moves once Nathan reports the send actually happened or got a response, same rule `airtable-graph.md` already applies to `Interactions`/`Claims & Observations`.

## 4. Report back

One message: the brief's file path, the two draft file paths, the Gmail draft link/ID if one was created, and the `Opportunities` record this logged. Nathan sends manually — this skill's job ends at "ready to send," never at "sent."

## What this skill does not do

Auto-generate briefs for every target a dossier surfaces — only the one(s) Nathan names, one run at a time unless he explicitly asks for several. Send anything (email, LinkedIn, Facebook) — drafts only, always. Move `People.Relationship Stage` or `Opportunities.Stage` past `Signal` on its own — that requires Nathan reporting a real interaction happened. Fabricate a target's contact info, classification, or need beyond what's publicly verifiable or already captured in `People`. Publish the brief/outreach assets to the site — these live under `content/outreach/`, outside the build.
