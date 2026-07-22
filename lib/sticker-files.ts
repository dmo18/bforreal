import {
  getStickerDownloadName,
  type StickerCollectionRecord,
  type StickerRecord,
  withStickerBasePath,
} from "@/data/stickers";
import { canShareFile, isShareCancellation } from "./device-capabilities";
import { buildStickerLink } from "./sticker-links";

export type ShareResult = "shared" | "cancelled" | "unsupported";

export async function getStickerFile(
  collection: StickerCollectionRecord,
  sticker: StickerRecord,
  extension: "png" | "webp" = "png",
) {
  const path = extension === "png" ? sticker.publicPng : sticker.publicWebp;
  const response = await fetch(withStickerBasePath(path));
  if (!response.ok) throw new Error("The image could not be loaded.");
  const blob = await response.blob();
  return new File(
    [blob],
    getStickerDownloadName(collection, sticker, extension),
    { type: extension === "png" ? "image/png" : "image/webp" },
  );
}

export function downloadStickerFile(file: File) {
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = file.name;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export async function shareStickerFile(file: File): Promise<ShareResult> {
  if (!canShareFile(file)) return "unsupported";
  try {
    await navigator.share({ files: [file] });
    return "shared";
  } catch (error) {
    if (isShareCancellation(error)) return "cancelled";
    throw error;
  }
}

export async function copyText(text: string) {
  if (!navigator.clipboard?.writeText) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function shareStickerPage(
  collection: StickerCollectionRecord,
  sticker: StickerRecord,
): Promise<ShareResult> {
  const url = buildStickerLink(collection, sticker);
  if (typeof navigator.share !== "function") return "unsupported";
  try {
    await navigator.share({ title: sticker.alt, url });
    return "shared";
  } catch (error) {
    if (isShareCancellation(error)) return "cancelled";
    throw error;
  }
}

export function openStickerImage(sticker: StickerRecord) {
  const opened = window.open(
    withStickerBasePath(sticker.publicPng),
    "_blank",
    "noopener,noreferrer",
  );
  return Boolean(opened);
}
