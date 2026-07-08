"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-standard",
        scrolled ? "border-b bg-card/85 backdrop-blur-xl shadow-soft" : "bg-transparent",
      )}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Aether Health OS home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setOpen(item.children ? item.label : null)}>
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-heading hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </Link>
              {item.children && open === item.label && (
                <div className="absolute left-0 top-full w-[320px] pt-2">
                  <div className="animate-fade-in rounded-card border bg-card p-2 shadow-pop">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(null)}
                        className="block rounded-lg px-3 py-2.5 hover:bg-mist/60 dark:hover:bg-white/[0.05]"
                      >
                        <span className="block text-sm font-semibold text-heading">{c.label}</span>
                        {c.desc && <span className="block text-xs text-muted">{c.desc}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden text-sm font-semibold text-heading hover:text-teal sm:block">
            Sign in
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/demo">Book a Demo</Link>
          </Button>
          <button
            className="rounded-lg p-2 hover:bg-black/5 lg:hidden"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="animate-fade-in border-t bg-card lg:hidden">
          <nav className="container-page max-h-[70vh] space-y-1 overflow-y-auto py-4">
            {NAV.map((item) => (
              <details key={item.label} className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-heading">
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />}
                </summary>
                {item.children && (
                  <div className="ml-3 space-y-0.5 border-l pl-3">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)} className="block rounded-md px-2 py-2 text-sm text-body hover:text-teal">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </details>
            ))}
            <div className="flex gap-2 pt-3">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/demo">Book a Demo</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
