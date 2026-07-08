"use client";

import { api } from "@/lib/data/adapter";
import { PageHeader } from "@/components/app/page-header";
import { Worklist } from "@/components/app/worklist";
import { StatusChip, type StatusKind } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/misc";
import { formatDate } from "@/lib/utils";
import type { Employee } from "@/lib/mock/types";

const map: Record<NonNullable<Employee["licenseStatus"]>, StatusKind> = { valid: "done", expiring: "warning", lapsed: "critical" };

export default function HrmPage() {
  return (
    <>
      <PageHeader title="Workforce" breadcrumbs={[{ label: "Operations" }, { label: "HRM" }]} subtitle="Credentialing — expiry alerts block scheduling if lapsed." />
      <Worklist<Employee>
        queryKey="employees"
        fetcher={() => api.employees()}
        rowKey={(e) => e.id}
        searchable={(e) => `${e.name} ${e.role} ${e.department}`}
        searchPlaceholder="Search staff, role, department…"
        filters={[
          { label: "On leave", predicate: (e) => e.status === "on-leave" },
          { label: "License expiring", predicate: (e) => e.licenseStatus === "expiring" },
          { label: "License lapsed", predicate: (e) => e.licenseStatus === "lapsed" },
        ]}
        rowClassName={(e) => (e.licenseStatus === "lapsed" ? "bg-critical/[0.03]" : "")}
        minWidth={800}
        columns={[
          { key: "name", header: "Employee", render: (e) => <span className="flex items-center gap-2.5"><Avatar name={e.name} src={e.photo} size={32} /><span className="font-medium text-heading">{e.name}</span></span> },
          { key: "role", header: "Role", render: (e) => <span className="text-body">{e.role}</span> },
          { key: "dept", header: "Department", render: (e) => <span className="text-body">{e.department}</span> },
          { key: "license", header: "License expiry", render: (e) => <span className="text-xs text-body">{e.licenseExpiry ? formatDate(e.licenseExpiry) : "—"}</span> },
          { key: "lstatus", header: "License", render: (e) => e.licenseStatus ? <StatusChip status={map[e.licenseStatus]}>{e.licenseStatus}</StatusChip> : null },
          { key: "status", header: "Status", render: (e) => <StatusChip status={e.status === "active" ? "active" : e.status === "on-call" ? "info" : "pending"}>{e.status}</StatusChip> },
        ]}
      />
    </>
  );
}
