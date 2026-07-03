// Google Analytics 4 helpers. Safe to import from client components only —
// every exported function is a no-op (never throws) when GA is unconfigured,
// outside production, or running on localhost. See docs/GOOGLE_ANALYTICS.md.

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function isLocalhost(): boolean {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;

  return hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local");
}

export function isGoogleAnalyticsEnabled(): boolean {
  if (!GA_MEASUREMENT_ID) return false;
  if (process.env.NODE_ENV !== "production") return false;
  if (typeof window !== "undefined" && isLocalhost()) return false;

  return true;
}

export function pageview(url: string): void {
  if (!isGoogleAnalyticsEnabled()) return;
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function event(action: string, params?: Record<string, string | number | boolean>): void {
  if (!isGoogleAnalyticsEnabled()) return;
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", action, params);
}
