import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const targets = [
  join(process.cwd(), "public", "motto-reference.jpg"),
  join(process.cwd(), "out", "motto-reference.jpg"),
];

for (const target of targets) {
  const metadata = await stat(target);
  if (metadata.size < 5_000) {
    throw new Error(`${target} is unexpectedly small: ${metadata.size} bytes`);
  }

  const bytes = await readFile(target);
  const hasJpegStart =
    bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const hasJpegEnd = bytes.at(-2) === 0xff && bytes.at(-1) === 0xd9;

  if (!hasJpegStart || !hasJpegEnd) {
    throw new Error(`${target} is not a complete JPEG file`);
  }
}

console.log("Validated source and exported motto JPEG assets.");
