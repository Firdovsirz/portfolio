"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandLogo } from "@/components/brand-logo";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b hairline">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Firdovsi Rzaev — Home"
          >
            <BrandLogo height={28} priority />
            <span className="serif text-lg tracking-tight">Firdovsi Rzaev</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <nav className="flex items-center gap-7 text-sm text-muted">
              {site.nav.slice(1).map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`link-underline transition-colors ${
                      active ? "text-foreground" : "hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-muted hover:text-foreground"
              aria-label="Toggle menu"
            >
              <span className="mono text-sm">{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden pb-6 flex flex-col gap-3 text-sm">
            {site.nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-1 ${
                  pathname === item.href ? "text-foreground" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
