import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { tutorialPacks, tutorials } from "../src/data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../..");
const publicDir = path.join(rootDir, "apps/marketplace/public");
const outDir = path.join(publicDir, "assets/og");

const WIDTH = 1200;
const HEIGHT = 630;

// Real Sikeston photography + the gpt-image-2 Sikeston composites (see
// scripts/generate-sikeston-marketing-images.mjs), cycled as OG card
// backgrounds — replaces the old dark amber scene-*.jpg abstract art now
// that the site brand is light-mode-default, red/black/white.
const BACKGROUND_POOL = [
  "assets/sikeston/classroom-cohort.jpg",
  "assets/landing/sikeston-hero-teaching.jpg",
  "assets/sikeston/downtown-street.jpg",
  "assets/landing/sikeston-mentoring.jpg",
  "assets/landing/sikeston-group-collaboration.jpg",
  "assets/sikeston/historic-downtown.jpg",
  "assets/landing/sikeston-internal-tool-laptop.jpg",
  "assets/landing/sikeston-organizations-handshake.jpg",
].map((rel) => path.join(publicDir, rel));

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

async function buildSvg({ screenshotFile, eyebrow, title, footer }) {
  const imageBuffer = await readFile(screenshotFile);
  const dataUri = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
  const titleLines = wrapText(title, 26);
  const titleTspans = titleLines
    .map((line, i) => `<tspan x="72" dy="${i === 0 ? 0 : 62}">${escapeXml(line)}</tspan>`)
    .join("");
  const titleBlockHeight = 150 + (titleLines.length - 1) * 62;

  // Light/white card matching the site's default light theme: photo up top,
  // fading to a solid off-white panel that carries the red-accented text.
  return `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="frame"><rect width="${WIDTH}" height="${HEIGHT}" /></clipPath>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fafaf8" stop-opacity="0.08" />
          <stop offset="38%" stop-color="#fafaf8" stop-opacity="0.55" />
          <stop offset="60%" stop-color="#fafaf8" stop-opacity="0.94" />
          <stop offset="100%" stop-color="#fafaf8" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#fafaf8" />
      <g clip-path="url(#frame)">
        <image href="${dataUri}" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMidYMid slice" />
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fade)" />
      </g>
      <rect x="0" y="0" width="${WIDTH}" height="8" fill="#c8102e" />
      <text x="72" y="${HEIGHT - titleBlockHeight - 60}" font-family="Menlo, Consolas, monospace" font-size="24" font-weight="700" letter-spacing="3" fill="#af0e28">${escapeXml(eyebrow.toUpperCase())}</text>
      <text x="72" y="${HEIGHT - titleBlockHeight}" font-family="Helvetica, Arial, sans-serif" font-size="54" font-weight="800" fill="#17130f">${titleTspans}</text>
      <text x="72" y="${HEIGHT - 48}" font-family="Menlo, Consolas, monospace" font-size="22" font-weight="600" fill="#5c554c">${escapeXml(footer)}</text>
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

await mkdir(outDir, { recursive: true });

const programsData = JSON.parse(
  await readFile(path.join(rootDir, "data/marketplace/programs.json"), "utf8"),
);

console.log(`Generating OG images from ${BACKGROUND_POOL.length} Sikeston source photos...`);

let index = 0;

for (const program of programsData.programs) {
  await composite({
    screenshotFile: screenshotFor(index++),
    eyebrow: "Custom Business Training · Sikeston, MO",
    title: "Custom AI & Development Training for Your Team",
    footer: "AutoNateAI · Requested Team Training · Southeast Missouri",
    outFile: path.join(outDir, `${program.handle}.jpg`),
  });
}

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "AI Consulting & Development · Southeast Missouri",
  title: "Enterprise-Grade AI Systems, at Southeast Missouri Prices",
  footer: "AutoNateAI · AI, Coding & Technical Training in Sikeston, MO",
  outFile: path.join(outDir, "programs.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "Requested Team Training",
  title: "Custom AI & Development Training, Built Around Your Business",
  footer: "AutoNateAI · Southeast Missouri",
  outFile: path.join(outDir, "for-organizations.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "AI Consulting for Southeast Missouri Businesses",
  title: "We Build the Internal AI Tools Your Business Needs",
  footer: "AutoNateAI · Nine Regional Industries · Southeast Missouri",
  outFile: path.join(outDir, "consulting.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "Free Weekly Live Builds",
  title: "We Build a Real Internal Tool Live, Every Week",
  footer: "AutoNateAI Industry Build Labs · Southeast Missouri",
  outFile: path.join(outDir, "events.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "AI, Workforce & Systems",
  title: "AI, Workforce & Systems in Southeast Missouri",
  footer: "AutoNateAI · Research, Guides & Field Notes from Sikeston, MO",
  outFile: path.join(outDir, "articles.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "Free Course Library",
  title: "Sharpen Your Technical Skills. Free.",
  footer: "AutoNateAI · 4 Free Digital Courses · Sikeston, MO",
  outFile: path.join(outDir, "courses.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "AutoNateAI Community",
  title: "Free Courses & Discord Support",
  footer: "AutoNateAI Discord · Southeast Missouri",
  outFile: path.join(outDir, "community.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "About AutoNateAI",
  title: "AI Consulting & Development, Built Locally in Sikeston",
  footer: "AutoNateAI · Founder Nathan Baker · Southeast Missouri",
  outFile: path.join(outDir, "about.jpg"),
});

await composite({
  screenshotFile: screenshotFor(index++),
  eyebrow: "AI Consulting & Development · Southeast Missouri",
  title: "Enterprise-Grade AI Systems, at Southeast Missouri Prices",
  footer: "AutoNateAI · Sikeston, MO",
  outFile: path.join(outDir, "default.jpg"),
});

for (const tutorial of tutorials) {
  const pack = tutorialPacks.find((item) => item.handle === tutorial.pack);
  await composite({
    screenshotFile: screenshotFor(index++),
    eyebrow: `Free Course ${tutorial.episode} · ${tutorial.track}`,
    title: tutorial.title,
    footer: `AutoNateAI · ${pack?.title || "Free Digital Course"} · Sikeston, MO`,
    outFile: path.join(outDir, `tutorial-${tutorial.pack}-${tutorial.handle}.jpg`),
  });
}

for (const pack of tutorialPacks) {
  await composite({
    screenshotFile: screenshotFor(pack.heroShotIndex ?? index++),
    eyebrow: pack.tagline,
    title: pack.title,
    footer: "AutoNateAI · Free Digital Course · Sikeston, MO",
    outFile: path.join(outDir, `tutorial-pack-${pack.handle}.jpg`),
  });
}

console.log(`Done. ${programsData.programs.length + 8 + tutorials.length + tutorialPacks.length} OG images written to ${path.relative(rootDir, outDir)}`);
