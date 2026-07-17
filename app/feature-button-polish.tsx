"use client";

import { useEffect } from "react";

export function FeatureButtonPolish() {
  useEffect(() => {
    const style = document.createElement("style");
    style.dataset.featureButtonPolish = "true";
    style.textContent = `
      .podcast-feature-links,
      .daily-bitachon-actions {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: .55rem !important;
        width: 100% !important;
      }

      .podcast-feature-links a,
      .daily-bitachon-actions a {
        width: 100% !important;
        min-width: 0 !important;
        min-height: 2.55rem !important;
        justify-content: center !important;
        padding: 0 .75rem !important;
        border: 1px solid rgba(225, 195, 132, .34) !important;
        border-radius: 999px !important;
        background: rgba(225, 195, 132, .1) !important;
        color: var(--cream) !important;
        font-size: .64rem !important;
        font-weight: 800 !important;
        letter-spacing: .045em !important;
        white-space: nowrap !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .025) !important;
      }

      .podcast-feature-links a:hover,
      .daily-bitachon-actions a:hover {
        border-color: rgba(255, 226, 167, .72) !important;
        background: rgba(225, 195, 132, .18) !important;
        transform: translateY(-2px) !important;
      }

      .daily-bitachon-primary {
        border-color: rgba(225, 195, 132, .48) !important;
        background: linear-gradient(135deg, rgba(225, 195, 132, .22), rgba(225, 195, 132, .11)) !important;
        color: var(--cream) !important;
      }

      .podcast-feature-links svg,
      .podcast-feature-links img,
      .daily-bitachon-actions svg,
      .daily-bitachon-actions img {
        width: .95rem !important;
        height: .95rem !important;
        flex: 0 0 auto !important;
      }

      @media (max-width: 560px) {
        .podcast-feature-links,
        .daily-bitachon-actions {
          gap: .4rem !important;
        }

        .podcast-feature-links a,
        .daily-bitachon-actions a {
          min-height: 2.35rem !important;
          padding: 0 .42rem !important;
          font-size: .54rem !important;
          letter-spacing: .025em !important;
        }

        .podcast-feature-links svg,
        .podcast-feature-links img,
        .daily-bitachon-actions svg,
        .daily-bitachon-actions img {
          width: .82rem !important;
          height: .82rem !important;
        }
      }
    `;

    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return null;
}
