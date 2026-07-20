"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BUILD_VERSION = "1.0.13";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(
  /\/$/,
  "",
);
const portrait = `${basePath}/michael-safdie.svg?v=${BUILD_VERSION}`;
const bookCover = `${basePath}/shaar-habitachon-gate-of-trust.svg?v=${BUILD_VERSION}`;
const bookUrl = "https://amzn.to/3R5Cjdr";
const authorUrl =
  "https://www.amazon.com/Rabbeinu-Bachya-Ibn-Pakudah/e/B0D62VPXML/ref=dp_byline_cont_book_1";
const websiteUrl = "https://dailybitachon.com/";
const whatsappUrl = "https://dailybitachon.com/whatsapp/";
const phoneUrl = "tel:+17189571805";

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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.2 3.8 9.6 8l-1.8 1.7c1.2 2.8 3.3 4.9 6.1 6.1l1.7-1.8 4.2 2.4c.5.3.7.9.5 1.4-.6 1.4-1.8 2.4-3.4 2.4C10 20.2 3.8 14 3.8 7.1c0-1.6 1-2.8 2.4-3.4.4-.2.8-.1 1 .1Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.65"
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
        .daily-bitachon-feature-mount { margin-top: clamp(1.25rem, 2.6vw, 2rem); }
        .daily-bitachon-feature {
          position: relative;
          display: grid;
          grid-template-columns: minmax(15rem, .72fr) minmax(0, 1.28fr);
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
          min-height: clamp(31rem, 49vw, 42rem);
          overflow: hidden;
          background: #102029;
        }
        .daily-bitachon-media::after {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, transparent 63%, rgba(8, 16, 26, .98)),
            linear-gradient(180deg, transparent 72%, rgba(8, 16, 26, .34));
          content: "";
          pointer-events: none;
        }
        .daily-bitachon-media img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
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
          max-width: 47rem;
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
        .daily-bitachon-signature {
          display: flex;
          width: 3.9rem;
          align-items: center;
          gap: .32rem;
          margin: 1.05rem 0 .15rem;
          opacity: .62;
        }
        .daily-bitachon-signature::before,
        .daily-bitachon-signature::after {
          width: .48rem;
          height: .48rem;
          border: 1px solid rgba(157, 228, 204, .78);
          border-radius: 999px;
          content: "";
        }
        .daily-bitachon-signature span {
          width: 1.75rem;
          height: 1px;
          background: linear-gradient(90deg, rgba(157, 228, 204, .2), rgba(157, 228, 204, .85), rgba(157, 228, 204, .2));
        }
        .daily-bitachon-book {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 1rem;
          margin-top: 1.15rem;
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
        @media (max-width: 920px) {
          .daily-bitachon-feature { grid-template-columns: 1fr; }
          .daily-bitachon-media { min-height: min(112vw, 38rem); }
          .daily-bitachon-media::after {
            background: linear-gradient(180deg, transparent 65%, rgba(8, 16, 26, .96));
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

      <article
        className="daily-bitachon-feature"
        aria-labelledby="daily-bitachon-title"
      >
        <div className="daily-bitachon-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portrait}
            alt="Vector portrait of Mr. Michael Safdie outside Madison Time"
            loading="eager"
          />
        </div>
        <div className="daily-bitachon-copy">
          <p className="daily-bitachon-kicker">
            A daily voice note for real life
          </p>
          <h3 id="daily-bitachon-title">Daily Bitachon</h3>
          <p className="daily-bitachon-bio">
            Michael Safdie is a New York businessman and the president of
            Madison Time, a specialist in important collectible watches. He
            approaches Bitachon as a serious learner and working businessman,
            not from a rabbinic title. That perspective is the point: he speaks
            in the language of decisions, pressure, uncertainty, responsibility,
            and getting through an ordinary day with more trust and less noise.
            His roughly fifteen-minute Daily Bitachon recordings draw from the
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer sponsored external"
            >
              Shaar HaBitachon With Commentary From Classical and Chassidic
              Sources
            </a>{" "}
            by{" "}
            <a
              href={authorUrl}
              target="_blank"
              rel="noopener noreferrer external"
            >
              Rabbeinu Bachya Ibn Pakudah
            </a>
            , turning the text into direct, energetic, practical encouragement.
          </p>

          <div
            className="daily-bitachon-facts"
            aria-label="Daily Bitachon format"
          >
            <div className="daily-bitachon-fact">
              <strong>Delivered on WhatsApp</strong>
              <span>
                A short daily recording that arrives where people already
                listen.
              </span>
            </div>
            <div className="daily-bitachon-fact">
              <strong>About 15 minutes</strong>
              <span>
                Focused enough for the day, substantial enough to shift its
                direction.
              </span>
            </div>
            <div className="daily-bitachon-fact">
              <strong>Listen by phone</strong>
              <span>
                The official site also offers a US call-in line for the
                recordings.
              </span>
            </div>
          </div>

          <div className="daily-bitachon-signature" aria-hidden="true">
            <span />
          </div>

          <div className="daily-bitachon-book">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="daily-bitachon-book-cover"
              src={bookCover}
              alt="Shaar HaBitachon With Commentary From Classical and Chassidic Sources book cover"
              loading="lazy"
            />
            <div className="daily-bitachon-book-copy">
              <strong>The text behind the daily lessons</strong>
              <span>
                Commentary from classical and Chassidic sources by Rabbeinu
                Bachya Ibn Pakudah.
              </span>
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
              Join on WhatsApp
            </a>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer external"
            >
              <GlobeIcon />
              Daily Bitachon website
            </a>
            <a href={phoneUrl}>
              <PhoneIcon />
              Call 718-957-1805
            </a>
          </div>
        </div>
      </article>
    </>,
    target,
  );
}
