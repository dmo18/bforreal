# Bitachon For Real Design Direction

## Purpose

This document is the source of truth for the site's visual direction, product goals, content presentation, and implementation standards.

## Core direction

The site should feel calm, premium, intimate, and grounded. It uses deep navy and charcoal surfaces, warm cream and restrained gold accents, editorial serif typography, clean sans serif support text, authentic source material, controlled motion, and deliberate spacing.

## Architecture

The initial React and server output contains the complete meaningful page. JavaScript may enhance genuine interaction, but it must not construct sections, repair images, replace labels, establish ordering, hide obsolete layouts, rewrite the footer, or synchronize the version through DOM mutation.

Use one navigation order, one section order, one resource definition per feature, one curated gallery source, and one package-based version source. Runtime style injection, broad mutation observers, repeated repair timers, unrelated portals, and document-wide interaction handlers are rejected.

## Opening and resources

The opening is one composition containing the authentic local motto artwork, the title, description, and statement card. The resource order is podcast, Daily Bitachon, then LivingYosh. Each is rendered directly with local imagery, concise context, factual highlights, and safe external actions. No duplicate legacy grid is rendered.

## Image rules

Required visual assets are local. Verify file signatures and complete SVG markup, provide meaningful alternative text and stable dimensions, preserve important wording and faces, and do not assemble image data in client-side JavaScript. Local SVG containers with embedded raster source material are acceptable when repository binary constraints require them.

## Gallery

Gallery triggers are semantic buttons and file links remain anchors. The native modal dialog moves focus inside, makes the background inaccessible, closes with Escape or the labeled control, restores focus, supports previous and next navigation, exposes title, description, and position, prevents background scrolling, and respects reduced motion.

## Accessibility and layout

Provide a logical heading hierarchy, landmarks, skip link, visible focus, meaningful alternative text, high contrast, 44 pixel touch targets, and keyboard access. The page remains understandable when images fail, CSS is limited, or JavaScript is unavailable. Mobile layouts preserve hierarchy without excessively tall or crowded controls.

## Versioning and deployment

`package.json` is authoritative. A build script generates the typed version module and validation fails when synchronization breaks. GitHub Pages under `/bforreal` remains canonical until another domain is actually configured. Source and export validation are required before deployment.
