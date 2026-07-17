# CLAUDE.md — AquaRosters Website

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

Static, SEO-friendly marketing website for **AquaRosters**, built with Next.js App Router and fully statically exported (`output: 'export'`, no server runtime in production). Two lead-capture forms (Contact, Design Partner Program) submit through a Supabase Edge Function protected by Cloudflare Turnstile. Google Analytics 4 is wired in, gated to production-only traffic.

## Product Naming Rules

Use **AquaRosters** everywhere.

Do not use:
- AquaRoster
- AuquaRosters

## Product Positioning

AquaRosters is the live operations agenda for dive centers and watersports schools. It connects bookings, staff, participants, gear, POS, payments, trips, notifications, reports, and audit history in one place with simple monthly pricing and 0% commission.

(Canonical description lives in `brand.description` in `lib/content.ts` — update there, not just here, if it changes.)

## Business Source of Truth

Business facts used in marketing copy — pricing, market sizing, competitive positioning, claimed differentiators, safe/unsafe claims — must trace back to the Obsidian business-strategy vault at `D:\work\Bloowatch\aquarosters\Brian\AquaRosters\wiki\` (mirrored in the repo at `aquarosters/business-wiki/`), not be invented locally. Key pages there: `business-context.md` (product claims, market size, ICP), `competitors.md`, `pricing.md`, `goals.md`, `operations.md`. That vault's own `CLAUDE.md` documents its ingest/update workflow.

This repo's `CLAUDE.md` still owns the **website-specific** rules below (naming, exact routes, safe/unsafe claim wording as currently published) — when a business fact changes in the vault, update it here too so the two don't drift, starting with "Pricing Rules" and "Safe Claims / Unsafe Claims" below.

## Current Tech Stack

- **Next.js 16** (App Router, Turbopack build), **React 19**, **TypeScript 6**
- **Tailwind CSS v4** — CSS-first setup (`@import "tailwindcss"` in `app/globals.css`), still using `tailwind.config.ts` for the actual design tokens via Tailwind v4's `@config` compat directive (see `app/globals.css`)
- **ESLint 9** with flat config (`eslint.config.mjs`) via `eslint-config-next` — pinned off ESLint 10 because `eslint-config-next`'s own sub-dependencies don't yet declare support for it
- **Supabase** (Postgres + Edge Functions) for form storage
- **Cloudflare Turnstile** (`@marsidev/react-turnstile`) for bot protection
- **Google Analytics 4** (`gtag.js` via `next/script`)
- No server/API routes exist (`app/api` does not exist) — static export only
- No documented deployment target (no Vercel config, no hosting-provider files in this repo) — see "Known Gaps" below

## Current Project Structure

```
app/                          App Router pages (see "Important Routes")
  robots.ts, sitemap.ts        generated from lib/content.ts route/content data
  globals.css                  Tailwind v4 entry (@import "tailwindcss" + @config)
components/
  analytics/                   GoogleAnalytics, GoogleAnalyticsPageView, CTAEventTracker
  forms/                       TurnstileField
  *Mockup.tsx                  hand-built SVG/JSX product illustrations (not real screenshots)
  ContactForm.tsx, DesignPartnerForm.tsx
  Button.tsx, CTASection.tsx, PricingCard.tsx, mockupRegistry.tsx, ...  (flat, no other subfolders)
lib/
  analytics/google-analytics.ts   GA gating logic + pageview()/event()
  forms/submit-public-form.ts     frontend -> Edge Function request/response handling
  content.ts                      single source of truth for nearly all site copy/data (~650 lines)
  fonts.ts                        next/font/google (Inter, Manrope)
types/
  gtag.d.ts                       ambient window.dataLayer/window.gtag types
supabase/
  functions/submit-public-form/   Deno Edge Function (index.ts, validation.ts, cors.ts + their .test.ts files)
  migrations/                     0001 (create tables + RLS), 0002 (lock down anon insert)
docs/
  SUPABASE_FORMS.md, GOOGLE_ANALYTICS.md, TESTING.md
public/
  site.webmanifest
