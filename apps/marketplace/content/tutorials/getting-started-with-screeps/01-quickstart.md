# Quickstart: Playing in 15 Minutes

The world map is a lot, honestly. Hundreds of rooms, some owned, most empty, no big flashing arrow telling you "start here." AutoNate stared at it for a second feeling exactly like his first day at a new school — the whole building's right there, and nobody hands you a map. So he did the only reasonable thing: picked a room that looked decent and committed. Overthinking the "perfect" starting room is how you spend an hour not playing. Good enough beats perfect, on day one and pretty much every day after.

## 1. Claim a Room

On the world map, pick an unowned room with two visible energy sources, a controller, and enough open space near both. Enter it, and use the client's prompt to place your first spawn. Name it `Spawn1`.

## 2. Spawn Your First Worker

Open the in-game console:

```js
Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
```

`0` means it worked. If you get something else:

- `-4` — spawn is busy
- `-6` — not enough energy
- `-3` — name already exists

AutoNate named his first creep `Harvester1`, watched it pop into existence, and just kind of sat there grinning at a tiny dot on his screen for longer than he'd ever admit out loud. Yeah, the name's not creative. Nobody's first creep name is. That's not the point. The point is three weeks ago he didn't know what a variable was, and now he just typed one line and a living thing showed up in a persistent world that keeps running whether he's watching it or not. Let yourself have that moment. It doesn't get less cool the tenth time, but the first time's the first time.

## 3. Give It a Job

Open the script editor. Replace `main` with:

```js
module.exports.loop = function () {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) delete Memory.creeps[name];
  }

  if (!Game.creeps.Harvester1 && !Game.spawns.Spawn1.spawning) {
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
  }

  const creep = Game.creeps.Harvester1;
  if (!creep) return;

  if (creep.store.getFreeCapacity() > 0) {
    const source = creep.room.find(FIND_SOURCES)[0];
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
    return;
  }

  const spawn = Game.spawns.Spawn1;
  if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ffffff' } });
  }
};
```

Save it. Watch the creep harvest, return, deliver, repeat — and respawn itself automatically if it dies.

That's the entire game, in miniature: harvest, deliver, survive. Everything from here is scaling that one loop until it doesn't need you watching it. AutoNate closed his laptop, made dinner, came back forty minutes later, and his creep was still out there working — same loop, same job, no crash, no complaints, not one bit of his attention required. That's the part that actually sold him on this whole thing. Not the graphics. Not the combat. The fact that something he wrote kept doing its job in the real, running world while he was doing literally anything else.

## 4. Sanity Checks

If nothing spawns: `Game.spawns.Spawn1.spawning` and `Game.spawns.Spawn1.store[RESOURCE_ENERGY]`.

If the creep exists but sits still: check the console for a script error — a typo in `main` fails silently otherwise.

One creep working alone feels like a win right up until AutoNate tried to add a second one — and found out fast that "it worked once" and "it scales" are two very different sentences.

Next: `02-core-loop-and-roles.md`.
