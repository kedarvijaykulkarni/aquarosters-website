import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { inter, manrope } from "@/lib/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { brand } from "@/lib/content";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleAnalyticsPageView } from "@/components/analytics/GoogleAnalyticsPageView";
import { CTAEventTracker } from "@/components/analytics/CTAEventTracker";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aquarosters.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AquaRosters — Live Operations Platform for Dive Centers & Watersports Schools",
  description: brand.description,
  keywords: [
    "dive center booking software",
    "watersports booking software",
    "kitesurf school scheduling software",
    "surf school booking platform",
    "activity center operations software",
    "rental gear management software",
    "POS for activity operators",
    "trip manifest software",
    "staff scheduling for watersports schools",
    "0% commission booking software",
  ],
  openGraph: {
    title: "AquaRosters — Live Operations Platform for Dive Centers & Watersports Schools",
    description: brand.description,
    url: siteUrl,
    siteName: "AquaRosters",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AquaRosters",
    description: brand.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <CTAEventTracker />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
