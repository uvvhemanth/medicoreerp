import type { Metadata } from "next";
import { LeadForm } from "@/components/marketing/lead-form";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with the MedicoreERP team." };

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's talk" subtitle="Sales, support, partnerships, or press — we'll route you to the right person." />
          <div className="mt-8 space-y-4">
            {[
              [Mail, "Email", "hello@medicoreerp.com"],
              [Phone, "Phone", "+91 80 4567 8900"],
              [MapPin, "Office", "Bengaluru · Dubai · Singapore"],
              [MessageSquare, "Sales chat", "Available 9am–9pm IST"],
            ].map(([Icon, label, value], i) => (
              <div key={i} className="flex items-center gap-4 rounded-card border bg-card p-4 shadow-soft">
                <Icon className="h-5 w-5 text-teal" />
                <div>
                  <p className="text-xs font-semibold text-muted">{label as string}</p>
                  <p className="font-semibold text-heading">{value as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <LeadForm variant="contact" />
      </div>
    </Section>
  );
}
