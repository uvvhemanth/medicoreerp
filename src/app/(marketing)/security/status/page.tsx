import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = { title: "System Status", description: "Live status and uptime history for MedicoreERP." };

const COMPONENTS = [
  { name: "API Gateway", status: "operational", uptime: "99.99%" },
  { name: "Web Application", status: "operational", uptime: "99.98%" },
  { name: "Patient Portal", status: "operational", uptime: "99.99%" },
  { name: "Realtime / WebSocket", status: "operational", uptime: "99.97%" },
  { name: "Ambient Scribe (AI)", status: "degraded", uptime: "99.82%" },
  { name: "Notifications (SMS/Email)", status: "operational", uptime: "99.95%" },
];

const HISTORY = [
  { date: "2026-07-02", title: "Elevated AI latency", detail: "Ambient scribe responses were slower for ~40 min. Resolved.", kind: "degraded" },
  { date: "2026-06-18", title: "Scheduled maintenance", detail: "Zero-downtime database upgrade completed.", kind: "operational" },
];

export default function StatusPage() {
  return (
    <Section>
      <div className="mb-8 flex items-center gap-3 rounded-card border border-success/30 bg-success/[0.06] p-5">
        <CheckCircle2 className="h-7 w-7 text-success" />
        <div>
          <p className="font-heading text-lg font-bold text-heading">Most systems operational</p>
          <p className="text-sm text-muted">Last checked just now · Synthetic monitoring on top user journeys.</p>
        </div>
      </div>

      <SectionHeading title="Components" className="mb-5" />
      <div className="divide-y overflow-hidden rounded-card border bg-card shadow-soft">
        {COMPONENTS.map((c) => (
          <div key={c.name} className="flex items-center justify-between px-5 py-4">
            <span className="font-semibold text-heading">{c.name}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted">{c.uptime}</span>
              <span className={`flex items-center gap-1.5 text-sm font-semibold ${c.status === "operational" ? "text-success" : "text-warning"}`}>
                {c.status === "operational" ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading title="Incident history" className="mb-5 mt-12" />
      <div className="space-y-3">
        {HISTORY.map((h) => (
          <div key={h.date} className="rounded-card border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted">{h.date}</span>
              <span className={`rounded-pill px-2 py-0.5 text-xs font-semibold ${h.kind === "operational" ? "bg-success/12 text-success" : "bg-warning/12 text-warning"}`}>{h.kind}</span>
            </div>
            <p className="mt-1 font-heading font-bold text-heading">{h.title}</p>
            <p className="text-sm text-muted">{h.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
