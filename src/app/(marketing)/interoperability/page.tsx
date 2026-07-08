import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { Button } from "@/components/ui/button";
import { STANDARDS } from "@/lib/content/marketing";
import { Network, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Interoperability", description: "FHIR-native by default. HL7, DICOM, ABDM/TEFCA/EHDS ready, with guaranteed data-freedom." };

export default function InteroperabilityHub() {
  return (
    <>
      <section className="border-b">
        <div className="container-page py-16 text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-clinical text-white shadow-soft"><Network className="h-7 w-7" /></div>
          <Eyebrow>Interoperability</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight text-heading sm:text-5xl">Interoperable by default. Locked-in never.</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">Built on open standards from day one — the reason CIOs choose Aether.</p>
        </div>
      </section>
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link href={`/interoperability/${s.slug}`} className="group flex h-full flex-col rounded-card border bg-card p-6 shadow-soft transition hover:shadow-card">
                <h3 className="font-heading text-lg font-bold text-heading">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline"><Link href="/developers">Explore the developer platform</Link></Button>
        </div>
      </Section>
      <CTABand />
    </>
  );
}
