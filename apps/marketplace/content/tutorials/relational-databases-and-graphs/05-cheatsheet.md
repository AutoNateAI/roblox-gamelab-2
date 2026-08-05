# Cheatsheet

Every builder ends up with a sticky note, a second monitor, or a browser tab they never close. This is the AutoNateAI version — the SQL Nate and Kai still look up without shame while building the studio's own system of record, and the handful of graph terms that took a whole chapter to click but one sentence to remember afterward. Quick lookups for the things you'd otherwise re-search every week for a month.

## SQL Quick Reference

| Clause | Purpose | Example |
| --- | --- | --- |
| `SELECT` | Choose which columns come back | `SELECT name, org FROM people;` |
| `SELECT *` | Choose every column | `SELECT * FROM ideas;` |
| `WHERE` | Filter which rows qualify (runs *before* grouping) | `WHERE verdict = 'would_use'` |
| `JOIN ... ON` | Pull matching rows together across tables via a foreign key | `JOIN people ON feedback.person_id = people.id` |
| `LEFT JOIN` | Same, but keep left-side rows even with no match (fills `NULL`) | `LEFT JOIN feedback ON feedback.idea_id = ideas.id` |
| `GROUP BY` | Collapse many rows into one summary row per category | `GROUP BY ideas.title` |
| `HAVING` | Filter the *grouped* rows, after aggregation | `HAVING COUNT(DISTINCT person_id) >= 2` |
| `ORDER BY` | Sort the results | `ORDER BY given_at DESC` |
| `LIMIT` | Cap how many rows come back | `LIMIT 10` |
| `DISTINCT` | Drop duplicate result rows | `SELECT DISTINCT dest.name` |
| `COUNT(*)` | Count **rows** in the group | `COUNT(*) AS statements` |
| `COUNT(col)` | Count rows where `col` is not `NULL` | `COUNT(feedback.id) AS feedback_count` |
| `COUNT(DISTINCT col)` | Count unique values — unique *people*, not mentions | `COUNT(DISTINCT person_id)` |
| `SUM()` | Add up a numeric column | `SUM(minutes_spent)` |
| `MAX()` / `MIN()` | Largest / smallest in the group | `MAX(feedback.given_at)` |
| `CASE WHEN ... THEN ... ELSE ... END` | Turn a condition into a value you can aggregate | `SUM(CASE WHEN verdict = 'would_use' THEN 1 ELSE 0 END)` |
| `COALESCE(a, b)` | First non-`NULL` value — a fallback | `COALESCE(MAX(given_at), first_met_at)` |
| `NULLIF(x, 0)` | `NULL` when `x` is zero — guards divide-by-zero | `total / NULLIF(COUNT(id), 0)` |
| `NOT EXISTS (...)` | Keep rows with no matching row in a subquery | `AND NOT EXISTS (SELECT 1 FROM intros WHERE ...)` |
| `CREATE TABLE` | Define a new table and its columns | `CREATE TABLE feedback (...)` |
| `CREATE VIEW` | Save a query as a reusable, always-current lookup | `CREATE VIEW idea_interest AS SELECT ...` |
| `DROP VIEW IF EXISTS` | Views can't be edited in place — drop, then recreate | `DROP VIEW IF EXISTS idea_interest;` |
| `CREATE INDEX` | Speed up repeated lookups on a column | `CREATE INDEX intros_from_idx ON intros(from_person_id);` |
| `REFERENCES` | Declare a foreign key link to another table's primary key | `person_id INTEGER REFERENCES people(id)` |
| `NOT NULL` | Refuse to insert a row missing this value | `name TEXT NOT NULL` |
| `UNIQUE` | Refuse a duplicate value in this column | `email TEXT UNIQUE` |
| `CHECK (...)` | Refuse a value outside an allowed set or condition | `CHECK (verdict IN ('would_use','interesting','not_for_me'))` |
| `PRAGMA foreign_keys = ON` | **SQLite only, per connection** — actually enforce foreign keys | `db.pragma('foreign_keys = ON')` |

```sql
-- the general shape almost every real query follows
SELECT columns
FROM table
LEFT JOIN other_table ON table.id = other_table.foreign_key
WHERE row_level_condition
GROUP BY column
HAVING aggregate_condition
ORDER BY column DESC
LIMIT number;
```

The database evaluates that in a specific order, and knowing it explains most confusing errors: **pick rows (`WHERE`) → group them (`GROUP BY`) → filter the groups (`HAVING`) → sort (`ORDER BY`) → cap (`LIMIT`).**

## The Five Queries That Lie Without Erroring

These are the ones that cost real time, because nothing breaks — you just get a confident wrong number and act on it.

| Symptom | Cause | Fix |
| --- | --- | --- |
| A count is too high | `COUNT(*)` after a join counts joined rows, not distinct things. Three statements from one person read as three people. | `COUNT(DISTINCT person_id)`, and name the column after what you actually counted |
| A count of `0` shows as `1` | `COUNT(*)` on an unmatched `LEFT JOIN` row still sees one row | `COUNT(right_table.column)` — it skips `NULL` |
| Rows vanish from a report | Inner `JOIN` drops parents with no children | `LEFT JOIN` |
| A percentage is all zeroes | Integer division: `3 / 7` is `0` | Multiply by `100.0`, not `100` |
| A constraint you wrote never fires | SQLite parses foreign keys but ignores them by default | `PRAGMA foreign_keys = ON` on **every** connection |

