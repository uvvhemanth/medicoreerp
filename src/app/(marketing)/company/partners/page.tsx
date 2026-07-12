import type { Metadata } from "next";
import { Section, SectionHeading, CTABand, Reveal } from "@/components/marketing/blocks";
import { Handshake, Code2, Building2 } from "lucide-react";

export const metadata: Metadata = { title: "Partners", description: "Technology, implementation, and channel partnerships." };

const TIERS = [
  { icon: Code2, title: "Technology partners", desc: "Build integrations and SMART-on-FHIR apps on our marketplace." },
  { icon: Building2, title: "Implementation partners", desc: "Deliver MedicoreERP go-lives and configuration for hospitals in your region." },
  { icon: Handshake, title: "Channel partners", desc: "Resell MedicoreERP with margin, deal support, and co-marketing." },
];

export default function PartnersPage() {
  return (
    <>
      <Section>
        <SectionHeading center eyebrow="Partners" title="Grow with MedicoreERP" subtitle="Three ways to partner — all built on an open platform." className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className="h-full rounded-card border bg-card p-7 shadow-soft">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-mist text-teal"><t.icon className="h-6 w-6" /></div>
                <h3 className="font-heading text-lg font-bold text-heading">{t.title}</h3>
                <p className="mt-2 text-sm text-muted">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTABand title="Become a partner" subtitle="Tell us how you'd like to work together." />
    </>
  );
}
