import manifest from "./sticker-collections.json";

export type StickerCollectionId = "podcast" | "daily" | "living-yosh";
export type StickerTheme = "gold" | "mint" | "amber";

export interface StickerRecord {
  number: string;
  sourcePng: string;
  sourceWebp: string;
  publicPng: string;
  publicWebp: string;
  alt: string;
}

export interface StickerCollectionRecord {
  id: StickerCollectionId;
  title: string;
  description: string;
  featureKicker: string;
  theme: StickerTheme;
  downloadPrefix: string;
  stickers: StickerRecord[];
}

export const stickerCollections =
  manifest.collections as StickerCollectionRecord[];

export function getStickerCollection(id: StickerCollectionId) {
  const collection = stickerCollections.find((item) => item.id === id);
  if (!collection) throw new Error(`Unknown sticker collection: ${id}`);
  return collection;
}

export function getStickerId(
  collection: StickerCollectionRecord,
  sticker: StickerRecord,
) {
  return `${collection.id}-${sticker.number}`;
}

export function getStickerDownloadName(
  collection: StickerCollectionRecord,
  sticker: StickerRecord,
  extension: "png" | "webp",
) {
  return `${collection.downloadPrefix}-${sticker.number}.${extension}`;
}

export function withStickerBasePath(path: string) {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(
    /\/$/,
    "",
  );
  return `${basePath}/${path.replace(/^\//, "")}`;
}