The habit underneath all five: after writing any query that produces a number you plan to act on, ask where that number is from and check one row of it by hand. Declared and enforced are different things; typed and meant are different things.

## Schema Design Rules of Thumb

| Question | Answer |
| --- | --- |
| Column or its own table? | Can it repeat? One name per person → column. Many pieces of feedback per person → table. |
| What should the primary key be? | A meaningless `id` the database generates. Never an email, phone, username, or company name — real-world values change, get reused, or turn out to be missing. |
| Where does a unique email go, then? | On a `UNIQUE` column, not on the primary key. Uniqueness and identity are two different jobs. |
| How do I link two tables many-to-many? | A junction table in the middle with a foreign key to each side. Never a single column. |
| Where do facts *about a relationship* go? | On the relationship's own row — venue, date, note. Not on either end. |

## Graph Glossary

| Term | Meaning |
| --- | --- |
| **Node** | A single thing in the graph — a person, an idea, an org. Same idea as a row, without an assumed single parent. Often a table you already have. |
| **Edge** | A connection between two nodes, stored as a row with a foreign key to each end. Can carry its own attributes (when, where, why). |
| **Directed edge** | An edge that only counts one way — Marcus will introduce you to Dana doesn't mean Dana will introduce you to Marcus. |
| **Self-join** | Joining a table to itself with two aliases, needed because both ends of an edge live in the same table. |
| **Cycle** | A path of edges that loops back to where it started. Tables fight this; graphs expect it. |
| **Traversal** | Walking the graph — start at a node, follow edges outward, one or more steps. |
| **Hop** | One step of a traversal. "Who can reach her, two hops out" is a two-hop question. |
| **Visited set** | The record of nodes already seen during a traversal. Without it, a cycle makes the walk run forever. Non-negotiable. |
| **Recursive CTE** | `WITH RECURSIVE` — a SQL query that feeds its own output back into itself, for traversals of unknown depth. Needs a depth cap *and* a visited set. |

## Where SQL Fits vs. Where a Graph Fits

| If the relationship is... | Reach for... |
| --- | --- |
| One parent, many children, no loops (an idea's feedback) | A table with a foreign key |
| Many-to-many, but still flat (people ↔ ideas via feedback) | A junction table |
| A web where anything can connect to anything, possibly in loops (who can introduce whom) | Nodes and edges |
| You mostly filter, sort, and total up numbers | SQL aggregation — `GROUP BY`, `COUNT`, `SUM` |
| You mostly ask "what connects to what, and how many steps away" | Graph traversal — self-joins, or `WITH RECURSIVE` |
| Five-plus hops, weighted paths, constant traversal | A dedicated graph database starts earning its keep |

## Where to Go Deeper

Every line in this cheatsheet has a full chapter behind it, with the reasoning, the failure mode, and the exact query that produced the wrong answer first — start back at `00-why-he-needs-a-scoreboard.md` for the long version of any of it.

## The Part Where They Look Back

Five chapters ago, everything Nate and Kai knew about their own studio lived in two phone notes, a paper notebook, and a shared memory that had already merged three separate Tuesdays into one Tuesday that never happened. They had two entries for the same person and hadn't noticed for a month.

Now there's a `people` table where identity is a stable id instead of an email that changes jobs. An `ideas` table where `status` can only be one of four words, because the database enforces the agreement neither of them would have kept at 1am. A `feedback` table that ties a specific statement to a specific person on a specific night. An `intros` edge table holding the tangle of who can reach whom, cycles and all. Two views and a script that print the whole picture in eight seconds.

The syntax was never the point. The point is that a system of record tells you things you would not have chosen to notice. It told them four ideas on the board had never been said out loud to another human, including the one Nate had privately decided was next. It told them Tomas Reyes had gone forty-one days without a reply after giving them the best objection anyone raised all spring. Neither of those facts was flattering, and neither would have surfaced from memory, because memory is a story you tell yourself and a database is not.

That's also the discipline underneath Kai's most annoying, most valuable habit. *Where's that from?* is not skepticism for its own sake — it's the question that caught a count of seven that was really five, a foreign key that was never enforced, a traversal that recommended introducing Kai to Kai, and a receipt scanner that had somehow received feedback from nobody. Every one of those ran without erroring. Every one of them would have been believed.

If you've been following Nate and Kai from the beginning — the deal made in the back room of Grindstone Coffee, learning to code, learning to direct an AI agent instead of arguing with it — this is the pack where the studio stopped being two people with opinions and became two people with records. And if you landed here first, with no backstory: nothing was missed. Everything in this pack stands on its own. You just met them mid-story.

Here's where it goes next. The tables, the queries, the graph, the habit of turning scattered conversation into something structured and checkable — none of that has to stay pointed at their own backlog. The next pack aims the same skills at something with actual weight outside the studio: a real open solicitation from the City of Fairview, real civic language neither of them could parse cold, and an AI agent doing real work on a real deadline. Kai has read more of those documents than anyone should have to. For the first time, that turns out to be the rarest skill in the room.
