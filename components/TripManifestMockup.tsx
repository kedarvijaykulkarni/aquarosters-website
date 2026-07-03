import { Icon } from "./Icon";
import { StatusBadge } from "./StatusBadge";

const participants = [
  { name: "L. Fontaine", cert: "Advanced Open Water", gear: "Full set assigned", payment: "Deposit Paid" },
  { name: "T. Reyes", cert: "Rescue Diver", gear: "Full set assigned", payment: "Balance Due" },
  { name: "K. Almeida", cert: "Open Water", gear: "Full set assigned", payment: "Deposit Paid" },
];

export function TripManifestMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-float">
      <div className="flex items-center justify-between border-b border-border bg-navy px-6 py-4 text-white">
        <div className="flex items-center gap-2">
          <Icon name="ship" className="w-5 h-5 text-aqua" />
          <div>
            <p className="font-display font-semibold">Tuesday Reef Trip</p>
            <p className="text-xs text-white/60">Boat: Explorer I · 09:00 – 13:00</p>
          </div>
        </div>
        <StatusBadge label="Trip Manifest" tone="info" />
      </div>
      <div className="divide-y divide-border">
        {participants.map((p) => (
          <div key={p.name} className="grid grid-cols-1 gap-2 px-6 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-sm font-semibold text-navy">{p.name}</p>
              <p className="mt-0.5 text-xs text-muted">Certification: {p.cert}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <StatusBadge label={p.gear} tone="success" />
              <StatusBadge label={p.payment} tone={p.payment === "Balance Due" ? "warning" : "success"} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border bg-sand px-6 py-3 text-xs text-muted">
        <span>Staff Assigned: 2 instructors</span>
        <span>12/12 participants</span>
      </div>
    </div>
  );
}
