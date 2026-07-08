"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

function useEscape(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [active, onClose]);
}

/* ---------------- Modal ---------------- */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const mounted = useMounted();
  useEscape(open, onClose);
  if (!mounted || !open) return null;
  const widths = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-3xl" };
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative z-10 w-full animate-scale-in rounded-card border bg-card shadow-pop",
          widths[size],
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-heading text-lg font-bold text-heading">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="rounded-md p-1.5 hover:bg-black/5 dark:hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

/* ---------------- Drawer (right-side peek) ---------------- */
export function Drawer({
  open,
  onClose,
  title,
  children,
  width = 460,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number;
}) {
  const mounted = useMounted();
  useEscape(open, onClose);
  if (!mounted || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <aside
        role="dialog"
        aria-label={title}
        className="absolute right-0 top-0 flex h-full animate-slide-in-right flex-col border-l bg-card shadow-pop"
        style={{ width: Math.min(width, typeof window !== "undefined" ? window.innerWidth - 32 : width) }}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-heading text-base font-bold text-heading">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-md p-1.5 hover:bg-black/5 dark:hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </aside>
    </div>,
    document.body,
  );
}

/* ---------------- ConfirmDialog (type-to-confirm) ---------------- */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmWord,
  danger = true,
  confirmLabel = "Confirm",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmWord?: string;
  danger?: boolean;
  confirmLabel?: string;
}) {
  const [value, setValue] = useState("");
  const ok = !confirmWord || value.trim().toUpperCase() === confirmWord.toUpperCase();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open) {
      setValue("");
      setTimeout(() => ref.current?.focus(), 50);
    }
  }, [open]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={danger ? "danger" : "primary"}
            disabled={!ok}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {description && <p className="text-sm text-body">{description}</p>}
      {confirmWord && (
        <div className="mt-4 space-y-1.5">
          <p className="text-xs text-muted">
            Type <span className="font-semibold text-heading">{confirmWord}</span> to confirm.
          </p>
          <Input ref={ref} value={value} onChange={(e) => setValue(e.target.value)} placeholder={confirmWord} />
        </div>
      )}
    </Modal>
  );
}
