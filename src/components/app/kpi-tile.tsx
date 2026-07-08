import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { KPI } from "@/lib/mock/types";

function Sparkline({ data, tone }: { data: number[]; tone: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-24" preserveAspectRatio="none" aria-hidden>
      <polyline points={pts} fill="none" stroke={tone} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const toneColor: Record<string, string> = {
  teal: "var(--brand-teal)",
  green: "var(--status-success)",
  amber: "var(--status-warning)",
  red: "var(--status-danger)",
  blue: "var(--brand-clinical-blue)",
};

export function KPITile({ kpi }: { kpi: KPI }) {
  const color = toneColor[kpi.tone ?? "teal"];
  const positive = kpi.delta >= 0;
  return (
    <div className="rounded-card border bg-card p-5 shadow-soft transition hover:shadow-card">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted">{kpi.label}</p>
        <Sparkline data={kpi.trend} tone={color} />
      </div>
      <div className="mt-2 flex items-end justify-between">
        <p className="font-heading text-3xl font-extrabold text-heading">{kpi.value}</p>
        <span className={cn("flex items-center gap-0.5 rounded-pill px-2 py-0.5 text-xs font-bold", positive ? "bg-success/12 text-success" : "bg-danger/12 text-danger")}>
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(kpi.delta)}%
        </span>
      </div>
    </div>
  );
}
