"use client";

import Image from "next/image";
import { ReactLenis } from "lenis/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Globe2,
  MessageCircle,
  Podcast,
  Share2,
  type LucideIcon,
} from "lucide-react";
import {
  type CSSProperties,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  foundations,
  inspirationGraphics,
  levels,
  resources,
  siteConfig,
  type InspirationGraphic,
  type ResourceIcon,
} from "@/data/site";

const iconMap: Record<ResourceIcon, LucideIcon> = {
  globe: Globe2,
  "message-circle": MessageCircle,
  podcast: Podcast,
  "book-open": BookOpen,
};

function Experience({ children }: PropsWithChildren) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        anchors: { offset: -88 },
        autoRaf: true,
        duration: 1.05,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: PropsWithChildren<{ className?: string; delay?: number }>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxBackdrop() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const slowY = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const driftX = useTransform(scrollYProgress, [0, 1], [0, 84]);

  return (
    <div className="parallax-backdrop" aria-hidden="true">
      <motion.div
        className="parallax-layer parallax-photo"
        style={reduceMotion ? undefined : { y: photoY }}
      />
      <motion.div
        className="parallax-layer parallax-sky"
        style={reduceMotion ? undefined : { y: slowY }}
      />
      <motion.div
        className="parallax-layer parallax-path"
        style={reduceMotion ? undefined : { y: midY }}
      />
      <motion.div
        className="parallax-layer parallax-glow"
        style={reduceMotion ? undefined : { y: glowY, x: driftX }}
      />
      <div className="parallax-grain" />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-lede">{body}</p>
    </Reveal>
  );
}

