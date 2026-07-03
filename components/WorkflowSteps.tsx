import { Icon } from "./Icon";

export function WorkflowSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-0 md:flex-row md:items-center md:gap-2">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-3 md:flex-1">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 w-full">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-aqua">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-ink">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <Icon name="arrow-right" className="hidden md:block w-4 h-4 text-muted shrink-0" />
          )}
        </li>
      ))}
    </ol>
  );
}
