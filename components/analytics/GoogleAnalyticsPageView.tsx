"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isGoogleAnalyticsEnabled, pageview } from "@/lib/analytics/google-analytics";

// Fires a GA pageview on every App Router client-side navigation. A no-op
// in development, on localhost, or when GA isn't configured — see
// lib/analytics/google-analytics.ts.
export function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGoogleAnalyticsEnabled()) return;
    if (!pathname) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
