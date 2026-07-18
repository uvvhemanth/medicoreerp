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
              { icon: Mail, label: "Official email", value: "info@medicoreerp.com", href: "mailto:info@medicoreerp.com" },
              { icon: Phone, label: "Phone", value: "+91 99664 11913", href: "tel:+919966411913" },
              { icon: MapPin, label: "Service region", value: "India · MENA · SEA" },
              { icon: MessageSquare, label: "Enquiries", value: "Demo, sales, support and partnerships" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 rounded-card border bg-card p-4 shadow-soft">
                <Icon className="h-5 w-5 text-teal" />
                <div>
                  <p className="text-xs font-semibold text-muted">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-heading hover:text-teal hover:underline">
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold text-heading">{value}</p>
                  )}
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
