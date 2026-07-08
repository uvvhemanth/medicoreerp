"use client";

import { api } from "@/lib/data/adapter";
import { useToast } from "@/components/ui/toast";
import { PageHeader } from "@/components/app/page-header";
import { Worklist } from "@/components/app/worklist";
import { Button } from "@/components/ui/button";
import { StatusChip, type StatusKind } from "@/components/ui/badge";
import type { Appointment } from "@/lib/mock/types";
import { CalendarPlus } from "lucide-react";

const map: Record<Appointment["status"], StatusKind> = {
  scheduled: "pending", "checked-in": "info", "in-consult": "active", done: "done", cancelled: "cancelled", "no-show": "error",
};

export default function AppointmentsPage() {
  const toast = useToast();
  return (
    <>
      <PageHeader
        title="Appointments"
        breadcrumbs={[{ label: "Patient Access" }, { label: "Appointments" }]}
        subtitle="Today's schedule with ML no-show scores."
        actions={<Button onClick={() => toast.success("Booking dialog (demo)")}><CalendarPlus className="h-4 w-4" /> Book</Button>}
      />
      <Worklist<Appointment>
        queryKey="appointments"
        fetcher={() => api.appointments()}
        rowKey={(a) => a.id}
        searchable={(a) => `${a.patientName} ${a.doctor} ${a.department}`}
        searchPlaceholder="Search patient, doctor, department…"
        filters={[
          { label: "Checked in", predicate: (a) => a.status === "checked-in" },
          { label: "In consult", predicate: (a) => a.status === "in-consult" },
          { label: "High no-show risk", predicate: (a) => a.noShowRisk > 60 },
        ]}
        minWidth={820}
        columns={[
          { key: "time", header: "Time", render: (a) => <span className="font-bold text-heading">{a.time}</span> },
          { key: "patient", header: "Patient", render: (a) => <span className="font-medium text-heading">{a.patientName}</span> },
          { key: "doctor", header: "Doctor", render: (a) => <span className="text-body">{a.doctor}</span> },
          { key: "dept", header: "Department", render: (a) => <span className="text-body">{a.department}</span> },
          { key: "channel", header: "Channel", render: (a) => <span className="text-xs capitalize text-muted">{a.channel}</span> },
          { key: "risk", header: "No-show", render: (a) => a.noShowRisk > 60 ? <StatusChip status="warning" dot={false}>{a.noShowRisk}%</StatusChip> : <span className="text-xs text-muted">{a.noShowRisk}%</span> },
          { key: "status", header: "Status", render: (a) => <StatusChip status={map[a.status]}>{a.status}</StatusChip> },
        ]}
      />
    </>
  );
}
