"use client";

import type { StickerRecord } from "@/data/stickers";

export function StickerCard({
  sticker,
  imageUrl,
  onOpen,
  triggerRef,
}: {
  sticker: StickerRecord;
  imageUrl: string;
  onOpen: () => void;
  triggerRef: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <article className="sticker-card">
      <button
        ref={triggerRef}
        type="button"
        className="sticker-card-trigger"
        aria-haspopup="dialog"
        aria-label={`Use ${sticker.alt}`}
        onClick={onOpen}
      >
        <span className="sticker-card-number" aria-hidden="true">
          {sticker.number}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={sticker.alt}
          width={512}
          height={512}
          loading="lazy"
          decoding="async"
        />
        <span className="sticker-card-cta">Use this sticker</span>
      </button>
    </article>
  );
}
