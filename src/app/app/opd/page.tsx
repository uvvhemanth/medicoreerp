"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/badge";
import { SeverityBanner } from "@/components/ui/banner";
import { useToast } from "@/components/ui/toast";
import { Avatar } from "@/components/ui/misc";
import { Sparkles, Signature, Plus, Stethoscope, Mic } from "lucide-react";

const queue = [
  { id: "1", name: "Meera Sharma", token: "T-12", complaint: "Chest tightness", waiting: "4 min", status: "in-consult" as const },
  { id: "2", name: "Arjun Patel", token: "T-13", complaint: "Fever, cough", waiting: "9 min", status: "waiting" as const },
  { id: "3", name: "Priya Nair", token: "T-14", complaint: "Follow-up: diabetes", waiting: "15 min", status: "waiting" as const },
];

export default function OpdPage() {
  const toast = useToast();
  const [active, setActive] = useState(queue[0]);
  const [scribing, setScribing] = useState(false);

  return (
    <>
      <PageHeader title="OPD Consult" breadcrumbs={[{ label: "Clinical" }, { label: "OPD" }]} subtitle="Consult workspace with ambient scribe & co-pilot." />
      <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[300px_1fr]">
        {/* Queue */}
        <Card className="h-fit">
          <CardHeader><CardTitle>Waiting room</CardTitle><StatusChip status="active" dot>{queue.length}</StatusChip></CardHeader>
          <CardBody className="p-0">
            <div className="divide-y">
              {queue.map((p) => (
                <button key={p.id} onClick={() => setActive(p)} className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-mist/40 ${active.id === p.id ? "bg-teal/[0.06]" : ""}`}>
                  <Avatar name={p.name} size={34} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-heading">{p.name}</p>
                    <p className="truncate text-xs text-muted">{p.token} · {p.complaint}</p>
                  </div>
                  <span className="text-xs text-muted">{p.waiting}</span>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Consult workspace */}
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar name={active.name} size={40} />
                <div>
                  <CardTitle>{active.name}</CardTitle>
                  <p className="text-xs text-muted">{active.token} · {active.complaint}</p>
                </div>
              </div>
              <Button size="sm" variant={scribing ? "danger" : "primary"} onClick={() => { setScribing((s) => !s); toast.info(scribing ? "Scribe stopped" : "Ambient scribe listening…"); }}>
                <Mic className="h-4 w-4" /> {scribing ? "Stop scribe" : "Start scribe"}
              </Button>
            </CardHeader>
            <CardBody>
              <SeverityBanner severity="warning" title="Gaps in care" evidence="Screening registry">Overdue: HbA1c (6 months), lipid panel (1 year).</SeverityBanner>
              {scribing && (
                <div className="mt-4 rounded-control border-2 border-teal/25 bg-teal/[0.04] p-4 animate-fade-in">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-teal"><Sparkles className="h-3.5 w-3.5" /> LIVE TRANSCRIPT → SOAP</p>
                  <p className="mt-2 text-sm text-body">Patient reports exertional chest tightness for two days… <span className="animate-pulse">▋</span></p>
                </div>
              )}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-control border p-3"><p className="text-xs font-bold uppercase text-muted">Diagnosis</p><p className="mt-1 text-sm text-heading">Angina, r/o ACS <span className="rounded bg-mist px-1 text-xs text-teal">I20.9</span></p></div>
                <div className="rounded-control border p-3"><p className="text-xs font-bold uppercase text-muted">Orders</p><p className="mt-1 text-sm text-heading">ECG, Troponin, Aspirin</p></div>
              </div>
            </CardBody>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.info("Order set opened")}><Plus className="h-4 w-4" /> Add orders</Button>
            <Button variant="outline" onClick={() => toast.info("e-Prescribe (interaction-checked)")}><Stethoscope className="h-4 w-4" /> e-Prescribe</Button>
            <Button className="ml-auto" onClick={() => toast.success("Encounter signed", { label: "Undo", onClick: () => {} })}><Signature className="h-4 w-4" /> Sign & close</Button>
          </div>
        </div>
      </div>
    </>
  );
}
