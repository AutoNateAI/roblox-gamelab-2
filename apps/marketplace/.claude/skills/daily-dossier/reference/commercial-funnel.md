# Commercial funnel — from the 2026-09-19 ChatGPT session

Source: Nathan's ChatGPT conversation on 2026-09-19, synthesized there into `AutoNateAI_Commercial_Intelligence_Funnel_Playbook_v1.0.pdf` (local to Nathan's machine, not checked into this repo). This file is the working reference for how that playbook's model maps onto **this base's real tables** — it is not a copy of the playbook's own content (funnel math worked examples, the personal "why," the daily scorecard), which stays in the PDF.

## The model

Downstream-of-a-conversation breakdown: `$ = A × Q × R × D × O × K × V` (Attention → Qualification → Response → Discovery → Offer → Close → Value).

Upstream — where the research engine actually sits: `Research → Artifact → A → Q → C → D → O → K → $`, where `C = A × Q × R` (conversations). The key insight from that session: **C is an output, not an input** — you don't get to just decide to have conversations, you have to engineer the `A` (attention) and `Q` (qualification) that produce them. That's what the dossier's commercial-layer target list is for.

## Table mapping

No schema changes were needed for this — the Sept-16 relationship layer (`People`/`Infrastructure & Facilities`/`Interactions`/`Claims & Observations`/`Opportunities`) already had the right shape.

| Funnel stage | Airtable table / field |
|---|---|
| **A** — attention / targets identified | `People` records seeded from a dossier's per-question target list, `Relationship Stage: Discovered` |
| **Q** — qualification | `People.Stakeholder Type` (`Processor / Buyer`, `Business Owner / Operator`, `Economic Development`, `Lender / Finance`, etc. — this *is* the buyer/operator/connector classification the radar now produces) |
| **R / C** — response / conversation | `People.Relationship Stage` progression (`Discovered → Following → Engaged → Replied → Conversation → Meeting Planned → Met → Active Relationship`) plus `Interactions` records (`Channel`, `Direction`, `Outcome`) once something real happens |
| **D** — problem discovered | `Claims & Observations` (`Evidence Class: Stakeholder Claim`, `Why It Matters`) — a real need surfacing in a real conversation |
| **O / K / $** — offer / close / value | `Opportunities` (`Stage: Signal → Qualified → Outreach Planned → Conversation → Scoping → Proposal → Won / Lost`, `Estimated Value`) |

## Who writes what, and when

- **`daily-dossier` Phase 7** seeds `People` only (`A`), additively, from the dossier's target list — real, publicly verifiable targets only, never `Opportunities`, never a fabricated contact path.
- **`commercial-outreach-brief`** turns one specific `People` target Nathan chooses to pursue into a real micro-brief + outreach draft, and is the only skill allowed to create an `Opportunities` record — at `Stage: Signal`, since a drafted-and-ready outreach is more than a bare name but still nothing has actually happened yet.
- Everything past that — `Interactions`, `Claims & Observations`, any `Opportunities.Stage` move beyond `Signal` — only gets written when Nathan reports something that actually happened. Never backfilled from a guess about how a conversation "should" go.

## Diagnostic use

Don't ask "why isn't this making money" in the abstract — ask **which edge of `Research → A → Q → C → D → O → K → $` is losing probability**, using real counts pulled from these tables: `People` count = `A`, `Stakeholder Type` mix = `Q`, `Interactions` count/outcome mix = `C`, `Claims & Observations` count = `D`, `Opportunities` stage distribution = `O`/`K`, `Estimated Value` sum = `$`. Most of these will read as null or near-zero until real outreach starts happening — a null is data too (nothing tried yet), not a zero to feel bad about. Never compute or report a conversion rate as observed fact when the underlying counts are this thin.

The playbook's core operating rule applies the same way here: **one constrained variable, one experiment, one measurable outcome, update the model.** Pick one funnel edge, change one thing about it, remeasure before touching the next edge — don't try to fix `A`, `Q`, and `C` all in the same week.
