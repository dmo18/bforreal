import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const scanRoots = ["app", "components", "data", "lib", "scripts", ".github"];
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
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35