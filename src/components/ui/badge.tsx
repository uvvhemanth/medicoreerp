import { cn } from "@/lib/utils";

/** Fixed status semantics — Appendix E of requirements. */
export type StatusKind =
  | "draft"
  | "active"
  | "pending"
  | "done"
  | "success"
  | "error"
  | "cancelled"
  | "info"
  | "warning"
  | "critical";

const statusStyles: Record<StatusKind, string> = {
  draft: "bg-black/[0.06] text-muted dark:bg-white/[0.08]",
  active: "bg-teal/10 text-teal",
  pending: "bg-warning/12 text-warning",
  done: "bg-success/12 text-success",
  success: "bg-success/12 text-success",
  error: "bg-danger/12 text-danger",
  cancelled: "bg-black/[0.06] text-muted line-through dark:bg-white/[0.08]",
  info: "bg-clinical/10 text-clinical",
  warning: "bg-warning/12 text-warning",
  critical: "bg-critical/12 text-critical ring-1 ring-critical/30",
};

export function StatusChip({
  status,
  children,
  className,
  dot = true,
}: {
  status: StatusKind;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold",
        statusStyles[status],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden />}
      {children}
    </span>
  );
}

export function Badge({
  className,
  children,
  tone = "neutral",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "neutral" | "teal" | "blue" | "amber" | "red" | "green";
}) {
  const tones = {
    neutral: "bg-black/[0.05] text-body dark:bg-white/[0.08]",
    teal: "bg-teal/10 text-teal",
    blue: "bg-clinical/10 text-clinical",
    amber: "bg-warning/12 text-warning",
    red: "bg-danger/12 text-danger",
    green: "bg-success/12 text-success",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill border px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Chip({
  active,
  onClick,
  children,
  className,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-[13px] font-semibold transition-colors duration-micro",
        active
          ? "border-teal bg-teal/10 text-teal"
          : "bg-card text-body hover:bg-black/[0.03] dark:hover:bg-white/[0.05]",
        className,
      )}
    >
      {children}
    </button>
  );
}
