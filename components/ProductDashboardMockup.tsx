import { Icon } from "./Icon";
import { StatusBadge } from "./StatusBadge";

const sidebarIcons = ["calendar", "users", "ship", "package", "credit-card", "bar-chart"];

function SessionCard({
  title,
  time,
  instructor,
  badge,
  accent,
  chips,
}: {
  title: string;
  time: string;
  instructor: string;
  badge: string;
  accent: string;
  chips: { label: string; tone: "success" | "warning" | "info" }[];
}) {
  return (
    <div className={`rounded-xl border border-border bg-white p-3 shadow-card border-l-4 ${accent}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-navy">{title}</p>
        <span className="shrink-0 rounded bg-sky px-2 py-0.5 text-[11px] font-bold text-ocean">{badge}</span>
      </div>
      <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
        <Icon name="clock" className="w-3 h-3" /> {time}
      </p>
      <p className="mt-1 text-[11px] text-muted">Instructor: {instructor}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {chips.map((chip) => (
          <StatusBadge key={chip.label} label={chip.label} tone={chip.tone} />
        ))}
      </div>
    </div>
  );
}

export function ProductDashboardMockup() {
  return (
    <div className="flex w-full overflow-hidden rounded-2xl border border-border bg-navy shadow-float">
      <div className="hidden w-14 shrink-0 flex-col items-center gap-5 border-r border-white/10 bg-navy py-5 sm:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-aqua text-xs font-bold text-navy">
          AR
        </span>
        {sidebarIcons.map((icon, index) => (
          <span
            key={icon}
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              index === 0 ? "bg-white/10 text-aqua" : "text-white/40"
            }`}
          >
            <Icon name={icon} className="w-4 h-4" />
          </span>
        ))}
      </div>

      <div className="flex-1 bg-sand">
        <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <p className="font-display text-sm font-bold text-navy sm:text-base">Today&apos;s Operations</p>
            <span className="hidden items-center gap-1 rounded-lg bg-sky px-2.5 py-1 text-xs text-ocean sm:flex">
              <Icon name="calendar" className="w-3.5 h-3.5" /> Thu, Oct 22
              <Icon name="chevron-down" className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-sky px-2.5 py-1.5 text-xs font-semibold text-ocean">€1,240 revenue</span>
            <span className="relative text-navy/60">
              <Icon name="bell" className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-error" />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5 border-b border-border px-4 text-xs sm:px-6 sm:text-sm">
          <span className="border-b-2 border-ocean py-3 font-semibold text-ocean">Live Agenda</span>
          <span className="py-3 text-muted">Staff Roster</span>
          <span className="py-3 text-muted">Boat Manifests</span>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:p-6 lg:grid-cols-4">
          <div className="flex flex-col gap-2 sm:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Dive Courses</p>
            <SessionCard
              title="Open Water Course"
              time="08:00 – 12:00"
              instructor="Mara D."
              badge="6/8 participants"
              accent="border-l-aqua"
              chips={[
                { label: "Gear Ready", tone: "success" },
                { label: "Deposit Paid", tone: "info" },
              ]}
            />
            <SessionCard
              title="Discover Scuba"
              time="13:00 – 15:00"
              instructor="Iain P."
              badge="3/6 participants"
              accent="border-l-ocean"
              chips={[{ label: "Balance Due", tone: "warning" }]}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Boat Trips</p>
            <SessionCard
              title="Tuesday Reef Trip"
              time="09:00 – 13:00"
              instructor="Staff Assigned"
              badge="12/12 participants"
              accent="border-l-teal"
              chips={[
                { label: "Trip Manifest", tone: "info" },
                { label: "Register Open", tone: "success" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Kitesurf Lessons</p>
            <SessionCard
              title="Kitesurf Private Lesson"
              time="14:00 – 16:00"
              instructor="Sofia R."
              badge="1/1 participants"
              accent="border-l-aqua"
              chips={[{ label: "Instructor Conflict Check Passed", tone: "success" }]}
            />
          </div>

          <div className="flex flex-col gap-3 sm:col-span-3 lg:col-span-1">
            <div className="rounded-xl border border-border bg-white p-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Tide &amp; Weather</p>
                <StatusBadge label="Weather Available" tone="info" />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-semibold text-navy">Tide 11:20 AM</span>
                <svg className="h-6 w-16 stroke-aqua" strokeWidth="2" fill="none" viewBox="0 0 100 30">
                  <path d="M0 15 Q 25 30, 50 15 T 100 15" />
                </svg>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-white p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Notifications</p>
              <p className="mt-2 text-xs text-ink">Notification Queued</p>
              <p className="mt-1 text-[11px] text-muted">Session Moved · reminder to 8 participants</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Audit Log</p>
              <p className="mt-2 text-xs text-ink">Audit Log Updated</p>
              <p className="mt-1 text-[11px] text-muted">Gear Check Due · Explorer I</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
