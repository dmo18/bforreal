import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");

for (const file of [
  "index.html",
  "404.html",
  ".nojekyll",
  "motto-reference.jpg",
  "motto-reference.webp",
  "living-yosh.webp",
]) {
  await access(join(out, file));
}

const motto = await stat(join(out, "motto-reference.jpg"));
if (motto.size < 5_000)
  throw new Error("Exported motto image is unexpectedly small");

const webp = await stat(join(out, "motto-reference.webp"));
if (webp.size < 5_000)
  throw new Error("Exported WebP motto image is unexpectedly small");

const livingYosh = await stat(join(out, "living-yosh.webp"));
if (livingYosh.size < 5_000)
  throw new Error("Exported LivingYosh image is unexpectedly small");

const html = await readFile(join(out, "index.html"), "utf8");
if (!html.includes("Bitachon For Real")) {
  throw new Error("Exported homepage is missing the site title");
}
if (!html.includes("https://dmo18.github.io/bforreal/")) {
  throw new Error("Canonical GitHub Pages URL is missing from the export");
}

console.log("Validated required static export files and canonical URL.");
