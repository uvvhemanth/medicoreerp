"use client";

import { use, useEffect, useState } from "react";
import { useQuery } from "@/hooks/use-query";
import { api } from "@/lib/data/adapter";
import { useApp } from "@/components/app/app-context";
import { useToast } from "@/components/ui/toast";
import { PageHeader } from "@/components/app/page-header";
import { DataState } from "@/components/app/data-state";
import { Tabs, TabsList, TabTrigger, TabContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusChip, Badge } from "@/components/ui/badge";
import { SeverityBanner } from "@/components/ui/banner";
import { Drawer } from "@/components/ui/dialog";
import { Avatar, Spinner } from "@/components/ui/misc";
import { VitalsChart } from "@/components/app/charts";
import { timeline as mockTimeline } from "@/lib/mock/data";
import { formatDate } from "@/lib/utils";
import {
  AlertTriangle, History, Pill, FlaskConical, FileText, Activity,
  Stethoscope, ShieldCheck, Plus, Signature, Sparkles,
} from "lucide-react";

const problems = [
  { code: "I20.9", name: "Angina pectoris", status: "active", onset: "2026-07-05" },
  { code: "I10", name: "Essential hypertension", status: "active", onset: "2022-03-11" },
  { code: "E11.9", name: "Type 2 diabetes mellitus", status: "active", onset: "2021-08-02" },
];
const meds = [
  { name: "Aspirin 75mg", dose: "1-0-0", since: "2026-07-05", interaction: false },
  { name: "Atorvastatin 20mg", dose: "0-0-1", since: "2026-07-05", interaction: false },
  { name: "Metformin 850mg", dose: "1-0-1", since: "2021-08-02", interaction: false },
  { name: "Warfarin 5mg", dose: "0-0-1", since: "2026-07-06", interaction: true },
];

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  admit: Activity, lab: FlaskConical, imaging: Activity, rx: Pill, note: FileText, discharge: Activity, visit: Stethoscope,
};

