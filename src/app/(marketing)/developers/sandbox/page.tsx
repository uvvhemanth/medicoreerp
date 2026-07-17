import type { Metadata } from "next";
import { LeadForm } from "@/components/marketing/lead-form";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = { title: "Sandbox", description: "Provision a sandbox tenant with sample data." };

export default function SandboxPage() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Sandbox" title="Provision a sandbox tenant" subtitle="A sandbox environment pre-loaded with sample patients, encounters, and claims — call the API in minutes." />
          <ul className="mt-6 space-y-3">
            {["Full FHIR R4 + REST access", "SMART-on-FHIR app registration", "Webhooks & event streams", "SDKs for JS, Python, and Go", "No credit card required"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-body"><CheckCircle2 className="h-5 w-5 text-success" /> {f}</li>
            ))}
          </ul>
        </div>
        <LeadForm variant="sandbox" />
      </div>
    </Section>
  );
}
