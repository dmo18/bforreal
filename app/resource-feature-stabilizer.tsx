"use client";

import { useEffect } from "react";

export function ResourceFeatureStabilizer() {
  useEffect(() => {
    let frame = 0;
    let attempts = 0;

    const organize = () => {
      const resourceSection =
        document.querySelector<HTMLElement>("section.resources");
      const understandSection =
        document.querySelector<HTMLElement>("section.understand");
      const resourceGrid =
        document.querySelector<HTMLElement>(".resource-grid");
      const podcast = document.querySelector<HTMLElement>(
        ".podcast-feature-mount",
      );
      const living = document.querySelector<HTMLElement>(
        ".living-yosh-feature-mount",
      );
      const daily = document.querySelector<HTMLElement>(
        ".daily-bitachon-feature-mount",
      );
      const parent = resourceGrid?.parentElement;

      if (
        !resourceSection ||
        !understandSection ||
        !resourceGrid ||
        !podcast ||
        !living ||
        !daily ||
        !parent
      ) {
        if (attempts < 180) {
          attempts += 1;
          frame = window.requestAnimationFrame(organize);
        }
        return;
      }

      if (resourceSection.nextElementSibling !== understandSection) {
        understandSection.parentElement?.insertBefore(
          resourceSection,
          understandSection,
        );
      }

      const children = Array.from(parent.children);
      const podcastIndex = children.indexOf(podcast);
      const livingIndex = children.indexOf(living);
      const dailyIndex = children.indexOf(daily);
      const gridIndex = children.indexOf(resourceGrid);

      if (
        !(
          podcastIndex < dailyIndex &&
          dailyIndex < livingIndex &&
          livingIndex < gridIndex
        )
      ) {
        parent.insertBefore(podcast, resourceGrid);
        parent.insertBefore(daily, resourceGrid);
        parent.insertBefore(living, resourceGrid);
      }

      const setMarginTop = (element: HTMLElement, value: string) => {
        if (element.style.marginTop !== value) {
          element.style.marginTop = value;
        }
      };

      setMarginTop(podcast, "clamp(2.4rem, 4vw, 3.6rem)");
      setMarginTop(daily, "clamp(1.25rem, 2.6vw, 2rem)");
      setMarginTop(living, "clamp(1.25rem, 2.6vw, 2rem)");
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
