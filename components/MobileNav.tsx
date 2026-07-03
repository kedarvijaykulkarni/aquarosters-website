import Link from "next/link";
import { Button } from "./Button";
import { brand, primaryNav } from "@/lib/content";

export function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav aria-label="Mobile" className="border-t border-border bg-white px-6 py-6 lg:hidden">
      <ul className="flex flex-col gap-1">
        {primaryNav.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-3 text-base font-medium text-navy hover:bg-sky"
            >
              {item.label}
            </Link>
            {item.dropdown && (
              <ul className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
                {item.dropdown.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-sky hover:text-ocean"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3">
        <a
          href={brand.appLoginUrl}
          onClick={onNavigate}
          className="rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold text-navy"
        >
          Login
        </a>
        <Button href="/contact" variant="primary" className="w-full">
          {brand.ctaPrimary}
        </Button>
      </div>
    </nav>
  );
}
