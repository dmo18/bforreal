# Bitachon For Real

A calm, independent resource hub for learning, listening, growing, and living with Bitachon.

## Live site

The current site is published with GitHub Pages at:

`https://dmo18.github.io/bforreal/`

The intended future domain is `bitachonforreal.com`. It is documented here only and is not configured as the current canonical URL.

## Development

```bash
pnpm install
pnpm dev
```

Create the GitHub Pages production export with:

```bash
pnpm build
```

The build is written to `out/`. For a future Node deployment, set `DEPLOY_TARGET=node` and update `NEXT_PUBLIC_SITE_URL`.

## Content

Site copy and resource links live in `data/site.ts`. The site is an independent directory and does not imply ownership, endorsement, affiliation, or partnership with any listed resource.