```

`lib/supabase/` does **not** exist — it was removed when forms moved from direct-anon-insert to the Edge Function architecture. Do not recreate a browser-side Supabase client for form writes; see `docs/SUPABASE_FORMS.md`.

## Important Routes

```
/
/features
/features/live-agenda
/features/smart-scheduling
/features/tide-weather-context
/features/online-booking
/features/pos-payments
/features/customer-360
/features/gear-rentals
/features/trips-manifests
/features/notifications
/features/reports-dashboard
/features/audit-trail
/features/settings-branding
/solutions/dive-centers
/solutions/kitesurf-surf-schools
/pricing
/comparison
/design-partners
/about
/blog
/blog/[slug]                 (5 posts — see blogPosts in lib/content.ts)
/contact
/legal/privacy
/legal/terms
```

`/features/[slug]` and `/blog/[slug]` are fully static (`generateStaticParams`, async `params` per Next 15+ API) — one page per `featureModules`/`blogPosts` entry in `lib/content.ts`. Adding a new feature or blog post means adding an entry there, not creating a new route file.

## Core Commands

```bash
npm install
npm run dev     # dev server at http://localhost:3000
npm run build   # static export to out/ (this is what CI runs)
npm run start   # serve a production build (rarely needed; site is static)
npm run lint    # eslint . (flat config) — `next lint` was removed in Next.js 16
npm run export  # alias for npm run build (kept for older deploy scripts)
npm test        # node --test on supabase/functions/submit-public-form/*.test.ts and lib/forms/*.test.ts
```

There is no `npm run typecheck` script — run `npx tsc --noEmit` directly when needed.

CI (`.github/workflows/build.yml`) runs `npm ci && npm run build` on push/PR to `main`. Treat a failing `npm run build` as blocking.

## Environment Variables

Public (safe in the browser bundle — see `.env.example`):

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_DEMO_EMAIL=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_FORM_ENDPOINT=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

Server-side only — **Supabase Edge Function secrets**, never read by Next.js code, never in any `NEXT_PUBLIC_*` var:

```env
TURNSTILE_SECRET_KEY=
ALLOWED_ORIGINS=
SUPABASE_SERVICE_ROLE_KEY=
```

(`SUPABASE_SERVICE_ROLE_KEY` is set automatically by Supabase for Edge Functions; `TURNSTILE_SECRET_KEY`/`ALLOWED_ORIGINS` must be set manually via `supabase secrets set ...` — see `docs/SUPABASE_FORMS.md`.)

## Supabase Forms

Full detail: **read `docs/SUPABASE_FORMS.md` before changing forms, migrations, RLS, or the Edge Function.**

- Tables: `contact_submissions`, `design_partner_applications` (`supabase/migrations/0001_...sql`)
- Migration `0002_lock_form_tables_after_turnstile.sql` removed the anon insert policies — **no anon policy of any kind exists on either table now** (insert/select/update/delete all denied for `anon`)
- All writes go through the `submit-public-form` Supabase Edge Function (`supabase/functions/submit-public-form/`), which verifies Turnstile server-side, validates the payload, then inserts using the service role key
- Frontend never inserts into Supabase directly — `lib/forms/submit-public-form.ts` POSTs to the Edge Function instead
- Honeypot field `company_website_confirm` on both forms — if filled, the Edge Function returns a fake success without verifying Turnstile or inserting

## Cloudflare Turnstile

- Widget: `components/forms/TurnstileField.tsx`, uses `@marsidev/react-turnstile`, reads `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Missing site key → dev-only "not configured" notice, renders nothing in production; either way the submit button stays disabled without a token (fail closed)
- Server-side verification happens in the Edge Function via Cloudflare's siteverify API — the frontend token alone is never trusted
- Setup steps and secrets: `docs/SUPABASE_FORMS.md`

## Google Analytics

Full detail: **read `docs/GOOGLE_ANALYTICS.md` before touching analytics.**

