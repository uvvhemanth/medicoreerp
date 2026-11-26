"use client";

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Point {
  date: string;
  value: number;
}

const fmtDay = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
const fmtNum = (n: number) => n.toLocaleString("en-IN");

function ChartTooltip({ active, payload, label, unit }: { active?: boolean; payload?: { value: number }[]; label?: string; unit: string }) {
  if (!active || !payload?.length || !label) return null;
  return (
    <div className="rounded-lg border bg-card px-3 py-2 text-sm shadow-card">
      <div className="flex items-center gap-2">
        <span className="h-0.5 w-3 rounded bg-teal" aria-hidden />
        <span className="font-bold text-heading">{fmtNum(payload[0].value)}</span>
        <span className="text-muted">{unit}</span>
      </div>
      <div className="mt-0.5 text-xs text-muted">{fmtDay(label)}</div>
    </div>
  );
}

/** Single-series daily trend: 2px line, crosshair tooltip, and a table view. */
export function TrendChart({
  data,
  unit,
  title,
  variant = "line",
}: {
  data: Point[];
  unit: string;
  title: string;
  /** "bar" suits small whole-number counts, where a line implies values in between. */
  variant?: "line" | "bar";
}) {
  return (
    <figure>
      <div className="h-56 w-full" role="img" aria-label={`${title}: daily ${unit}`}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -12 }} barCategoryGap={2}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tickFormatter={fmtDay}
              interval="preserveStartEnd"
              minTickGap={28}
              tick={{ fontSize: 12, fill: "var(--text-muted)" }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              width={48}
              tick={{ fontSize: 12, fill: "var(--text-muted)" }}
              tickFormatter={fmtNum}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={
                variant === "bar"
                  ? { fill: "color-mix(in srgb, var(--brand-teal) 10%, transparent)" }
                  : { stroke: "var(--text-muted)", strokeWidth: 1 }
              }
              content={<ChartTooltip unit={unit} />}
            />
            {variant === "bar" ? (
              <Bar dataKey="value" fill="var(--brand-teal)" radius={[4, 4, 0, 0]} maxBarSize={28} isAnimationActive={false} />
            ) : (
              <Line
                type="linear"
                dataKey="value"
                stroke="var(--brand-teal)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: "var(--card)", strokeWidth: 2, fill: "var(--brand-teal)" }}
                isAnimationActive={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <details className="mt-2 text-sm">
        <summary className="cursor-pointer text-muted hover:text-heading">Show data table</summary>
        <div className="mt-2 max-h-56 overflow-auto rounded-lg border">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-card text-xs text-muted">
              <tr>
                <th className="px-3 py-2 font-semibold">Date</th>
                <th className="px-3 py-2 text-right font-semibold capitalize">{unit}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.date} className="border-t">
                  <td className="px-3 py-1.5 text-body">{fmtDay(p.date)}</td>
                  <td className="px-3 py-1.5 text-right font-semibold tabular-nums text-heading">{fmtNum(p.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
