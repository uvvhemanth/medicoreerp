import { googlePost, serviceAccountConfigured } from "@/lib/google-api";

/** Traffic reports from Google Analytics 4 and Google Search Console. Server-only. */

const GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

export const RANGES = [7, 28, 90] as const;
export type RangeDays = (typeof RANGES)[number];

export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

export interface Point {
  date: string; // YYYY-MM-DD
  value: number;
}
export interface Row {
  label: string;
  value: number;
  secondary?: number;
}

export interface AnalyticsReport {
  visitors: number;
  visitorsPrev: number;
  sessions: number;
  sessionsPrev: number;
  pageViews: number;
  pageViewsPrev: number;
  leads: number;
  leadsPrev: number;
  liveNow: number | null;
  visitorsByDay: Point[];
  leadsByDay: Point[];
  channels: Row[];
  topPages: Row[];
  leadSources: Row[];
}

export interface SearchReport {
  clicks: number;
  clicksPrev: number;
  impressions: number;
  impressionsPrev: number;
  ctr: number;
  position: number;
  clicksByDay: Point[];
  topQueries: Row[];
  topPages: Row[];
  brandQueries: Row[];
}

export function setupStatus() {
  return {
    serviceAccount: serviceAccountConfigured(),
    analytics: Boolean(process.env.GA4_PROPERTY_ID),
    searchConsole: Boolean(process.env.GSC_SITE_URL),
  };
}

function errorMessage(e: unknown) {
  return e instanceof Error ? e.message : String(e);
}

function isoDay(offsetDays: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}

/** Fill missing days with zero so lines don't skip gaps. */
function fillDays(points: Point[], startOffset: number, endOffset: number): Point[] {
  const byDate = new Map(points.map((p) => [p.date, p.value]));
  const out: Point[] = [];
  for (let o = startOffset; o >= endOffset; o--) {
    const date = isoDay(o);
    out.push({ date, value: byDate.get(date) ?? 0 });
  }
  return out;
}

/* ---------------------------- Google Analytics ---------------------------- */

interface GaRow {
  dimensionValues?: { value: string }[];
  metricValues?: { value: string }[];
}
interface GaReport {
  rows?: GaRow[];
}

