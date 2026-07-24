# Cheatsheet

Every builder ends up with a sticky note, a second monitor, or a browser tab they never close. AutoNate's version is this file — the stuff he still looks up without an ounce of shame, because knowing you need to check something beats guessing and finding out the hard way. Quick lookups for things you'll otherwise re-Google every week for the first month.

## Common Error Codes

| Code | Meaning |
| --- | --- |
| `0` | `OK` — it worked |
| `-1` | `ERR_NOT_OWNER` |
| `-2` | `ERR_NO_PATH` |
| `-3` | `ERR_NAME_EXISTS` |
| `-4` | `ERR_BUSY` (spawn is already spawning) |
| `-5` | `ERR_NOT_FOUND` |
| `-6` | `ERR_NOT_ENOUGH_RESOURCES` / `ERR_NOT_ENOUGH_ENERGY` |
| `-7` | `ERR_INVALID_TARGET` |
| `-8` | `ERR_FULL` |
| `-9` | `ERR_NOT_IN_RANGE` — the one you'll handle constantly; usually means "move closer, then retry" |
| `-10` | `ERR_INVALID_ARGS` |
| `-11` | `ERR_TIRED` |
| `-12` | `ERR_NO_BODYPART` |

## Body Part Costs

| Part | Energy Cost | Effect |
| --- | --- | --- |
| `MOVE` | 50 | Reduces fatigue |
| `WORK` | 100 | Harvest 2/tick, build 5/tick, upgrade 1/tick, repair 100/tick |
| `CARRY` | 50 | 50 capacity |
| `ATTACK` | 80 | 30 melee damage/tick |
| `RANGED_ATTACK` | 150 | 10 damage/tick at range ≤3 |
| `HEAL` | 250 | 12 hp/tick melee, 4 hp/tick ranged |
| `CLAIM` | 600 | Required for `claimController`/`reserveController` |
| `TOUGH` | 10 | No action; 100 hp buffer |

Max 50 body parts per creep. Spawn capacity (`room.energyCapacityAvailable`) caps what you can actually afford at once — see the RCL table in `02-core-loop-and-roles.md`.

## API One-Liners You'll Type Constantly

```js
Game.spawns.Spawn1.room.controller.level              // current RCL
Game.spawns.Spawn1.room.energyCapacityAvailable        // max spawn capacity right now
Game.spawns.Spawn1.room.energyAvailable                // energy sitting in spawn+extensions right now
Game.cpu.getUsed()                                      // this tick's CPU so far
Game.cpu.bucket                                          // banked CPU
Game.map.describeExits(roomName)                        // adjacent room names by direction
Game.map.getRoomStatus(roomName)                        // 'normal' | 'closed' | 'novice' | 'respawn'
room.find(FIND_HOSTILE_CREEPS)                          // any hostile creep currently visible
room.getTerrain().get(x, y)                              // 0 plain, 1 wall, 2 swamp
creep.getActiveBodyparts(ATTACK)                        // live (non-destroyed) part count
```

## Structure Limits by RCL

See the full table in `02-core-loop-and-roles.md`. Containers are the exception — up to 5 allowed at any RCL, including RCL0.

## Where to Go Deeper

Every pattern in this guide has a full episode in `docs/tutorials/` with checkpoints, troubleshooting, and the reasoning behind each design choice — start at `docs/tutorials/01-first-spawn-and-harvester.md` if you want the long version of any of this.

## The Part Where AutoNate Looks Back

A few weeks ago AutoNate didn't know what a variable was. Now he's got a colony that harvests, builds, upgrades, and defends itself without him touching a single button — roads planned, roles assigned, CPU budgeted, a defender that actually reacts instead of just standing there. None of that happened in one sitting. It happened one wall at a time: one source conflict, one CPU scare, one embarrassing six-tick loss that taught him more than the win would have.

He's not finished. Nobody who's serious about this ever really is — there's always a smarter role to write, a tighter economy to run, a better answer to whatever the next opponent throws at him. But he's ready for the part that matters right now: stepping onto a real battle branch, against a real opponent, and finding out if the architecture holds. That's the Virtual Battle Bot League. That's what all of this — the JavaScript, the roles, the roads, the towers — was actually for.

If you followed AutoNate's whole path, from his first `console.log` to a colony that can hold a line: that's not nothing. Go build something that surprises you. And if you skipped straight to this pack and never met him until now — welcome to the arena anyway. The colony doesn't check your backstory before it lets you compete.
