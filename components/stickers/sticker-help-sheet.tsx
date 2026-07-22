"use client";

import { X } from "lucide-react";
import { useCallback, useRef } from "react";
import { getDeviceProfile } from "@/lib/device-capabilities";
import { PhoneHandoff } from "./phone-handoff";
import { useModalDialog } from "./use-modal-dialog";

export function StickerHelpSheet({
  phoneUrl,
  onClose,
}: {
  phoneUrl: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = useCallback(() => onClose(), [onClose]);
  useModalDialog(dialogRef, close);
  const device = getDeviceProfile();

  return (
    <dialog
      ref={dialogRef}
      className="sticker-dialog sticker-help-dialog"
      aria-labelledby="sticker-help-title"
    >
      <div className="sticker-dialog-panel sticker-help-panel">
        <button
          type="button"
          className="sticker-dialog-close"
          aria-label="Close WhatsApp instructions"
          onClick={onClose}
          data-autofocus
        >
          <X aria-hidden="true" />
        </button>

        {device.isDesktop ? (
          <>
            <h2 id="sticker-help-title" className="sr-only">
              Continue on your phone
            </h2>
            <PhoneHandoff url={phoneUrl} compact />
          </>
        ) : (
          <>
            <p className="sticker-dialog-kicker">Three short steps</p>
            <h2 id="sticker-help-title">Use it in WhatsApp</h2>
            <ol className="sticker-help-steps">
              <li>
                <span>1</span>
                <div>
                  <strong>Save the sticker</strong>
                  <p>Tap Save to use in WhatsApp.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Open WhatsApp</strong>
                  <p>Open a conversation and open the stickers area.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Create the sticker</strong>
                  <p>Tap Create or +, then choose the image you saved.</p>
                </div>
              </li>
            </ol>
            {device.kind === "apple-mobile" && (
              <p className="sticker-help-device-note">
                Choose Save Image in the share sheet. If that option does not
                appear, touch and hold the full-size image and choose Save to
                Photos.
              </p>
            )}
            {device.kind === "android" && (
              <p className="sticker-help-device-note">
                The image will normally be saved to your phone&apos;s downloads
                or images. Open it from WhatsApp when creating the sticker.
              </p>
            )}
            <p className="sticker-help-note">
              Keep the full image selected if WhatsApp tries to crop out part of
              the character or wording.
            </p>
            <p className="sticker-help-footnote">
              WhatsApp&apos;s button names and placement can vary by phone and
              version.
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}
