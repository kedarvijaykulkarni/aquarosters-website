import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CTASection } from "@/components/CTASection";
import { comparisonRows } from "@/lib/content";

export const metadata: Metadata = {
  title: "AquaRosters Comparison — Beyond Spreadsheets, WhatsApp & Booking Tools",
  description:
    "Compare AquaRosters with spreadsheets, WhatsApp, generic booking tools, OTA dependency, and broad legacy platforms.",
};

const sections = [
  {
    title: "Against spreadsheets and WhatsApp",
    body: "Spreadsheets and group chats are flexible and familiar, but every update is manual. AquaRosters ties every change to a session, a participant, and a record — so the plan and the reality stay in sync.",
  },
  {
    title: "Against generic booking tools",
    body: "Generic booking tools answer one question: is this slot free? AquaRosters runs the operational day around that booking — staff, gear, trips, payments, and reports included.",
  },
  {
    title: "Against OTA dependency",
    body: "Marketplaces bring reach, at the cost of commission on every booking, including ones you would have gotten anyway. AquaRosters keeps direct bookings direct, at 0% commission.",
  },
  {
    title: "Against broad legacy platforms",
    body: "Broad, all-purpose platforms add complexity for features watersports operators never use. AquaRosters is focused on the workflows dive centers and watersports schools actually run.",
  },
];

export default function ComparisonPage() {
  return (
    <main className="py-12 md:py-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-navy md:text-5xl">
            AquaRosters vs spreadsheets, WhatsApp, generic booking tools, and commission-heavy channels.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Generic booking tools sell slots. AquaRosters runs the operational day.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-border bg-white p-6 shadow-card">
              <h2 className="font-display text-xl font-semibold text-navy">{section.title}</h2>
              <p className="mt-3 text-muted">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeader title="At a glance" />
          <ComparisonTable rows={comparisonRows} />
        </div>
      </Container>
      <div className="mt-20">
        <CTASection title="See what running the operational day actually looks like." />
      </div>
    </main>
  );
}
