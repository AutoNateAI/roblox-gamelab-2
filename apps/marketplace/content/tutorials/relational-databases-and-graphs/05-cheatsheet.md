# Cheatsheet

Every builder ends up with a sticky note, a second monitor, or a browser tab they never close. This is AutoNate's version for the scoreboard — the SQL syntax he still looks up without shame, and the handful of graph terms that took a chapter to click but only a sentence to remember once they did. Quick lookups for things you'll otherwise re-Google every week for the first month.

## SQL Quick Reference

| Clause | Purpose | Example |
| --- | --- | --- |
| `SELECT` | Choose which columns come back | `SELECT name, room FROM colonies;` |
| `SELECT *` | Choose every column | `SELECT * FROM matches;` |
| `WHERE` | Filter which rows qualify | `WHERE result = 'win'` |
| `JOIN ... ON` | Pull matching rows together across tables via a foreign key | `JOIN colonies ON matches.colony_id = colonies.id` |
| `GROUP BY` | Collapse many rows into one summary row per category | `GROUP BY role_name` |
| `ORDER BY` | Sort the results | `ORDER BY played_at DESC` |
| `LIMIT` | Cap how many rows come back | `LIMIT 10` |
| `COUNT()` | Count rows (or distinct values) | `COUNT(DISTINCT matches.id)` |
| `SUM()` | Add up a numeric column | `SUM(energy_harvested)` |
| `CASE WHEN ... THEN ... ELSE ... END` | Turn a condition into a value you can aggregate | `SUM(CASE WHEN result = 'win' THEN 1 ELSE 0 END)` |
| `CREATE TABLE` | Define a new table and its columns | `CREATE TABLE matches (...)` |
| `CREATE VIEW` | Save a query as a reusable, always-current lookup | `CREATE VIEW role_win_counts AS SELECT ...` |
| `REFERENCES` | Declare a foreign key link to another table's primary key | `colony_id INTEGER REFERENCES colonies(id)` |
| `NOT NULL` | Refuse to insert a row missing this value | `name TEXT NOT NULL` |

```sql
-- the general shape almost every real query follows
SELECT columns
FROM table
JOIN other_table ON table.foreign_key = other_table.id
WHERE condition
GROUP BY column
ORDER BY column DESC
LIMIT number;
```

## Graph Glossary

| Term | Meaning |
| --- | --- |
| **Node** | A single thing in the graph — a build, a colony, an opponent. Same idea as a row, without an assumed single parent. |
| **Edge** | A connection between two nodes, e.g. "this build counters that build." Can point in a direction, and any node can connect to any number of others. |
| **Directed edge** | An edge that only counts one way — A beats B doesn't imply B beats A. |
| **Cycle** | A path of edges that loops back to where it started — like Rush beating Turtle beating All-In beating Rush again. Tables fight this; graphs expect it. |
| **Traversal** | Walking the graph — starting at one node and following edges outward, one or more steps, to see what connects to what. |
| **Hop** | One step of a traversal — one edge followed. A "two-hop" question is "what beats what beats this." |

## Where SQL Fits vs. Where a Graph Fits

| If the relationship is... | Reach for... |
| --- | --- |
| One parent, many children, no loops (a colony's matches) | A table with a foreign key |
| A web where anything can connect to anything, possibly in loops (build counters) | Nodes and edges |
| You mostly filter, sort, and total up numbers | SQL aggregation (`GROUP BY`, `SUM`, `COUNT`) |
| You mostly ask "what connects to what, how many steps away" | Graph traversal |

## Where to Go Deeper

Every pattern in this cheatsheet has a full chapter behind it, with the reasoning, the failure modes, and the exact query that got AutoNate to the answer — start back at `00-why-he-needs-a-scoreboard.md` if you want the long version of any of this.

## The Part Where AutoNate Looks Back

A few chapters ago, AutoNate's entire record of his own work was four text files and a memory that couldn't be trusted past a week. Now he's got real tables holding every match he's played, real queries that answer in seconds what used to take twenty minutes of scrolling, a graph model for the relationships that never fit neatly into rows, and a scoreboard script he runs out of habit before every match — not because he has to, but because not knowing stopped being something he was willing to accept.

That's the actual shift underneath all the SQL syntax: he stopped relying on memory and vibes, and started relying on a system built to remember precisely and answer honestly. Databases, tables, foreign keys, graphs — none of that was ever really the point. The point was building something that tells him the truth about his own work, whether or not the truth is flattering.

If you've followed AutoNate since his first `console.log`, through the colony that learned to hold a line, through learning to actually direct an AI agent instead of fighting it — you watched him build the muscle this pack finally gave him somewhere to put. And if you landed here first, with no backstory at all: that's fine too. Everything in this pack stands on its own; you didn't miss a prerequisite, you just met him mid-story.

Either way, here's where he's headed next. The tables, the queries, the prompting instincts, the whole habit of turning scattered information into something structured and truthful — none of that has to stay locked inside a game. The next pack takes those exact same skills and points them somewhere bigger: real civic problems, real data, an AI agent doing real work, out past the arena entirely. AutoNate spent three packs learning to build and remember inside a game. Next, he finds out what the same skills are worth outside of one.
