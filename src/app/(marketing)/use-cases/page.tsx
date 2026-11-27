import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, CTABand } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd, DEFAULT_OG_IMAGES } from "@/lib/seo";
import { USE_CASES } from "@/lib/content/use-cases";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Use Cases: Hospitals, Clinics & Labs",
  description:
    "Example workflows showing how hospitals, clinics, nursing homes and diagnostic labs in India run on MedicoreERP, from registration to billing.",
  alternates: { canonical: "/use-cases" },
  openGraph: { images: DEFAULT_OG_IMAGES, url: "/use-cases" },
};

export default function UseCasesHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Use cases", path: "/use-cases" },
        ])}
      />
      <Section>
        <SectionHeading
          as="h1"
          center
          eyebrow="Use cases"
          title="How healthcare teams run on MedicoreERP"
          subtitle="Example workflows for common hospital, clinic and lab setups. Each one shows the day-to-day steps, the modules involved and a typical rollout plan."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {USE_CASES.map((u) => (
            <Link
              key={u.slug}
              href={`/use-cases/${u.slug}`}
              className="group flex h-full flex-col rounded-card border bg-card p-6 shadow-soft transition hover:border-teal"
            >
              <h2 className="font-heading text-lg font-bold text-heading">{u.cardTitle}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{u.cardSummary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-clinical group-hover:underline">
                See the workflow <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CTABand title="Want to see your own workflow?" subtitle="Book a demo and the team will walk through MedicoreERP using your departments and billing rules." />
    </>
  );
}