const num = (v: string | undefined) => Number(v ?? 0) || 0;
const gaDate = (v: string) => `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;

export async function analyticsReport(days: RangeDays): Promise<Result<AnalyticsReport>> {
  const property = process.env.GA4_PROPERTY_ID;
  if (!serviceAccountConfigured() || !property) return { ok: false, error: "not-configured" };

  const base = `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(property)}`;
  const current = { startDate: `${days - 1}daysAgo`, endDate: "today" };
  const previous = { startDate: `${days * 2 - 1}daysAgo`, endDate: `${days}daysAgo` };
  const leadFilter = {
    filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: "generate_lead" } },
  };

  try {
    const [batch, leadsBatch, realtime] = await Promise.all([
      googlePost<{ reports: GaReport[] }>(`${base}:batchRunReports`, GA_SCOPE, {
        requests: [
          // 0: totals for current and previous period
          {
            dateRanges: [current, previous],
            metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }],
          },
          // 1: visitors per day
          {
            dateRanges: [current],
            dimensions: [{ name: "date" }],
            metrics: [{ name: "activeUsers" }],
            orderBys: [{ dimension: { dimensionName: "date" } }],
          },
          // 2: traffic channels
          {
            dateRanges: [current],
            dimensions: [{ name: "sessionDefaultChannelGroup" }],
            metrics: [{ name: "sessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 8,
          },
          // 3: top pages
          {
            dateRanges: [current],
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
            orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
            limit: 10,
          },
        ],
      }),
      googlePost<{ reports: GaReport[] }>(`${base}:batchRunReports`, GA_SCOPE, {
        requests: [
          // 0: leads current vs previous
          {
            dateRanges: [current, previous],
            metrics: [{ name: "eventCount" }],
            dimensionFilter: leadFilter,
          },
          // 1: leads per day
          {
            dateRanges: [current],
            dimensions: [{ name: "date" }],
            metrics: [{ name: "eventCount" }],
            dimensionFilter: leadFilter,
            orderBys: [{ dimension: { dimensionName: "date" } }],
          },
          // 2: where leads come from
          {
            dateRanges: [current],
            dimensions: [{ name: "sessionDefaultChannelGroup" }],
            metrics: [{ name: "eventCount" }],
            dimensionFilter: leadFilter,
            orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
            limit: 8,
          },
        ],
      }),
      googlePost<GaReport>(`${base}:runRealtimeReport`, GA_SCOPE, {
        metrics: [{ name: "activeUsers" }],
      }).catch(() => null),
    ]);

    const [totals, byDay, channels, pages] = batch.reports;
    const [leadTotals, leadsDay, leadChannels] = leadsBatch.reports;

    // With two date ranges GA labels each row "date_range_0" (current) or
    // "date_range_1" (previous). A range with no data has no row.
    const rangeRow = (report: GaReport, range: "date_range_0" | "date_range_1") =>
      report.rows?.find((r) => r.dimensionValues?.[0]?.value === range);
    const cur = rangeRow(totals, "date_range_0");
    const prev = rangeRow(totals, "date_range_1");
    const leadCur = rangeRow(leadTotals, "date_range_0");
    const leadPrev = rangeRow(leadTotals, "date_range_1");

    const toPoints = (report: GaReport) =>
      (report.rows ?? []).map((r) => ({ date: gaDate(r.dimensionValues![0].value), value: num(r.metricValues?.[0]?.value) }));
    const toRows = (report: GaReport): Row[] =>
      (report.rows ?? []).map((r) => ({
        label: r.dimensionValues?.[0]?.value || "(not set)",
        value: num(r.metricValues?.[0]?.value),
        secondary: r.metricValues?.[1] ? num(r.metricValues[1].value) : undefined,
      }));

    return {
      ok: true,
      data: {
        visitors: num(cur?.metricValues?.[0]?.value),
        visitorsPrev: num(prev?.metricValues?.[0]?.value),
        sessions: num(cur?.metricValues?.[1]?.value),
        sessionsPrev: num(prev?.metricValues?.[1]?.value),
        pageViews: num(cur?.metricValues?.[2]?.value),
        pageViewsPrev: num(prev?.metricValues?.[2]?.value),
        leads: num(leadCur?.metricValues?.[0]?.value),
        leadsPrev: num(leadPrev?.metricValues?.[0]?.value),
        liveNow: realtime ? num(realtime.rows?.[0]?.metricValues?.[0]?.value) : null,
        visitorsByDay: fillDays(toPoints(byDay), days - 1, 0),
        leadsByDay: fillDays(toPoints(leadsDay), days - 1, 0),
        channels: toRows(channels),
        topPages: toRows(pages),
        leadSources: toRows(leadChannels),
      },
    };
  } catch (e) {
    return { ok: false, error: errorMessage(e) };
  }
}

/* ------------------------- Google Search Console -------------------------- */

interface GscRow {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

// Search Console data arrives 2-3 days late, so ranges end 2 days ago.
const GSC_LAG_DAYS = 2;

export async function searchReport(days: RangeDays): Promise<Result<SearchReport>> {
  const site = process.env.GSC_SITE_URL;
  if (!serviceAccountConfigured() || !site) return { ok: false, error: "not-configured" };

  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const end = GSC_LAG_DAYS;
  const start = GSC_LAG_DAYS + days - 1;
  const range = { startDate: isoDay(start), endDate: isoDay(end) };
  const prevRange = { startDate: isoDay(start + days), endDate: isoDay(end + days) };
  const q = (body: object) => googlePost<{ rows?: GscRow[] }>(url, GSC_SCOPE, { ...range, ...body }).then((r) => r.rows ?? []);

  try {
    const [totals, prevTotals, byDay, queries, pages, brand] = await Promise.all([
      q({}),
      googlePost<{ rows?: GscRow[] }>(url, GSC_SCOPE, prevRange).then((r) => r.rows ?? []),
      q({ dimensions: ["date"], rowLimit: 500 }),
      q({ dimensions: ["query"], rowLimit: 10 }),
      q({ dimensions: ["page"], rowLimit: 10 }),
      q({
        dimensions: ["query"],
        rowLimit: 10,
        dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "contains", expression: "medicore" }] }],
      }),
    ]);

    const t = totals[0];
    const p = prevTotals[0];
    const toRows = (rows: GscRow[], strip?: RegExp) =>
      rows.map((r) => {
        const key = r.keys?.[0] ?? "";
        return { label: (strip ? key.replace(strip, "") : key) || "/", value: r.clicks, secondary: r.impressions };
      });

    return {
      ok: true,
      data: {
        clicks: t?.clicks ?? 0,
        clicksPrev: p?.clicks ?? 0,
        impressions: t?.impressions ?? 0,
        impressionsPrev: p?.impressions ?? 0,
        ctr: t?.ctr ?? 0,
        position: t?.position ?? 0,
        clicksByDay: fillDays(
          byDay.map((r) => ({ date: r.keys![0], value: r.clicks })),
          start,
          end,
        ),
        topQueries: toRows(queries),
        topPages: toRows(pages, /^https?:\/\/[^/]+/),
        brandQueries: toRows(brand),
      },
    };
  } catch (e) {
    return { ok: false, error: errorMessage(e) };
  }
}

/* ------------------------------ Sample data ------------------------------- */

/** Deterministic pseudo-random sequence so the preview is stable. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function sampleSeries(days: number, endOffset: number, base: number, seed: number): Point[] {
  const rand = seeded(seed);
  return fillDays([], days - 1 + endOffset, endOffset).map((p, i) => {
    const weekday = new Date(`${p.date}T00:00:00Z`).getUTCDay();
    const weekend = weekday === 0 || weekday === 6 ? 0.6 : 1;
    const growth = 1 + (i / days) * 0.35;
    return { ...p, value: Math.round(base * weekend * growth * (0.8 + rand() * 0.4)) };
  });
}

const sum = (pts: Point[]) => pts.reduce((t, p) => t + p.value, 0);

/** Illustrative numbers for previewing the layout before Google is connected. */
export function sampleReports(days: RangeDays): { ga: AnalyticsReport; gsc: SearchReport } {
  const visitorsByDay = sampleSeries(days, 0, 42, 7);
  const leadsByDay = sampleSeries(days, 0, 1.4, 11);
  const clicksByDay = sampleSeries(days, GSC_LAG_DAYS, 14, 3);
  const visitors = sum(visitorsByDay);
  const leads = sum(leadsByDay);
  const clicks = sum(clicksByDay);
  const scale = (n: number) => Math.round(n * (days / 28));
  return {
    ga: {
      visitors,
      visitorsPrev: Math.round(visitors * 0.82),
      sessions: Math.round(visitors * 1.3),
      sessionsPrev: Math.round(visitors * 1.08),
      pageViews: Math.round(visitors * 3.1),
      pageViewsPrev: Math.round(visitors * 2.6),
      leads,
      leadsPrev: Math.round(leads * 0.7),
      liveNow: 3,
      visitorsByDay,
      leadsByDay,
      channels: [
        { label: "Organic Search", value: scale(610) },
        { label: "Direct", value: scale(380) },
        { label: "Referral", value: scale(120) },
        { label: "Organic Social", value: scale(95) },
        { label: "Paid Search", value: scale(60) },
      ],
      topPages: [
        { label: "/", value: scale(820), secondary: scale(540) },
        { label: "/solutions/hospital-management-software", value: scale(310), secondary: scale(240) },
        { label: "/demo", value: scale(260), secondary: scale(190) },
        { label: "/resources/blog/what-is-hospital-management-system", value: scale(180), secondary: scale(150) },
        { label: "/solutions/clinic-management-software", value: scale(140), secondary: scale(110) },
        { label: "/contact", value: scale(95), secondary: scale(80) },
      ],
      leadSources: [
        { label: "Organic Search", value: Math.round(leads * 0.55) },
        { label: "Direct", value: Math.round(leads * 0.3) },
        { label: "Referral", value: Math.round(leads * 0.15) },
      ],
    },
    gsc: {
      clicks,
      clicksPrev: Math.round(clicks * 0.75),
      impressions: clicks * 24,
      impressionsPrev: Math.round(clicks * 20),
      ctr: 1 / 24,
      position: 18.4,
      clicksByDay,
      topQueries: [
        { label: "medicoreerp", value: scale(120), secondary: scale(180) },
        { label: "hospital management system hyderabad", value: scale(42), secondary: scale(1900) },
        { label: "medicore erp", value: scale(30), secondary: scale(55) },
        { label: "clinic management software hyderabad", value: scale(22), secondary: scale(860) },
        { label: "what is hospital management system", value: scale(15), secondary: scale(2400) },
      ],
      topPages: [
        { label: "/", value: scale(190), secondary: scale(2600) },
        { label: "/solutions/hospital-management-software", value: scale(60), secondary: scale(3100) },
        { label: "/resources/blog/what-is-hospital-management-system", value: scale(25), secondary: scale(2700) },
      ],
      brandQueries: [
        { label: "medicoreerp", value: scale(120), secondary: scale(180) },
        { label: "medicore erp", value: scale(30), secondary: scale(55) },
        { label: "medicoreerp.com", value: scale(8), secondary: scale(12) },
      ],
    },
  };
}
