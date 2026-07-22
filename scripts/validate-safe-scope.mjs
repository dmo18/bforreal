import { execFileSync } from "node:child_process";

const base = process.env.BASE_SHA;
const head = process.env.HEAD_SHA;
if (!base || !head) throw new Error("BASE_SHA and HEAD_SHA are required");

const allowed = [
  ".github/workflows/deploy-pages.yml",
  ".github/workflows/build-cloudways.yml",
  "package.json",
  "pnpm-lock.yaml",
  "README.md",
  "DESIGN.md",
  ".gitignore",
  "app/resource-feature-stabilizer.tsx",
  "AGENTS.md",
  "index.html",
  "pnpm-workspace.yaml",
  "app/version-sync.tsx",
  "app/layout.tsx",
  "app/globals.css",
  "app/hide-legacy-resource-grid.tsx",
  "app/daily-bitachon-polish.tsx",
  "app/daily-bitachon-feature.tsx",
  "app/podcast-feature.tsx",
  "public/shaar-habitachon-gate-of-trust.svg",
  "public/bitachon-for-real-podcast-cover.webp",
  "public/michael-safdie-madison.webp",
  "public/shaar-habitachon-jaffa.svg",
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

const allowedPrefixes = [
  "app/stickers.css",
  "components/stickers/",
  "data/sticker",
  "lib/sticker-",
  "public/stickers/",
  "scripts/materialize-sticker-assets.mjs",
  "scripts/normalize-ly-webp.mjs",
  "lib/device-capabilities.ts",
  "scripts/sticker-manifest.mjs",
  "scripts/validate-sticker-assets.mjs",
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
const prohibited = changed.filter(
  (path) =>
    !allowed.includes(path) &&
    !allowedPrefixes.some((prefix) => path.startsWith(prefix)) &&
    !/^assets[/]bitachonforreal[.]com_ly-[0-9]{2}[.]webp$/.test(path),
);

if (prohibited.length > 0) {
  throw new Error(`Unsafe files changed:\n${prohibited.join("\n")}`);
}
console.log(`Validated safe change scope across ${changed.length} files.`);