- Uses `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Must not run in local development (`NODE_ENV !== "production"`)
- Must not run on `localhost`
- Must not run on `127.0.0.1`
- Must not run on hostnames ending in `.local`
- Runs only in production, on a real deployed domain, and only when the measurement ID is configured — this is re-checked at runtime (not just build time), so a production build served locally still won't fire
- `lib/analytics/google-analytics.ts` — gating logic (`isGoogleAnalyticsEnabled`, `isLocalhost`) + `pageview()`/`event()`, all safe no-ops when disabled
- `components/analytics/GoogleAnalytics.tsx` — loads `gtag.js`; `GoogleAnalyticsPageView.tsx` — tracks App Router client-side navigations (wrapped in `<Suspense>` in `app/layout.tsx`); `CTAEventTracker.tsx` — one delegated click listener keyed off `data-ga-event="..."` attributes on buttons/links, so `Button`/`CTASection` stay server components
- Tracked events: `book_demo_click`, `join_design_partner_click`, `see_pricing_click`, `contact_form_submit_success`, `design_partner_form_submit_success`

## Styling and Design System

Design tokens (`navy`, `ocean`, `aqua`, `teal`, `sky`, `sand`, `ink`, `muted`, `border`, `success`/`warning`/`error`) live in `tailwind.config.ts` and are pulled into Tailwind v4 via the `@config "../tailwind.config.ts";` directive in `app/globals.css` — do not delete that line or the whole design system stops resolving. Fonts (`Inter`, `Manrope`) load via `next/font/google` in `lib/fonts.ts`, wired to `--font-inter`/`--font-manrope` CSS variables. Use existing tokens rather than introducing new hex colors or font stacks.

Global rules in `app/globals.css`: `h1`/`h2` use `text-wrap: balance`; `scroll-behavior: smooth` is gated behind `prefers-reduced-motion: no-preference`; focus-visible outlines are global, not per-component.

Product mockup illustrations (`components/*Mockup.tsx` — `ProductDashboardMockup`, `LiveAgendaMockup`, `TripManifestMockup`, `POSPaymentMockup`, `GearAvailabilityMockup`, `AuditLogMockup`, `ReschedulingWorkflowMockup`, `MobileAgendaMockup`) are hand-built JSX/SVG, registered in `components/mockupRegistry.tsx` and looked up by the `mockup` string field on a `featureModules` entry. They're the site's main "proof" of the product — treat clipped/overflowing text inside them as a high-impact bug.

## Content and SEO Rules

`lib/content.ts` is the source of truth for nearly all copy and structured data (nav links, footer, `featureModules`, `pricingPlans`, `pricingFaq`, `comparisonRows`, `blogPosts`, solution-page lists, `brand`). Add new features/pricing tiers/blog posts/nav items there first — component pages read from it, they don't hardcode copy.

`app/robots.ts` and `app/sitemap.ts` derive from the same content data and read `NEXT_PUBLIC_SITE_URL` (defaults to `https://aquarosters.com`) — update both if routes change. `app/layout.tsx` sets global SEO metadata sourced from `brand` in `lib/content.ts`.

## Pricing Rules

Correct pricing (`lib/content.ts` → `pricingPlans`):
- Starter — €49/month
- Grow — €89/month — Recommended
- Scale — €149/month

Do not use:
- €29 / €59 / €99 (superseded ladder)
- €129
- unsupported pricing

Pricing is sourced from the business-strategy vault (see "Business Source of Truth" below) — do not change these numbers without checking `pricing.md` there first.

## Safe Claims / Unsafe Claims

Safe public claims:
- Built for dive centers and watersports schools
- Now accepting design partners
- Designed for real activity operators
- Simple monthly pricing. 0% commission.
- Built around bookings, staff, gear, POS, trips, and reports

Avoid (unsafe/unsupported):
- Trusted by 500+ operators
- Used by hundreds of dive centers
- Best booking software
- Saves 10 hours per week
- Increases bookings by 30%

## Development Rules

- Static export constraints: no API routes, no middleware/server actions/ISR, `next/image` is unoptimized by config, every generated URL gets a trailing slash (`trailingSlash: true`)
- Dynamic routes (`app/features/[slug]`, `app/blog/[slug]`) must keep `generateStaticParams()` and use the Next 15+ async `params` API (`{ params }: { params: Promise<{ slug: string }> }`, then `await params`)
- `app/robots.ts`/`app/sitemap.ts` require `export const dynamic = "force-static";` under `output: "export"` — do not remove it
- Forms are client components (`"use client"`) that POST to the Edge Function; do not reintroduce a direct Supabase browser insert
- Don't add a new `"use client"` boundary just for analytics/tracking — follow the existing `data-ga-event` attribute + `CTAEventTracker` delegation pattern instead

## Static Export / Deployment Notes

- `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true` in `next.config.mjs`
- CI only validates `npm run build`; there is no deploy step in this repo (no Vercel project files, no other hosting config committed here) — see "Known Gaps"
- The Supabase Edge Function is deployed independently via `supabase functions deploy submit-public-form --no-verify-jwt` (or the Supabase MCP tool if available) — it is not part of the Next.js build

## Security Rules

- Never commit `.env.local` (`.gitignore` covers `.env` and `.env*.local`)
- Never put the database password or a `postgresql://...` connection string in any frontend code or committed file
- Never expose the Supabase **service role key** in the browser — it only exists as an Edge Function secret
- Never expose the Turnstile **secret key** in the browser — Edge Function secret only, verified server-side against Cloudflare's siteverify API
- Never hard-code a real Google Analytics measurement ID in source — always `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Supabase public access model: anon key can no longer read/insert/update/delete either form table directly (post migration `0002`); the Edge Function (service role) is the only writer, and there is still no reader other than the Supabase dashboard/SQL editor

## Testing and Verification

```bash
npm test          # 48 unit tests: form validation, CORS, request/response logic
npm run lint
npm run build
npx tsc --noEmit  # no npm run typecheck script exists
```

Manual test checklist (Turnstile widget behavior, honeypot, RLS): `docs/TESTING.md`.

## Documentation References

Before changing related areas, read:

- `docs/SUPABASE_FORMS.md` — Supabase forms, migrations, RLS, Edge Function, Turnstile setup and secrets.
- `docs/GOOGLE_ANALYTICS.md` — Google Analytics setup, wiring, and local-disable behavior.
- `docs/TESTING.md` — unit test coverage and manual testing checklist.

## Common Change Checklist

- New feature page / blog post → add an entry to `lib/content.ts` (`featureModules`/`blogPosts`), not a new route file
- New pricing tier or price change → update `pricingPlans` in `lib/content.ts` (and this file's "Pricing Rules" if the numbers change)
- Form field change → update the form component, the Edge Function's `validation.ts`, and the matching migration/table if columns change
- New CTA needing tracking → add `data-ga-event="..."` to the `Button`/link, no new client component needed

## Before Committing

```bash
npm run lint
npm run build
grep -R "AquaRoster" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out --exclude=package-lock.json
grep -R "AuquaRosters" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out
grep -R "€29" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out --exclude=CLAUDE.md
grep -R "€59" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out --exclude=CLAUDE.md
grep -R "€99" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out --exclude=CLAUDE.md
grep -R "€129" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out
grep -R "Trusted by 500" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out
grep -R "postgresql://" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out
```

Never commit `.env.local`, `.next/`, `out/`, or `node_modules/`.

## Known Gaps / TODOs

- No deployment target is documented or configured in this repo (no Vercel project, no hosting workflow beyond the build-check CI). Confirm with the user before assuming a specific host.
- No `npm run typecheck` script exists in `package.json` — use `npx tsc --noEmit` directly.
- `npm audit` currently reports 2 moderate vulnerabilities from a postcss version vendored inside Next.js's own `node_modules/next/node_modules/postcss` — not fixable without `npm audit fix --force` downgrading Next.js to a pre-App-Router version (9.3.3), which is not a safe trade-off. Deferred pending an upstream Next.js patch.
- No component/E2E test suite — `npm test` covers form/validation/CORS logic only, and the Turnstile/RLS checklist in `docs/TESTING.md` is manual.
