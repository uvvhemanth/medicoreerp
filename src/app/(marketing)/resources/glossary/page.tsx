import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY } from "@/lib/content/marketing";
import { Section, SectionHeading, CTABand } from "@/components/marketing/blocks";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Definitions of FHIR, ABDM, RCM, HIS, and other healthcare ERP terms for buyers and implementers.",
  alternates: { canonical: "/resources/glossary" },
};

export default function GlossaryIndex() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <>
      <Section>
        <SectionHeading
          center
          eyebrow="Resources"
          title="Healthcare ERP glossary"
          subtitle="SEO-friendly definitions that connect buyers to the right product and solution pages."
          className="mb-12"
        />
        <div className="mx-auto max-w-3xl divide-y rounded-card border bg-card">
          {sorted.map((t) => (
            <Link key={t.slug} href={`/resources/glossary/${t.slug}`} className="block px-6 py-5 transition hover:bg-mist/40">
              <h3 className="font-heading font-bold text-heading">{t.term}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{t.definition}</p>
            </Link>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
