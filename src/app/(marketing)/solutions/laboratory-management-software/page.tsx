import type { Metadata } from "next";
import Link from "next/link";
import { LABORATORY_LANDING } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal, FAQ } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { HisDashboard } from "@/components/marketing/his-dashboard";
import { ArrowRight, Star } from "lucide-react";

const PAGE = LABORATORY_LANDING;

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

export default function LaboratoryManagementSoftwarePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: "Laboratory Management Software", path: PAGE.seo.canonical },
          ]),
          faqJsonLd(PAGE.faqs),
        ]}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-16">
          <Reveal>
            <div>
              <Eyebrow>{PAGE.heroSubtitle}</Eyebrow>
              <h1 className="text-heading-display mt-5 max-w-xl">{PAGE.heroTitle}</h1>
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
                  <Link href="/product/lab">Explore LIS</Link>
                </Button>
              </div>
              <p className="mt-6 flex items-center gap-1.5 text-base text-muted">
                <Star className="h-4 w-4 fill-warning text-warning" />
                Built for diagnostic centres, pathology labs and multi-centre networks
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <HisDashboard compact />
          </Reveal>
        </div>
      </section>

      <Section className="!py-10">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PAGE.journey.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <div className="rounded-card border bg-card px-4 py-4 text-center shadow-soft">
                <p className="font-heading text-xs font-extrabold uppercase tracking-[0.14em] text-teal">
                  Step {item.step}
                </p>
                <p className="mt-1 font-heading font-bold text-heading">{item.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Laboratory modules"
          title="Connect the Entire Sample Journey"
          subtitle="Orders, samples, analyzers, results, reports and billing stay linked to the patient record."
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
      </Section>

      <Section>
        <SectionHeading center eyebrow="Lab FAQs" title="Questions diagnostic centres ask before they switch" className="mb-12" />
        <FAQ items={PAGE.faqs} />
      </Section>

      <CTABand
        title="Ready to connect your lab workflow?"
        subtitle="Looking for Laboratory Management Software in Hyderabad? Book a demo to see how MedicoreERP manages test orders, samples, processing, results, reports, billing and analyzers."
      />
    </>
  );
}
