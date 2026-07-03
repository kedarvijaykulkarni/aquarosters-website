import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { WorkflowSteps } from "@/components/WorkflowSteps";
import { TripManifestMockup } from "@/components/TripManifestMockup";
import { CTASection } from "@/components/CTASection";
import { diveCenterFeatures } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dive Center Booking & Operations Software — AquaRosters",
  description:
    "AquaRosters helps dive centers manage bookings, boat trips, certifications, gear, POS, deposits, trip manifests, and daily operations from one live agenda.",
};

const workflowSteps = [
  "Online booking / POS",
  "Customer + participant data",
  "Certification/license capture",
  "Session + gear visibility",
  "Trip manifest",
  "Payment + reporting",
];

export default function DiveCentersPage() {
  return (
    <main className="py-12 md:py-20">
      <Container>
        <Breadcrumbs items={[{ label: "Solutions", href: "/solutions/dive-centers" }, { label: "Dive Centers" }]} />
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-navy md:text-5xl">
            Bookings, boats, gear, and divers — finally in one place.
          </h1>
          <p className="mt-4 text-lg text-muted">
            AquaRosters helps dive centers manage courses, boat trips, certifications, participant
            records, gear, deposits, POS, and daily operations from one live agenda.
          </p>
        </div>

        <div className="mt-16">
          <SectionHeader
            align="left"
            title="The dive center challenge"
            subheadline="Courses, boat trips, certifications, gear, and payments all move independently in most setups — until someone has to reconcile them by hand before a trip leaves the dock."
          />
        </div>

        <div className="mt-4">
          <h2 className="font-display text-2xl font-bold text-navy">Booking-to-manifest workflow</h2>
          <div className="mt-6">
            <WorkflowSteps steps={workflowSteps} />
          </div>
        </div>

        <div className="mt-16">
          <TripManifestMockup />
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-navy">Built for dive center operations</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {diveCenterFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 shadow-card"
              >
                <Icon name="check-circle" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                <span className="text-sm font-medium text-ink">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <div className="mt-20">
        <CTASection title="Book a Demo for Your Dive Center" />
      </div>
    </main>
  );
}
