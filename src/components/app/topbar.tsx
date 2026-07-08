"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { useApp } from "./app-context";
import { useTheme } from "@/components/providers/theme-provider";
import { ROLE_LABELS } from "@/lib/auth";
import { Avatar } from "@/components/ui/misc";
import { Kbd } from "@/components/ui/misc";
import { StatusChip } from "@/components/ui/badge";
import { notifications as mockNotifs } from "@/lib/mock/data";
import { cn, initials } from "@/lib/utils";
import {
  Search, Command, Bell, HelpCircle, ChevronDown, Moon, Sun, LogOut,
  Building2, Check, ShieldAlert, Menu, Gauge, Wifi,
} from "lucide-react";

function useClickOutside(cb: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [cb]);
  return ref;
}

export function TopBar({ onMobileNav }: { onMobileNav: () => void }) {
  const { user, logout, switchBranch } = useAuth();
  const { setPaletteOpen, online, setOnline } = useApp();
  const { theme, toggleTheme, density, toggleDensity } = useTheme();
  const router = useRouter();
  const [menu, setMenu] = useState<"none" | "branch" | "notif" | "profile">("none");
  const close = () => setMenu("none");
  const ref = useClickOutside(close);
  const unread = mockNotifs.filter((n) => !n.read).length;
  if (!user) return null;

  const branches = ["Main Campus", "North Wing", "City Clinic", "Suburb Center"];

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-card/90 px-3 backdrop-blur-xl sm:px-4">
      <button onClick={onMobileNav} className="rounded-lg p-2 hover:bg-black/5 lg:hidden" aria-label="Menu">
        <Menu className="h-5 w-5" />
      </button>

      {/* Tenant / branch */}
      <div className="relative hidden sm:block" ref={menu === "branch" ? ref : undefined}>
        <button
          onClick={() => setMenu(menu === "branch" ? "none" : "branch")}
          className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
        >
          <Building2 className="h-4 w-4 text-teal" />
          <span className="hidden font-semibold text-heading md:inline">{user.tenant}</span>
          <span className="text-muted">·</span>
          <span className="font-medium text-body">{user.branch}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </button>
        {menu === "branch" && (
          <div className="absolute left-0 top-full mt-2 w-56 animate-scale-in rounded-card border bg-card p-1.5 shadow-pop">
            <p className="px-3 py-1.5 text-xs font-bold uppercase text-muted">Switch branch</p>
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => { switchBranch(b); close(); }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-mist/50 dark:hover:bg-white/5"
              >
                {b} {user.branch === b && <Check className="h-4 w-4 text-teal" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Global search */}
      <button
        onClick={() => setPaletteOpen(true)}
        className="flex flex-1 items-center gap-2 rounded-lg border bg-surface px-3 py-1.5 text-sm text-muted transition hover:border-teal/40 max-w-xl"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search patients, orders, actions…</span>
        <span className="hidden items-center gap-0.5 sm:flex"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
      </button>

      <div className="flex items-center gap-0.5">
        <button onClick={() => setPaletteOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-black/5 sm:hidden" aria-label="Command palette">
          <Command className="h-[18px] w-[18px]" />
        </button>
        <button onClick={toggleDensity} title={`Density: ${density}`} className="hidden h-9 w-9 place-items-center rounded-lg text-muted hover:bg-black/5 sm:grid" aria-label="Toggle density">
          <Gauge className="h-[18px] w-[18px]" />
        </button>
        <button onClick={toggleTheme} className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-black/5" aria-label="Toggle theme">
          {theme === "light" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={menu === "notif" ? ref : undefined}>
          <button onClick={() => setMenu(menu === "notif" ? "none" : "notif")} className="relative grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-black/5" aria-label="Notifications">
            <Bell className="h-[18px] w-[18px]" />
            {unread > 0 && <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-critical px-1 text-[9px] font-bold text-white">{unread}</span>}
          </button>
          {menu === "notif" && (
            <div className="absolute right-0 top-full mt-2 w-[340px] animate-scale-in overflow-hidden rounded-card border bg-card shadow-pop">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="font-heading font-bold text-heading">Notifications</p>
                <button className="text-xs font-semibold text-teal hover:underline">Mark all read</button>
              </div>
              <div className="max-h-96 divide-y overflow-y-auto">
                {mockNotifs.map((n) => (
                  <div key={n.id} className={cn("flex gap-3 px-4 py-3", !n.read && "bg-teal/[0.03]")}>
                    <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", n.kind === "critical" ? "bg-critical" : n.kind === "approval" ? "bg-warning" : "bg-teal")} />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-heading">
                        {n.kind === "critical" && <ShieldAlert className="h-3.5 w-3.5 text-critical" />}{n.title}
                      </p>
                      <p className="truncate text-xs text-muted">{n.body}</p>
                      <p className="mt-0.5 text-[11px] text-muted">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="hidden h-9 w-9 place-items-center rounded-lg text-muted hover:bg-black/5 sm:grid" aria-label="Help">
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>

        {/* Profile */}
        <div className="relative" ref={menu === "profile" ? ref : undefined}>
          <button onClick={() => setMenu(menu === "profile" ? "none" : "profile")} className="ml-1 flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-black/5">
            <Avatar name={user.name} size={30} />
            <ChevronDown className="hidden h-3.5 w-3.5 text-muted sm:block" />
          </button>
          {menu === "profile" && (
            <div className="absolute right-0 top-full mt-2 w-64 animate-scale-in rounded-card border bg-card p-1.5 shadow-pop">
              <div className="flex items-center gap-3 px-3 py-3">
                <Avatar name={user.name} size={40} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-heading">{user.name}</p>
                  <p className="truncate text-xs text-muted">{ROLE_LABELS[user.role]}</p>
                </div>
              </div>
              <div className="px-3 py-1"><StatusChip status="success">On-call</StatusChip></div>
              <div className="my-1 h-px bg-[var(--border)]" />
              <button onClick={() => { setOnline(!online); close(); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-mist/50 dark:hover:bg-white/5">
                <Wifi className="h-4 w-4 text-clinical" /> {online ? "Simulate offline" : "Go back online"}
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-mist/50 dark:hover:bg-white/5">
                <ShieldAlert className="h-4 w-4 text-warning" /> Break-glass access
              </button>
              <button onClick={() => { close(); logout(); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-danger/[0.06]">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
