import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";
import { absoluteRepositoryPath, collections } from "./sticker-manifest.mjs";

const collection = collections.find((item) => item.id === "living-yosh");
if (!collection) throw new Error("LivingYosh collection is missing.");

for (const sticker of collection.stickers) {
  const source = absoluteRepositoryPath(sticker.sourcePng);
  const target = absoluteRepositoryPath(sticker.sourceWebp);

  await mkdir(dirname(target), { recursive: true });
  const normalized = await sharp(source, { failOn: "error" })
    .resize(512, 512, {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ lossless: true, effort: 6 })
    .toBuffer();

  const metadata = await sharp(normalized, { failOn: "error" }).metadata();
  if (
    metadata.format !== "webp" ||
    metadata.width !== 512 ||
    metadata.height !== 512
  ) {
    throw new Error(
      `${sticker.sourceWebp} did not normalize to a 512 x 512 WebP.`,
    );
  }

  await writeFile(target, normalized);
  console.log(`Normalized ${sticker.sourceWebp}`);
}

console.log("Normalized ten LivingYosh sticker WebPs from their PNG masters.");
