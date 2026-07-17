"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.35";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(/\/$/, "");

export function OpeningMottoReference() {
  useEffect(() => {
    const card = document.querySelector<HTMLElement>(".motto-card");
    if (!card) return;

    card.setAttribute(
      "aria-label",
      "Sing It. Laugh It. Cry It. All Day! Every day! Ein Od Milvado. There is nothing but Him, G-D.",
    );
    card.replaceChildren();

    const image = document.createElement("img");
    image.src = `${basePath}/motto-reference.jpg?v=${BUILD_VERSION}`;
    image.alt =
      "Sing It. Laugh It. Cry It. All Day! Every day! Ein Od Milvado. There is nothing but Him, G-D.";
    image.className = "motto-reference-image";
    image.decoding = "async";
    image.loading = "eager";
    card.append(image);
  }, []);

  return (
    <style>{`
      .motto-card {
        min-height: 0;
        aspect-ratio: 512 / 420;
        padding: clamp(0.45rem, 1vw, 0.7rem);
        overflow: hidden;
        border: 1px solid rgba(225, 195, 132, 0.34);
        border-radius: 1.45rem;
        background: rgba(210, 181, 133, 0.18);
        box-shadow:
          0 24px 68px rgba(0, 0, 0, 0.3),
          inset 0 0 0 1px rgba(255, 250, 238, 0.18);
      }

      .motto-card::before,
      .motto-card::after {
        display: none;
      }

      .motto-reference-image {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: calc(1.45rem - 0.45rem);
        object-fit: cover;
        object-position: center;
        filter: saturate(0.96) contrast(1.01) brightness(0.99);
      }

      @media (max-width: 640px) {
        .motto-card {
          padding: 0.4rem;
          border-radius: 1.2rem;
        }

        .motto-reference-image {
          border-radius: 0.85rem;
        }
      }
    `}</style>
  );
}
