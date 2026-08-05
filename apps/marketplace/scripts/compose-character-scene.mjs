import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

// Composites the Nate & Kai character rig renders (flat-vector illustration,
// transparent PNG — see /Users/autonate/code/2-character-video-engine) onto a
// brand-matched dark/amber background built as SVG, the same technique
// generate-og-images.mjs already uses (raster embedded in SVG, rendered with
// Resvg). Deliberately does NOT composite the characters onto a photo-real
// gpt-image-2 background — flat-vector art over a photo reads as a bad
// clip-art paste. A clean gradient card reads as intentional brand art.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const outDir = path.join(publicDir, "assets/landing");

const WIDTH = 1536;
const HEIGHT = 1024;

async function trimmedPngDataUri(file) {
  const buffer = await sharp(file).trim().png().toBuffer();
  const meta = await sharp(buffer).metadata();
  return { dataUri: `data:image/png;base64,${buffer.toString("base64")}`, width: meta.width, height: meta.height };
}

async function buildScene({ file, targetHeight, gap, glowCx }) {
  const kai = await trimmedPngDataUri(path.join(publicDir, "assets/characters/kai/pose-standing.png"));
  const nate = await trimmedPngDataUri(path.join(publicDir, "assets/characters/nate/pose-standing.png"));

  const kaiScale = targetHeight / kai.height;
  const nateScale = targetHeight / nate.height;
  const kaiW = kai.width * kaiScale;
  const nateW = nate.width * nateScale;

  const floorY = HEIGHT - 70;
  const totalW = kaiW + gap + nateW;
  const startX = (WIDTH - totalW) / 2;
  const kaiX = startX;
  const nateX = startX + kaiW + gap;
  const kaiY = floorY - targetHeight;
  const nateY = floorY - targetHeight;

  const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0b1018" />
          <stop offset="100%" stop-color="#020407" />
        </linearGradient>
        <radialGradient id="glow" cx="${glowCx}" cy="0.38" r="0.65">
          <stop offset="0%" stop-color="#f2b134" stop-opacity="0.22" />
          <stop offset="55%" stop-color="#f2b134" stop-opacity="0.06" />
          <stop offset="100%" stop-color="#f2b134" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f2b134" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#f2b134" stop-opacity="0" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
          <feOffset dx="0" dy="18" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />
      <ellipse cx="${kaiX + kaiW / 2}" cy="${floorY + 6}" rx="${kaiW * 0.42}" ry="14" fill="#f2b134" opacity="0.16" />
      <ellipse cx="${nateX + nateW / 2}" cy="${floorY + 6}" rx="${nateW * 0.42}" ry="14" fill="#f2b134" opacity="0.16" />
      <rect x="0" y="${floorY + 8}" width="${WIDTH}" height="2" fill="url(#floor)" />
      <g filter="url(#shadow)">
        <image href="${kai.dataUri}" x="${kaiX}" y="${kaiY}" width="${kaiW}" height="${targetHeight}" />
        <image href="${nate.dataUri}" x="${nateX}" y="${nateY}" width="${nateW}" height="${targetHeight}" />
      </g>
      <rect x="0" y="0" width="${WIDTH}" height="6" fill="#f2b134" opacity="0.85" />
    </svg>
  `;

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } });
  const png = resvg.render().asPng();
  const outFile = path.join(outDir, file);
  await sharp(png).jpeg({ quality: 92 }).toFile(outFile);
  console.log(`  -> ${path.relative(rootDir, outFile)}`);
}

await mkdir(outDir, { recursive: true });
await buildScene({ file: "nate-and-kai.jpg", targetHeight: 860, gap: 70, glowCx: 0.5 });
console.log("Done.");
