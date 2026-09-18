import { spawnSync } from "node:child_process";

const tools = [
  {
    name: "Graphviz",
    commands: ["dot"],
    homebrew: ["graphviz"],
    role: "Renders article system graphs to SVG/PNG.",
    tier: "light",
  },
  {
    name: "FFmpeg",
    commands: ["ffmpeg"],
    homebrew: ["ffmpeg"],
    role: "Stitches rendered lab assets into preview videos.",
    tier: "light",
  },
  {
    name: "GDAL/OGR",
    commands: ["gdalinfo", "ogr2ogr"],
    homebrew: ["gdal"],
    role: "Converts and validates GeoJSON, shapefiles, rasters, and other GIS formats.",
    tier: "light",
  },
  {
    name: "QGIS Processing",
    commands: ["qgis_process"],
    alternatives: {
      qgis_process: ["/Applications/QGIS-final-4_2_2.app/Contents/MacOS/qgis_process"],
    },
    homebrewCask: ["qgis"],
    role: "Runs QGIS models/headless processing jobs for publication maps.",
    tier: "heavy",
  },
  {
    name: "Blender",
    commands: ["blender"],
    homebrewCask: ["blender"],
    role: "Runs Blender/Bonsai/BlenderGIS scene exports and cinematic flyovers.",
    tier: "heavy",
  },
  {
    name: "Docker",
    commands: ["docker"],
    role: "Runs heavier lab services such as PostGIS, GeoServer, TerriaJS, farmOS, or OpenDroneMap.",
    tier: "service",
  },
  {
    name: "PostgreSQL CLI",
    commands: ["psql", "createdb"],
    alternatives: {
      psql: ["/opt/homebrew/opt/postgresql@17/bin/psql", "/opt/homebrew/opt/postgresql@16/bin/psql"],
      createdb: ["/opt/homebrew/opt/postgresql@17/bin/createdb", "/opt/homebrew/opt/postgresql@16/bin/createdb"],
    },
    homebrew: ["postgresql@16", "postgis"],
    role: "Local PostGIS database administration when not using Docker.",
    tier: "service",
  },
  {
    name: "PostGIS CLI/Extension",
    commands: ["postgis"],
    role: "Provides PostGIS extension support for local PostgreSQL spatial databases.",
    tier: "service",
  },
];

const args = new Set(process.argv.slice(2));
const installLight = args.has("--install-light");

console.log("AutoNateAI Agricultural Lab open-source tool check\n");

for (const tool of tools) {
  const present = tool.commands.every((command) => commandExists(command, tool.alternatives?.[command]));
  console.log(`${present ? "OK " : "MISS"} ${tool.name}`);
  console.log(`    role: ${tool.role}`);
  console.log(
    `    commands: ${tool.commands
      .map((cmd) => `${cmd}=${commandExists(cmd, tool.alternatives?.[cmd]) ? "yes" : "no"}`)
      .join(", ")}`,
  );

  if (!present && installLight && tool.tier === "light" && tool.homebrew?.length) {
    run("brew", ["install", ...tool.homebrew]);
  }
}

console.log("\nRecommended next steps:");
console.log("- Run `npm run marketplace:ag-lab:tools -- --install-light` for Graphviz/FFmpeg/GDAL.");
console.log("- Install QGIS and Blender only when a case study needs real cartography or 3D scenes.");
console.log("- Prefer Docker for PostGIS/GeoServer/TerriaJS services so the Mac host stays clean.");

function commandExists(command, alternatives = []) {
  if (spawnSync("zsh", ["-lc", `command -v '${command}'`], { encoding: "utf8" }).status === 0) {
    return true;
  }
  return alternatives.some((candidate) => spawnSync("test", ["-x", candidate]).status === 0);
}

function run(command, args) {
  console.log(`\n$ ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}
