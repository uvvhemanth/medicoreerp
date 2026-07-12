"use client";

import Link from "next/link";
import {
  DASHBOARD_MODULES,
  DASHBOARD_SIDEBAR,
  PATIENT_JOURNEY,
} from "@/lib/content/dashboard";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

/** Journey-first tiles for the home hero (matches reference layout). */
const HERO_MODULE_IDS = [
  "appointment",
  "registration",
  "clinical",
  "daycare",
  "er",
  "ot",
  "insurance",
  "phlebotomy",
  "lab",
  "bloodbank",
  "radiology",
  "inventory",
  "mis",
  "nurse",
  "setup",
  "discharge",
  "templates",
  "admin",
  "pharmacy",
  "billing",
  "ipd",
  "icu",
  "reminders",
  "clipboard",
] as const;

type Props = {
  /** Compact hero mock (default). Full page uses false. */
  compact?: boolean;
};

export function HisDashboard({ compact = false }: Props) {
  const modules = HERO_MODULE_IDS.map(
    (id) => DASHBOARD_MODULES.find((m) => m.id === id)!,
  ).filter(Boolean);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[18px] border bg-[#eef2f5] shadow-pop ring-1 ring-black/[0.06] dark:bg-surface dark:ring-white/[0.08]",
        compact && "max-h-[520px]",
      )}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-2 border-b bg-white px-3 py-2.5 dark:bg-card">
        <div className="flex items-center gap-2">
          <Logo showText={false} />
          <span className="font-heading text-sm font-extrabold text-heading">MedicoreERP HIS</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-pill border bg-[#f3faf7] px-2.5 py-1">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-success text-[9px] font-bold text-white">
            +
          </span>
          <span className="text-xs font-semibold text-heading">Pacific Medical Center</span>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold text-heading"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-clinical/20 text-[9px] font-bold text-clinical">
            AD
          </span>
          Admin
          <ChevronDown className="h-3 w-3 text-muted" />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="flex w-11 shrink-0 flex-col items-center gap-1 bg-[#0b3a5c] py-2 sm:w-12">
          {DASHBOARD_SIDEBAR.slice(0, compact ? 6 : 8).map((item, i) => {
            const Icon = item.icon;
            return (
              <span
                key={item.id}
                title={item.label}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-lg text-white/75",
                  i === 0 && "bg-teal text-white",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
            );
          })}
        </aside>

        {/* Tile grid — reference style */}
        <div className={cn("flex-1 overflow-y-auto p-3 sm:p-4", compact && "max-h-[440px]")}>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {modules.map((m) => {
              const Icon = m.icon;
              const step = PATIENT_JOURNEY.find((j) => j.moduleId === m.id)?.step;
              return (
                <Link
                  key={m.id}
                  href={m.href}
                  className="group flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-black/[0.04] bg-white p-2 text-center shadow-soft transition hover:-translate-y-0.5 hover:shadow-card dark:border-white/10 dark:bg-card"
                >
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl text-white shadow-soft sm:h-11 sm:w-11"
                    style={{ backgroundColor: m.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="line-clamp-2 px-0.5 text-[10px] font-bold leading-tight text-heading sm:text-[11px]">
                    {m.label}
                  </span>
                  {step && (
                    <span className="text-[9px] font-semibold text-muted">Step {step}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
