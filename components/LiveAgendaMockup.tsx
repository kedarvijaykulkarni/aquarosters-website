import { Icon } from "./Icon";
import { StatusBadge } from "./StatusBadge";

const rows = [
  {
    time: "08:00 – 12:00",
    title: "Open Water Course",
    staff: "Mara D.",
    gear: "Gear Ready",
    payment: "Deposit Paid",
    participants: "6/8 participants",
  },
  {
    time: "09:00 – 13:00",
    title: "Tuesday Reef Trip",
    staff: "Staff Assigned",
    gear: "Trip Manifest",
    payment: "Register Open",
    participants: "12/12 participants",
  },
  {
    time: "13:00 – 15:00",
    title: "Discover Scuba",
    staff: "Iain P.",
    gear: "Gear Check Due",
    payment: "Balance Due",
    participants: "3/6 participants",
  },
  {
    time: "14:00 – 16:00",
    title: "Kitesurf Private Lesson",
    staff: "Sofia R.",
    gear: "Instructor Conflict Check Passed",
    payment: "Deposit Paid",
    participants: "1/1 participants",
  },
];

export function LiveAgendaMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-float">
      <div className="flex items-center justify-between border-b border-border bg-sand px-6 py-4">
        <div className="flex items-center gap-2">
          <p className="font-display font-semibold text-navy">Live Agenda</p>
          <span className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs text-ocean">
            <Icon name="calendar" className="w-3.5 h-3.5" /> Thursday, Oct 22
          </span>
        </div>
        <div className="hidden items-center gap-2 text-xs text-muted sm:flex">
          <span className="rounded-lg bg-white px-2.5 py-1 font-semibold text-navy">By Activity</span>
          <span>By Staff</span>
          <span>By Trip</span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.title} className="grid grid-cols-1 gap-2 px-6 py-4 sm:grid-cols-[100px_1fr_auto] sm:items-center sm:gap-4">
            <p className="text-xs font-semibold text-muted">{row.time}</p>
            <div>
              <p className="text-sm font-semibold text-navy">{row.title}</p>
              <p className="mt-0.5 text-xs text-muted">Instructor: {row.staff}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <StatusBadge label={row.participants} tone="info" />
              <StatusBadge label={row.gear} tone={row.gear.includes("Due") ? "warning" : "success"} />
              <StatusBadge label={row.payment} tone={row.payment === "Balance Due" ? "warning" : "success"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
