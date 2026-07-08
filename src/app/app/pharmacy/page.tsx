"use client";

import { useState } from "react";
import { api } from "@/lib/data/adapter";
import { useToast } from "@/components/ui/toast";
import { PageHeader } from "@/components/app/page-header";
import { Worklist } from "@/components/app/worklist";
import { Button } from "@/components/ui/button";
import { StatusChip, type StatusKind } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/dialog";
import { SeverityBanner } from "@/components/ui/banner";
import type { RxItem } from "@/lib/mock/types";
import { Pill, Check, Ban, RefreshCw } from "lucide-react";

const map: Record<RxItem["status"], StatusKind> = { pending: "pending", verified: "info", dispensed: "done", hold: "cancelled" };
const prio: Record<RxItem["priority"], StatusKind> = { routine: "draft", urgent: "warning", stat: "critical" };

export default function PharmacyPage() {
  const toast = useToast();
  const [sel, setSel] = useState<RxItem | null>(null);
  return (
    <>
      <PageHeader title="Pharmacy · Rx Queue" breadcrumbs={[{ label: "Ancillary" }, { label: "Pharmacy" }]} subtitle="Clinical verification with interaction checks." />
      <Worklist<RxItem>
        queryKey="rx"
        fetcher={() => api.rxQueue()}
        rowKey={(r) => r.id}
        searchable={(r) => `${r.patient} ${r.drug} ${r.prescriber}`}
        searchPlaceholder="Search patient, drug, prescriber…"
        filters={[
          { label: "Pending", predicate: (r) => r.status === "pending" },
          { label: "STAT", predicate: (r) => r.priority === "stat" },
          { label: "Interactions", predicate: (r) => !!r.interaction },
        ]}
        onRowClick={setSel}
        rowClassName={(r) => (r.interaction ? "bg-critical/[0.03]" : "")}
        minWidth={800}
        columns={[
          { key: "patient", header: "Patient", render: (r) => <span className="font-medium text-heading">{r.patient}</span> },
          { key: "drug", header: "Drug", render: (r) => <span className="flex items-center gap-1.5 text-body"><Pill className="h-3.5 w-3.5 text-teal" /> {r.drug}</span> },
          { key: "dose", header: "Dose", render: (r) => <span className="font-mono text-xs text-body">{r.dose}</span> },
          { key: "prescriber", header: "Prescriber", render: (r) => <span className="text-xs text-muted">{r.prescriber}</span> },
          { key: "prio", header: "Priority", render: (r) => <StatusChip status={prio[r.priority]} dot={false}>{r.priority}</StatusChip> },
          { key: "flag", header: "Flag", render: (r) => r.interaction ? <StatusChip status="critical">Interaction</StatusChip> : <span className="text-xs text-muted">—</span> },
          { key: "status", header: "Status", render: (r) => <StatusChip status={map[r.status]}>{r.status}</StatusChip> },
        ]}
      />

      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel ? "Verify prescription" : ""}>
        {sel && (
          <div className="space-y-4">
            <div>
              <p className="font-heading text-lg font-bold text-heading">{sel.drug}</p>
              <p className="text-sm text-muted">{sel.patient} · {sel.dose} · {sel.prescriber}</p>
            </div>
            {sel.interaction && (
              <SeverityBanner severity="critical" title="Drug interaction detected" evidence="Micromedex · major">{sel.interaction}</SeverityBanner>
            )}
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => { toast.success("Verified & dispensed", { label: "Undo", onClick: () => {} }); setSel(null); }}><Check className="h-4 w-4" /> Verify & dispense</Button>
              <Button variant="outline" onClick={() => { toast.info("Substitution suggested"); }}><RefreshCw className="h-4 w-4" /></Button>
              <Button variant="ghost" onClick={() => { toast.info("Put on hold"); setSel(null); }}><Ban className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
