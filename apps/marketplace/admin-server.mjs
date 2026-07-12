import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadRootEnv } from "./src/env.mjs";
import { createAirtableClient } from "./src/airtable-client.mjs";
import { renderAdminDashboard, renderOfferingsPage, renderProgramForm } from "./src/admin-pages.mjs";

await loadRootEnv();
const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const publicDir = path.join(__dirname, "public");
const port = Number(process.env.ADMIN_PORT || 4321);
const host = "127.0.0.1";

const staticContentTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

async function tryServeStatic(pathname, response) {
  const ext = path.extname(pathname);
  if (!staticContentTypes[ext]) return false;

  const filePath = path.join(publicDir, pathname);
  if (!filePath.startsWith(publicDir)) return false;

  try {
    const file = await readFile(filePath);
    response.writeHead(200, { "content-type": staticContentTypes[ext] });
    response.end(file);
    return true;
  } catch {
    return false;
  }
}

const airtable = createAirtableClient();

const PROGRAMS_TABLE = "Programs";
const OFFERINGS_TABLE = "Program Offerings";
const PATHS_TABLE = "Learning Paths";
const PRODUCTS_TABLE = "Marketplace Products";

function html(response, status, payload) {
  response.writeHead(status, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  response.end(payload);
}

function redirect(response, location) {
  response.writeHead(302, { location });
  response.end();
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return new URLSearchParams(Buffer.concat(chunks).toString("utf8"));
}

async function getAiSoftwareArchitectPath() {
  const paths = await airtable.listAll(PATHS_TABLE, {
    filterByFormula: `{Path Name} = "AI Software Architect"`,
  });
  return paths[0];
}

async function loadDashboardData() {
  const pathRecord = await getAiSoftwareArchitectPath();
  const programIds = new Set(pathRecord.fields["Programs"] || []);
  const [allPrograms, allOfferings] = await Promise.all([
    airtable.listAll(PROGRAMS_TABLE),
    airtable.listAll(OFFERINGS_TABLE),
  ]);
  const programs = allPrograms
    .filter((p) => programIds.has(p.id))
    .map((p) => ({
      ...p,
      fields: {
        ...p.fields,
        "Program Offerings__resolved": allOfferings.filter((o) =>
          (o.fields["Program"] || []).includes(p.id),
        ),
      },
    }))
    .sort((a, b) => (a.fields["Sequence Order"] || 0) - (b.fields["Sequence Order"] || 0));

  const productIds = new Set(pathRecord.fields["Marketplace Products"] || []);
  const allProducts = await airtable.listAll(PRODUCTS_TABLE);
  const leagueProduct = allProducts.find(
    (p) => productIds.has(p.id) && p.fields["Type"] === "League / Tournament Event",
  );

  return { pathRecord, programs, league: { product: leagueProduct } };
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  try {
    if (request.method === "GET" && (await tryServeStatic(url.pathname, response))) {
      return;
    }

    if (url.pathname === "/admin" && request.method === "GET") {
      const data = await loadDashboardData();
      html(response, 200, renderAdminDashboard(data));
      return;
    }

    if (url.pathname === "/admin/programs/new" && request.method === "GET") {
      const pathRecord = await getAiSoftwareArchitectPath();
      html(response, 200, renderProgramForm({ program: null, pathId: pathRecord.id }));
      return;
    }

    if (url.pathname === "/admin/programs/new" && request.method === "POST") {
      const body = await readBody(request);
      const pathId = body.get("pathId");
      const created = await airtable.createRecords(PROGRAMS_TABLE, [
        {
          fields: {
            "Program Name": body.get("name"),
            Description: body.get("description"),
            "Duration (Weeks)": Number(body.get("durationWeeks")) || null,
            "Sequence Order": Number(body.get("sequenceOrder")) || null,
            "Badge / Certificate": body.get("badge"),
            Status: body.get("status"),
            "Learning Outcomes": body.get("learningOutcomes"),
            "Project Summary": body.get("projectSummary"),
            "Portfolio Artifact": body.get("portfolioArtifact"),
            "Learning Path": [pathId],
          },
        },
      ]);
      const newProgramId = created.records[0].id;
      const pathRecord = await getAiSoftwareArchitectPath();
      await airtable.updateRecords(PATHS_TABLE, [
        {
          id: pathRecord.id,
          fields: { Programs: [...(pathRecord.fields["Programs"] || []), newProgramId] },
        },
      ]);
      redirect(response, "/admin");
      return;
    }

    const editMatch = url.pathname.match(/^\/admin\/programs\/([^/]+)\/edit$/);
    if (editMatch && request.method === "GET") {
      const program = await airtable.getRecord(PROGRAMS_TABLE, editMatch[1]);
      const pathRecord = await getAiSoftwareArchitectPath();
      html(response, 200, renderProgramForm({ program, pathId: pathRecord.id }));
      return;
    }

    if (editMatch && request.method === "POST") {
      const body = await readBody(request);
      await airtable.updateRecords(PROGRAMS_TABLE, [
        {
          id: editMatch[1],
          fields: {
            "Program Name": body.get("name"),
            Description: body.get("description"),
            "Duration (Weeks)": Number(body.get("durationWeeks")) || null,
            "Sequence Order": Number(body.get("sequenceOrder")) || null,
            "Badge / Certificate": body.get("badge"),
            Status: body.get("status"),
            "Learning Outcomes": body.get("learningOutcomes"),
            "Project Summary": body.get("projectSummary"),
            "Portfolio Artifact": body.get("portfolioArtifact"),
          },
        },
      ]);
      redirect(response, "/admin");
      return;
    }

    const offeringsMatch = url.pathname.match(/^\/admin\/programs\/([^/]+)\/offerings$/);
    if (offeringsMatch && request.method === "GET") {
      const program = await airtable.getRecord(PROGRAMS_TABLE, offeringsMatch[1]);
      const allOfferings = await airtable.listAll(OFFERINGS_TABLE);
      const offerings = allOfferings.filter((o) => (o.fields["Program"] || []).includes(program.id));
      html(response, 200, renderOfferingsPage({ program, offerings }));
      return;
    }

    const newOfferingMatch = url.pathname.match(/^\/admin\/programs\/([^/]+)\/offerings\/new$/);
    if (newOfferingMatch && request.method === "POST") {
      const body = await readBody(request);
      await airtable.createRecords(OFFERINGS_TABLE, [
        {
          fields: {
            "Offering Name": body.get("name"),
            "Delivery Type": body.get("deliveryType"),
            Price: Number(body.get("price")) || null,
            "Price Unit": body.get("priceUnit"),
            Capacity: Number(body.get("capacity")) || null,
            Status: body.get("status"),
            Program: [newOfferingMatch[1]],
          },
        },
      ]);
      redirect(response, `/admin/programs/${newOfferingMatch[1]}/offerings`);
      return;
    }

    const editOfferingMatch = url.pathname.match(/^\/admin\/offerings\/([^/]+)\/edit$/);
    if (editOfferingMatch && request.method === "POST") {
      const body = await readBody(request);
      await airtable.updateRecords(OFFERINGS_TABLE, [
        {
          id: editOfferingMatch[1],
          fields: {
            "Offering Name": body.get("name"),
            "Delivery Type": body.get("deliveryType"),
            Price: Number(body.get("price")) || null,
            "Price Unit": body.get("priceUnit"),
            Capacity: Number(body.get("capacity")) || null,
            Status: body.get("status"),
          },
        },
      ]);
      redirect(response, `/admin/programs/${body.get("programId")}/offerings`);
      return;
    }

    if (url.pathname === "/admin/sync-and-rebuild" && request.method === "POST") {
      let syncMessage;
      try {
        const sync = await execFileAsync("npm", ["run", "marketplace:sync"], { cwd: rootDir });
        const og = await execFileAsync("npm", ["run", "marketplace:og"], { cwd: rootDir });
        const build = await execFileAsync("npm", ["run", "marketplace:build"], { cwd: rootDir });
        syncMessage = [sync.stdout, og.stdout, build.stdout].join("\n");
      } catch (error) {
        syncMessage = `Sync/build failed:\n${error.stdout || ""}\n${error.stderr || error.message}`;
      }
      const data = await loadDashboardData();
      html(response, 200, renderAdminDashboard({ ...data, syncMessage }));
      return;
    }

    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(`Admin error: ${error.message}`);
  }
});

server.listen(port, host, () => {
  console.log(`AutoNateAI admin (local only) running at http://${host}:${port}/admin`);
});
