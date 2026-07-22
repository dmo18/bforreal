import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const expected = packageJson.version;

const activeVersionFiles = [
  ["data/site.ts", /version:\s*["'`](\d+\.\d+\.\d+)["'`]/g],
  ["app/version-sync.tsx", /BUILD_VERSION\s*=\s*["'`](\d+\.\d+\.\d+)["'`]/g],
  ["app/podcast-feature.tsx", /BUILD_VERSION\s*=\s*["'`](\d+\.\d+\.\d+)["'`]/g],
  [
    "app/daily-bitachon-feature.tsx",
    /BUILD_VERSION\s*=\s*["'`](\d+\.\d+\.\d+)["'`]/g,
  ],
  [
    "app/daily-bitachon-polish.tsx",
    /BUILD_VERSION\s*=\s*["'`](\d+\.\d+\.\d+)["'`]/g,
  ],
  [
    "app/gallery-enhancements.tsx",
    /BUILD_VERSION\s*=\s*["'`](\d+\.\d+\.\d+)["'`]/g,
  ],
  [
    "app/living-yosh-feature.tsx",
    /BUILD_VERSION\s*=\s*["'`](\d+\.\d+\.\d+)["'`]/g,
  ],
  [
    "app/living-yosh-image-source.tsx",
    /BUILD_VERSION\s*=\s*["'`](\d+\.\d+\.\d+)["'`]/g,
  ],
];

const mismatches = [];

for (const [path, pattern] of activeVersionFiles) {
  const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
  const matches = [...source.matchAll(pattern)].map((match) => match[1]);

  if (matches.length === 0) {
    mismatches.push(`${path}: no active semantic version found`);
    continue;
  }

  for (const version of matches) {
    if (version !== expected) {
      mismatches.push(`${path}: expected ${expected}, found ${version}`);
    }
  }
}

if (mismatches.length > 0) {
  throw new Error(`Version mismatch:\n${mismatches.join("\n")}`);
}

console.log(`Version references are synchronized at ${expected}.`);
