"use client";

import { ChevronLeft, ChevronRight, HelpCircle, Layers3 } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type UIEvent } from "react";
import {
  getStickerCollection,
  getStickerId,
  type StickerCollectionId,
  withStickerBasePath,
} from "@/data/stickers";
import {
  buildCollectionLink,
  buildStickerLink,
  readStickerQuery,
  updateCurrentCollectionQuery,
  updateCurrentStickerQuery,
} from "@/lib/sticker-links";
import { StickerCard } from "./sticker-card";
import { StickerCollectionLauncher } from "./sticker-collection-launcher";
import { StickerHelpSheet } from "./sticker-help-sheet";
import {
  getStickerProgressKey,
  StickerSaveSequence,
} from "./sticker-save-sequence";
import { StickerViewer } from "./sticker-viewer";
import { useModalDialog } from "./use-modal-dialog";

function clearStickerQuery() {
  const url = new URL(window.location.href);
  url.searchParams.delete("sticker");
  url.searchParams.delete("collection");
  url.searchParams.delete("getAll");
  window.history.replaceState(
    {},
    "",
    `${url.pathname}${url.search}${url.hash}`,
  );
}

export function StickerCollection({
  collectionId,
}: {
  collectionId: StickerCollectionId;
}) {
  const collection = getStickerCollection(collectionId);
  const galleryRef = useRef<HTMLDivElement>(null);
  const collectionDialogRef = useRef<HTMLDialogElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const getAllButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const [sequenceOpen, setSequenceOpen] = useState(false);
  const [sequenceStart, setSequenceStart] = useState(0);
  const [resumeIndex, setResumeIndex] = useState<number | null>(null);
  const [collectionOpen, setCollectionOpen] = useState(false);

  const readProgress = useCallback(() => {
    try {
      const raw = sessionStorage.getItem(getStickerProgressKey(collection.id));
      if (!raw) {
        setResumeIndex(null);
        return null;
      }
      const progress = JSON.parse(raw) as {
        index?: number;
        complete?: boolean;
      };
      if (
        progress.complete ||
        typeof progress.index !== "number" ||
        progress.index < 0 ||
        progress.index >= collection.stickers.length
      ) {
        setResumeIndex(null);
        return null;
      }
      setResumeIndex(progress.index);
      return progress.index;
    } catch {
      setResumeIndex(null);
      return null;
    }
  }, [collection.id, collection.stickers.length]);

  const syncFromQuery = useCallback(() => {
    const query = readStickerQuery();
    const stickerIndex = collection.stickers.findIndex(
      (sticker) => getStickerId(collection, sticker) === query.sticker,
    );
    setActiveIndex(stickerIndex >= 0 ? stickerIndex : null);
    const matchesSequence = query.getAll && query.collection === collection.id;
    setSequenceOpen(matchesSequence);
    setCollectionOpen(stickerIndex >= 0 || matchesSequence);
    if (matchesSequence) {
      setSequenceStart(readProgress() ?? 0);
    }
  }, [collection, readProgress]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      readProgress();
      syncFromQuery();
    });
    window.addEventListener("popstate", syncFromQuery);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", syncFromQuery);
    };
  }, [readProgress, syncFromQuery]);

  const closeCollection = useCallback(() => {
    setCollectionOpen(false);
    setActiveIndex(null);
    setSequenceOpen(false);
    setHelpOpen(false);
    clearStickerQuery();
    window.requestAnimationFrame(() => exploreButtonRef.current?.focus());
  }, []);

  useModalDialog(
    collectionDialogRef,
    closeCollection,
    undefined,
    activeIndex !== null || sequenceOpen || helpOpen,
  );

  const moveViewer = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        const next =
          (current + direction + collection.stickers.length) %
          collection.stickers.length;
        updateCurrentStickerQuery(
          getStickerId(collection, collection.stickers[next]),
        );
        return next;
      });
    },
    [collection],
  );

  function openViewer(index: number) {
    setCollectionOpen(true);
    setActiveIndex(index);
    updateCurrentStickerQuery(
      getStickerId(collection, collection.stickers[index]),
    );
  }

  function closeViewer() {
    const index = activeIndex;
    setActiveIndex(null);
    clearStickerQuery();
    if (index !== null) {
      window.requestAnimationFrame(() =>
        (triggerRefs.current[index] ?? exploreButtonRef.current)?.focus(),
      );
    }
  }

  function openCollection() {
    setCollectionOpen(true);
    setActiveIndex(null);
  }

  function openSequence(start = resumeIndex ?? 0) {
    setSequenceStart(start);
    setSequenceOpen(true);
    updateCurrentCollectionQuery(collection.id);
  }

  function closeSequence() {
    setSequenceOpen(false);
    clearStickerQuery();
    readProgress();
    window.requestAnimationFrame(() => getAllButtonRef.current?.focus());
  }

  function reviewFromSequence(index: number) {
    setSequenceOpen(false);
    setActiveIndex(index);
    updateCurrentStickerQuery(
      getStickerId(collection, collection.stickers[index]),
    );
  }

  function updateMobileProgress(event: UIEvent<HTMLDivElement>) {
    const gallery = event.currentTarget;
    const cards = Array.from(
      gallery.querySelectorAll<HTMLElement>(".sticker-card"),
    );
    if (!cards.length) return;
    const nearest = cards.reduce(
      (best, card, index) => {
        const distance = Math.abs(card.offsetLeft - gallery.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    setMobileIndex(nearest.index);
  }

  function scrollGallery(direction: -1 | 1) {
    const gallery = galleryRef.current;
    const card = gallery?.querySelector<HTMLElement>(".sticker-card");
    if (!gallery || !card) return;
    const gap = Number.parseFloat(getComputedStyle(gallery).columnGap || "0");
    gallery.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  const phoneUrl =
    activeIndex !== null
      ? buildStickerLink(collection, collection.stickers[activeIndex])
      : sequenceOpen
        ? buildCollectionLink(collection.id)
        : buildStickerLink(collection, collection.stickers[0]);

  return (
    <>
      <StickerCollectionLauncher
        collectionId={collectionId}
        exploreRef={exploreButtonRef}
        onExplore={openCollection}
        onHelp={() => setHelpOpen(true)}
        onPreview={openViewer}
      />

      {collectionOpen && (
        <dialog
          ref={collectionDialogRef}
          className="sticker-dialog sticker-collection-dialog"
          aria-labelledby={collection.id + "-stickers-dialog-title"}
        >
          <div className="sticker-dialog-panel sticker-collection-dialog-panel">
            <div className="sticker-dialog-topbar">
              <span id={collection.id + "-stickers-dialog-title"}>
                {collection.title}
              </span>
              <button
                type="button"
                className="sticker-dialog-close"
                aria-label="Close sticker collection"
                onClick={closeCollection}
                data-autofocus
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <section
              className={
                "sticker-collection sticker-collection--" + collection.theme
              }
              aria-labelledby={collection.id + "-stickers-title"}
            >
              <div className="sticker-collection-heading">
                <div>
                  <p className="sticker-collection-eyebrow">Share a reminder</p>
                  <h4 id={collection.id + "-stickers-title"}>
                    {collection.title}
                  </h4>
                  <p>{collection.description}</p>
                </div>
                <div className="sticker-collection-actions">
                  <button
                    type="button"
                    className="sticker-help-trigger"
                    onClick={() => setHelpOpen(true)}
                  >
                    <HelpCircle /> How do I use these in WhatsApp?
                  </button>
                  <button
                    ref={getAllButtonRef}
                    type="button"
                    className="sticker-get-all"
                    onClick={() => openSequence()}
                  >
                    <Layers3 />{" "}
                    {resumeIndex === null
                      ? "Get all 10"
                      : "Resume at " + (resumeIndex + 1) + " of 10"}
                  </button>
                </div>
              </div>

              <div className="sticker-gallery-frame">
                <div
                  ref={galleryRef}
                  className="sticker-gallery"
                  role="region"
                  aria-label={collection.title + " gallery"}
                  tabIndex={0}
                  onScroll={updateMobileProgress}
                >
                  {collection.stickers.map((sticker, index) => (
                    <StickerCard
                      key={sticker.number}
                      sticker={sticker}
                      imageUrl={withStickerBasePath(sticker.publicWebp)}
                      onOpen={() => openViewer(index)}
                      triggerRef={(node) => {
                        triggerRefs.current[index] = node;
                      }}
                    />
                  ))}
                </div>
                <div className="sticker-gallery-controls">
                  <span aria-live="polite">
                    {mobileIndex + 1} of {collection.stickers.length}
                  </span>
                  <div>
                    <button
                      type="button"
                      aria-label="Previous stickers"
                      onClick={() => scrollGallery(-1)}
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      type="button"
                      aria-label="Next stickers"
                      onClick={() => scrollGallery(1)}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </dialog>
      )}

      {activeIndex !== null && (
        <StickerViewer
          collection={collection}
          index={activeIndex}
          inactive={helpOpen}
          onMove={moveViewer}
          onClose={closeViewer}
          onHelp={() => setHelpOpen(true)}
        />
      )}
      {sequenceOpen && (
        <StickerSaveSequence
          key={collection.id + "-" + sequenceStart}
          collection={collection}
          initialIndex={sequenceStart}
          inactive={helpOpen}
          onClose={closeSequence}
          onHelp={() => setHelpOpen(true)}
          onReview={reviewFromSequence}
        />
      )}
      {helpOpen && (
        <StickerHelpSheet
          phoneUrl={phoneUrl}
          onClose={() => setHelpOpen(false)}
        />
      )}
    </>
  );
}
