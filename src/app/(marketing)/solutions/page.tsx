import type { Metadata } from "next";
import Link from "next/link";
import { SOLUTIONS } from "@/lib/content/marketing";
import { Section, SectionHeading, CTABand, Reveal } from "@/components/marketing/blocks";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions by edition & persona",
  description: "Whether you're a clinic, hospital, lab, pharmacy chain, enterprise network, or government payer — MedicoreERP fits.",
};

export default function SolutionsHub() {
  return (
    <>
      <Section>
        <SectionHeading center eyebrow="Solutions" title="Is this for me? Yes." subtitle="Tuned bundles and proof for your kind of organization." className="mb-14" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link
                id={s.slug}
                href={`/solutions/${s.slug}`}
                className="group flex h-full scroll-mt-24 flex-col rounded-card border bg-card p-6 shadow-soft transition hover:shadow-card"
              >
                <h3 className="font-heading text-xl font-bold text-heading">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.hero}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {s.goLive}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
