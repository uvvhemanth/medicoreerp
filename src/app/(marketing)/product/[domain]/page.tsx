import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCT_DOMAINS } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading, CTABand, FeatureRow, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return PRODUCT_DOMAINS.map((d) => ({ domain: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const { domain } = await params;
  const d = PRODUCT_DOMAINS.find((x) => x.slug === domain);
  if (!d) return {};
  return { title: d.name, description: d.tagline };
}

export default async function DomainPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  const d = PRODUCT_DOMAINS.find((x) => x.slug === domain);
  if (!d) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="bg-grid absolute inset-0 -z-10 opacity-60" />
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <Eyebrow>Product</Eyebrow>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-5xl">
              {d.name}
            </h1>
            <p className="mt-4 text-xl text-teal">{d.tagline}</p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{d.problem}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/demo">Book a demo <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login">See it live</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {d.moats.map((m) => (
                <Badge key={m} tone="teal"><ShieldCheck className="h-3 w-3" /> {m}</Badge>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-card border shadow-pop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.image} alt={d.name} className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <Section>
        <SectionHeading center title="What you get" className="mb-14" />
        <div className="space-y-16">
          {d.features.map((f, i) => (
            <FeatureRow
              key={f.title}
              index={i}
              title={f.title}
              desc={f.desc}
              image={PRODUCT_DOMAINS[(PRODUCT_DOMAINS.indexOf(d) + i + 1) % PRODUCT_DOMAINS.length].image}
              bullets={["Keyboard-first, sub-second interactions", "Fully audited and permission-aware", "Works offline on flaky hospital Wi-Fi"]}
            />
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section muted>
        <SectionHeading center eyebrow="How it works" title="A workflow that mirrors real care" className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Capture", "Verify", "Act", "Audit"].map((step, i) => (
            <Reveal key={step} delay={i * 0.06}>
              <div className="relative rounded-card border bg-card p-6 shadow-soft">
                <span className="font-heading text-4xl font-extrabold text-teal/20">{i + 1}</span>
                <h3 className="mt-2 font-heading font-bold text-heading">{step}</h3>
                <p className="mt-1 text-sm text-muted">Every step is one action away, pre-filled with ruthless defaults.</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Related */}
      <Section>
        <SectionHeading title="Related modules" className="mb-8" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_DOMAINS.filter((x) => x.slug !== d.slug).slice(0, 3).map((r) => (
            <Link key={r.slug} href={`/product/${r.slug}`} className="group flex items-center justify-between rounded-card border bg-card p-5 shadow-soft transition hover:shadow-card">
              <div>
                <h3 className="font-heading font-bold text-heading">{r.name}</h3>
                <p className="text-sm text-muted">{r.tagline}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-teal" />
            </Link>
          ))}
        </div>
        <div className="mt-8 rounded-card border bg-mist/40 p-6">
          <p className="text-sm font-semibold text-heading">Integrates with</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["FHIR R4", "HL7 v2", "DICOM", "ABDM", "X12 claims", "Payment gateways", "SMS/WhatsApp"].map((t) => (
              <span key={t} className="flex items-center gap-1 rounded-pill border bg-card px-3 py-1 text-xs font-semibold text-body">
                <CheckCircle2 className="h-3 w-3 text-success" /> {t}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
