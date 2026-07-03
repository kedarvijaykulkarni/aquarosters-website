import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { PricingCard } from "@/components/PricingCard";
import { Icon } from "@/components/Icon";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { pricingPlans, pricingMatrixRows, pricingFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "AquaRosters Pricing — Simple Monthly Plans with 0% Commission",
  description:
    "Simple AquaRosters pricing for dive centers and watersports schools. Starter €29, Grow €59, Scale €99. 0% commission on direct bookings.",
};

export default function PricingPage() {
  return (
    <main className="py-12 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold text-navy md:text-5xl">
            Simple pricing for real operators.
          </h1>
          <p className="mt-4 text-lg text-muted">
            0% commission on direct bookings. Monthly plans. No per-staff seat shock.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mt-20">
          <SectionHeader title="Compare plans" />
          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-card">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-sky/60">
                  <th className="p-4 font-display font-semibold text-navy">Feature</th>
                  {pricingPlans.map((plan) => (
                    <th key={plan.name} className="p-4 text-center font-display font-semibold text-navy">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingMatrixRows.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium text-ink">{row.label}</td>
                    {row.values.map((included, index) => (
                      <td key={index} className="p-4 text-center">
                        {included ? (
                          <Icon name="check" className="mx-auto w-5 h-5 text-teal" />
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-20">
          <SectionHeader title="Pricing FAQ" />
          <FAQ items={pricingFaq} />
        </div>
      </Container>
      <div className="mt-20">
        <CTASection title="Ready to see AquaRosters running your operational day?" />
      </div>
    </main>
  );
}
