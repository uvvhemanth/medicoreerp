import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AI_CAPABILITIES } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function generateStaticParams() {
  return AI_CAPABILITIES.map((c) => ({ capability: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ capability: string }> }): Promise<Metadata> {
  const { capability } = await params;
  const c = AI_CAPABILITIES.find((x) => x.slug === capability);
  return c ? { title: `${c.name} — AI`, description: c.hook } : {};
}

export default async function CapabilityPage({ params }: { params: Promise<{ capability: string }> }) {
  const { capability } = await params;
  const c = AI_CAPABILITIES.find((x) => x.slug === capability);
  if (!c) notFound();

  return (
    <>
      <section className="border-b">
        <div className="container-page py-16">
          <Eyebrow>AI Capability</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight text-heading sm:text-5xl">{c.name}</h1>
          <p className="mt-4 max-w-2xl text-xl text-teal">{c.hook}</p>
          <Button asChild className="mt-7"><Link href="/demo">Book a demo <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </section>

      <Section>
        <h2 className="font-heading text-2xl font-bold text-heading">How it works</h2>
        <ol className="mt-8 space-y-4">
          {c.how.map((step, i) => (
            <Reveal key={step} delay={i * 0.06}>
              <li className="flex items-start gap-4 rounded-card border bg-card p-5 shadow-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal text-sm font-bold text-white">{i + 1}</span>
                <p className="pt-1.5 text-body">{step}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section muted>
        <div className="rounded-card border-2 border-teal/25 bg-teal/[0.04] p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-teal" />
            <div>
              <h2 className="font-heading text-xl font-bold text-heading">Safety & guardrails</h2>
              <p className="mt-2 text-body">{c.safety}</p>
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
