"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.12";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(/\/$/, "");

export function ResourceFeatureStabilizer() {
  useEffect(() => {
    let frame = 0;
    let attempts = 0;

    const organize = () => {
      const resourceGrid = document.querySelector<HTMLElement>(".resource-grid");
      const podcast = document.querySelector<HTMLElement>(".podcast-feature-mount");
      const daily = document.querySelector<HTMLElement>(".daily-bitachon-feature-mount");
      const parent = resourceGrid?.parentElement;

      if (!resourceGrid || !podcast || !daily || !parent) {
        if (attempts < 180) {
          attempts += 1;
          frame = window.requestAnimationFrame(organize);
        }
        return;
      }

      const children = Array.from(parent.children);
      const podcastIndex = children.indexOf(podcast);
      const dailyIndex = children.indexOf(daily);
      const gridIndex = children.indexOf(resourceGrid);

      if (!(podcastIndex < dailyIndex && dailyIndex < gridIndex)) {
        parent.insertBefore(podcast, resourceGrid);
        parent.insertBefore(daily, resourceGrid);
      }

      podcast.style.marginTop = "clamp(2.4rem, 4vw, 3.6rem)";
      daily.style.marginTop = "clamp(1.25rem, 2.6vw, 2rem)";

      const portrait = daily.querySelector<HTMLImageElement>(
        'img[alt="Mr. Michael Safdie"]',
      );
      const portraitUrl = `${basePath}/michael-safdie.svg?v=${BUILD_VERSION}`;

      if (portrait && portrait.getAttribute("src") !== portraitUrl) {
        portrait.src = portraitUrl;
        portrait.loading = "eager";
        portrait.decoding = "async";
      }
    };

    frame = window.requestAnimationFrame(organize);
    const timer = window.setTimeout(organize, 150);
    const observer = new MutationObserver(organize);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
