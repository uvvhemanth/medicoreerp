import type { Metadata } from "next";
import { CHANGELOG } from "@/lib/content/marketing";
import { Section, SectionHeading, CTABand } from "@/components/marketing/blocks";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Product release notes across clinical, revenue cycle, and platform modules.",
  alternates: { canonical: "/resources/changelog" },
};

export default function ChangelogPage() {
  return (
    <>
      <Section>
        <SectionHeading
          center
          eyebrow="Resources"
          title="Changelog"
          subtitle="What shipped recently across the MedicoreERP platform."
          className="mb-12"
        />
        <div className="mx-auto max-w-3xl space-y-6">
          {CHANGELOG.map((entry) => (
            <article key={`${entry.version}-${entry.title}`} className="rounded-card border bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="teal">{entry.version}</Badge>
                <Badge tone="neutral">{entry.area}</Badge>
                <span className="text-sm text-muted">{formatDate(entry.date)}</span>
              </div>
              <h2 className="mt-3 font-heading text-xl font-bold text-heading">{entry.title}</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-body">
                {entry.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
