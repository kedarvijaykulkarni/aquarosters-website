import { Icon } from "./Icon";
import { StatusBadge } from "./StatusBadge";
import { MetricCard } from "./MetricCard";

const lineItems = [
  { label: "Open Water Course × 2", amount: "€360" },
  { label: "Gear rental — BCD & regulator", amount: "€40" },
  { label: "Deposit applied", amount: "-€100" },
];

export function POSPaymentMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-float">
      <div className="flex items-center justify-between border-b border-border bg-navy px-6 py-4 text-white">
        <div className="flex items-center gap-2">
          <Icon name="credit-card" className="w-5 h-5 text-aqua" />
          <p className="font-display font-semibold">Front Desk POS</p>
        </div>
        <StatusBadge label="Register Open" tone="success" />
      </div>
      <div className="p-6">
        <div className="rounded-xl border border-border">
          {lineItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between border-b border-border px-4 py-3 last:border-0">
              <span className="text-sm text-ink">{item.label}</span>
              <span className="text-sm font-semibold text-navy">{item.amount}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MetricCard label="Deposit Paid" value="€100" />
          <MetricCard label="Balance Due" value="€260" />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-lg bg-sky px-3 py-2 text-sm font-semibold text-ocean">€1,240 revenue today</span>
          <StatusBadge label="Deposit Paid" tone="success" />
        </div>
      </div>
    </div>
  );
}
