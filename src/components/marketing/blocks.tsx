"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus, Minus } from "lucide-react";
import { useState } from "react";

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Section wrapper ---------------- */
export function Section({
  children,
  className,
  muted,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section className={cn("py-16 sm:py-24", muted && "bg-mist/40 dark:bg-white/[0.02]", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/* ---------------- Eyebrow / heading ---------------- */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-teal/25 bg-teal/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && <div className="mb-4"><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-heading sm:text-[40px]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}

/* ---------------- CTA band ---------------- */
export function CTABand({
  title = "See MedicoreERP run your hospital",
  subtitle = "Book a 30-minute demo or explore the live product on sample data.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-ink via-teal-deep to-teal px-8 py-16 text-center shadow-pop sm:px-16">
          <div className="bg-grid absolute inset-0 opacity-[0.15]" />
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-clinical/30 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-sage/25 blur-3xl" />
          <div className="relative">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/70">MedicoreERP</p>
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">{subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-white text-teal-deep hover:bg-white/90">
                <Link href="/demo">Book a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Feature block (alternating) ---------------- */
export function FeatureRow({
  index,
  title,
  desc,
  image,
  bullets,
}: {
  index: number;
  title: string;
  desc: string;
  image: string;
  bullets?: string[];
}) {
  const reversed = index % 2 === 1;
  return (
    <Reveal>
      <div className={cn("grid items-center gap-10 lg:grid-cols-2", reversed && "lg:[&>*:first-child]:order-2")}>
        <div>
          <h3 className="font-heading text-2xl font-bold text-heading">{title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted">{desc}</p>
          {bullets && (
            <ul className="mt-5 space-y-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-body">
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-teal" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="overflow-hidden rounded-card border shadow-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="aspect-[16/11] w-full object-cover" loading="lazy" />
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- FAQ accordion ---------------- */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y rounded-card border bg-card">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            aria-expanded={open === i}
          >
            <span className="font-heading font-bold text-heading">{item.q}</span>
            {open === i ? <Minus className="h-5 w-5 shrink-0 text-teal" /> : <Plus className="h-5 w-5 shrink-0 text-muted" />}
          </button>
          {open === i && <p className="animate-fade-in px-5 pb-5 text-body">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Logo wall ---------------- */
export function LogoWall({ logos }: { logos: string[] }) {
  const row = [...logos, ...logos];
  return (
    <div className="logo-marquee overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-x-12 pr-12">
        {row.map((l, i) => (
          <span
            key={`${l}-${i}`}
            className="shrink-0 font-heading text-lg font-bold tracking-tight text-muted/60 transition hover:text-teal"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
