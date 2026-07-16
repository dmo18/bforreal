"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BUILD_VERSION = "1.0.11";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(/\/$/, "");
const portrait = `${basePath}/michael-safdie.svg?v=${BUILD_VERSION}`;
const bookCover = `${basePath}/shaar-habitachon-jaffa.svg?v=${BUILD_VERSION}`;
const bookUrl =
  "https://www.amazon.com/Shaar-HaBitachon-Chovos-Halevavos-Family/dp/B09WTZPCR2";
const whatsappUrl = "https://dailybitachon.com/whatsapp/";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 11.7a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4A8 8 0 1 1 20 11.7Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M8.4 7.9c.3-.3.7-.2.9.2l.8 1.7c.1.3.1.5-.1.7l-.6.7c.8 1.5 1.9 2.6 3.5 3.3l.7-.7c.2-.2.5-.2.7-.1l1.7.8c.4.2.5.6.2.9-.6.8-1.5 1.2-2.4 1-3.8-.8-6.3-3.2-7.1-7-.2-.9.2-1.8 1-2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4.5 5.4c2.8-.8 5.3-.4 7.5 1.2v12c-2.2-1.6-4.7-2-7.5-1.2Zm15 0c-2.8-.8-5.3-.4-7.5 1.2v12c2.2-1.6 4.7-2 7.5-1.2Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function DailyBitachonFeature() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const resourceGrid = document.querySelector<HTMLElement>(".resource-grid");
    if (!resourceGrid?.parentElement) return;

    const mount = document.createElement("div");
    mount.className = "daily-bitachon-feature-mount";
    resourceGrid.parentElement.insertBefore(mount, resourceGrid);
    setTarget(mount);

    return () => mount.remove();
  }, []);

  if (!target) return null;

  return createPortal(
    <>
      <style>{`
        .daily-bitachon-feature-mount {
          margin-top: clamp(1.25rem, 2.6vw, 2rem);
        }
        .daily-bitachon-feature {
          position: relative;
          display: grid;
          grid-template-columns: minmax(15rem, .7fr) minmax(0, 1.3fr);
          overflow: hidden;
          border: 1px solid rgba(114, 205, 175, .2);
          border-radius: clamp(1.35rem, 2.5vw, 2rem);
          background:
            radial-gradient(circle at 14% 10%, rgba(88, 190, 157, .14), transparent 24rem),
            linear-gradient(135deg, rgba(12, 31, 37, .98), rgba(8, 16, 26, .98));
          box-shadow: 0 30px 85px rgba(0, 0, 0, .28);
          isolation: isolate;
        }
        .daily-bitachon-media {
          position: relative;
          min-height: clamp(27rem, 46vw, 38rem);
          overflow: hidden;
          background: #102029;
        }
        .daily-bitachon-media::after {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, transparent 58%, rgba(8, 16, 26, .98)),
            linear-gradient(180deg, transparent 68%, rgba(8, 16, 26, .5));
          content: "";
          pointer-events: none;
        }
        .daily-bitachon-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(.84) contrast(1.04);
          transform: scale(1.015);
        }
        .daily-bitachon-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(2rem, 4.5vw, 4.2rem);
        }
        .daily-bitachon-kicker {
          color: #81d8bb;
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .daily-bitachon-feature h3 {
          max-width: 11ch;
          margin-top: .9rem;
          color: var(--cream);
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(2.75rem, 5.3vw, 5rem);
          font-weight: 500;
          line-height: .94;
          letter-spacing: -.045em;
        }
        .daily-bitachon-bio {
          max-width: 46rem;
          margin-top: 1.25rem;
          color: var(--cream-soft);
          font-size: clamp(.96rem, 1.2vw, 1.07rem);
          line-height: 1.75;
        }
        .daily-bitachon-bio a {
          color: #9de4cc;
          text-decoration-color: rgba(129, 216, 187, .45);
          text-underline-offset: .2em;
        }
        .daily-bitachon-facts {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: .65rem;
          margin-top: 1.35rem;
        }
        .daily-bitachon-fact {
          padding: .9rem .95rem;
          border: 1px solid rgba(129, 216, 187, .16);
          border-radius: 1rem;
          background: rgba(244, 239, 227, .035);
        }
        .daily-bitachon-fact strong {
          display: block;
          color: var(--cream);
          font-size: .8rem;
        }
        .daily-bitachon-fact span {
          display: block;
          margin-top: .22rem;
          color: var(--muted);
          font-size: .72rem;
          line-height: 1.45;
        }
        .daily-bitachon-yoyo {
          display: flex;
          align-items: center;
          gap: .8rem;
          margin-top: 1.25rem;
          padding: .85rem 1rem;
          border-left: 2px solid rgba(129, 216, 187, .65);
          color: var(--cream-soft);
          font-size: .8rem;
          line-height: 1.55;
        }
        .daily-bitachon-yoyo strong {
          flex: 0 0 auto;
          color: #9de4cc;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 1.4rem;
          font-style: italic;
          font-weight: 600;
          letter-spacing: .02em;
        }
        .daily-bitachon-book {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 1rem;
          margin-top: 1.3rem;
          padding: .9rem 1rem .9rem .85rem;
          border: 1px solid rgba(225, 195, 132, .22);
          border-radius: 1.2rem;
          background: linear-gradient(135deg, rgba(225, 195, 132, .1), rgba(225, 195, 132, .025));
        }
        .daily-bitachon-book-cover {
          display: block;
          width: 3.8rem;
          height: auto;
          border-radius: .22rem;
          filter: drop-shadow(0 .65rem .85rem rgba(0, 0, 0, .36));
        }
        .daily-bitachon-book-copy strong {
          display: block;
          color: var(--cream);
          font-size: .84rem;
        }
        .daily-bitachon-book-copy span {
          display: block;
          margin-top: .2rem;
          color: var(--muted);
          font-size: .72rem;
          line-height: 1.45;
        }
        .daily-bitachon-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .7rem;
          margin-top: 1.45rem;
        }
        .daily-bitachon-actions a,
        .daily-bitachon-book-link {
          display: inline-flex;
          min-height: 2.9rem;
          align-items: center;
          justify-content: center;
          gap: .55rem;
          padding: 0 1.1rem;
          border: 1px solid rgba(129, 216, 187, .34);
          border-radius: 999px;
          background: rgba(129, 216, 187, .09);
          color: var(--cream);
          font-size: .69rem;
          font-weight: 800;
          letter-spacing: .055em;
          text-decoration: none;
          text-transform: uppercase;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }
        .daily-bitachon-actions a:hover,
        .daily-bitachon-book-link:hover {
          border-color: rgba(157, 228, 204, .78);
          background: rgba(129, 216, 187, .16);
          transform: translateY(-2px);
        }
        .daily-bitachon-actions svg,
        .daily-bitachon-book-link svg {
          width: 1.08rem;
          height: 1.08rem;
          flex: 0 0 auto;
        }
        .daily-bitachon-primary {
          background: #8edfc3 !important;
          color: #09221d !important;
          border-color: transparent !important;
        }
        .daily-bitachon-note {
          max-width: 45rem;
          margin-top: 1rem;
          color: var(--muted);
          font-size: .75rem;
          line-height: 1.55;
        }
        @media (max-width: 920px) {
          .daily-bitachon-feature { grid-template-columns: 1fr; }
          .daily-bitachon-media { min-height: min(86vw, 32rem); }
          .daily-bitachon-media::after {
            background: linear-gradient(180deg, transparent 58%, rgba(8, 16, 26, .99));
          }
        }
        @media (max-width: 620px) {
          .daily-bitachon-copy { padding: 1.6rem 1.2rem 1.8rem; }
          .daily-bitachon-feature h3 { font-size: clamp(2.7rem, 14vw, 4.35rem); }
          .daily-bitachon-facts { grid-template-columns: 1fr; }
          .daily-bitachon-book { grid-template-columns: auto minmax(0, 1fr); }
          .daily-bitachon-book-cover { width: 4.35rem; }
          .daily-bitachon-book-link { grid-column: 1 / -1; width: 100%; }
          .daily-bitachon-actions a { flex: 1 1 11rem; }
        }
      `}</style>

      <article className="daily-bitachon-feature" aria-labelledby="daily-bitachon-title">
        <div className="daily-bitachon-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} alt="Mr. Michael Safdie" loading="lazy" />
        </div>
        <div className="daily-bitachon-copy">
          <p className="daily-bitachon-kicker">A daily voice note for real life</p>
          <h3 id="daily-bitachon-title">Daily Bitachon</h3>
          <p className="daily-bitachon-bio">
            Mr. Michael Safdie sends a short daily WhatsApp recording that brings the ideas
            of Bitachon into the middle of an ordinary day. In roughly fifteen focused
            minutes, he works from the Jaffa Family Edition of{" "}
            <a href={bookUrl} target="_blank" rel="noopener noreferrer sponsored external">
              Shaar HaBitachon of Chovos Halevavos
            </a>
            , translating its principles into direct, energetic encouragement about worry,
            effort, perspective, gratitude, and trusting Hashem through whatever is happening
            now.
          </p>

          <div className="daily-bitachon-facts" aria-label="Daily Bitachon format">
            <div className="daily-bitachon-fact">
              <strong>Delivered on WhatsApp</strong>
              <span>A simple daily recording that arrives where people already listen.</span>
            </div>
            <div className="daily-bitachon-fact">
              <strong>About 15 minutes</strong>
              <span>Brief enough for the day, substantial enough to change its direction.</span>
            </div>
            <div className="daily-bitachon-fact">
              <strong>Practical and personal</strong>
              <span>Classical Bitachon applied to pressure, decisions, and daily emotions.</span>
            </div>
          </div>

          <div className="daily-bitachon-yoyo">
            <strong>“Yo-yo”</strong>
            <span>
              A small, affectionate nod to the phrase listeners know: the moment the teaching
              gets especially passionate, warm, and direct.
            </span>
          </div>

          <div className="daily-bitachon-book">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="daily-bitachon-book-cover"
              src={bookCover}
              alt="Shaar HaBitachon of Chovos Halevavos, Jaffa Family Edition book cover"
              loading="lazy"
            />
            <div className="daily-bitachon-book-copy">
              <strong>The text behind the daily lessons</strong>
              <span>Jaffa Family Edition, with English translation and commentary.</span>
            </div>
            <a
              className="daily-bitachon-book-link"
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer sponsored external"
            >
              <BookIcon />
              View the book
            </a>
          </div>

          <div className="daily-bitachon-actions">
            <a
              className="daily-bitachon-primary"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer external"
            >
              <WhatsAppIcon />
              Join Daily Bitachon
            </a>
          </div>

          <p className="daily-bitachon-note">
            The older podcast feed is archival and is not presented here as the current way to
            receive the lessons. The Amazon book link is an affiliate link.
          </p>
        </div>
      </article>
    </>,
    target,
  );
}
