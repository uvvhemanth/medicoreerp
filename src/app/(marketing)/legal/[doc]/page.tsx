import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/marketing/blocks";

const DOCS: Record<string, { title: string; intro: string }> = {
  privacy: { title: "Privacy Policy", intro: "How we collect, use, and protect information on this marketing website. The operational app is governed separately and never exposes PHI here." },
  terms: { title: "Terms of Service", intro: "The terms governing your use of the MedicoreERP website and services." },
  dpa: { title: "Data Processing Agreement", intro: "Our commitments as a data processor under GDPR and equivalent regulations." },
  baa: { title: "Business Associate Agreement", intro: "Our HIPAA business-associate commitments for covered entities." },
  cookies: { title: "Cookie Policy", intro: "The cookies we use and how to control them. No non-essential tracking runs before consent." },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params;
  const d = DOCS[doc];
  return d ? { title: d.title } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const d = DOCS[doc];
  if (!d) notFound();

  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <p className="text-sm text-muted">Last updated: 08 July 2026</p>
        <h1 className="mt-2 font-heading text-4xl font-extrabold text-heading">{d.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-body">{d.intro}</p>
        <div className="mt-8 space-y-6 text-body">
          {["1. Overview", "2. Information we handle", "3. How we use it", "4. Your rights", "5. Contact"].map((h) => (
            <section key={h}>
              <h2 className="font-heading text-xl font-bold text-heading">{h}</h2>
              <p className="mt-2 leading-relaxed text-muted">
                MedicoreERP is committed to protecting your privacy and handling information responsibly. Contact our legal team for the full policy text for this section.
              </p>
            </section>
          ))}
        </div>
      </article>
    </Section>
  );
}
