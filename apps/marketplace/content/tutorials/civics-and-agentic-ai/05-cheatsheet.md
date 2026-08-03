# The Notes Before the Live Build: Cheatsheet

AutoNate's got a new tab pinned now, next to the Screeps wiki and the SQL syntax reference: this file. The vocabulary for agentic AI is newer than a lot of what he's learned, which means it gets thrown around loosely even by people who should know better. And a real RFP doesn't wait for you to feel ready — it just sits there with a deadline on it. This is the quick-reference version of everything the last five chapters covered, for the next time he opens one cold.

## Agentic AI Vocabulary

| Term | Meaning |
| --- | --- |
| **Agent** | A system that takes a goal and works toward it across multiple steps, using tools, without needing to be re-prompted after every step |
| **Single-shot prompt** | One question, one answer — no ongoing loop, no tool use required |
| **Goal** | An outcome you hand an agent, as opposed to a single fact you ask it to state |
| **Planning** | An agent breaking a goal down into a sequence of smaller steps on its own |
| **Tool use** | An agent calling a real capability — reading a file, searching the web, writing a document, querying a database — instead of only generating text |
| **Multi-step autonomy** | The agent's ability to keep going through plan → act → observe without a human re-triggering each individual step |
| **Observation** | What an agent sees after taking an action — the result of a tool call, checked before deciding the next move |
| **Orchestration** | Coordinating multiple tools or steps toward one goal, the connective logic that turns separate actions into a coherent process |
| **Human-in-the-loop** | A point in the process where a person reviews or approves what the agent produced before it counts as final |
| **Hallucination** | An agent stating something confidently that isn't actually supported by its source — the exact reason verification never gets skipped |

## RFP Vocabulary

| Term | Meaning |
| --- | --- |
| **RFP (Request for Proposal)** | A public document describing a real problem and inviting proposals to solve it |
| **Issuing organization** | Whoever published the RFP and holds the budget |
| **Scope of work** | The actual description of what needs to be built or done |
| **Requirement** | Something the system must do |
| **Constraint** | A boundary any valid proposal must stay inside — budget, deadline, technology, accessibility |
| **Deliverable** | A concrete thing handed over at the end — software, documentation, training, support |
| **Eligibility** | Who's allowed to submit a proposal at all |
| **Stakeholder** | Anyone with a real interest in the outcome, not just whoever signed the document |
| **Decision-maker** | Whoever actually chooses the winning proposal |
| **End user** | Whoever actually uses the finished system day to day |

## RFP Research Checklist

Run through this in order the next time a real RFP lands in front of you:

1. **Find the deadline first.** Before anything else — a brilliant response to a closed RFP is a practice exercise, not a submission.
2. **Extract requirements and constraints separately**, with a source citation for each. Don't let "what it must do" and "what it must stay inside" blur into one list.
3. **Verify every extracted item against the source document.** An agent's confidence is not proof of accuracy — check it yourself, every time.
4. **Flag anything genuinely ambiguous.** Don't quietly pick an interpretation and move on; write the question down instead.
5. **Research the issuing organization directly** — mission, current programs, budget context, recent public statements.
6. **Look past the signature line for the real stakeholders** — front-line staff and end users are almost never named in the document itself.
7. **Check how comparable organizations solved a similar problem.** You're very rarely the first team to look at this exact kind of ask.
8. **Sketch the data model before the pipeline.** What does the system need to remember, and how do the pieces relate — that question comes before any diagram of steps.
9. **Map the pipeline with agents doing specific jobs**, not one agent vaguely "handling everything."
10. **Check the sketch against the constraints one more time** — budget, accessibility, deadline — before calling it done.

## The Part Where AutoNate Looks Back

Not that long ago, AutoNate typed his first `console.log` and had no idea what a variable even was. Then a colony that couldn't stop two creeps from fighting over the same source. Then a colony that could actually hold a line in the Virtual Battle Bot League. Then learning to direct an AI agent well enough that it stopped feeling like a slot machine and started feeling like a real teammate. Then a database — `colonies.db` — so none of what he learned along the way had to live only in his own memory anymore, vulnerable to a bad week or a blurry Tuesday night. Four packs. Four real walls, each one a different kind of hard, each one cleared by the same underlying habit: stop guessing, understand the actual shape of the problem, then build.

This pack is where all of that stopped being about a game. An RFP from a city he'd never heard of, a department tired of paper sign-up sheets, families stuck refreshing a waitlist that nobody was actually watching — and AutoNate had every tool he needed to read it, research it, and sketch something real in response. Not because the game taught him tricks that happened to transfer. Because directing an agent well, engineering the context it works from, and modeling data honestly were never game skills to begin with. They were just skills. The colony was where he built them. The city is where they were always going to end up pointed.

Here's the part that matters most: this doesn't end with a "next chapter." It ends with a standing invitation. Every Tuesday and Thursday, in the AutoNateAI Discord, the team pulls up a real RFP — a real city, a real foundation, a real organization with a real problem — and builds a real system live, out loud, from scratch. No lecturing. No slides. Just the same loop this pack just walked through: read it, research it, sketch it, build it, together, in front of everybody. That's not a tutorial file waiting to be written. That's happening right now, twice a week, and it's where this actually continues.

AutoNate's not done learning — nobody serious about this ever is. But he's done waiting to be ready. He's got the skills, he's got the habits, and he knows exactly what a real RFP looks like when it lands in front of him. Tuesday's coming. Pull up a chair.
