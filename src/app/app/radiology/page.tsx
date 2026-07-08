"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Scan, Sparkles, ZoomIn, Ruler } from "lucide-react";

const studies = [
  { id: "R-501", patient: "Meera Sharma", modality: "CT Chest", priority: "STAT", aiFlag: "Possible PE — critical", status: "unread" },
  { id: "R-502", patient: "Arjun Patel", modality: "CXR", priority: "Routine", aiFlag: null, status: "unread" },
  { id: "R-503", patient: "Priya Nair", modality: "MRI Brain", priority: "Urgent", aiFlag: null, status: "reported" },
];

export default function RadiologyPage() {
  const toast = useToast();
  const [active, setActive] = useState(studies[0]);
  return (
    <>
      <PageHeader title="Radiology · RIS/PACS" breadcrumbs={[{ label: "Ancillary" }, { label: "Radiology" }]} subtitle="Zero-footprint DICOM viewer with AI pre-read." />
      <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit">
          <CardHeader><CardTitle>Worklist</CardTitle></CardHeader>
          <CardBody className="p-0">
            <div className="divide-y">
              {studies.map((s) => (
                <button key={s.id} onClick={() => setActive(s)} className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left hover:bg-mist/40 ${active.id === s.id ? "bg-teal/[0.06]" : ""}`}>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm font-semibold text-heading">{s.modality}</span>
                    <StatusChip status={s.status === "reported" ? "done" : "pending"} dot={false}>{s.status}</StatusChip>
                  </div>
                  <span className="text-xs text-muted">{s.patient} · {s.priority}</span>
                  {s.aiFlag && <span className="rounded bg-critical/12 px-1.5 py-0.5 text-[10px] font-bold text-critical">AI: {s.aiFlag}</span>}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{active.modality} · {active.patient}</CardTitle>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => toast.info("Zoom")}><ZoomIn className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => toast.info("Measure")}><Ruler className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardBody>
            {active.aiFlag && (
              <div className="mb-3 flex items-center gap-2 rounded-control border-2 border-critical/30 bg-critical/[0.06] px-3 py-2 text-sm font-semibold text-critical">
                <Sparkles className="h-4 w-4" /> AI pre-read: {active.aiFlag}
              </div>
            )}
            <div className="grid aspect-video place-items-center rounded-control border-2 border-dashed bg-ink/95 text-white/60">
              <div className="text-center">
                <Scan className="mx-auto h-12 w-12 opacity-40" />
                <p className="mt-2 text-sm">DICOM viewer (Cornerstone/OHIF)</p>
                <p className="text-xs opacity-60">{active.id} · window/level · compare prior</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" onClick={() => toast.success("Report published")}>Publish report</Button>
              <Button variant="outline" onClick={() => toast.info("Prior study loaded")}>Compare prior</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
