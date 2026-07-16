"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";

interface ActiveGraphic {
  src: string;
  alt: string;
}

function addCacheVersion(source: string) {
  const url = new URL(source, window.location.href);
  url.searchParams.set("v", siteConfig.version);
  return `${url.pathname}${url.search}${url.hash}`;
}

function getGraphic(link: HTMLElement): ActiveGraphic | null {
  const src = link.dataset.fullscreenSrc;
  if (!src) return null;

  const image = link.querySelector<HTMLImageElement>("img");

  return {
    src,
    alt:
      image?.alt ||
      link.getAttribute("aria-label") ||
      "Bitachon For Real inspiration graphic",
  };
}

export function GalleryEnhancements() {
  const [activeGraphic, setActiveGraphic] = useState<ActiveGraphic | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".inspiration-image-link"),
    );

    for (const link of links) {
      const image = link.querySelector<HTMLImageElement>("img");
      const source = link.getAttribute("href") || image?.getAttribute("src");
      if (!source) continue;

      const versionedSource = addCacheVersion(source);
      link.dataset.fullscreenSrc = versionedSource;

      if (image) {
        image.removeAttribute("srcset");
        image.src = versionedSource;
      }

      link.removeAttribute("href");
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("role", "button");
      link.setAttribute("tabindex", "0");
      link.setAttribute("aria-haspopup", "dialog");
    }

    function openFromTarget(target: EventTarget | null) {
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLElement>(".inspiration-image-link");
      if (!link) return;

      const graphic = getGraphic(link);
      if (!graphic) return;

      triggerRef.current = link;
      setActiveGraphic(graphic);
    }

    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".inspiration-image-link")) return;

      event.preventDefault();
      openFromTarget(event.target);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveGraphic(null);
        return;
      }

      if (event.key !== "Enter" && event.key !== " ") return;
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".inspiration-image-link")) return;

      event.preventDefault();
      openFromTarget(event.target);
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!activeGraphic) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    };
  }, [activeGraphic]);

  return (
    <>
      <style>{`
        .inspiration-gallery {
          display: grid !important;
          grid-auto-flow: column !important;
          grid-template-columns: none !important;
          grid-template-rows: auto !important;
          grid-auto-columns: clamp(14rem, 19vw, 18rem) !important;
          align-items: start !important;
          gap: clamp(0.75rem, 1.15vw, 1.15rem) !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          padding: 0 0 1rem !important;
          scroll-padding-inline: 0.15rem;
          scroll-snap-type: x proximity;
          overscroll-behavior-inline: contain;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }

        .inspiration-graphic-reveal {
          min-width: 0;
          align-self: start;
          scroll-snap-align: start;
        }

        .inspiration-graphic-card {
          display: flex;
          min-width: 0;
          height: auto !important;
          min-height: 0 !important;
          flex-direction: column;
        }

        .inspiration-image-link {
          cursor: zoom-in;
        }

        .inspiration-image-link:focus-visible {
          outline: 2px solid var(--gold-bright);
          outline-offset: -4px;
        }

        .inspiration-image-link img {
          display: block;
          width: 100%;
          height: auto !important;
          aspect-ratio: 1122 / 1402;
          object-fit: cover;
        }

        .inspiration-graphic-actions {
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) auto;
          min-height: 4.15rem;
          align-items: center !important;
          gap: 0.7rem !important;
          margin-top: 0 !important;
          padding: 0.72rem !important;
        }

        .inspiration-graphic-actions h3 {
          display: -webkit-box;
          min-width: 0;
          margin: 0;
          overflow: hidden;
          font-size: clamp(0.58rem, 0.72vw, 0.72rem) !important;
          line-height: 1.3;
          overflow-wrap: normal !important;
          word-break: normal !important;
          white-space: normal;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .inspiration-graphic-actions button {
          min-height: 2.25rem !important;
          flex: 0 0 auto;
          gap: 0.38rem !important;
          padding: 0 0.72rem !important;
          font-size: 0.62rem !important;
          white-space: nowrap;
        }

        .inspiration-graphic-actions button svg {
          width: 0.95rem;
          height: 0.95rem;
        }

        .inspiration-gallery::-webkit-scrollbar {
          height: 0.42rem;
        }

        .inspiration-gallery::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(225, 195, 132, 0.42);
        }

        .graphic-lightbox {
          position: fixed;
          z-index: 1000;
          inset: 0;
          display: grid;
          place-items: center;
          padding: clamp(0.75rem, 3vw, 2rem);
          background: rgba(3, 7, 12, 0.94);
          backdrop-filter: blur(18px);
        }

        .graphic-lightbox-media {
          position: relative;
          width: min(92vw, 74rem);
          height: min(88vh, 74rem);
        }

        .graphic-lightbox-image {
          object-fit: contain;
        }

        .graphic-lightbox-close {
          position: absolute;
          z-index: 1;
          top: max(0.75rem, env(safe-area-inset-top));
          right: max(0.75rem, env(safe-area-inset-right));
          min-height: 2.75rem;
          padding: 0 1rem;
          border: 1px solid rgba(244, 239, 227, 0.28);
          border-radius: 999px;
          background: rgba(7, 11, 18, 0.78);
          color: var(--cream);
          cursor: pointer;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .graphic-lightbox-caption {
          position: absolute;
          right: 1rem;
          bottom: max(0.75rem, env(safe-area-inset-bottom));
          left: 1rem;
          color: var(--cream-soft);
          font-size: clamp(0.75rem, 1.4vw, 1rem);
          text-align: center;
        }

        @media (max-width: 900px) {
          .inspiration-gallery {
            grid-auto-columns: min(78vw, 19rem) !important;
            scroll-snap-type: x mandatory;
          }

          .inspiration-graphic-actions {
            min-height: 4rem;
            padding: 0.7rem !important;
          }

          .inspiration-graphic-actions h3 {
            font-size: 0.68rem !important;
          }

          .graphic-lightbox {
            padding: 0.5rem;
          }

          .graphic-lightbox-media {
            width: 96vw;
            height: 88vh;
          }
        }
      `}</style>

      {activeGraphic && (
        <div
          className="graphic-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeGraphic.alt}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveGraphic(null);
          }}
        >
          <button
            ref={closeButtonRef}
            className="graphic-lightbox-close"
            type="button"
            onClick={() => setActiveGraphic(null)}
          >
            Close
          </button>
          <div className="graphic-lightbox-media">
            <Image
              className="graphic-lightbox-image"
              src={activeGraphic.src}
              alt={activeGraphic.alt}
              fill
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
          <p className="graphic-lightbox-caption">{activeGraphic.alt}</p>
        </div>
      )}
    </>
  );
}
