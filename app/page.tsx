import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { SectionHeader } from "@/components/SectionHeader";
import { Icon } from "@/components/Icon";
import { ModuleCard } from "@/components/ModuleCard";
import { FeatureCard } from "@/components/FeatureCard";
import { PricingCard } from "@/components/PricingCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CTASection } from "@/components/CTASection";
import { WorkflowSteps } from "@/components/WorkflowSteps";
import { ProductDashboardMockup } from "@/components/ProductDashboardMockup";
import { ReschedulingWorkflowMockup } from "@/components/ReschedulingWorkflowMockup";
import { TripManifestMockup } from "@/components/TripManifestMockup";
import {
  productPillars,
  problemCards,
  hubModules,
  featureModules,
  pricingPlans,
  comparisonRows,
  designPartnerBenefits,
  diveCenterFeatures,
  kitesurfFeatures,
} from "@/lib/content";

const heroBullets = [
  "Live agenda for sessions, staff, participants, and gear",
  "POS + online booking with shared availability",
  "Trip manifests, participant records, reminders, and reports",
  "0% commission on direct bookings",
];

const notJustBookingBullets = [
  "Tide-aware agenda",
  "Drag-and-drop rescheduling",
  "Participant transfer between sessions",
  "Gear unavailable if rented, blocked, or assigned to a trip",
  "Trip manifests with participant certification details",
  "Mobile-first daily workflows",
];

const kitesurfWorkflowSteps = [
  "Weather alert",
  "Reschedule session",
  "Reassign instructor",
  "Move participants",
  "Notify customers",
  "Audit trail updated",
];

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <section className="pt-14 pb-20 md:pt-20 md:pb-28">
        <Container wide>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge>Built for dive centers and watersports schools</Badge>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-navy md:text-6xl">
                Run your activity center from one live agenda.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted">
                AquaRosters helps dive centers and watersports schools manage bookings, staff, gear,
                participants, payments, trips, and daily schedule changes — with simple monthly pricing
                and 0% commission.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {heroBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-ink">
                    <Icon name="check-circle" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact" variant="primary" data-ga-event="book_demo_click">Book a Demo</Button>
                <Button href="/design-partners" variant="secondary" data-ga-event="join_design_partner_click">Join Design Partner Program</Button>
              </div>
              <p className="mt-6 text-sm text-muted">
                Now accepting early design partners from dive and watersports operators.
              </p>
            </div>
            <ProductDashboardMockup />
          </div>
        </Container>
      </section>

      {/* 2. Problem */}
      <section className="bg-sky/50 py-20 md:py-28">
        <Container>
          <SectionHeader
            title="Your business moves fast. Your tools do not."
            subheadline="Every day, activity operators manage changing weather, instructor availability, customer questions, gear conflicts, no-shows, deposits, last-minute bookings, and schedule changes. Spreadsheets and WhatsApp help teams survive the day, but they do not create one reliable source of truth."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {problemCards.map((card) => (
              <div key={card.title} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky text-ocean">
                  <Icon name={card.icon} className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-navy">{card.title}</p>
                  <p className="text-xs text-muted">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Solution hub-and-spoke */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title="One system for the entire operational day."
            subheadline="AquaRosters connects your live agenda, POS, online booking, staff roles, customer records, rental gear, trip manifests, payments, reminders, and reports — so your team can plan, sell, move, notify, and close the day without switching tools."
          />
          <div className="flex flex-col items-center gap-8">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-navy text-center shadow-float">
              <span className="font-display text-sm font-bold text-aqua">Live Agenda</span>
            </div>
            <div className="grid w-full max-w-3xl grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-3">
              {hubModules.map((module) => (
                <div
                  key={module}
                  className="rounded-xl border border-border bg-white px-4 py-3 text-center text-sm font-medium text-ink shadow-card"
                >
                  {module}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Product Pillars */}
      <section className="bg-sand py-20 md:py-28">
        <Container>
          <SectionHeader title="Plan, sell, operate, communicate, and measure from one place." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {productPillars.map((pillar) => (
              <ModuleCard
                key={pillar.title}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                detail={pillar.detail}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Built for Watersports Reality */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                title="Not just a booking calendar."
                subheadline="Generic booking tools sell slots. AquaRosters runs the operational day."
              />
              <ul className="flex flex-col gap-3">
                {notJustBookingBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-ink">
                    <Icon name="check-circle" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ReschedulingWorkflowMockup />
          </div>
        </Container>
      </section>

      {/* 6. Dive Centers Use Case */}
      <section className="bg-sky/50 py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <TripManifestMockup />
            <div>
              <SectionHeader
                align="left"
                title="Bookings, boats, gear, and divers — finally in one place."
                subheadline="Manage dive courses, boat trips, participant certifications, license numbers, gear assignments, trip manifests, deposits, and front-desk sales from one platform."
              />
              <ul className="flex flex-col gap-3">
                {diveCenterFeatures.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-ink">
                    <Icon name="check-circle" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Button href="/solutions/dive-centers" variant="primary" className="mt-8">
                Explore Dive Center Workflows
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Kitesurf / Surf Schools Use Case */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title="When the wind shifts, your schedule shifts with it."
            subheadline="Move sessions, reassign instructors, transfer participants, notify customers, and keep your team aligned when wind, tide, or weather changes the plan."
          />
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              {kitesurfFeatures.map((bullet) => (
                <div key={bullet} className="flex items-start gap-2 text-ink">
                  <Icon name="check-circle" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <WorkflowSteps steps={kitesurfWorkflowSteps} />
          </div>
          <div className="mt-10 text-center">
            <Button href="/solutions/kitesurf-surf-schools" variant="primary">
              Explore Surf &amp; Kitesurf Workflows
            </Button>
          </div>
        </Container>
      </section>

      {/* 8. Feature Modules */}
      <section className="bg-sand py-20 md:py-28">
        <Container>
          <SectionHeader title="Everything connected to the live agenda." />
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
      </section>

      {/* 9. Pricing Preview */}
      <section className="py-20 md:py-28" id="pricing">
        <Container>
          <SectionHeader
            title="Simple monthly pricing. 0% commission."
            subheadline="No booking commission. No per-staff seat shock. No hidden fee for every customer you bring in directly."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/pricing" variant="secondary" data-ga-event="see_pricing_click">See Pricing</Button>
          </div>
        </Container>
      </section>

      {/* 10. Comparison */}
      <section className="bg-sky/50 py-20 md:py-28">
        <Container>
          <SectionHeader title="AquaRosters replaces the tools that were never built to run your day." />
          <ComparisonTable rows={comparisonRows} />
        </Container>
      </section>

      {/* 11. Design Partner Program */}
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Help shape the future of watersports operations.
          </h2>
          <p className="mt-4 text-lg text-muted">
            We are looking for early dive centers and watersports schools to validate workflows, test
            the first product experience, and help shape AquaRosters before public launch.
          </p>
          <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {designPartnerBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-ink">
                <Icon name="check-circle" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <Button href="/design-partners" variant="primary" className="mt-10" data-ga-event="join_design_partner_click">
            Join Design Partner Program
          </Button>
        </Container>
      </section>

      {/* 12. Final CTA */}
      <CTASection
        title="Ready to stop running your activity center from spreadsheets?"
        description="Bring bookings, staff, gear, payments, trips, and reports into one live operating system."
      />
    </main>
  );
}
