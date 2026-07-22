"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { StickerCollection } from "@/components/stickers/sticker-collection";

const BUILD_VERSION = "1.0.61";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(
  /\/$/,
  "",
);
const featureImage = basePath + "/bitachon-for-real-podcast-cover.webp";
const bookUrl = "https://amzn.to/3R5Cjdr";
const authorUrl =
  "https://www.amazon.com/Rabbeinu-Bachya-Ibn-Pakudah/e/B0D62VPXML/ref=dp_byline_cont_book_1";
const bookCover = `${basePath}/shaar-habitachon-gate-of-trust.svg?v=${BUILD_VERSION}`;

function ApplePodcastsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="2.2" fill="currentColor" />
      <path
        d="M9.4 19.4 10.2 13a1.8 1.8 0 0 1 3.6 0l.8 6.4a2.6 2.6 0 0 1-5.2 0Z"
        fill="currentColor"
      />
      <path
        d="M7.1 14.8a7 7 0 1 1 9.8 0M5 17.1a10 10 0 1 1 14 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M6.8 9.2c3.8-1.1 8.4-.8 11.6.9M7.5 12.5c3.1-.8 7-.6 9.8.8M8.2 15.6c2.6-.6 5.6-.4 8 .6"
        fill="none"
        stroke="#0d1723"
        strokeLinecap="round"
        strokeWidth="1.55"
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

