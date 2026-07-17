import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");
const packageJson = JSON.parse(
  await readFile(join(root, "package.json"), "utf8"),
);
const required = ["index.html", "404.html", ".nojekyll", "motto-reference.jpg"];

for (const file of required) await access(join(out, file));

const motto = await stat(join(out, "motto-reference.jpg"));
if (motto.size < 5_000)
  throw new Error("Exported motto image is unexpectedly small");

const html = await readFile(join(out, "index.html"), "utf8");
const normalizedHtml = html.replace(/<!--.*?-->/gs, "");
const requiredText = [
  "Bitachon For Real",
  "Daily Bitachon",
  "LivingYosh",
  "Seven Levels of Bitachon",
  "Graphics worth sending onward.",
  `Version ${packageJson.version}`,
];

for (const text of requiredText) {
  if (!normalizedHtml.includes(text)) {
    throw new Error(`Exported homepage is missing: ${text}`);
  }
}

const prohibited = [
  "/living-yosh.jpg",
  "/michael-safdie.svg",
  "images.squarespace-cdn.com",
  "google.com/s2/favicons",
  "gateoftrust.org/favicon",
  "MutationObserver",
  "createPortal",
];

for (const value of prohibited) {
  if (html.includes(value))
    throw new Error(`Exported homepage contains prohibited value: ${value}`);
}

const expectedCanonical = "https://dmo18.github.io/bforreal/";
if (!html.includes(expectedCanonical))
  throw new Error("Canonical GitHub Pages URL is missing");

const references = new Set();
for (const match of html.matchAll(
  /(?:src|href)=["'](\/bforreal\/[^"'#?]+)["']/g,
)) {
  references.add(match[1]);
}

for (const reference of references) {
  const relativePath = reference.replace(/^\/bforreal\//, "");
  if (!relativePath || relativePath.endsWith("/")) continue;
  await access(join(out, relativePath));
}

console.log(
  `Validated static export with ${references.size} local references.`,
);
