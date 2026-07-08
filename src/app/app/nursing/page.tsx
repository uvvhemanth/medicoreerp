"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/badge";
import { SeverityBanner } from "@/components/ui/banner";
import { useToast } from "@/components/ui/toast";
import { ScanBarcode, Check, Clock } from "lucide-react";

const meds = [
  { id: "1", patient: "Meera Sharma", bed: "GEN-A-4", drug: "Aspirin 75mg", due: "08:00", status: "due" as const, verified: false },
  { id: "2", patient: "Arjun Patel", bed: "GEN-A-7", drug: "Ceftriaxone 1g IV", due: "08:00", status: "overdue" as const, verified: false },
  { id: "3", patient: "Priya Nair", bed: "GEN-B-2", drug: "Metformin 850mg", due: "09:00", status: "upcoming" as const, verified: false },
];

export default function NursingPage() {
  const toast = useToast();
  const [list, setList] = useState(meds);
  const [scanning, setScanning] = useState<string | null>(null);

  const administer = (id: string) => {
    setScanning(id);
    setTimeout(() => {
      setList((l) => l.map((m) => (m.id === id ? { ...m, verified: true, status: "given" as never } : m)));
      setScanning(null);
      toast.success("5-rights verified · administered", { label: "Undo", onClick: () => {} });
    }, 900);
  };

  return (
    <>
      <PageHeader title="Nursing · eMAR" breadcrumbs={[{ label: "Clinical" }, { label: "Nursing" }]} subtitle="Barcode 5-rights medication administration." />
      <div className="space-y-5 p-4 sm:p-6">
        <SeverityBanner severity="warning" title="1 overdue administration" evidence="eMAR schedule">Ceftriaxone for Arjun Patel (GEN-A-7) is past due.</SeverityBanner>
        <Card>
          <CardHeader><CardTitle>Due medications</CardTitle></CardHeader>
          <CardBody className="p-0">
            <div className="divide-y">
              {list.map((m) => (
                <div key={m.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-heading">{m.drug}</p>
                    <p className="text-xs text-muted">{m.patient} · {m.bed}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted"><Clock className="h-3.5 w-3.5" /> {m.due}</span>
                  {"verified" in m && (m as { verified: boolean }).verified ? (
                    <StatusChip status="done">Given</StatusChip>
                  ) : m.status === "overdue" ? (
                    <StatusChip status="error">Overdue</StatusChip>
                  ) : (
                    <StatusChip status="pending">{m.status}</StatusChip>
                  )}
                  {!(m as { verified: boolean }).verified && (
                    <Button size="sm" loading={scanning === m.id} onClick={() => administer(m.id)}>
                      {scanning === m.id ? "Scanning…" : <><ScanBarcode className="h-4 w-4" /> Scan & give</>}
                    </Button>
                  )}
                  {(m as { verified: boolean }).verified && <Check className="h-5 w-5 text-success" />}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
