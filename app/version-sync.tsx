"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.25";

export function VersionSync() {
  useEffect(() => {
    const sync = () => {
      const footerVersion = Array.from(
        document.querySelectorAll<HTMLElement>(".footer-meta span"),
      ).find((node) => node.textContent?.startsWith("Version "));

      if (footerVersion) footerVersion.textContent = `Version ${BUILD_VERSION}`;
    };

    const frame = window.requestAnimationFrame(sync);
    const timer = window.setTimeout(sync, 100);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
