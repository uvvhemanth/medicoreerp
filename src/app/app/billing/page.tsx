"use client";

import { api } from "@/lib/data/adapter";
import { PageHeader } from "@/components/app/page-header";
import { Worklist } from "@/components/app/worklist";
import { StatusChip, type StatusKind } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/utils";
import type { Claim } from "@/lib/mock/types";
import { Receipt } from "lucide-react";

const map: Record<Claim["status"], StatusKind> = { draft: "draft", "scrubbed-clean": "info", submitted: "info", denied: "error", "at-risk": "warning", paid: "done" };

export default function BillingPage() {
  const toast = useToast();
  return (
    <>
      <PageHeader title="Billing Desk" breadcrumbs={[{ label: "Revenue Cycle" }, { label: "Billing" }]} subtitle="Auto-captured charges — zero missed items."
        actions={<Button onClick={() => toast.success("New invoice (demo)")}><Receipt className="h-4 w-4" /> New invoice</Button>} />
      <Worklist<Claim>
        queryKey="billing"
        fetcher={() => api.claims()}
        rowKey={(c) => c.id}
        searchable={(c) => `${c.patient} ${c.payer} ${c.id}`}
        searchPlaceholder="Search invoice, patient, payer…"
        filters={[
          { label: "Draft", predicate: (c) => c.status === "draft" },
          { label: "Submitted", predicate: (c) => c.status === "submitted" },
          { label: "Paid", predicate: (c) => c.status === "paid" },
        ]}
        minWidth={780}
        columns={[
          { key: "id", header: "Invoice", render: (c) => <span className="font-mono text-xs font-semibold text-heading">{c.id}</span> },
          { key: "patient", header: "Patient", render: (c) => <span className="font-medium text-heading">{c.patient}</span> },
          { key: "payer", header: "Payer", render: (c) => <span className="text-body">{c.payer}</span> },
          { key: "amount", header: "Amount", render: (c) => <span className="font-semibold text-heading">{formatCurrency(c.amount)}</span> },
          { key: "status", header: "Status", render: (c) => <StatusChip status={map[c.status]}>{c.status}</StatusChip> },
        ]}
      />
    </>
  );
}
