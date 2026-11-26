import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, Radio } from "lucide-react";
import { isAdminAuthorized } from "@/lib/admin-auth";
import {
  RANGES,
  analyticsReport,
  sampleReports,
  searchReport,
  setupStatus,
  type AnalyticsReport,
  type RangeDays,
  type Result,
  type Row,
  type SearchReport,
} from "@/lib/traffic";
import { TrendChart } from "@/components/admin/trend-chart";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "Website Traffic | MedicoreERP Admin" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

/* ------------------------------- Pieces --------------------------------- */

function Delta({ now, prev, days }: { now: number; prev: number; days: number }) {
  if (!prev && !now) return <p className="mt-1 text-xs text-muted">No data in either period</p>;
  if (!prev) return <p className="mt-1 text-xs text-muted">New — none in the previous {days} days</p>;
  const change = (now - prev) / prev;
  const Icon = change >= 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-muted">
      <Icon className="h-3.5 w-3.5" aria-hidden />
      <span className="font-semibold text-body">
        {change >= 0 ? "+" : ""}
        {(change * 100).toFixed(0)}%
      </span>
      vs previous {days} days
    </p>
  );
}

function Stat({ label, value, hint, children }: { label: string; value: string; hint?: string; children?: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-card border bg-card p-4 shadow-soft sm:p-5">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <p className="mt-1 font-heading text-2xl font-extrabold tabular-nums text-heading sm:text-3xl">{value}</p>
      {children}
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

function Card({ title, subtitle, children, className }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("min-w-0 rounded-card border bg-card p-5 shadow-soft", className)}>
      <h2 className="font-heading text-lg font-bold text-heading">{title}</h2>
      {subtitle ? <p className="mt-0.5 text-sm text-muted">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Ranked list with a proportional bar; the value is always printed. */
function BarList({ rows, valueLabel, secondaryLabel, empty }: { rows: Row[]; valueLabel: string; secondaryLabel?: string; empty: string }) {
  if (!rows.length) return <p className="text-sm text-muted">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <table className="w-full table-fixed text-sm">
      <thead className="sr-only">
        <tr>
          <th>Name</th>
          <th>{valueLabel}</th>
          {secondaryLabel ? <th>{secondaryLabel}</th> : null}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} className="group">
            <td className="py-1.5 pr-3">
              <div className="relative">
                <div
                  // The brand color is a CSS variable, so tint it with color-mix
                  // (Tailwind's /opacity shorthand cannot apply to a var()).
                  className="absolute inset-y-0 left-0 rounded bg-[color-mix(in_srgb,var(--brand-teal)_16%,transparent)] transition-colors group-hover:bg-[color-mix(in_srgb,var(--brand-teal)_28%,transparent)]"
                  style={{ width: `${Math.max(2, (r.value / max) * 100)}%` }}
                  aria-hidden
                />
                <span className="relative block truncate px-2 py-1 text-body" title={r.label}>
                  {r.label}
                </span>
              </div>
            </td>
            <td className="w-16 py-1.5 text-right font-semibold tabular-nums text-heading">{fmt(r.value)}</td>
            {secondaryLabel ? (
              <td className="w-20 py-1.5 text-right tabular-nums text-muted">{r.secondary !== undefined ? fmt(r.secondary) : "—"}</td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ColumnHeads({ value, secondary }: { value: string; secondary?: string }) {
  return (
    <div className="mb-1 flex justify-end gap-0 text-xs font-semibold text-muted" aria-hidden>
      <span className="w-16 text-right">{value}</span>
      {secondary ? <span className="w-20 text-right">{secondary}</span> : null}
    </div>
  );
}

function SourceError({ source, error }: { source: string; error: string }) {
  return (
    <div role="alert" className="rounded-card border border-[color:var(--status-danger)] bg-card p-5">
      <p className="font-semibold text-heading">Could not load {source}</p>
      <p className="mt-1 break-words text-sm text-body">{error}</p>
      <p className="mt-2 text-sm text-muted">
        Check that the service account email has been added as a user in {source}, and that the ID in the settings is correct.
      </p>
    </div>
  );
}

function Setup({ status }: { status: ReturnType<typeof setupStatus> }) {
  const item = (done: boolean, text: React.ReactNode) => (
    <li className="flex gap-2">
      <span className={cn("mt-0.5 font-bold", done ? "text-teal" : "text-muted")} aria-label={done ? "Done" : "To do"}>
        {done ? "✓" : "○"}
      </span>
      <span>{text}</span>
    </li>
  );
  return (
    <Card title="Connect Google Analytics and Search Console" subtitle="One-time setup. The dashboard fills in automatically once these settings are added.">
      <ol className="space-y-3 text-sm text-body [overflow-wrap:anywhere]">
        {item(
          status.serviceAccount,
          <>
            In <strong>Google Cloud Console</strong>, create a project, enable the <strong>Google Analytics Data API</strong> and the{" "}
            <strong>Google Search Console API</strong>, then create a <strong>service account</strong> and download a JSON key. Set{" "}
            <code>GOOGLE_SERVICE_ACCOUNT_EMAIL</code> and <code>GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</code> from that file.
          </>,
        )}
        {item(
          status.analytics,
          <>
            In <strong>Google Analytics → Admin → Property access management</strong>, add the service account email as a{" "}
            <strong>Viewer</strong>. Copy the numeric <strong>Property ID</strong> (Admin → Property details) into <code>GA4_PROPERTY_ID</code>.
          </>,
        )}
        {item(
          status.searchConsole,
          <>
            In <strong>Search Console → Settings → Users and permissions</strong>, add the service account email (Restricted is enough). Set{" "}
            <code>GSC_SITE_URL</code> to <code>sc-domain:medicoreerp.com</code> for a domain property, or <code>https://medicoreerp.com/</code> for a URL-prefix property.
          </>,
        )}
      </ol>
    </Card>
  );
}

/* -------------------------------- Page ---------------------------------- */

function parseRange(value: string | string[] | undefined): RangeDays {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return (RANGES as readonly number[]).includes(n) ? (n as RangeDays) : 28;
}

function isConfigured<T>(r: Result<T>) {
  return r.ok || r.error !== "not-configured";
}

export default async function TrafficDashboard({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // The proxy already challenges for a password; check again next to the data.
  if (!isAdminAuthorized((await headers()).get("authorization"))) notFound();

  const params = await searchParams;
  const days = parseRange(params.range);
  const status = setupStatus();
  const [liveGa, liveGsc] = await Promise.all([analyticsReport(days), searchReport(days)]);
  const needsSetup = !isConfigured(liveGa) || !isConfigured(liveGsc);

  // Sample data only stands in for a source that is not connected yet.
  const preview = needsSetup && params.preview === "1";
  const sample = preview ? sampleReports(days) : null;
  const ga: Result<AnalyticsReport> = sample && !isConfigured(liveGa) ? { ok: true, data: sample.ga } : liveGa;
  const gsc: Result<SearchReport> = sample && !isConfigured(liveGsc) ? { ok: true, data: sample.gsc } : liveGsc;
  const rangeHref = (r: number) => `/admin/traffic?range=${r}${preview ? "&preview=1" : ""}`;

  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/" className="text-sm font-semibold text-teal hover:underline">
              ← medicoreerp.com
            </Link>
            <h1 className="mt-1 font-heading text-3xl font-extrabold text-heading">Website traffic</h1>
            <p className="text-sm text-muted">Visitors, Google search clicks and leads for the last {days} days.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {ga.ok && ga.data.liveNow !== null ? (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-card px-3 py-1.5 text-sm text-body">
                <Radio className="h-4 w-4 text-teal" aria-hidden />
                <strong className="tabular-nums text-heading">{fmt(ga.data.liveNow)}</strong> on the site now
              </span>
            ) : null}
            <nav aria-label="Date range" className="inline-flex rounded-control border bg-card p-1">
              {RANGES.map((r) => (
                <Link
                  key={r}
                  href={rangeHref(r)}
                  aria-current={r === days ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap rounded-[10px] px-3 py-1.5 text-sm font-semibold",
                    r === days ? "bg-teal text-white" : "text-body hover:bg-mist",
                  )}
                >
                  {r} days
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {preview ? (
          <div role="status" className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-card border-2 border-dashed border-teal bg-card p-4">
            <p className="text-sm text-body">
              <strong className="text-heading">Sample data — these are not your real numbers.</strong> Connect Google below to see real traffic.
            </p>
            <Link href={`/admin/traffic?range=${days}`} className="text-sm font-semibold text-teal hover:underline">
              Hide sample data
            </Link>
          </div>
        ) : null}

        {needsSetup ? (
          <div className="mt-6">
            <Setup status={status} />
            {!preview ? (
              <p className="mt-3 text-sm text-muted">
                Want to see the layout first?{" "}
                <Link href={`/admin/traffic?range=${days}&preview=1`} className="font-semibold text-teal hover:underline">
                  Preview with sample data
                </Link>
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Headline numbers */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {ga.ok ? (
            <>
              <Stat label="Visitors" value={fmt(ga.data.visitors)}>
                <Delta now={ga.data.visitors} prev={ga.data.visitorsPrev} days={days} />
              </Stat>
              <Stat label="Leads (form submissions)" value={fmt(ga.data.leads)}>
                <Delta now={ga.data.leads} prev={ga.data.leadsPrev} days={days} />
              </Stat>
            </>
          ) : null}
          {gsc.ok ? (
            <>
              <Stat label="Clicks from Google search" value={fmt(gsc.data.clicks)}>
                <Delta now={gsc.data.clicks} prev={gsc.data.clicksPrev} days={days} />
              </Stat>
              <Stat label="Shown in Google search" value={fmt(gsc.data.impressions)} hint="Impressions">
                <Delta now={gsc.data.impressions} prev={gsc.data.impressionsPrev} days={days} />
              </Stat>
            </>
          ) : null}
        </div>

        {ga.ok || gsc.ok ? (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {ga.ok ? (
              <>
                <Stat label="Sessions" value={fmt(ga.data.sessions)} />
                <Stat label="Page views" value={fmt(ga.data.pageViews)} />
              </>
            ) : null}
            {gsc.ok ? (
              <>
                <Stat label="Google click-through rate" value={pct(gsc.data.ctr)} hint="Clicks ÷ times shown" />
                <Stat label="Average Google position" value={gsc.data.position ? gsc.data.position.toFixed(1) : "—"} hint="Lower is better (1 = top result)" />
              </>
            ) : null}
          </div>
        ) : null}

        {/* Errors for a source that is configured but failing */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {!ga.ok && ga.error !== "not-configured" ? <SourceError source="Google Analytics" error={ga.error} /> : null}
          {!gsc.ok && gsc.error !== "not-configured" ? <SourceError source="Search Console" error={gsc.error} /> : null}
        </div>

        {/* Trends: one measure per chart, never two y-axes */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {ga.ok ? (
            <Card title="Visitors per day">
              <TrendChart data={ga.data.visitorsByDay} unit="visitors" title="Visitors per day" />
            </Card>
          ) : null}
          {gsc.ok ? (
            <Card title="Clicks from Google per day" subtitle="Search Console data arrives 2–3 days late.">
              <TrendChart data={gsc.data.clicksByDay} unit="clicks" title="Google clicks per day" />
            </Card>
          ) : null}
          {ga.ok ? (
            <Card title="Leads per day" subtitle="Demo, contact and booking form submissions.">
              <TrendChart data={ga.data.leadsByDay} unit="leads" title="Leads per day" variant="bar" />
            </Card>
          ) : null}
          {ga.ok ? (
            <Card title="Where leads come from">
              <ColumnHeads value="Leads" />
              <BarList rows={ga.data.leadSources} valueLabel="Leads" empty="No leads recorded in this period yet." />
            </Card>
          ) : null}
        </div>

        {/* Breakdown lists */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {gsc.ok ? (
            <Card title="Searches for your brand" subtitle="Google searches containing “medicore”.">
              <ColumnHeads value="Clicks" secondary="Shown" />
              <BarList
                rows={gsc.data.brandQueries}
                valueLabel="Clicks"
                secondaryLabel="Shown"
                empty="No brand searches yet. Google may not have indexed the site for “medicoreerp” yet; request indexing in Search Console."
              />
            </Card>
          ) : null}
          {gsc.ok ? (
            <Card title="Top Google searches">
              <ColumnHeads value="Clicks" secondary="Shown" />
              <BarList rows={gsc.data.topQueries} valueLabel="Clicks" secondaryLabel="Shown" empty="No search data for this period yet." />
            </Card>
          ) : null}
          {ga.ok ? (
            <Card title="Where visitors come from">
              <ColumnHeads value="Sessions" />
              <BarList rows={ga.data.channels} valueLabel="Sessions" empty="No visits recorded in this period." />
            </Card>
          ) : null}
          {ga.ok ? (
            <Card title="Most viewed pages">
              <ColumnHeads value="Views" secondary="Visitors" />
              <BarList rows={ga.data.topPages} valueLabel="Views" secondaryLabel="Visitors" empty="No page views recorded in this period." />
            </Card>
          ) : null}
          {gsc.ok ? (
            <Card title="Pages people open from Google" className="lg:col-span-2">
              <ColumnHeads value="Clicks" secondary="Shown" />
              <BarList rows={gsc.data.topPages} valueLabel="Clicks" secondaryLabel="Shown" empty="No pages have received Google clicks yet." />
            </Card>
          ) : null}
        </div>
      </div>
    </main>
  );
}
