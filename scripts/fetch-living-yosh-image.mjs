import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const sourceUrl =
  "https://aish.com/wp-content/uploads/2026/04/Falsely-Accused_htm_e907ca88.webp";
const outputPath = resolve(process.cwd(), "public/living-yosh.webp");

const response = await fetch(sourceUrl, {
  headers: { "user-agent": "Mozilla/5.0" },
});

if (!response.ok) {
  throw new Error(`Failed to fetch LivingYosh image: ${response.status}`);
}

const bytes = Buffer.from(await response.arrayBuffer());
const isWebp =
  bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
  bytes.subarray(8, 12).toString("ascii") === "WEBP";
const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8;

if (!isWebp && !isJpeg) {
  throw new Error("LivingYosh image response was not a valid WebP or JPEG file");
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, bytes);
console.log(`Saved local LivingYosh image to ${outputPath}`);
