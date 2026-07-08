"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Info, ShieldAlert, CheckCircle2, WifiOff, X } from "lucide-react";

type Severity = "info" | "success" | "warning" | "danger" | "critical";

const config: Record<Severity, { cls: string; icon: React.ComponentType<{ className?: string }> }> = {
  info: { cls: "bg-clinical/[0.08] text-clinical border-clinical/25", icon: Info },
  success: { cls: "bg-success/[0.08] text-success border-success/25", icon: CheckCircle2 },
  warning: { cls: "bg-warning/[0.1] text-warning border-warning/30", icon: AlertTriangle },
  danger: { cls: "bg-danger/[0.08] text-danger border-danger/25", icon: AlertTriangle },
  critical: {
    cls: "bg-critical/[0.1] text-critical border-critical/40 ring-1 ring-critical/20 animate-pulse-ring",
    icon: ShieldAlert,
  },
};

/** Reserved, unmistakable treatment for safety alerts (W03 §1.8.8). */
export function SeverityBanner({
  severity,
  title,
  children,
  evidence,
  onDismiss,
  className,
}: {
  severity: Severity;
  title: string;
  children?: React.ReactNode;
  evidence?: string;
  onDismiss?: () => void;
  className?: string;
}) {
  const { cls, icon: Icon } = config[severity];
  return (
    <div
      role="alert"
      className={cn("flex items-start gap-3 rounded-control border px-4 py-3", cls, className)}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{title}</p>
        {children && <p className="mt-0.5 text-[13px] opacity-90">{children}</p>}
        {evidence && (
          <a href="#" className="mt-1 inline-block text-xs font-semibold underline underline-offset-2">
            Why? · {evidence}
          </a>
        )}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Dismiss" className="rounded-md p-1 hover:bg-black/5">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function OfflineBanner() {
  return (
    <div className="flex items-center gap-2 rounded-control border border-warning/30 bg-warning/[0.1] px-3 py-2 text-[13px] font-semibold text-warning">
      <WifiOff className="h-4 w-4" />
      Working offline — showing cached data. Changes will sync on reconnect.
    </div>
  );
}
