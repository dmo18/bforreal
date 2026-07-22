import { readdir, readFile, stat } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import sharp from "sharp";
import {
  absoluteRepositoryPath,
  collections,
  repositoryRoot,
  stickers,
} from "./sticker-manifest.mjs";

const requireExport = process.argv.includes("--require-export");
const failures = [];

function fail(message) {
  failures.push(message);
}

async function validateSignature(path, expected) {
  const bytes = await readFile(path);
  if (bytes.length === 0) {
    fail(`${relative(repositoryRoot, path)} is empty.`);
    return;
  }

  const isPng =
    bytes.length >= 8 &&
    bytes
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isWebp =
    bytes.length >= 12 &&
    bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
    bytes.subarray(8, 12).toString("ascii") === "WEBP";

  if ((expected === "png" && !isPng) || (expected === "webp" && !isWebp)) {
    fail(`${relative(repositoryRoot, path)} has the wrong file signature.`);
  }
}

async function metadata(path) {
  try {
    return await sharp(path, { failOn: "error" }).metadata();
  } catch (error) {
    fail(
      `${relative(repositoryRoot, path)} has unreadable image data: ${error.message}`,
    );
    return null;
  }
}

async function validateOriginal(path, expected) {
  try {
    const details = await stat(path);
    if (!details.isFile() || details.size === 0) {
      fail(`${relative(repositoryRoot, path)} is missing or empty.`);
      return null;
    }
    await validateSignature(path, expected);
    return await metadata(path);
  } catch {
    fail(`${relative(repositoryRoot, path)} is missing.`);
    return null;
  }
}

async function rawPixels(path) {
  return sharp(path, { failOn: "error" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
}

async function walkFiles(directory) {
  const files = [];
  try {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) files.push(...(await walkFiles(path)));
      else files.push(path);
    }
  } catch {
    return [];
  }
  return files;
}

for (const collection of collections) {
  if (collection.stickers.length !== 10) {
    fail(`${collection.id} does not contain exactly ten manifest records.`);
  }
}

for (const { collection, sticker } of stickers) {
  const sourcePng = absoluteRepositoryPath(sticker.sourcePng);
  const sourceWebp = absoluteRepositoryPath(sticker.sourceWebp);
  await validateOriginal(sourcePng, "png");
  const canonical = await validateOriginal(sourceWebp, "webp");
  if (canonical && (canonical.width !== 512 || canonical.height !== 512)) {
    fail(
      `${sticker.sourceWebp} is ${canonical.width} x ${canonical.height}; expected 512 x 512.`,
    );
  }
  if (collection.id === "living-yosh" && canonical) {
    try {
      const [expectedPixels, canonicalPixels] = await Promise.all([
        sharp(sourcePng, { failOn: "error" })
          .resize(512, 512, {
            fit: "fill",
            kernel: sharp.kernel.lanczos3,
          })
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true }),
        rawPixels(sourceWebp),
      ]);
      if (
        expectedPixels.info.width !== canonicalPixels.info.width ||
        expectedPixels.info.height !== canonicalPixels.info.height ||
        expectedPixels.info.channels !== canonicalPixels.info.channels ||
        !expectedPixels.data.equals(canonicalPixels.data)
      ) {
        fail(
          `${sticker.sourceWebp} does not match the complete 512 x 512 composition derived from its PNG master.`,
        );
      }
    } catch (error) {
      fail(
        `${sticker.sourceWebp} could not be compared with its PNG master: ${error.message}`,
      );
    }
  }

  for (const outputRoot of ["public", ...(requireExport ? ["out"] : [])]) {
    const pngPath = resolve(repositoryRoot, outputRoot, sticker.publicPng);
    const webpPath = resolve(repositoryRoot, outputRoot, sticker.publicWebp);
    const png = await validateOriginal(pngPath, "png");
    const webp = await validateOriginal(webpPath, "webp");

    for (const [path, details] of [
      [pngPath, png],
      [webpPath, webp],
    ]) {
      if (details && (details.width !== 512 || details.height !== 512)) {
        fail(
          `${relative(repositoryRoot, path)} is ${details.width} x ${details.height}; expected 512 x 512.`,
        );
      }
    }

    if (png && webp) {
      try {
        const [pngPixels, webpPixels, sourcePixels] = await Promise.all([
          rawPixels(pngPath),
          rawPixels(webpPath),
          rawPixels(sourceWebp),
        ]);
        const expected = sourcePixels.info;
        const sameInfo = [pngPixels.info, webpPixels.info].every(
          (info) =>
            info.width === expected.width &&
            info.height === expected.height &&
            info.channels === expected.channels,
        );
        if (
          !sameInfo ||
          !pngPixels.data.equals(sourcePixels.data) ||
          !webpPixels.data.equals(sourcePixels.data)
        ) {
          fail(
            `${outputRoot}/${collection.id}/${sticker.number} does not preserve the canonical decoded pixels.`,
          );
        }
      } catch (error) {
        fail(
          `${outputRoot}/${collection.id}/${sticker.number} could not be pixel-compared: ${error.message}`,
        );
      }
    }

    if (webp) {
      const [sourceBytes, generatedBytes] = await Promise.all([
        readFile(sourceWebp),
        readFile(webpPath),
      ]);
      if (!sourceBytes.equals(generatedBytes)) {
        fail(
          `${relative(repositoryRoot, webpPath)} is not a byte-for-byte copy of the canonical WebP.`,
        );
      }
    }
  }
}

for (const outputRoot of ["public", ...(requireExport ? ["out"] : [])]) {
  const root = resolve(repositoryRoot, outputRoot, "stickers");
  const actual = (await walkFiles(root))
    .filter((path) => [".png", ".webp"].includes(extname(path).toLowerCase()))
    .map((path) =>
      relative(resolve(repositoryRoot, outputRoot), path).replaceAll("\\", "/"),
    )
    .sort();
  const expected = stickers
    .flatMap(({ sticker }) => [sticker.publicPng, sticker.publicWebp])
    .sort();

  const extras = actual.filter((path) => !expected.includes(path));
  const missing = expected.filter((path) => !actual.includes(path));
  if (extras.length)
    fail(`${outputRoot}/stickers has unexpected files: ${extras.join(", ")}`);
  if (missing.length)
    fail(`${outputRoot}/stickers is missing files: ${missing.join(", ")}`);
}

if (failures.length) {
  throw new Error(`Sticker validation failed:\n${failures.join("\n")}`);
}

console.log(
  `Validated 60 original source files, 30 canonical WebPs, and ${
    requireExport ? "public plus exported" : "public"
  } sticker derivatives.`,
);
