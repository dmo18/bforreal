"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BUILD_VERSION = "1.0.9";
const featureImage =
  "https://images.squarespace-cdn.com/content/v1/654e78f5a48aae5e62c92022/b5893395-d3b1-4406-ba6d-26162786312e/Gate%2Bof%2BTrust%2BPodcast%2BCovers.png";
const bookUrl =
  "https://www.amazon.com/Shaar-HaBitachon-Chovos-Halevavos-Family/dp/B09WTZPCR2";

const topicHighlights = [
  "Hishtadlus, effort, and leaving the outcome to Hashem",
  "Emotional tefillah without demanding certainty",
  "Relationships, shidduchim, and ordinary life pressure",
  "Releasing control and working through real situations",
];

export function PodcastFeature() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const resourceGrid = document.querySelector<HTMLElement>(".resource-grid");
    if (!resourceGrid?.parentElement) return;

    const mount = document.createElement("div");
    mount.className = "podcast-feature-mount";
    resourceGrid.parentElement.insertBefore(mount, resourceGrid);
    setTarget(mount);

    return () => mount.remove();
  }, []);

  useEffect(() => {
    const syncVersion = () => {
      const footerVersion = Array.from(
        document.querySelectorAll<HTMLElement>(".footer-meta span"),
      ).find((node) => node.textContent?.startsWith("Version "));

      if (footerVersion && footerVersion.textContent !== `Version ${BUILD_VERSION}`) {
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
        .podcast-feature-name {
          margin-top: 1.1rem;
          color: var(--gold-bright);
          font-size: .82rem;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
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
        .podcast-feature-topics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: .55rem .9rem;
          margin-top: 1.25rem;
          padding: 0;
          list-style: none;
        }
        .podcast-feature-topics li {
          position: relative;
          padding-left: 1rem;
          color: var(--cream-soft);
          font-size: .8rem;
          line-height: 1.5;
        }
        .podcast-feature-topics li::before {
          position: absolute;
          top: .55em;
          left: 0;
          width: .35rem;
          height: .35rem;
          border-radius: 999px;
          background: var(--gold-bright);
          content: "";
        }
        .podcast-book-callout {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 1rem;
          margin-top: 1.35rem;
          padding: 1rem;
          border: 1px solid rgba(225, 195, 132, .24);
          border-radius: 1.2rem;
          background: linear-gradient(135deg, rgba(225, 195, 132, .12), rgba(225, 195, 132, .035));
        }
        .podcast-book-mark {
          display: grid;
          width: 3rem;
          height: 3.7rem;
          place-items: center;
          border: 1px solid rgba(255, 226, 167, .42);
          border-radius: .45rem .75rem .75rem .45rem;
          background: linear-gradient(145deg, #d8b665, #8a672b);
          box-shadow: inset -.35rem 0 rgba(0, 0, 0, .18), 0 .75rem 1.5rem rgba(0, 0, 0, .2);
          color: #101826;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
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
          .podcast-feature-facts,
          .podcast-feature-topics {
            grid-template-columns: 1fr;
          }
          .podcast-book-callout {
            grid-template-columns: auto minmax(0, 1fr);
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
      <article className="podcast-feature" aria-labelledby="podcast-feature-title">
        <div className="podcast-feature-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${featureImage}?format=1500w`}
            alt="Reb Yirmi Ginsberg with Bitachon For Real podcast artwork"
            loading="lazy"
          />
        </div>
        <div className="podcast-feature-copy">
          <p className="podcast-feature-kicker">The podcast that inspired this site</p>
          <h3 id="podcast-feature-title">Bitachon For Real</h3>
          <p className="podcast-feature-name">Reb Yirmi Ginsberg</p>
          <p className="podcast-feature-bio">
            Reb Yirmi Ginsberg leads chaburos at Congregation Aish Kodesh and teaches
            Bitachon as something to practice, not only study. The weekly series follows
            Shaar HaBitachon in the Jaffa Family Edition of
            {" "}
            <a href={bookUrl} target="_blank" rel="noopener noreferrer sponsored external">
              Shaar HaBitachon of Chovos Halevavos
            </a>
            , bringing classical sources and Chasidic insight into the choices, emotions,
            and uncertainties of everyday life.
          </p>

          <div className="podcast-feature-facts" aria-label="Podcast format">
            <div className="podcast-feature-fact">
              <strong>Weekly on Sundays</strong>
              <span>The live shiur is listed for Sunday mornings at 9.</span>
            </div>
            <div className="podcast-feature-fact">
              <strong>Usually 35 to 50 minutes</strong>
              <span>Long enough for depth, focused enough for a weekly rhythm.</span>
            </div>
            <div className="podcast-feature-fact">
              <strong>170 plus episodes</strong>
              <span>A substantial archive built from 2021 onward.</span>
            </div>
          </div>

          <ul className="podcast-feature-topics" aria-label="Topics explored in the podcast">
            {topicHighlights.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>

          <div className="podcast-book-callout">
            <span className="podcast-book-mark" aria-hidden="true">B</span>
            <div className="podcast-book-copy">
              <strong>The text used throughout the series</strong>
              <span>Jaffa Family Edition, with English translation and commentary.</span>
            </div>
            <a
              className="podcast-book-link"
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer sponsored external"
            >
              View the book
            </a>
          </div>

          <p className="podcast-feature-note">
            This independent site was inspired by the podcast and is not an official
            production of Reb Yirmi Ginsberg, Gate of Trust, or Aish Kodesh. The Amazon
            book link is an affiliate link.
          </p>

          <div className="podcast-feature-links" aria-label="Listen to Bitachon For Real">
            <a
              href="https://podcasts.apple.com/us/podcast/bitachon-for-real/id1602319903"
              target="_blank"
              rel="noopener noreferrer external"
            >
              Apple Podcasts
            </a>
            <a
              href="https://open.spotify.com/show/1O3Uv5QeRHpFZZVSF5IPhg"
              target="_blank"
              rel="noopener noreferrer external"
            >
              Spotify
            </a>
            <a
              href="https://www.gateoftrust.org/yirmiginsberg"
              target="_blank"
              rel="noopener noreferrer external"
            >
              Gate of Trust
            </a>
          </div>
        </div>
      </article>
    </>,
    target,
  );
}
