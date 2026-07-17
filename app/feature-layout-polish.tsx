"use client";

import { useEffect } from "react";

export function FeatureLayoutPolish() {
  useEffect(() => {
    const style = document.createElement("style");
    style.dataset.featureLayoutPolish = "true";
    style.textContent = `
      .podcast-feature,
      .daily-bitachon-feature {
        display: grid !important;
        grid-template-columns: minmax(15rem, .72fr) minmax(0, 1.28fr) !important;
      }

      .podcast-feature-media,
      .daily-bitachon-media {
        grid-column: 1 !important;
        grid-row: 1 !important;
        min-height: clamp(27rem, 48vw, 39rem) !important;
      }

      .podcast-feature-copy,
      .daily-bitachon-copy {
        grid-column: 2 !important;
        grid-row: 1 !important;
      }

      .podcast-feature-media::after,
      .daily-bitachon-media::after {
        background: linear-gradient(90deg, transparent 58%, rgba(8, 16, 26, .98)) !important;
      }

      .podcast-feature-media img,
      .daily-bitachon-media img {
        object-position: left center !important;
      }

      @media (max-width: 760px) {
        .podcast-feature,
        .daily-bitachon-feature {
          grid-template-columns: minmax(8.5rem, 38%) minmax(0, 62%) !important;
        }

        .podcast-feature-media,
        .daily-bitachon-media {
          min-height: 100% !important;
        }

        .podcast-feature-copy,
        .daily-bitachon-copy {
          padding: 1.35rem .9rem 1.5rem !important;
        }
      }

      @media (max-width: 420px) {
        .podcast-feature,
        .daily-bitachon-feature {
          grid-template-columns: minmax(7.25rem, 36%) minmax(0, 64%) !important;
        }

        .podcast-feature-copy,
        .daily-bitachon-copy {
          padding: 1.15rem .75rem 1.3rem !important;
        }
      }
    `;

    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return null;
}
