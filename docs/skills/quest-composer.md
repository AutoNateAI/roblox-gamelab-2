# Skill: Quest composer

**Purpose:** turn a selected opportunity into a concrete Roblox quest plan for a
10-15 minute Season 1 experience.

## Inputs

- A `seasonOpportunity`.
- Program or trend notes.
- Existing Roblox arena capabilities in `roblox/src`.

## Output

A `quest` entry with:

- `id`, `title`, `status`, `engine`, `targetMinutes`
- `logline`
- `learningObjectives`
- `acts[]`
- `zones[]`
- `concepts.positive[]`
- `concepts.negative[]`
- `boss`
- `monetizationHooks[]`
- `portalNextActions[]`

## Method

1. Use 3-5 acts, with one act mapped to one zone and one mission.
2. Convert success concepts into power-ups players collect.
3. Convert real frictions into obstacles players avoid or overcome.
4. Put the capstone in the final act and require concepts from earlier acts.
5. Keep monetization hooks tied to accepted Roblox patterns: cosmetics,
   boosters, VIP access, private servers, battle-pass-like progression, and
   creator/organization sponsorships.
6. Keep the first playable version narrow enough to build in 3-7 days.
