import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { Icon } from "@/components/Icon";
import { DesignPartnerForm } from "@/components/DesignPartnerForm";
import { designPartnerBenefits } from "@/lib/content";

export const metadata: Metadata = {
  title: "AquaRosters Design Partner Program",
  description:
    "Join the AquaRosters design partner program for dive centers and watersports schools. Help shape live agenda, POS, gear, reports, and daily operations workflows.",
};

const whoItIsFor = [
  "Dive centers, kitesurf schools, surf schools, and rental operators",
  "Teams currently running on spreadsheets, WhatsApp, or a generic booking tool",
  "Operators willing to test early workflows and give direct feedback",
];

const whatWeAsk = [
  "A 20-minute discovery call to understand your operation",
  "Regular feedback during early access",
  "Willingness to be a launch case study (optional)",
];

export default function DesignPartnersPage() {
  return (
    <main className="py-12 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold text-navy md:text-5xl">
            Become an AquaRosters design partner.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Help shape the live operations platform for dive centers and watersports schools.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader align="left" title="Who it’s for" />
            <ul className="flex flex-col gap-3">
              {whoItIsFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink">
                  <Icon name="check-circle" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <SectionHeader align="left" title="What you get" />
              <ul className="flex flex-col gap-3">
                {designPartnerBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-ink">
                    <Icon name="check-circle" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <SectionHeader align="left" title="What we ask from you" />
              <ul className="flex flex-col gap-3">
                {whatWeAsk.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-ink">
                    <Icon name="check" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Apply as Design Partner</h2>
            <p className="mt-2 text-muted">
              Tell us about your operation and the problem you’re trying to solve.
            </p>
            <div className="mt-6">
              <DesignPartnerForm />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
