import { Icon } from "./Icon";
import { Button } from "./Button";
import type { PricingPlan } from "@/lib/content";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-8 h-full ${
        plan.recommended ? "border-ocean bg-navy text-white shadow-float relative" : "border-border bg-white shadow-card"
      }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-8 rounded-full bg-aqua px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
          Recommended
        </span>
      )}
      <h3 className={`font-display text-xl font-bold ${plan.recommended ? "text-white" : "text-navy"}`}>
        {plan.name}
      </h3>
      <p className={`mt-2 text-3xl font-bold font-display ${plan.recommended ? "text-white" : "text-navy"}`}>
        {plan.price}
      </p>
      <p className={`mt-2 text-sm ${plan.recommended ? "text-white/70" : "text-muted"}`}>{plan.audience}</p>
      <ul className="mt-6 flex flex-col gap-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Icon name="check" className={`w-4 h-4 shrink-0 ${plan.recommended ? "text-aqua" : "text-teal"}`} />
            <span className={plan.recommended ? "text-white/90" : "text-ink"}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href="/contact"
        variant={plan.recommended ? "primary" : "secondary"}
        className={`mt-8 w-full ${plan.recommended ? "bg-aqua text-navy hover:bg-teal hover:text-white" : ""}`}
      >
        Book a Demo
      </Button>
    </div>
  );
}
