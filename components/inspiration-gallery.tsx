"use client";

import Image from "next/image";
import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/icons";
import type { InspirationGraphic } from "@/data/site";
import {
  buildGraphicUrls,
  isAbortError,
  mimeTypeForFile,
} from "@/lib/share-utils.mjs";

interface InspirationGalleryProps {
  graphics: InspirationGraphic[];
  basePath: string;
  siteUrl: string;
}

type PendingAction = { id: string; kind: "share" | "download" } | null;

export function InspirationGallery({
  graphics,
  basePath,
  siteUrl,
}: InspirationGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pending, setPending] = useState<PendingAction>(null);
  const [status, setStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const mountedRef = useRef(true);
  const titleId = useId();
  const descriptionId = useId();
  const isOpen = activeIndex !== null;

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const moveLightbox = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => {
        if (current === null || graphics.length === 0) return current;
        return (current + direction + graphics.length) % graphics.length;
      });
    },
    [graphics.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    };
  }, [isOpen]);

  async function fetchGraphic(graphic: InspirationGraphic) {
    const { assetPath, canonicalUrl } = buildGraphicUrls({
      basePath,
      siteUrl,
      file: graphic.file,
    });
    const response = await fetch(assetPath);
    if (!response.ok) {
      throw new Error(`The graphic could not be loaded (${response.status}).`);
    }
    const blob = await response.blob();
    return { assetPath, canonicalUrl, blob };
  }

  async function shareGraphic(graphic: InspirationGraphic) {
    setPending({ id: graphic.id, kind: "share" });
    setStatus("");

    try {
      const { canonicalUrl, blob } = await fetchGraphic(graphic);
      const file = new File([blob], graphic.file, {
        type: mimeTypeForFile(graphic.file, blob.type),
      });

      if (
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: graphic.title,
          text: `${graphic.title} from Bitachon For Real`,
          files: [file],
        });
        if (mountedRef.current) setStatus(`${graphic.title} shared.`);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(canonicalUrl);
        if (mountedRef.current) {
          setStatus(
            `Sharing files is unavailable. A direct link to ${graphic.title} was copied.`,
          );
        }
        return;
      }

      throw new Error(
        "Sharing is unavailable in this browser. Use the open-file link instead.",
      );
    } catch (error) {
      if (!mountedRef.current) return;
      if (isAbortError(error)) {
        setStatus("Sharing was canceled.");
      } else {
        setStatus(
          error instanceof Error
            ? error.message
            : "The graphic could not be shared.",
        );
      }
    } finally {
      if (mountedRef.current) setPending(null);
    }
  }

  async function downloadGraphic(graphic: InspirationGraphic) {
    setPending({ id: graphic.id, kind: "download" });
    setStatus("");
    let objectUrl: string | null = null;

    try {
      const { blob } = await fetchGraphic(graphic);
      objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = graphic.file;
      anchor.rel = "noopener";
      anchor.click();
      if (mountedRef.current) setStatus(`${graphic.title} downloaded.`);
    } catch (error) {
      if (mountedRef.current) {
        setStatus(
          error instanceof Error
            ? error.message
            : "The graphic could not be downloaded.",
        );
      }
    } finally {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (mountedRef.current) setPending(null);
    }
  }

  function onDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveLightbox(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveLightbox(1);
    }
  }

  const activeGraphic = activeIndex === null ? null : graphics[activeIndex];

  return (
    <>
      <div className="gallery-grid" aria-label="Bitachon inspiration graphics">
        {graphics.map((graphic, index) => {
          const { assetPath } = buildGraphicUrls({
            basePath,
            siteUrl,
            file: graphic.file,
          });
          const sharing =
            pending?.id === graphic.id && pending.kind === "share";
          const downloading =
            pending?.id === graphic.id && pending.kind === "download";

          return (
            <article className="gallery-card" key={graphic.id}>
              <button
                className="gallery-open"
                type="button"
                aria-haspopup="dialog"
                aria-label={`View ${graphic.title} in the gallery`}
                onClick={(event) => {
                  returnFocusRef.current = event.currentTarget;
                  setActiveIndex(index);
                }}
              >
                <Image
                  src={assetPath}
                  alt={`${graphic.title} share graphic`}
                  width={graphic.width}
                  height={graphic.height}
                  sizes="(max-width: 720px) 88vw, (max-width: 1100px) 44vw, 29vw"
                  loading="lazy"
                />
                <span className="gallery-zoom" aria-hidden="true">
                  <Icon name="zoom" size={17} />
                </span>
              </button>
              <div className="gallery-card-body">
                <div>
                  <h3>{graphic.title}</h3>
                  <p>{graphic.description}</p>
                </div>
                <div
                  className="gallery-actions"
                  aria-label={`${graphic.title} actions`}
                >
                  <button
                    type="button"
                    disabled={pending !== null}
                    aria-busy={sharing}
                    onClick={() => void shareGraphic(graphic)}
                  >
                    <Icon name="share" size={16} />
                    {sharing ? "Sharing" : "Share"}
                  </button>
                  <button
                    type="button"
                    disabled={pending !== null}
                    aria-busy={downloading}
                    onClick={() => void downloadGraphic(graphic)}
                  >
                    <Icon name="download" size={16} />
                    {downloading ? "Saving" : "Download"}
                  </button>
                  <a href={assetPath} target="_blank" rel="noopener noreferrer">
                    Open file
                    <Icon name="external" size={14} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p
        className="gallery-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status}
      </p>

      {activeGraphic && activeIndex !== null ? (
        <dialog
          ref={dialogRef}
          className="lightbox"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onCancel={(event) => {
            event.preventDefault();
            closeLightbox();
          }}
          onKeyDown={onDialogKeyDown}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="lightbox-panel">
            <div className="lightbox-heading">
              <div>
                <p className="lightbox-position">
                  Graphic {activeIndex + 1} of {graphics.length}
                </p>
                <h2 id={titleId}>{activeGraphic.title}</h2>
                <p id={descriptionId}>{activeGraphic.description}</p>
              </div>
              <button
                ref={closeButtonRef}
                className="lightbox-close"
                type="button"
                onClick={closeLightbox}
              >
                <Icon name="close" size={19} />
                <span className="sr-only">Close gallery</span>
              </button>
            </div>
            <div className="lightbox-media">
              <Image
                src={
                  buildGraphicUrls({
                    basePath,
                    siteUrl,
                    file: activeGraphic.file,
                  }).assetPath
                }
                alt={`${activeGraphic.title} share graphic`}
                width={activeGraphic.width}
                height={activeGraphic.height}
                sizes="95vw"
                priority
              />
            </div>
            <div className="lightbox-controls">
              <button type="button" onClick={() => moveLightbox(-1)}>
                <Icon name="left" size={19} />
                Previous
              </button>
              <button type="button" onClick={() => moveLightbox(1)}>
                Next
                <Icon name="right" size={19} />
              </button>
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
