"use client";

import { useState } from "react";
import { useQuery } from "@/hooks/use-query";
import { api } from "@/lib/data/adapter";
import { PageHeader } from "@/components/app/page-header";
import { KPITile } from "@/components/app/kpi-tile";
import { DataState, CardsSkeleton } from "@/components/app/data-state";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendArea, BarChartCard, DonutCard } from "@/components/app/charts";
import { Sparkles, Send, Download } from "lucide-react";

const revenueTrend = [
  { name: "Jan", value: 30 }, { name: "Feb", value: 33 }, { name: "Mar", value: 35 },
  { name: "Apr", value: 38 }, { name: "May", value: 40 }, { name: "Jun", value: 43 },
];
const deptRevenue = [
  { name: "Cardio", value: 42 }, { name: "Ortho", value: 35 }, { name: "General", value: 28 },
  { name: "Pediatric", value: 18 }, { name: "OB-GYN", value: 24 },
];
const payerMix = [
  { name: "Self-pay", value: 30 }, { name: "Star Health", value: 25 }, { name: "CGHS", value: 20 },
  { name: "HDFC Ergo", value: 15 }, { name: "Others", value: 10 },
];

export default function AnalyticsPage() {
  const kpis = useQuery("kpis", () => api.kpis());
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setAnswer(`Interpreted: "${query}" → generated a bar chart of revenue by department for the last 30 days, with row-level security applied. (Demo answer.)`);
  };

  return (
    <>
      <PageHeader
        title="Analytics"
        breadcrumbs={[{ label: "Insight" }, { label: "Analytics" }]}
        subtitle="Real-time dashboards — streaming, not overnight batch."
        actions={<Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>}
      />

      <div className="space-y-6 p-4 sm:p-6">
        {/* NL query bar */}
        <form onSubmit={ask} className="rounded-card border-2 border-teal/20 bg-gradient-to-r from-teal/[0.04] to-clinical/[0.03] p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 shrink-0 text-teal" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask your hospital data… e.g. 'revenue by department last month'" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted" />
            <Button type="submit" size="sm"><Send className="h-4 w-4" /> Ask</Button>
          </div>
          {answer && <p className="mt-3 rounded-lg bg-card p-3 text-sm text-body animate-fade-in">{answer}</p>}
        </form>

        {/* KPIs */}
        <DataState {...kpis} loading={<CardsSkeleton count={6} />} onRetry={kpis.refetch}>
          {(data) => (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((k) => <KPITile key={k.label} kpi={k} />)}
            </div>
          )}
        </DataState>

        {/* Charts */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Revenue trend (₹L)</CardTitle></CardHeader>
            <CardBody><TrendArea data={revenueTrend} /></CardBody>
          </Card>
          <Card>
            <CardHeader><CardTitle>Revenue by department (₹L)</CardTitle></CardHeader>
            <CardBody><BarChartCard data={deptRevenue} /></CardBody>
          </Card>
          <Card>
            <CardHeader><CardTitle>Payer mix</CardTitle></CardHeader>
            <CardBody><DonutCard data={payerMix} /></CardBody>
          </Card>
          <Card>
            <CardHeader><CardTitle>OPD footfall trend</CardTitle></CardHeader>
            <CardBody><TrendArea data={[{ name: "Mon", value: 280 }, { name: "Tue", value: 320 }, { name: "Wed", value: 300 }, { name: "Thu", value: 342 }, { name: "Fri", value: 360 }, { name: "Sat", value: 410 }]} color="#1B6EC2" /></CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
