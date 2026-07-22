"use client";

import { Check, Copy, Download } from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { copyText } from "@/lib/sticker-files";

export function PhoneHandoff({
  url,
  onDownload,
  compact = false,
}: {
  url: string;
  onDownload?: () => void;
  compact?: boolean;
}) {
  const [qrCode, setQrCode] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    let active = true;
    void QRCode.toDataURL(url, {
      width: 280,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0a1422", light: "#f4efe3" },
    }).then((value) => {
      if (active) setQrCode(value);
    });
    return () => {
      active = false;
    };
  }, [url]);

  async function copyLink() {
    if (await copyText(url)) setStatus("Phone link copied.");
    else setStatus("Copying was not available. Open this page on your phone.");
  }

  return (
    <div className={`phone-handoff${compact ? " phone-handoff--compact" : ""}`}>
      <div className="phone-handoff-copy">
        <p className="sticker-dialog-kicker">Continue on your phone</p>
        <ol>
          <li>Scan the code with your phone&apos;s camera.</li>
          <li>Save the sticker from the page that opens.</li>
          <li>Follow the short WhatsApp steps shown there.</li>
        </ol>
      </div>
      <div className="phone-handoff-qr" aria-label="QR code for this sticker">
        {qrCode ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qrCode} alt="QR code to open this sticker on a phone" />
        ) : (
          <span>Preparing code…</span>
        )}
      </div>
      <div className="phone-handoff-actions">
        <button type="button" className="sticker-button" onClick={copyLink}>
          {status === "Phone link copied." ? <Check /> : <Copy />}
          Copy phone link
        </button>
        {onDownload && (
          <button
            type="button"
            className="sticker-button sticker-button--quiet"
            onClick={onDownload}
          >
            <Download />
            Download image to computer
          </button>
        )}
      </div>
      <p className="sticker-status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
