import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");
const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));

for (const file of ["index.html", "404.html", ".nojekyll", "motto-reference.jpg"]) {
  await access(join(out, file));
}

const motto = await stat(join(out, "motto-reference.jpg"));
if (motto.size < 5_000) throw new Error("Exported motto image is unexpectedly small");

const html = await readFile(join(out, "index.html"), "utf8");
for (const value of ["Bitachon For Real", `Version ${packageJson.version}`]) {
  if (!html.includes(value)) throw new Error(`Exported homepage is missing: ${value}`);
}
if (!html.includes("https://dmo18.github.io/bforreal/")) {
  throw new Error("Canonical GitHub Pages URL is missing from the export");
}

console.log(`Validated static export for version ${packageJson.version}.`);
