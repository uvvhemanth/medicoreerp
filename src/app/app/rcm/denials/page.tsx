"use client";

import { useState } from "react";
import { api } from "@/lib/data/adapter";
import { useToast } from "@/components/ui/toast";
import { PageHeader } from "@/components/app/page-header";
import { Worklist } from "@/components/app/worklist";
import { Button } from "@/components/ui/button";
import { StatusChip, type StatusKind } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import type { Claim } from "@/lib/mock/types";
import { Sparkles, FileWarning, Send, ThumbsUp, Bot } from "lucide-react";

const statusMap: Record<Claim["status"], StatusKind> = {
  draft: "draft", "scrubbed-clean": "done", submitted: "info", denied: "error", "at-risk": "warning", paid: "done",
};

export default function DenialQueuePage() {
  const toast = useToast();
  const [selected, setSelected] = useState<Claim | null>(null);

  return (
    <>
      <PageHeader
        title="Denial Queue"
        breadcrumbs={[{ label: "Revenue Cycle" }, { label: "Denials" }]}
        subtitle="AI-drafted appeals — a human approves every submission."
        actions={<span className="hidden items-center gap-1.5 rounded-pill bg-teal/10 px-3 py-1.5 text-xs font-bold text-teal sm:flex"><Bot className="h-3.5 w-3.5" /> Autonomous RCM</span>}
      />
      <Worklist<Claim>
        queryKey="denials"
        fetcher={async () => (await api.claims()).filter((c) => c.status === "denied" || c.status === "at-risk")}
        rowKey={(c) => c.id}
        searchable={(c) => `${c.patient} ${c.payer} ${c.id}`}
        searchPlaceholder="Search claims, patients, payers…"
        filters={[
          { label: "Denied", predicate: (c) => c.status === "denied" },
          { label: "At risk", predicate: (c) => c.status === "at-risk" },
          { label: "High value", predicate: (c) => c.amount > 100000 },
        ]}
        onRowClick={setSelected}
        minWidth={820}
        columns={[
          { key: "id", header: "Claim", render: (c) => <span className="font-mono text-xs font-semibold text-heading">{c.id}</span> },
          { key: "patient", header: "Patient", render: (c) => <span className="font-medium text-heading">{c.patient}</span> },
          { key: "payer", header: "Payer", render: (c) => <span className="text-body">{c.payer}</span> },
          { key: "amount", header: "Amount", render: (c) => <span className="font-semibold text-heading">{formatCurrency(c.amount)}</span> },
          { key: "reason", header: "Reason", render: (c) => <span className="text-xs text-muted">{c.denialReason}</span> },
          { key: "risk", header: "AI risk", render: (c) => (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div className="h-full rounded-full bg-danger" style={{ width: `${c.denialRisk}%` }} />
              </div>
              <span className="text-xs font-semibold text-muted">{c.denialRisk}%</span>
            </div>
          ) },
          { key: "status", header: "Status", render: (c) => <StatusChip status={statusMap[c.status]}>{c.status}</StatusChip> },
        ]}
      />

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected ? `Claim ${selected.id}` : ""} width={520}>
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading text-lg font-bold text-heading">{selected.patient}</p>
                <p className="text-sm text-muted">{selected.payer} · {formatCurrency(selected.amount)}</p>
              </div>
              <StatusChip status={statusMap[selected.status]}>{selected.status}</StatusChip>
            </div>

            <div className="rounded-control border border-danger/25 bg-danger/[0.05] p-3">
              <p className="flex items-center gap-1.5 text-sm font-bold text-danger"><FileWarning className="h-4 w-4" /> Denial reason</p>
              <p className="mt-1 text-sm text-body">{selected.denialReason}</p>
            </div>

            <div>
              <p className="mb-1.5 text-xs font-bold uppercase text-muted">Codes</p>
              <div className="flex gap-1.5">{selected.codes.map((c) => <span key={c} className="rounded-md bg-mist px-2 py-0.5 font-mono text-xs text-teal">{c}</span>)}</div>
            </div>

            {/* AI drafted appeal — proposed vs decided */}
            <div className="rounded-control border-2 border-teal/25 bg-teal/[0.04] p-4">
              <p className="flex items-center gap-1.5 text-sm font-bold text-teal"><Sparkles className="h-4 w-4" /> AI-drafted appeal</p>
              <p className="mt-2 text-sm text-body">
                Dear {selected.payer}, we are appealing claim {selected.id}. The service was medically necessary and pre-authorization {selected.denialReason === "Missing pre-auth" ? "was obtained (ref attached)" : "requirements were met"}. Supporting documentation is enclosed…
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-warning/[0.1] px-3 py-2 text-xs font-semibold text-warning">
                <Bot className="h-3.5 w-3.5" /> AI proposed · awaiting human decision
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => { toast.success("Appeal submitted", { label: "Undo", onClick: () => {} }); setSelected(null); }}>
                <Send className="h-4 w-4" /> Approve & submit
              </Button>
              <Button variant="outline" onClick={() => { toast.info("Edited draft opened (demo)"); }}>Edit</Button>
              <Button variant="ghost" onClick={() => { toast.info("Marked reviewed"); setSelected(null); }}><ThumbsUp className="h-4 w-4" /></Button>
            </div>
            <p className="text-center text-xs text-muted">Every decision is attributed and audited.</p>
          </div>
        )}
      </Drawer>
    </>
  );
}
