"use client";

import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { SeverityBanner } from "@/components/ui/banner";
import { FlaskConical, Check } from "lucide-react";

const samples = [
  { id: "S-8801", patient: "Meera Sharma", test: "Troponin I", stage: "in-process", critical: true, value: "0.9 ng/mL" },
  { id: "S-8802", patient: "Arjun Patel", test: "CBC", stage: "received", critical: false, value: "—" },
  { id: "S-8803", patient: "Priya Nair", test: "HbA1c", stage: "collected", critical: false, value: "—" },
  { id: "S-8804", patient: "Rahul Das", test: "Potassium", stage: "validated", critical: true, value: "6.8 mmol/L" },
];
const stageStatus = { collected: "pending", received: "info", "in-process": "active", validated: "done" } as const;

export default function LabPage() {
  const toast = useToast();
  return (
    <>
      <PageHeader title="Laboratory · LIS" breadcrumbs={[{ label: "Ancillary" }, { label: "Lab" }]} subtitle="Analyzer results with delta & critical checks." />
      <div className="space-y-5 p-4 sm:p-6">
        <SeverityBanner severity="critical" title="Critical value awaiting acknowledgment" evidence="Delta check · panic range">Potassium 6.8 mmol/L — Rahul Das. Notify clinician.</SeverityBanner>
        <Card>
          <CardHeader><CardTitle>Sample worklist</CardTitle></CardHeader>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead><tr className="border-b bg-surface/60 text-xs uppercase text-muted"><th className="px-5 py-3">Sample</th><th className="px-2 py-3">Patient</th><th className="px-2 py-3">Test</th><th className="px-2 py-3">Value</th><th className="px-2 py-3">Stage</th><th className="px-2 py-3">Action</th></tr></thead>
                <tbody className="divide-y">
                  {samples.map((s) => (
                    <tr key={s.id} className={s.critical ? "bg-critical/[0.03]" : ""}>
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-heading">{s.id}</td>
                      <td className="px-2 py-3 font-medium text-heading">{s.patient}</td>
                      <td className="px-2 py-3 text-body"><FlaskConical className="mr-1 inline h-3.5 w-3.5 text-teal" />{s.test}</td>
                      <td className={`px-2 py-3 ${s.critical ? "font-bold text-critical" : "text-body"}`}>{s.value}</td>
                      <td className="px-2 py-3"><StatusChip status={stageStatus[s.stage as keyof typeof stageStatus]}>{s.stage}</StatusChip></td>
                      <td className="px-2 py-3">
                        {s.stage !== "validated" && <Button size="sm" variant="outline" onClick={() => toast.success(`${s.id} validated & signed`)}><Check className="h-3.5 w-3.5" /> Validate</Button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
