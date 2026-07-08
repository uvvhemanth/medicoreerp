"use client";

import { api } from "@/lib/data/adapter";
import { PageHeader } from "@/components/app/page-header";
import { Worklist } from "@/components/app/worklist";
import { StatusChip, type StatusKind } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { InventoryItem } from "@/lib/mock/types";

const map: Record<InventoryItem["status"], StatusKind> = { ok: "done", low: "warning", "near-expiry": "warning", "dead-stock": "cancelled", out: "error" };

export default function InventoryPage() {
  return (
    <>
      <PageHeader title="Inventory" breadcrumbs={[{ label: "Operations" }, { label: "Inventory" }]} subtitle="Multi-store stock with ML reorder suggestions." />
      <Worklist<InventoryItem>
        queryKey="inventory"
        fetcher={() => api.inventory()}
        rowKey={(i) => i.id}
        searchable={(i) => `${i.name} ${i.batch} ${i.store}`}
        searchPlaceholder="Search item, batch, store…"
        filters={[
          { label: "Low stock", predicate: (i) => i.status === "low" },
          { label: "Near expiry", predicate: (i) => i.status === "near-expiry" },
          { label: "Out of stock", predicate: (i) => i.status === "out" },
        ]}
        minWidth={860}
        columns={[
          { key: "name", header: "Item", render: (i) => <span className="font-medium text-heading">{i.name}</span> },
          { key: "cat", header: "Category", render: (i) => <span className="text-xs text-muted">{i.category}</span> },
          { key: "store", header: "Store", render: (i) => <span className="text-body">{i.store}</span> },
          { key: "batch", header: "Batch", render: (i) => <span className="font-mono text-xs text-body">{i.batch}</span> },
          { key: "expiry", header: "Expiry", render: (i) => <span className="text-xs text-body">{formatDate(i.expiry)}</span> },
          { key: "qty", header: "Qty", render: (i) => <span className={i.qty < i.reorderLevel ? "font-bold text-danger" : "text-heading"}>{i.qty}</span> },
          { key: "value", header: "Value", render: (i) => <span className="text-body">{formatCurrency(i.qty * i.unitCost)}</span> },
          { key: "status", header: "Status", render: (i) => <StatusChip status={map[i.status]}>{i.status}</StatusChip> },
        ]}
      />
    </>
  );
}
