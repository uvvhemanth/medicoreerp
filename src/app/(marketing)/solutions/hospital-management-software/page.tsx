import type { Metadata } from "next";
import Link from "next/link";
import { HOSPITAL_LANDING } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal, FAQ } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { HisDashboard } from "@/components/marketing/his-dashboard";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

const PAGE = HOSPITAL_LANDING;

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

export default function HospitalManagementSoftwarePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: "Hospital Management Software", path: PAGE.seo.canonical },
          ]),
          faqJsonLd(PAGE.faqs),
        ]}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-16">
          <Reveal>
            <div>
              <Eyebrow>Hospital Management System in Hyderabad</Eyebrow>
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
                  <Link href="/dashboard">Open dashboard</Link>
                </Button>
              </div>
              <p className="mt-6 flex items-center gap-1.5 text-base text-muted">
                <Star className="h-4 w-4 fill-warning text-warning" />
                Built for specialty hospitals, large hospitals and hospital groups
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
          eyebrow="Hospital types"
          title="Designed for Every Stage of Hospital Growth"
          subtitle="From a specialty hospital to a multi-facility group, MedicoreERP scales with how your organization actually operates."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          eyebrow="Hospital management modules"
          title="Every Department on One Platform"
          subtitle="Clinical, operational and financial workflows stay connected to the same patient record."
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
          eyebrow="What makes MedicoreERP different"
          title="One Patient Journey. Connected Information."
          className="mb-12"
        />
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {PAGE.journey.map((step, i) => (
            <span key={step} className="inline-flex items-center gap-2">
              <span className="rounded-pill border bg-card px-3 py-1.5 text-xs font-semibold text-heading">
                {step}
              </span>
              {i < PAGE.journey.length - 1 ? (
                <ArrowRight className="h-3.5 w-3.5 text-teal" />
              ) : null}
            </span>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAGE.differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <div className="flex h-full flex-col rounded-card border bg-card p-6 shadow-soft">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-bold text-heading">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {["FHIR R4", "HL7 v2", "DICOM", "ABDM / ABHA", "Workflow Studio", "Form Builder"].map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-pill border bg-card px-3 py-1.5 text-xs font-semibold text-body">
              <CheckCircle2 className="h-3 w-3 text-success" /> {tag}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="Hospital FAQs" title="Questions hospitals ask before they switch" className="mb-12" />
        <FAQ items={PAGE.faqs} />
      </Section>

      <CTABand
        title="Ready to run your hospital on one platform?"
        subtitle="Looking for a Hospital Management System in Hyderabad? Request a demo to see how MedicoreERP connects OPD, IPD, EMR, laboratory, radiology, pharmacy, insurance and billing."
      />
    </>
  );
}
