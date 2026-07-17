import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(
  await readFile(join(root, "package.json"), "utf8"),
);
const version = packageJson.version;

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(
    `package.json contains an invalid semantic version: ${version}`,
  );
}

const output = `// Generated from package.json by scripts/sync-version.mjs. Do not edit manually.\nexport const APP_VERSION = "${version}" as const;\n`;
await writeFile(join(root, "data", "version.ts"), output);
console.log(`Synchronized application version ${version}.`);
