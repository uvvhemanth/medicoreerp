import type { Metadata } from "next";
import { Section, SectionHeading, CTABand } from "@/components/marketing/blocks";
import { Download, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Press", description: "Press releases, media kit, and coverage." };

const RELEASES = [
  { date: "2026-06-20", title: "MedicoreERP surpasses 400 care teams across three regions" },
  { date: "2026-04-11", title: "Ambient scribe cuts documentation time by 62% in multi-site study" },
  { date: "2026-02-02", title: "MedicoreERP raises Series A to scale AI-native hospital operating system" },
];

export default function PressPage() {
  return (
    <>
      <Section>
        <SectionHeading center eyebrow="Press" title="Newsroom" className="mb-12" />
        <div className="mx-auto max-w-3xl space-y-3">
          {RELEASES.map((r) => (
            <a key={r.date} href="#" className="group flex items-center justify-between gap-4 rounded-card border bg-card p-5 shadow-soft hover:border-teal/40">
              <div>
                <p className="text-xs font-bold text-muted">{r.date}</p>
                <p className="mt-0.5 font-heading font-bold text-heading group-hover:text-teal">{r.title}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted group-hover:text-teal" />
            </a>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl justify-center">
          <button className="flex items-center gap-2 rounded-card border bg-card px-5 py-3 text-sm font-semibold text-heading shadow-soft hover:border-teal/40">
            <Download className="h-4 w-4 text-teal" /> Download media kit (logos, brand, screenshots)
          </button>
        </div>
      </Section>
      <CTABand title="Media inquiry?" subtitle="Reach our press team at press@medicoreerp.com." />
    </>
  );
}
