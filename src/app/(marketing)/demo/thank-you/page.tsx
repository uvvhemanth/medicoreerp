import type { Metadata } from "next";
import { FormThankYouCard } from "@/components/marketing/form-thank-you-card";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { TESTIMONIALS } from "@/lib/content/marketing";
import { Calendar, CheckCircle2, Clock, ShieldCheck, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Demo request received",
  description: "Your MedicoreERP demo request was sent. Our team will confirm your selected time by email.",
  robots: { index: false, follow: false },
};

export default async function DemoThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ when?: string; ref?: string }>;
}) {
  const { when, ref } = await searchParams;
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
              <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
              {t.name}, {t.role} · {t.org}
            </figcaption>
          </figure>
        </div>
        <FormThankYouCard
          title="Demo request received"
          body="We sent your request to info@medicoreerp.com. Our team will confirm your selected time by email."
          when={when}
          leadId={ref}
          primaryHref="/"
          primaryLabel="Back to home"
          secondaryHref="/contact"
          secondaryLabel="Contact us"
        />
      </div>
    </Section>
  );
}
