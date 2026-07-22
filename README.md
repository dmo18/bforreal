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

## Sticker collections

The three featured resources each include ten locally served stickers:

- Podcast: canonical `assets/bitachonforreal.com_yg_1.webp` through `_10.webp`
- Daily Bitachon: canonical `assets/bitachonforreal.com_ms_1.webp` through `_10.webp`
- LivingYosh: canonical `assets/bitachonforreal.com_ly-01.webp` through `-10.webp`

All canonical sticker sources are 512 by 512 WebPs. The original PNGs remain in `assets/` as preserved source artwork. The YG and MS PNGs are tall promotional designs, not equivalents of the square stickers, and are not served in the sticker journey. YG and MS also intentionally use different naming conventions for PNG and WebP sources, so `data/sticker-collections.json` maps every file explicitly.

The ten LivingYosh WebPs were regenerated from their matching square PNG masters at 512 by 512 with lossless WebP encoding. The high-resolution PNG masters remain untouched.

`pnpm run prepare:stickers` copies each canonical WebP without changing its bytes and creates a matching PNG from the same decoded artwork:

```text
public/stickers/<collection>/01.webp
public/stickers/<collection>/01.png
```

The generated `public/stickers/` directory is reproducible and ignored by Git. The production export contains the same files under `out/stickers/`.

Run:

```bash
pnpm run normalize:ly-stickers  # manually, only when rebuilding approved LY sources
pnpm run prepare:stickers
pnpm run validate:stickers
```

The website distributes images; it does not install a WhatsApp sticker collection. Visitors save one image at a time, share it as an ordinary picture, or use the guided “Get all 10” flow. There are no ZIP downloads and no companion application.

Exact static-export-compatible links use query parameters:

```text
?sticker=podcast-01
?sticker=daily-01
?sticker=living-yosh-01
?collection=podcast&getAll=1
```

Device-aware saving uses native file sharing where available, calm manual-save fallbacks elsewhere, and locally generated QR codes for desktop-to-phone handoff. Guided progress is stored only in `sessionStorage`.

Site copy and resource links live in `data/site.ts`. The site is an independent directory and does not imply ownership, endorsement, affiliation, or partnership with any listed resource.
