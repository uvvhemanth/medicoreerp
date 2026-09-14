import type { Metadata } from "next";
import Link from "next/link";
import { COMPLIANCE_BADGES } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ShieldCheck, Lock, Eye, Server, FileText, Activity, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Healthcare Data Security Solutions | MedicoreERP" },
  description:
    "Protect patient, clinical and financial data with encryption, access control, audit trails and secure healthcare data management.",
  keywords: [
    "Healthcare Data Security",
    "hospital data security",
    "healthcare cybersecurity",
    "patient data protection",
    "healthcare ERP security",
    "medical data security",
  ],
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Healthcare Data Security Solutions | MedicoreERP",
    description:
      "Protect patient, clinical and financial data with encryption, access control, audit trails and secure healthcare data management.",
    url: "/security",
  },
};

const CAPABILITIES = [
  {
    icon: Lock,
    title: "Encryption Everywhere",
    desc: "Protect patient and hospital data while it is stored, shared, and accessed.",
    href: "/security/encryption",
  },
  {
    icon: Eye,
    title: "Smart Access Control",
    desc: "Give users access based on their role, department, branch, and responsibilities.",
    href: "/security/access-control",
  },
  {
    icon: FileText,
    title: "Complete Audit Trails",
    desc: "Track important logins, record views, changes, exports, and user activity.",
    href: "/security/audit-trails",
  },
  {
    icon: Server,
    title: "Data Residency",
    desc: "Keep healthcare data within approved regions based on your organization's requirements.",
    href: "/security/data-residency",
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 text-center lg:py-16">
          <Reveal>
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal text-white shadow-soft">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <Eyebrow>Healthcare Data Security</Eyebrow>
            <h1 className="text-heading-display mx-auto mt-5 max-w-3xl">
              Healthcare Data Security Built Into Every Workflow
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Protect sensitive patient, clinical and financial information with enterprise-grade security built into MedicoreERP.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">
                  Talk to Our Security Team <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/security/compliance">Compliance details</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading
          center
          eyebrow="Security capabilities"
          title="Protect Patient, Clinical and Financial Data"
          subtitle="Encryption, access control, audit trails and data residency are built into everyday MedicoreERP workflows."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              {item.href ? (
                <Link href={item.href} className="flex h-full gap-4 rounded-card border bg-card p-6 shadow-soft transition hover:shadow-card">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-heading">{item.title}</h2>
                    <p className="mt-2 leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex h-full gap-4 rounded-card border bg-card p-6 shadow-soft">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-heading">{item.title}</h2>
                    <p className="mt-2 leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading center title="Certifications & compliance" className="mb-10" />
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {COMPLIANCE_BADGES.map((b) => (
            <span key={b} className="flex items-center gap-2 rounded-card border bg-card px-5 py-3 font-heading font-bold text-heading shadow-soft">
              <ShieldCheck className="h-4 w-4 text-teal" /> {b}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center justify-between gap-4 rounded-card border bg-card p-6 shadow-soft sm:flex-row">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-success" />
            <div>
              <p className="font-heading font-bold text-heading">All systems operational</p>
              <p className="text-sm text-muted">Live status for MedicoreERP services and integrations.</p>
            </div>
          </div>
          <Button asChild variant="outline">
            <Link href="/security/status">
              View live status <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <CTABand
        title="Talk to Our Security Team"
        subtitle="Protect patient, clinical and financial data with encryption, access control, audit trails and secure healthcare data management."
        ctaLabel="Talk to Our Security Team"
        ctaHref="/contact"
      />
    </>
  );
}
