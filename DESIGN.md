# Bitachon For Real Design Direction

## Purpose

This document is the source of truth for the site's visual direction, product goals, content presentation, and implementation standards. Update it whenever a design decision is accepted, rejected, or materially changed.

## Core Direction

The site should feel calm, premium, intimate, and grounded. It should not feel like a generic SaaS landing page, a template gallery, or a collection of unrelated cards.

The visual language combines:

- deep navy and charcoal backgrounds
- warm cream and restrained gold accents
- editorial serif typography for important statements
- clean sans serif typography for navigation and supporting copy
- real photography and authentic source material
- controlled motion and generous, but not wasteful, spacing

## Layout Principles

- Keep related elements visually connected.
- Avoid large empty vertical zones that make the page feel unfinished.
- Use whitespace to create focus, not distance.
- Keep desktop compositions compact enough that the next section begins to appear naturally.
- Preserve clear hierarchy on mobile without creating excessively tall cards.
- Do not solve structural problems with repeated runtime overrides when the source component can be edited directly.

## Opening Section

The opening should read as one composition:

- the motto artwork on the left
- the Bitachon For Real title and description on the right
- the statement card directly beneath the title copy

The motto artwork must use the authentic supplied reference image or a faithful local reproduction of that exact asset. Do not rebuild the wording with browser fonts when the source image is available.

The image should be integrated into the site's frame using:

- a restrained cream or gold border
- rounded corners consistent with the rest of the site
- subtle shadow and minimal color correction
- no decorative overlays that obscure the original artwork
- no cropping of important wording

## Image Rules

- Store assets locally in the repository or embed them locally when binary upload constraints require it.
- Do not hotlink external images.
- Verify the actual file format and signature before merging.
- Use authentic photography rather than stylized illustration when a real image is available.
- Avoid converting images into text-heavy SVG approximations.
- Preserve faces, wording, and source composition unless an explicit crop is approved.
- Do not assemble large image data URIs in client-side JavaScript. Prefer a repository-local asset URL that the browser can load directly.
- Verify any embedded SVG image asset by checking that the file begins with valid SVG markup, ends with a closing `</svg>` tag, and renders through the final public path.

## Resource Hub

- Keep one primary feature per resource.
- Do not display duplicate legacy cards beneath newer feature sections.
- Use real imagery on the left and content/actions on the right where space allows.
- Keep button styling consistent across all resource features.
- Preserve a clear visual distinction between image, description, and actions.

## Typography

- Editorial statements should use the site's serif family.
- Navigation, metadata, buttons, and body copy should use the sans serif family.
- Avoid oversized text that wraps awkwardly or clips.
- Hebrew content must preserve correct direction, punctuation, and glyph integrity.
- Never force long declarations into narrow character widths that create broken line endings.

## Spacing

- The opening section should not occupy an entire desktop viewport when the content does not require it.
- Keep column gaps visually deliberate, generally between 2rem and 4.5rem on desktop.
- Keep title, supporting copy, and statement card close enough to read as one unit.
- Mobile spacing should remain compact without reducing tap targets.

## Motion

- Motion should be subtle and supportive.
- Respect reduced-motion preferences.
- Avoid animation that delays access to content or causes layout shifts.

## Versioning

Every shipped build must increment the application version.

Synchronize at minimum:

- `package.json`
- `app/version-sync.tsx`
- any cache-busting constants tied to changed assets

Do not merge a build with inconsistent active version references.

## Implementation Standards

- Prefer editing the source component directly.
- Use runtime DOM overrides only as a temporary compatibility measure.
- Remove failed or superseded overrides when replacing an approach.
- Verify the complete file after every GitHub contents API write.
- Review the final branch diff before opening a pull request.
- Do not claim an asset works until its repository representation has been checked.

## Decision Log

### Accepted

- Compact opening composition with reduced dead space.
- Authentic motto reference image integrated inside the existing visual frame.
- Local image handling with no runtime hotlinking.
- Three full Resource Hub feature sections with legacy duplicates hidden.
- Unified cream and gold action-button styling.

### Rejected

- Recreating the motto reference with browser typography.
- Oversized declaration text that wraps or clips.
- Raw external hotlinks for feature imagery.
- Base64 text saved under binary image extensions.
- Build-time image downloads from third-party sites.
- Duplicate legacy resource cards below the newer features.
- Large client-side image data URIs assembled from JavaScript strings.
- Claiming an image fix is complete without validating the deployed public URL.

## Current Priorities

1. Keep the opening compact and visually balanced.
2. Use the authentic motto artwork without making it look pasted into the page.
3. Maintain reliable local image delivery on GitHub Pages.
4. Consolidate temporary override components into source components over time.
5. Preserve mobile readability and reduce unnecessary vertical scrolling.
