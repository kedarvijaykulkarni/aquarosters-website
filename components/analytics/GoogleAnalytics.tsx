"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics/google-analytics";

// Loads the Google Analytics gtag.js script and bootstraps dataLayer/gtag.
// Renders nothing outside production or when NEXT_PUBLIC_GA_MEASUREMENT_ID
// is unset. The inline init script also re-checks the hostname at runtime —
// a production build can still end up served from localhost (e.g. `npx
// serve out/` while testing a static export locally), so the build-time
// env check alone isn't enough to guarantee GA stays off there.
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          if (
            window.location.hostname !== 'localhost' &&
            window.location.hostname !== '127.0.0.1' &&
            !window.location.hostname.endsWith('.local')
          ) {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          }
        `}
      </Script>
    </>
  );
}
