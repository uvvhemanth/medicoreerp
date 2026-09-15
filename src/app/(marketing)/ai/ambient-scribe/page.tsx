import type { Metadata } from "next";
import Link from "next/link";
import { AMBIENT_SCRIBE_LANDING } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";

const PAGE = AMBIENT_SCRIBE_LANDING;

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

export default function AmbientScribePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI", path: "/ai" },
          { name: "Ambient Scribe", path: PAGE.seo.canonical },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 lg:py-16">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>AI Ambient Scribe</Eyebrow>
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
                <Button asChild size="lg">
                  <Link href="/demo">
                    Book a Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>
              <p className="mt-6 inline-flex items-center gap-1.5 text-base text-muted">
                <Star className="h-4 w-4 fill-warning text-warning" />
                Clinician review and approval before anything is saved to the record
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Clinical documentation</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-heading">
              Clinical documentation that works in the background
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Doctors should spend consultations understanding patients—not switching between screens and typing notes.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Ambient Scribe helps capture important information from the consultation and organizes it into structured documentation.
            </p>
            <p className="mt-4 text-body">
              The clinician remains in control and reviews the generated content before it becomes part of the medical record.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {PAGE.documentationItems.map((item) => (
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
        <SectionHeading
          center
          eyebrow="Key capabilities"
          title="What Ambient Scribe Does in Every Consult"
          subtitle="Capture, structure and connect documentation — with the clinician always in control."
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
      </Section>

      <Section>
        <div id="how-it-works" className="scroll-mt-28">
          <SectionHeading
            center
            eyebrow="How it works"
            title="Listen → Understand → Structure → Review → Save"
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
        title="Spend More Time With Patients, Not Paperwork"
        subtitle="See how AI-assisted clinical documentation can simplify everyday consultations."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
