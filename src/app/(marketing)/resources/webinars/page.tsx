import type { Metadata } from "next";
import Link from "next/link";
import { WEBINARS } from "@/lib/content/marketing";
import { Section, SectionHeading, CTABand, Reveal } from "@/components/marketing/blocks";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Webinars",
  description: "Live sessions and replays on ambient AI, FHIR interoperability, and hospital ERP ROI.",
  alternates: { canonical: "/resources/webinars" },
};

export default function WebinarsIndex() {
  return (
    <>
      <Section>
        <SectionHeading
          center
          eyebrow="Resources"
          title="Webinars"
          subtitle="Practical sessions for clinical, finance, and technology leaders."
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {WEBINARS.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.05}>
              <Link href={`/resources/webinars/${w.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border bg-card shadow-soft transition hover:shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.image} alt="" className="aspect-[16/9] w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <Badge tone={w.status === "upcoming" ? "teal" : "neutral"}>
                    {w.status === "upcoming" ? "Upcoming" : "Replay"}
                  </Badge>
                  <h3 className="mt-3 font-heading text-xl font-bold text-heading">{w.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{w.excerpt}</p>
                  <p className="mt-3 text-sm text-muted">{formatDate(w.date)} · {w.speakers.join(", ")}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                    {w.status === "upcoming" ? "Register" : "Watch replay"} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
