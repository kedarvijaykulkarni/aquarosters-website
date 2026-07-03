# Google Analytics Setup

AquaRosters supports Google Analytics through the environment variable:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Local setup

Create `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
```

Do not commit `.env.local`.

## Production setup

Set the same variable in the hosting provider dashboard.

## Development and localhost behavior

Google Analytics is intentionally disabled during local development.

GA will not load or send page views/events when:

- `NODE_ENV !== "production"`
- The hostname is `localhost`
- The hostname is `127.0.0.1`
- The hostname ends with `.local`

This prevents test visits, local QA, and developer navigation from polluting production analytics. It also covers the case of running a production build locally (`npm run build` then serving `out/` from `localhost`) — the inline init script re-checks the hostname at runtime, not just at build time, so a production build served locally still won't send data.

## How it's wired

- `lib/analytics/google-analytics.ts` — `GA_MEASUREMENT_ID`, `isLocalhost()`, `isGoogleAnalyticsEnabled()`, `pageview()`, `event()`. Every exported function is a safe no-op when GA is disabled; none of them throw.
- `types/gtag.d.ts` — ambient `window.dataLayer` / `window.gtag` type declarations.
- `components/analytics/GoogleAnalytics.tsx` — loads `gtag.js` and bootstraps `dataLayer`/`gtag` via `next/script` (`afterInteractive`). Renders nothing if the measurement ID is missing or `NODE_ENV !== "production"`.
- `components/analytics/GoogleAnalyticsPageView.tsx` — fires a `pageview()` on every App Router client-side navigation (`usePathname`/`useSearchParams`). Wrapped in `<Suspense>` in `app/layout.tsx` since `useSearchParams` requires it.
- `components/analytics/CTAEventTracker.tsx` — a single document-level click listener that fires `event()` for any element carrying a `data-ga-event="..."` attribute. This keeps the CTA buttons themselves as plain server components — no page had to become a client component to get click tracking.

## Notes

- The GA script loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is present.
- The GA script loads only in production.
- Page views are tracked for App Router client-side navigation.
- CTA clicks (`book_demo_click`, `join_design_partner_click`, `see_pricing_click`) and successful form submissions (`contact_form_submit_success`, `design_partner_form_submit_success`) are tracked via `event()`.
- Do not hard-code the GA ID in source files.
