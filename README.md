# Bitachon For Real

Bitachon For Real is a calm, independent resource hub for learning, listening, growing, and living with Bitachon.

## Live site

The canonical deployment is `https://dmo18.github.io/bforreal/`. The documented future domain is not active.

Current release: `1.0.38`.

## Architecture

The site uses the Next.js App Router and static export. Meaningful content is rendered declaratively on the initial server build.

- `components/landing-page.tsx` owns the complete page structure.
- `components/inspiration-gallery.tsx` is the focused client boundary for the accessible dialog, sharing, and downloads.
- `data/site.ts` is the canonical content, labels, links, navigation, feature, and gallery source.
- `package.json` is the authoritative version. `scripts/sync-version.mjs` generates `data/version.ts`.
- `public/` contains all visual assets required to render the site.
- `lib/site-paths.ts` keeps `/bforreal` asset and metadata URLs consistent.

## Development

Requires Node.js 22.13.0 or newer and pnpm 11.7.0.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Validation

```bash
pnpm check
pnpm audit:prod
```

The quality gate runs formatting, ESLint, TypeScript, tests, version synchronization, source architecture checks, local asset checks, secret-pattern checks, the production build, motto validation, and exported-site validation.

## Content and assets

Edit visible copy, resource links, navigation, features, and gallery metadata in `data/site.ts`. Add required visual files under `public/`. External links may remain, but required images, icons, fonts, styles, scripts, and social preview assets must be local.

The supplied motto source remains in `assets/motto-reference.base64`; the build materializes and validates `public/motto-reference.jpg`.

## Deployment

`.github/workflows/deploy-pages.yml` validates pull requests and pushes to `main`. Deployment occurs only after the complete quality gate and production dependency audit pass. The exported `out/` directory includes `public/.nojekyll` at its root.

## Independence

This is an independent directory and does not imply ownership, endorsement, affiliation, or partnership with any listed resource. The Amazon book link is an affiliate link.
