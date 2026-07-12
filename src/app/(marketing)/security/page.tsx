import type { Metadata } from "next";
import Link from "next/link";
import { COMPLIANCE_BADGES } from "@/lib/content/marketing";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand, Eyebrow, Reveal } from "@/components/marketing/blocks";
import { ShieldCheck, Lock, Eye, Server, FileText, Activity, Download, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Trust Center — security & compliance",
  description: "How MedicoreERP protects PHI: encryption, RBAC/ABAC, audit, data residency, and certifications (HIPAA, GDPR, ABDM, SOC 2, ISO 27001).",
};

const POSTURE = [
  { icon: Lock, title: "Encryption everywhere", desc: "AES-256 at rest, TLS 1.3 in transit, field-level encryption for the most sensitive PHI." },
  { icon: Eye, title: "RBAC + ABAC", desc: "Role, department, branch, and care-relationship checks. Minimum-necessary access by default." },
  { icon: FileText, title: "Immutable audit", desc: "Every login, view, change, export, and print is logged and tamper-evident." },
  { icon: Server, title: "Data residency", desc: "Region-pinned deployments. Your data stays where regulation requires." },
];

export default function SecurityPage() {
  return (
    <>
      <section className="border-b bg-gradient-to-b from-mist/40 to-transparent">
        <div className="container-page py-16 text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-teal text-white shadow-soft"><ShieldCheck className="h-7 w-7" /></div>
          <Eyebrow>Trust Center</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight text-heading sm:text-5xl">
            Security is a feature, not a checkbox.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            The browser is an attack surface handling PHI. We treat it that way — hardened, audited, and permission-aware end to end.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline"><Link href="/security/compliance">Compliance details</Link></Button>
            <Button asChild variant="outline"><Link href="/security/status">System status</Link></Button>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading center title="Our security posture" className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2">
          {POSTURE.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="flex gap-4 rounded-card border bg-card p-6 shadow-soft">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist text-teal"><p.icon className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-heading font-bold text-heading">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading center title="Certifications & compliance" className="mb-10" />
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {COMPLIANCE_BADGES.map((b) => (
            <span key={b} className="flex items-center gap-2 rounded-card border bg-card px-5 py-3 font-heading font-bold text-heading shadow-soft">
              <ShieldCheck className="h-4 w-4 text-teal" /> {b}
            </span>
          ))}
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {["DPA (PDF)", "BAA (PDF)", "Sub-processors list"].map((doc) => (
            <button key={doc} className="flex items-center justify-between rounded-card border bg-card px-4 py-3 text-sm font-semibold text-heading shadow-soft hover:border-teal/40">
              {doc} <Download className="h-4 w-4 text-teal" />
            </button>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center justify-between gap-4 rounded-card border bg-card p-6 shadow-soft sm:flex-row">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-success" />
            <div>
              <p className="font-heading font-bold text-heading">All systems operational</p>
              <p className="text-sm text-muted">99.98% uptime over the last 90 days.</p>
            </div>
          </div>
          <Button asChild variant="outline"><Link href="/security/status">View live status <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </Section>

      <CTABand title="Have a security question?" subtitle="Our team responds to responsible-disclosure reports and buyer security reviews fast." />
    </>
  );
}
