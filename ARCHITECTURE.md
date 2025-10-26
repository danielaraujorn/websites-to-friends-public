# 🏗️ Architecture Overview

This codebase is optimized for fast rebrands across multiple sites, with a clean separation between global foundations and per-site tokens. Optional i18n can localize routes under `app/[lang]/*`.

## High-level flow

```text
site-config/<site>                  scripts/                   app/
        │                             │                         │
        ├── colors.css ───────────────┼─ select-site ─────────▶ colors.css
        ├── website-config.ts         │                         │
        └── public/* ────────────────▶└─ copy public ────────▶ public/*
                                      │
                                      ├─ rewriteAppForMultiLanguage
                                      │     ENABLE_MULTI_LANGUAGE=true
                                      │     app/* ⇄ app/[lang]/*
                                      │
                                      └─ buildProxy
                                            updates matcher in proxy.ts
```

- `site-config/<site>` is the source of truth for each site’s tokens and public assets.
- `scripts/select-site.ts` copies those into `app/` and `public/` based on `SITE_ID`.
- If `ENABLE_MULTI_LANGUAGE=true`, `scripts/rewriteAppForMultiLanguage.ts` moves entries into `app/[lang]/...`.
- `scripts/buildProxy.ts` updates the `matcher` in `proxy.ts` to match your config (geo redirects or i18n).

## Directories

- `app/`
  - `color-foundations.css`: semantic mapping, opacity helpers, gradients
  - `colors.css`: per-site tokens + section variables (copied from `site-config/<site>`)
  - App Router pages/layouts
- `site-config/<site>/`
  - `colors.css`, `website-config.ts`, `public/*`
- `scripts/`
  - `select-site.ts`, `rewriteAppForMultiLanguage.ts`, `buildProxy.ts`
  - Contentful helpers: `generate-schema.ts`, `import-schema.ts`
- `lib/`
  - `api.ts`, `getHomePage.ts`, `getPosts.ts`

## CMS (Contentful)

- Client: `lib/api.ts`

```ts
contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});
```

- Optional management token is used only by schema scripts:
  - `scripts/generate-schema.ts`
  - `scripts/import-schema.ts`

## Environment variables

- `SITE_ID`: selects which `site-config/<site>` is copied into the app
- `ENABLE_MULTI_LANGUAGE`: when true, localizes `app/*` to `app/[lang]/*`
- `NEXT_PUBLIC_FRONTEND_URL`: builds canonical URLs and sitemap entries
- `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`: Contentful Delivery API
- `CONTENTFUL_MANAGEMENT_TOKEN`: Contentful Management API (schema scripts only)
- `REVALIDATE_SECRET`: optional, on-demand ISR webhook
- `NEXT_PUBLIC_GTM`, `NEXT_PUBLIC_GTAG`, `NEXT_PUBLIC_TWITTER`: optional analytics/metadata

## i18n routing

When enabled, the script will:

- Move configured entries into `app/[lang]/...` (overridable via `MULTI_LANG_ENTRIES`)
- Update the proxy `matcher` to ensure localized paths resolve

## Color system (summary)

- Foundations (`app/color-foundations.css`) provide semantic colors, gradients, and opacity helpers.
- Per-site tokens and section variables live in `app/colors.css` (copied from `site-config`).
- Components use section variables only.

See `COLOR_SYSTEM.md` for details, and `REBRAND_GUIDE.md` for step-by-step changes.
