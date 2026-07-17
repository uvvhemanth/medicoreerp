import type { Metadata } from "next";
import Link from "next/link";
import { DashboardSuite } from "@/components/marketing/dashboard-suite";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { PATIENT_JOURNEY } from "@/lib/content/dashboard";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export const metadata: Metadata = {
  title: "HIS Dashboards — Modules, Ops, Clinical & Revenue",
  description:
    "Hospital management dashboards: module home, operations command center, clinical today, and revenue snapshot.",
  alternates: { canonical: "/dashboard" },
};

export default function DashboardPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="container-page relative py-14 lg:py-16">
          <Eyebrow>
            <LayoutDashboard className="h-3.5 w-3.5" /> Hospital dashboards
          </Eyebrow>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-heading sm:text-5xl">
            Four dashboards for your{" "}
            <span className="text-gradient-teal">hospital OS</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Switch between Module Home, Operations, Clinical Today, and Revenue — sample data for Pacific Medical Center.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/demo">
                Request a Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </section>

      <Section className="!pt-10">
        <Reveal>
          <DashboardSuite />
        </Reveal>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Blueprint"
          title="Overall patient journey"
          subtitle="Module Home tiles map to these 10 steps."
          className="mb-10"
        />
        <div className="mx-auto max-w-4xl overflow-hidden rounded-card border bg-card shadow-soft">
          <div className="grid grid-cols-[72px_1fr] border-b bg-mist/50 text-xs font-bold uppercase tracking-wide text-muted">
            <div className="border-r px-4 py-3">Step</div>
            <div className="px-4 py-3">Flow</div>
          </div>
          {PATIENT_JOURNEY.map((j) => (
            <div key={j.step} className="grid grid-cols-[72px_1fr] border-b last:border-b-0">
              <div className="border-r px-4 py-3 font-heading text-sm font-extrabold text-teal">{j.step}</div>
              <div className="px-4 py-3">
                <p className="font-heading text-sm font-bold text-heading">{j.title}</p>
                <p className="mt-0.5 text-sm text-muted">{j.flow}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* HIDDEN — uncomment to restore the demo CTA banner */}
      {/* <CTABand
        title="Want these dashboards live for your hospital?"
        subtitle="Book a 30-minute demo on sample data."
      /> */}
    </>
  );
}
