"use client";

import { ArrowUpRight, HelpCircle } from "lucide-react";
import type { RefObject } from "react";
import {
  getStickerCollection,
  withStickerBasePath,
  type StickerCollectionId,
} from "@/data/stickers";

export function StickerCollectionLauncher({
  collectionId,
  exploreRef,
  onExplore,
  onHelp,
  onPreview,
}: {
  collectionId: StickerCollectionId;
  exploreRef: RefObject<HTMLButtonElement | null>;
  onExplore: () => void;
  onHelp: () => void;
  onPreview: (index: number) => void;
}) {
  const collection = getStickerCollection(collectionId);
  const previews = collection.stickers.slice(0, 3);
  const supportingCopy =
    collectionId === "podcast"
      ? "10 reminders to save and share."
      : collectionId === "daily"
        ? "10 reminders for pressure, perspective, and real life."
        : "10 reminders of faith, resilience, and hope.";

  return (
    <section
      className={`sticker-launcher sticker-launcher--${collection.theme}`}
      aria-labelledby={`${collection.id}-stickers-label`}
    >
      <div className="sticker-launcher-previews" aria-label="Sticker previews">
        {previews.map((sticker, index) => (
          <button
            key={sticker.number}
            type="button"
            className="sticker-launcher-preview"
            aria-label={`Open ${sticker.alt}`}
            onClick={() => onPreview(index)}
            style={{ zIndex: previews.length - index }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withStickerBasePath(sticker.publicWebp)}
              alt=""
              width={512}
              height={512}
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <div className="sticker-launcher-copy">
        <p
          className="sticker-launcher-label"
          id={`${collection.id}-stickers-label`}
        >
          Stickers
        </p>
        <h4 className="sticker-launcher-title">{collection.title}</h4>
        <p className="sticker-launcher-description">{supportingCopy}</p>
      </div>
      <div className="sticker-launcher-actions">
        <button
          ref={exploreRef}
          type="button"
          className="sticker-launcher-button sticker-launcher-button--primary"
          onClick={onExplore}
        >
          <ArrowUpRight aria-hidden="true" /> Explore stickers
        </button>
        <button
          type="button"
          className="sticker-launcher-button"
          onClick={onHelp}
        >
          <HelpCircle aria-hidden="true" /> How it works
        </button>
      </div>
    </section>
  );
}
