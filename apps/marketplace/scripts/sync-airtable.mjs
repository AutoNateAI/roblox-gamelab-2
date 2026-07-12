import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadRootEnv } from "../src/env.mjs";
import { createAirtableClient } from "../src/airtable-client.mjs";

await loadRootEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../..");
const outFile = path.join(rootDir, "data/marketplace/programs.json");

const airtable = createAirtableClient();

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function selectName(value) {
  if (!value) return undefined;
  return typeof value === "string" ? value : value.name;
}

function firstLinked(value) {
  return Array.isArray(value) && value.length ? value[0] : undefined;
}

console.log("Fetching AI Software Architect path...");
const paths = await airtable.listAll("Learning Paths", {
  filterByFormula: `{Path Name} = "AI Software Architect"`,
});
const pathRecord = paths[0];
if (!pathRecord) {
  throw new Error('Learning Path "AI Software Architect" not found in Airtable.');
}

console.log("Fetching Programs, Sessions, Offerings, Marketplace Products, League...");
const [allPrograms, allSessions, allOfferings, allProducts, allSeasons] = await Promise.all([
  airtable.listAll("Programs"),
  airtable.listAll("Sessions"),
  airtable.listAll("Program Offerings"),
  airtable.listAll("Marketplace Products"),
  airtable.listAll("Seasons"),
]);

const pathProgramIds = new Set((pathRecord.fields["Programs"] || []).map((id) => id));
const programs = allPrograms
  .filter((record) => pathProgramIds.has(record.id))
  .map((record) => {
    const f = record.fields;
    const sessions = allSessions
      .filter((s) => (s.fields["Program"] || []).includes(record.id))
      .map((s) => ({
        number: s.fields["Session Number"],
        name: s.fields["Session Name"],
        objectives: s.fields["Objectives"] || "",
        liveActivity: s.fields["Live Activity"] || "",
        homework: s.fields["Homework"] || "",
      }))
      .sort((a, b) => (a.number || 0) - (b.number || 0));

    const offerings = allOfferings
      .filter((o) => (o.fields["Program"] || []).includes(record.id))
      .map((o) => ({
        id: o.id,
        name: o.fields["Offering Name"],
        deliveryType: selectName(o.fields["Delivery Type"]),
        price: o.fields["Price"] ?? null,
        priceUnit: selectName(o.fields["Price Unit"]),
        capacity: o.fields["Capacity"] ?? null,
        meetingFrequency: o.fields["Meeting Frequency"] || "",
        status: selectName(o.fields["Status"]) || "Idea",
      }))
      .sort((a, b) => (a.price || 0) - (b.price || 0));

    return {
      id: record.id,
      handle: slugify(f["Program Name"]),
      name: f["Program Name"],
      description: f["Description"] || "",
      durationWeeks: f["Duration (Weeks)"] ?? null,
      sequence: f["Sequence Order"] ?? 0,
      learningOutcomes: f["Learning Outcomes"] || "",
      projectSummary: f["Project Summary"] || "",
      portfolioArtifact: f["Portfolio Artifact"] || "",
      badge: f["Badge / Certificate"] || "",
      status: selectName(f["Status"]) || "Draft",
      sessions,
      offerings,
    };
  })
  .sort((a, b) => a.sequence - b.sequence);

const pathProductIds = new Set(pathRecord.fields["Marketplace Products"] || []);
const leagueProductRecord = allProducts.find(
  (p) => pathProductIds.has(p.id) && selectName(p.fields["Type"]) === "League / Tournament Event",
);
const leagueSeasonId = leagueProductRecord && firstLinked(leagueProductRecord.fields["Seasons"]);
const leagueSeasonRecord = allSeasons.find((s) => s.id === leagueSeasonId);

const league = {
  product: leagueProductRecord
    ? {
        title: leagueProductRecord.fields["Title"],
        cta: leagueProductRecord.fields["CTA"] || "",
        price: leagueProductRecord.fields["Price"] ?? null,
        status: selectName(leagueProductRecord.fields["Status"]) || "Idea",
      }
    : null,
  season: leagueSeasonRecord
    ? {
        name: leagueSeasonRecord.fields["Season Name"],
        format: selectName(leagueSeasonRecord.fields["Format"]),
        winCondition: leagueSeasonRecord.fields["Win Condition"] || "",
        entryFee: leagueSeasonRecord.fields["Entry Fee"] ?? null,
        startDate: leagueSeasonRecord.fields["Start Date"] || null,
        endDate: leagueSeasonRecord.fields["End Date"] || null,
        status: selectName(leagueSeasonRecord.fields["Status"]) || "Idea",
      }
    : null,
};

const output = {
  generatedAt: new Date().toISOString(),
  path: {
    id: pathRecord.id,
    name: pathRecord.fields["Path Name"],
    description: pathRecord.fields["Description"] || "",
    targetAudience: pathRecord.fields["Target Audience"] || "",
    difficulty: selectName(pathRecord.fields["Difficulty"]),
    estimatedDuration: pathRecord.fields["Estimated Duration"] || "",
    status: selectName(pathRecord.fields["Status"]) || "Draft",
  },
  programs,
  league,
};

await mkdir(path.dirname(outFile), { recursive: true });
await writeFile(outFile, JSON.stringify(output, null, 2));

console.log(
  `Synced ${programs.length} programs (${programs.reduce((n, p) => n + p.offerings.length, 0)} offerings) + league to ${path.relative(rootDir, outFile)}`,
);
