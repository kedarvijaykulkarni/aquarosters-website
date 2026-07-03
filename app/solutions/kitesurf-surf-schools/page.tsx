import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { WorkflowSteps } from "@/components/WorkflowSteps";
import { ReschedulingWorkflowMockup } from "@/components/ReschedulingWorkflowMockup";
import { MobileAgendaMockup } from "@/components/MobileAgendaMockup";
import { CTASection } from "@/components/CTASection";
import { kitesurfFeatures } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kitesurf & Surf School Scheduling Software — AquaRosters",
  description:
    "AquaRosters helps surf and kitesurf schools reschedule sessions, manage instructors, transfer participants, notify customers, and align operations when wind or tide changes.",
};

const workflowSteps = [
  "Weather/tide context",
  "Reschedule session",
  "Reassign instructor",
  "Move participants",
  "Notify customers",
  "Keep audit trail",
];

export default function KitesurfSurfSchoolsPage() {
  return (
    <main className="py-12 md:py-20">
      <Container>
        <Breadcrumbs
          items={[{ label: "Solutions", href: "/solutions/kitesurf-surf-schools" }, { label: "Kitesurf & Surf Schools" }]}
        />
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-navy md:text-5xl">
            When the wind shifts, your schedule shifts with it.
          </h1>
          <p className="mt-4 text-lg text-muted">
            AquaRosters helps surf and kitesurf schools move sessions, reassign instructors, transfer
            participants, notify customers, and keep operations aligned when conditions change.
          </p>
        </div>

        <div className="mt-16">
          <SectionHeader
            align="left"
            title="The weather-dependent scheduling challenge"
            subheadline="Wind and tide don't wait for a spreadsheet to be updated. Every condition change ripples through instructor assignments, participant lists, and customer notifications."
          />
        </div>

        <div className="mt-4">
          <h2 className="font-display text-2xl font-bold text-navy">Rescheduling workflow</h2>
          <div className="mt-6">
            <WorkflowSteps steps={workflowSteps} />
          </div>
        </div>

        <div className="mt-16">
          <ReschedulingWorkflowMockup />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_260px] lg:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Built for wind- and tide-dependent schools</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {kitesurfFeatures.map((feature) => (
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
          <div>
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-wide text-muted">
              Mobile-friendly agenda
            </p>
            <MobileAgendaMockup />
          </div>
        </div>
      </Container>
      <div className="mt-20">
        <CTASection title="Book a Demo for Your School" />
      </div>
    </main>
  );
}
