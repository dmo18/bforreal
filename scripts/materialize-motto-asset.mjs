import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const source = join(process.cwd(), "assets", "motto-reference.base64");
const target = join(process.cwd(), "public", "motto-reference.jpg");

const encoded = (await readFile(source, "utf8")).replace(/\s+/g, "");
const bytes = Buffer.from(encoded, "base64");

if (
  bytes.length < 5_000 ||
  bytes[0] !== 0xff ||
  bytes[1] !== 0xd8 ||
  bytes[2] !== 0xff ||
  bytes.at(-2) !== 0xff ||
  bytes.at(-1) !== 0xd9
) {
  throw new Error("The motto source did not decode to a complete JPEG file.");
}

await mkdir(dirname(target), { recursive: true });
await writeFile(target, bytes);
console.log(`Materialized motto JPEG: ${bytes.length} bytes`);
