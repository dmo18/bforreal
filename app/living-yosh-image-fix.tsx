"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.26";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(
  /\/$/,
  "",
);

export function LivingYoshImageFix() {
  useEffect(() => {
    const apply = () => {
      const image = document.querySelector<HTMLImageElement>(
        ".living-yosh-media img",
      );

      if (image) {
        image.src = `${basePath}/living-yosh.jpg?v=${BUILD_VERSION}`;
      }
    };

    apply();
    const frame = window.requestAnimationFrame(apply);
    const timer = window.setTimeout(apply, 150);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
