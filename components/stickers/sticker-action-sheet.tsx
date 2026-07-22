"use client";

import { Copy, Download, ExternalLink, Share2 } from "lucide-react";

export function StickerActionSheet({
  open,
  onDownloadPng,
  onDownloadWebp,
  onCopyLink,
  onSharePage,
  onOpenFullSize,
}: {
  open: boolean;
  onDownloadPng: () => void;
  onDownloadWebp: () => void;
  onCopyLink: () => void;
  onSharePage: () => void;
  onOpenFullSize: () => void;
}) {
  if (!open) return null;

  return (
    <div className="sticker-more-options" aria-label="More sticker options">
      <button type="button" onClick={onDownloadPng}>
        <Download /> Download PNG
      </button>
      <button type="button" onClick={onDownloadWebp}>
        <Download /> Download original WebP
      </button>
      <button type="button" onClick={onCopyLink}>
        <Copy /> Copy sticker link
      </button>
      <button type="button" onClick={onSharePage}>
        <Share2 /> Share this sticker page
      </button>
      <button type="button" onClick={onOpenFullSize}>
        <ExternalLink /> Open full-size image
      </button>
    </div>
  );
}
