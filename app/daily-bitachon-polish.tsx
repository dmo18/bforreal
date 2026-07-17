"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.18";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(
  /\/$/,
  "",
);

export function DailyBitachonPolish() {
  useEffect(() => {
    const apply = () => {
      document
        .querySelector<HTMLElement>(".podcast-feature-note")
        ?.remove();

      const feature = document.querySelector<HTMLElement>(
        ".daily-bitachon-feature",
      );
      if (!feature) return;

      const bio = feature.querySelector<HTMLElement>(".daily-bitachon-bio");
      if (bio && bio.dataset.honorificApplied !== "true") {
        const walker = document.createTreeWalker(bio, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();

        while (node) {
          if (node.textContent?.includes("Michael Safdie is")) {
            node.textContent = node.textContent.replace(
              "Michael Safdie is",
              "Mr. Michael Safdie is",
            );
            bio.dataset.honorificApplied = "true";
            break;
          }
          node = walker.nextNode();
        }
      }

      let style = document.querySelector<HTMLStyleElement>(
        "style[data-daily-bitachon-photo]",
      );
      if (!style) {
        style = document.createElement("style");
        style.dataset.dailyBitachonPhoto = "true";
        style.textContent = `
          .daily-bitachon-feature {
            display: grid !important;
            grid-template-columns: minmax(21rem, .84fr) minmax(0, 1.16fr) !important;
            grid-template-rows: auto auto auto auto auto auto !important;
            column-gap: clamp(2rem, 4vw, 4.5rem) !important;
            row-gap: 0 !important;
            align-items: start !important;
            padding: clamp(1.25rem, 2vw, 2rem) !important;
          }
          .daily-bitachon-copy {
            display: contents !important;
          }
          .daily-bitachon-media {
            grid-column: 1 !important;
            grid-row: 1 / span 3 !important;
            display: grid !important;
            width: 100% !important;
            min-height: 0 !important;
            aspect-ratio: 3 / 2 !important;
            align-self: center !important;
            place-items: center !important;
            margin: 0 !important;
            overflow: hidden !important;
            border: 1px solid rgba(157, 228, 204, .16) !important;
            border-radius: clamp(1rem, 1.8vw, 1.45rem) !important;
            background: #09141c !important;
            box-shadow: 0 24px 60px rgba(0, 0, 0, .3) !important;
          }
          .daily-bitachon-media::after {
            display: none !important;
          }
          .daily-bitachon-media img {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            object-fit: cover !important;
            object-position: center 42% !important;
            filter: none !important;
            transform: none !important;
          }
          .daily-bitachon-kicker {
            grid-column: 2 !important;
            grid-row: 1 !important;
            margin: clamp(.5rem, 1vw, 1rem) 0 0 !important;
          }
          .daily-bitachon-feature h3 {
            grid-column: 2 !important;
            grid-row: 2 !important;
          }
          .daily-bitachon-bio {
            grid-column: 2 !important;
            grid-row: 3 !important;
            margin-bottom: 0 !important;
          }
          .daily-bitachon-facts {
            grid-column: 1 / -1 !important;
            grid-row: 4 !important;
            gap: .75rem !important;
            margin-top: clamp(1.7rem, 3vw, 2.5rem) !important;
          }
          .daily-bitachon-book {
            grid-column: 1 / -1 !important;
            grid-row: 5 !important;
            margin-top: 1rem !important;
          }
          .daily-bitachon-actions {
            grid-column: 1 / -1 !important;
            grid-row: 6 !important;
            justify-content: flex-end !important;
            margin-top: 1.2rem !important;
          }
          @media (max-width: 920px) {
            .daily-bitachon-feature {
              grid-template-columns: 1fr !important;
              grid-template-rows: auto !important;
              gap: 0 !important;
              padding: 0 !important;
            }
            .daily-bitachon-copy {
              display: flex !important;
              flex-direction: column !important;
              padding: 1.6rem 1.2rem 1.8rem !important;
            }
            .daily-bitachon-media {
              grid-column: auto !important;
              grid-row: auto !important;
              width: auto !important;
              min-height: 0 !important;
              aspect-ratio: 3 / 2 !important;
              align-self: auto !important;
              margin: 1rem 1rem 0 !important;
            }
            .daily-bitachon-kicker,
            .daily-bitachon-feature h3,
            .daily-bitachon-bio,
            .daily-bitachon-facts,
            .daily-bitachon-book,
            .daily-bitachon-actions {
              grid-column: auto !important;
              grid-row: auto !important;
            }
            .daily-bitachon-actions {
              justify-content: stretch !important;
            }
          }
        `;
        document.head.appendChild(style);
      }

      const portrait = feature.querySelector<HTMLImageElement>(
        'img[alt*="Michael Safdie"]',
      );
      if (portrait) {
        portrait.src = `${basePath}/michael-safdie-madison.svg?v=${BUILD_VERSION}`;
        portrait.alt = "Mr. Michael Safdie outside Madison Time";
        portrait.decoding = "async";
      }

      feature
        .querySelector<HTMLElement>(".daily-bitachon-signature")
        ?.remove();

      const websiteLink = Array.from(
        feature.querySelectorAll<HTMLAnchorElement>("a"),
      ).find((link) => link.href === "https://dailybitachon.com/");

      if (websiteLink) {
        websiteLink.querySelector("svg")?.remove();
        let favicon = websiteLink.querySelector<HTMLImageElement>("img");
        if (!favicon) {
          favicon = document.createElement("img");
          favicon.alt = "";
          favicon.width = 18;
          favicon.height = 18;
          favicon.loading = "eager";
          favicon.decoding = "async";
          websiteLink.prepend(favicon);
        }
        favicon.src = `https://www.google.com/s2/favicons?domain_url=https://dailybitachon.com&sz=64&v=${BUILD_VERSION}`;
        favicon.style.width = "1.08rem";
        favicon.style.height = "1.08rem";
        favicon.style.borderRadius = ".22rem";
        favicon.style.objectFit = "contain";
      }
    };

    apply();
    const frame = window.requestAnimationFrame(apply);
    const timer = window.setTimeout(apply, 250);
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      observer.disconnect();
      document
        .querySelector<HTMLStyleElement>("style[data-daily-bitachon-photo]")
        ?.remove();
    };
  }, []);

  return null;
}
