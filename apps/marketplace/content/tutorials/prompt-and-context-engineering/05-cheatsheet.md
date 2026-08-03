# Cheatsheet

Every builder ends up with a sticky note, a second monitor, or a browser tab they never close. AutoNate's version is this file — the stuff he still checks before he hits enter, because a five-second pause here beats a rewritten file there. Quick lookups for the habits this pack was actually about.

## Prompt Pattern Reference

| Piece | What It Answers | Example |
| --- | --- | --- |
| Role | Who should the agent act as? | "Act like a careful Screeps engineer reviewing existing code." |
| Task | What's the specific, checkable outcome? | "Add `scout.js` that visits each adjacent room once and logs hostiles." |
| Constraints | What are the guardrails? | "Don't modify existing files. Keep CPU usage low." |
| Format | What shape should the answer come back in? | "Full new file, then a one-line spawn instruction." |
| Example *(optional)* | What does "right" look like? | A short snippet matching your existing style. |

Skip a row and the agent fills it in silently, on its own terms, not yours.

## Context-Engineering Checklist

- Only open the files this specific task actually needs — not the whole project "to be safe."
- Archive or delete dead experiments instead of leaving them sitting in the room.
- Summarize long files or logs before pasting them whole.
- Tell the agent explicitly to ask for a file it's missing instead of guessing.
- Start a fresh session for a new task instead of dragging a long, cluttered one forward.
- Remember tool output (logs, command results) counts against the same budget as everything else.

## Common Failure Modes and Fixes

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| Agent edits files you didn't mention | Ask wasn't scoped | Name the exact file, state what's off-limits |
| Output "kind of" matches the ask | Task described a feeling, not an outcome | Rewrite as something checkable pass/fail |
| Agent blends old and new code styles | Too many conflicting files open at once | Close everything but the one true pattern |
| Agent references code that doesn't exist in your project | A stale or dead file is still in context | Check what's open, archive what's unused |
| Confident method or constant you don't recognize | Hallucination | Verify against real docs before it ships |
| Works, but not the way you meant | Ambiguity you left open | Decide the open question yourself, or ask it to list options |
| Session feels vague or forgetful | Context window crowded with old history | Start a new session for the new task |

## Prompt Templates Worth Keeping

```text
You're acting as [role] on [project]. Task: [specific,
checkable outcome]. Constraints: [what not to touch, any
limits]. Format: [what shape you want back]. If you're
missing a file you need, ask before guessing.
```

```text
Before we change anything, summarize what [file] currently
does in a few bullet points so I can confirm you've got
the right picture.
```

```text
Good start. Keep everything else the same, just also
[the one specific thing that was off].
```

## Where to Go Deeper

Every habit in this cheatsheet has its full story earlier in this pack — start at `00-why-prompting-is-a-skill.md` if you want the reasoning behind any of it, not just the lookup.

## The Part Where AutoNate Looks Back

A pack ago, AutoNate typed "make my colony better" into an agent and got a mess he didn't ask for and couldn't explain. Now he opens exactly the files a task needs, states the role and the task and the constraints before he ever hits enter, and reads every diff like it might be lying to him — because sometimes, fluently and confidently, it is. He's not writing every line of his colony by hand anymore. He's directing something that can write a lot of them for him, fast, as long as he tells it the truth about what he actually wants. That's not cheating. That's just a bigger lever, and he finally knows how to pull it.

None of that happened in one sitting either. It happened one bad prompt at a time — one deleted comment, one made-up API method, one scout that walked into a tower before it learned to walk into a wall of context instead. Every mess taught him exactly what the next prompt needed that the last one didn't.

If you've been with AutoNate since a `console.log` in a JavaScript pack, or since his first creep popped into existence on a Screeps world map — you already know he doesn't stay in one place for long. And if this is the first pack of his you've picked up, that's fine too. You don't need the backstory to have just learned everything he learned.

Here's where he's actually stuck now: his colony's bigger, his roles are sharper, and the agent finally does what he asks — but he's got no real way to keep track of any of it. Which rooms are producing what. Which roles are actually pulling their weight. How his colony stacks up against whoever else is climbing the same bracket. Right now it's all just... in his head, and in scattered `console.log` lines that scroll off screen and disappear. That doesn't scale any better than hand-coding every role did. He's about to learn there's a whole different skill for holding onto information at scale — one that has nothing to do with prompts, and everything to do with keeping score.
