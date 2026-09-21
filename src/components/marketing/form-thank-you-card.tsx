import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Check, Video } from "lucide-react";

export function FormThankYouCard({
  title,
  body,
  when,
  leadId,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  body: string;
  when?: string;
  leadId?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-xl rounded-[28px] border border-black/[0.06] bg-card px-8 py-14 text-center shadow-soft sm:px-12 sm:py-16">
      <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border-2 border-success text-success">
        <Check className="h-7 w-7" strokeWidth={2.5} />
      </div>
      <h1 className="font-heading text-[28px] font-bold tracking-tight text-heading sm:text-[32px]">{title}</h1>
      <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">{body}</p>
      {(when || leadId) && (
        <div className="mx-auto mt-8 w-full max-w-md rounded-2xl border border-black/[0.06] bg-mist/50 px-5 py-4 text-left dark:bg-white/[0.04]">
          {when && (
            <p className="flex items-center gap-2.5 text-sm font-semibold text-heading">
              <CalendarDays className="h-4 w-4 shrink-0 text-heading/70" />
              <span>{when}</span>
            </p>
          )}
          {when && (
            <p className="mt-2.5 flex items-center gap-2.5 text-sm text-muted">
              <Video className="h-4 w-4 shrink-0" />
              <span>Meeting details will follow after confirmation</span>
            </p>
          )}
          {leadId && <p className="mt-2 pl-7 text-xs text-muted">Ref: {leadId}</p>}
        </div>
      )}
      {(primaryHref || secondaryHref) && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {primaryHref && primaryLabel && (
            <Button asChild size="lg">
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
          )}
          {secondaryHref && secondaryLabel && (
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
