import type { Metadata } from "next";
import Link from "next/link";
import { JOBS } from "@/lib/content/company";
import { Section, SectionHeading, CTABand } from "@/components/marketing/blocks";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Careers", description: "Join MedicoreERP — engineering, design, clinical, and success roles." };

export default function CareersPage() {
  return (
    <>
      <Section>
        <SectionHeading center eyebrow="Careers" title="Build the future of healthcare" subtitle="A small, senior team shipping software that clinicians love. Remote-friendly across India, MENA & SEA." className="mb-12" />
        <div className="mx-auto max-w-3xl divide-y overflow-hidden rounded-card border bg-card shadow-soft">
          {JOBS.map((j) => (
            <Link key={j.slug} href={`/company/careers/${j.slug}`} className="group flex items-center justify-between gap-4 px-6 py-5 hover:bg-mist/40">
              <div>
                <h3 className="font-heading font-bold text-heading group-hover:text-teal">{j.title}</h3>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {j.dept}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {j.location}</span>
                  <span>{j.type}</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-teal" />
            </Link>
          ))}
        </div>
      </Section>
      <CTABand title="Don't see your role?" subtitle="We're always keen to meet exceptional people. Reach out anytime." />
    </>
  );
}
