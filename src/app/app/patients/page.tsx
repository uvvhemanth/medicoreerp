"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@/hooks/use-query";
import { api } from "@/lib/data/adapter";
import { useApp } from "@/components/app/app-context";
import { useToast } from "@/components/ui/toast";
import { PageHeader } from "@/components/app/page-header";
import { DataState } from "@/components/app/data-state";
import { Button } from "@/components/ui/button";
import { Chip, StatusChip } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/misc";
import { cn } from "@/lib/utils";
import type { Patient } from "@/lib/mock/types";
import {
  Search, UserPlus, SlidersHorizontal, AlertTriangle, ChevronRight, X,
  Bookmark, Download, Merge, Phone, ExternalLink,
} from "lucide-react";

const FILTERS = ["All", "Active", "Has allergies", "Possible duplicates", "With insurance"] as const;

export default function PatientsPage() {
  const router = useRouter();
  const { pinPatient } = useApp();
  const toast = useToast();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [drawer, setDrawer] = useState<Patient | null>(null);

  const { data, isLoading, isError, error, refetch } = useQuery(
    `patients-${q}`,
    () => api.patients(q),
    [q],
  );

  const rows = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      if (filter === "Active") return p.status === "active";
      if (filter === "Has allergies") return p.allergies.length > 0;
      if (filter === "Possible duplicates") return p.duplicate;
      if (filter === "With insurance") return p.insurance && p.insurance !== "Self-pay";
      return true;
    });
  }, [data, filter]);

  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));
  };
  const toggle = (id: string) => {
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const openChart = (p: Patient) => {
    pinPatient({ id: p.id, uhid: p.uhid, name: p.name, age: p.age, sex: p.sex, allergies: p.allergies, attending: "A. Menon" });
    router.push(`/app/patients/${p.id}`);
  };

  return (
    <>
      <PageHeader
        title="Patients"
        subtitle="Master Patient Index — search, dedupe, and open charts."
        breadcrumbs={[{ label: "Patient Access" }, { label: "Patients" }]}
        actions={
          <Button asChild><a href="/app/register-patient"><UserPlus className="h-4 w-4" /> Register</a></Button>
        }
      />

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 border-b bg-card px-4 py-3 sm:px-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, UHID, phone, ABHA…  (press / to focus)"
            className="w-full rounded-control border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Chip>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => toast.success("View saved as 'My patients'")}>
            <Bookmark className="h-4 w-4" /> Save view
          </Button>
          <Button variant="ghost" size="sm"><SlidersHorizontal className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="sticky top-14 z-20 flex animate-fade-in items-center gap-3 border-b bg-teal px-4 py-2.5 text-white sm:px-6">
          <span className="text-sm font-semibold">{selected.size} selected</span>
          <button onClick={() => setSelected(new Set())} className="text-sm underline underline-offset-2">Clear</button>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/15" onClick={() => toast.info("Export queued (demo)")}><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/15" onClick={() => toast.info("Merge wizard (demo)")}><Merge className="h-4 w-4" /> Merge</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="p-4 sm:p-6">
        <DataState
          data={rows}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onRetry={refetch}
          isEmpty={(d) => d.length === 0}
          filteredEmpty={!!q || filter !== "All"}
          emptyTitle="No patients yet"
          emptyDescription="Register the first patient to get started."
          emptyAction={<Button asChild><a href="/app/register-patient"><UserPlus className="h-4 w-4" /> Register patient</a></Button>}
        >
          {(data) => (
            <div className="overflow-hidden rounded-card border bg-card shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b bg-surface/60 text-xs uppercase tracking-wide text-muted">
                      <th className="w-10 px-4 py-3"><input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-teal" aria-label="Select all" /></th>
                      <th className="px-2 py-3 font-semibold">Patient</th>
                      <th className="px-2 py-3 font-semibold">UHID</th>
                      <th className="px-2 py-3 font-semibold">Age/Sex</th>
                      <th className="px-2 py-3 font-semibold">Contact</th>
                      <th className="px-2 py-3 font-semibold">Insurance</th>
                      <th className="px-2 py-3 font-semibold">Flags</th>
                      <th className="w-10 px-2 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {data.map((p) => (
                      <tr
                        key={p.id}
                        className={cn("group cursor-pointer transition hover:bg-mist/40 dark:hover:bg-white/[0.03]", selected.has(p.id) && "bg-teal/[0.04]")}
                        onClick={() => setDrawer(p)}
                      >
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggle(p.id)} className="accent-teal" aria-label={`Select ${p.name}`} />
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={p.name} src={p.photo} size={34} />
                            <div>
                              <p className="font-semibold text-heading">{p.name}</p>
                              <p className="text-xs text-muted">{p.bloodGroup} · {p.chronic[0] ?? "No chronic conditions"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-3 font-mono text-xs text-body">{p.uhid}</td>
                        <td className="px-2 py-3 text-body">{p.age}{p.sex}</td>
                        <td className="px-2 py-3 text-xs text-body">{p.phone}</td>
                        <td className="px-2 py-3">
                          <StatusChip status={p.insurance === "Self-pay" ? "draft" : "info"} dot={false}>{p.insurance}</StatusChip>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex gap-1">
                            {p.allergies.length > 0 && <span title={`Allergy: ${p.allergies.join(", ")}`} className="rounded-md bg-critical/12 p-1 text-critical"><AlertTriangle className="h-3.5 w-3.5" /></span>}
                            {p.duplicate && <span className="rounded-pill bg-warning/15 px-2 py-0.5 text-[10px] font-bold text-warning">DUP?</span>}
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <ChevronRight className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t px-4 py-2.5 text-xs text-muted">
                <span>{data.length} patients</span>
                <span>Showing recent · virtualized for 10k+ rows in production</span>
              </div>
            </div>
          )}
        </DataState>
      </div>

      {/* Detail drawer (peek) */}
      <Drawer open={!!drawer} onClose={() => setDrawer(null)} title="Patient details">
        {drawer && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Avatar name={drawer.name} src={drawer.photo} size={56} />
              <div>
                <p className="font-heading text-lg font-bold text-heading">{drawer.name}</p>
                <p className="text-sm text-muted">{drawer.age}{drawer.sex} · {drawer.uhid}</p>
              </div>
            </div>
            {drawer.allergies.length > 0 && (
              <div className="flex items-center gap-2 rounded-control border-2 border-critical/30 bg-critical/[0.06] px-3 py-2 text-sm font-semibold text-critical">
                <AlertTriangle className="h-4 w-4" /> Allergies: {drawer.allergies.join(", ")}
              </div>
            )}
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {[["Phone", drawer.phone], ["Blood group", drawer.bloodGroup], ["ABHA", drawer.abha ?? "—"], ["Insurance", drawer.insurance], ["Last visit", drawer.lastVisit ?? "—"], ["Registered", drawer.registeredAt]].map(([k, v]) => (
                <div key={k} className="rounded-lg border bg-surface/50 p-3">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="mt-0.5 font-medium text-heading">{v}</dd>
                </div>
              ))}
            </dl>
            {drawer.chronic.length > 0 && (
              <div>
                <p className="mb-1.5 text-xs font-bold uppercase text-muted">Chronic conditions</p>
                <div className="flex flex-wrap gap-1.5">
                  {drawer.chronic.map((c) => <StatusChip key={c} status="active" dot={false}>{c}</StatusChip>)}
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={() => openChart(drawer)}><ExternalLink className="h-4 w-4" /> Open chart</Button>
              <Button variant="outline" onClick={() => window.open(`tel:${drawer.phone}`)}><Phone className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
