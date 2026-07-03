export function SectionHeader({
  eyebrow,
  title,
  subheadline,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subheadline?: string;
  align?: "center" | "left";
}) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClasses} mb-12`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ocean">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">{title}</h2>
      {subheadline && <p className="mt-4 text-lg text-muted">{subheadline}</p>}
    </div>
  );
}
