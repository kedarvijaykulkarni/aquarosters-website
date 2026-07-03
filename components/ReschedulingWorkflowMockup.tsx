import { Icon } from "./Icon";
import { StatusBadge } from "./StatusBadge";

export function ReschedulingWorkflowMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-float">
      <div className="flex items-center justify-between border-b border-border bg-sand px-6 py-4">
        <p className="font-display font-semibold text-navy">Session Moved</p>
        <StatusBadge label="Audit Log Updated" tone="info" />
      </div>
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Before</p>
          <p className="mt-2 text-sm font-semibold text-navy">Kitesurf Private Lesson</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            <Icon name="clock" className="w-3.5 h-3.5" /> 09:00 – 11:00
          </p>
        </div>
        <div className="rounded-xl border border-ocean bg-sky p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-ocean">After</p>
          <p className="mt-2 text-sm font-semibold text-navy">Kitesurf Private Lesson</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-ocean">
            <Icon name="clock" className="w-3.5 h-3.5" /> 11:30 – 13:30
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-border px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="text-sm">🌊</span>
          <span>Tide 11:20 AM context checked before confirming the move</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <StatusBadge label="Instructor Conflict Check Passed" tone="success" />
          <StatusBadge label="Participants Transferred" tone="success" />
          <StatusBadge label="Notification Queued" tone="info" />
        </div>
      </div>
    </div>
  );
}
