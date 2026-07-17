"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const websiteUrl = "https://livingyosh.com/";
const storyUrl = "https://livingyosh.com/MyJourney";
const youtubeUrl = "https://www.youtube.com/@livingyosh";
const primaryImage =
  "https://s.wordpress.com/mshots/v1/https%3A%2F%2Flivingyosh.com%2F?w=1200";
const fallbackImage =
  "https://image.thum.io/get/width/1200/crop/900/https://livingyosh.com/";

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

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.2 7.1a2.7 2.7 0 0 0-1.9-1.9C16.7 4.8 12 4.8 12 4.8s-4.7 0-6.3.4a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 3.4 12a28 28 0 0 0 .4 4.9 2.7 2.7 0 0 0 1.9 1.9c1.6.4 6.3.4 6.3.4s4.7 0 6.3-.4a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .4-4.9 28 28 0 0 0-.4-4.9Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path d="m10 9 5 3-5 3Z" fill="currentColor" />
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
    setTarget(mount);

    return () => mount.remove();
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
      <article className="living-yosh-feature" aria-labelledby="living-yosh-title">
        <div className="living-yosh-media">
          <img
            src={primaryImage}
            alt="Yosh Markell and the LivingYosh platform"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              const image = event.currentTarget;
              if (image.src !== fallbackImage) image.src = fallbackImage;
            }}
          />
        </div>
        <div className="living-yosh-copy">
          <p className="living-yosh-kicker">Faith · Resilience · Hope</p>
          <h3 id="living-yosh-title">LivingYosh</h3>
          <p className="living-yosh-bio">
            Yosh Markell is a South Florida father, former teacher, entrepreneur,
            and the founder of <a href={websiteUrl}>LivingYosh</a>. After enduring
            a false accusation, jail, house arrest, and years of legal and
            financial pressure, he turned his experience into a mission of faith,
            resilience, gratitude, and purpose.
          </p>
          <p className="living-yosh-bio">
            LivingYosh shares honest conversations, Torah perspectives, current
            events, and stories of people overcoming adversity. The site is built
            around a simple idea: one person&apos;s story may be exactly the hope
            someone else needs.
          </p>
          <div className="living-yosh-highlights" aria-label="LivingYosh highlights">
            <div className="living-yosh-highlight">
              <strong>Real stories</strong>
              <span>Interviews and personal journeys shaped by challenge and growth.</span>
            </div>
            <div className="living-yosh-highlight">
              <strong>Torah and faith</strong>
              <span>Practical encouragement grounded in emunah, hope, and purpose.</span>
            </div>
            <div className="living-yosh-highlight">
              <strong>Community</strong>
              <span>A place to listen, learn, share a story, and strengthen others.</span>
            </div>
          </div>
          <div className="living-yosh-actions daily-bitachon-actions">
            <a href={websiteUrl} target="_blank" rel="noreferrer">
              <GlobeIcon /> Website
            </a>
            <a href={storyUrl} target="_blank" rel="noreferrer">
              <StoryIcon /> Yosh&apos;s Story
            </a>
            <a href={youtubeUrl} target="_blank" rel="noreferrer">
              <YouTubeIcon /> YouTube
            </a>
          </div>
        </div>
      </article>
    </>,
    target,
  );
}
