import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const scanRoots = ["app", "scripts", ".github"];
const extensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".yml",
  ".yaml",
  ".json",
  ".md",
  ".css",
]);
const patterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["GitHub token", /\bgh[oprsu]_[A-Za-z0-9_]{30,}\b/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["OpenAI key", /\bsk-[A-Za-z0-9_-]{32,}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/],
];
const findings = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    if (!extensions.has(extname(path))) continue;
    const content = await readFile(path, "utf8");
    for (const [label, pattern] of patterns) {
      if (pattern.test(content))
        findings.push(`${relative(root, path)}: possible ${label}`);
    }
  }
}

for (const directory of scanRoots) await walk(join(root, directory));
if (findings.length > 0) {
  throw new Error(`Secret-pattern validation failed:\n${findings.join("\n")}`);
}
console.log("Validated common accidental secret patterns.");
