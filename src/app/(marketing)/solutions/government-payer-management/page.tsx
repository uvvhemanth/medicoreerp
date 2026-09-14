import type { Metadata } from "next";
import Link from "next/link";
import { GOVERNMENT_PAYER_LANDING } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal, FAQ } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { HisDashboard } from "@/components/marketing/his-dashboard";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

const PAGE = GOVERNMENT_PAYER_LANDING;

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

export default function GovernmentPayerManagementPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: "Government & Payer Management", path: PAGE.seo.canonical },
          ]),
          faqJsonLd(PAGE.faqs),
        ]}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-16">
          <Reveal>
            <div>
              <Eyebrow>Healthcare Payer Management Software</Eyebrow>
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
                    Request a Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Talk to Our ERP Expert</Link>
                </Button>
              </div>
              <p className="mt-6 flex items-center gap-1.5 text-base text-muted">
                <Star className="h-4 w-4 fill-warning text-warning" />
                Built for insurers, TPAs, government programs and multi-payer hospitals
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
          eyebrow="Payer ecosystems"
          title="Built for Healthcare Payer Ecosystems"
          subtitle="Standardize eligibility, authorizations, claims and settlements across insurers, TPAs and government programs."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAGE.audiences.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-card border bg-card p-6 shadow-soft">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-lg font-bold text-heading">{item.title}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          center
          eyebrow="Government & payer modules"
          title="From Eligibility to Settlement"
          subtitle="Keep policy, authorization, eClaims, documentation, receivables and billing connected to the same patient record."
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
                  <h3 className="font-heading text-base font-bold text-heading">{mod.title}</h3>
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
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Why choose MedicoreERP for government & payers"
          title="Visibility Across Claims, Approvals and Settlements"
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAGE.reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.04}>
              <div className="flex h-full items-start gap-3 rounded-card border bg-card p-6 shadow-soft">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div>
                  <h3 className="font-heading font-bold text-heading">{reason.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{reason.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="Government / Payer FAQs" title="Questions payer teams ask before they switch" className="mb-12" />
        <FAQ items={PAGE.faqs} />
      </Section>

      <CTABand
        title="Simplify Payer and Claims Management with MedicoreERP"
        subtitle="Bring eligibility, pre-authorizations, insurance, claims, settlements and hospital billing together through one connected healthcare ERP platform. Request a Demo."
      />
    </>
  );
}
