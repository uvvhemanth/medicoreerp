"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@/hooks/use-query";
import { api } from "@/lib/data/adapter";
import { useToast } from "@/components/ui/toast";
import { PageHeader } from "@/components/app/page-header";
import { DataState } from "@/components/app/data-state";
import { Chip } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Bed } from "@/lib/mock/types";
import { BedDouble, Wifi, RefreshCw, ShieldAlert, Radio } from "lucide-react";

const statusStyle: Record<Bed["status"], { bg: string; label: string; dot: string }> = {
  occupied: { bg: "border-teal/30 bg-teal/[0.06]", label: "Occupied", dot: "bg-teal" },
  vacant: { bg: "border-success/30 bg-success/[0.06]", label: "Vacant", dot: "bg-success" },
  cleaning: { bg: "border-warning/30 bg-warning/[0.08]", label: "Cleaning", dot: "bg-warning" },
  reserved: { bg: "border-clinical/30 bg-clinical/[0.06]", label: "Reserved", dot: "bg-clinical" },
  blocked: { bg: "border-danger/30 bg-danger/[0.06]", label: "Blocked", dot: "bg-danger" },
};

export default function BedBoardPage() {
  const toast = useToast();
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery("beds", () => api.beds());
  const [ward, setWard] = useState("All");
  const [selected, setSelected] = useState<Bed | null>(null);

  const wards = useMemo(() => ["All", ...Array.from(new Set((data ?? []).map((b) => b.ward)))], [data]);
  const rows = useMemo(() => (data ?? []).filter((b) => ward === "All" || b.ward === ward), [data, ward]);
  const stats = useMemo(() => {
    const d = data ?? [];
    return {
      total: d.length,
      occupied: d.filter((b) => b.status === "occupied").length,
      vacant: d.filter((b) => b.status === "vacant").length,
    };
  }, [data]);

  return (
    <>
      <PageHeader
        title="Bed Board"
        breadcrumbs={[{ label: "Clinical" }, { label: "IPD" }, { label: "Bed Board" }]}
        subtitle={data ? `${stats.occupied}/${stats.total} occupied · ${stats.vacant} available` : "Live ward occupancy"}
        actions={
          <>
            <span className="hidden items-center gap-1.5 rounded-pill bg-success/12 px-3 py-1.5 text-xs font-bold text-success sm:flex">
              <Radio className="h-3 w-3 animate-pulse" /> Live
            </span>
            <Button variant="outline" size="sm" onClick={refetch} loading={isFetching}><RefreshCw className="h-4 w-4" /> Refresh</Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-3 border-b bg-card px-4 py-3 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {wards.map((w) => <Chip key={w} active={ward === w} onClick={() => setWard(w)}>{w}</Chip>)}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-3 text-xs">
          {Object.entries(statusStyle).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5 text-muted"><span className={cn("h-2.5 w-2.5 rounded-full", v.dot)} /> {v.label}</span>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <DataState data={rows} isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={(d) => d.length === 0}>
          {(beds) => (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
              {beds.map((bed) => {
                const s = statusStyle[bed.status];
                return (
                  <button
                    key={bed.id}
                    onClick={() => setSelected(bed)}
                    className={cn("group relative rounded-card border-2 p-3 text-left transition hover:shadow-card", s.bg)}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-heading"><BedDouble className="h-3.5 w-3.5" /> {bed.number}</span>
                      {bed.isolation && <ShieldAlert className="h-3.5 w-3.5 text-danger" />}
                    </div>
                    {bed.status === "occupied" ? (
                      <>
                        <p className="truncate text-sm font-semibold text-heading">{bed.patient}</p>
                        <p className="truncate text-xs text-muted">{bed.attending} · {bed.los}d</p>
                        {bed.predictedDischarge && (
                          <p className="mt-1 truncate rounded bg-clinical/10 px-1.5 py-0.5 text-[10px] font-semibold text-clinical">↪ D/C {bed.predictedDischarge}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-xs font-semibold capitalize text-muted">{s.label}</p>
                    )}
                    <span className={cn("absolute right-2 top-2 h-2 w-2 rounded-full", s.dot)} />
                  </button>
                );
              })}
            </div>
          )}
        </DataState>
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected ? `Bed ${selected.number}` : ""}>
        {selected && (
          <div className="space-y-4">
            <div className={cn("rounded-control border-2 p-4", statusStyle[selected.status].bg)}>
              <p className="text-xs font-bold uppercase text-muted">{selected.ward} ward</p>
              <p className="mt-1 font-heading text-xl font-bold text-heading capitalize">{statusStyle[selected.status].label}</p>
            </div>
            {selected.status === "occupied" ? (
              <>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  {[["Patient", selected.patient], ["UHID", selected.uhid], ["Attending", selected.attending], ["Length of stay", `${selected.los} days`]].map(([k, v]) => (
                    <div key={k} className="rounded-lg border bg-surface/50 p-3"><dt className="text-xs text-muted">{k}</dt><dd className="mt-0.5 font-medium text-heading">{v ?? "—"}</dd></div>
                  ))}
                </dl>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => { toast.info("Transfer initiated (demo)"); setSelected(null); }}>Transfer</Button>
                  <Button variant="outline" className="flex-1" onClick={() => { toast.success("Discharge started (demo)"); setSelected(null); }}>Discharge</Button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => { toast.success("Bed assigned (demo)"); setSelected(null); }}>Assign patient</Button>
                <Button variant="outline" onClick={() => { toast.info("Marked for cleaning"); setSelected(null); }}>Mark cleaning</Button>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </>
  );
}
