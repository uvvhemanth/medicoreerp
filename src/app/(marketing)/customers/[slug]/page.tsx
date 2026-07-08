import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, CTABand, Eyebrow } from "@/components/marketing/blocks";
import { ArrowRight, Quote } from "lucide-react";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((x) => x.slug === slug);
  return cs ? { title: `${cs.org} — Case study`, description: cs.challenge } : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((x) => x.slug === slug);
  if (!cs) notFound();

  return (
    <>
      <section className="border-b">
        <div className="container-page py-14">
          <Eyebrow>{cs.edition} · {cs.region}</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight text-heading sm:text-5xl">{cs.org}</h1>
        </div>
      </section>

      <div className="container-page py-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cs.image} alt={cs.org} className="aspect-[21/9] w-full rounded-card border object-cover shadow-soft" />
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {cs.metrics.map((m) => (
            <div key={m.label} className="rounded-card border bg-card p-5 text-center shadow-soft">
              <p className="font-heading text-3xl font-extrabold text-teal">{m.value}</p>
              <p className="mt-1 text-sm text-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Section className="!pt-4">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="font-heading text-xl font-bold text-heading">The challenge</h2>
            <p className="mt-2 text-lg leading-relaxed text-body">{cs.challenge}</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-heading">The solution</h2>
            <p className="mt-2 text-lg leading-relaxed text-body">{cs.solution}</p>
          </div>
          <figure className="rounded-card border-l-4 border-teal bg-mist/40 p-6">
            <Quote className="h-6 w-6 text-teal" />
            <blockquote className="mt-2 font-heading text-xl font-bold text-heading">“{cs.quote}”</blockquote>
            <figcaption className="mt-2 text-sm text-muted">— {cs.author}</figcaption>
          </figure>
          <Button asChild><Link href="/customers">More case studies <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
