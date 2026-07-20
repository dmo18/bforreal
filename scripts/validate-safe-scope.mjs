import { execFileSync } from "node:child_process";

const base = process.env.BASE_SHA;
const head = process.env.HEAD_SHA;
if (!base || !head) throw new Error("BASE_SHA and HEAD_SHA are required");

const allowed = [
  ".github/workflows/deploy-pages.yml",
  "package.json",
  "app/version-sync.tsx",
  "app/layout.tsx",
  "app/globals.css",
  "app/daily-bitachon-polish.tsx",
  "app/feature-button-polish.tsx",
  "app/footer-overrides.css",
  "app/gallery-enhancements.tsx",
  "components/landing-page.tsx",
  "app/icon.png",
  "app/apple-icon.png",
  "app/favicon.ico",
  "app/opening-density-polish.tsx",
  "app/opening-motto-reference.tsx",
  "app/living-yosh-feature.tsx",
  "app/living-yosh-image-source.tsx",
  "data/site.ts",
  "public/motto-reference.png",
  "public/motto-reference.webp",
  "public/living-yosh.webp",
  "scripts/validate-version.mjs",
  "scripts/validate-secrets.mjs",
  "scripts/validate-export.mjs",
  "scripts/validate-motto-asset.mjs",
  "scripts/validate-safe-scope.mjs",
];

const changed = execFileSync(
  "git",
  ["diff", "--name-only", `${base}...${head}`],
  {
    encoding: "utf8",
  },
)
  .trim()
  .split("\n")
  .filter(Boolean);
const prohibited = changed.filter((path) => !allowed.includes(path));

if (prohibited.length > 0) {
  throw new Error(`Unsafe files changed:\n${prohibited.join("\n")}`);
}
console.log(`Validated safe change scope across ${changed.length} files.`);
