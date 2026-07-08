"use client";

import { createContext, useContext, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertTriangle, Info, X, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "error" | "info" | "warning";
interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
  action?: { label: string; onClick: () => void };
}

interface ToastCtx {
  toast: (t: Omit<Toast, "id">) => void;
  success: (m: string, action?: Toast["action"]) => void;
  error: (m: string) => void;
  info: (m: string) => void;
}

const Ctx = createContext<ToastCtx | null>(null);

const icons = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
  warning: AlertTriangle,
};
const tones = {
  success: "text-success",
  error: "text-danger",
  info: "text-clinical",
  warning: "text-warning",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);
  useState(() => {
    if (typeof window !== "undefined") setMounted(true);
  });

  const remove = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const toast = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { ...t, id }]);
      setTimeout(() => remove(id), 5000);
    },
    [remove],
  );

  const api: ToastCtx = {
    toast,
    success: (m, action) => toast({ kind: "success", message: m, action }),
    error: (m) => toast({ kind: "error", message: m }),
    info: (m) => toast({ kind: "info", message: m }),
  };

  return (
    <Ctx.Provider value={api}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="fixed bottom-5 left-1/2 z-[200] flex w-[min(92vw,400px)] -translate-x-1/2 flex-col gap-2">
            {toasts.map((t) => {
              const Icon = icons[t.kind];
              return (
                <div
                  key={t.id}
                  role="status"
                  className="flex animate-fade-in items-center gap-3 rounded-control border bg-card px-4 py-3 shadow-pop"
                >
                  <Icon className={cn("h-5 w-5 shrink-0", tones[t.kind])} />
                  <p className="flex-1 text-sm font-medium text-heading">{t.message}</p>
                  {t.action && (
                    <button
                      onClick={() => {
                        t.action!.onClick();
                        remove(t.id);
                      }}
                      className="flex items-center gap-1 text-[13px] font-semibold text-teal hover:underline"
                    >
                      <Undo2 className="h-3.5 w-3.5" />
                      {t.action.label}
                    </button>
                  )}
                  <button onClick={() => remove(t.id)} aria-label="Dismiss" className="text-muted hover:text-heading">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
