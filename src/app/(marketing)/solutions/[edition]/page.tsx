import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SOLUTIONS } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { ArrowRight, Clock, Tag, X, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ edition: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }): Promise<Metadata> {
  const { edition } = await params;
  const s = SOLUTIONS.find((x) => x.slug === edition);
  return s ? { title: `${s.name} — Solutions`, description: s.hero } : {};
}

export default async function EditionPage({ params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  const s = SOLUTIONS.find((x) => x.slug === edition);
  if (!s) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="bg-grid absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-16 text-center">
          <Eyebrow>Solutions · {s.name}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-5xl">
            {s.hero}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-teal" /> Go live in {s.goLive}</span>
            <span className="flex items-center gap-1.5"><Tag className="h-4 w-4 text-teal" /> From {s.priceFrom}</span>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg"><Link href="/demo">Book a demo <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/pricing">See pricing</Link></Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-card border bg-card p-7 shadow-soft">
              <h2 className="font-heading text-xl font-bold text-heading">The pain today</h2>
              <ul className="mt-5 space-y-3">
                {s.pains.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-body">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-danger/12 text-danger"><X className="h-3 w-3" /></span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-card border bg-teal/[0.04] p-7 shadow-soft">
              <h2 className="font-heading text-xl font-bold text-heading">Your Aether bundle</h2>
              <ul className="mt-5 space-y-3">
                {s.bundle.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-body">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section muted>
        <SectionHeading center title="Built for your region" subtitle="Compliant, localized, and interoperable by default — India, MENA & SEA ready." className="mb-8" />
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
          {["ABDM-ready", "GST/VAT billing", "Multi-currency", "RTL & multilingual", "Data residency", "SOC 2 / ISO 27001"].map((t) => (
            <span key={t} className="rounded-pill border bg-card px-4 py-1.5 text-sm font-semibold text-body">{t}</span>
          ))}
        </div>
      </Section>

      <CTABand title={`Ready to see Aether for ${s.name.toLowerCase()}?`} />
    </>
  );
}
