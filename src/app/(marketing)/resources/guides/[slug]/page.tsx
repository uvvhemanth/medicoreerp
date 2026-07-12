import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES } from "@/lib/content/marketing";
import { LeadForm } from "@/components/marketing/lead-form";
import { CTABand } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ArrowLeft, Clock } from "lucide-react";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.excerpt,
    alternates: { canonical: `/resources/guides/${g.slug}` },
    openGraph: { title: g.title, description: g.excerpt, images: [g.image] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "Guides", path: "/resources/guides" },
            { name: g.title, path: `/resources/guides/${g.slug}` },
          ]),
          articleJsonLd({
            title: g.title,
            description: g.excerpt,
            path: `/resources/guides/${g.slug}`,
            date: "2026-07-01",
            author: "MedicoreERP",
            image: g.image,
          }),
        ]}
      />
      <article className="container-page max-w-3xl py-12">
        <Link href="/resources/guides" className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
          <ArrowLeft className="h-4 w-4" /> All guides
        </Link>
        <span className="mt-6 block text-xs font-bold uppercase tracking-wide text-teal">{g.category}</span>
        <h1 className="mt-2 font-heading text-4xl font-extrabold leading-tight text-heading">{g.title}</h1>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Clock className="h-4 w-4" /> {g.readMins} min read
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={g.image} alt="" className="mt-8 aspect-[16/9] w-full rounded-card border object-cover" />
        <div className="prose mt-8 space-y-5 text-lg leading-relaxed text-body">
          <p className="text-xl font-medium text-heading">{g.excerpt}</p>
          <p>
            This guide is written for hospital buyers evaluating a medical ERP / HIS replacement. It covers scope,
            data migration, training, and the conversion checkpoints that keep a go-live on schedule.
          </p>
          <h2 className="font-heading text-2xl font-bold text-heading">Who this is for</h2>
          <p>CIOs, CFOs, medical directors, and implementation leads planning a platform change in the next 6–18 months.</p>
          <h2 className="font-heading text-2xl font-bold text-heading">What you will walk away with</h2>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>A phased cutover plan that protects clinical continuity</li>
            <li>A denial and documentation baseline to measure ROI</li>
            <li>A compliance checklist for ABDM / HIPAA / GDPR contexts</li>
          </ul>
        </div>

        {g.gated && (
          <div className="mt-12 rounded-card border bg-mist/40 p-6">
            <h2 className="font-heading text-2xl font-bold text-heading">Download the full guide</h2>
            <p className="mt-2 text-muted">Leave your work email and we will send the PDF (demo lead capture).</p>
            <div className="mt-6">
              <LeadForm variant="contact" />
            </div>
          </div>
        )}
      </article>
      <CTABand />
    </>
  );
}
