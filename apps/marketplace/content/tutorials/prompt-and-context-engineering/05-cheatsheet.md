# Cheatsheet

Every team ends up with a sticky note, a second monitor, or a browser tab nobody's allowed to close. For Nate and Kai — two people in Fairview building a studio, one self-taught and fast, one out of a decade of grant work and constitutionally unable to accept an unsourced claim — it's a whiteboard in the corner of a kitchen and this file.

This is the lookup version of everything in this pack: the patterns they actually keep open while directing an AI agent at real code. The reasoning behind each one is back in the chapters. This is just the part you check before you hit enter.

## The Whiteboard

Four lines, written a week apart, in the order they got learned the hard way:

```text
Say exactly what you want.
Then go find out if you got it.
If it wasn't in the room, it didn't happen.
Where's that from?
```

Everything below is footnotes on those.

## Prompt Pattern Reference

| Piece | What It Answers | Example |
| --- | --- | --- |
| Role | Who should the agent act as? | "You're a careful Node.js engineer in an existing codebase. Don't refactor what you weren't asked to touch." |
| Task | What's the specific, checkable outcome? | "Add `lib/followups.js` exporting `draftFollowups(signups)` returning `{to, subject, body}` for consenting rows only." |
| Constraints | What are the guardrails, especially the *don'ts*? | "No new dependencies. No network calls. No changes to any other file." |
| Format | What shape should the answer come back in? | "Full new file, then three bullets on how you'd test it." |
| Example *(optional)* | What does "right" look like? | A short snippet in your actual house style. |

Skip a row and the agent does not skip it — it fills the row in silently, using the average of everything it's ever seen. Every unstated decision is still a decision.

Kai's version, from ten years of writing scopes of work: *the section that saves you is never Deliverables, it's Out of Scope.*

## Context-Engineering Checklist

- Put the file in the room before asking about the file. An agent with no information doesn't say "I don't know" — it produces the most plausible file with that name.
- Open only what this specific task touches, not the whole project "to be safe."
- Archive dead experiments instead of closing them. Closing is a decision you re-make every session; archiving you make once.
- Keep `node_modules/` and lockfiles out of reach. One lockfile can outweigh your entire codebase in tokens.
- Summarize long files and logs, verify the summary, then drop the original.
- Ask for filtered command output ("only the failing lines") instead of raw dumps. Tool output costs the same as anything else and you didn't type it.
- Tell it explicitly to ask for a missing file instead of guessing.
- Start a fresh session for a new task instead of dragging a cluttered one along.
- Write durable project facts once, in a context file at the repo root (`AGENTS.md`, `CLAUDE.md` — check what your tool reads), instead of re-typing them every session.

## The Ten-Second Verification Kit

Anything an agent names that you don't personally recognize, settle it with a command rather than a feeling:

```bash
npm view csv-parse                    # real package: metadata, versions, maintainer
npm view csv-parser-sync              # E404: does not exist
npm view <package> repository         # is there a real repo behind it?
npm install <package> --ignore-scripts  # if you must install something unvetted
```

```bash
node -e "console.log(typeof [].flat)"      # function → real
node -e "console.log(typeof [].uniqueBy)"  # undefined → not a thing
node --test                                # a passing test is ground truth; prose isn't
```

Before installing anything an agent suggested: check the publish date, the version count, and whether a repository is listed. A package published three weeks ago with one version and no repo isn't a dependency, it's a stranger — hallucinated package names get squatted on purpose.

## The Three Questions Before Anything Ships

1. Do I recognize every method, package, and constant in this? Anything I don't, I check with one command.
2. Did I read the actual diff, or the summary of the diff? Only one of those runs.
3. Did I run it somewhere that can't hurt anybody? Dry run, test, scratch directory.

Ten seconds, bounded. If verification is taking longer than writing it yourself, you've overcorrected into the other failure mode.

