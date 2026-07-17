"use client";

import { useEffect } from "react";

export function OpeningMottoReference() {
  useEffect(() => {
    const card = document.querySelector<HTMLElement>(".motto-card");
    if (!card) return;

    card.setAttribute(
      "aria-label",
      "Sing It. Laugh It. Cry It. All Day! Every day! Ein Od Milvado. There is nothing but Him, G-D.",
    );

    const firstLine = card.querySelector<HTMLElement>(".motto-line:not(.motto-everyday)");
    const everyday = card.querySelector<HTMLElement>(".motto-everyday");
    const hebrew = card.querySelector<HTMLElement>(".motto-hebrew");
    const transliteration = card.querySelector<HTMLElement>(".motto-transliteration");
    const declaration = card.querySelector<HTMLElement>(".motto-declaration");

    if (firstLine) firstLine.textContent = "Sing It. Laugh It. Cry It.";
    if (everyday) everyday.textContent = "All Day! Every day!";
    if (hebrew) hebrew.textContent = "אֵין עוֹד מִלְבַדּוֹ!";
    if (transliteration) transliteration.textContent = "Ein Od Milvado!";
    if (declaration) declaration.textContent = "THERE IS NOTHING BUT HIM (G-D)!";
  }, []);

  return (
    <style>{`
      .motto-card {
        min-height: clamp(23rem, 34vw, 28rem);
        padding: clamp(1.5rem, 3vw, 2.15rem);
        border-color: rgba(225, 195, 132, 0.38);
        border-radius: 1.55rem;
        background:
          radial-gradient(circle at 48% -10%, rgba(255, 255, 255, 0.5), transparent 14rem),
          radial-gradient(circle at 82% 94%, rgba(90, 61, 34, 0.18), transparent 13rem),
          linear-gradient(145deg, #e7d4b4 0%, #cdb18a 58%, #aa8a64 100%);
        box-shadow:
          0 24px 68px rgba(0, 0, 0, 0.28),
          inset 0 0 0 1px rgba(255, 250, 238, 0.28);
        color: #18130f;
      }

      .motto-card::before {
        inset: 0.78rem;
        border-color: rgba(42, 29, 17, 0.18);
        border-radius: 1.02rem;
      }

      .motto-card::after {
        inset: 0;
        background:
          linear-gradient(115deg, rgba(255, 255, 255, 0.16), transparent 30%),
          repeating-linear-gradient(0deg, rgba(54, 37, 20, 0.018) 0 1px, transparent 1px 4px);
        mix-blend-mode: multiply;
        opacity: 0.7;
      }

      .motto-line,
      .motto-transliteration,
      .motto-declaration {
        font-family: Georgia, "Times New Roman", serif;
        font-style: normal;
        font-weight: 700;
        letter-spacing: -0.025em;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
      }

      .motto-line {
        font-size: clamp(1.45rem, 3.3vw, 2.15rem);
        line-height: 1.05;
      }

      .motto-everyday {
        margin-top: 0.22rem;
      }

      .motto-hebrew {
        margin: clamp(1.15rem, 3vw, 1.6rem) 0 0.72rem;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(2.75rem, 7.2vw, 4.55rem);
        font-weight: 800;
        line-height: 0.95;
        letter-spacing: -0.02em;
      }

      .motto-transliteration {
        font-size: clamp(1.65rem, 4vw, 2.45rem);
        line-height: 1;
      }

      .motto-declaration {
        max-width: 13ch;
        margin-top: 0.62rem;
        font-size: clamp(1.7rem, 4.7vw, 3.05rem);
        line-height: 0.96;
      }

      @media (max-width: 640px) {
        .motto-card {
          padding: 1.35rem;
        }

        .motto-hebrew {
          font-size: clamp(2.55rem, 13vw, 4rem);
        }

        .motto-declaration {
          font-size: clamp(1.65rem, 8.8vw, 2.65rem);
        }
      }
    `}</style>
  );
}