export function LandingPage() {
  const reduceMotion = useReducedMotion();
  const levelsRef = useRef<HTMLDivElement>(null);
  const foundationTriggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeFoundationIndex, setActiveFoundationIndex] = useState<
    number | null
  >(null);

  const activeFoundation =
    activeFoundationIndex === null ? null : foundations[activeFoundationIndex];

  const moveFoundationViewer = useCallback((direction: -1 | 1) => {
    setActiveFoundationIndex((current) => {
      if (current === null) return current;
      return (current + direction + foundations.length) % foundations.length;
    });
  }, []);

  const closeFoundationViewer = useCallback(() => {
    const index = activeFoundationIndex;
    setActiveFoundationIndex(null);
    if (index !== null) {
      window.requestAnimationFrame(() =>
        foundationTriggerRefs.current[index]?.focus(),
      );
    }
  }, [activeFoundationIndex]);
  useEffect(() => {
    if (activeFoundationIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFoundationViewer();
      if (event.key === "ArrowLeft") moveFoundationViewer(-1);
      if (event.key === "ArrowRight") moveFoundationViewer(1);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeFoundationIndex, closeFoundationViewer, moveFoundationViewer]);

  const levelTriggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeLevelIndex, setActiveLevelIndex] = useState<number | null>(null);
  const activeLevel =
    activeLevelIndex === null ? null : levels[activeLevelIndex];

  const moveLevelViewer = useCallback((direction: -1 | 1) => {
    setActiveLevelIndex((current) => {
      if (current === null) return current;
      return (current + direction + levels.length) % levels.length;
    });
  }, []);

  const closeLevelViewer = useCallback(() => {
    const index = activeLevelIndex;
    setActiveLevelIndex(null);
    if (index !== null) {
      window.requestAnimationFrame(() =>
        levelTriggerRefs.current[index]?.focus(),
      );
    }
  }, [activeLevelIndex]);

  useEffect(() => {
    if (activeLevelIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLevelViewer();
      if (event.key === "ArrowLeft") moveLevelViewer(-1);
      if (event.key === "ArrowRight") moveLevelViewer(1);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeLevelIndex, closeLevelViewer, moveLevelViewer]);
  function scrollLevels(direction: -1 | 1) {
    const container = levelsRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction * container.clientWidth * 0.82,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  async function shareGraphic(graphic: InspirationGraphic) {
    const url = new URL(
      `${siteConfig.basePath}/inspiration/${graphic.file}`,
      window.location.origin,
    ).toString();

    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], graphic.file, {
      type: blob.type || "image/svg+xml",
    });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: `${graphic.title} · ${siteConfig.title}`,
        text: "Share this Bitachon For Real graphic.",
        files: [file],
      });
      return;
    }

    if (navigator.clipboard?.write && "ClipboardItem" in window) {
      await navigator.clipboard.write([
        new ClipboardItem({
          [file.type || "image/svg+xml"]: blob,
        }),
      ]);
      return;
    }

    const fallbackUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = fallbackUrl;
    anchor.download = graphic.file;
    anchor.rel = "noopener";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(fallbackUrl), 0);
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
  };

  return (
    <Experience>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ParallaxBackdrop />
      <style>{`
        .parallax-backdrop {
          position: fixed;
          z-index: 0;
          inset: 0;
          overflow: hidden;
          background:
            radial-gradient(circle at 52% -8%, rgba(255, 214, 137, 0.42), transparent 30rem),
            linear-gradient(180deg, #16243a 0%, #172943 34%, #111c2f 64%, #090d16 100%);
          pointer-events: none;
        }

        .parallax-layer {
          position: absolute;
          inset: -22% -14%;
          will-change: transform;
        }

        .parallax-photo {
          inset: -16% -10% -24%;
          background:
            linear-gradient(180deg, rgba(255, 190, 96, 0.22), rgba(7, 11, 18, 0.28) 45%, rgba(7, 11, 18, 0.72) 100%),
            url("${siteConfig.basePath}/hero-sunrise.webp") center 34% / cover no-repeat;
          filter: saturate(1.28) contrast(0.98) brightness(1.08) blur(1px);
          opacity: 0.78;
          transform: scale(1.08);
        }

        .parallax-sky {
          background:
            radial-gradient(circle at 20% 20%, rgba(255, 210, 132, 0.34), transparent 19rem),
            radial-gradient(circle at 76% 10%, rgba(126, 172, 212, 0.34), transparent 28rem),
            linear-gradient(165deg, rgba(52, 78, 116, 0.62), rgba(13, 21, 35, 0.04) 62%);
          filter: saturate(1.22);
          mix-blend-mode: screen;
          opacity: 0.74;
        }

        .parallax-path {
          top: 10%;
          background:
            linear-gradient(115deg, transparent 0 36%, rgba(255, 214, 139, 0.22) 46%, transparent 60%),
            radial-gradient(ellipse at 50% 86%, rgba(255, 204, 116, 0.24), transparent 32rem),
            repeating-linear-gradient(112deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 64px);
          opacity: 0.86;
          mask-image: linear-gradient(to bottom, transparent, black 12%, black 82%, transparent);
        }

        .parallax-glow {
          inset: -8%;
          background:
            radial-gradient(circle at 68% 26%, rgba(255, 205, 116, 0.36), transparent 20rem),
            radial-gradient(circle at 20% 72%, rgba(92, 137, 179, 0.25), transparent 24rem),
            linear-gradient(90deg, rgba(255, 181, 88, 0.08), transparent 42%, rgba(91, 132, 176, 0.08));
          mix-blend-mode: screen;
          opacity: 0.9;
        }

        .parallax-grain {
          position: absolute;
          inset: 0;
          opacity: 0.09;
          background-image: radial-gradient(rgba(255,255,255,0.42) 0.45px, transparent 0.45px);
          background-size: 4px 4px;
          mix-blend-mode: soft-light;
        }

        .site-header,
        main,
        .site-footer {
          position: relative;
          z-index: 1;
        }

        .opening-intro {
          padding-bottom: clamp(3rem, 5vw, 4.75rem);
          background:
            radial-gradient(circle at 14% 36%, rgba(255, 204, 116, 0.2), transparent 28rem),
            radial-gradient(circle at 82% 20%, rgba(91, 132, 176, 0.17), transparent 30rem),
            linear-gradient(180deg, rgba(9, 15, 25, 0.1), rgba(16, 28, 45, 0.35) 55%, rgba(7, 11, 18, 0.28));
        }

        .section {
          padding: clamp(4.25rem, 7vw, 7rem) 0;
        }

        .understand,
        .resources,
        .inspiration,
        .levels,
        .site-footer {
          background-color: transparent;
        }

        .understand {
          padding-bottom: clamp(3.25rem, 5vw, 4.75rem);
          background:
            radial-gradient(circle at 18% 32%, rgba(78, 113, 152, 0.16), transparent 26rem),
            linear-gradient(180deg, rgba(7, 11, 18, 0.46), rgba(10, 16, 25, 0.54) 60%, rgba(7, 11, 18, 0.42));
        }

        .levels {
          padding-top: clamp(3.25rem, 5vw, 4.75rem);
          background:
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            rgba(9, 15, 24, 0.42);
          background-size: 6rem 6rem;
        }

        .resources {
          padding-top: clamp(3.25rem, 5vw, 4.75rem);
          background:
            radial-gradient(circle at 80% 45%, rgba(94, 132, 171, 0.17), transparent 27rem),
            rgba(7, 11, 18, 0.36);
        }

        .foundation-grid,
        .levels-grid,
        .resource-grid {
          margin-top: clamp(2.5rem, 4vw, 3.5rem);
        }

        .inspiration {
          padding-top: clamp(2.5rem, 4vw, 4rem);
        }

        .inspiration,
        .site-footer {
          background: rgba(9, 16, 26, 0.54);
        }

        .section {
          padding: clamp(4.25rem, 7vw, 7rem) 0;
        }

        .opening-intro {
          padding-bottom: clamp(3rem, 5vw, 4.75rem);
        }

        .understand {
          padding-bottom: clamp(3.25rem, 5vw, 4.75rem);
        }

        .levels,
        .resources {
          padding-top: clamp(3.25rem, 5vw, 4.75rem);
        }

        .foundation-grid,
        .levels-grid,
        .resource-grid {
          margin-top: clamp(2.5rem, 4vw, 3.5rem);
        }

        .inspiration {
          padding-top: clamp(2.5rem, 4vw, 4rem);
        }

        .inspiration-gallery-heading {
          max-width: 52rem;
        }

        .inspiration-gallery-heading h2 {
          margin-top: 0.9rem;
          font-size: clamp(3rem, 6.3vw, 5.9rem);
          line-height: 0.94;
          letter-spacing: -0.047em;
          text-wrap: balance;
        }

        .inspiration-gallery-heading p:not(.eyebrow) {
          max-width: 42rem;
          margin-top: 1.5rem;
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.8;
        }

        .inspiration-gallery {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(1rem, 2vw, 1.35rem);
          margin-top: clamp(2.5rem, 4vw, 3.5rem);
        }

        .inspiration-graphic-card {
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: 1.35rem;
          background: rgba(10, 17, 27, 0.72);
          box-shadow: var(--shadow);
          backdrop-filter: blur(16px) saturate(128%);
        }

        .inspiration-image-link {
          display: block;
          overflow: hidden;
          background: rgba(7, 11, 18, 0.54);
        }

        .inspiration-image-link img {
          display: block;
          width: 100%;
          height: auto;
          transition: transform 260ms ease, filter 260ms ease;
        }

        .inspiration-graphic-card:hover img {
          transform: scale(1.018);
          filter: brightness(1.05);
        }

        .inspiration-graphic-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem;
        }

        .inspiration-graphic-actions h3 {
          font-family: var(--font-inter), Arial, sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .inspiration-graphic-actions button {
          display: inline-flex;
          min-height: 2.35rem;
          align-items: center;
          gap: 0.45rem;
          padding: 0 0.8rem;
          border: 1px solid rgba(225, 195, 132, 0.34);
          border-radius: 999px;
          background: rgba(225, 195, 132, 0.12);
          color: var(--cream);
          cursor: pointer;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .inspiration-graphic-actions button:hover {
          background: rgba(225, 195, 132, 0.2);
          color: var(--gold-bright);
        }

        @media (max-width: 1100px) {
          .inspiration-gallery {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .inspiration-gallery {
            grid-template-columns: 1fr;
          }

          .inspiration-graphic-actions {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        .foundation-card,
        .level-card,
        .resource-card,
        .inspiration-panel,
        .intro-motto {
          backdrop-filter: blur(16px) saturate(128%);
        }
        /* motto-card embedded styles: keeps the revised opening self-contained for GitHub Pages deploys */
        .motto-card {
          position: relative;
          display: grid;
          min-height: min(88vw, 31rem);
          place-items: center;
          overflow: hidden;
          padding: clamp(1.6rem, 4vw, 2.4rem);
          border: 1px solid rgba(225, 195, 132, 0.32);
          border-radius: 1.7rem;
          background:
            radial-gradient(circle at 50% 0%, rgba(255, 246, 225, 0.24), transparent 12rem),
            linear-gradient(145deg, #d9c8aa, #b49b78 58%, #8a755c);
          box-shadow:
            0 28px 90px rgba(0, 0, 0, 0.34),
            inset 0 0 0 1px rgba(255, 250, 238, 0.2);
          color: #11100e;
          text-align: center;
        }

        .motto-card::before {
          position: absolute;
          inset: 0.85rem;
          border: 1px solid rgba(17, 16, 14, 0.14);
          border-radius: 1.15rem;
          content: "";
          pointer-events: none;
        }

        .motto-card::after {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(circle at 18% 10%, rgba(255, 255, 255, 0.34), transparent 11rem),
            radial-gradient(circle at 80% 86%, rgba(38, 26, 14, 0.18), transparent 13rem);
          content: "";
          mix-blend-mode: soft-light;
          pointer-events: none;
        }

        .motto-card > * {
          position: relative;
          z-index: 1;
        }

        .motto-line,
        .motto-transliteration,
        .motto-declaration {
          font-family: var(--font-cormorant), Georgia, serif;
          font-weight: 700;
        }

        .motto-line {
          font-size: clamp(1.65rem, 4.7vw, 2.45rem);
          line-height: 1.04;
        }

        .motto-everyday {
          margin-top: 0.3rem;
        }

        .motto-hebrew {
          margin: clamp(1.15rem, 4vw, 1.75rem) 0 0.85rem;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(3.2rem, 12vw, 5.3rem);
          font-weight: 700;
          line-height: 0.95;
        }

        .motto-transliteration {
          font-size: clamp(1.75rem, 5.4vw, 2.65rem);
          line-height: 1;
        }

        .motto-declaration {
          max-width: 11ch;
          margin-top: 0.65rem;
          font-size: clamp(2rem, 7.4vw, 3.65rem);
          line-height: 0.94;
        }

        .intro-kicker {
          color: var(--gold-bright);
          font-size: 0.67rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .intro-motto {
          max-width: 38rem;
          margin-top: 2rem;
          padding: clamp(1.35rem, 3vw, 1.85rem);
          border: 1px solid rgba(225, 195, 132, 0.24);
          border-radius: 1.35rem;
          background:
            radial-gradient(circle at 12% 18%, rgba(225, 195, 132, 0.12), transparent 15rem),
            rgba(12, 20, 31, 0.72);
          box-shadow: 0 22px 68px rgba(0, 0, 0, 0.2);
        }

        .intro-motto h2 {
          color: var(--cream);
          font-size: clamp(2.15rem, 4.8vw, 4.4rem);
          line-height: 0.96;
          letter-spacing: -0.04em;
          text-wrap: balance;
        }

        .intro-motto p {
          max-width: 32rem;
          margin-top: 1.1rem;
          color: var(--muted);
          font-size: 0.96rem;
          line-height: 1.78;
        }
      `}</style>{" "}
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Bitachon For Real home">
          <span className="brand-mark" aria-hidden="true">
            B
          </span>
          <span>Bitachon For Real</span>
        </a>

        <a className="header-cta" href="#resources">
          Explore
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </header>
      <main id="main-content">
        <section
          className="section opening-intro"
          id="top"
          aria-labelledby="opening-title"
        >
          <div className="section-shell opening-sequence">
            <div className="opening-layout">
              <Reveal className="opening-motto-visual">
                <div className="motto-card">
                  <Image
                    src={`${siteConfig.basePath}/motto-reference.webp`}
                    alt="Sing It. Laugh It. Cry It. All Day! Every day! Ein Od Milvado. There is nothing but Him."
                    width={1044}
                    height={858}
                    priority
                    sizes="(max-width: 760px) calc(100vw - 2rem), min(44vw, 36rem)"
                    className="motto-reference-image"
                  />
                </div>
              </Reveal>

              <div className="opening-content">
                <Reveal className="opening-welcome" delay={0.06}>
                  <h1 id="opening-title">
                    Bitachon <span>For Real</span>
                  </h1>
                  <p className="opening-body">{siteConfig.description}</p>
                </Reveal>

                <Reveal className="opening-statement" delay={0.1}>
                  <h2>
                    Disconnect from your emotional attachment to the outcome.
                  </h2>
                </Reveal>
              </div>
            </div>
          </div>{" "}
        </section>{" "}
        <section className="section resources" id="resources">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Resource hub"
              title="A thoughtful place to begin."
              body="Independent public resources for learning and listening. Every link opens on the original provider’s site."
            />
            <div className="resource-grid">
              {resources.map((resource, index) => {
                const Icon = iconMap[resource.icon];
                return (
                  <Reveal
                    key={resource.id}
                    className="resource-reveal"
                    delay={index * 0.06}
                  >
                    <motion.a
                      className="resource-card"
                      href={resource.href}
                      target="_blank"
                      rel={
                        resource.affiliate
                          ? "noopener noreferrer external sponsored"
                          : "noopener noreferrer external"
                      }
                      whileHover={reduceMotion ? undefined : { y: -6 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <div className="resource-card-top">
                        <span className="resource-icon">
                          <Icon
                            size={21}
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="resource-category">
                          {resource.category}
                        </span>
                        <ArrowUpRight
                          className="resource-arrow"
                          size={18}
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="resource-platform">{resource.platform}</p>
                        <h3>{resource.title}</h3>
                        <p className="resource-description">
                          {resource.description}
                        </p>
                      </div>
                      <span className="resource-link-label">
                        Open resource
                        {resource.affiliate && <small>Affiliate</small>}
                      </span>
                    </motion.a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section understand" id="understand">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Understanding Bitachon"
              title="Trust that changes how the moment feels."
              body="A practical way to name the calm, effort, and repetition at the heart of living with trust in Hashem."
            />
            <div className="foundation-grid">
              {foundations.map((foundation, index) => (
                <Reveal key={foundation.title} delay={index * 0.08}>
                  <button
                    ref={(node) => {
                      foundationTriggerRefs.current[index] = node;
                    }}
                    type="button"
                    className="foundation-card foundation-card-trigger"
                    aria-haspopup="dialog"
                    aria-label={`Enlarge ${foundation.title}`}
                    onClick={() => setActiveFoundationIndex(index)}
                  >
                    <p className="card-index">{foundation.eyebrow}</p>
                    <h3>{foundation.title}</h3>
                    <p>{foundation.description}</p>
                    <span
                      className="card-orbit"
                      style={
                        {
                          "--card-progress": `${((index + 1) / foundations.length) * 100}%`,
                        } as CSSProperties
                      }
                      aria-hidden="true"
                    />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="section levels" id="levels">
          <div className="section-shell">
            <div className="levels-heading-row">
              <SectionHeading
                eyebrow="A practical framework"
                title="Seven Levels of Bitachon"
                body="Seven ideas to return to—slowly, honestly, and one moment at a time."
              />
              <div
                className="carousel-controls"
                aria-label="Seven Levels carousel controls"
              >
                <button
                  type="button"
                  onClick={() => scrollLevels(-1)}
                  aria-label="Previous level"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollLevels(1)}
                  aria-label="Next level"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              className="levels-grid"
              ref={levelsRef}
              tabIndex={0}
              role="region"
              aria-label="Seven Levels of Bitachon cards"
            >
              {levels.map((level, index) => (
                <Reveal
                  key={level.number}
                  className="level-reveal"
                  delay={index * 0.045}
                >
                  <button
                    ref={(node) => {
                      levelTriggerRefs.current[index] = node;
                    }}
                    type="button"
                    className="level-card level-card-trigger"
                    aria-haspopup="dialog"
                    aria-label={`Enlarge level ${index + 1}: ${level.title}`}
                    onClick={() => setActiveLevelIndex(index)}
                  >
                    <div className="level-sequence" aria-hidden="true">
                      <span>Level {level.number}</span>
                      <span>
                        {index + 1} / {levels.length}
                      </span>
                    </div>
                    <div className="level-progress" aria-hidden="true">
                      <span
                        style={{
                          width: `${((index + 1) / levels.length) * 100}%`,
                        }}
                      />
                    </div>
                    <h3>{level.title}</h3>
                    <p>{level.description}</p>
                    <div className="practice">
                      <span>Practice</span>
                      <blockquote>“{level.practice}”</blockquote>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="section inspiration" id="inspiration">
          <div className="section-shell">
            <Reveal className="inspiration-gallery-heading">
              <p className="eyebrow">Share inspiration</p>
              <h2>Graphics worth sending onward.</h2>
              <p>
                Save or share these Bitachon For Real reminders directly from
                the page.
              </p>
            </Reveal>
            <div className="inspiration-gallery">
              {inspirationGraphics.map((graphic, index) => (
                <Reveal
                  key={graphic.id}
                  className="inspiration-graphic-reveal"
                  delay={index * 0.035}
                >
                  <article className="inspiration-graphic-card">
                    <a
                      className="inspiration-image-link"
                      href={`${siteConfig.basePath}/inspiration/${graphic.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${graphic.title} graphic`}
                    >
                      <Image
                        src={`${siteConfig.basePath}/inspiration/${graphic.file}`}
                        alt={`${graphic.title} share graphic`}
                        width={graphic.width}
                        height={graphic.height}
                        sizes="(max-width: 700px) 88vw, (max-width: 1100px) 42vw, 28vw"
                        loading="lazy"
                      />
                    </a>
                    <div className="inspiration-graphic-actions">
                      <h3>{graphic.title}</h3>
                      <button
                        type="button"
                        onClick={() => void shareGraphic(graphic)}
                        aria-label={`Share ${graphic.title}`}
                      >
                        <Share2 size={16} aria-hidden="true" />
                        Share
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        {activeLevel && activeLevelIndex !== null && (
          <div
            className="graphic-lightbox level-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Level ${activeLevelIndex + 1}: ${activeLevel.title}`}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeLevelViewer();
            }}
          >
            <button
              className="graphic-lightbox-close"
              type="button"
              onClick={closeLevelViewer}
            >
              Close
            </button>
            <button
              className="graphic-lightbox-arrow previous"
              type="button"
              aria-label="Previous level"
              onClick={() => moveLevelViewer(-1)}
            >
              ←
            </button>
            <div className="level-lightbox-media">
              <article className="level-card level-card-expanded">
                <div className="level-sequence" aria-hidden="true">
                  <span>Level {activeLevel.number}</span>
                  <span>
                    {activeLevelIndex + 1} / {levels.length}
                  </span>
                </div>
                <div className="level-progress" aria-hidden="true">
                  <span
                    style={{
                      width: `${((activeLevelIndex + 1) / levels.length) * 100}%`,
                    }}
                  />
                </div>
                <h3>{activeLevel.title}</h3>
                <p>{activeLevel.description}</p>
                <div className="practice">
                  <span>Practice</span>
                  <blockquote>“{activeLevel.practice}”</blockquote>
                </div>
              </article>
            </div>
            <button
              className="graphic-lightbox-arrow next"
              type="button"
              aria-label="Next level"
              onClick={() => moveLevelViewer(1)}
            >
              →
            </button>
            <p className="graphic-lightbox-caption">
              {activeLevelIndex + 1} of {levels.length} · {activeLevel.title}
            </p>
          </div>
        )}{" "}
        {activeFoundation && activeFoundationIndex !== null && (
          <div
            className="graphic-lightbox foundation-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeFoundation.title} enlarged card`}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeFoundationViewer();
            }}
          >
            <button
              className="graphic-lightbox-close"
              type="button"
              onClick={closeFoundationViewer}
            >
              Close
            </button>
            <button
              className="graphic-lightbox-arrow previous"
              type="button"
              aria-label="Previous card"
              onClick={() => moveFoundationViewer(-1)}
            >
              ←
            </button>
            <div className="foundation-lightbox-media">
              <article className="foundation-card foundation-card-expanded">
                <p className="card-index">{activeFoundation.eyebrow}</p>
                <h3>{activeFoundation.title}</h3>
                <p>{activeFoundation.description}</p>
                <span
                  className="card-orbit"
                  style={
                    {
                      "--card-progress": `${((activeFoundationIndex + 1) / foundations.length) * 100}%`,
                    } as CSSProperties
                  }
                  aria-hidden="true"
                />
              </article>
            </div>
            <button
              className="graphic-lightbox-arrow next"
              type="button"
              aria-label="Next card"
              onClick={() => moveFoundationViewer(1)}
            >
              →
            </button>
            <p className="graphic-lightbox-caption">
              {activeFoundationIndex + 1} of {foundations.length} ·{" "}
              {activeFoundation.title}
            </p>
          </div>
        )}
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <a className="brand footer-brand" href="#top">
              <span className="brand-mark" aria-hidden="true">
                B
              </span>
              <span>Bitachon For Real</span>
            </a>
            <p className="footer-note">
              An independent directory. This site is not affiliated with,
              endorsed by, or officially connected to any resource listed here.
            </p>
          </div>
          <div className="footer-meta">
            <p>As an Amazon Associate I earn from qualifying purchases.</p>
            <p>Future home: {siteConfig.futureDomain}</p>
            <a
              href={siteConfig.repository}
              target="_blank"
              rel="noopener noreferrer external"
            >
              GitHub repository
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <span>Version {siteConfig.version}</span>
          </div>
        </div>
      </footer>
    </Experience>
  );
}
