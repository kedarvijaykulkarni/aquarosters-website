import type { comparisonRows } from "@/lib/content";

export function ComparisonTable({ rows }: { rows: typeof comparisonRows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-card">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-sky/60">
            <th className="p-4 font-display font-semibold text-navy">Alternative</th>
            <th className="p-4 font-display font-semibold text-navy">Limitation</th>
            <th className="p-4 font-display font-semibold text-navy">AquaRosters position</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.alternative} className="border-b border-border last:border-0">
              <td className="p-4 font-semibold text-navy">{row.alternative}</td>
              <td className="p-4 text-muted">{row.limitation}</td>
              <td className="p-4 text-ocean font-medium">{row.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
