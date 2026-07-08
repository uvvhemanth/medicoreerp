"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useApp } from "./app-context";
import { useAuth } from "@/components/providers/auth-provider";
import { filterNavForRole } from "@/lib/app/nav";
import { patients } from "@/lib/mock/data";
import { cn } from "@/lib/utils";
import { Search, ArrowRight, User, Zap, CornerDownLeft } from "lucide-react";

interface Cmd { id: string; label: string; sub?: string; icon: React.ComponentType<{ className?: string }>; action: () => void; group: string }

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, pinPatient } = useApp();
  const { user } = useAuth();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  // Global ⌘K listener
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [setPaletteOpen]);

  useEffect(() => {
    if (paletteOpen) { setQ(""); setActive(0); }
  }, [paletteOpen]);

  const commands = useMemo<Cmd[]>(() => {
    if (!user) return [];
    const nav = filterNavForRole(user.role).flatMap((g) =>
      g.links.map((l) => ({
        id: l.href,
        label: l.label,
        sub: g.group,
        icon: l.icon,
        group: "Navigate",
        action: () => { router.push(l.href); setPaletteOpen(false); },
      })),
    );
    const actions: Cmd[] = [
      { id: "a-register", label: "Register new patient", icon: Zap, group: "Actions", action: () => { router.push("/app/register-patient"); setPaletteOpen(false); } },
      { id: "a-appt", label: "Book appointment", icon: Zap, group: "Actions", action: () => { router.push("/app/appointments"); setPaletteOpen(false); } },
      { id: "a-denials", label: "Open denial queue", icon: Zap, group: "Actions", action: () => { router.push("/app/rcm/denials"); setPaletteOpen(false); } },
    ];
    const pts: Cmd[] = q.length > 1
      ? patients
          .filter((p) => `${p.name} ${p.uhid}`.toLowerCase().includes(q.toLowerCase()))
          .slice(0, 5)
          .map((p) => ({
            id: p.id,
            label: p.name,
            sub: `${p.uhid} · ${p.age}${p.sex}`,
            icon: User,
            group: "Patients",
            action: () => {
              pinPatient({ id: p.id, uhid: p.uhid, name: p.name, age: p.age, sex: p.sex, allergies: p.allergies, attending: "A. Menon" });
              router.push(`/app/patients/${p.id}`);
              setPaletteOpen(false);
            },
          }))
      : [];
    return [...actions, ...nav, ...pts];
  }, [user, q, router, setPaletteOpen, pinPatient]);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()) || c.group === "Patients");
  const grouped = filtered.reduce<Record<string, Cmd[]>>((acc, c) => {
    (acc[c.group] ??= []).push(c);
    return acc;
  }, {});
  const flat = Object.values(grouped).flat();

  if (!paletteOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[150] flex items-start justify-center p-4 pt-[12vh]">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={() => setPaletteOpen(false)} />
      <div
        role="dialog"
        aria-label="Command palette"
        className="relative z-10 w-full max-w-xl animate-scale-in overflow-hidden rounded-card border bg-card shadow-pop"
      >
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="h-5 w-5 text-muted" />
          <input
            autoFocus
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, flat.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              if (e.key === "Enter") { e.preventDefault(); flat[active]?.action(); }
            }}
            placeholder="Search or run a command…"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
          />
          <span className="rounded-md border px-1.5 py-0.5 text-[11px] font-semibold text-muted">esc</span>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {flat.length === 0 && <p className="px-3 py-8 text-center text-sm text-muted">No results for “{q}”.</p>}
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="mb-1">
              <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-muted">{group}</p>
              {items.map((c) => {
                const idx = flat.indexOf(c);
                return (
                  <button
                    key={c.id}
                    onMouseEnter={() => setActive(idx)}
                    onClick={c.action}
                    className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left", active === idx ? "bg-teal/10" : "hover:bg-black/[0.03] dark:hover:bg-white/5")}
                  >
                    <c.icon className={cn("h-4 w-4", active === idx ? "text-teal" : "text-muted")} />
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-heading">{c.label}</span>
                      {c.sub && <span className="block text-xs text-muted">{c.sub}</span>}
                    </span>
                    {active === idx && <CornerDownLeft className="h-3.5 w-3.5 text-teal" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 border-t px-4 py-2 text-[11px] text-muted">
          <span className="flex items-center gap-1"><ArrowRight className="h-3 w-3" /> to navigate</span>
          <span>↑↓ to move</span>
          <span>↵ to select</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
