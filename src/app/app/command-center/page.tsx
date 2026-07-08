"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Radio, TriangleAlert, Ambulance, BedDouble, Activity, Users, Wifi } from "lucide-react";

const branches = [
  { name: "Main Campus", occ: 78, er: 12, icu: 4, waiting: 8, status: "ok" },
  { name: "North Wing", occ: 92, er: 18, icu: 2, waiting: 14, status: "high" },
  { name: "City Clinic", occ: 54, er: 4, icu: 0, waiting: 3, status: "ok" },
  { name: "Suburb Center", occ: 88, er: 9, icu: 1, waiting: 11, status: "high" },
];

export default function CommandCenterPage() {
  const [tick, setTick] = useState(0);
  const [connected, setConnected] = useState(true);

  // Simulated realtime stream (§4.3.3)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const jitter = (base: number) => Math.max(0, Math.min(100, base + ((tick * 7 + base) % 5) - 2));

  return (
    <div className="min-h-full bg-ink text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold">Command Center · Digital Twin</h1>
          <p className="text-sm text-white/60">Network-wide live operations</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setConnected((c) => !c)} className={cn("flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-bold", connected ? "bg-success/20 text-success" : "bg-warning/20 text-warning")}>
            {connected ? <><Radio className="h-3 w-3 animate-pulse" /> Live</> : <><Wifi className="h-3 w-3" /> Reconnecting…</>}
          </button>
          <span className="text-xs text-white/50">Updated {connected ? "just now" : "18s ago (stale)"}</span>
        </div>
      </div>

      <div className="space-y-6 p-4 sm:p-6">
        {/* Network KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: BedDouble, label: "Network occupancy", value: `${jitter(78)}%`, tone: "text-teal" },
            { icon: Activity, label: "ER patients", value: `${43 + (tick % 4)}`, tone: "text-warning" },
            { icon: Ambulance, label: "Ambulances en route", value: `${3 + (tick % 2)}`, tone: "text-clinical" },
            { icon: Users, label: "Staff on shift", value: "284", tone: "text-success" },
          ].map((k) => (
            <div key={k.label} className="rounded-card border border-white/10 bg-white/[0.03] p-4">
              <k.icon className={cn("h-5 w-5", k.tone)} />
              <p className="mt-2 font-heading text-3xl font-extrabold">{k.value}</p>
              <p className="text-xs text-white/50">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Alert storm */}
        <div className="flex items-center gap-3 rounded-card border border-critical/40 bg-critical/[0.12] px-4 py-3">
          <TriangleAlert className="h-5 w-5 text-critical" />
          <p className="text-sm font-semibold">Surge alert: North Wing ER at 92% capacity. 2 transfers recommended to Main Campus.</p>
        </div>

        {/* Branch grid */}
        <div className="grid gap-4 lg:grid-cols-2">
          {branches.map((b) => (
            <div key={b.name} className="rounded-card border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold">{b.name}</h3>
                <StatusChip status={b.status === "high" ? "error" : "success"}>{b.status === "high" ? "High load" : "Normal"}</StatusChip>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3 text-center">
                {[["Occupancy", `${jitter(b.occ)}%`], ["ER", `${b.er}`], ["ICU free", `${b.icu}`], ["Waiting", `${b.waiting}`]].map(([l, v]) => (
                  <div key={l}>
                    <p className="font-heading text-xl font-extrabold">{v}</p>
                    <p className="text-[11px] text-white/50">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className={cn("h-full rounded-full transition-all", b.occ > 85 ? "bg-critical" : "bg-teal")} style={{ width: `${jitter(b.occ)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
