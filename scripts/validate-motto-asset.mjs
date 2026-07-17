import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const targets = [
  join(process.cwd(), "public", "motto-reference.jpg"),
  join(process.cwd(), "out", "motto-reference.jpg"),
];

function readJpegFrame(bytes) {
  let offset = 2;

  while (offset + 4 < bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = bytes[offset + 1];
    offset += 2;

    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) continue;
    if (marker >= 0xd0 && marker <= 0xd7) continue;

    const length = bytes.readUInt16BE(offset);
    if (length < 2 || offset + length > bytes.length) break;

    if (marker === 0xc0 || marker === 0xc2) {
      return {
        marker,
        height: bytes.readUInt16BE(offset + 3),
        width: bytes.readUInt16BE(offset + 5),
      };
    }

    offset += length;
  }

  return null;
}

for (const target of targets) {
  const metadata = await stat(target);
  if (metadata.size < 5_000) {
    throw new Error(`${target} is unexpectedly small: ${metadata.size} bytes`);
  }

  const bytes = await readFile(target);
  const hasJpegStart = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const hasJpegEnd = bytes.at(-2) === 0xff && bytes.at(-1) === 0xd9;

  if (!hasJpegStart || !hasJpegEnd) {
    throw new Error(`${target} is not a complete JPEG file`);
  }

  const frame = readJpegFrame(bytes);
  if (!frame) {
    throw new Error(`${target} does not contain a readable JPEG frame`);
  }

  if (frame.marker !== 0xc0) {
    throw new Error(`${target} must be a baseline JPEG, not progressive`);
  }

  if (frame.width !== 256 || frame.height !== 210) {
    throw new Error(
      `${target} has unexpected dimensions: ${frame.width}x${frame.height}`,
    );
  }
}

console.log("Validated baseline 256x210 source and exported motto JPEG assets.");
