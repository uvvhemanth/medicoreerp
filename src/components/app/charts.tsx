"use client";

import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";
import type { VitalPoint } from "@/lib/mock/types";

const teal = "#0E8388";
const blue = "#1B6EC2";
const amber = "#E0912F";
const green = "#1E9E63";
const red = "#D64545";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid rgba(16,48,56,0.1)",
  fontSize: 12,
  background: "var(--card)",
  color: "var(--text-heading)",
  boxShadow: "0 12px 40px rgba(16,48,56,0.14)",
};

export function VitalsChart({ data }: { data: VitalPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,48,56,0.06)" />
        <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--text-muted)" }} interval={3} />
        <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="hr" name="HR" stroke={teal} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="bp" name="BP (sys)" stroke={blue} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="spo2" name="SpO₂" stroke={green} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function TrendArea({ data, dataKey = "value", color = teal }: { data: { name: string; value: number }[]; dataKey?: string; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,48,56,0.06)" />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
        <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} fill={`url(#grad-${color})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarChartCard({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,48,56,0.06)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
        <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(14,131,136,0.06)" }} />
        <Bar dataKey="value" fill={teal} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const donutColors = [teal, blue, green, amber, red];
export function DonutCard({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} fill={donutColors[i % donutColors.length]} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
