import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const scanRoots = ["app", "components", "data", "lib"];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"]);
const prohibited = [
  ["MutationObserver", /\bMutationObserver\b/],
  ["portal insertion", /\bcreatePortal\b/],
  ["HTML injection", /\binnerHTML\b|dangerouslySetInnerHTML/],
  ["legacy LivingYosh image", /living-yosh\.jpg/],
  ["legacy Michael Safdie image", /michael-safdie\.svg/],
  ["Squarespace visual hotlink", /images\.squarespace-cdn\.com/],
  ["Google favicon service", /google\.com\/s2\/favicons/],
  ["Gate of Trust favicon hotlink", /gateoftrust\.org\/favicon/],
  ["runtime style injection", /document\.createElement\(["']style["']\)/],
  ["body-wide observation", /observe\(document\.body/],
];
const visualHotlinks = [
  /(?:src|poster)\s*=\s*["']https?:\/\//i,
  /url\(\s*["']?https?:\/\//i,
  /<image[^>]+href\s*=\s*["']https?:\/\//i,
  /<script[^>]+src\s*=\s*["']https?:\/\//i,
  /<link[^>]+href\s*=\s*["']https?:\/\//i,
];
const violations = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    if (!extensions.has(extname(path))) continue;
    const content = await readFile(path, "utf8");
    for (const [label, pattern] of prohibited) {
      if (pattern.test(content))
        violations.push(`${relative(root, path)}: ${label}`);
    }
    for (const pattern of visualHotlinks) {
      if (pattern.test(content)) {
        violations.push(
          `${relative(root, path)}: external visual asset reference`,
        );
      }
    }
  }
}

for (const directory of scanRoots) await walk(join(root, directory));

if (violations.length > 0) {
  throw new Error(
    `Source validation failed:\n${[...new Set(violations)].join("\n")}`,
  );
}

console.log(
  "Validated declarative source architecture and local visual assets.",
);
