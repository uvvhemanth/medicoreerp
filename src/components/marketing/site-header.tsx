"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

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
              {item.children && open === item.label && (() => {
                const twoCol = (item.children?.length ?? 0) > 7;
                const alignRight = item.label === "Security" || item.label === "Resources";
                const MenuIcon = item.menuIcon;
                return (
                  <div className={cn("absolute top-full pt-2.5", alignRight ? "right-0" : "left-0", twoCol ? "w-[640px]" : "w-[400px]")}>
                    <div className="origin-top animate-fade-in overflow-hidden rounded-2xl border bg-card/95 p-2.5 shadow-pop ring-1 ring-black/[0.03] backdrop-blur-xl dark:ring-white/[0.04]">
                      {/* Section header */}
                      <div className="flex items-center gap-2 px-3 pb-2 pt-1">
                        {MenuIcon && (
                          <span className="grid h-5 w-5 place-items-center rounded-md bg-teal/10 text-teal">
                            <MenuIcon className="h-3.5 w-3.5" />
                          </span>
                        )}
                        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                          {item.menuLabel ?? item.label}
                        </span>
                      </div>
                      <div className="mx-1 mb-1.5 h-px bg-gradient-to-r from-[var(--border)] via-[var(--border)] to-transparent" />

                      {/* Items */}
                      <div className={cn(twoCol && "grid grid-cols-2 gap-x-1")}>
                        {item.children.map((c) => {
                          const Icon = c.icon;
                          return (
                            <Link
                              key={c.href}
                              href={c.href}
                              onClick={() => setOpen(null)}
                              className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-micro hover:bg-mist/70 dark:hover:bg-white/[0.05]"
                            >
                              {Icon && (
                                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black/[0.045] text-muted shadow-[inset_0_0_0_1px_rgba(16,48,56,0.04)] transition-all duration-micro group-hover/item:bg-teal/10 group-hover/item:text-teal group-hover/item:shadow-[inset_0_0_0_1px_rgba(14,131,136,0.25)] dark:bg-white/[0.06]">
                                  <Icon className="h-[18px] w-[18px]" />
                                </span>
                              )}
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-1.5">
                                  <span className="text-sm font-semibold text-heading transition-colors group-hover/item:text-teal">{c.label}</span>
                                  {c.badge && <span className="rounded-pill bg-teal/12 px-1.5 py-0.5 text-[10px] font-bold text-teal">{c.badge}</span>}
                                </span>
                                {c.desc && <span className="mt-0.5 block truncate text-xs leading-snug text-muted">{c.desc}</span>}
                              </span>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Featured footer */}
                      {item.featured && (() => {
                        const FIcon = item.featured.icon;
                        return (
                          <>
                            <div className="mx-1 my-1.5 h-px bg-[var(--border)]" />
                            <Link
                              href={item.featured.href}
                              onClick={() => setOpen(null)}
                              className="group/feat flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-teal/[0.06] to-clinical/[0.04] px-3 py-2.5 transition hover:from-teal/[0.1] hover:to-clinical/[0.06]"
                            >
                              <span className="flex items-center gap-3">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal text-white shadow-soft">
                                  <FIcon className="h-[18px] w-[18px]" />
                                </span>
                                <span>
                                  <span className="block text-sm font-bold text-heading">{item.featured.title}</span>
                                  <span className="block text-xs text-muted">{item.featured.desc}</span>
                                </span>
                              </span>
                              <ArrowRight className="h-4 w-4 shrink-0 text-teal transition-transform group-hover/feat:translate-x-0.5" />
                            </Link>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                );
              })()}
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
                  <div className="ml-2 space-y-0.5 border-l pl-2">
                    {item.children.map((c) => {
                      const Icon = c.icon;
                      return (
                        <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-mist/60 dark:hover:bg-white/[0.05]">
                          {Icon && (
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-black/[0.045] text-muted dark:bg-white/[0.06]">
                              <Icon className="h-4 w-4" />
                            </span>
                          )}
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-heading">{c.label}</span>
                            {c.desc && <span className="block truncate text-xs text-muted">{c.desc}</span>}
                          </span>
                        </Link>
                      );
                    })}
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
