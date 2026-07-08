"use client";

import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Tabs, TabsList, TabTrigger, TabContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { StatusChip } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { useTheme } from "@/components/providers/theme-provider";
import { useState } from "react";
import { Workflow, FormInput, Users, Building2, Palette, GripVertical, Plus } from "lucide-react";

export default function SettingsPage() {
  const toast = useToast();
  const { theme, toggleTheme, density, toggleDensity } = useTheme();
  const [flags, setFlags] = useState({ ambientScribe: true, autonomousRcm: true, commandCenter: false, patientPortal: true });

  return (
    <>
      <PageHeader title="Admin & Settings" breadcrumbs={[{ label: "Insight" }, { label: "Settings" }]} subtitle="Configure, don't customize." />
      <div className="p-4 sm:p-6">
        <Tabs defaultValue="masters">
          <TabsList>
            <TabTrigger value="masters">Masters</TabTrigger>
            <TabTrigger value="roles">Roles</TabTrigger>
            <TabTrigger value="workflow">Workflow Studio</TabTrigger>
            <TabTrigger value="forms">Form Builder</TabTrigger>
            <TabTrigger value="branding">White-label</TabTrigger>
          </TabsList>

          <TabContent value="masters">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["Departments", "Wards & Beds", "Services", "Tax rules", "Insurance plans", "Item masters", "Holidays", "Shifts", "Payment modes"].map((m) => (
                <Card key={m}>
                  <CardBody className="flex items-center justify-between pt-5">
                    <div className="flex items-center gap-3"><Building2 className="h-5 w-5 text-teal" /><span className="font-semibold text-heading">{m}</span></div>
                    <Button size="sm" variant="ghost" onClick={() => toast.info(`Manage ${m}`)}>Manage</Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </TabContent>

          <TabContent value="roles">
            <Card>
              <CardHeader><CardTitle>Role & permission matrix (RBAC + ABAC)</CardTitle><Button size="sm"><Plus className="h-4 w-4" /> New role</Button></CardHeader>
              <CardBody className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead><tr className="border-b bg-surface/60 text-xs uppercase text-muted"><th className="px-5 py-3">Role</th><th className="px-2 py-3">View PHI</th><th className="px-2 py-3">Prescribe</th><th className="px-2 py-3">Bill</th><th className="px-2 py-3">Admin</th></tr></thead>
                    <tbody className="divide-y">
                      {[["Doctor", true, true, false, false], ["Nurse", true, false, false, false], ["Biller", false, false, true, false], ["Admin", true, false, true, true]].map((r) => (
                        <tr key={r[0] as string}>
                          <td className="px-5 py-3 font-semibold text-heading">{r[0]}</td>
                          {r.slice(1).map((v, i) => <td key={i} className="px-2 py-3">{v ? <StatusChip status="done" dot={false}>Yes</StatusChip> : <span className="text-xs text-muted">—</span>}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </TabContent>

          <TabContent value="workflow">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Workflow className="h-5 w-5 text-teal" /> Workflow Studio</CardTitle><Button size="sm" onClick={() => toast.success("Published v3")}>Publish</Button></CardHeader>
              <CardBody>
                <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-muted">Node palette</p>
                    {["Start", "Approval", "Condition", "Notify", "End"].map((n) => (
                      <div key={n} className="flex cursor-grab items-center gap-2 rounded-lg border bg-surface px-3 py-2 text-sm"><GripVertical className="h-4 w-4 text-muted" /> {n}</div>
                    ))}
                  </div>
                  <div className="grid min-h-[280px] place-items-center rounded-control border-2 border-dashed bg-surface/40 bg-grid">
                    <div className="flex items-center gap-3">
                      {["Start", "Approval", "Notify", "End"].map((n, i) => (
                        <div key={n} className="flex items-center gap-3">
                          <div className="rounded-lg border-2 border-teal/30 bg-card px-4 py-2 text-sm font-semibold text-heading shadow-soft">{n}</div>
                          {i < 3 && <span className="text-muted">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted">Drag-drop approval chains and care pathways — live preview, versioning, publish.</p>
              </CardBody>
            </Card>
          </TabContent>

          <TabContent value="forms">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><FormInput className="h-5 w-5 text-teal" /> Form Builder</CardTitle><Button size="sm" onClick={() => toast.success("Form schema saved")}>Save schema</Button></CardHeader>
              <CardBody>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase text-muted">Fields</p>
                    <div className="space-y-2">
                      {["Text input", "Dropdown", "Date picker", "Checkbox", "Vitals block"].map((f) => (
                        <div key={f} className="flex items-center gap-2 rounded-lg border bg-surface px-3 py-2 text-sm"><GripVertical className="h-4 w-4 text-muted" /> {f}</div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-control border-2 border-dashed p-4">
                    <p className="mb-3 text-xs font-bold uppercase text-muted">Live preview</p>
                    <label className="text-sm font-semibold text-heading">Chief complaint</label>
                    <input className="mt-1 w-full rounded-control border bg-surface px-3 py-2 text-sm" placeholder="Type here…" />
                    <label className="mt-3 block text-sm font-semibold text-heading">Severity</label>
                    <select className="mt-1 w-full rounded-control border bg-surface px-3 py-2 text-sm"><option>Mild</option><option>Moderate</option><option>Severe</option></select>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted">Emits JSON consumed by the live FormRenderer — no per-form code.</p>
              </CardBody>
            </Card>
          </TabContent>

          <TabContent value="branding">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-teal" /> Appearance</CardTitle></CardHeader>
                <CardBody className="space-y-4">
                  <div className="flex items-center justify-between"><span className="text-sm font-medium text-heading">Dark mode</span><Switch checked={theme === "dark"} onChange={toggleTheme} /></div>
                  <div className="flex items-center justify-between"><span className="text-sm font-medium text-heading">Compact density</span><Switch checked={density === "compact"} onChange={toggleDensity} /></div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-heading">Brand color</p>
                    <div className="flex gap-2">{["#0E8388", "#1B6EC2", "#1E9E63", "#7A3FBF"].map((c) => <button key={c} onClick={() => toast.info("Brand color applied at runtime (demo)")} className="h-8 w-8 rounded-full ring-2 ring-transparent hover:ring-teal" style={{ background: c }} />)}</div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-teal" /> Feature flags</CardTitle></CardHeader>
                <CardBody className="space-y-3">
                  {Object.entries(flags).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize text-heading">{k.replace(/([A-Z])/g, " $1")}</span>
                      <Switch checked={v} onChange={(nv) => { setFlags((f) => ({ ...f, [k]: nv })); toast.info(`${k} ${nv ? "enabled" : "disabled"}`); }} />
                    </div>
                  ))}
                </CardBody>
              </Card>
            </div>
          </TabContent>
        </Tabs>
      </div>
    </>
  );
}
