export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item) => (
        <details key={item.question} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-navy">
            {item.question}
            <span className="shrink-0 text-ocean transition-transform group-open:rotate-45 text-xl leading-none">+</span>
          </summary>
          <p className="mt-3 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
