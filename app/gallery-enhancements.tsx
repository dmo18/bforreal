"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ActiveGraphic {
  src: string;
  alt: string;
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

  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".inspiration-image-link"),
    );

    for (const link of links) {
      link.dataset.fullscreenSrc = link.href;
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
      if (graphic) setActiveGraphic(graphic);
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
    };
  }, [activeGraphic]);

  return (
    <>
      <style>{`
        .inspiration-gallery {
          display: grid !important;
          grid-auto-flow: column !important;
          grid-template-columns: none !important;
          grid-template-rows: minmax(0, 1fr) !important;
          grid-auto-columns: minmax(0, 1fr) !important;
          align-items: stretch !important;
          gap: clamp(0.45rem, 0.9vw, 1rem) !important;
          overflow-x: visible !important;
        }

        .inspiration-graphic-reveal,
        .inspiration-graphic-card {
          min-width: 0;
          height: 100%;
        }

        .inspiration-graphic-card {
          display: flex;
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
          aspect-ratio: 1122 / 1402;
          object-fit: cover;
        }

        .inspiration-graphic-actions {
          min-height: clamp(2.65rem, 4.3vw, 4rem);
          margin-top: auto;
          gap: clamp(0.3rem, 0.65vw, 0.75rem) !important;
          padding: clamp(0.42rem, 0.8vw, 0.9rem) !important;
        }

        .inspiration-graphic-actions h3 {
          min-width: 0;
          font-size: clamp(0.46rem, 0.57vw, 0.72rem) !important;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }

        .inspiration-graphic-actions button {
          min-height: clamp(1.75rem, 2.4vw, 2.35rem) !important;
          flex: 0 0 auto;
          gap: clamp(0.2rem, 0.35vw, 0.45rem) !important;
          padding: 0 clamp(0.38rem, 0.62vw, 0.8rem) !important;
          font-size: clamp(0.47rem, 0.52vw, 0.66rem) !important;
        }

        .inspiration-graphic-actions button svg {
          width: clamp(0.72rem, 1vw, 1rem);
          height: clamp(0.72rem, 1vw, 1rem);
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
            grid-auto-columns: min(74vw, 19rem) !important;
            overflow-x: auto !important;
            padding: 0 0 1rem !important;
            scroll-padding-inline: 0.15rem;
            scroll-snap-type: x mandatory;
            overscroll-behavior-inline: contain;
            scrollbar-width: thin;
            -webkit-overflow-scrolling: touch;
          }

          .inspiration-graphic-reveal {
            scroll-snap-align: start;
          }

          .inspiration-graphic-actions {
            min-height: 3.6rem;
            align-items: center !important;
            flex-direction: row !important;
            padding: 0.75rem !important;
          }

          .inspiration-graphic-actions h3 {
            font-size: 0.68rem !important;
          }

          .inspiration-graphic-actions button {
            min-height: 2.25rem !important;
            padding: 0 0.72rem !important;
            font-size: 0.62rem !important;
          }

          .inspiration-gallery::-webkit-scrollbar {
            height: 0.4rem;
          }

          .inspiration-gallery::-webkit-scrollbar-thumb {
            border-radius: 999px;
            background: rgba(225, 195, 132, 0.42);
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
