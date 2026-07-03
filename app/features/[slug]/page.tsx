import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { ModuleCard } from "@/components/ModuleCard";
import { CTASection } from "@/components/CTASection";
import { mockupRegistry } from "@/components/mockupRegistry";
import { featureModules } from "@/lib/content";

export function generateStaticParams() {
  return featureModules.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const feature = featureModules.find((item) => item.slug === slug);
  if (!feature) return {};
  return {
    title: `${feature.title} — AquaRosters`,
    description: feature.subheadline,
  };
}

export default async function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = featureModules.find((item) => item.slug === slug);
  if (!feature) notFound();

  const Mockup = mockupRegistry[feature.mockup] ?? mockupRegistry.ProductDashboardMockup;
  const related = featureModules.filter((item) => item.slug !== feature.slug).slice(0, 3);

  return (
    <main className="py-12 md:py-20">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Features", href: "/features" },
            { label: feature.title },
          ]}
        />
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ocean">{feature.eyebrow}</p>
          <h1 className="font-display text-3xl font-bold text-navy md:text-5xl">{feature.h1}</h1>
          <p className="mt-4 text-lg text-muted">{feature.subheadline}</p>
        </div>

        <div className="mt-12">
          <Mockup />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">The problem</h2>
            <p className="mt-4 text-muted">{feature.problem}</p>

            <h2 className="mt-10 font-display text-2xl font-bold text-navy">How it works</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {feature.howItWorks.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink">
                  <Icon name="check" className="mt-0.5 w-5 h-5 shrink-0 text-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Benefits</h2>
            <ul className="mt-4 grid gap-3">
              {feature.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-navy shadow-card"
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-2xl font-bold text-navy">Related modules</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <ModuleCard
                key={item.slug}
                icon={item.icon}
                title={item.title}
                description={item.oneLiner}
                href={`/features/${item.slug}`}
              />
            ))}
          </div>
        </div>
      </Container>
      <div className="mt-20">
        <CTASection title={`See ${feature.title} running your operational day.`} />
      </div>
    </main>
  );
}
