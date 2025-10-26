# Websites to Friends

Helping people I love get online — and building a solid, reusable codebase along the way.

I started this project as a simple way to put relatives online, then used the same foundation for my own site. It’s a small, pragmatic starter for fast, good-looking sites that share a theme system, Contentful as CMS, and optional multi-language routing.

- Live sites:
  - [Antonio da Silveira](https://antoniodasilveira.com.br)
  - [Lívia Nutri](https://livianutri.com)
  - [Daniel Araújo](https://daniel-araujo.vercel.app)

## What you get

- Multi-site theming via `site-config/<site>` with one env switch (`SITE_ID`)
- 3-minute rebrand: edit 6 brand tokens in `app/colors.css` (opacities derive automatically)
- Contentful-backed content (blog/pages) with simple typed accessors
- Optional i18n: enable `ENABLE_MULTI_LANGUAGE` to localize routes into `app/[lang]/...`
- Production basics: metadata, sitemap, robots, analytics hooks (GTM/GA), and clean SCSS modules

## Tech stack

- Next.js (App Router), React, TypeScript
- SCSS modules, CSS variables for theming
- Contentful (Delivery + Management APIs for schema scripts)
- Vercel (deployment), next-sitemap

## Quick start

1. Clone and install

```bash
git clone <your-fork-url>
cd websites-to-friends
npm install
```

1. Create `.env.local` (root) with at least:

```bash
# Which site to load from site-config/<site>
SITE_ID=daniel-araujo

# App URLs
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Contentful (required for dynamic content)
CONTENTFUL_SPACE_ID=xxxxxxxxxxxxxxxxxxxx
CONTENTFUL_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxx
# Only needed for schema scripts (optional for normal dev)
CONTENTFUL_MANAGEMENT_TOKEN=xxxxxxxxxxxxxxxxxxxx

# Features
ENABLE_MULTI_LANGUAGE=false
REVALIDATE_SECRET=your-revalidate-secret            # optional, for on-demand ISR

# Analytics (optional)
NEXT_PUBLIC_GTM=
NEXT_PUBLIC_GTAG=
NEXT_PUBLIC_TWITTER=
```

1. Run the dev server

```bash
npm run dev
```

- The `predev` step copies `site-config/$SITE_ID` files into `app/` and `public/`.
- `watch-site` keeps the app in sync while you edit files under `site-config/<site>`.

## Rebrand in 3 steps

1. Open `app/colors.css`
1. Update the 6 brand color RGB tokens (`--brand-*-rgb`) and their mapped values
1. Save and refresh — opacities and gradients derive automatically from those tokens

See `QUICK_START.md` for a 1-page guide, and `COLOR_SYSTEM.md` for the full rationale.

## Scripts

- `npm run select-site` — copies `site-config/$SITE_ID/{colors.css,website-config.ts}` to `app/` and mirrors `public/`
- `npm run watch-site` — watches `site-config` and re-runs the copy step automatically
- `npm run dev` — runs `watch-site` + `next dev`
- `npm run build` — builds for production (prebuild step updates the edge proxy matcher when needed)
- `npm run generate-schema` — generate Contentful schema JSON for a given site
- `npm run import-schema` — import Contentful schema for a given site

## Project layout (high level)

- `app/` — Next.js App Router pages/layouts and site-level styling
  - `color-foundations.css` — semantic colors, gradients, opacity helpers
  - `colors.css` — per-site tokens and section variables (copied from `site-config/<site>`)
- `site-config/<site>/` — site-specific colors, assets, and config
- `scripts/` — CLI utilities: select site, i18n rewriting, proxy matcher, Contentful schema
- `lib/` — Contentful client and data accessors

## Optional multi-language

Set `ENABLE_MULTI_LANGUAGE=true` and restart dev/build:

- Entries in `app/` are localized into `app/[lang]/...` by `scripts/rewriteAppForMultiLanguage.ts`
- The proxy matcher is regenerated so localized routes resolve correctly

## Deployment

- Deploy on Vercel. Provide the same env vars there (`SITE_ID`, `CONTENTFUL_*`, `NEXT_PUBLIC_*`, etc.)
- `prebuild` runs `select-site` and updates the proxy matcher for your chosen config

---

I built this to help family members go online quickly — with clean code, pragmatic choices, and a theming model that scales to more sites without starting from scratch.
