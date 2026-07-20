"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.20";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(
  /\/$/,
  "",
);

function replaceLinkLabel(link: HTMLAnchorElement | undefined, label: string) {
  if (!link) return;
  link.setAttribute("aria-label", link.textContent?.trim() || label);
  const textNode = Array.from(link.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
  );
  if (textNode) textNode.textContent = ` ${label}`;
}

export function DailyBitachonPolish() {
  useEffect(() => {
    const apply = () => {
      document.querySelector<HTMLElement>(".podcast-feature-note")?.remove();

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
          .podcast-feature-media img,
          .daily-bitachon-media img {
            object-position: left center !important;
          }
          .daily-bitachon-feature {
            display: grid !important;
            grid-template-columns: minmax(15rem, .72fr) minmax(0, 1.28fr) !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          .daily-bitachon-copy {
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            padding: clamp(2rem, 4.5vw, 4.2rem) !important;
          }
          .daily-bitachon-media {
            position: relative !important;
            min-height: clamp(27rem, 48vw, 39rem) !important;
            aspect-ratio: auto !important;
            margin: 0 !important;
            overflow: hidden !important;
            border: 0 !important;
            border-radius: 0 !important;
            background: #0c1725 !important;
            box-shadow: none !important;
          }
          .daily-bitachon-media::after {
            position: absolute !important;
            inset: 0 !important;
            display: block !important;
            background: linear-gradient(90deg, transparent 58%, rgba(8, 16, 26, .98)) !important;
            content: "" !important;
            pointer-events: none !important;
          }
          .daily-bitachon-media img {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            object-fit: cover !important;
            filter: saturate(.9) contrast(1.04) !important;
            transform: none !important;
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
          .daily-bitachon-facts {
            margin-top: 1.3rem !important;
          }
          .daily-bitachon-book {
            margin-top: 1.35rem !important;
          }
          .daily-bitachon-actions {
            justify-content: flex-start !important;
            margin-top: 1.15rem !important;
          }
          @media (max-width: 1180px) {
            .podcast-feature,
            .daily-bitachon-feature {
              grid-template-columns: 1fr !important;
            }
            .podcast-feature-media,
            .daily-bitachon-media {
              min-height: min(86vw, 32rem) !important;
            }
            .podcast-feature-media::after,
            .daily-bitachon-media::after {
              background: linear-gradient(180deg, transparent 60%, rgba(8, 16, 26, .99)) !important;
            }
            .podcast-feature-copy,
            .daily-bitachon-copy {
              padding: 1.6rem 1.2rem 1.8rem !important;
            }
            .podcast-feature-media img,
            .daily-bitachon-media img {
              object-position: left center !important;
            }
            .daily-bitachon-actions {
              display: grid !important;
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              gap: .45rem !important;
              width: 100% !important;
              overflow: visible !important;
            }
            .daily-bitachon-actions a {
              width: 100% !important;
              min-width: 0 !important;
              min-height: 2.35rem !important;
              padding: 0 .45rem !important;
              font-size: .56rem !important;
              letter-spacing: .025em !important;
              white-space: nowrap !important;
            }
            .daily-bitachon-actions svg,
            .daily-bitachon-actions img {
              width: .82rem !important;
              height: .82rem !important;
            }
          }
          @media (max-width: 480px) {
            .podcast-feature-media,
            .daily-bitachon-media {
              min-height: 78vw !important;
            }
            .daily-bitachon-actions a {
              padding: 0 .35rem !important;
              font-size: .54rem !important;
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

      feature.querySelector<HTMLElement>(".daily-bitachon-signature")?.remove();

      const links = Array.from(
        feature.querySelectorAll<HTMLAnchorElement>(
          ".daily-bitachon-actions a",
        ),
      );
      const whatsappLink = links.find((link) =>
        link.href.includes("dailybitachon.com/whatsapp"),
      );
      const websiteLink = links.find(
        (link) => link.href === "https://dailybitachon.com/",
      );
      const phoneLink = links.find((link) => link.href.startsWith("tel:"));

      replaceLinkLabel(whatsappLink, "WhatsApp");
      replaceLinkLabel(websiteLink, "Website");
      replaceLinkLabel(phoneLink, "Call");

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
