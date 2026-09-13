import type { Metadata } from "next";
import Link from "next/link";
import { CLINICAL_COPILOT_LANDING } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";

const PAGE = CLINICAL_COPILOT_LANDING;

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

export default function ClinicalCopilotPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI", path: "/ai" },
          { name: "Clinical Co-Pilot", path: PAGE.seo.canonical },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 lg:py-16">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>AI Clinical Co-Pilot</Eyebrow>
              <h1 className="text-heading-display mt-5">{PAGE.heroTitle}</h1>
              <p className="mt-3 text-xl font-semibold text-teal">{PAGE.heroSubtitle}</p>
              <div className="mt-4 space-y-3">
                {PAGE.overview.map((p) => (
                  <p key={p} className="text-subtitle">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-4 font-heading text-lg font-bold text-heading">{PAGE.punchline}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" variant="outline">
                  <Link href="#capabilities">Explore Clinical Co-Pilot</Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/demo">
                    Request a Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="mt-6 inline-flex items-center gap-1.5 text-base text-muted">
                <Star className="h-4 w-4 fill-warning text-warning" />
                An assistant for context — clinical judgment stays with the clinician
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Patient context</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-heading">
            Help clinicians make sense of growing patient data
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Patient information is often scattered across consultations, diagnostics, prescriptions, admissions and historical records.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Clinical Co-Pilot helps organize that information into meaningful context so clinicians can understand the patient's journey faster.
          </p>
        </div>
      </Section>

      <Section muted>
        <div id="capabilities" className="scroll-mt-28">
          <SectionHeading
            center
            eyebrow="Key capabilities"
            title="Chart-Aware Assistance in Everyday Care"
            subtitle="Summaries, medications, diagnostics and source-linked information stay in the clinician's workflow."
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
        <div id="how-it-works" className="scroll-mt-28">
          <SectionHeading
            center
            eyebrow="How it works"
            title="Connect Patient Data → Understand Context → Ask or Retrieve → Review Evidence → Take Clinical Action"
            subtitle={PAGE.howSummary}
            className="mb-12"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PAGE.how.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.05}>
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
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Patient journey"
          title="Designed Across the Patient Journey"
          subtitle="Use it during OPD consultation, inpatient rounds, follow-ups, discharge preparation and review of historical patient information."
          className="mb-10"
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PAGE.journey.map((step) => (
            <span key={step} className="rounded-pill border bg-card px-4 py-2 text-sm font-semibold text-heading">
              {step}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl rounded-card border bg-card p-8 shadow-soft sm:p-10">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-teal" />
            <div>
              <h2 className="font-heading text-2xl font-bold text-heading">Benefits</h2>
              <p className="mt-3 text-lg leading-relaxed text-body">{PAGE.benefits}</p>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Give Clinicians Faster Access to the Complete Patient Story"
        subtitle="Bring connected clinical intelligence directly into everyday care workflows. See Clinical Co-Pilot in Action."
      />
    </>
  );
}
