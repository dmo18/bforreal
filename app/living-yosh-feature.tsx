"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { StickerCollection } from "@/components/stickers/sticker-collection";

const BUILD_VERSION = "1.0.61";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(
  /\/$/,
  "",
);
const websiteUrl = "https://livingyosh.com/";
const storyUrl = "https://livingyosh.com/MyJourney";
const exploreUrl = "https://livingyosh.com/Browse";
const portrait = `${basePath}/living-yosh.webp?v=${BUILD_VERSION}`;

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M3.5 12h17M12 3c2.5 2.4 3.8 5.4 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.4-3.8-9S9.5 5.4 12 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
      />
    </svg>
  );
}

function StoryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 4.5h10.8A3.2 3.2 0 0 1 19 7.7v11.8H8.2A3.2 3.2 0 0 1 5 16.3Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.65"
      />
      <path
        d="M8 8h7.5M8 11.5h7.5M8 15h4.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.55"
      />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m14.8 9.2-1.7 3.9-3.9 1.7 1.7-3.9Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function LivingYoshFeature() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const resourceGrid = document.querySelector<HTMLElement>(".resource-grid");
    if (!resourceGrid?.parentElement) return;

    const mount = document.createElement("div");
    mount.className = "living-yosh-feature-mount";
    resourceGrid.parentElement.insertBefore(mount, resourceGrid);
    const frame = window.requestAnimationFrame(() => setTarget(mount));

    return () => {
      window.cancelAnimationFrame(frame);
      mount.remove();
    };
  }, []);

  if (!target) return null;

  return createPortal(
    <>
      <style>{`
        .living-yosh-feature-mount {
          margin-top: clamp(1.25rem, 2.6vw, 2rem);
        }
        .living-yosh-feature {
          position: relative;
          display: grid;
          grid-template-columns: minmax(15rem, .72fr) minmax(0, 1.28fr);
          overflow: hidden;
          border: 1px solid rgba(225, 195, 132, .22);
          border-radius: clamp(1.35rem, 2.5vw, 2rem);
          background:
            radial-gradient(circle at 18% 12%, rgba(225, 195, 132, .13), transparent 25rem),
            linear-gradient(135deg, rgba(20, 32, 48, .98), rgba(8, 16, 26, .98));
          box-shadow: 0 30px 85px rgba(0, 0, 0, .28);
          isolation: isolate;
        }
        .living-yosh-media {
          position: relative;
          min-height: clamp(27rem, 48vw, 39rem);
          overflow: hidden;
          background: #0c1725;
        }
        .living-yosh-media::after {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 58%, rgba(8, 16, 26, .98));
          content: "";
          pointer-events: none;
        }
        .living-yosh-media img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left center;
          filter: saturate(.9) contrast(1.04);
        }
        .living-yosh-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(2rem, 4.5vw, 4.2rem);
        }
        .living-yosh-kicker {
          color: var(--gold);
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .living-yosh-feature h3 {
          max-width: 11ch;
          margin-top: .9rem;
          color: var(--cream);
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(2.75rem, 5.3vw, 5rem);
          font-weight: 500;
          line-height: .94;
          letter-spacing: -.045em;
        }
        .living-yosh-bio {
          max-width: 47rem;
          margin-top: 1.25rem;
          color: var(--cream-soft);
          font-size: clamp(.96rem, 1.2vw, 1.07rem);
          line-height: 1.75;
        }
        .living-yosh-bio a {
          color: var(--gold-light, #efd79f);
          text-decoration-color: rgba(225, 195, 132, .45);
          text-underline-offset: .2em;
        }
        .living-yosh-highlights {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: .65rem;
          margin-top: 1.35rem;
        }
        .living-yosh-highlight {
          padding: .9rem .95rem;
          border: 1px solid rgba(225, 195, 132, .17);
          border-radius: 1rem;
          background: rgba(244, 239, 227, .035);
        }
        .living-yosh-highlight strong {
          display: block;
          color: var(--cream);
          font-size: .8rem;
        }
        .living-yosh-highlight span {
          display: block;
          margin-top: .22rem;
          color: var(--muted);
          font-size: .72rem;
          line-height: 1.45;
        }
        .living-yosh-actions {
          margin-top: 1.45rem !important;
        }
        @media (max-width: 1180px) {
          .living-yosh-feature {
            grid-template-columns: 1fr;
          }
          .living-yosh-media {
            min-height: min(86vw, 32rem);
          }
          .living-yosh-media::after {
            background: linear-gradient(180deg, transparent 60%, rgba(8, 16, 26, .99));
          }
          .living-yosh-copy {
            padding: 1.6rem 1.2rem 1.8rem;
          }
        }
        @media (max-width: 620px) {
          .living-yosh-highlights {
            grid-template-columns: 1fr;
          }
          .living-yosh-media {
            min-height: 78vw;
          }
        }
      `}</style>
      <article
        className="living-yosh-feature"
        aria-labelledby="living-yosh-title"
      >
        <div className="living-yosh-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portrait}
            alt="Yosh Markell with his daughter"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="living-yosh-copy">
          <p className="living-yosh-kicker">Faith · Resilience · Hope</p>
          <h3 id="living-yosh-title">LivingYosh</h3>
          <p className="living-yosh-bio">
            Yosh Markell is the founder of <a href={websiteUrl}>LivingYosh</a>,
            a platform shaped by his journey through false accusation, jail,
            house arrest, financial pressure, and rebuilding through faith,
            family, and perseverance.
          </p>
          <p className="living-yosh-bio">
            LivingYosh shares authentic conversations about Torah, faith,
            personal growth, resilience, current events, and overcoming
            life&apos;s challenges. Its mission is to help people find strength
            in their own journeys and to remind them that one person&apos;s
            story may be the hope someone else needs.
          </p>
          <div
            className="living-yosh-highlights"
            aria-label="LivingYosh highlights"
          >
            <div className="living-yosh-highlight">
              <strong>Real stories</strong>
              <span>
                Interviews and personal journeys shaped by challenge and growth.
              </span>
            </div>
            <div className="living-yosh-highlight">
              <strong>Torah and faith</strong>
              <span>
                Practical encouragement grounded in emunah, hope, and purpose.
              </span>
            </div>
            <div className="living-yosh-highlight">
              <strong>Community</strong>
              <span>
                A place to listen, learn, share a story, and strengthen others.
              </span>
            </div>
          </div>
          <div className="living-yosh-actions daily-bitachon-actions">
            <a href={websiteUrl} target="_blank" rel="noreferrer">
              <GlobeIcon /> Website
            </a>
            <a href={storyUrl} target="_blank" rel="noreferrer">
              <StoryIcon /> Yosh&apos;s Story
            </a>
            <a href={exploreUrl} target="_blank" rel="noreferrer">
              <ExploreIcon /> Explore
            </a>
          </div>
          <StickerCollection collectionId="living-yosh" />
        </div>
      </article>
    </>,
    target,
  );
}
