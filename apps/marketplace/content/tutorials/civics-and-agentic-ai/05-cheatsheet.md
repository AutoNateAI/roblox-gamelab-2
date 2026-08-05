# The Notes Before the Live Build: Cheatsheet

This is the reference page for a four-chapter pack about responding to a real public solicitation with the help of AI agents. Nate and Kai — a builder and a former civic program coordinator, two people and a studio called AutoNateAI — spent it on City of Fairview RFP 26-118, a youth program registration and waitlist system. This file is what they'd want open in a tab the next time one lands, cold, with a deadline on it.

Kai pinned it in the Discord with the message "read this before Saturday." Nate added a second message that just said "🌯". Neither of them removed the other one.

## Agentic AI Vocabulary

| Term | Meaning |
| --- | --- |
| **Agent** | A system that takes a goal and works toward it across multiple steps, using tools, without being re-prompted after each one |
| **Single-shot prompt** | One question, one answer — no loop, no tool use, no state |
| **Goal** | An outcome you hand an agent, as opposed to a single fact you ask it to state |
| **Planning** | The agent decomposing a goal into a sequence of steps on its own |
| **Tool use** | The agent calling a real capability — read a file, search, write a document, query a database — instead of only producing text |
| **Tool description** | The text that tells the model when to reach for a tool. Vague descriptions cause wrong-tool errors far more often than bad prompts do |
| **Multi-step autonomy** | Continuing through plan → act → observe without a human re-triggering each step |
| **Observation** | What the agent sees after an action — the tool's actual result, used to decide the next move |
| **Stopping condition** | The checkable success criterion, step cap, or budget that ends the loop. A goal a machine can't verify is a loop that won't end |
| **Guardrail** | A limit on what a tool can reach — one directory instead of the disk, read-only instead of read-write |
| **Orchestration** | The connective logic coordinating multiple tools and steps into one coherent process |
| **Human-in-the-loop** | A point where a person reviews or approves before something counts as final or goes out the door |
| **Hallucination** | A confident statement unsupported by the source. The reason verification is never optional |

## Procurement Vocabulary

| Term | Meaning |
| --- | --- |
| **RFP** | Request for Proposal — you propose an approach; evaluated on technical merit, experience, and cost together |
| **IFB / ITB** | Invitation for Bid — sealed bids on an already-specified item, awarded to the lowest qualifying bidder |
| **RFI** | Request for Information — market research, no award. Often precedes the real solicitation |
| **RFQ** | Usually Request for Quote (small purchases). In some jurisdictions, Request for Qualifications — check the document's own definitions |
| **Issuing organization** | Whoever published it and holds the budget |
| **Scope of work** | The actual description of what has to get built or done |
| **Requirement** | Something the system must do |
| **Constraint** | A boundary any valid proposal must stay inside — budget, deadline, technology, accessibility, data ownership |
| **Deliverable** | A concrete thing handed over — software, documentation, training, support window |
| **Eligibility** | Who's allowed to submit at all — registration, insurance, references, required forms |
| **Shall / must** | Mandatory. Missing one can make a proposal non-responsive |
| **Should** | Advisory. Recommended, not required; may still cost you points |
| **May** | Permissive and optional — sometimes where the evaluation criteria hide real value |
| **Responsive** | Your submission conforms to what was asked — right forms, right format, on time |
| **Responsible** | You're actually capable of the work — capacity, references, insurance, financial standing |
| **Addendum** | An official amendment issued after posting. Part of the document, supersedes what it changes, often must be formally acknowledged |
| **Questions window / Q&A** | The one legitimate channel for asking anything. Closes before the due date; answers are published to all bidders |
| **Blackout / cone of silence** | The restriction on contacting anyone but the designated procurement contact while a solicitation is open |
| **Evaluation criteria** | The published scoring rubric and point weights. Read it like it's the assignment, because it is |
| **NIGP commodity code** | The classification system public buyers use — register under yours to get notified of relevant postings |
| **Open records law** | FOIA at the federal level; every state has its own for state and local bodies. Budgets, minutes, plans and awards are usually published without asking |
| **Stakeholder / decision-maker / end user** | Anyone with a real interest / whoever actually picks the winner / whoever uses the thing daily. Rarely the same person |

