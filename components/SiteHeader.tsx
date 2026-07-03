"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { MobileNav } from "./MobileNav";
import { brand, primaryNav } from "@/lib/content";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-hero items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-navy">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-sm font-bold text-aqua">
            AR
          </span>
          {brand.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-sky hover:text-ocean"
              >
                {item.label}
                {item.dropdown && <Icon name="chevron-down" className="w-3.5 h-3.5" />}
              </Link>
              {item.dropdown && (
                <div className="invisible absolute left-0 top-full z-10 min-w-[220px] rounded-xl border border-border bg-white p-2 opacity-0 shadow-float transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.dropdown.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-sky hover:text-ocean"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={brand.appLoginUrl} className="px-3 py-2 text-sm font-medium text-ink hover:text-ocean">
            Login
          </a>
          <Button href="/contact" variant="primary">
            {brand.ctaPrimary}
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-navy lg:hidden"
        >
          <Icon name={mobileOpen ? "x" : "menu"} className="w-5 h-5" />
        </button>
      </div>

      {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}
