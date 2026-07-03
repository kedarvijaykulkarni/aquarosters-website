# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static, SEO-friendly marketing website for **AquaRosters** — the live operations agenda for dive centers and watersports schools. Next.js 14 App Router, fully statically exported (no server runtime in production). Brand name is **AquaRosters** everywhere — never the old singular product/domain name.

## Commands

```bash
npm install
npm run dev     # dev server at http://localhost:3000
npm run build   # static export to out/ (this is what CI runs)
npm run start   # serve a production build (rarely needed; site is static)
npm run lint    # next lint (ESLint, eslint-config-next)
```

There is no test suite configured. `npm run export` is an alias for `npm run build` (kept for compatibility with older deploy scripts).

CI (`.github/workflows/build.yml`) runs `npm ci && npm run build` on push/PR to `main` — this is the only required check. Treat a failing `npm run build` as a blocking error before considering any change done.

## Architecture

### Static export constraints

`next.config.mjs` sets `output: 'export'`, `images: { unoptimized: true }`, and `trailingSlash: true`. This means:
- No API routes, no server components that need a runtime (middleware, server actions, ISR, etc. are unavailable).
- No `next/image` optimization — images are unoptimized by config.
- All dynamic routes (`app/features/[slug]`, `app/blog/[slug]`) must export `generateStaticParams()` and are fully pre-rendered at build time; there is no fallback rendering.
- Every generated URL gets a trailing slash.

### Content is centralized in `lib/content.ts`

This single file (~650 lines) is the source of truth for nearly all site copy and structured data: nav links, footer columns, `featureModules`, `pricingPlans`, `pricingFaq`, `comparisonRows`, `blogPosts`, solution-page feature lists, etc. Page components import from here rather than hardcoding copy. When adding a new feature, pricing tier, blog post, or nav item, add it to the appropriate array in `lib/content.ts` first — the typed shape (e.g. `FeatureModule`, `PricingPlan`, `NavLink`) documents what a page expects.

Dynamic routes derive their pages entirely from this data:
- `app/features/[slug]/page.tsx` maps a `featureModules` entry to a full page, including looking up a mockup component by name via `mockupRegistry`.
- `app/blog/[slug]/page.tsx` maps a `blogPosts` entry to a page.

Adding a new feature page = add an entry to `featureModules` (with a `mockup` key matching a registry entry) + optionally add a matching illustration component. No new route file is needed.

### Product mockup illustrations (`components/*Mockup.tsx`)

Components like `ProductDashboardMockup`, `LiveAgendaMockup`, `TripManifestMockup`, `POSPaymentMockup`, `GearAvailabilityMockup`, `AuditLogMockup`, `ReschedulingWorkflowMockup` are hand-built JSX/SVG illustrations simulating the AquaRosters product UI (not real app screenshots). They're registered in `components/mockupRegistry.tsx` and looked up by string key from `lib/content.ts`'s `mockup` field. These are the visual centerpiece of the hero and feature detail pages — treat clipped/overflowing text inside them as a high-impact visual bug, not a minor one, since they're the site's main "proof" of the product.

### Design tokens

Color palette, font families, and shadows are defined once in `tailwind.config.ts` (`navy`, `ocean`, `aqua`, `teal`, `sky`, `sand`, `ink`, `muted`, `border`, plus `success`/`warning`/`error` semantics). Fonts (`Inter` for body, `Manrope` for display/headings) are loaded via `next/font/google` in `lib/fonts.ts` and wired to CSS variables (`--font-inter`, `--font-manrope`) consumed by the Tailwind `fontFamily` config. Use existing tokens rather than introducing new hex colors or font stacks.

Global typography/motion rules live in `app/globals.css`: `h1`/`h2` use `text-wrap: balance`, `scroll-behavior: smooth` is gated behind `prefers-reduced-motion: no-preference`, and focus-visible outlines are defined globally rather than per-component.

### Routing structure

```
/                              app/page.tsx (homepage)
/features                      index of all feature modules
/features/[slug]                one page per lib/content.ts featureModules entry
/solutions/dive-centers
/solutions/kitesurf-surf-schools
/pricing
/comparison
/design-partners
/blog
/blog/[slug]                    one page per lib/content.ts blogPosts entry
/about
/contact
/legal/privacy
/legal/terms
```

`app/robots.ts` and `app/sitemap.ts` are generated from the same route/content data and read `NEXT_PUBLIC_SITE_URL` (defaults to `https://aquarosters.com`) — update both if routes change. `app/layout.tsx` sets global SEO metadata (title, description, OpenGraph, Twitter card) sourced from `brand` in `lib/content.ts`.

### Forms

`ContactForm.tsx` and `DesignPartnerForm.tsx` are client-side forms with real `required` validation and visible `<label>`s (no placeholder-as-label). Since this is a static export with no backend, submission handling is client-only — check the existing implementation before assuming a server endpoint exists.
