export function OpeningDensityPolish() {
  return (
    <style>{`
      .opening-intro {
        min-height: clamp(40rem, 78svh, 46rem);
        padding: clamp(6.75rem, 8vw, 7.75rem) 0 clamp(3rem, 4vw, 4rem);
      }

      .opening-shell {
        grid-template-columns: minmax(15rem, 0.78fr) minmax(0, 1.22fr);
        gap: clamp(2.5rem, 5vw, 5.5rem);
      }

      .opening-image-wrap {
        width: min(100%, 26rem);
        justify-self: end;
      }

      .motto-card {
        min-height: 0;
        aspect-ratio: 1044 / 858;
        padding: clamp(0.55rem, 1.2vw, 0.8rem);
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
          grid-template-columns: minmax(0, 1fr);
          gap: 2rem;
        }

        .opening-image-wrap,
        .opening-copy {
          width: 100%;
          max-width: 38rem;
          justify-self: center;
          min-width: 0;
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
          width: min(100%, 27rem);
          min-height: 0;
          margin-inline: auto;
        }

        .opening-copy h1 {
          font-size: clamp(3.25rem, 15vw, 4.8rem);
        }

        .intro-motto {
          margin-top: 1.15rem;
        }

        .intro-motto h2 {
          font-size: clamp(2rem, 10vw, 3rem);
        }
      }
    `}</style>
  );
}
