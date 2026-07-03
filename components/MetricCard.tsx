export function MetricCard({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-white px-4 py-3 ${className}`}>
      <p className="text-[11px] font-bold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-navy">{value}</p>
    </div>
  );
}