## Common Failure Modes and Fixes

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| Edits files you never mentioned | Ask wasn't scoped | Name the file, state the blast radius: "no changes to any other file" |
| Output "kind of" matches the ask | Task described a feeling, not an outcome | Rewrite as something you could grade pass/fail |
| Confidently explains a file it's never seen | An empty context slot filled with plausible material | Put the file in the room, then ask again |
| Blends two eras of your own code style | Too many conflicting examples open | Close everything but the one true pattern |
| References code that doesn't exist in your project | Stale or dead file still in context | Archive it, don't just close it |
| Names a package or method you don't recognize | Hallucination — usually a chimera of two real things | `npm view` / `typeof` it before it ships |
| Cites "the standard" or "best practice" | Describing a popular tendency in the voice of a spec | Ask where it's from. Sometimes there's a spec. Often there's a popularity contest. |
| Works, but not the way you meant | Ambiguity you left open | Decide the open questions yourself, or ask it to list them without picking |
| Session feels vague or forgetful | Window crowded with old history and tool output | Fresh session for the new task |
| Did something irreversible | You never said not to | The most valuable sentence in a prompt is usually about what *not* to do |

## Prompt Templates Worth Keeping

```text
You're acting as [role] on [project]. Task: [specific, checkable
outcome]. Constraints: [what not to touch, what not to add, any
limits]. Format: [what shape you want back]. If you're missing a
file you need, ask before guessing.
```

```text
Before you write anything: list the 3-5 checks you'd expect this
to pass, and any decisions this task requires that I haven't
made. Don't pick for me. I'll confirm, then you implement.
```

```text
Before you answer: list every file you have actually read in this
conversation. If you haven't read [file], say so instead of
guessing.
```

```text
Summarize what [file] currently does in six bullets, and flag
anything that looks like a decision we made versus a question we
never answered.
```

```text
Good start — keep everything else exactly as is. Just [the one
specific thing that was off]. Show me only the changed function.
```

```text
Run the tests. Don't paste the full output — only the failing
lines, plus one sentence on what failed and where.
```

## Where to Go Deeper

Every habit here has its full story earlier in the pack. Start at `00-why-prompting-is-a-skill.md` if you want the reasoning and not just the lookup — including the ninety minutes Kai spent reorganizing a repo to match a standard that doesn't exist.

## The Part Where They Look Back

A month ago Nate typed "clean up the codebase" into an agent and got back a mess he didn't ask for, couldn't explain, and reacted to by refusing to use the thing for two days out of pride. The same week, Kai — who can find an unsourced claim in a forty-page PDF from across a room — restructured their entire project on the strength of one confident paragraph, because it arrived formatted as code and code doesn't *look* like it's bluffing.

They failed in opposite directions and it was the same failure. He wouldn't say what he wanted. She wouldn't check what she got.

Now: three files in the room and the dead ones quarantined. Role, task, constraints, format, and acceptance criteria agreed before a line gets written. A context file at the repo root doing the work Nate's memory used to do badly. And a three-word question that started as Kai's personality and is now, functionally, their build process.

Neither of them writes every line by hand anymore. They direct something that can write a lot of them, fast — as long as they tell it the truth about what they actually want and go find out whether they got it. That's not cheating. It's just a bigger lever, and they finally know where to stand.

None of it arrived in one sitting, either. It arrived one bad Friday at a time: one deleted TODO comment, one directory structure that wasn't a standard, one package name that had never existed anywhere on earth and was three keystrokes from being installed.

## What They Still Can't Do

Here's where they're actually stuck, and it's not a prompting problem.

Nineteen names on a CSV that started life as a paper sheet. Four of those people described a problem worth building. Two have replied. One introduced them to somebody else at Founders Table who isn't on the sheet at all, because she showed up late. There's a folder of meeting scribbles, a text thread, a whiteboard, and — the load-bearing system of record for an entire studio — Kai's memory of who said what in October.

The follow-ups went out. Now they need to know who replied, which ideas came from whom, which ones overlap, and which introduction came through which person. A flat CSV can't answer any of those questions, and neither can a better prompt.

"We need to be able to *ask* our own information something," Kai says.

"Like a database."

"Like a database."

There's a whole different skill for holding onto information at scale — one that has nothing to do with prompts and everything to do with structure, relationships, and being able to get an answer back out of the thing you put in.

Next pack: **The System of Record** — relational databases and graphs, built on their own real data.
