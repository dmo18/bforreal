"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const featureImage =
  "https://images.squarespace-cdn.com/content/v1/654e78f5a48aae5e62c92022/b5893395-d3b1-4406-ba6d-26162786312e/Gate%2Bof%2BTrust%2BPodcast%2BCovers.png";

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
          grid-template-columns: minmax(15rem, .78fr) minmax(0, 1.22fr);
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
          min-height: clamp(23rem, 42vw, 34rem);
          overflow: hidden;
          background: #0c1725;
        }
        .podcast-feature-media::after {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 64%, rgba(8, 15, 25, .96));
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
          padding: clamp(2rem, 5vw, 4.5rem);
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
          font-size: clamp(2.75rem, 5.6vw, 5.25rem);
          font-weight: 500;
          line-height: .94;
          letter-spacing: -.045em;
        }
        .podcast-feature-name {
          margin-top: 1.2rem;
          color: var(--gold-bright);
          font-size: .82rem;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .podcast-feature-bio {
          max-width: 43rem;
          margin-top: 1.25rem;
          color: var(--cream-soft);
          font-size: clamp(.96rem, 1.25vw, 1.08rem);
          line-height: 1.78;
        }
        .podcast-feature-note {
          max-width: 42rem;
          margin-top: 1rem;
          color: var(--muted);
          font-size: .8rem;
          line-height: 1.6;
        }
        .podcast-feature-links {
          display: flex;
          flex-wrap: wrap;
          gap: .75rem;
          margin-top: 1.75rem;
        }
        .podcast-feature-links a {
          display: inline-flex;
          min-height: 2.9rem;
          align-items: center;
          justify-content: center;
          padding: 0 1.15rem;
          border: 1px solid rgba(225, 195, 132, .34);
          border-radius: 999px;
          background: rgba(225, 195, 132, .1);
          color: var(--cream);
          font-size: .72rem;
          font-weight: 800;
          letter-spacing: .06em;
          text-decoration: none;
          text-transform: uppercase;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }
        .podcast-feature-links a:hover {
          border-color: rgba(255, 226, 167, .72);
          background: rgba(225, 195, 132, .18);
          transform: translateY(-2px);
        }
        @media (max-width: 780px) {
          .podcast-feature {
            grid-template-columns: 1fr;
          }
          .podcast-feature-media {
            min-height: min(86vw, 28rem);
          }
          .podcast-feature-media::after {
            background: linear-gradient(180deg, transparent 62%, rgba(8, 15, 25, .98));
          }
          .podcast-feature-copy {
            padding: 1.6rem 1.25rem 1.8rem;
          }
          .podcast-feature h3 {
            font-size: clamp(2.7rem, 14vw, 4.4rem);
          }
          .podcast-feature-links a {
            flex: 1 1 9rem;
          }
        }
      `}</style>
      <article className="podcast-feature" aria-labelledby="podcast-feature-title">
        <div className="podcast-feature-media">
          <img
            src={`${featureImage}?format=1500w`}
            alt="Reb Yirmi Ginsberg and Bitachon For Real podcast artwork"
            loading="lazy"
          />
        </div>
        <div className="podcast-feature-copy">
          <p className="podcast-feature-kicker">The podcast that inspired this site</p>
          <h3 id="podcast-feature-title">Bitachon For Real</h3>
          <p className="podcast-feature-name">Reb Yirmi Ginsberg</p>
          <p className="podcast-feature-bio">
            Reb Yirmi Ginsberg teaches regular chaburos at Congregation Aish Kodesh.
            In Bitachon For Real, he works through Shaar HaBitachon with a practical
            focus: not only understanding trust in Hashem, but learning how to live it.
            The conversations draw on classical sources, Chasidic teachings, and the
            pressures of ordinary life, turning a deep subject into a steady weekly
            practice.
          </p>
          <p className="podcast-feature-note">
            This independent site was inspired by the podcast and is not an official
            production of Reb Yirmi Ginsberg, Gate of Trust, or Aish Kodesh.
          </p>
          <div className="podcast-feature-links" aria-label="Listen to Bitachon For Real">
            <a
              href="https://podcasts.apple.com/us/podcast/bitachon-for-real/id1602319903"
              target="_blank"
              rel="noopener noreferrer external"
            >
              Listen on Apple Podcasts
            </a>
            <a
              href="https://open.spotify.com/show/1O3Uv5QeRHpFZZVSF5IPhg"
              target="_blank"
              rel="noopener noreferrer external"
            >
              Listen on Spotify
            </a>
            <a
              href="https://www.gateoftrust.org/yirmiginsberg"
              target="_blank"
              rel="noopener noreferrer external"
            >
              Visit Gate of Trust
            </a>
          </div>
        </div>
      </article>
    </>,
    target,
  );
}
