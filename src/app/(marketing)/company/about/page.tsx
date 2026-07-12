import type { Metadata } from "next";
import { Section, SectionHeading, CTABand, Reveal } from "@/components/marketing/blocks";
import { HOME_STATS } from "@/lib/content/marketing";

export const metadata: Metadata = { title: "About", description: "About MedicoreERP — medical ERP / HIS that clinicians actually want to use." };

const VALUES = [
  ["Clinicians first", "We design for the 10th consult of a 12-hour shift, not the demo."],
  ["Honest by default", "Transparent pricing, candid comparisons, no lock-in."],
  ["Safety is visual", "Every alert explains why. Every dangerous action is guarded."],
  ["Configurable, not customized", "Hospitals self-serve with no-code studios."],
];

const TIMELINE = [
  ["2024", "Founded with a simple thesis: usability is the moat in health IT."],
  ["2025", "First clinic goes live in 3 weeks. Ambient scribe ships."],
  ["2026", "50+ modules, command-center digital twin, 400+ care teams."],
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b">
        <div className="container-page py-16 text-center">
          <SectionHeading center eyebrow="About MedicoreERP" title="Healthcare software people actually want to use" subtitle="MedicoreERP is the medical ERP for modern hospitals — AI-native HIS, interoperable, and genuinely usable." className="mx-auto" />
        </div>
      </section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_STATS.map((s) => (
            <div key={s.label} className="rounded-card border bg-card p-6 text-center shadow-soft">
              <p className="font-heading text-3xl font-extrabold text-gradient-teal">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading title="What we believe" className="mb-10" />
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.05}>
              <div className="rounded-card border bg-card p-6 shadow-soft">
                <h3 className="font-heading text-lg font-bold text-heading">{t}</h3>
                <p className="mt-1 text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading title="Our story" className="mb-10" />
        <div className="mx-auto max-w-2xl space-y-6">
          {TIMELINE.map(([year, text]) => (
            <div key={year} className="flex gap-5">
              <span className="font-heading text-2xl font-extrabold text-teal">{year}</span>
              <p className="pt-1.5 text-lg text-body">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABand title="Come build with us" subtitle="We're hiring across engineering, design, and clinical informatics." />
    </>
  );
}
