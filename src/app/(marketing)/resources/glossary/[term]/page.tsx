import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GLOSSARY } from "@/lib/content/marketing";
import { CTABand } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd, definedTermJsonLd } from "@/lib/seo";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const { term } = await params;
  const t = GLOSSARY.find((x) => x.slug === term);
  if (!t) return {};
  return {
    title: `${t.term} meaning`,
    description: t.definition,
    alternates: { canonical: `/resources/glossary/${t.slug}` },
  };
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const t = GLOSSARY.find((x) => x.slug === term);
  if (!t) notFound();

  const related = t.related
    .map((slug) => GLOSSARY.find((x) => x.slug === slug))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Glossary", path: "/resources/glossary" },
            { name: t.term, path: `/resources/glossary/${t.slug}` },
          ]),
          definedTermJsonLd({ term: t.term, definition: t.definition, path: `/resources/glossary/${t.slug}` }),
        ]}
      />
      <article className="container-page max-w-3xl py-12">
        <Link href="/resources/glossary" className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
          <ArrowLeft className="h-4 w-4" /> Glossary
        </Link>
        <h1 className="mt-6 font-heading text-4xl font-extrabold text-heading">{t.term}</h1>
        <p className="mt-6 text-xl leading-relaxed text-body">{t.definition}</p>
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="font-heading text-xl font-bold text-heading">Related terms</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map((r) => (
                <li key={r!.slug}>
                  <Link href={`/resources/glossary/${r!.slug}`} className="rounded-pill border bg-card px-3 py-1 text-sm font-semibold text-teal hover:bg-mist">
                    {r!.term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-10 rounded-card border bg-mist/40 p-6">
          <p className="font-heading font-bold text-heading">See it in MedicoreERP</p>
          <p className="mt-2 text-sm text-muted">Explore the product modules and book a demo to see how this concept shows up in real workflows.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/product" className="text-teal hover:underline">Product</Link>
            <Link href="/demo" className="text-teal hover:underline">Book a demo</Link>
            <Link href="/compare/vs-epic" className="text-teal hover:underline">Compare</Link>
          </div>
        </div>
      </article>
      <CTABand />
    </>
  );
}
