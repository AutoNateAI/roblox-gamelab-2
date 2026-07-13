import { createServer } from "node:http";
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
