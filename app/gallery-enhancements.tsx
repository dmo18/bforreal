"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const BUILD_VERSION = "1.0.60";

type Graphic = {
  src: string;
  alt: string;
  trigger: HTMLElement;
};

function versioned(source: string) {
  const url = new URL(source, window.location.href);
  url.searchParams.set("v", BUILD_VERSION);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function GalleryEnhancements() {
  const [graphics, setGraphics] = useState<Graphic[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

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
    const gallery = document.querySelector<HTMLElement>(".inspiration-gallery");
    if (!gallery) return;

    const shell = gallery.parentElement;
    const links = Array.from(
      gallery.querySelectorAll<HTMLElement>(".inspiration-image-link"),
    );

    gallery.setAttribute("role", "region");
    gallery.setAttribute("aria-label", "Bitachon inspiration graphics");
    gallery.setAttribute("tabindex", "0");

    const items: Graphic[] = links.flatMap((link) => {
      const image = link.querySelector<HTMLImageElement>("img");
      const source = link.getAttribute("href") || image?.getAttribute("src");
      if (!source) return [];

      const src = versioned(source);
      const alt =
        image?.alt ||
        link.getAttribute("aria-label") ||
        "Bitachon For Real inspiration graphic";

      if (image) {
        image.removeAttribute("srcset");
        image.src = src;
      }

      link.removeAttribute("href");
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("role", "button");
      link.setAttribute("tabindex", "0");
      link.setAttribute("aria-haspopup", "dialog");

      return [{ src, alt, trigger: link }];
    });

    const graphicsFrame = window.requestAnimationFrame(() =>
      setGraphics(items),
    );

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
    shell?.insertBefore(tools, gallery.nextSibling);

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
      const distance = card
        ? card.offsetWidth + gap
        : gallery.clientWidth * 0.8;
      gallery.scrollBy({ left: direction * distance, behavior: "smooth" });
    };

    const updateControls = () => {
      const max = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      const ratio = max === 0 ? 1 : gallery.scrollLeft / max;
      if (progress)
        progress.style.width = `${max === 0 ? 100 : 18 + ratio * 82}%`;
      if (previousButton) previousButton.disabled = gallery.scrollLeft <= 2;
      if (nextButton) nextButton.disabled = gallery.scrollLeft >= max - 2;
    };

    const onPrevious = () => scrollByCard(-1);
    const onNext = () => scrollByCard(1);
    previousButton?.addEventListener("click", onPrevious);
    nextButton?.addEventListener("click", onNext);
    gallery.addEventListener("scroll", updateControls, { passive: true });

    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(gallery);
    updateControls();

    const openFromTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLElement>(".inspiration-image-link");
      if (!link) return;
      const index = links.indexOf(link);
      if (index >= 0) setActiveIndex(index);
    };

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".inspiration-image-link")) return;
      event.preventDefault();
      openFromTarget(event.target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        moveLightbox(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        moveLightbox(1);
        return;
      }
      if (event.key !== "Enter" && event.key !== " ") return;
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".inspiration-image-link")) return;
      event.preventDefault();
      openFromTarget(event.target);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    const footerVersion = Array.from(
      document.querySelectorAll(".footer-meta span"),
    ).find((node) => node.textContent?.startsWith("Version "));
    if (footerVersion) footerVersion.textContent = `Version ${BUILD_VERSION}`;
    window.cancelAnimationFrame(graphicsFrame);

    return () => {
      previousButton?.removeEventListener("click", onPrevious);
      nextButton?.removeEventListener("click", onNext);
      gallery.removeEventListener("scroll", updateControls);
      resizeObserver.disconnect();
      tools.remove();
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveLightbox]);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      graphics[activeIndex]?.trigger.focus();
    };
  }, [activeIndex, graphics]);

  const activeGraphic = activeIndex === null ? null : graphics[activeIndex];

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
          gap: clamp(.9rem, 1.4vw, 1.35rem) !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          padding: .4rem 0 1.2rem !important;
          scroll-snap-type: x proximity;
          scrollbar-width: none;
          touch-action: pan-x pan-y pinch-zoom;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: none;
          mask-image: linear-gradient(to right, transparent 0, black 1rem, black calc(100% - 1rem), transparent 100%);
        }
        .inspiration-gallery::-webkit-scrollbar { display: none; width: 0; height: 0; }
        .inspiration-graphic-reveal { min-width: 0; scroll-snap-align: start; }
        .inspiration-graphic-card { height: auto !important; min-height: 0 !important; }
        .inspiration-image-link { cursor: zoom-in; }
        .inspiration-image-link img { display: block; width: 100%; height: auto !important; aspect-ratio: 1122/1402; object-fit: cover; }
        .inspiration-carousel-tools {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          margin-top: .7rem;
        }
        .inspiration-carousel-hint { color: var(--muted); font-size: .75rem; letter-spacing: .04em; }
        .inspiration-carousel-actions { display: flex; align-items: center; gap: .65rem; }
        .inspiration-carousel-arrow,
        .graphic-lightbox-arrow,
        .graphic-lightbox-close {
          display: grid;
          place-items: center;
          border: 1px solid rgba(225,195,132,.3);
          border-radius: 999px;
          background: rgba(12,20,31,.76);
          color: var(--cream);
          cursor: pointer;
          backdrop-filter: blur(16px) saturate(130%);
        }
        .inspiration-carousel-arrow { width: 2.7rem; height: 2.7rem; font-size: 1.15rem; }
        .inspiration-carousel-arrow:disabled { cursor: default; opacity: .28; }
        .inspiration-carousel-progress { width: clamp(4.5rem,8vw,7rem); height: 2px; overflow: hidden; border-radius: 999px; background: rgba(244,239,227,.14); }
        .inspiration-carousel-progress span { display: block; width: 18%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, rgba(225,195,132,.72), rgba(255,226,167,.96)); transition: width 160ms ease-out; }
        .graphic-lightbox {
          position: fixed;
          z-index: 1000;
          inset: 0;
          display: grid;
          place-items: center;
          padding: clamp(.75rem,3vw,2rem);
          background: rgba(3,7,12,.95);
          backdrop-filter: blur(20px);
          touch-action: pan-y;
        }
        .graphic-lightbox-media { position: relative; width: min(88vw,64rem); height: min(86vh,64rem); }
        .graphic-lightbox-image { object-fit: contain; }
        .graphic-lightbox-close { position: absolute; z-index: 2; top: max(.75rem,env(safe-area-inset-top)); right: max(.75rem,env(safe-area-inset-right)); min-height: 2.75rem; padding: 0 1rem; font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .graphic-lightbox-arrow { position: absolute; z-index: 2; top: 50%; width: 3.2rem; height: 3.2rem; transform: translateY(-50%); font-size: 1.35rem; }
        .graphic-lightbox-arrow.previous { left: max(1rem,env(safe-area-inset-left)); }
        .graphic-lightbox-arrow.next { right: max(1rem,env(safe-area-inset-right)); }
        .graphic-lightbox-caption { position: absolute; right: 1rem; bottom: max(.75rem,env(safe-area-inset-bottom)); left: 1rem; color: var(--cream-soft); font-size: clamp(.75rem,1.4vw,1rem); text-align: center; }
        @media (max-width: 700px) {
          .inspiration-gallery { grid-auto-columns: min(84vw,20rem) !important; gap: .9rem !important; margin-inline: -.35rem; padding-inline: .35rem !important; }
          .inspiration-carousel-tools { align-items: flex-end; }
          .inspiration-carousel-arrow { display: none; }
          .graphic-lightbox { padding: .5rem; }
          .graphic-lightbox-media { width: 96vw; height: 86vh; }
          .graphic-lightbox-arrow { display: none; }
        }
      `}</style>

      {activeGraphic && (
        <div
          className="graphic-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeGraphic.alt}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (start === null || end === undefined) return;
            const delta = end - start;
            if (Math.abs(delta) < 45) return;
            moveLightbox(delta > 0 ? -1 : 1);
          }}
        >
          <button
            ref={closeButtonRef}
            className="graphic-lightbox-close"
            type="button"
            onClick={() => setActiveIndex(null)}
          >
            Close
          </button>
          <button
            className="graphic-lightbox-arrow previous"
            type="button"
            aria-label="Previous graphic"
            onClick={() => moveLightbox(-1)}
          >
            ←
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
          <button
            className="graphic-lightbox-arrow next"
            type="button"
            aria-label="Next graphic"
            onClick={() => moveLightbox(1)}
          >
            →
          </button>
          <p className="graphic-lightbox-caption">{activeGraphic.alt}</p>
        </div>
      )}
    </>
  );
}
