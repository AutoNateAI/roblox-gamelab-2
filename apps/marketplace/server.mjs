import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderArticleDetail,
  renderArticles,
  renderCheckout,
  renderHome,
  renderLeague,
  renderProgramDetail,
  renderPrograms,
  renderSuccess,
} from "./src/pages.mjs";
import { articles } from "./src/data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const publicDir = path.join(__dirname, "public");
const port = Number(process.env.PORT || 4173);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

async function readJson(relativePath) {
  const file = await readFile(path.join(rootDir, relativePath), "utf8");
  return JSON.parse(file);
}

async function readRequestJson(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function squareSettings() {
  const environment = process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox";
  const prefix = environment === "production" ? "SQUARE_PRODUCTION" : "SQUARE_SANDBOX";
  return {
    environment,
    applicationId: process.env[`${prefix}_APPLICATION_ID`] || process.env.SQUARE_APPLICATION_ID || "",
    locationId: process.env[`${prefix}_LOCATION_ID`] || process.env.SQUARE_LOCATION_ID || "",
    accessToken: process.env[`${prefix}_ACCESS_TOKEN`] || process.env.SQUARE_ACCESS_TOKEN || "",
    apiVersion: process.env.SQUARE_VERSION || "2026-06-18",
    paymentsUrl:
      environment === "production"
        ? "https://connect.squareup.com/v2/payments"
        : "https://connect.squareupsandbox.com/v2/payments",
    locationsUrl:
      environment === "production"
        ? "https://connect.squareup.com/v2/locations"
        : "https://connect.squareupsandbox.com/v2/locations",
  };
}

function squareIsReady(settings = squareSettings()) {
  return Boolean(settings.applicationId && settings.locationId && settings.accessToken);
}

function squareCanListLocations(settings = squareSettings()) {
  return Boolean(settings.accessToken);
}

function json(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(payload, null, 2));
}

function html(response, status, payload) {
  response.writeHead(status, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(payload);
}

async function staticFile(response, pathname) {
  const cleanPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.join(publicDir, cleanPath);
  if (!filePath.startsWith(publicDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      "content-type": contentTypes[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(file);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  try {
    const pageRoutes = new Set(["/", "/programs", "/articles", "/league", "/checkout", "/success"]);
    if (pageRoutes.has(url.pathname)) {
      const programsData = await readJson("data/marketplace/programs.json");
      const renderers = {
        "/": renderHome,
        "/programs": renderPrograms,
        "/articles": renderArticles,
        "/league": renderLeague,
        "/checkout": renderCheckout,
        "/success": renderSuccess,
      };
      html(response, 200, renderers[url.pathname](programsData));
      return;
    }

    if (url.pathname.startsWith("/articles/")) {
      const handle = url.pathname.split("/").filter(Boolean).at(-1);
      const article = articles.find((item) => item.handle === handle);
      if (!article) {
        json(response, 404, { error: "Article not found" });
        return;
      }
      html(response, 200, renderArticleDetail(article));
      return;
    }

    if (url.pathname.startsWith("/programs/")) {
      const handle = url.pathname.split("/").filter(Boolean).at(-1);
      const programsData = await readJson("data/marketplace/programs.json");
      const program = programsData.programs.find((item) => item.handle === handle);
      if (!program) {
        json(response, 404, { error: "Program not found" });
        return;
      }
      html(response, 200, renderProgramDetail(programsData, program));
      return;
    }

    if (url.pathname === "/api/gamelab/health") {
      json(response, 200, {
        ok: true,
        service: "autonateai-gamelab-marketplace",
        namespace: "/api/gamelab",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (url.pathname === "/api/square/config") {
      const settings = squareSettings();
      json(response, 200, {
        enabled: squareIsReady(settings),
        canListLocations: squareCanListLocations(settings),
        environment: settings.environment,
        applicationId: settings.applicationId || null,
        locationId: settings.locationId || null,
      });
      return;
    }

    if (url.pathname === "/api/square/locations") {
      const settings = squareSettings();
      if (!squareCanListLocations(settings)) {
        json(response, 503, { error: "Square access token is not configured." });
        return;
      }

      const squareResponse = await fetch(settings.locationsUrl, {
        headers: {
          "authorization": `Bearer ${settings.accessToken}`,
          "Square-Version": settings.apiVersion,
        },
      });
      const payload = await squareResponse.json();
      json(response, squareResponse.ok ? 200 : squareResponse.status, payload);
      return;
    }

    if (url.pathname === "/api/square/payments" && request.method === "POST") {
      const settings = squareSettings();
      if (!squareIsReady(settings)) {
        json(response, 503, { error: "Square is not configured." });
        return;
      }

      const body = await readRequestJson(request);
      const programsData = await readJson("data/marketplace/programs.json");
      const program = programsData.programs.find((item) => item.handle === body.programHandle);
      const offering = program?.offerings?.find((item) => item.id === body.offeringId) || program?.offerings?.[0];
      if (!program || !offering || !body.sourceId) {
        json(response, 400, { error: "Missing program, offering, or Square source token." });
        return;
      }

      const squareResponse = await fetch(settings.paymentsUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${settings.accessToken}`,
          "Square-Version": settings.apiVersion,
        },
        body: JSON.stringify({
          idempotency_key: randomUUID(),
          source_id: body.sourceId,
          location_id: settings.locationId,
          amount_money: {
            amount: Math.round(Number(offering.price) * 100),
            currency: "USD",
          },
          note: `${program.name} - ${offering.name}`,
          reference_id: `${program.handle}:${offering.id}`,
        }),
      });

      const payload = await squareResponse.json();
      json(response, squareResponse.ok ? 200 : squareResponse.status, payload);
      return;
    }

    if (url.pathname === "/programs.json") {
      json(response, 200, await readJson("data/marketplace/programs.json"));
      return;
    }

    await staticFile(response, url.pathname);
  } catch (error) {
    json(response, 500, { error: error.message });
  }
});

server.listen(port, () => {
  console.log(`AutoNateAI marketplace running at http://localhost:${port}`);
});
