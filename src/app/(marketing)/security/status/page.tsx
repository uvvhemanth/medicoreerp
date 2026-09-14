import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/marketing/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Activity, CheckCircle2, Globe, Code2, Users, Sparkles, Zap, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "MedicoreERP System Status & Service Availability" },
  description:
    "Check MedicoreERP platform availability, service performance, maintenance updates and operational status across key healthcare services.",
  keywords: [
    "MedicoreERP System Status",
    "hospital ERP system status",
    "healthcare software uptime",
    "MedicoreERP service availability",
    "healthcare platform status",
  ],
  alternates: { canonical: "/security/status" },
  openGraph: {
    title: "MedicoreERP System Status & Service Availability",
    description:
      "Check MedicoreERP platform availability, service performance, maintenance updates and operational status across key healthcare services.",
    url: "/security/status",
  },
};

const SERVICES = [
  { icon: Globe, name: "Web Application", status: "operational", uptime: "99.98%" },
  { icon: Code2, name: "API Services", status: "operational", uptime: "99.99%" },
  { icon: Users, name: "Patient Portal", status: "operational", uptime: "99.99%" },
  { icon: Sparkles, name: "AI Services", status: "operational", uptime: "99.95%" },
  { icon: Zap, name: "Real-Time Services", status: "operational", uptime: "99.97%" },
  { icon: Mail, name: "Email & SMS Services", status: "operational", uptime: "99.95%" },
];

const UPDATES = [
  { date: "2026-07-02", title: "AI service latency", detail: "AI responses were slower for about 40 minutes. Service was restored.", kind: "resolved" },
  { date: "2026-06-18", title: "Scheduled maintenance", detail: "A planned database upgrade completed with no customer-facing downtime.", kind: "maintenance" },
];

export default function StatusPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security" },
          { name: "System Status", path: "/security/status" },
        ])}
      />

      <section className="relative overflow-hidden border-b bg-aurora">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative z-10 py-14 text-center lg:py-16">
          <Reveal>
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal text-white shadow-soft">
              <Activity className="h-7 w-7" />
            </div>
            <Eyebrow>MedicoreERP System Status</Eyebrow>
            <h1 className="text-heading-display mx-auto mt-5 max-w-3xl">MedicoreERP System Status</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Stay updated on the availability and performance of MedicoreERP services.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="#current-status">
                  View Current Status <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/security">Data security</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div id="current-status" className="scroll-mt-28">
          <div className="mb-8 flex items-center gap-3 rounded-card border border-success/30 bg-success/[0.06] p-5">
            <CheckCircle2 className="h-7 w-7 shrink-0 text-success" />
            <div>
              <p className="font-heading text-lg font-bold text-heading">All listed services operational</p>
              <p className="text-sm text-muted">View maintenance updates, incidents and service restoration information from one place.</p>
            </div>
          </div>

          <SectionHeading
            eyebrow="Key services"
            title="Monitor key services including"
            subtitle="Check platform availability, service performance and operational status across key healthcare services."
            className="mb-8"
          />
          <div className="divide-y overflow-hidden rounded-card border bg-card shadow-soft">
            {SERVICES.map((service) => (
              <div key={service.name} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal/10 text-teal">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <span className="font-heading font-semibold text-heading">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden text-sm text-muted sm:inline">{service.uptime}</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Updates"
          title="Maintenance, incidents and restoration"
          subtitle="Stay informed about planned work and service restoration in one place."
          className="mb-8"
        />
        <div className="mx-auto max-w-3xl space-y-3">
          {UPDATES.map((update) => (
            <div key={update.date} className="rounded-card border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted">{update.date}</span>
                <span className="rounded-pill bg-success/12 px-2 py-0.5 text-xs font-semibold text-success">{update.kind}</span>
              </div>
              <p className="mt-1 font-heading font-bold text-heading">{update.title}</p>
              <p className="text-sm text-muted">{update.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABand
        title="View Current Status"
        subtitle="Check MedicoreERP platform availability, service performance, maintenance updates and operational status across key healthcare services."
        ctaLabel="View Current Status"
        ctaHref="#current-status"
      />
    </>
  );
}
