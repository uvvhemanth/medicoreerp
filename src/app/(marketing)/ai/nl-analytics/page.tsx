import type { Metadata } from "next";
import Link from "next/link";
import { NL_ANALYTICS_LANDING } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";

const PAGE = NL_ANALYTICS_LANDING;

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

export default function NlAnalyticsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI", path: "/ai" },
          { name: "NL Analytics", path: PAGE.seo.canonical },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 lg:py-16">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Natural Language Analytics Healthcare</Eyebrow>
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
                <Button asChild size="lg">
                  <Link href="#ask">
                    Ask Your Data <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#capabilities">See NL Analytics</Link>
                </Button>
              </div>
              <p className="mt-6 inline-flex items-center gap-1.5 text-base text-muted">
                <Star className="h-4 w-4 fill-warning text-warning" />
                Authorized users only — the same permissions as the rest of MedicoreERP
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div id="ask" className="scroll-mt-28">
          <SectionHeading
            center
            eyebrow="No reporting bottleneck"
            title="Hospital analytics without the reporting bottleneck"
            subtitle="Instead of requesting a new report every time, Natural Language Analytics helps authorized users explore available hospital information conversationally."
            className="mb-10"
          />
          <div className="mx-auto grid max-w-4xl gap-3">
            {PAGE.questions.map((q, i) => (
              <Reveal key={q} delay={i * 0.04}>
                <p className="rounded-card border bg-card px-5 py-4 font-heading text-lg font-semibold text-heading shadow-soft">
                  “{q}”
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section muted>
        <div id="capabilities" className="scroll-mt-28">
          <SectionHeading
            center
            eyebrow="Key capabilities"
            title="Ask, Summarize and Keep Investigating"
            subtitle="Explore operational, financial, clinical and inventory information in everyday business language."
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
          eyebrow="Example experience"
          title="Follow-up questions keep the context"
          subtitle={PAGE.exampleNote}
          className="mb-10"
        />
        <div className="mx-auto max-w-2xl space-y-3">
          {PAGE.example.map((turn, i) => (
            <Reveal key={`${turn.role}-${i}`} delay={i * 0.05}>
              <div className={`rounded-card border p-5 shadow-soft ${turn.role === "AI" ? "border-teal/30 bg-teal/[0.04]" : "bg-card"}`}>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal">{turn.role}</p>
                <p className="mt-2 text-body">{turn.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="From question to decision"
          title="Ask → Understand → Analyze → Visualize → Investigate → Act"
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

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-card border bg-card p-8 shadow-soft">
            <h2 className="font-heading text-2xl font-bold text-heading">Benefits</h2>
            <p className="mt-3 text-lg leading-relaxed text-body">{PAGE.benefits}</p>
          </div>
          <div className="rounded-card border-2 border-teal/25 bg-teal/[0.04] p-8 shadow-soft">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-teal" />
              <div>
                <h2 className="font-heading text-2xl font-bold text-heading">Governance Matters</h2>
                <p className="mt-3 text-lg leading-relaxed text-body">{PAGE.governance}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Your Hospital Has the Data. Start Having Conversations With It."
        subtitle="Turn connected healthcare information into answers that teams can understand and use. See Natural Language Analytics in Action."
      />
    </>
  );
}
