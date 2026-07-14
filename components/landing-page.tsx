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
  Compass,
  Globe2,
  MessageCircle,
  Podcast,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { type PropsWithChildren, useRef } from "react";
import {
  foundations,
  levels,
  resources,
  siteConfig,
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
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, 96]);
  const haloRotate = useTransform(scrollYProgress, [0, 1], [0, 54]);

  function scrollLevels(direction: -1 | 1) {
    const container = levelsRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction * container.clientWidth * 0.82,
      behavior: reduceMotion ? "auto" : "smooth",
    });
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
        <nav className="nav-links" aria-label="Page sections">
          <a href="#understand">Understand</a>
          <a href="#levels">Seven Levels</a>
          <a href="#resources">Resources</a>
          <a href="#inspiration">Inspiration</a>
        </nav>
        <a className="header-cta" href="#resources">
          Explore
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <motion.div
            className="hero-media"
            style={reduceMotion ? undefined : { y: heroY }}
          >
            <Image
              src={`${siteConfig.basePath}/hero-sunrise.webp`}
              alt="A quiet mountain path overlooking water at first light"
              fill
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="hero-scrim" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />
          <motion.div
            className="hero-halo"
            aria-hidden="true"
            style={reduceMotion ? undefined : { rotate: haloRotate }}
          />
          <div className="particles" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="hero-content">
            <motion.p
              className="eyebrow hero-eyebrow"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              A quieter way forward
            </motion.p>
            <motion.h1
              id="hero-title"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.95,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Bitachon
              <span>For Real</span>
            </motion.h1>
            <motion.p
              className="hero-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42 }}
            >
              {siteConfig.description}
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.56 }}
            >
              <a className="button button-primary" href="#resources">
                Explore resources
                <Compass size={18} aria-hidden="true" />
              </a>
              <a
                className="button button-secondary"
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer external"
              >
                Join WhatsApp group
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          <a
            className="scroll-cue"
            href="#understand"
            aria-label="Continue to What is Bitachon"
          >
            <span>Begin</span>
            <span className="scroll-line" aria-hidden="true" />
          </a>
        </section>

        <section
          className="section opening-intro"
          id="opening"
          aria-labelledby="opening-title"
        >
          <div className="section-shell opening-shell">
            <Reveal className="opening-image-wrap">
              <figure className="opening-image-frame">
                <Image
                  src={`${siteConfig.basePath}/ein-od-milvado.png`}
                  alt="A typographic reminder that says: Sing It. Laugh It. Cry It. All Day! Every day! Ein Od Milvado — There is nothing but Him (G-d)."
                  width={512}
                  height={512}
                  sizes="(max-width: 920px) 90vw, 38vw"
                />
                <figcaption>
                  One line to return to, all day. Every day.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="opening-copy" delay={0.08}>
              <p className="eyebrow">The opening reminder</p>
              <h2 id="opening-title">
                Sing It. Laugh It. Cry It.
                <span>All Day! Every day!</span>
              </h2>
              <p className="opening-hebrew" lang="he" dir="rtl">
                אין עוד מלבדו!
              </p>
              <p className="opening-transliteration">
                <em>Ein Od Milvado!</em> THERE IS NOTHING BUT HIM(G-D)!
              </p>
              <p className="opening-body">
                Bitachon is a way of bringing that reminder into the ordinary
                moments: the work, the waiting, the laughter, and the tears.
              </p>
              <a className="text-link" href="#understand">
                Begin with the foundations
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </Reveal>
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
                  <article className="foundation-card">
                    <p className="card-index">{foundation.eyebrow}</p>
                    <h3>{foundation.title}</h3>
                    <p>{foundation.description}</p>
                    <span className="card-orbit" aria-hidden="true" />
                  </article>
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
              data-lenis-prevent
            >
              {levels.map((level, index) => (
                <Reveal
                  key={level.number}
                  className="level-reveal"
                  delay={index * 0.045}
                >
                  <article className="level-card">
                    <div className="level-number" aria-hidden="true">
                      {level.number}
                    </div>
                    <h3>{level.title}</h3>
                    <p>{level.description}</p>
                    <div className="practice">
                      <span>Practice</span>
                      <blockquote>“{level.practice}”</blockquote>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

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

        <section className="section inspiration" id="inspiration">
          <div className="section-shell">
            <Reveal className="inspiration-panel">
              <div className="inspiration-copy">
                <p className="eyebrow">Share inspiration</p>
                <h2>Words worth carrying with you.</h2>
                <p>
                  A future collection of quiet reminders, phone wallpapers, and
                  shareable graphics for everyday practice.
                </p>
                <span className="coming-soon">
                  <Sparkles size={15} aria-hidden="true" />
                  Coming soon
                </span>
              </div>
              <div className="inspiration-tiles" aria-hidden="true">
                <div className="inspiration-tile tile-one">
                  <span>Practice trust.</span>
                </div>
                <div className="inspiration-tile tile-two">
                  <span>Take the next step.</span>
                </div>
                <div className="inspiration-tile tile-three">
                  <span>Return to calm.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
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
