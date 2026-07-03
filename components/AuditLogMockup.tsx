import { Icon } from "./Icon";

const entries = [
  { actor: "Mara D.", action: "Session Moved", detail: "Kitesurf Private Lesson · 09:00 → 11:30", time: "10:42 AM" },
  { actor: "System", action: "Notification Queued", detail: "Reschedule notice sent to 1 participant", time: "10:42 AM" },
  { actor: "Iain P.", action: "Gear Check Due", detail: "Tank #23 flagged for maintenance", time: "09:15 AM" },
  { actor: "Front Desk", action: "Deposit Paid", detail: "Open Water Course · €100 deposit", time: "08:05 AM" },
];

export function AuditLogMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-float">
      <div className="flex items-center gap-2 border-b border-border bg-navy px-6 py-4 text-white">
        <Icon name="shield-check" className="w-5 h-5 text-aqua" />
        <p className="font-display font-semibold">Audit Log Updated</p>
      </div>
      <div className="divide-y divide-border">
        {entries.map((entry) => (
          <div key={entry.time + entry.action} className="flex items-start justify-between gap-4 px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-navy">{entry.action}</p>
              <p className="mt-0.5 text-xs text-muted">{entry.detail}</p>
              <p className="mt-1 text-[11px] text-muted">By {entry.actor}</p>
            </div>
            <span className="shrink-0 text-xs text-muted">{entry.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