export default function PatientChartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { pinPatient, pinned } = useApp();
  const toast = useToast();
  const [audit, setAudit] = useState(false);
  const { data: patient, isLoading, isError, error, refetch } = useQuery(`patient-${id}`, () => api.patient(id), [id]);
  const vitals = useQuery("vitals", () => api.vitals());

  useEffect(() => {
    if (patient && (!pinned || pinned.id !== patient.id)) {
      pinPatient({ id: patient.id, uhid: patient.uhid, name: patient.name, age: patient.age, sex: patient.sex, allergies: patient.allergies, encounter: "IPD-88", bed: "GEN-A-4", attending: "A. Menon" });
    }
  }, [patient, pinned, pinPatient]);

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center"><div className="flex flex-col items-center gap-3"><Spinner className="h-7 w-7" /><p className="text-sm text-muted">Loading chart…</p></div></div>;
  }
  if (isError || !patient) {
    return (
      <DataState data={undefined} isLoading={false} isError onRetry={refetch} error={error}>
        {() => null}
      </DataState>
    );
  }

  return (
    <>
      <PageHeader
        title={patient.name}
        breadcrumbs={[{ label: "Patients", href: "/app/patients" }, { label: patient.name }]}
        subtitle={`${patient.age}${patient.sex} · ${patient.uhid} · ${patient.bloodGroup}`}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setAudit(true)}><History className="h-4 w-4" /> Audit</Button>
            <Button size="sm" onClick={() => toast.success("Note signed & saved", { label: "Undo", onClick: () => toast.info("Reverted") })}><Signature className="h-4 w-4" /> Sign note</Button>
          </>
        }
      />

      <div className="space-y-5 p-4 sm:p-6">
        {/* Safety banners (CDSS) */}
        {patient.allergies.length > 0 && (
          <SeverityBanner severity="critical" title={`Allergies: ${patient.allergies.join(", ")}`} evidence="Allergy list · verified 2026-07-05">
            Verify all new orders against documented allergies.
          </SeverityBanner>
        )}
        {meds.some((m) => m.interaction) && (
          <SeverityBanner severity="warning" title="Drug interaction: Warfarin + Aspirin" evidence="Micromedex · major severity">
            Increased bleeding risk. Consider dose adjustment or monitoring INR.
          </SeverityBanner>
        )}

        <Tabs defaultValue="timeline">
          <TabsList>
            <TabTrigger value="timeline">Timeline</TabTrigger>
            <TabTrigger value="problems">Problems</TabTrigger>
            <TabTrigger value="meds">Medications</TabTrigger>
            <TabTrigger value="results">Results & Vitals</TabTrigger>
            <TabTrigger value="notes">Notes</TabTrigger>
          </TabsList>

          <TabContent value="timeline">
            <div className="grid gap-5 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Encounter timeline</CardTitle></CardHeader>
                <CardBody>
                  <ol className="relative space-y-5 border-l-2 border-[var(--border)] pl-6">
                    {mockTimeline.map((e) => {
                      const Icon = typeIcon[e.type] ?? FileText;
                      return (
                        <li key={e.id} className="relative">
                          <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-mist text-teal"><Icon className="h-3 w-3" /></span>
                          <p className="text-sm font-semibold text-heading">{e.title}</p>
                          <p className="text-xs text-muted">{e.detail}</p>
                          <p className="mt-0.5 text-[11px] text-muted">{e.date} · {e.by}</p>
                        </li>
                      );
                    })}
                  </ol>
                </CardBody>
              </Card>
              <div className="space-y-5">
                <Card className="border-teal/25 bg-teal/[0.03]">
                  <CardBody className="pt-5">
                    <div className="flex items-center gap-2 text-teal"><Sparkles className="h-5 w-5" /><p className="font-heading font-bold">AI summary</p></div>
                    <p className="mt-2 text-sm text-body">{patient.name} is a {patient.age}{patient.sex} admitted for chest pain, ruling out ACS. Vitals stable, on antiplatelet + statin. No new critical results.</p>
                    <p className="mt-2 text-[11px] text-muted">Advisory · cited from chart</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Key facts</CardTitle></CardHeader>
                  <CardBody className="space-y-2 text-sm">
                    {[["Encounter", "IPD-88"], ["Bed", "GEN-A-4"], ["Attending", "Dr. A. Menon"], ["LOS", "2 days"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between"><span className="text-muted">{k}</span><span className="font-medium text-heading">{v}</span></div>
                    ))}
                  </CardBody>
                </Card>
              </div>
            </div>
          </TabContent>

          <TabContent value="problems">
            <Card>
              <CardHeader>
                <CardTitle>Problem list</CardTitle>
                <Button size="sm" variant="outline" onClick={() => toast.info("Add problem (demo)")}><Plus className="h-4 w-4" /> Add</Button>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y">
                  {problems.map((p) => (
                    <div key={p.code} className="flex items-center justify-between px-5 py-3">
                      <div>
                        <p className="text-sm font-semibold text-heading">{p.name}</p>
                        <p className="text-xs text-muted">Onset {formatDate(p.onset)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge tone="neutral">{p.code}</Badge>
                        <StatusChip status="active">{p.status}</StatusChip>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </TabContent>

          <TabContent value="meds">
            <Card>
              <CardHeader><CardTitle>Active medications</CardTitle><Button size="sm" onClick={() => toast.info("e-Prescribe (demo)")}><Plus className="h-4 w-4" /> Prescribe</Button></CardHeader>
              <CardBody className="p-0">
                <div className="divide-y">
                  {meds.map((m) => (
                    <div key={m.name} className="flex items-center justify-between px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-teal" />
                        <div>
                          <p className="text-sm font-semibold text-heading">{m.name}</p>
                          <p className="text-xs text-muted">{m.dose} · since {formatDate(m.since)}</p>
                        </div>
                      </div>
                      {m.interaction ? <StatusChip status="warning">Interaction</StatusChip> : <StatusChip status="active">Active</StatusChip>}
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </TabContent>

          <TabContent value="results">
            <div className="grid gap-5 lg:grid-cols-2">
              <Card>
                <CardHeader><CardTitle>Vitals (24h)</CardTitle><ShieldCheck className="h-4 w-4 text-success" /></CardHeader>
                <CardBody>
                  <DataState {...vitals} onRetry={vitals.refetch}>
                    {(d) => <VitalsChart data={d} />}
                  </DataState>
                </CardBody>
              </Card>
              <Card>
                <CardHeader><CardTitle>Recent labs</CardTitle></CardHeader>
                <CardBody className="p-0">
                  <div className="divide-y">
                    {[["Troponin I", "0.9 ng/mL", "high"], ["Potassium", "6.8 mmol/L", "critical"], ["Creatinine", "1.1 mg/dL", "normal"], ["HbA1c", "7.8 %", "high"]].map(([name, val, flag]) => (
                      <div key={name} className="flex items-center justify-between px-5 py-3">
                        <span className="text-sm font-medium text-heading">{name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-body">{val}</span>
                          <StatusChip status={flag === "critical" ? "critical" : flag === "high" ? "warning" : "done"} dot={false}>{flag}</StatusChip>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </TabContent>

          <TabContent value="notes">
            <Card>
              <CardHeader><CardTitle>SOAP Note</CardTitle><Badge tone="amber">Draft · autosaving</Badge></CardHeader>
              <CardBody className="space-y-3">
                {[["Subjective", "Chest tightness ×2 days, exertional. No fever."], ["Objective", "BP 148/92, HR 78, afebrile. ECG: ST changes."], ["Assessment", "Angina, r/o ACS (I20.9)."], ["Plan", "Serial troponin, aspirin, atorvastatin, cardiology consult."]].map(([label, text]) => (
                  <div key={label}>
                    <label className="text-xs font-bold uppercase text-muted">{label}</label>
                    <textarea defaultValue={text} className="mt-1 w-full rounded-control border bg-surface px-3 py-2 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" rows={2} />
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-lg border-2 border-teal/25 bg-teal/[0.04] p-3">
                  <p className="flex items-center gap-2 text-sm text-teal"><Sparkles className="h-4 w-4" /> Ambient scribe drafted this from your consult.</p>
                  <Button size="sm" onClick={() => toast.success("Note signed", { label: "Undo", onClick: () => {} })}><Signature className="h-4 w-4" /> Review & sign</Button>
                </div>
              </CardBody>
            </Card>
          </TabContent>
        </Tabs>
      </div>

      <Drawer open={audit} onClose={() => setAudit(false)} title="Audit trail">
        <ol className="space-y-3">
          {[
            ["Note signed", "Dr. A. Menon", "2026-07-06 08:15"],
            ["Warfarin prescribed", "Dr. A. Menon", "2026-07-06 08:10"],
            ["Chart viewed", "Nurse P. Nair", "2026-07-06 07:50"],
            ["Admitted", "Dr. S. Kulkarni", "2026-07-05 09:12"],
          ].map(([action, who, when], i) => (
            <li key={i} className="flex gap-3 rounded-lg border bg-surface/50 p-3">
              <Avatar name={who} size={30} />
              <div>
                <p className="text-sm font-semibold text-heading">{action}</p>
                <p className="text-xs text-muted">{who} · {when}</p>
              </div>
            </li>
          ))}
        </ol>
      </Drawer>
    </>
  );
}
