import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile("data/marketplace/programs.json", "utf8"));

const errors = [];
const handles = new Set();

if (!data.path || !data.path.name) {
  errors.push("Missing path metadata.");
}

for (const program of data.programs || []) {
  if (!program.handle || !program.name) {
    errors.push("Every program needs a handle and name.");
  }
  if (handles.has(program.handle)) {
    errors.push(`Duplicate program handle: ${program.handle}`);
  }
  handles.add(program.handle);
  if (!Array.isArray(program.offerings) || program.offerings.length === 0) {
    errors.push(`${program.handle} needs at least one Program Offering.`);
  }
  if (!Array.isArray(program.sessions) || program.sessions.length === 0) {
    errors.push(`${program.handle} needs at least one Session.`);
  }
}

if (!data.league) {
  errors.push("Missing league data.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Programs OK: ${data.programs.length} programs, ${data.programs.reduce((n, p) => n + p.offerings.length, 0)} offerings.`,
);
