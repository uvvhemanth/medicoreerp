import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT_DOMAINS } from "@/lib/content/marketing";
import { Section, SectionHeading, CTABand, Reveal } from "@/components/marketing/blocks";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Product — 50+ modules on one platform",
  description: "Explore every Aether Health OS module: clinical core, revenue cycle, pharmacy, lab, radiology, HRM, analytics and the no-code platform.",
};

export default function ProductHub() {
  return (
    <>
      <Section>
        <SectionHeading
          center
          eyebrow="Product"
          title="One platform. Every workflow."
          subtitle="Fifty-plus modules built on six reusable archetypes — so the whole hospital feels like one product to learn."
          className="mb-14"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_DOMAINS.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.04}>
              <Link
                href={`/product/${d.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border bg-card shadow-soft transition hover:shadow-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt={d.name} className="aspect-[16/9] w-full object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-bold text-heading">{d.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{d.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
