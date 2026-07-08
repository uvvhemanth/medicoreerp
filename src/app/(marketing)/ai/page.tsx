import type { Metadata } from "next";
import Link from "next/link";
import { AI_CAPABILITIES } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { Sparkles, ArrowRight, ShieldCheck, Mic, FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "AI — the generational hook",
  description: "Ambient scribe, clinical co-pilot, autonomous RCM, predictive ops, and NL analytics — safe, cited, human-in-the-loop.",
};

export default function AIHub() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="absolute -top-32 left-1/2 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-clinical/10 blur-3xl" />
        <div className="container-page py-16 text-center">
          <Eyebrow><Sparkles className="h-3.5 w-3.5" /> AI, done responsibly</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-[52px]">
            AI woven through every workflow — <span className="text-gradient-teal">human always in the loop</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Nothing clinical commits without a signature. Every suggestion is cited, explainable, and fully audited.
          </p>
        </div>
      </section>

      {/* Ambient scribe demo teaser */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>Flagship</Eyebrow>
              <h2 className="mt-4 font-heading text-3xl font-extrabold text-heading">Ambient Scribe: before & after</h2>
              <p className="mt-3 text-lg text-muted">Speak naturally. Watch a structured, coded note assemble itself — then review a diff and one-tap sign.</p>
              <Button asChild className="mt-6"><Link href="/ai/ambient-scribe">See how it works <ArrowRight className="h-4 w-4" /></Link></Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-3">
              <div className="rounded-card border bg-card p-4 shadow-soft">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-muted"><Mic className="h-3.5 w-3.5" /> LIVE TRANSCRIPT</p>
                <p className="text-sm text-body">“Patient reports chest tightness for two days, worse on exertion. No fever. History of hypertension…”</p>
              </div>
              <div className="rounded-card border-2 border-teal/30 bg-teal/[0.04] p-4 shadow-soft">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-teal"><FileCheck2 className="h-3.5 w-3.5" /> STRUCTURED SOAP (DRAFT)</p>
                <p className="text-sm text-body"><b>S:</b> Chest tightness ×2 days, exertional. <b>O:</b> BP 148/92. <b>A:</b> Angina, r/o ACS <span className="rounded bg-teal/10 px-1 text-xs text-teal">I20.9</span>. <b>P:</b> ECG, Troponin, Aspirin.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Capability grid */}
      <Section muted>
        <SectionHeading center title="Five ways AI earns its keep" className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AI_CAPABILITIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link href={`/ai/${c.slug}`} className="group flex h-full flex-col rounded-card border bg-card p-6 shadow-soft transition hover:shadow-card">
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-mist text-teal"><Sparkles className="h-5 w-5" /></div>
                <h3 className="font-heading font-bold text-heading">{c.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted">{c.hook}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
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

      <CTABand />
    </>
  );
}
