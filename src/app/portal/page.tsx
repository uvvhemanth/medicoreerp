"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/badge";
import { CalendarClock, FileText, Receipt, Video, Stethoscope, ChevronRight, Sparkles } from "lucide-react";

export default function PortalHome() {
  const { user } = useAuth();
  return (
    <div className="space-y-5 p-4">
      <div>
        <p className="text-sm text-muted">Welcome back,</p>
        <h1 className="font-heading text-2xl font-extrabold text-heading">{user?.name?.split(" ")[0]}</h1>
      </div>

      {/* Next appointment */}
      <Card className="border-teal/25 bg-gradient-to-br from-teal/[0.06] to-clinical/[0.03]">
        <CardBody className="pt-5">
          <div className="flex items-center gap-2 text-teal"><CalendarClock className="h-5 w-5" /><p className="font-heading font-bold">Next appointment</p></div>
          <p className="mt-2 text-lg font-bold text-heading">Dr. A. Menon · Cardiology</p>
          <p className="text-sm text-muted">Tomorrow · 10:30 AM · Main Campus</p>
          <div className="mt-3 flex gap-2">
            <Button size="sm">Check in</Button>
            <Button size="sm" variant="outline">Reschedule</Button>
          </div>
        </CardBody>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Stethoscope, label: "Symptom checker", href: "/portal/book", tone: "text-teal" },
          { icon: Video, label: "Teleconsult", href: "/portal/teleconsult", tone: "text-clinical" },
          { icon: FileText, label: "My records", href: "/portal/records", tone: "text-forest" },
          { icon: Receipt, label: "Pay bills", href: "/portal/bills", tone: "text-warning" },
        ].map((a) => (
          <Link key={a.label} href={a.href} className="rounded-card border bg-card p-4 shadow-soft transition hover:shadow-card">
            <a.icon className={`h-6 w-6 ${a.tone}`} />
            <p className="mt-2 text-sm font-semibold text-heading">{a.label}</p>
          </Link>
        ))}
      </div>

      {/* Results ready */}
      <Card>
        <CardBody className="pt-5">
          <div className="flex items-center justify-between">
            <p className="font-heading font-bold text-heading">Results ready</p>
            <StatusChip status="done">2 new</StatusChip>
          </div>
          <div className="mt-3 space-y-2">
            {[["Lipid panel", "Reviewed"], ["Complete blood count", "New"]].map(([t, s]) => (
              <Link key={t} href="/portal/records" className="flex items-center justify-between rounded-lg border bg-surface/50 p-3">
                <span className="text-sm font-medium text-heading">{t}</span>
                <span className="flex items-center gap-1 text-xs text-teal">{s} <ChevronRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* AI explanation teaser */}
      <div className="flex items-start gap-3 rounded-card border bg-mist/40 p-4">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
        <p className="text-sm text-body">Your reports come with plain-language explanations — no medical jargon. Tap any result to understand it.</p>
      </div>
    </div>
  );
}
