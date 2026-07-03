import Link from "next/link";
import { Container } from "./Container";
import { brand, footerColumns } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-sand">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-navy">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-sm font-bold text-aqua">
                AR
              </span>
              {brand.name}
            </Link>
            <p className="mt-4 text-sm text-muted">{brand.description}</p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-navy">{column.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted hover:text-ocean">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 text-sm text-muted">
          © {brand.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
