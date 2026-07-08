"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Would report to Sentry with PHI-safe redaction in production.
    console.error("[app-error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-danger/12 text-danger">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="font-heading text-2xl font-bold text-heading">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-muted">An unexpected error occurred. Your work is safe — try again.</p>
      {error.digest && <p className="mt-1 text-xs text-muted">Ref: {error.digest}</p>}
      <Button onClick={reset} className="mt-6"><RotateCcw className="h-4 w-4" /> Try again</Button>
    </div>
  );
}
