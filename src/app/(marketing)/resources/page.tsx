import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, CTABand, Reveal } from "@/components/marketing/blocks";
import {
  BookOpen, Users, GitCompare, Code2, ArrowRight,
  GraduationCap, Mic2, BookMarked, ScrollText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description: "Blog, guides, webinars, glossary, comparisons, docs, and changelog for MedicoreERP.",
  alternates: { canonical: "/resources" },
};

const TILES = [
  { icon: BookOpen, title: "Blog", desc: "Ideas on AI, RCM, and interoperability.", href: "/resources/blog" },
  { icon: GraduationCap, title: "Guides", desc: "Migration, denials, and compliance playbooks.", href: "/resources/guides" },
  { icon: Mic2, title: "Webinars", desc: "Live sessions and on-demand replays.", href: "/resources/webinars" },
  { icon: BookMarked, title: "Glossary", desc: "FHIR, ABDM, RCM, HIS — plain definitions.", href: "/resources/glossary" },
  { icon: ScrollText, title: "Changelog", desc: "What shipped across clinical and RCM.", href: "/resources/changelog" },
  { icon: Users, title: "Customers", desc: "Real outcomes from real care teams.", href: "/customers" },
  { icon: GitCompare, title: "Comparisons", desc: "Honest teardowns vs the incumbents.", href: "/compare/vs-epic" },
  { icon: Code2, title: "Developers", desc: "API docs, FHIR reference, marketplace.", href: "/developers" },
];

export default function ResourcesHub() {
  return (
    <>
      <Section>
        <SectionHeading center eyebrow="Resources" title="Learn, compare, and build" className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <Link href={t.href} className="group flex h-full items-start gap-4 rounded-card border bg-card p-6 shadow-soft transition hover:shadow-card">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist text-teal"><t.icon className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-heading font-bold text-heading">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted">{t.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal">Open <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
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
