import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES, LOGO_WALL } from "@/lib/content/marketing";
import { Section, SectionHeading, CTABand, LogoWall, Reveal } from "@/components/marketing/blocks";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Customers", description: "How care teams cut denials, saved documentation time, and went live in weeks with Aether." };

export default function CustomersPage() {
  return (
    <>
      <Section>
        <SectionHeading center eyebrow="Customers" title="Real outcomes, honestly measured" className="mb-12" />
        <LogoWall logos={LOGO_WALL} />
      </Section>

      <Section muted className="!pt-0">
        <div className="grid gap-5 lg:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.06}>
              <Link href={`/customers/${cs.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border bg-card shadow-soft transition hover:shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cs.image} alt={cs.org} className="aspect-[16/9] w-full object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-teal">{cs.edition} · {cs.region}</span>
                  <h3 className="mt-1 font-heading text-lg font-bold text-heading">{cs.org}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted line-clamp-2">{cs.challenge}</p>
                  <div className="mt-4 flex gap-4">
                    {cs.metrics.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <p className="font-heading text-lg font-extrabold text-teal">{m.value}</p>
                        <p className="text-[11px] text-muted">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                    Read story <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
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
