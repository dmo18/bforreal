import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const versionSource = await readFile(new URL("../app/version-sync.tsx", import.meta.url), "utf8");
const expected = packageJson.version;
const match = versionSource.match(/const BUILD_VERSION = "([^"]+)";/);

if (!match) {
  throw new Error("app/version-sync.tsx does not declare BUILD_VERSION");
}

if (match[1] !== expected) {
  throw new Error(`Version mismatch: package.json is ${expected}, app/version-sync.tsx is ${match[1]}`);
}

console.log(`Version references are synchronized at ${expected}.`);
