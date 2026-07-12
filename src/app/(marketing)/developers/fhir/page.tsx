import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Reveal } from "@/components/marketing/blocks";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "FHIR Reference",
  description: "FHIR R4 resource reference, SMART-on-FHIR scopes, and quickstart for the MedicoreERP API.",
  alternates: { canonical: "/developers/fhir" },
};

const RESOURCES = [
  ["Patient", "Demographics, identifiers, ABHA linkage"],
  ["Encounter", "OPD / IPD / ER visits and status"],
  ["Observation", "Vitals, labs, and device readings"],
  ["Condition", "Problems and diagnoses"],
  ["MedicationRequest", "e-Prescribe and pharmacy orders"],
  ["DiagnosticReport", "Lab and radiology reports"],
];

export default function FhirPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Developers"
          title="FHIR R4 reference"
          subtitle="The same resource model the product uses internally — public, documented, and SMART-ready."
          className="mb-10"
        />
        <div className="flex flex-wrap gap-3">
          <Button asChild><Link href="/developers/sandbox">Get sandbox keys</Link></Button>
          <Button asChild variant="outline"><Link href="/developers/docs">Open API docs</Link></Button>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map(([name, desc], i) => (
            <Reveal key={name} delay={i * 0.04}>
              <div className="rounded-card border bg-card p-5 shadow-soft">
                <div className="flex items-center gap-2 text-teal">
                  <BookOpen className="h-4 w-4" />
                  <h3 className="font-heading font-bold text-heading">{name}</h3>
                </div>
                <p className="mt-2 text-sm text-muted">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 rounded-card border bg-mist/40 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-teal" />
            <div>
              <h3 className="font-heading font-bold text-heading">SMART on FHIR</h3>
              <p className="mt-1 text-sm text-muted">
                Register apps, request scoped access, and launch inside the chart. OAuth 2.0 + PKCE for public clients.
              </p>
              <Link href="/developers/marketplace" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                Browse marketplace apps <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <CTABand title="Build against a live tenant" subtitle="Provision a sandbox with sample FHIR data in minutes." />
    </>
  );
}
