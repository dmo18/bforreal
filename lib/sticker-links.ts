import { siteConfig } from "@/data/site";
import {
  getStickerId,
  type StickerCollectionId,
  type StickerCollectionRecord,
  type StickerRecord,
} from "@/data/stickers";

export function buildStickerLink(
  collection: StickerCollectionRecord,
  sticker: StickerRecord,
) {
  const url = new URL(siteConfig.siteUrl);
  url.search = "";
  url.searchParams.set("sticker", getStickerId(collection, sticker));
  return url.toString();
}

export function buildCollectionLink(collectionId: StickerCollectionId) {
  const url = new URL(siteConfig.siteUrl);
  url.search = "";
  url.searchParams.set("collection", collectionId);
  url.searchParams.set("getAll", "1");
  return url.toString();
}

export function updateCurrentStickerQuery(stickerId: string | null) {
  const url = new URL(window.location.href);
  url.searchParams.delete("collection");
  url.searchParams.delete("getAll");
  if (stickerId) url.searchParams.set("sticker", stickerId);
  else url.searchParams.delete("sticker");
  window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function updateCurrentCollectionQuery(
  collectionId: StickerCollectionId | null,
) {
  const url = new URL(window.location.href);
  url.searchParams.delete("sticker");
  if (collectionId) {
    url.searchParams.set("collection", collectionId);
    url.searchParams.set("getAll", "1");
  } else {
    url.searchParams.delete("collection");
    url.searchParams.delete("getAll");
  }
  window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function readStickerQuery() {
  const params = new URLSearchParams(window.location.search);
  return {
    sticker: params.get("sticker"),
    collection: params.get("collection"),
    getAll: params.get("getAll") === "1",
  };
}
