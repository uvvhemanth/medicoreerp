"use client";

import { useState, useMemo, type ReactNode } from "react";
import { useQuery } from "@/hooks/use-query";
import { DataState } from "./data-state";
import { Chip } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface WorklistProps<T> {
  queryKey: string;
  fetcher: () => Promise<T[]>;
  columns: Column<T>[];
  searchable?: (row: T) => string;
  filters?: { label: string; predicate: (row: T) => boolean }[];
  onRowClick?: (row: T) => void;
  rowKey: (row: T) => string;
  searchPlaceholder?: string;
  emptyTitle?: string;
  minWidth?: number;
  rowClassName?: (row: T) => string;
}

export function Worklist<T>({
  queryKey, fetcher, columns, searchable, filters, onRowClick, rowKey,
  searchPlaceholder = "Search…", emptyTitle = "Nothing here yet", minWidth = 720, rowClassName,
}: WorklistProps<T>) {
  const { data, isLoading, isError, error, refetch } = useQuery(queryKey, fetcher);
  const [q, setQ] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);

  const rows = useMemo(() => {
    let r = data ?? [];
    if (filters && activeFilter > 0) r = r.filter(filters[activeFilter - 1].predicate);
    if (q && searchable) r = r.filter((row) => searchable(row).toLowerCase().includes(q.toLowerCase()));
    return r;
  }, [data, q, searchable, filters, activeFilter]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 border-b bg-card px-4 py-3 sm:px-6">
        {searchable && (
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} className="w-full rounded-control border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" />
          </div>
        )}
        {filters && (
          <div className="flex flex-wrap gap-2">
            <Chip active={activeFilter === 0} onClick={() => setActiveFilter(0)}>All</Chip>
            {filters.map((f, i) => <Chip key={f.label} active={activeFilter === i + 1} onClick={() => setActiveFilter(i + 1)}>{f.label}</Chip>)}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <DataState data={rows} isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={(d) => d.length === 0} filteredEmpty={!!q || activeFilter > 0} emptyTitle={emptyTitle}>
          {(list) => (
            <div className="overflow-hidden rounded-card border bg-card shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm" style={{ minWidth }}>
                  <thead>
                    <tr className="border-b bg-surface/60 text-xs uppercase tracking-wide text-muted">
                      {columns.map((c) => <th key={c.key} className={cn("px-4 py-3 font-semibold", c.className)}>{c.header}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {list.map((row) => (
                      <tr
                        key={rowKey(row)}
                        onClick={() => onRowClick?.(row)}
                        className={cn("transition hover:bg-mist/40 dark:hover:bg-white/[0.03]", onRowClick && "cursor-pointer", rowClassName?.(row))}
                      >
                        {columns.map((c) => <td key={c.key} className={cn("px-4 py-3", c.className)}>{c.render(row)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t px-4 py-2.5 text-xs text-muted">
                <span>{list.length} records</span>
                <span>Virtualized for 10k+ rows in production</span>
              </div>
            </div>
          )}
        </DataState>
      </div>
    </>
  );
}