## The Checklist

Run this in order the next time a real solicitation lands in front of you.

1. **Find the due date first.** A brilliant response to a closed solicitation is a practice exercise. Also find the *questions* deadline, which is earlier and easier to miss.
2. **Confirm what kind of document it is.** RFP, IFB, RFI, RFQ — read its own definitions section rather than assuming from the acronym.
3. **Assemble the complete set.** Base document plus every addendum, in order. Addenda supersede. This is the most common unforced error in a first response.
4. **Check eligibility and administrative requirements early.** Vendor registration, insurance, forms, references — all of it takes real time.
5. **Extract requirements, constraints, deliverables, and eligibility separately**, with the exact source sentence, the page, and whether the language is mandatory or advisory.
6. **Read the evaluation criteria.** Point weights tell you what actually wins. Structure your response to mirror them, in their order.
7. **Verify every extracted item against the source.** Every one, once. Confidence is a writing style, not evidence.
8. **Flag ambiguities and turn them into written questions**, submitted through the designated contact before the window closes. Don't resolve a contradiction by quietly picking a side.
9. **Research the issuing organization directly** — mission, adopted plans, budget narratives, meeting minutes, prior awards. Budgets and minutes are the honest documents.
10. **Look past the signature for real stakeholders.** Front-line staff and end users are almost never named in the document.
11. **Do not contact anyone outside the procurement contact.** Research public records freely; route every question through the one channel, in writing.
12. **Check comparable jurisdictions.** What they bought, what it cost, and whether they had to buy it again.
13. **Sketch the data model before the pipeline.** What must the system remember, and how do the pieces relate.
14. **Give agents one bounded job each** — detection and drafting. Keep decisions and sending where a person's name is on it.
15. **Map every constraint to a visible design decision**, then check the sketch against all of them one more time before calling it done.

## What Actually Happened Here

A year ago two people sat at the back table of a coffee shop at a monthly builder meetup. One of them had a printed one-pager about a program registration system and no way on earth to build it. The other had a laptop full of projects that were all technically impressive and none of which any human being was waiting on.

What they built in the year between then and now was not, in the end, that system. It was a person who could ask "where's that from?" and mean it, and a person who could actually answer. Kai learned to write code, then learned when to distrust what an AI told her about it. Nate learned to explain fundamentals out loud, which is where he found out how many of his own he'd never checked. They built a database for their own work so the studio stopped living in two people's memory. And then a document showed up with a city seal on it, containing a sentence one of them had written three years earlier, in a job where nobody in the building could fix the thing she was describing.

That's the whole arc. Not "game skills transferred to real life." Just skills — reading carefully, verifying claims, modeling data honestly, directing an agent well, scoping something down until it can actually ship. They were always going to end up pointed at something like this.

## The Part That Isn't a Chapter

There's no chapter six. There's a Saturday.

**Every Saturday, 10 AM to 12 PM CST, in the AutoNateAI Discord**, we pull up a real solicitation — a real city, a real foundation, a real organization with a real problem — and work it in public. Read the document, verify the extraction, research the room, sketch the system, build the part we can build in two hours. Live. Including the parts where we're wrong, which is most of the interesting parts.

That's the whole description. It's not a course and there's nothing to prepare. It's two people who have done this exactly enough times to know how much they don't know, plus whoever shows up. Some Saturdays that's a lot of people and some Saturdays it's four. It runs either way.

Nate's spent a year building things nobody was waiting on. Kai spent three years watching a problem nobody in the room could fix. This Saturday there's a document on the screen with a real deadline on it, and both of those facts stop being true at the same time.

Bring coffee. We start at ten.
