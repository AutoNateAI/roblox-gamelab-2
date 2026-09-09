import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { sceneShots, tutorialPacks, tutorials } from "../src/data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../..");
const publicDir = path.join(rootDir, "apps/marketplace/public");
const outDir = path.join(publicDir, "assets/og");

const WIDTH = 1200;
const HEIGHT = 630;

// Navy/gold/white AutoNateAI Lab brand (see public/styles.css :root tokens).
// Backgrounds cycle through the existing dark cinematic scene-*.jpg art
// (already gold-accented, no people/text/logos, generated for exactly this
// use) — replaces the old Sikeston photo pool. Nathan's own photo is used
// directly (not cycled) for the homepage and About OG cards specifically,
// see NATHAN_PHOTO below.
const BACKGROUND_POOL = sceneShots.map((rel) => path.join(publicDir, rel.replace(/^\//, "")));
const NATHAN_PHOTO = path.join(publicDir, "assets/nathan-baker.jpeg");

function screenshotFor(index) {
  return BACKGROUND_POOL[index % BACKGROUND_POOL.length];
}

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

async function buildSvg({ screenshotFile, eyebrow, title, footer, focusTop = false }) {
  const imageBuffer = await readFile(screenshotFile);
  const dataUri = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
  const titleLines = wrapText(title, 26);
  const titleTspans = titleLines
    .map((line, i) => `<tspan x="72" dy="${i === 0 ? 0 : 62}">${escapeXml(line)}</tspan>`)
    .join("");
  const titleBlockHeight = 150 + (titleLines.length - 1) * 62;

  // Navy card matching the site's dark-lab identity: photo up top (or a
  // real portrait, focusTop keeps a face in frame), fading to a solid navy
  // panel carrying gold-accented text.
  return `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="frame"><rect width="${WIDTH}" height="${HEIGHT}" /></clipPath>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0e1a33" stop-opacity="0.05" />
          <stop offset="38%" stop-color="#0e1a33" stop-opacity="0.55" />
          <stop offset="60%" stop-color="#0e1a33" stop-opacity="0.94" />
          <stop offset="100%" stop-color="#0e1a33" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#0e1a33" />
      <g clip-path="url(#frame)">
        <image href="${dataUri}" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="${focusTop ? "xMidYMin" : "xMidYMid"} slice" />
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fade)" />
      </g>
      <rect x="0" y="0" width="${WIDTH}" height="8" fill="#c9a227" />
      <text x="72" y="${HEIGHT - titleBlockHeight - 60}" font-family="Menlo, Consolas, monospace" font-size="24" font-weight="700" letter-spacing="3" fill="#e0b93a">${escapeXml(eyebrow.toUpperCase())}</text>
      <text x="72" y="${HEIGHT - titleBlockHeight}" font-family="Helvetica, Arial, sans-serif" font-size="54" font-weight="800" fill="#f6f7fb">${titleTspans}</text>
      <text x="72" y="${HEIGHT - 48}" font-family="Menlo, Consolas, monospace" font-size="22" font-weight="600" fill="#c9d0e0">${escapeXml(footer)}</text>
    </svg>
  `;
}

async function composite({ screenshotFile, eyebrow, title, footer, outFile, focusTop = false }) {
  const svg = await buildSvg({ screenshotFile, eyebrow, title, footer, focusTop });
  const resvg = new Resvg(svg, {
    font: { loadSystemFonts: true },
    fitTo: { mode: "width", value: WIDTH },
  });
  const png = resvg.render().asPng();
  await sharp(png).jpeg({ quality: 88 }).toFile(outFile);
  console.log(`  -> ${path.relative(rootDir, outFile)}`);
}

await mkdir(outDir, { recursive: true });

const programsData = JSON.parse(
  await readFile(path.join(rootDir, "data/marketplace/programs.json"), "utf8"),
);

console.log(`Generating OG images from ${BACKGROUND_POOL.length} source photos (+ Nathan's real portrait for Home/About)...`);

let index = 0;

for (const program of programsData.programs) {
  await composite({
    screenshotFile: screenshotFor(index++),
    eyebrow: "Custom Business Training",
    title: "Custom AI & Development Training for Your Team",
    footer: "AutoNateAI · Requested Team Training",
    outFile: path.join(outDir, `${program.handle}.jpg`),
  });
}

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "AI & Coding Training",
  title: "Real Systems, Not Worksheets",
  footer: "AutoNateAI Lab · AI, Coding & Technical Training",
  outFile: path.join(outDir, "programs.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "Requested Team Training",
  title: "Custom AI & Development Training, Built Around Your Business",
  footer: "AutoNateAI Lab",
  outFile: path.join(outDir, "for-organizations.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "AI Consulting",
  title: "We Build the Internal AI Tools Your Business Needs",
  footer: "AutoNateAI Lab · Architecture, AI Engineering, Consulting",
  outFile: path.join(outDir, "consulting.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "Events",
  title: "Where AutoNateAI Shows Up",
  footer: "AutoNateAI Lab · Agent Systems & Human Systems Events",
  outFile: path.join(outDir, "events.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "Publications",
  title: "Research, Architecture, and Field Notes",
  footer: "AutoNateAI · Independent AI, Software & Human Systems Lab",
  outFile: path.join(outDir, "articles.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "Free Course Library",
  title: "Sharpen Your Technical Skills. Free.",
  footer: "AutoNateAI Lab · 4 Free Digital Courses",
  outFile: path.join(outDir, "courses.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "AutoNateAI Community",
  title: "Free Courses & Discord Support",
  footer: "AutoNateAI Discord",
  outFile: path.join(outDir, "community.jpg"),
});

// About and Home get Nathan's real photo, not the generic scene pool —
// these are the two pages most about him specifically.
await composite({
  screenshotFile: NATHAN_PHOTO,
  eyebrow: "About",
  title: "Nathan Baker — AutoNateAI Lab",
  footer: "AutoNateAI · Independent AI, Software & Human Systems Lab",
  outFile: path.join(outDir, "about.jpg"),
  focusTop: true,
});

await composite({
  screenshotFile: NATHAN_PHOTO,
  eyebrow: "Independent AI, Software & Human Systems Lab",
  title: "Welcome to My Lab",
  footer: "AutoNateAI · Nathan Baker",
  outFile: path.join(outDir, "default.jpg"),
  focusTop: true,
});

for (const tutorial of tutorials) {
  const pack = tutorialPacks.find((item) => item.handle === tutorial.pack);
  await composite({
    screenshotFile: screenshotFor(index++),
    eyebrow: `Free Course ${tutorial.episode} · ${tutorial.track}`,
    title: tutorial.title,
    footer: `AutoNateAI Lab · ${pack?.title || "Free Digital Course"}`,
    outFile: path.join(outDir, `tutorial-${tutorial.pack}-${tutorial.handle}.jpg`),
  });
}

for (const pack of tutorialPacks) {
  await composite({
    screenshotFile: screenshotFor(pack.heroShotIndex ?? index++),
    eyebrow: pack.tagline,
    title: pack.title,
    footer: "AutoNateAI Lab · Free Digital Course",
    outFile: path.join(outDir, `tutorial-pack-${pack.handle}.jpg`),
  });
}

console.log(`Done. ${programsData.programs.length + 9 + tutorials.length + tutorialPacks.length} OG images written to ${path.relative(rootDir, outDir)}`);
