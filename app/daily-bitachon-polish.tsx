"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.15";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(/\/$/, "");

export function DailyBitachonPolish() {
  useEffect(() => {
    const apply = () => {
      const feature = document.querySelector<HTMLElement>(".daily-bitachon-feature");
      if (!feature) return;

      const portrait = feature.querySelector<HTMLImageElement>('img[alt*="Michael Safdie"]');
      if (portrait) {
        portrait.src = `${basePath}/michael-safdie-real.webp?v=${BUILD_VERSION}`;
        portrait.alt = "Michael Safdie outside Madison Time";
        portrait.style.objectFit = "cover";
        portrait.style.objectPosition = "center center";
      }

      feature.querySelector<HTMLElement>(".daily-bitachon-signature")?.remove();

      const websiteLink = Array.from(feature.querySelectorAll<HTMLAnchorElement>("a")).find(
        (link) => link.href === "https://dailybitachon.com/",
      );

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
        favicon.style.borderRadius = "0.22rem";
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
    };
  }, []);

  return null;
}
