import { copyFile, mkdir, rename, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import sharp from "sharp";
import {
  absoluteRepositoryPath,
  repositoryRoot,
  stickers,
} from "./sticker-manifest.mjs";

const generatedRoot = resolve(repositoryRoot, "public", "stickers");
await rm(generatedRoot, { recursive: true, force: true });

for (const { sticker } of stickers) {
  const sourceWebp = absoluteRepositoryPath(sticker.sourceWebp);
  const targetWebp = resolve(repositoryRoot, "public", sticker.publicWebp);
  const targetPng = resolve(repositoryRoot, "public", sticker.publicPng);
  const temporaryWebp = `${targetWebp}.next`;
  const temporaryPng = `${targetPng}.next`;

  await mkdir(dirname(targetWebp), { recursive: true });
  await copyFile(sourceWebp, temporaryWebp);
  await sharp(sourceWebp, { failOn: "error" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(temporaryPng);

  await rename(temporaryWebp, targetWebp);
  await rename(temporaryPng, targetPng);
}

console.log("Materialized 30 canonical sticker pairs in public/stickers.");
