"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/badge";
import { Modal } from "@/components/ui/dialog";
import { Sparkles, FileText, Pill, Activity } from "lucide-react";

const records = [
  { id: "1", type: "lab", title: "Complete Blood Count", date: "08 Jul 2026", status: "New", ai: "All values are within the normal range. Your hemoglobin is healthy at 14.2 g/dL." },
  { id: "2", type: "imaging", title: "Chest X-ray", date: "05 Jul 2026", status: "Reviewed", ai: "Your chest X-ray is clear with no signs of infection or fluid." },
  { id: "3", type: "rx", title: "Prescription — Dr. Menon", date: "05 Jul 2026", status: "Active", ai: "You've been prescribed aspirin and a statin to protect your heart. Take as directed." },
];
const icon = { lab: Activity, imaging: FileText, rx: Pill } as const;

export default function RecordsPage() {
  const [open, setOpen] = useState<(typeof records)[number] | null>(null);
  return (
    <div className="space-y-4 p-4">
      <h1 className="font-heading text-2xl font-extrabold text-heading">My Records</h1>
      {records.map((r) => {
        const Icon = icon[r.type as keyof typeof icon];
        return (
          <Card key={r.id}>
            <CardBody className="flex items-center gap-3 pt-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-mist text-teal"><Icon className="h-5 w-5" /></div>
              <button onClick={() => setOpen(r)} className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-semibold text-heading">{r.title}</p>
                <p className="text-xs text-muted">{r.date}</p>
              </button>
              <StatusChip status={r.status === "New" ? "done" : r.status === "Active" ? "active" : "info"} dot={false}>{r.status}</StatusChip>
            </CardBody>
          </Card>
        );
      })}
      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title}>
        {open && (
          <div className="space-y-4">
            <p className="text-sm text-muted">{open.date}</p>
            <div className="rounded-control border-2 border-teal/25 bg-teal/[0.04] p-4">
              <p className="flex items-center gap-1.5 text-sm font-bold text-teal"><Sparkles className="h-4 w-4" /> In plain language</p>
              <p className="mt-2 text-sm text-body">{open.ai}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-control bg-teal py-2.5 text-sm font-semibold text-white">Download PDF</button>
              <button className="flex-1 rounded-control border py-2.5 text-sm font-semibold text-heading">Share</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
