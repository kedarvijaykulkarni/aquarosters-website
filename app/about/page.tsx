import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About AquaRosters — Built for Activity Operators",
  description: "AquaRosters is being built as the live operational agenda for dive centers and watersports schools.",
};

export default function AboutPage() {
  return (
    <main className="py-12 md:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-navy md:text-5xl">
          Built for operators whose plans change daily.
        </h1>
        <div className="mt-8 flex flex-col gap-5 text-lg text-ink">
          <p>
            AquaRosters started from a simple observation: activity operators do not just need a
            booking form. They need a reliable way to run the day.
          </p>
          <p>
            In watersports and adventure operations, everything changes quickly — weather, tide,
            instructor availability, customer delays, gear issues, and last-minute bookings.
          </p>
          <p>
            AquaRosters is being built as the live operational agenda for these businesses.
          </p>
        </div>
      </Container>
      <div className="mt-20">
        <CTASection title="Want to help shape how AquaRosters works?" />
      </div>
    </main>
  );
}
