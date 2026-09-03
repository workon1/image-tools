import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = join(import.meta.dirname, "..", "public");
const svg = readFileSync(join(root, "logo-horizontal.svg"));

async function exportLogo() {
  const png = await sharp(svg).png({ compressionLevel: 9 }).toBuffer();
  const outPath = join(root, "logo-horizontal.png");
  writeFileSync(outPath, png);
  console.log(`Wrote ${outPath} (${(png.length / 1024).toFixed(1)} KB)`);
}

exportLogo().catch((error) => {
  console.error(error);
  process.exit(1);
});
