import type { Metadata } from "next";
import { LeadForm } from "@/components/marketing/lead-form";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { TESTIMONIALS } from "@/lib/content/marketing";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Book a Demo", description: "See Aether Health OS run your hospital in a 30-minute personalized demo." };

export default function DemoPage() {
  const t = TESTIMONIALS[0];
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Book a Demo" title="See it run your hospital" subtitle="A focused 30-minute walkthrough tailored to your edition and workflows." />
          <ul className="mt-8 space-y-4">
            {[
              [ShieldCheck, "Tailored to your specialty & size"],
              [Clock, "30 minutes, no obligation"],
              [CheckCircle2, "Live product on sample data"],
            ].map(([Icon, text], i) => (
              <li key={i} className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-teal" />
                <span className="text-body">{text as string}</span>
              </li>
            ))}
          </ul>
          <figure className="mt-10 rounded-card border-l-4 border-teal bg-mist/40 p-6">
            <blockquote className="font-heading text-lg font-bold text-heading">“{t.quote}”</blockquote>
            <figcaption className="mt-2 flex items-center gap-3 text-sm text-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
              {t.name}, {t.role} · {t.org}
            </figcaption>
          </figure>
        </div>
        <LeadForm variant="demo" />
      </div>
    </Section>
  );
}
