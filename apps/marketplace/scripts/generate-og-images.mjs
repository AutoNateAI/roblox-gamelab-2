import { readFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { tutorials } from "../src/data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../..");
const publicDir = path.join(rootDir, "apps/marketplace/public");
const screepsDir = path.join(publicDir, "assets/screeps");
const outDir = path.join(publicDir, "assets/og");

const WIDTH = 1200;
const HEIGHT = 630;

function escapeXml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

async function buildSvg({ screenshotFile, eyebrow, title, footer }) {
  const imageBuffer = await readFile(screenshotFile);
  const dataUri = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
  const titleLines = wrapText(title, 26);
  const titleTspans = titleLines
    .map((line, i) => `<tspan x="72" dy="${i === 0 ? 0 : 62}">${escapeXml(line)}</tspan>`)
    .join("");

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="frame"><rect width="${WIDTH}" height="${HEIGHT}" /></clipPath>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#060a12" stop-opacity="0.25" />
          <stop offset="50%" stop-color="#060a12" stop-opacity="0.82" />
          <stop offset="100%" stop-color="#060a12" stop-opacity="0.97" />
        </linearGradient>
      </defs>
      <g clip-path="url(#frame)">
        <image href="${dataUri}" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMidYMid slice" />
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fade)" />
      </g>
      <rect x="0" y="0" width="${WIDTH}" height="8" fill="#f2b134" />
      <text x="72" y="${HEIGHT - 210}" font-family="Menlo, Consolas, monospace" font-size="24" font-weight="700" letter-spacing="3" fill="#f2b134">${escapeXml(eyebrow.toUpperCase())}</text>
      <text x="72" y="${HEIGHT - 150}" font-family="Helvetica, Arial, sans-serif" font-size="54" font-weight="800" fill="#f5f7f2">${titleTspans}</text>
      <text x="72" y="${HEIGHT - 48}" font-family="Menlo, Consolas, monospace" font-size="22" font-weight="600" fill="#9fb3a6">${escapeXml(footer)}</text>
    </svg>
  `;
}

async function composite({ screenshotFile, eyebrow, title, footer, outFile }) {
  const svg = await buildSvg({ screenshotFile, eyebrow, title, footer });
  const resvg = new Resvg(svg, {
    font: { loadSystemFonts: true },
    fitTo: { mode: "width", value: WIDTH },
  });
  const png = resvg.render().asPng();
  await sharp(png).jpeg({ quality: 88 }).toFile(outFile);
  console.log(`  -> ${path.relative(rootDir, outFile)}`);
}

const screenshots = (await readdir(screepsDir)).filter((f) => f.endsWith(".jpg")).sort();
if (!screenshots.length) {
  throw new Error(`No Screeps screenshots found in ${screepsDir}`);
}

function screenshotFor(index) {
  return path.join(screepsDir, screenshots[index % screenshots.length]);
}

await mkdir(outDir, { recursive: true });

const programsData = JSON.parse(
  await readFile(path.join(rootDir, "data/marketplace/programs.json"), "utf8"),
);

console.log(`Generating OG images from ${screenshots.length} source screenshots...`);

let index = 0;
for (const program of programsData.programs) {
  await composite({
    screenshotFile: screenshotFor(index++),
    eyebrow: "JavaScript + Codex + CTF",
    title: "Build the Colony. Prove the System.",
    footer: `AutoNateAI · ${program.durationWeeks || 4}-Week Systems Cohort`,
    outFile: path.join(outDir, `${program.handle}.jpg`),
  });
}

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "Workforce Systems Lab",
  title: "No Worksheets. Colonies That Fight Back.",
  footer: "AutoNateAI · JavaScript, Codex, Git, CTF",
  outFile: path.join(outDir, "programs.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "Tournament Week",
  title: "Your Code Has to Hold the Flag.",
  footer: "AutoNateAI · Screeps Capture the Flag",
  outFile: path.join(outDir, "league.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "AutoNateAI",
  title: "Code the Colony. Train the Architect.",
  footer: "JavaScript · Codex · Screeps CTF",
  outFile: path.join(outDir, "default.jpg"),
});

for (const tutorial of tutorials) {
  await composite({
    screenshotFile: screenshotFor(index++),
    eyebrow: `Tutorial ${tutorial.episode} · ${tutorial.track}`,
    title: tutorial.title,
    footer: "AutoNateAI · Free Screeps Player Guide",
    outFile: path.join(outDir, `tutorial-${tutorial.handle}.jpg`),
  });
}

console.log(`Done. ${programsData.programs.length + tutorials.length + 3} OG images written to ${path.relative(rootDir, outDir)}`);
