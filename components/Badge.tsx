export function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ocean ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
      {children}
    </span>
  );
}
