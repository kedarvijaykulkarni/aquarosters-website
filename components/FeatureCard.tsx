import Link from "next/link";
import { Icon } from "./Icon";

export function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-card transition-colors hover:border-ocean"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky text-ocean">
        <Icon name={icon} />
      </div>
      <div>
        <h3 className="font-display font-semibold text-navy">{title}</h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-ocean group-hover:text-navy">
        Learn more <Icon name="arrow-right" className="w-4 h-4" />
      </span>
    </Link>
  );
}
