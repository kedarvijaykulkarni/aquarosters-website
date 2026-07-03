import { Icon } from "./Icon";

type Tone = "success" | "warning" | "error" | "info" | "neutral";

const toneClasses: Record<Tone, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  info: "bg-sky text-ocean",
  neutral: "bg-slate-100 text-ink",
};

const toneIcon: Record<Tone, string> = {
  success: "check-circle",
  warning: "alert-triangle",
  error: "alert-triangle",
  info: "clock",
  neutral: "check",
};

export function StatusBadge({
  label,
  tone = "neutral",
  icon,
}: {
  label: string;
  tone?: Tone;
  icon?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClasses[tone]}`}
    >
      <Icon name={icon ?? toneIcon[tone]} className="w-3 h-3" />
      {label}
    </span>
  );
}
