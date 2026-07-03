import { StatusBadge } from "./StatusBadge";

const gearUnits = [
  { unit: "BCD #04", status: "Gear Ready", tone: "success" as const },
  { unit: "Regulator #11", status: "Assigned — Tuesday Reef Trip", tone: "info" as const },
  { unit: "Wetsuit #07 (M)", status: "Gear Check Due", tone: "warning" as const },
  { unit: "Kite 9m #02", status: "Gear Ready", tone: "success" as const },
  { unit: "Tank #23", status: "Maintenance Block", tone: "error" as const },
];

export function GearAvailabilityMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-float">
      <div className="flex items-center justify-between border-b border-border bg-sand px-6 py-4">
        <p className="font-display font-semibold text-navy">Gear Availability</p>
        <span className="text-xs text-muted">Thursday, Oct 22</span>
      </div>
      <div className="divide-y divide-border">
        {gearUnits.map((gear) => (
          <div key={gear.unit} className="flex items-center justify-between px-6 py-3.5">
            <span className="text-sm font-medium text-navy">{gear.unit}</span>
            <StatusBadge label={gear.status} tone={gear.tone} />
          </div>
        ))}
      </div>
    </div>
  );
}
