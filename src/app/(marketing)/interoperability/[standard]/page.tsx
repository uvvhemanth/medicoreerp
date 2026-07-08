import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STANDARDS } from "@/lib/content/marketing";
import { Section, CTABand, Eyebrow } from "@/components/marketing/blocks";
import { CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return STANDARDS.map((s) => ({ standard: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ standard: string }> }): Promise<Metadata> {
  const { standard } = await params;
  const s = STANDARDS.find((x) => x.slug === standard);
  return s ? { title: `${s.name} — Interoperability`, description: s.desc } : {};
}

export default async function StandardPage({ params }: { params: Promise<{ standard: string }> }) {
  const { standard } = await params;
  const s = STANDARDS.find((x) => x.slug === standard);
  if (!s) notFound();

  return (
    <>
      <section className="border-b">
        <div className="container-page py-16">
          <Eyebrow>Interoperability</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight text-heading sm:text-5xl">{s.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{s.desc}</p>
        </div>
      </section>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Standards-compliant by default", "Public, documented, versioned API", "Sandbox environment for testing", "Guaranteed data-freedom exports", "SMART-on-FHIR app support", "Webhooks for real-time events"].map((f) => (
            <div key={f} className="flex items-center gap-3 rounded-card border bg-card p-5 shadow-soft">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              <span className="text-body">{f}</span>
            </div>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
