import Image from "next/image";
import { Icon } from "@/components/icons";
import { InspirationGallery } from "@/components/inspiration-gallery";
import {
  featuredResources,
  foundations,
  inspirationGraphics,
  levels,
  navigation,
  siteConfig,
  type FeaturedResource,
  type ResourceAction,
} from "@/data/site";
import { assetPath } from "@/lib/site-paths";

function ExternalAction({ action }: { action: ResourceAction }) {
  const rel = [
    action.external ? "external" : "",
    action.external ? "noopener" : "",
    action.external ? "noreferrer" : "",
    action.sponsored ? "sponsored" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      className="feature-action"
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={rel || undefined}
    >
      <Icon name={action.icon} size={17} />
      <span>{action.label}</span>
      {action.external ? <Icon name="external" size={14} /> : null}
    </a>
  );
}

function FeaturedResourceCard({ resource }: { resource: FeaturedResource }) {
  return (
    <article
      className={`feature-card feature-card-${resource.accent}`}
      aria-labelledby={`${resource.id}-title`}
    >
      <div className="feature-media">
        <Image
          src={assetPath(resource.image.src)}
          alt={resource.image.alt}
          width={resource.image.width}
          height={resource.image.height}
          sizes="(max-width: 920px) 100vw, 42vw"
          loading="lazy"
          style={{ objectPosition: resource.image.position }}
        />
      </div>
      <div className="feature-copy">
        <p className="feature-kicker">{resource.kicker}</p>
        <h3 id={`${resource.id}-title`}>{resource.title}</h3>
        <div className="feature-prose">
          {resource.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div
          className="feature-facts"
          aria-label={`${resource.title} highlights`}
        >
          {resource.facts.map((fact) => (
            <div className="feature-fact" key={fact.title}>
              <strong>{fact.title}</strong>
              <span>{fact.description}</span>
            </div>
          ))}
        </div>
        {resource.book ? (
          <div className="book-callout">
            <Image
              src={assetPath(resource.book.image)}
              alt={`${resource.book.title} book cover`}
              width={84}
              height={120}
              loading="lazy"
            />
            <div>
              <strong>{resource.book.title}</strong>
              <span>{resource.book.description}</span>
            </div>
            <a
              href={resource.book.href}
              target="_blank"
              rel="external noopener noreferrer sponsored"
            >
              <Icon name="book" size={17} />
              View book
              <span className="sr-only"> (affiliate link)</span>
            </a>
          </div>
        ) : null}
        <div className="feature-actions">
          {resource.actions.map((action) => (
            <ExternalAction action={action} key={action.label} />
          ))}
        </div>
      </div>
    </article>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  id,
}: {
  eyebrow: string;
  title: string;
  body: string;
  id: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

export function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd).replaceAll("<", "\\u003c")}
      </script>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-backdrop" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bitachon For Real home">
          <span className="brand-mark" aria-hidden="true">
            B
          </span>
          <span>Bitachon For Real</span>
        </a>
        <nav aria-label="Primary navigation">
          <ul className="nav-links">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="header-cta" href="#resources">
          Explore
          <Icon name="arrow-down" size={15} />
        </a>
      </header>

      <main id="main-content">
        <section
          className="opening section"
          id="top"
          aria-labelledby="opening-title"
        >
          <div className="section-shell opening-grid">
            <figure className="motto-frame">
              <Image
                src={assetPath("/motto-reference.jpg")}
                alt="Sing It. Laugh It. Cry It. All Day! Every day! Ein Od Milvado. There is nothing but Him, G-D."
                width={256}
                height={210}
                sizes="(max-width: 760px) 92vw, 44vw"
                priority
              />
            </figure>
            <div className="opening-copy">
              <p className="eyebrow">A practical resource hub</p>
              <h1 id="opening-title">
                Bitachon <span>For Real</span>
              </h1>
              <p className="opening-lede">{siteConfig.description}</p>
              <blockquote className="opening-statement">
                <p>Disconnect from your emotional attachment to the outcome.</p>
                <footer>
                  Do your part with a steady heart, then let the result rest
                  where it belongs.
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section
          className="section resources-section"
          id="resources"
          aria-labelledby="resources-title"
        >
          <div className="section-shell">
            <SectionHeading
              id="resources-title"
              eyebrow="Resource hub"
              title="A thoughtful place to begin."
              body="Independent public resources for learning, listening, and strengthening trust. Every external link opens on its original provider's site."
            />
            <div className="feature-list">
              {featuredResources.map((resource) => (
                <FeaturedResourceCard resource={resource} key={resource.id} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="section understand-section"
          id="understand"
          aria-labelledby="understand-title"
        >
          <div className="section-shell">
            <SectionHeading
              id="understand-title"
              eyebrow="Understanding Bitachon"
              title="Trust that changes how the moment feels."
              body="A practical way to name the calm, effort, and repetition at the heart of living with trust in Hashem."
            />
            <div className="foundation-grid">
              {foundations.map((foundation) => (
                <article className="foundation-card" key={foundation.title}>
                  <p className="card-index">{foundation.eyebrow}</p>
                  <h3>{foundation.title}</h3>
                  <p>{foundation.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section levels-section"
          id="levels"
          aria-labelledby="levels-title"
        >
          <div className="section-shell">
            <SectionHeading
              id="levels-title"
              eyebrow="A practical framework"
              title="Seven Levels of Bitachon"
              body="Seven ideas to return to slowly, honestly, and one moment at a time."
            />
            <ol className="levels-grid">
              {levels.map((level) => (
                <li key={level.number}>
                  <article className="level-card">
                    <p className="level-number" aria-hidden="true">
                      {level.number}
                    </p>
                    <h3>{level.title}</h3>
                    <p>{level.description}</p>
                    <div className="practice">
                      <span>Practice</span>
                      <blockquote>“{level.practice}”</blockquote>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="section inspiration-section"
          id="inspiration"
          aria-labelledby="inspiration-title"
        >
          <div className="section-shell">
            <SectionHeading
              id="inspiration-title"
              eyebrow="Share inspiration"
              title="Graphics worth sending onward."
              body="Open, save, or share these Bitachon For Real reminders directly from the page."
            />
            <InspirationGallery
              graphics={inspirationGraphics}
              basePath={siteConfig.basePath}
              siteUrl={siteConfig.siteUrl}
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
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
            <p>
              The documented future domain is {siteConfig.futureDomain}. GitHub
              Pages remains canonical.
            </p>
            <a
              href={siteConfig.repository}
              target="_blank"
              rel="external noopener noreferrer"
            >
              GitHub repository
              <Icon name="external" size={14} />
            </a>
            <span>Version {siteConfig.version}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
