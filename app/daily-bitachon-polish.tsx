"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.16";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(
  /\/$/,
  "",
);

export function DailyBitachonPolish() {
  useEffect(() => {
    const apply = () => {
      const feature = document.querySelector<HTMLElement>(
        ".daily-bitachon-feature",
      );
      if (!feature) return;

      let style = document.querySelector<HTMLStyleElement>(
        "style[data-daily-bitachon-photo]",
      );
      if (!style) {
        style = document.createElement("style");
        style.dataset.dailyBitachonPhoto = "true";
        style.textContent = `
          .daily-bitachon-feature {
            grid-template-columns: minmax(20rem, .9fr) minmax(0, 1.1fr) !important;
          }
          .daily-bitachon-media {
            display: grid !important;
            min-height: 0 !important;
            aspect-ratio: 3 / 2 !important;
            align-self: center !important;
            place-items: center !important;
            margin: clamp(1rem, 2.4vw, 2rem) !important;
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
            object-fit: contain !important;
            object-position: center !important;
            filter: none !important;
            transform: none !important;
          }
          @media (max-width: 920px) {
            .daily-bitachon-feature {
              grid-template-columns: 1fr !important;
            }
            .daily-bitachon-media {
              min-height: 0 !important;
              aspect-ratio: 3 / 2 !important;
              margin: 1rem 1rem 0 !important;
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
        portrait.alt = "Michael Safdie outside Madison Time";
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
