export function OpeningDensityPolish() {
  return (
    <style>{`
      .opening-intro {
        min-height: clamp(40rem, 78svh, 46rem);
        padding: clamp(6.75rem, 8vw, 7.75rem) 0 clamp(3rem, 4vw, 4rem);
      }

      .opening-shell {
        grid-template-columns: minmax(19rem, 0.85fr) minmax(0, 1fr);
        gap: clamp(2rem, 4vw, 4.5rem);
      }

      .opening-image-wrap {
        width: min(100%, 27rem);
        justify-self: end;
      }

      .motto-card {
        min-height: clamp(23rem, 34vw, 28rem);
        padding: clamp(1.35rem, 2.6vw, 1.9rem);
      }

      .opening-copy {
        max-width: 34rem;
        justify-self: start;
      }

      .opening-copy h1 {
        margin-top: 0;
        font-size: clamp(3.4rem, 6vw, 6rem);
      }

      .opening-copy h1 span {
        margin-top: 0.45rem;
      }

      .opening-body {
        margin-top: 1.1rem;
        line-height: 1.65;
      }

      .intro-motto {
        max-width: 34rem;
        margin-top: 1.35rem;
        padding: clamp(1.1rem, 2vw, 1.45rem);
      }

      .intro-motto h2 {
        font-size: clamp(2rem, 3.8vw, 3.55rem);
        line-height: 0.98;
      }

      .intro-motto p {
        margin-top: 0.75rem;
        line-height: 1.6;
      }

      @media (max-width: 920px) {
        .opening-intro {
          min-height: auto;
          padding: 6.75rem 0 3.5rem;
        }

        .opening-shell {
          gap: 2rem;
        }

        .opening-image-wrap {
          width: min(100%, 25rem);
          justify-self: center;
        }

        .opening-copy {
          max-width: 38rem;
          justify-self: center;
        }
      }

      @media (max-width: 640px) {
        .opening-intro {
          padding: 5.75rem 0 3rem;
        }

        .opening-shell {
          gap: 1.6rem;
        }

        .motto-card {
          min-height: min(82vw, 24rem);
        }

        .opening-copy h1 {
          font-size: clamp(3.1rem, 16vw, 4.6rem);
        }

        .intro-motto {
          margin-top: 1.15rem;
        }
      }
    `}</style>
  );
}
