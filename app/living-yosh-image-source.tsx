"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.43";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(
  /\/$/,
  "",
);

export function LivingYoshImageSource() {
  useEffect(() => {
    const source = `${basePath}/living-yosh.webp?v=${BUILD_VERSION}`;

    const apply = () => {
      const image = document.querySelector<HTMLImageElement>(
        ".living-yosh-media img",
      );

      if (image && image.getAttribute("src") !== source) {
        image.src = source;
      }
    };

    apply();
    const frame = window.requestAnimationFrame(apply);
    const timer = window.setTimeout(apply, 100);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
