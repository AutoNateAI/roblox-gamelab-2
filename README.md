# Roblox GameLab 2

Rojo-synced Roblox action prototype inspired by `input_repos/world-of-claudecraft`.

## AutoNateAI GameLab

AutoNateAI GameLab is a Roblox-based competitive skill progression marketplace. Players train through standalone practice quests, buy Field Manuals, enter live CTF events, join multi-week campaigns, and apply real-world skills through team-based gameplay.

## Studio Loop

```bash
npm install
npm run dev
```

In Roblox Studio, open the Rojo plugin and connect to `localhost:34872`. After
that, code changes under `roblox/src` sync into Studio. Stop and start the play
test to restart the game with the latest scripts.

## Controls

- `WASD`: move
- `Space`: jump
- Arrow keys: rotate and pitch camera
- `J`: melee blast
- `K`: shoot hand bolt
- `L`: toggle flight
- `U`: ground slam
- `I`: arcane burst

## Project Map

- `roblox/default.project.json` maps local files into Roblox services.
- `roblox/src/ReplicatedStorage/Configs/GameConfig.lua` holds world and combat data.
- `roblox/src/ServerScriptService/ClaudecraftArena.server.lua` builds the world, enemies, and combat loop.
- `roblox/src/StarterPlayer/StarterPlayerScripts/ActionController.client.lua` handles camera and action input.
