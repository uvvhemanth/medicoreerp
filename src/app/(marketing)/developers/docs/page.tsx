import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/blocks";

export const metadata: Metadata = { title: "API Docs", description: "REST and FHIR R4 reference." };

const ENDPOINTS = [
  { m: "GET", path: "/fhir/r4/Patient", desc: "Search patients (SMART scopes)" },
  { m: "POST", path: "/v1/appointments", desc: "Book an appointment" },
  { m: "GET", path: "/v1/encounters/{id}", desc: "Fetch an encounter" },
  { m: "POST", path: "/v1/claims/{id}/submit", desc: "Submit a claim (X12)" },
  { m: "GET", path: "/fhir/r4/Observation", desc: "Lab results & vitals" },
];

const mColor: Record<string, string> = { GET: "text-success bg-success/12", POST: "text-clinical bg-clinical/12" };

export default function DocsPage() {
  return (
    <Section>
      <SectionHeading eyebrow="Developers" title="API Reference" subtitle="A quick tour. Full interactive OpenAPI explorer available in the sandbox." className="mb-10" />
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 text-sm">
            {["Quickstart", "Authentication", "Patients", "Appointments", "Claims", "Webhooks", "Errors"].map((s) => (
              <a key={s} href="#" className="block rounded-lg px-3 py-2 font-medium text-muted hover:bg-mist/60 hover:text-teal">{s}</a>
            ))}
          </nav>
        </aside>
        <div>
          <h2 className="font-heading text-2xl font-bold text-heading">Quickstart</h2>
          <p className="mt-2 text-body">Authenticate with OAuth2 (Authorization Code + PKCE), then call any resource. All endpoints are versioned and backward-compatible.</p>
          <div className="mt-6 overflow-hidden rounded-card border bg-card shadow-soft">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b bg-mist/40"><th className="px-4 py-3 font-bold text-heading">Method</th><th className="px-4 py-3 font-bold text-heading">Endpoint</th><th className="px-4 py-3 font-bold text-heading">Description</th></tr></thead>
              <tbody className="divide-y">
                {ENDPOINTS.map((e) => (
                  <tr key={e.path}>
                    <td className="px-4 py-3"><span className={`rounded-md px-2 py-0.5 font-mono text-xs font-bold ${mColor[e.m]}`}>{e.m}</span></td>
                    <td className="px-4 py-3 font-mono text-xs text-heading">{e.path}</td>
                    <td className="px-4 py-3 text-muted">{e.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-card border bg-ink p-5 font-mono text-sm text-white/80">
            <pre className="overflow-x-auto"><code>{`curl https://api.aether.health/fhir/r4/Patient \\
  -H "Authorization: Bearer $TOKEN"`}</code></pre>
          </div>
        </div>
      </div>
    </Section>
  );
}
