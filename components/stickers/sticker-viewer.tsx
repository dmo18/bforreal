"use client";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  HelpCircle,
  Image as ImageIcon,
  MoreHorizontal,
  Phone,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import {
  getStickerDownloadName,
  type StickerCollectionRecord,
  withStickerBasePath,
} from "@/data/stickers";
import { canShareFile, getDeviceProfile } from "@/lib/device-capabilities";
import {
  copyText,
  downloadStickerFile,
  getStickerFile,
  openStickerImage,
  shareStickerFile,
  shareStickerPage,
} from "@/lib/sticker-files";
import { buildStickerLink } from "@/lib/sticker-links";
import { PhoneHandoff } from "./phone-handoff";
import { StickerActionSheet } from "./sticker-action-sheet";
import { useModalDialog } from "./use-modal-dialog";

export function StickerViewer({
  collection,
  index,
  inactive,
  onMove,
  onClose,
  onHelp,
  onSaved,
}: {
  collection: StickerCollectionRecord;
  index: number;
  inactive: boolean;
  onMove: (direction: -1 | 1) => void;
  onClose: () => void;
  onHelp: () => void;
  onSaved?: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const [status, setStatus] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [showPhoneHandoff, setShowPhoneHandoff] = useState(false);
  const [saved, setSaved] = useState(false);
  const sticker = collection.stickers[index];
  const device = getDeviceProfile();
  const stickerLink = buildStickerLink(collection, sticker);
  const close = useCallback(() => onClose(), [onClose]);
  const move = useCallback(
    (direction: -1 | 1) => {
      setStatus("");
      setSaved(false);
      setShowMore(false);
      setShowPhoneHandoff(false);
      onMove(direction);
    },
    [onMove],
  );
  useModalDialog(dialogRef, close, move, inactive);

  async function download(extension: "png" | "webp") {
    try {
      const file = await getStickerFile(collection, sticker, extension);
      downloadStickerFile(file);
      setStatus(
        extension === "png"
          ? "Sticker download started."
          : "Original sticker download started.",
      );
    } catch {
      setStatus(
        "The image could not be loaded. Try opening the full-size version.",
      );
    }
  }

  function confirmSaved(message: string) {
    setStatus(message);
    setSaved(true);
    onSaved?.();
  }

  async function saveSticker() {
    if (device.isDesktop) {
      setShowPhoneHandoff(true);
      return;
    }

    try {
      const file = await getStickerFile(collection, sticker, "png");
      if (device.kind === "android") {
        downloadStickerFile(file);
        confirmSaved(
          "Sticker saved. Open WhatsApp when you are ready to create it.",
        );
        return;
      }

      if (canShareFile(file)) {
        setStatus("Choose Save Image to keep this sticker in Photos.");
        await new Promise((resolve) => window.setTimeout(resolve, 50));
        const result = await shareStickerFile(file);
        if (result === "shared") {
          confirmSaved(
            "Share sheet complete. Open WhatsApp when you are ready to create the sticker.",
          );
        }
        return;
      }

      if (!openStickerImage(sticker)) throw new Error("Image window blocked");
      confirmSaved(
        device.kind === "apple-mobile"
          ? "Touch and hold the sticker, then choose Save to Photos."
          : "The full-size sticker is open. Save it to your phone, then choose it in WhatsApp.",
      );
    } catch {
      openStickerImage(sticker);
      setStatus(
        "We could not save this automatically. Open the full-size image and touch and hold it to save.",
      );
    }
  }

  async function sendAsPicture() {
    try {
      const file = await getStickerFile(collection, sticker, "png");
      const result = await shareStickerFile(file);
      if (result === "shared" || result === "cancelled") return;

      if (await copyText(stickerLink)) {
        setStatus(
          "Sharing was not available in this browser. We copied the sticker link instead.",
        );
        return;
      }

      downloadStickerFile(file);
      setStatus("Sharing was unavailable, so the picture download started.");
    } catch {
      setStatus("The image could not be loaded. Try the full-size version.");
    }
  }

  async function copyLink() {
    setStatus(
      (await copyText(stickerLink))
        ? "Sticker link copied."
        : "Copying was not available in this browser.",
    );
  }

  async function sharePage() {
    try {
      const result = await shareStickerPage(collection, sticker);
      if (result === "cancelled" || result === "shared") return;
      await copyLink();
    } catch {
      await copyLink();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="sticker-dialog sticker-viewer-dialog"
      aria-labelledby="sticker-viewer-title"
    >
      <div
        className="sticker-dialog-panel sticker-viewer-panel"
        onTouchStart={(event) => {
          touchStart.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          const end = event.changedTouches[0]?.clientX;
          touchStart.current = null;
          if (start === null || end === undefined || Math.abs(end - start) < 50)
            return;
          move(end > start ? -1 : 1);
        }}
      >
        <div className="sticker-dialog-topbar">
          <span>
            {index + 1} of {collection.stickers.length}
          </span>
          <button
            type="button"
            className="sticker-dialog-close"
            aria-label="Close sticker viewer"
            onClick={onClose}
            data-autofocus
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="sticker-viewer-grid">
          <div className="sticker-viewer-media">
            <button
              type="button"
              className="sticker-viewer-arrow sticker-viewer-arrow--previous"
              aria-label="Previous sticker"
              onClick={() => move(-1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withStickerBasePath(sticker.publicWebp)}
              alt={sticker.alt}
              width={512}
              height={512}
            />
            <button
              type="button"
              className="sticker-viewer-arrow sticker-viewer-arrow--next"
              aria-label="Next sticker"
              onClick={() => move(1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>

          <div className="sticker-viewer-copy">
            <p className="sticker-dialog-kicker">{sticker.alt}</p>
            <h2 id="sticker-viewer-title">Use this sticker in WhatsApp</h2>
            <p>
              Save the image to your phone, then choose it inside WhatsApp when
              creating a sticker.
            </p>

            <div className="sticker-primary-actions">
              <button
                type="button"
                className="sticker-button sticker-button--primary"
                onClick={() => void saveSticker()}
              >
                {device.isDesktop ? <Phone /> : <Download />}
                {device.isDesktop
                  ? "Open on your phone"
                  : "Save to use in WhatsApp"}
              </button>
              <button
                type="button"
                className="sticker-button"
                onClick={() => void sendAsPicture()}
              >
                <ImageIcon /> Send as a picture
              </button>
            </div>
            <p className="sticker-share-note">
              This sends the artwork as a picture. It does not automatically
              save it to your WhatsApp stickers.
            </p>

            {showPhoneHandoff && (
              <PhoneHandoff
                url={stickerLink}
                onDownload={() => void download("png")}
                compact
              />
            )}

            <div className="sticker-secondary-actions">
              <button type="button" onClick={onHelp}>
                <HelpCircle /> How do I use this?
              </button>
              <button
                type="button"
                aria-expanded={showMore}
                onClick={() => setShowMore((current) => !current)}
              >
                <MoreHorizontal /> More options
              </button>
            </div>

            <StickerActionSheet
              open={showMore}
              onDownloadPng={() => void download("png")}
              onDownloadWebp={() => void download("webp")}
              onCopyLink={() => void copyLink()}
              onSharePage={() => void sharePage()}
              onOpenFullSize={() => openStickerImage(sticker)}
            />

            {saved && (
              <div className="sticker-after-save">
                <button type="button" onClick={onHelp}>
                  Show WhatsApp steps
                </button>
                <button type="button" onClick={() => openStickerImage(sticker)}>
                  Open image
                </button>
                <button type="button" onClick={() => move(1)}>
                  Next sticker
                </button>
              </div>
            )}
            <p className="sticker-status" aria-live="polite">
              {status}
            </p>
            <span className="sr-only">
              Download name:{" "}
              {getStickerDownloadName(collection, sticker, "png")}
            </span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
