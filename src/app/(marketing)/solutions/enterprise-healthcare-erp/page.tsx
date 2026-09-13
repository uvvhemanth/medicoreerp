import type { Metadata } from "next";
import Link from "next/link";
import { ENTERPRISE_LANDING } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal, FAQ } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { HisDashboard } from "@/components/marketing/his-dashboard";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

const PAGE = ENTERPRISE_LANDING;

export const metadata: Metadata = {
  title: { absolute: PAGE.seo.title },
  description: PAGE.seo.description,
  keywords: PAGE.seo.keywords,
  alternates: { canonical: PAGE.seo.canonical },
  openGraph: {
    title: PAGE.seo.title,
    description: PAGE.seo.description,
    url: PAGE.seo.canonical,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE.seo.title,
    description: PAGE.seo.description,
  },
};

export default function EnterpriseHealthcareErpPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: "Enterprise Healthcare ERP", path: PAGE.seo.canonical },
          ]),
          faqJsonLd(PAGE.faqs),
        ]}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-16">
          <Reveal>
            <div>
              <Eyebrow>Enterprise Healthcare ERP</Eyebrow>
              <h1 className="text-heading-display mt-5 max-w-xl">{PAGE.heroTitle}</h1>
              <p className="mt-3 text-xl font-semibold text-teal">{PAGE.heroSubtitle}</p>
              <div className="mt-4 max-w-xl space-y-3">
                {PAGE.overview.map((p) => (
                  <p key={p} className="text-subtitle">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/demo">
                    Book a Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/product/analytics">See analytics</Link>
                </Button>
              </div>
              <p className="mt-6 flex items-center gap-1.5 text-base text-muted">
                <Star className="h-4 w-4 fill-warning text-warning" />
                Built for hospital groups and multi-location healthcare networks
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <HisDashboard compact />
          </Reveal>
        </div>
      </section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Enterprise modules"
          title="Centralize the Network. Configure the Local Work."
          subtitle="Standardize EMR, inventory, revenue and analytics across facilities while keeping workflows, forms and permissions configurable."
          className="mb-14"
        />
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PAGE.modules.map((mod, i) => (
            <Reveal key={mod.title} delay={i * 0.03}>
              <div className="flex gap-4">
                <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-clinical/10 text-clinical">
                  <mod.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-heading text-base font-bold text-heading">{mod.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{mod.desc}</p>
                  <Link
                    href={mod.href}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-clinical hover:underline"
                  >
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2">
          {["Multi-hospital", "Workflow Studio", "Form Builder", "FHIR / HL7 / DICOM", "Centralized analytics", "Role-based access"].map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-pill border bg-card px-3 py-1.5 text-xs font-semibold text-body">
              <CheckCircle2 className="h-3 w-3 text-success" /> {tag}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="Enterprise FAQs" title="Questions hospital networks ask before they switch" className="mb-12" />
        <FAQ items={PAGE.faqs} />
      </Section>

      <CTABand
        title="Ready to run one platform across your network?"
        subtitle="Looking for Enterprise Healthcare ERP? Book a demo to see how MedicoreERP connects hospitals, clinics and facilities with centralized workflows, analytics and integrations."
      />
    </>
  );
}
