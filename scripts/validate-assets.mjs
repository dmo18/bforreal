import { access, readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const publicRoot = join(root, "public");
const sourceRoots = ["app", "components", "data"];
const sourceExtensions = new Set([".ts", ".tsx", ".css"]);
const assetPattern =
  /["'(]((?:\/bforreal)?\/[A-Za-z0-9_./-]+\.(?:svg|png|jpe?g|webp|ico))(?:\?[^"')]+)?["')]/g;
const missing = [];

async function assertAsset(reference, source) {
  const normalized = reference.replace(/^\/bforreal\//, "/").replace(/^\//, "");
  try {
    await access(join(publicRoot, normalized));
  } catch {
    missing.push(`${source} references missing public/${normalized}`);
  }
}

async function scanSource(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await scanSource(path);
      continue;
    }
    if (!sourceExtensions.has(extname(path))) continue;
    const content = await readFile(path, "utf8");
    for (const match of content.matchAll(assetPattern)) {
      await assertAsset(match[1], relative(root, path));
    }
  }
}

for (const directory of sourceRoots) await scanSource(join(root, directory));

const siteData = await readFile(join(root, "data", "site.ts"), "utf8");
for (const match of siteData.matchAll(
  /file:\s*"([A-Za-z0-9_.-]+\.(?:svg|png|jpe?g|webp))"/g,
)) {
  await assertAsset(`/inspiration/${match[1]}`, "data/site.ts");
}

async function validateSvgDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await validateSvgDirectory(path);
      continue;
    }
    if (extname(path) !== ".svg") continue;
    const content = await readFile(path, "utf8");
    if (
      !content.trimStart().startsWith("<svg") ||
      !content.trimEnd().endsWith("</svg>")
    ) {
      missing.push(`${relative(root, path)} is not a complete SVG document`);
    }
    if (/<image[^>]+href=["']https?:\/\//i.test(content)) {
      missing.push(`${relative(root, path)} hotlinks an external image`);
    }
  }
}

await validateSvgDirectory(publicRoot);

if (missing.length > 0) {
  throw new Error(`Asset validation failed:\n${missing.join("\n")}`);
}

console.log("Validated locally referenced public assets and SVG documents.");
