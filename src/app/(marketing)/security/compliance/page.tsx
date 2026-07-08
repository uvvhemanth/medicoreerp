import type { Metadata } from "next";
import { Section, SectionHeading, CTABand } from "@/components/marketing/blocks";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = { title: "Compliance", description: "HIPAA, GDPR, ABDM, SOC 2, ISO 27001 and NABH compliance details." };

const FRAMEWORKS = [
  { name: "HIPAA", scope: "US health data privacy & security", status: "Compliant", items: ["BAA available", "Encryption & access controls", "Audit logging", "Breach notification process"] },
  { name: "GDPR", scope: "EU data protection", status: "Compliant", items: ["DPA available", "Data subject request (DSR) tooling", "Consent ledger", "Right to erasure & portability"] },
  { name: "ABDM", scope: "India — Ayushman Bharat Digital Mission", status: "Ready", items: ["ABHA linkage", "Health facility registry", "Consent manager integration", "FHIR-based data exchange"] },
  { name: "SOC 2 Type II", scope: "Security, availability, confidentiality", status: "Certified", items: ["Annual independent audit", "Continuous monitoring", "Vendor risk management"] },
  { name: "ISO 27001", scope: "Information security management", status: "Certified", items: ["ISMS in place", "Risk assessments", "Documented controls"] },
  { name: "NABH", scope: "India hospital accreditation support", status: "Supported", items: ["Auto-collected accreditation evidence", "Real-time quality dashboards", "Incident & CAPA tracking"] },
];

export default function CompliancePage() {
  return (
    <>
      <Section>
        <SectionHeading center eyebrow="Compliance" title="Certified, audited, and regionally ready" subtitle="Compliance is rendered as a trust feature — not a PDF you never see." className="mb-14" />
        <div className="grid gap-5 lg:grid-cols-2">
          {FRAMEWORKS.map((f) => (
            <div key={f.name} className="rounded-card border bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-bold text-heading">{f.name}</h3>
                <span className="rounded-pill bg-success/12 px-3 py-1 text-xs font-bold text-success">{f.status}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{f.scope}</p>
              <ul className="mt-4 space-y-2">
                {f.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-body">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <CTABand title="Need our compliance package?" subtitle="Request DPA, BAA, SOC 2 report, and pen-test summaries for your security review." />
    </>
  );
}
