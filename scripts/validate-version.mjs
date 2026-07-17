import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const versionSource = await readFile(
  new URL("../app/version-sync.tsx", import.meta.url),
  "utf8",
);

const expected = packageJson.version;
const matches = [...versionSource.matchAll(/\b(?:BUILD_VERSION|Version)\b[^\n]*?["'`](\d+\.\d+\.\d+)["'`]/g)].map(
  (match) => match[1],
);

if (matches.length === 0) {
  throw new Error("app/version-sync.tsx does not declare a semantic version");
}

for (const version of matches) {
  if (version !== expected) {
    throw new Error(
      `Version mismatch: package.json is ${expected}, app/version-sync.tsx contains ${version}`,
    );
  }
}

console.log(`Version references are synchronized at ${expected}.`);
