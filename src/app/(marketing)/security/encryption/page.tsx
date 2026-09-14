import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Lock, Database, Share2, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Healthcare Data Encryption & Security | MedicoreERP" },
  description:
    "Protect patient, clinical, and financial data with secure encryption while information is stored, shared, and accessed through MedicoreERP.",
  keywords: [
    "Healthcare Data Encryption",
    "hospital data encryption",
    "encrypted healthcare ERP",
    "patient data encryption",
    "healthcare data at rest",
  ],
  alternates: { canonical: "/security/encryption" },
  openGraph: {
    title: "Healthcare Data Encryption & Security | MedicoreERP",
    description:
      "Protect patient, clinical, and financial data with secure encryption while information is stored, shared, and accessed through MedicoreERP.",
    url: "/security/encryption",
  },
};

const CAPABILITIES = [
  {
    icon: Database,
    title: "Secure Data at Rest",
    desc: "Patient, clinical, and financial information stored in MedicoreERP is protected using strong encryption.",
  },
  {
    icon: Share2,
    title: "Secure Data in Transit",
    desc: "Information shared between users, systems, and applications is encrypted while it travels across networks.",
  },
  {
    icon: Lock,
    title: "Extra Protection for Sensitive Data",
    desc: "Highly sensitive information can receive additional protection to reduce the risk of unauthorized access.",
  },
  {
    icon: ShieldCheck,
    title: "Built-In Security",
    desc: "Encryption is part of the MedicoreERP platform, helping hospitals protect data without adding complex security processes.",
  },
];

export default function EncryptionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
          { name: "Encryption", path: "/security/encryption" },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 text-center lg:py-16">
          <Reveal>
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal text-white shadow-soft">
              <Lock className="h-7 w-7" />
            </div>
            <Eyebrow>Healthcare Data Encryption</Eyebrow>
            <h1 className="text-heading-display mx-auto mt-5 max-w-3xl">Keep Patient and Hospital Data Secure</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              MedicoreERP protects sensitive healthcare information using strong encryption. Whether data is stored in the system or shared between applications, security remains active throughout the process.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/security">
                  Explore MedicoreERP Security <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to Our Security Team</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading
          center
          eyebrow="Encryption everywhere"
          title="Security remains active throughout the process"
          subtitle="Protect patient, clinical, and financial data while information is stored, shared, and accessed through MedicoreERP."
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
        <div className="mx-auto max-w-3xl rounded-card border bg-card p-8 text-center shadow-soft sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-heading">Why It Matters</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Hospitals can protect sensitive information while giving authorized teams secure access when they need it.
          </p>
        </div>
      </Section>

      <CTABand
        title="Explore MedicoreERP Security"
        subtitle="Protect patient, clinical, and financial data with secure encryption while information is stored, shared, and accessed through MedicoreERP."
        ctaLabel="Explore MedicoreERP Security"
        ctaHref="/security"
      />
    </>
  );
}
