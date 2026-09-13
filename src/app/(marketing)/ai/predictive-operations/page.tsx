import type { Metadata } from "next";
import Link from "next/link";
import { PREDICTIVE_OPERATIONS_LANDING } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";

const PAGE = PREDICTIVE_OPERATIONS_LANDING;

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

export default function PredictiveOperationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI", path: "/ai" },
          { name: "Predictive Operations", path: PAGE.seo.canonical },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 lg:py-16">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Predictive Hospital Analytics</Eyebrow>
              <h1 className="text-heading-display mt-5">{PAGE.heroTitle}</h1>
              <p className="mt-3 text-xl font-semibold text-teal">{PAGE.heroSubtitle}</p>
              <div className="mt-4 space-y-3">
                {PAGE.overview.map((p) => (
                  <p key={p} className="text-subtitle">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" variant="outline">
                  <Link href="#capabilities">Predict Smarter</Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/demo">
                    Schedule a Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="mt-6 inline-flex items-center gap-1.5 text-base text-muted">
                <Star className="h-4 w-4 fill-warning text-warning" />
                Predictions support planning — they do not act without your team
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Early signals</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-heading">
              Hospitals generate signals before problems happen
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              A growing waiting list, delayed discharge, unexpected occupancy or appointment no-show rarely appears without warning.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              The challenge is identifying the signal early enough to act.
            </p>
            <p className="mt-4 text-body">
              Predictive Operations analyzes connected hospital information to help administrators identify possible operational pressure points earlier.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {PAGE.signals.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-card border bg-card p-4 shadow-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="font-heading font-semibold text-heading">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section muted>
        <div id="capabilities" className="scroll-mt-28">
          <SectionHeading
            center
            eyebrow="Key capabilities"
            title="Foresight Across Appointments, Beds and Flow"
            subtitle="Identify no-show risk, occupancy pressure and unusual operational changes before they disrupt care."
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PAGE.capabilities.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <div className="flex h-full flex-col rounded-card border bg-card p-6 shadow-soft">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-heading">{item.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          center
          eyebrow="How it works"
          title="Collect → Analyze → Predict → Prioritize → Act → Learn"
          subtitle={PAGE.howSummary}
          className="mb-12"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {PAGE.how.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.04}>
              <div className="h-full rounded-card border bg-card p-5 shadow-soft">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-teal text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-heading font-bold text-heading">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Use cases"
          title="Where Administrators Use Predictive Insights"
          subtitle="Administrators can use predictive insights for appointment management, admission planning, bed utilization, discharge coordination, staffing discussions and capacity planning."
          className="mb-10"
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PAGE.useCases.map((item) => (
            <span key={item} className="rounded-pill border bg-card px-4 py-2 text-sm font-semibold text-heading">
              {item}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-muted">
          {PAGE.benefits}
        </p>
      </Section>

      <CTABand
        title="Move From Operational Reporting to Operational Foresight"
        subtitle="Discover how connected data can help your hospital anticipate what may happen next. Explore Predictive Operations."
      />
    </>
  );
}
