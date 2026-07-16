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
    const gallery = document.querySelector<HTMLElement>(".inspiration-gallery");
    if (!gallery) return;

    const shell = gallery.parentElement;
    const links = Array.from(
      gallery.querySelectorAll<HTMLAnchorElement>(".inspiration-image-link"),
    );

    gallery.setAttribute("role", "region");
    gallery.setAttribute("aria-label", "Bitachon inspiration graphics");
    gallery.setAttribute("tabindex", "0");

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

    const tools = document.createElement("div");
    tools.className = "inspiration-carousel-tools";
    tools.innerHTML = `
      <p class="inspiration-carousel-hint">Swipe or use the arrows to explore</p>
      <div class="inspiration-carousel-actions">
        <button type="button" class="inspiration-carousel-arrow" data-direction="previous" aria-label="Previous graphics">&#8592;</button>
        <div class="inspiration-carousel-progress" aria-hidden="true"><span></span></div>
        <button type="button" class="inspiration-carousel-arrow" data-direction="next" aria-label="Next graphics">&#8594;</button>
      </div>
    `;

    shell?.insertBefore(tools, gallery);

    const previousButton = tools.querySelector<HTMLButtonElement>(
      '[data-direction="previous"]',
    );
    const nextButton = tools.querySelector<HTMLButtonElement>(
      '[data-direction="next"]',
    );
    const progress = tools.querySelector<HTMLElement>(
      ".inspiration-carousel-progress span",
    );

    const scrollByCard = (direction: -1 | 1) => {
      const card = gallery.querySelector<HTMLElement>(
        ".inspiration-graphic-reveal",
      );
      const gap = Number.parseFloat(getComputedStyle(gallery).columnGap || "0");
      const distance = card ? card.offsetWidth + gap : gallery.clientWidth * 0.8;

      gallery.scrollBy({
        left: direction * distance,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    };

    const updateControls = () => {
      const maxScroll = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      const ratio = maxScroll === 0 ? 1 : gallery.scrollLeft / maxScroll;
      const progressWidth = maxScroll === 0 ? 100 : 18 + ratio * 82;

      if (progress) progress.style.width = `${progressWidth}%`;
      if (previousButton) previousButton.disabled = gallery.scrollLeft <= 2;
      if (nextButton) nextButton.disabled = gallery.scrollLeft >= maxScroll - 2;
    };

    const handlePrevious = () => scrollByCard(-1);
    const handleNext = () => scrollByCard(1);

    previousButton?.addEventListener("click", handlePrevious);
    nextButton?.addEventListener("click", handleNext);
    gallery.addEventListener("scroll", updateControls, { passive: true });

    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(gallery);
    updateControls();

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
      previousButton?.removeEventListener("click", handlePrevious);
      nextButton?.removeEventListener("click", handleNext);
      gallery.removeEventListener("scroll", updateControls);
      resizeObserver.disconnect();
      tools.remove();
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
          grid-auto-columns: clamp(16rem, 23vw, 20rem) !important;
          align-items: start !important;
          gap: clamp(0.9rem, 1.4vw, 1.35rem) !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          padding: 0.4rem 0 1.2rem !important;
          scroll-padding-inline: 0.25rem;
          scroll-snap-type: x mandatory;
          overscroll-behavior-inline: contain;
          scrollbar-width: none;
          touch-action: pan-x pinch-zoom;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: none;
          mask-image: linear-gradient(to right, transparent 0, black 1rem, black calc(100% - 1rem), transparent 100%);
        }

        .inspiration-gallery::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        .inspiration-carousel-tools {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          margin-top: clamp(2rem, 3.5vw, 3rem);
          margin-bottom: 0.7rem;
        }

        .inspiration-carousel-hint {
          color: color-mix(in srgb, var(--muted) 88%, transparent);
          font-size: 0.75rem;
          letter-spacing: 0.04em;
        }

        .inspiration-carousel-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .inspiration-carousel-arrow {
          display: grid;
          width: 2.7rem;
          height: 2.7rem;
          place-items: center;
          border: 1px solid rgba(225, 195, 132, 0.28);
          border-radius: 999px;
          background: rgba(12, 20, 31, 0.7);
          box-shadow: 0 12px 34px rgba(0, 0, 0, 0.18);
          color: var(--cream);
          cursor: pointer;
          font-size: 1.15rem;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, opacity 180ms ease;
          backdrop-filter: blur(16px) saturate(130%);
        }

        .inspiration-carousel-arrow:hover:not(:disabled) {
          border-color: rgba(225, 195, 132, 0.58);
          background: rgba(225, 195, 132, 0.14);
          transform: translateY(-2px);
        }

        .inspiration-carousel-arrow:disabled {
          cursor: default;
          opacity: 0.28;
        }

        .inspiration-carousel-progress {
          width: clamp(4.5rem, 8vw, 7rem);
          height: 2px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(244, 239, 227, 0.14);
        }

        .inspiration-carousel-progress span {
          display: block;
          width: 18%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(225, 195, 132, 0.72), rgba(255, 226, 167, 0.96));
          transition: width 160ms ease-out;
        }

        .inspiration-graphic-reveal {
          min-width: 0;
          align-self: start;
          scroll-snap-align: start;
          scroll-snap-stop: normal;
        }

        .inspiration-graphic-card {
          display: flex;
          min-width: 0;
          height: auto !important;
          min-height: 0 !important;
          flex-direction: column;
          border-color: rgba(225, 195, 132, 0.18) !important;
          box-shadow: 0 22px 58px rgba(0, 0, 0, 0.24) !important;
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }

        .inspiration-graphic-card:hover {
          border-color: rgba(225, 195, 132, 0.36) !important;
          box-shadow: 0 28px 78px rgba(0, 0, 0, 0.32) !important;
          transform: translateY(-4px);
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
          min-height: 4.2rem;
          align-items: center !important;
          gap: 0.8rem !important;
          margin-top: 0 !important;
          padding: 0.8rem 0.85rem !important;
        }

        .inspiration-graphic-actions h3 {
          display: -webkit-box;
          min-width: 0;
          margin: 0;
          overflow: hidden;
          font-size: 0.68rem !important;
          line-height: 1.3;
          letter-spacing: 0.06em !important;
          overflow-wrap: normal !important;
          word-break: normal !important;
          white-space: normal;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .inspiration-graphic-actions button {
          min-height: 2.35rem !important;
          flex: 0 0 auto;
          gap: 0.4rem !important;
          padding: 0 0.78rem !important;
          font-size: 0.62rem !important;
          white-space: nowrap;
        }

        .graphic-lightbox {
          position: fixed;
          z-index: 1000;
          inset: 0;
          display: grid;
          place-items: center;
          padding: clamp(0.75rem, 3vw, 2rem);
          background: rgba(3, 7, 12, 0.94);
          backdrop-filter: blur(20px);
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

        @media (max-width: 700px) {
          .inspiration-carousel-tools {
            align-items: flex-end;
            margin-top: 1.75rem;
          }

          .inspiration-carousel-hint {
            max-width: 15rem;
            font-size: 0.72rem;
          }

          .inspiration-carousel-arrow {
            display: none;
          }

          .inspiration-carousel-progress {
            width: 4.5rem;
          }

          .inspiration-gallery {
            grid-auto-columns: min(84vw, 20rem) !important;
            gap: 0.9rem !important;
            margin-inline: -0.35rem;
            padding-inline: 0.35rem !important;
            mask-image: linear-gradient(to right, transparent 0, black 0.45rem, black calc(100% - 0.45rem), transparent 100%);
          }

          .inspiration-graphic-card:hover {
            transform: none;
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
