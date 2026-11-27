import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal, FAQ } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd, faqJsonLd, DEFAULT_OG_IMAGES } from "@/lib/seo";
import { USE_CASES, useCaseBySlug } from "@/lib/content/use-cases";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = useCaseBySlug(slug);
  if (!u) return {};
  const path = `/use-cases/${u.slug}`;
  return {
    title: u.seo.title,
    description: u.seo.description,
    keywords: u.seo.keywords,
    alternates: { canonical: path },
    openGraph: { images: DEFAULT_OG_IMAGES, title: u.seo.title, description: u.seo.description, url: path },
    twitter: { card: "summary_large_image", title: u.seo.title, description: u.seo.description },
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = useCaseBySlug(slug);
  if (!u) notFound();
  const path = `/use-cases/${u.slug}`;
  const others = USE_CASES.filter((o) => o.slug !== u.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Use cases", path: "/use-cases" },
            { name: u.cardTitle, path },
          ]),
          faqJsonLd(u.faqs),
        ]}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 lg:py-16">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Example workflow</Eyebrow>
              <h1 className="text-heading-display mt-5">{u.heroTitle}</h1>
              <p className="mt-3 text-xl font-semibold text-teal">{u.heroSubtitle}</p>
              <p className="mt-4 flex items-start gap-2 rounded-card border bg-card/70 p-3 text-sm text-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                This is an illustrative scenario, not a specific customer. Steps and timelines vary by hospital and are planned with you during the demo.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/demo" data-track="use-case-demo">
                    Request a Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/use-cases">All use cases</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-heading">The setting</h2>
            <dl className="mt-5 divide-y rounded-card border bg-card shadow-soft">
              {u.profile.map((p) => (
                <div key={p.label} className="flex gap-4 px-5 py-3 text-sm">
                  <dt className="w-28 shrink-0 font-semibold text-heading">{p.label}</dt>
                  <dd className="text-body">{p.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-heading">Common problems before</h2>
            <ul className="mt-5 space-y-3">
              {u.challenges.map((c) => (
                <li key={c} className="flex gap-2 leading-relaxed text-body">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading center eyebrow="Workflow" title="How the day runs on MedicoreERP" className="mb-12" />
        <ol className="mx-auto max-w-3xl space-y-5">
          {u.workflow.map((step, i) => (
            <li key={step.title} className="flex gap-4 rounded-card border bg-card p-5 shadow-soft">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-clinical text-sm font-bold text-white">{i + 1}</span>
              <div>
                <h3 className="font-heading text-base font-bold text-heading">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.desc}</p>
                <Link href={step.href} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-clinical hover:underline">
                  See the module <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading center eyebrow="What changes" title="What the team works with afterwards" className="mb-12" />
        <div className="grid gap-5 sm:grid-cols-2">
          {u.outcomes.map((o) => (
            <div key={o.title} className="flex h-full flex-col rounded-card border bg-card p-6 shadow-soft">
              <CheckCircle2 className="mb-3 h-6 w-6 text-teal" />
              <h3 className="font-heading text-lg font-bold text-heading">{o.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{o.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading center eyebrow="Rollout" title="A typical rollout plan" className="mb-12" />
        <ol className="mx-auto max-w-3xl divide-y rounded-card border bg-card shadow-soft">
          {u.rollout.map((r) => (
            <li key={r.phase} className="flex gap-4 px-5 py-4">
              <span className="w-28 shrink-0 font-semibold text-heading">{r.phase}</span>
              <span className="text-body">{r.desc}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading center eyebrow="FAQs" title="Frequently asked questions" className="mb-12" />
        <FAQ items={u.faqs} />
        <nav aria-label="Other use cases" className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/use-cases/${o.slug}`} className="rounded-pill border bg-card px-4 py-2 text-sm font-semibold text-clinical hover:underline">
              {o.cardTitle}
            </Link>
          ))}
        </nav>
      </Section>

      <CTABand title="See this workflow with your own setup" subtitle="Book a demo and the team will map MedicoreERP to your departments, payers and rollout plan." />
    </>
  );
}
