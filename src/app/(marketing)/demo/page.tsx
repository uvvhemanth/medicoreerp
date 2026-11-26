import type { Metadata } from "next";
import { DemoBookingForm } from "@/components/marketing/demo-booking-form";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { WHATSAPP_URL } from "@/lib/content/contact";
import { CheckCircle2, Clock, ShieldCheck, Video, Calendar, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Demo Meeting",
  description: "Schedule a free 30-minute MedicoreERP demo meeting — pick a date and time that works for you.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            as="h1"
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
          <div className="mt-10 rounded-card border-l-4 border-teal bg-mist/40 p-6">
            <p className="font-heading text-lg font-bold text-heading">Prefer to talk right now?</p>
            <p className="mt-1 text-sm text-muted">Call or WhatsApp our team and we&apos;ll answer your questions directly.</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
              <a href="tel:+919966411913" data-track="demo-call" className="inline-flex items-center gap-2 rounded-control border bg-card px-4 py-2 text-heading hover:border-teal/40 hover:text-teal">
                <Phone className="h-4 w-4 text-teal" /> +91 99664 11913
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-track="demo-whatsapp" className="inline-flex items-center gap-2 rounded-control border bg-card px-4 py-2 text-heading hover:border-teal/40 hover:text-teal">
                <MessageCircle className="h-4 w-4 text-teal" /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
        <DemoBookingForm />
      </div>
    </Section>
  );
}
