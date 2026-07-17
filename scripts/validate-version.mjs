import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(
  await readFile(join(root, "package.json"), "utf8"),
);
const expected = packageJson.version;
const generated = await readFile(join(root, "data", "version.ts"), "utf8");
const expectedLine = `export const APP_VERSION = "${expected}" as const;`;

if (!generated.includes(expectedLine)) {
  throw new Error("data/version.ts is not synchronized with package.json");
}

const allowedExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);
const scanRoots = ["app", "components", "data", "lib"];
const versionPattern = /["'`]\d+\.\d+\.\d+["'`]/g;
const violations = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    if (!allowedExtensions.has(extname(path))) continue;
    if (path === join(root, "data", "version.ts")) continue;
    const content = await readFile(path, "utf8");
    for (const match of content.matchAll(versionPattern)) {
      violations.push(
        `${relative(root, path)}:${match.index ?? 0} contains ${match[0]}`,
      );
    }
  }
}

for (const directory of scanRoots) await walk(join(root, directory));

if (violations.length > 0) {
  throw new Error(
    `Hardcoded application versions remain:\n${violations.join("\n")}`,
  );
}

console.log(`Validated authoritative application version ${expected}.`);
