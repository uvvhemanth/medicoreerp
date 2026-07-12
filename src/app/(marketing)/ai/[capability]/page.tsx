import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AI_CAPABILITIES } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading, CTABand, FeatureRow, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ArrowRight, ShieldCheck, CheckCircle2, Users } from "lucide-react";

export function generateStaticParams() {
  return AI_CAPABILITIES.map((c) => ({ capability: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ capability: string }> }): Promise<Metadata> {
  const { capability } = await params;
  const c = AI_CAPABILITIES.find((x) => x.slug === capability);
  if (!c) return {};
  return {
    title: `${c.name} — AI`,
    description: c.hook,
    alternates: { canonical: `/ai/${c.slug}` },
    openGraph: { title: c.name, description: c.hook, images: [c.image] },
  };
}

export default async function CapabilityPage({ params }: { params: Promise<{ capability: string }> }) {
  const { capability } = await params;
  const c = AI_CAPABILITIES.find((x) => x.slug === capability);
  if (!c) notFound();

  const others = AI_CAPABILITIES.filter((x) => x.slug !== c.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI", path: "/ai" },
          { name: c.name, path: `/ai/${c.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid absolute inset-0 -z-10 opacity-50" />
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <Eyebrow>AI · {c.name}</Eyebrow>
            <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-5xl">
              {c.name}
            </h1>
            <p className="mt-4 text-xl text-teal">{c.hook}</p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{c.problem}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Users className="h-4 w-4 text-teal" />
              <span>{c.audience}</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/demo">Book a demo <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/ai">All AI capabilities</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="teal"><ShieldCheck className="h-3 w-3" /> Human in the loop</Badge>
              <Badge tone="teal">Cited & audited</Badge>
              <Badge tone="neutral">Included in Hospital+</Badge>
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-card border shadow-pop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <Section className="!py-12">
        <div className="grid gap-4 rounded-[24px] border bg-gradient-to-br from-ink via-teal-deep to-teal p-8 text-white sm:grid-cols-3">
          {c.outcomes.map((o) => (
            <div key={o.label} className="text-center sm:text-left">
              <p className="font-heading text-3xl font-extrabold sm:text-4xl">{o.value}</p>
              <p className="mt-1 text-sm text-white/75">{o.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section>
        <SectionHeading center title="What you get" className="mb-14" />
        <div className="space-y-16">
          {c.features.map((f, i) => (
            <FeatureRow
              key={f.title}
              index={i}
              title={f.title}
              desc={f.desc}
              image={AI_CAPABILITIES[(AI_CAPABILITIES.indexOf(c) + i + 1) % AI_CAPABILITIES.length].image}
              bullets={["Human always approves", "Fully audited prompts & outputs", "Works inside existing MedicoreERP workflows"]}
            />
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section muted>
        <SectionHeading center eyebrow="How it works" title="Four steps from signal to signed action" className="mb-12" />
        <ol className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {c.how.map((step, i) => (
            <Reveal key={step} delay={i * 0.06}>
              <li className="flex h-full items-start gap-4 rounded-card border bg-card p-5 shadow-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-body">{step}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Safety */}
      <Section>
        <div className="rounded-card border-2 border-teal/25 bg-teal/[0.04] p-8 sm:p-10">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-teal" />
            <div>
              <h2 className="font-heading text-2xl font-bold text-heading">Safety & guardrails</h2>
              <p className="mt-3 max-w-3xl text-lg text-body">{c.safety}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  "De-identified model calls",
                  "Tenant / VPC deployment options",
                  "Prompt & acceptance audit trail",
                  "Role-based access on every surface",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-body">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Related */}
      <Section muted>
        <SectionHeading title="Explore more AI" className="mb-8" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((r) => (
            <Link
              key={r.slug}
              href={`/ai/${r.slug}`}
              className="group flex items-center justify-between rounded-card border bg-card p-5 shadow-soft transition hover:shadow-card"
            >
              <div>
                <h3 className="font-heading font-bold text-heading">{r.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{r.hook}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-teal" />
            </Link>
          ))}
        </div>
        {c.relatedProduct && (
          <div className="mt-8 rounded-card border bg-card p-6">
            <p className="text-sm font-semibold text-heading">Works with product module</p>
            <Link href={`/product/${c.relatedProduct}`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal">
              Open related product page <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </Section>

      <CTABand title={`See ${c.name} on your workflows`} subtitle="Book a 30-minute demo tailored to your edition and specialty." />
    </>
  );
}
