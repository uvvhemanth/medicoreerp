import type { Metadata } from "next";
import { DemoBookingForm } from "@/components/marketing/demo-booking-form";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { TESTIMONIALS } from "@/lib/content/marketing";
import { CheckCircle2, Clock, ShieldCheck, Video, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Demo Meeting",
  description: "Schedule a free 30-minute MedicoreERP demo meeting — pick a date and time that works for you.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  const t = TESTIMONIALS[0];
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Book a Demo Meeting"
            title="Pick a slot. See MedicoreERP live."
            subtitle="A focused 30-minute video walkthrough tailored to your edition and workflows — free, no obligation."
          />
          <ul className="mt-8 space-y-4">
            {[
              [Calendar, "Choose date & time that fits your calendar"],
              [Video, "Join by video link — no install required"],
              [ShieldCheck, "Tailored to your specialty & hospital size"],
              [Clock, "Focused 30-minute walkthrough"],
              [CheckCircle2, "Our team confirms your selected time by email"],
            ].map(([Icon, text], i) => (
              <li key={i} className="flex items-center gap-3">
                <Icon className="h-6 w-6 shrink-0 text-teal" />
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
        <DemoBookingForm />
      </div>
    </Section>
  );
}