export function PodcastFeature() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const resourceGrid = document.querySelector<HTMLElement>(".resource-grid");
    if (!resourceGrid?.parentElement) return;

    const mount = document.createElement("div");
    mount.className = "podcast-feature-mount";
    resourceGrid.parentElement.insertBefore(mount, resourceGrid);
    const frame = window.requestAnimationFrame(() => setTarget(mount));

    return () => {
      window.cancelAnimationFrame(frame);
      mount.remove();
    };
  }, []);

  useEffect(() => {
    const syncVersion = () => {
      const footerVersion = Array.from(
        document.querySelectorAll<HTMLElement>(".footer-meta span"),
      ).find((node) => node.textContent?.startsWith("Version "));

      if (
        footerVersion &&
        footerVersion.textContent !== `Version ${BUILD_VERSION}`
      ) {
        footerVersion.textContent = `Version ${BUILD_VERSION}`;
      }
    };

    const frame = window.requestAnimationFrame(syncVersion);
    const timer = window.setTimeout(syncVersion, 50);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  if (!target) return null;

  return createPortal(
    <>
      <style>{`
        .podcast-feature-mount {
          margin-top: clamp(2.4rem, 4vw, 3.6rem);
        }
        .podcast-feature {
          position: relative;
          display: grid;
          grid-template-columns: minmax(15rem, .72fr) minmax(0, 1.28fr);
          overflow: hidden;
          border: 1px solid rgba(225, 195, 132, .24);
          border-radius: clamp(1.35rem, 2.5vw, 2rem);
          background:
            radial-gradient(circle at 82% 12%, rgba(225, 195, 132, .12), transparent 23rem),
            linear-gradient(135deg, rgba(20, 34, 52, .96), rgba(8, 15, 25, .96));
          box-shadow: 0 32px 90px rgba(0, 0, 0, .3);
          isolation: isolate;
        }
        .podcast-feature-media {
          position: relative;
          min-height: clamp(27rem, 48vw, 39rem);
          overflow: hidden;
          background: #0c1725;
        }
        .podcast-feature-media::after {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 58%, rgba(8, 15, 25, .98));
          content: "";
          pointer-events: none;
        }
        .podcast-feature-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(.9) contrast(1.04);
        }
        .podcast-feature-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(2rem, 4.5vw, 4.2rem);
        }
        .podcast-feature-kicker {
          color: var(--gold-bright);
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .podcast-feature h3 {
          max-width: 11ch;
          margin-top: .9rem;
          color: var(--cream);
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(2.75rem, 5.3vw, 5rem);
          font-weight: 500;
          line-height: .94;
          letter-spacing: -.045em;
        }
        .podcast-feature-bio {
          max-width: 46rem;
          margin-top: 1.2rem;
          color: var(--cream-soft);
          font-size: clamp(.96rem, 1.2vw, 1.07rem);
          line-height: 1.75;
        }
        .podcast-feature-bio a {
          color: var(--gold-bright);
          text-decoration-color: rgba(225, 195, 132, .45);
          text-underline-offset: .2em;
        }
        .podcast-feature-facts {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: .65rem;
          margin-top: 1.3rem;
        }
        .podcast-feature-fact {
          padding: .85rem .95rem;
          border: 1px solid rgba(225, 195, 132, .16);
          border-radius: 1rem;
          background: rgba(244, 239, 227, .035);
        }
        .podcast-feature-fact strong {
          display: block;
          color: var(--cream);
          font-size: .8rem;
          letter-spacing: .02em;
        }
        .podcast-feature-fact span {
          display: block;
          margin-top: .2rem;
          color: var(--muted);
          font-size: .72rem;
          line-height: 1.45;
        }
        .podcast-book-callout {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 1rem;
          margin-top: 1.35rem;
          padding: .9rem 1rem .9rem .85rem;
          border: 1px solid rgba(225, 195, 132, .24);
          border-radius: 1.2rem;
          background: linear-gradient(135deg, rgba(225, 195, 132, .12), rgba(225, 195, 132, .035));
        }
        .podcast-book-cover {
          display: block;
          width: 3.8rem;
          height: auto;
          border-radius: .22rem;
          filter: drop-shadow(0 .65rem .85rem rgba(0, 0, 0, .36));
        }
        .podcast-book-copy strong {
          display: block;
          color: var(--cream);
          font-size: .84rem;
        }
        .podcast-book-copy span {
          display: block;
          margin-top: .2rem;
          color: var(--muted);
          font-size: .72rem;
          line-height: 1.45;
        }
        .podcast-feature-note {
          max-width: 45rem;
          margin-top: 1rem;
          color: var(--muted);
          font-size: .75rem;
          line-height: 1.55;
        }
        .podcast-feature-links {
          display: flex;
          flex-wrap: wrap;
          gap: .7rem;
          margin-top: 1.45rem;
        }
        .podcast-feature-links a,
        .podcast-book-link {
          display: inline-flex;
          min-height: 2.85rem;
          align-items: center;
          justify-content: center;
          gap: .55rem;
          padding: 0 1.1rem;
          border: 1px solid rgba(225, 195, 132, .34);
          border-radius: 999px;
          background: rgba(225, 195, 132, .1);
          color: var(--cream);
          font-size: .69rem;
          font-weight: 800;
          letter-spacing: .055em;
          text-decoration: none;
          text-transform: uppercase;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }
        .podcast-feature-links a:hover,
        .podcast-book-link:hover {
          border-color: rgba(255, 226, 167, .72);
          background: rgba(225, 195, 132, .18);
          transform: translateY(-2px);
        }
        .podcast-feature-links svg,
        .podcast-book-link svg {
          width: 1.08rem;
          height: 1.08rem;
          flex: 0 0 auto;
        }
        .podcast-feature-links .spotify-icon {
          color: #1ed760;
        }
        .podcast-feature-links .apple-icon {
          color: #d9b6ff;
        }
        .podcast-feature-links .gate-icon {
          width: 1.12rem;
          height: 1.12rem;
          flex: 0 0 auto;
          border-radius: .24rem;
          object-fit: contain;
        }
        .podcast-book-link {
          white-space: nowrap;
        }
        @media (max-width: 920px) {
          .podcast-feature {
            grid-template-columns: 1fr;
          }
          .podcast-feature-media {
            min-height: min(86vw, 32rem);
          }
          .podcast-feature-media::after {
            background: linear-gradient(180deg, transparent 60%, rgba(8, 15, 25, .99));
          }
        }
        @media (max-width: 620px) {
          .podcast-feature-copy {
            padding: 1.6rem 1.2rem 1.8rem;
          }
          .podcast-feature h3 {
            font-size: clamp(2.7rem, 14vw, 4.35rem);
          }
          .podcast-feature-facts {
            grid-template-columns: 1fr;
          }
          .podcast-book-callout {
            grid-template-columns: auto minmax(0, 1fr);
          }
          .podcast-book-cover {
            width: 4.35rem;
          }
          .podcast-book-link {
            grid-column: 1 / -1;
            width: 100%;
          }
          .podcast-feature-links a {
            flex: 1 1 10rem;
          }
        }
      `}</style>
      <article
        className="podcast-feature"
        aria-labelledby="podcast-feature-title"
      >
        <div className="podcast-feature-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featureImage}
            alt="Reb Yirmi Ginsberg with Bitachon For Real podcast artwork"
            loading="lazy"
          />
        </div>
        <div className="podcast-feature-copy">
          <p className="podcast-feature-kicker">
            The podcast that inspired this site
          </p>
          <h3 id="podcast-feature-title">Bitachon For Real</h3>
          <p className="podcast-feature-bio">
            Reb Yirmi Ginsberg leads chaburot at Congregation Aish Kodesh and
            teaches Bitachon as something to practice, not only study. The
            weekly series follows the{" "}
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
            , bringing classical sources and Chasidic insight into the choices,
            emotions, and uncertainties of everyday life.
          </p>

          <div className="podcast-feature-facts" aria-label="Podcast format">
            <div className="podcast-feature-fact">
              <strong>Weekly on Sundays</strong>
              <span>The live shiur is listed for Sunday mornings at 9.</span>
            </div>
            <div className="podcast-feature-fact">
              <strong>Usually 35 to 50 minutes</strong>
              <span>
                Long enough for depth, focused enough for a weekly rhythm.
              </span>
            </div>
            <div className="podcast-feature-fact">
              <strong>170+ episodes</strong>
              <span>
                A substantial archive built from December 22, 2021 onward.
              </span>
            </div>
          </div>

          <div className="podcast-book-callout">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="podcast-book-cover"
              src={bookCover}
              alt="Shaar HaBitachon With Commentary From Classical and Chassidic Sources book cover"
              loading="lazy"
            />
            <div className="podcast-book-copy">
              <strong>The text used throughout the series</strong>
              <span>
                Commentary from classical and Chassidic sources by Rabbeinu
                Bachya Ibn Pakudah.
              </span>
            </div>
            <a
              className="podcast-book-link"
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer sponsored external"
            >
              <BookIcon />
              View the book
            </a>
          </div>

          <p className="podcast-feature-note">
            This independent site was inspired by the podcast and is not an
            official production of Reb Yirmi Ginsberg, Gate of Trust, or Aish
            Kodesh. The Amazon book link is an affiliate link.
          </p>

          <div
            className="podcast-feature-links"
            aria-label="Listen to Bitachon For Real"
          >
            <a
              href="https://podcasts.apple.com/us/podcast/bitachon-for-real/id1602319903"
              target="_blank"
              rel="noopener noreferrer external"
            >
              <span className="apple-icon">
                <ApplePodcastsIcon />
              </span>
              Apple Podcasts
            </a>
            <a
              href="https://open.spotify.com/show/1O3Uv5QeRHpFZZVSF5IPhg"
              target="_blank"
              rel="noopener noreferrer external"
            >
              <span className="spotify-icon">
                <SpotifyIcon />
              </span>
              Spotify
            </a>
            <a
              href="https://www.gateoftrust.org/yirmiginsberg"
              target="_blank"
              rel="noopener noreferrer external"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="gate-icon"
                src="https://www.gateoftrust.org/favicon.ico"
                alt=""
                aria-hidden="true"
              />
              Gate of Trust
            </a>
          </div>
          <StickerCollection collectionId="podcast" />
        </div>
      </article>
    </>,
    target,
  );
}
