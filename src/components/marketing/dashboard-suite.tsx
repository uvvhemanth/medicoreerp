"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { HisDashboard } from "@/components/marketing/his-dashboard";
import { cn } from "@/lib/utils";
import {
  Activity, BedDouble, CalendarDays, ClipboardList, IndianRupee,
  Users, AlertTriangle, TrendingUp, Stethoscope, Pill,
} from "lucide-react";

const TABS = [
  { id: "modules", label: "Module Home" },
  { id: "ops", label: "Operations" },
  { id: "clinical", label: "Clinical Today" },
  { id: "revenue", label: "Revenue" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const OPD_SERIES = [
  { hour: "8a", patients: 18 },
  { hour: "9a", patients: 42 },
  { hour: "10a", patients: 55 },
  { hour: "11a", patients: 48 },
  { hour: "12p", patients: 30 },
  { hour: "1p", patients: 22 },
  { hour: "2p", patients: 39 },
  { hour: "3p", patients: 44 },
  { hour: "4p", patients: 36 },
];

const REVENUE_SERIES = [
  { day: "Mon", collections: 4.2, denials: 0.4 },
  { day: "Tue", collections: 5.1, denials: 0.3 },
  { day: "Wed", collections: 4.8, denials: 0.5 },
  { day: "Thu", collections: 5.6, denials: 0.2 },
  { day: "Fri", collections: 6.1, denials: 0.35 },
  { day: "Sat", collections: 3.4, denials: 0.15 },
];

const BED_WARDS = [
  { ward: "General", occupied: 42, total: 50 },
  { ward: "ICU", occupied: 11, total: 12 },
  { ward: "Maternity", occupied: 18, total: 24 },
  { ward: "Pediatric", occupied: 14, total: 20 },
  { ward: "OT Recovery", occupied: 6, total: 8 },
];

const QUEUE = [
  { doctor: "Dr. Menon · Medicine", waiting: 7, next: "Token 24" },
  { doctor: "Dr. Iyer · Ortho", waiting: 4, next: "Token 11" },
  { doctor: "Dr. Rao · Pediatrics", waiting: 9, next: "Token 31" },
  { doctor: "Dr. Khan · ENT", waiting: 3, next: "Token 08" },
];

const CLINICAL_TASKS = [
  { title: "Pending lab results", count: 23, href: "/product/lab", tone: "amber" },
  { title: "Unsigned OPD notes", count: 8, href: "/product/emr", tone: "red" },
  { title: "Pharmacy pending dispense", count: 15, href: "/product/pharmacy", tone: "teal" },
  { title: "Radiology to report", count: 6, href: "/product/radiology", tone: "blue" },
];

function ChartBox({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) {
    return <div className="grid h-full place-items-center text-xs text-muted">Loading chart…</div>;
  }
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={180}>
      {children as React.ReactElement}
    </ResponsiveContainer>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  hint,
  tone = "teal",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
  tone?: "teal" | "blue" | "green" | "amber" | "red";
}) {
  const tones = {
    teal: "bg-teal/10 text-teal",
    blue: "bg-clinical/10 text-clinical",
    green: "bg-success/12 text-success",
    amber: "bg-warning/12 text-warning",
    red: "bg-danger/12 text-danger",
  };
  return (
    <div className="rounded-card border bg-card p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <span className={cn("grid h-10 w-10 place-items-center rounded-xl", tones[tone])}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-muted">{label}</p>
          <p className="font-heading text-2xl font-extrabold text-heading">{value}</p>
        </div>
      </div>
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[18px] border bg-[#eef2f5] shadow-pop dark:bg-surface">
      <div className="border-b bg-white px-4 py-3 dark:bg-card">
        <p className="font-heading text-sm font-bold text-heading">{title}</p>
        <p className="text-xs text-muted">Pacific Medical Center · live sample data</p>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function OpsDashboard() {
  return (
    <Frame title="Operations Command Center">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={Users} label="OPD today" value="312" hint="+18% vs yesterday" tone="teal" />
        <Kpi icon={BedDouble} label="Bed occupancy" value="86%" hint="91 / 106 beds" tone="blue" />
        <Kpi icon={AlertTriangle} label="ER waiting" value="7" hint="2 critical triage" tone="red" />
        <Kpi icon={Activity} label="OT utilization" value="74%" hint="6 theatres active" tone="green" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-card border bg-card p-4 shadow-soft">
          <p className="mb-3 text-sm font-bold text-heading">OPD footfall by hour</p>
          <div className="h-52 w-full min-w-0">
            <ChartBox>
              <BarChart data={OPD_SERIES}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,48,56,0.08)" />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="patients" fill="#0E8388" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartBox>
          </div>
        </div>

        <div className="rounded-card border bg-card p-4 shadow-soft">
          <p className="mb-3 text-sm font-bold text-heading">Ward bed board</p>
          <ul className="space-y-3">
            {BED_WARDS.map((w) => {
              const pct = Math.round((w.occupied / w.total) * 100);
              return (
                <li key={w.ward}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-semibold text-heading">{w.ward}</span>
                    <span className="text-muted">
                      {w.occupied}/{w.total} · {pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-mist">
                    <div
                      className={cn("h-full rounded-full", pct >= 90 ? "bg-danger" : "bg-teal")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

function ClinicalDashboard() {
  return (
    <Frame title="Clinical Today">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={CalendarDays} label="Appointments today" value="186" hint="24 teleconsults" />
        <Kpi icon={Stethoscope} label="Consults completed" value="141" hint="45 in progress" tone="blue" />
        <Kpi icon={ClipboardList} label="Orders pending" value="52" hint="Lab + radiology" tone="amber" />
        <Kpi icon={Pill} label="eMAR due next hour" value="38" hint="Nurse station" tone="green" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-card border bg-card p-4 shadow-soft">
          <p className="mb-3 text-sm font-bold text-heading">OPD queues</p>
          <ul className="divide-y">
            {QUEUE.map((q) => (
              <li key={q.doctor} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-heading">{q.doctor}</p>
                  <p className="text-xs text-muted">Next: {q.next}</p>
                </div>
                <span className="rounded-pill bg-teal/10 px-2.5 py-1 text-xs font-bold text-teal">
                  {q.waiting} waiting
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card border bg-card p-4 shadow-soft">
          <p className="mb-3 text-sm font-bold text-heading">Worklist alerts</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {CLINICAL_TASKS.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="rounded-xl border bg-mist/40 p-3 transition hover:border-teal/40 hover:bg-white dark:hover:bg-card"
              >
                <p className="text-2xl font-extrabold text-heading">{t.count}</p>
                <p className="mt-1 text-xs font-semibold text-muted">{t.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function RevenueDashboard() {
  return (
    <Frame title="Revenue Snapshot">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={IndianRupee} label="Collections today" value="₹6.1L" hint="UPI 48% · Card 22%" tone="green" />
        <Kpi icon={TrendingUp} label="Clean claim rate" value="94%" hint="Target 95%" tone="teal" />
        <Kpi icon={AlertTriangle} label="Open denials" value="37" hint="₹2.4L at risk" tone="amber" />
        <Kpi icon={ClipboardList} label="Unbilled charges" value="19" hint="Capture before night close" tone="red" />
      </div>

      <div className="mt-5 rounded-card border bg-card p-4 shadow-soft">
        <p className="mb-3 text-sm font-bold text-heading">Collections vs denials (₹ lakhs)</p>
        <div className="h-56 w-full min-w-0">
          <ChartBox>
            <LineChart data={REVENUE_SERIES}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,48,56,0.08)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="collections" stroke="#0E8388" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="denials" stroke="#D64545" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ChartBox>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-teal" /> Collections
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-danger" /> Denials
          </span>
        </div>
      </div>
    </Frame>
  );
}

export function DashboardSuite() {
  const [tab, setTab] = useState<TabId>("modules");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-pill border px-4 py-2 text-sm font-bold transition",
              tab === t.id
                ? "border-teal bg-teal text-white"
                : "bg-card text-heading hover:border-teal/40",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "modules" && <HisDashboard />}
      {tab === "ops" && <OpsDashboard />}
      {tab === "clinical" && <ClinicalDashboard />}
      {tab === "revenue" && <RevenueDashboard />}
    </div>
  );
}
