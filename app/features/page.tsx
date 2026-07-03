import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { FeatureCard } from "@/components/FeatureCard";
import { CTASection } from "@/components/CTASection";
import { featureModules } from "@/lib/content";

export const metadata: Metadata = {
  title: "AquaRosters Features — Live Agenda, POS, Gear, Trips & Reports",
  description:
    "Explore AquaRosters features for dive centers and watersports schools: live agenda, smart scheduling, online booking, POS, gear rentals, trip manifests, notifications, reports, and audit trail.",
};

export default function FeaturesPage() {
  return (
    <main className="py-16 md:py-24">
      <Container>
        <SectionHeader
          align="left"
          title="Everything connected to the live agenda."
          subheadline="AquaRosters brings scheduling, bookings, staff, participants, gear, POS, trips, notifications, reports, and audit history into one operational system."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureModules.map((feature) => (
            <FeatureCard
              key={feature.slug}
              icon={feature.icon}
              title={feature.title}
              description={feature.oneLiner}
              href={`/features/${feature.slug}`}
            />
          ))}
        </div>
      </Container>
      <div className="mt-20">
        <CTASection title="Ready to see it running your operational day?" />
      </div>
    </main>
  );
}
