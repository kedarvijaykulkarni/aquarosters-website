import { Icon } from "./Icon";
import { StatusBadge } from "./StatusBadge";

const sessions = [
  { title: "Open Water Course", time: "08:00", badge: "6/8", tone: "success" as const, chip: "Gear Ready" },
  { title: "Tuesday Reef Trip", time: "09:00", badge: "12/12", tone: "info" as const, chip: "Trip Manifest" },
  { title: "Kitesurf Private Lesson", time: "14:00", badge: "1/1", tone: "success" as const, chip: "Register Open" },
];

export function MobileAgendaMockup() {
  return (
    <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[2rem] border border-border bg-navy p-2 shadow-float">
      <div className="rounded-[1.5rem] bg-sand">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <p className="font-display text-sm font-bold text-navy">Live Agenda</p>
          <Icon name="menu" className="w-4 h-4 text-navy" />
        </div>
        <p className="px-4 text-[11px] text-muted">Thursday, Oct 22 · 24 sessions</p>
        <div className="flex flex-col gap-2 p-4">
          {sessions.map((session) => (
            <div key={session.title} className="rounded-xl border border-border bg-white p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-navy">{session.title}</p>
                <span className="rounded bg-sky px-1.5 py-0.5 text-[10px] font-bold text-ocean">{session.badge}</span>
              </div>
              <p className="mt-1 text-[10px] text-muted">{session.time}</p>
              <div className="mt-2">
                <StatusBadge label={session.chip} tone={session.tone} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
