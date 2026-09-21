import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarCheck, CheckCircle2, Video } from "lucide-react";

export function FormThankYouCard({
  title,
  body,
  when,
  leadId,
  primaryHref = "/",
  primaryLabel = "Back to home",
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
    <div className="flex flex-col items-center justify-center rounded-card border-2 border-teal/25 bg-teal/[0.04] p-10 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h1 className="font-heading text-2xl font-bold text-heading">{title}</h1>
      <p className="mt-2 max-w-sm text-muted">{body}</p>
      {(when || leadId) && (
        <div className="mt-6 w-full max-w-sm space-y-2 rounded-card border bg-card p-4 text-left text-sm">
          {when && (
            <p className="flex items-center gap-2 font-semibold text-heading">
              <CalendarCheck className="h-4 w-4 text-teal" /> {when}
            </p>
          )}
          {when && (
            <p className="flex items-center gap-2 text-muted">
              <Video className="h-4 w-4 text-teal" /> Meeting details will follow after confirmation
            </p>
          )}
          {leadId && <p className="text-xs text-muted">Ref: {leadId}</p>}
        </div>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href={primaryHref}>{primaryLabel}</Link>
        </Button>
        {secondaryHref && secondaryLabel && (
          <Button asChild variant="outline" size="lg">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
