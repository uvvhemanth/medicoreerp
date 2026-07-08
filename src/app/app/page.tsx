"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { useQuery } from "@/hooks/use-query";
import { api } from "@/lib/data/adapter";
import { PageHeader } from "@/components/app/page-header";
import { KPITile } from "@/components/app/kpi-tile";
import { DataState, CardsSkeleton } from "@/components/app/data-state";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { StatusChip } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tasks, notifications } from "@/lib/mock/data";
import { ArrowRight, CalendarClock, UserPlus, FileWarning, Activity, Sparkles } from "lucide-react";

const quickActions = [
  { label: "Register patient", href: "/app/register-patient", icon: UserPlus },
  { label: "Appointments", href: "/app/appointments", icon: CalendarClock },
  { label: "Denial queue", href: "/app/rcm/denials", icon: FileWarning },
  { label: "Bed board", href: "/app/ipd/bed-board", icon: Activity },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const kpis = useQuery("kpis", () => api.kpis());
  const appts = useQuery("appts", () => api.appointments());
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <PageHeader
        title={`${greeting}, ${user?.name?.split(" ")[0] ?? "there"}`}
        subtitle="Here's what needs your attention today."
        actions={<Button asChild><Link href="/app/register-patient"><UserPlus className="h-4 w-4" /> New patient</Link></Button>}
      />

      <div className="space-y-6 p-4 sm:p-6">
        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((a) => (
            <Link key={a.href} href={a.href} className="group flex items-center gap-3 rounded-card border bg-card p-4 shadow-soft transition hover:border-teal/40 hover:shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal/10 text-teal"><a.icon className="h-5 w-5" /></div>
              <span className="flex-1 text-sm font-semibold text-heading">{a.label}</span>
              <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-teal" />
            </Link>
          ))}
        </div>

        {/* KPIs */}
        <DataState {...kpis} loading={<CardsSkeleton count={6} />} onRetry={kpis.refetch}>
          {(data) => (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((k) => <KPITile key={k.label} kpi={k} />)}
            </div>
          )}
        </DataState>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today&apos;s appointments</CardTitle>
              <Link href="/app/appointments" className="text-sm font-semibold text-teal hover:underline">View all</Link>
            </CardHeader>
            <CardBody className="p-0">
              <DataState {...appts} onRetry={appts.refetch} isEmpty={(d) => d.length === 0}>
                {(data) => (
                  <div className="divide-y">
                    {data.slice(0, 6).map((a) => (
                      <div key={a.id} className="flex items-center gap-3 px-5 py-3">
                        <span className="w-14 shrink-0 text-sm font-bold text-heading">{a.time}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-heading">{a.patientName}</p>
                          <p className="truncate text-xs text-muted">{a.doctor} · {a.department}</p>
                        </div>
                        {a.noShowRisk > 60 && <StatusChip status="warning" dot={false}>No-show {a.noShowRisk}%</StatusChip>}
                        <StatusChip status={a.status === "done" ? "done" : a.status === "no-show" ? "error" : a.status === "in-consult" ? "active" : "pending"}>
                          {a.status}
                        </StatusChip>
                      </div>
                    ))}
                  </div>
                )}
              </DataState>
            </CardBody>
          </Card>

          {/* My tasks + AI */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>My tasks</CardTitle></CardHeader>
              <CardBody className="space-y-2">
                {tasks.filter((t) => !t.done).slice(0, 4).map((t) => (
                  <div key={t.id} className="flex items-start gap-2 rounded-lg border bg-surface/50 p-2.5">
                    <input type="checkbox" className="mt-0.5 accent-teal" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-heading">{t.title}</p>
                      <p className="text-xs text-muted">{t.module} · {t.due}</p>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card className="border-teal/25 bg-gradient-to-br from-teal/[0.05] to-clinical/[0.03]">
              <CardBody className="pt-5">
                <div className="flex items-center gap-2 text-teal">
                  <Sparkles className="h-5 w-5" />
                  <p className="font-heading font-bold">AI insight</p>
                </div>
                <p className="mt-2 text-sm text-body">
                  3 patients in General-A are predicted for discharge tomorrow — freeing beds ahead of the ER surge forecast at 6pm.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-3"><Link href="/app/ipd/bed-board">Review bed board</Link></Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
