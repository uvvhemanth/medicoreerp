import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Server, MapPin, Eye, ShieldCheck, Network, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Healthcare Data Residency & Governance | MedicoreERP" },
  description:
    "Keep healthcare data within approved regions and strengthen control over where patient and hospital information is stored with MedicoreERP.",
  keywords: [
    "Healthcare Data Residency",
    "hospital data residency",
    "regional healthcare data hosting",
    "healthcare data governance",
    "patient data location",
  ],
  alternates: { canonical: "/security/data-residency" },
  openGraph: {
    title: "Healthcare Data Residency & Governance | MedicoreERP",
    description:
      "Keep healthcare data within approved regions and strengthen control over where patient and hospital information is stored with MedicoreERP.",
    url: "/security/data-residency",
  },
};

const CAPABILITIES = [
  {
    icon: MapPin,
    title: "Choose the Appropriate Data Region",
    desc: "Healthcare organizations can select suitable deployment regions based on business and regulatory requirements.",
  },
  {
    icon: Eye,
    title: "Know Where Your Data Is Stored",
    desc: "Maintain better visibility and control over the location of sensitive healthcare information.",
  },
  {
    icon: ShieldCheck,
    title: "Stronger Data Governance",
    desc: "Combine data residency with encryption, access controls, and audit trails for better protection.",
  },
  {
    icon: Network,
    title: "Support Multiple Locations",
    desc: "MedicoreERP can support hospitals and healthcare groups operating across different branches or regions.",
  },
];

export default function DataResidencyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
          { name: "Data Residency", path: "/security/data-residency" },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 text-center lg:py-16">
          <Reveal>
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal text-white shadow-soft">
              <Server className="h-7 w-7" />
            </div>
            <Eyebrow>Healthcare Data Residency</Eyebrow>
            <h1 className="text-heading-display mx-auto mt-5 max-w-3xl">Keep Healthcare Data in the Right Region</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Healthcare organizations may need patient and business data to remain within a specific country or region. MedicoreERP supports deployment options that help organizations manage where their information is stored.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">
                  Discuss Your Data Requirements <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/security">Explore MedicoreERP Security</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading
          center
          eyebrow="Data residency"
          title="Control where healthcare information is stored"
          subtitle="Keep healthcare data within approved regions and strengthen control over where patient and hospital information is stored."
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
            Healthcare organizations can maintain better control over their data while supporting regional data-handling requirements.
          </p>
        </div>
      </Section>

      <CTABand
        title="Discuss Your Data Requirements"
        subtitle="Keep healthcare data within approved regions and strengthen control over where patient and hospital information is stored with MedicoreERP."
        ctaLabel="Discuss Your Data Requirements"
        ctaHref="/contact"
      />
    </>
  );
}
