import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/content/marketing";
import { Section, SectionHeading, CTABand, Reveal } from "@/components/marketing/blocks";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides",
  description: "Implementation, RCM, and compliance guides for hospital buyers evaluating medical ERP platforms.",
  alternates: { canonical: "/resources/guides" },
};

export default function GuidesIndex() {
  return (
    <>
      <Section>
        <SectionHeading
          center
          eyebrow="Resources"
          title="Guides for healthcare buyers"
          subtitle="Long-form playbooks for migration, denials, and regional compliance."
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.05}>
              <Link href={`/resources/guides/${g.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border bg-card shadow-soft transition hover:shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image} alt="" className="aspect-[16/10] w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <Badge tone="teal">{g.category}</Badge>
                    {g.gated && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
                        <Lock className="h-3 w-3" /> Gated
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-bold text-heading">{g.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{g.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                    {g.gated ? "Get the guide" : "Read guide"} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
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
