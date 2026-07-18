"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { WHATSAPP_URL, WhatsAppIcon } from "@/components/marketing/whatsapp-fab";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X, ArrowRight, MessageCircle, Calendar, Phone } from "lucide-react";

function openChat() {
  window.dispatchEvent(new Event("medicore:open-chat"));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = useCallback((label: string) => {
    clearCloseTimer();
    setOpen(label);
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setOpen(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      clearCloseTimer();
    };
  }, []);

  const menuOpen = open !== null || mobileOpen;

  const toggleMenu = (label: string) => {
    clearCloseTimer();
    setOpen((current) => (current === label ? null : label));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-standard",
        scrolled || menuOpen ? "border-b bg-card shadow-soft" : "bg-transparent",
      )}
    >
      <div className="border-b border-white/15 bg-teal text-white lg:hidden">
        <a
          href="tel:+919966411913"
          className="flex h-9 items-center justify-center gap-2 text-sm font-bold"
          aria-label="Call MedicoreERP at +91 99664 11913"
        >
          <Phone className="h-4 w-4" />
          Call +91 99664 11913
        </a>
      </div>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="MedicoreERP home" onClick={() => setOpen(null)}>
          <Logo />
        </Link>

        <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const hasChildren = !!item.children?.length;
            const isOpen = open === item.label;
            // Solutions + Product + Resources use wide two-column mega menus
            const twoCol =
              item.label === "Solutions" ||
              item.label === "Product" ||
              item.label === "Resources" ||
              item.label === "AI" ||
              (item.children?.length ?? 0) > 5;
            const alignRight =
              item.label === "Security" ||
              item.label === "Resources" ||
              item.label === "Pricing" ||
              item.label === "Interoperability" ||
              item.label === "AI";
            const MenuIcon = item.menuIcon;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  if (hasChildren) openMenu(item.label);
                }}
                onMouseLeave={scheduleClose}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onClick={() => toggleMenu(item.label)}
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-heading hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
                      isOpen && "bg-black/[0.04] text-teal dark:bg-white/[0.06]",
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 opacity-60 transition", isOpen && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-heading hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  >
                    {item.label}
                  </Link>
                )}

                {hasChildren && isOpen && (
                  <div
                    role="menu"
                    className={cn(
                      "absolute top-full z-[110] pt-2",
                      alignRight ? "right-0" : "left-0",
                      twoCol ? "w-[560px]" : "w-[380px]",
                      item.label === "Solutions" && "w-[580px]",
                      item.label === "Product" && "w-[680px]",
                      item.label === "Resources" && "w-[640px]",
                      item.label === "AI" && "w-[560px]",
                    )}
                    onMouseEnter={() => openMenu(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="origin-top animate-fade-in overflow-hidden rounded-2xl border border-[var(--border)] bg-card p-2.5 shadow-pop ring-1 ring-black/[0.06] dark:ring-white/[0.08]">
                      <div className="flex items-center justify-between gap-2 px-3 pb-2 pt-1">
                        <div className="flex items-center gap-2">
                          {MenuIcon && (
                            <span className="grid h-5 w-5 place-items-center rounded-md bg-teal/10 text-teal">
                              <MenuIcon className="h-3.5 w-3.5" />
                            </span>
                          )}
                          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                            {item.menuLabel ?? item.label}
                          </span>
                        </div>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(null)}
                          className="text-[11px] font-bold text-teal hover:underline"
                        >
                          View all
                        </Link>
                      </div>
                      <div className="mx-1 mb-1.5 h-px bg-gradient-to-r from-[var(--border)] via-[var(--border)] to-transparent" />

                      <div className={cn(twoCol && "grid grid-cols-2 gap-x-1 gap-y-0.5")}>
                        {item.children!.map((c) => {
                          const Icon = c.icon;
                          return (
                            <Link
                              key={c.href + c.label}
                              href={c.href}
                              role="menuitem"
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
                                  <span className="text-sm font-semibold text-heading transition-colors group-hover/item:text-teal">
                                    {c.label}
                                  </span>
                                  {c.badge && (
                                    <span className="rounded-pill bg-teal/12 px-1.5 py-0.5 text-[10px] font-bold text-teal">
                                      {c.badge}
                                    </span>
                                  )}
                                </span>
                                {c.desc && (
                                  <span className="mt-0.5 block text-xs leading-snug text-muted">{c.desc}</span>
                                )}
                              </span>
                            </Link>
                          );
                        })}
                      </div>

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
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="tel:+919966411913"
            className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-heading transition hover:text-teal xl:inline-flex"
            aria-label="Call MedicoreERP at +91 99664 11913"
          >
            <Phone className="h-4 w-4 text-teal" />
            +91 99664 11913
          </a>
          <ThemeToggle />
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="hidden rounded-full sm:inline-flex"
            onClick={() => {
              setOpen(null);
              openChat();
            }}
          >
            <MessageCircle className="h-4 w-4" /> Free chat
          </Button>
          <Button asChild size="sm" variant="outline" className="hidden rounded-full sm:inline-flex">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(null)}
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
            </a>
          </Button>
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
            <Link href="/demo" onClick={() => setOpen(null)}>
              <Calendar className="h-4 w-4" /> Book a Demo
            </Link>
          </Button>
          <button
            className="rounded-lg p-2 hover:bg-black/5 lg:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in border-t bg-card lg:hidden">
          <nav className="container-page max-h-[70vh] space-y-1 overflow-y-auto py-4">
            {NAV.map((item) =>
              item.children?.length ? (
                <details key={item.label} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-heading [&::-webkit-details-marker]:hidden">
                    <span>{item.label}</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="ml-2 space-y-0.5 border-l pl-2">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-2 py-2 text-sm font-semibold text-teal"
                    >
                      All {item.label}
                    </Link>
                    {item.children.map((c) => {
                      const Icon = c.icon;
                      return (
                        <Link
                          key={c.href + c.label}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-mist/60 dark:hover:bg-white/[0.05]"
                        >
                          {Icon && (
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-black/[0.045] text-muted dark:bg-white/[0.06]">
                              <Icon className="h-4 w-4" />
                            </span>
                          )}
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-heading">{c.label}</span>
                            {c.desc && <span className="block text-xs text-muted">{c.desc}</span>}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-heading"
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="flex flex-col gap-2 pt-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openChat();
                }}
              >
                <MessageCircle className="h-4 w-4" /> Free chat
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
                </a>
              </Button>
              <Button asChild className="w-full">
                <Link href="/demo" onClick={() => setMobileOpen(false)}>
                  <Calendar className="h-4 w-4" /> Book a Demo
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
