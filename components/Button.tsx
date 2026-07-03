import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline-light" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "bg-ocean text-white hover:bg-navy shadow-card",
  secondary: "bg-white text-navy border border-border hover:border-ocean hover:text-ocean",
  "outline-light": "border border-white/30 text-white hover:bg-white/10",
  ghost: "text-ocean hover:text-navy",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean";

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  type,
  disabled,
  "data-ga-event": gaEvent,
}: {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  "data-ga-event"?: string;
}) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className} ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  }`;

  if (href) {
    return (
      <Link href={href} className={classes} data-ga-event={gaEvent}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} disabled={disabled} data-ga-event={gaEvent}>
      {children}
    </button>
  );
}
