import Link from "next/link";
import { Icon } from "./Icon";

export function ModuleCard({
  icon,
  title,
  description,
  detail,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  detail?: string;
  href?: string;
}) {
  const content = (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 h-full transition-colors hover:border-ocean">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-aqua">
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <h3 className="font-display font-semibold text-navy">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
      {detail && (
        <span className="mt-auto inline-flex w-fit items-center rounded-md bg-sky px-2.5 py-1 text-xs font-semibold text-ocean">
          {detail}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }
  return content;
}
