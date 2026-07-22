import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const repositoryRoot = process.cwd();
export const manifestPath = resolve(
  repositoryRoot,
  "data",
  "sticker-collections.json",
);

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

if (!Array.isArray(manifest.collections) || manifest.collections.length !== 3) {
  throw new Error("Sticker manifest must contain exactly three collections.");
}

export const collections = manifest.collections;
export const stickers = collections.flatMap((collection) =>
  collection.stickers.map((sticker) => ({ collection, sticker })),
);

for (const collection of collections) {
  if (
    !Array.isArray(collection.stickers) ||
    collection.stickers.length !== 10
  ) {
    throw new Error(
      `Collection ${collection.id} must contain exactly ten stickers.`,
    );
  }
}

if (stickers.length !== 30) {
  throw new Error(`Expected 30 sticker records, found ${stickers.length}.`);
}

export function absoluteRepositoryPath(relativePath) {
  return resolve(repositoryRoot, relativePath);
}
