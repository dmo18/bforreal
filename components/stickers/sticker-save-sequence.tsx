"use client";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  HelpCircle,
  Phone,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  type StickerCollectionRecord,
  withStickerBasePath,
} from "@/data/stickers";
import { canShareFile, getDeviceProfile } from "@/lib/device-capabilities";
import {
  downloadStickerFile,
  getStickerFile,
  openStickerImage,
  shareStickerFile,
} from "@/lib/sticker-files";
import { buildCollectionLink } from "@/lib/sticker-links";
import { PhoneHandoff } from "./phone-handoff";
import { useModalDialog } from "./use-modal-dialog";

export function getStickerProgressKey(collectionId: string) {
  return `sticker-progress:${collectionId}`;
}

export function StickerSaveSequence({
  collection,
  initialIndex,
  inactive,
  onClose,
  onHelp,
  onReview,
}: {
  collection: StickerCollectionRecord;
  initialIndex: number;
  inactive: boolean;
  onClose: () => void;
  onHelp: () => void;
  onReview: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const [finished, setFinished] = useState(false);
  const [status, setStatus] = useState("");
  const device = getDeviceProfile();
  const sticker = collection.stickers[index];
  const close = useCallback(() => onClose(), [onClose]);

  const persist = useCallback(
    (nextIndex: number, complete = false) => {
      sessionStorage.setItem(
        getStickerProgressKey(collection.id),
        JSON.stringify({ index: nextIndex, complete }),
      );
    },
    [collection.id],
  );

  const move = useCallback(
    (direction: -1 | 1) => {
      setStatus("");
      setIndex((current) => {
        const next =
          (current + direction + collection.stickers.length) %
          collection.stickers.length;
        persist(next);
        return next;
      });
    },
    [collection.stickers.length, persist],
  );
  useModalDialog(dialogRef, close, move, inactive);

  useEffect(() => {
    persist(index);
  }, [index, persist]);

  function advance() {
    if (index === collection.stickers.length - 1) {
      setFinished(true);
      persist(collection.stickers.length, true);
      return;
    }
    setIndex((current) => current + 1);
    setStatus("");
  }

  async function saveCurrentSticker() {
    try {
      const file = await getStickerFile(collection, sticker, "png");
      if (device.kind === "android") {
        downloadStickerFile(file);
        setStatus("Sticker saved. Moving to the next one.");
        window.setTimeout(advance, 450);
        return;
      }

      if (canShareFile(file)) {
        setStatus("Choose Save Image to keep this sticker in Photos.");
        await new Promise((resolve) => window.setTimeout(resolve, 50));
        const result = await shareStickerFile(file);
        if (result === "shared") {
          setStatus("Sticker ready. Moving to the next one.");
          window.setTimeout(advance, 450);
        }
        return;
      }

      openStickerImage(sticker);
      setStatus(
        device.kind === "apple-mobile"
          ? "Touch and hold the sticker, then choose Save to Photos. Use Next when it is saved."
          : "Save the full-size image, then use Next when you are ready.",
      );
    } catch {
      openStickerImage(sticker);
      setStatus(
        "We could not save this automatically. Open the full-size image and touch and hold it to save.",
      );
    }
  }

  function done() {
    sessionStorage.removeItem(getStickerProgressKey(collection.id));
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="sticker-dialog sticker-sequence-dialog"
      aria-labelledby="sticker-sequence-title"
    >
      <div className="sticker-dialog-panel sticker-sequence-panel">
        <div className="sticker-dialog-topbar">
          <span>Get all 10</span>
          <button
            type="button"
            className="sticker-dialog-close"
            aria-label="Exit guided sticker saving"
            onClick={onClose}
            data-autofocus
          >
            <X aria-hidden="true" />
          </button>
        </div>

        {finished ? (
          <div className="sticker-sequence-finish">
            <p className="sticker-dialog-kicker">All ten are ready.</p>
            <h2 id="sticker-sequence-title">
              Now open WhatsApp and create the ones you want to keep there.
            </h2>
            <div className="sticker-primary-actions">
              <button
                type="button"
                className="sticker-button sticker-button--primary"
                onClick={onHelp}
              >
                <HelpCircle /> Show WhatsApp steps
              </button>
              <button
                type="button"
                className="sticker-button"
                onClick={() => onReview(0)}
              >
                Review stickers
              </button>
              <button
                type="button"
                className="sticker-button sticker-button--quiet"
                onClick={done}
              >
                Done
              </button>
            </div>
          </div>
        ) : device.isDesktop ? (
          <div className="sticker-sequence-desktop">
            <h2 id="sticker-sequence-title">Get all 10 on your phone</h2>
            <p>We will take you through them one at a time.</p>
            <PhoneHandoff url={buildCollectionLink(collection.id)} compact />
          </div>
        ) : (
          <>
            <div className="sticker-sequence-heading">
              <div>
                <p className="sticker-dialog-kicker">Get all 10</p>
                <h2 id="sticker-sequence-title">
                  We will take you through them one at a time.
                </h2>
              </div>
              <strong>
                Sticker {index + 1} of {collection.stickers.length}
              </strong>
            </div>
            <div className="sticker-sequence-progress" aria-hidden="true">
              <span
                style={{
                  width: `${((index + 1) / collection.stickers.length) * 100}%`,
                }}
              />
            </div>
            <div className="sticker-sequence-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withStickerBasePath(sticker.publicWebp)}
                alt={sticker.alt}
                width={512}
                height={512}
              />
            </div>
            <button
              type="button"
              className="sticker-button sticker-button--primary sticker-sequence-save"
              onClick={() => void saveCurrentSticker()}
            >
              <Download /> Save this sticker
            </button>
            <div className="sticker-sequence-navigation">
              <button type="button" onClick={() => move(-1)}>
                <ChevronLeft /> Previous
              </button>
              <button type="button" onClick={advance}>
                Skip
              </button>
              <button type="button" onClick={() => move(1)}>
                Next <ChevronRight />
              </button>
              <button type="button" onClick={onClose}>
                Exit
              </button>
            </div>
            <p className="sticker-status" aria-live="polite">
              {status}
            </p>
          </>
        )}
        {device.isDesktop && (
          <p className="sr-only">
            <Phone aria-hidden="true" /> Continue this saving sequence on your
            phone.
          </p>
        )}
      </div>
    </dialog>
  );
}
