import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { BadgeCheck, ShieldCheck, FolderOpen, FileText, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Healthcare Compliance & Data Protection | MedicoreERP" },
  description:
    "Support healthcare compliance requirements with secure data controls, auditability, privacy management and regulatory-ready workflows.",
  keywords: [
    "Healthcare Compliance Software",
    "hospital compliance software",
    "HIPAA healthcare software",
    "healthcare data compliance",
    "healthcare privacy management",
    "medical software compliance",
  ],
  alternates: { canonical: "/security/compliance" },
  openGraph: {
    title: "Healthcare Compliance & Data Protection | MedicoreERP",
    description:
      "Support healthcare compliance requirements with secure data controls, auditability, privacy management and regulatory-ready workflows.",
    url: "/security/compliance",
  },
};

const CAPABILITIES = [
  {
    icon: ShieldCheck,
    title: "Compliance-Ready Controls",
    desc: "Support access management, auditing, privacy and secure information handling.",
  },
  {
    icon: FolderOpen,
    title: "Data Governance",
    desc: "Maintain better control over how sensitive healthcare information is accessed and managed.",
  },
  {
    icon: FileText,
    title: "Audit Readiness",
    desc: "Keep traceable digital records that support internal and regulatory reviews.",
  },
  {
    icon: Lock,
    title: "Privacy Protection",
    desc: "Protect patient and organizational information through secure system controls.",
  },
];

const FRAMEWORKS = [
  { name: "HIPAA", scope: "US health data privacy & security", status: "Compliant", items: ["BAA available", "Encryption & access controls", "Audit logging", "Breach notification process"] },
  { name: "GDPR", scope: "EU data protection", status: "Compliant", items: ["DPA available", "Data subject request (DSR) tooling", "Consent ledger", "Right to erasure & portability"] },
  { name: "ABDM", scope: "India — Ayushman Bharat Digital Mission", status: "Ready", items: ["ABHA linkage", "Health facility registry", "Consent manager integration", "FHIR-based data exchange"] },
  { name: "SOC 2 Type II", scope: "Security, availability, confidentiality", status: "Certified", items: ["Annual independent audit", "Continuous monitoring", "Vendor risk management"] },
  { name: "ISO 27001", scope: "Information security management", status: "Certified", items: ["ISMS in place", "Risk assessments", "Documented controls"] },
  { name: "NABH", scope: "India hospital accreditation support", status: "Supported", items: ["Auto-collected accreditation evidence", "Real-time quality dashboards", "Incident & CAPA tracking"] },
];

export default function CompliancePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
          { name: "Compliance", path: "/security/compliance" },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 text-center lg:py-16">
          <Reveal>
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal text-white shadow-soft">
              <BadgeCheck className="h-7 w-7" />
            </div>
            <Eyebrow>Healthcare Compliance Software</Eyebrow>
            <h1 className="text-heading-display mx-auto mt-5 max-w-3xl">Healthcare Compliance Made Easier</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              MedicoreERP helps healthcare organizations strengthen security, privacy and governance across clinical and administrative workflows.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">
                  Request Compliance Information <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/security">Data security</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading
          center
          eyebrow="Compliance capabilities"
          title="Security, Privacy and Governance in One Platform"
          subtitle="Support healthcare compliance requirements with secure data controls, auditability, privacy management and regulatory-ready workflows."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="flex h-full gap-4 rounded-card border bg-card p-6 shadow-soft">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-heading">{item.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Frameworks"
          title="Certified, audited, and regionally ready"
          subtitle="Compliance is part of the product — not a PDF you never see."
          className="mb-14"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {FRAMEWORKS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.04}>
              <div className="rounded-card border bg-card p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold text-heading">{f.name}</h3>
                  <span className="rounded-pill bg-success/12 px-3 py-1 text-xs font-bold text-success">{f.status}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{f.scope}</p>
                <ul className="mt-4 space-y-2">
                  {f.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-body">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand
        title="Request Compliance Information"
        subtitle="Support healthcare compliance requirements with secure data controls, auditability, privacy management and regulatory-ready workflows."
        ctaLabel="Request Compliance Information"
        ctaHref="/contact"
      />
    </>
  );
}
