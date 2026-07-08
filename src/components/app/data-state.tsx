"use client";

import { Button } from "@/components/ui/button";
import { EmptyState, Skeleton } from "@/components/ui/misc";
import type { ApiError } from "@/lib/data/adapter";
import { AlertTriangle, Inbox, RotateCcw, SearchX } from "lucide-react";

interface DataStateProps<T> {
  isLoading: boolean;
  isError: boolean;
  error?: ApiError | null;
  data: T | undefined;
  isEmpty?: (data: T) => boolean;
  onRetry?: () => void;
  loading?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  filteredEmpty?: boolean;
  children: (data: T) => React.ReactNode;
}

/** Renders honest states: loading / error+retry / empty / filtered-empty / data (§1.8.7). */
export function DataState<T>({
  isLoading, isError, error, data, isEmpty, onRetry, loading,
  emptyTitle = "Nothing here yet", emptyDescription, emptyAction, filteredEmpty, children,
}: DataStateProps<T>) {
  if (isLoading) return <>{loading ?? <TableSkeleton />}</>;

  if (isError) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Couldn't load this"
        description={error?.message ?? "Something went wrong. Please try again."}
        action={onRetry && <Button variant="outline" onClick={onRetry}><RotateCcw className="h-4 w-4" /> Retry {error?.requestId ? `· ${error.requestId}` : ""}</Button>}
      />
    );
  }

  if (data === undefined || (isEmpty && isEmpty(data))) {
    return (
      <EmptyState
        icon={filteredEmpty ? SearchX : Inbox}
        title={filteredEmpty ? "No matches" : emptyTitle}
        description={filteredEmpty ? "Try adjusting your filters or search." : emptyDescription}
        action={emptyAction}
      />
    );
  }

  return <>{children(data)}</>;
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-hidden rounded-card border bg-card">
        <div className="flex gap-4 border-b p-4">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-4 flex-1" />)}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b p-4 last:border-0">
            <Skeleton className="h-9 w-9 rounded-full" />
            {Array.from({ length: 4 }).map((_, j) => <Skeleton key={j} className="h-3.5 flex-1" />)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-card border bg-card p-5">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-3 h-8 w-1/3" />
          <Skeleton className="mt-4 h-16 w-full" />
        </div>
      ))}
    </div>
  );
}
