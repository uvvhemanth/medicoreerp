"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ApiError } from "@/lib/data/adapter";

interface QueryState<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
  refetch: () => void;
  isFetching: boolean;
}

/**
 * Minimal TanStack-Query-shaped hook. Handles loading / error / retry / refetch
 * uniformly so every screen renders honest states (Requirements §1.8.7).
 */
export function useQuery<T>(key: string, fetcher: () => Promise<T>, deps: unknown[] = []): QueryState<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);
  const [isFetching, setFetching] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const mounted = useRef(true);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(async (initial: boolean) => {
    if (initial) setLoading(true);
    setFetching(true);
    setError(null);
    try {
      const res = await fetcherRef.current();
      if (mounted.current) setData(res);
    } catch (e) {
      if (mounted.current) setError(e as ApiError);
    } finally {
      if (mounted.current) {
        setLoading(false);
        setFetching(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    mounted.current = true;
    run(true);
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ...deps]);

  const refetch = useCallback(() => run(false), [run]);

  return { data, isLoading, isError: !!error, error, refetch, isFetching };
}
