import type { Metadata } from "next";
import Link from "next/link";
import { AI_CAPABILITIES } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { Sparkles, ArrowRight, ShieldCheck, Mic, FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "AI — Ambient Scribe, Co-pilot, RCM & more",
  description:
    "Ambient scribe, clinical co-pilot, autonomous RCM, predictive ops, and NL analytics — safe, cited, human-in-the-loop.",
  alternates: { canonical: "/ai" },
};

export default function AIHub() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid absolute inset-0 -z-10 opacity-50" />
        <div className="container-page py-16 text-center lg:py-20">
          <Eyebrow>
            <Sparkles className="h-3.5 w-3.5" /> AI, done responsibly
          </Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-[52px]">
            AI woven through every workflow —{" "}
            <span className="text-gradient-teal">human always in the loop</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Nothing clinical commits without a signature. Every suggestion is cited, explainable, and fully audited.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/demo">Book a demo <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ai/ambient-scribe">Start with Ambient Scribe</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Flagship teaser */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>Flagship</Eyebrow>
              <h2 className="mt-4 font-heading text-3xl font-extrabold text-heading">Ambient Scribe: before & after</h2>
              <p className="mt-3 text-lg text-muted">
                Speak naturally. Watch a structured, coded note assemble itself — then review a diff and one-tap sign.
              </p>
              <Button asChild className="mt-6">
                <Link href="/ai/ambient-scribe">
                  Open Ambient Scribe screen <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-3">
              <div className="rounded-card border bg-card p-4 shadow-soft">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-muted">
                  <Mic className="h-3.5 w-3.5" /> LIVE TRANSCRIPT
                </p>
                <p className="text-sm text-body">
                  “Patient reports chest tightness for two days, worse on exertion. No fever. History of hypertension…”
                </p>
              </div>
              <div className="rounded-card border-2 border-teal/30 bg-teal/[0.04] p-4 shadow-soft">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-teal">
                  <FileCheck2 className="h-3.5 w-3.5" /> STRUCTURED SOAP (DRAFT)
                </p>
                <p className="text-sm text-body">
                  <b>S:</b> Chest tightness ×2 days, exertional. <b>O:</b> BP 148/92. <b>A:</b> Angina, r/o ACS{" "}
                  <span className="rounded bg-teal/10 px-1 text-xs text-teal">I20.9</span>. <b>P:</b> ECG, Troponin, Aspirin.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Capability grid — matches AI dropdown 1:1 */}
      <Section muted>
        <SectionHeading
          center
          eyebrow="AI dropdown · all screens"
          title="Five capabilities. Five full pages."
          subtitle="Every item in the AI menu opens a dedicated screen — problem, outcomes, features, safety, and demo CTA."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AI_CAPABILITIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                id={c.slug}
                href={`/ai/${c.slug}`}
                className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-card border bg-card shadow-soft transition duration-standard hover:-translate-y-1 hover:shadow-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {c.outcomes.slice(0, 2).map((o) => (
                      <span key={o.label} className="rounded-pill bg-teal/10 px-2 py-0.5 text-[11px] font-bold text-teal">
                        {o.value} {o.label}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-heading">{c.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{c.hook}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                    Open screen <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Safety */}
      <Section>
        <div className="rounded-[24px] border bg-gradient-to-br from-card to-mist/40 p-8 sm:p-12">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-teal" />
            <h2 className="font-heading text-2xl font-bold text-heading">How your data stays safe</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              ["De-identification", "PHI is redacted before any model call; nothing trains on your patients."],
              ["VPC deployment", "Run AI in your own private cloud with data residency guarantees."],
              ["Full audit", "Every AI suggestion, acceptance, and edit is logged and attributable."],
            ].map(([t, d]) => (
              <div key={t}>
                <p className="font-heading font-bold text-heading">{t}</p>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTABand title="See AI on your hospital workflows" subtitle="A focused demo of Ambient Scribe, RCM, or the co-pilot — your choice." />
    </>
  );
}
