"use client";

import { useState } from "react";
import { useApp } from "./app-context";
import { tasks as mockTasks } from "@/lib/mock/data";
import { StatusChip } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sparkles, ListTodo, Bell, Send, PanelRightClose, PanelRight, ShieldAlert } from "lucide-react";

const suggestions = [
  "Summarize this patient's last visit",
  "Draft a discharge summary",
  "What's overdue for this patient?",
];

export function RightRail() {
  const { railCollapsed, toggleRail, pinned } = useApp();
  const [tab, setTab] = useState<"copilot" | "tasks" | "alerts">("copilot");
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your chart-aware co-pilot. Ask me anything about the current patient or workflow. I always cite my sources." },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setChat((c) => [...c, { role: "user", text }]);
    setMsg("");
    setTimeout(() => {
      setChat((c) => [
        ...c,
        {
          role: "ai",
          text: pinned
            ? `Based on ${pinned.name}'s chart: recent vitals are stable, one active problem, no new critical results. [source: chart · timeline]`
            : "Pin a patient to get chart-specific answers. In general, this is advisory only — I never act autonomously on clinical decisions.",
        },
      ]);
    }, 700);
  };

  if (railCollapsed) {
    return (
      <div className="hidden w-12 shrink-0 flex-col items-center gap-3 border-l bg-card py-3 xl:flex">
        <button onClick={toggleRail} aria-label="Expand assist rail" className="rounded-lg p-2 text-muted hover:bg-black/5">
          <PanelRight className="h-4 w-4" />
        </button>
        <button onClick={() => { toggleRail(); setTab("copilot"); }} className="rounded-lg p-2 text-teal hover:bg-teal/10"><Sparkles className="h-4 w-4" /></button>
        <button onClick={() => { toggleRail(); setTab("tasks"); }} className="rounded-lg p-2 text-muted hover:bg-black/5"><ListTodo className="h-4 w-4" /></button>
        <button onClick={() => { toggleRail(); setTab("alerts"); }} className="relative rounded-lg p-2 text-muted hover:bg-black/5">
          <Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-critical" />
        </button>
      </div>
    );
  }

  return (
    <aside className="hidden w-80 shrink-0 flex-col border-l bg-card xl:flex">
      <div className="flex items-center justify-between border-b px-2 py-2">
        <div className="flex gap-1">
          {([["copilot", Sparkles, "Co-pilot"], ["tasks", ListTodo, "Tasks"], ["alerts", Bell, "Alerts"]] as const).map(([id, Icon, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn("flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold", tab === id ? "bg-teal/10 text-teal" : "text-muted hover:bg-black/5")}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>
        <button onClick={toggleRail} aria-label="Collapse rail" className="rounded-lg p-1.5 text-muted hover:bg-black/5">
          <PanelRightClose className="h-4 w-4" />
        </button>
      </div>

      {tab === "copilot" && (
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {chat.map((m, i) => (
              <div key={i} className={cn("max-w-[85%] rounded-2xl px-3 py-2 text-sm", m.role === "user" ? "ml-auto bg-teal text-white" : "bg-mist/60 text-body dark:bg-white/5")}>
                {m.text}
              </div>
            ))}
            <div className="space-y-1.5 pt-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="block w-full rounded-lg border px-3 py-1.5 text-left text-xs text-body hover:border-teal/40 hover:text-teal">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(msg); }} className="border-t p-2">
            <div className="flex items-center gap-1.5 rounded-control border bg-surface px-3 py-1.5">
              <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ask the co-pilot…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted" />
              <button type="submit" className="text-teal" aria-label="Send"><Send className="h-4 w-4" /></button>
            </div>
          </form>
        </div>
      )}

      {tab === "tasks" && (
        <div className="flex-1 space-y-2 overflow-y-auto p-3">
          {mockTasks.map((t) => (
            <div key={t.id} className="flex items-start gap-2 rounded-lg border bg-surface/60 p-3">
              <input type="checkbox" defaultChecked={t.done} className="mt-0.5 accent-teal" />
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-medium text-heading", t.done && "text-muted line-through")}>{t.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <StatusChip status={t.priority === "high" ? "error" : t.priority === "med" ? "warning" : "info"} dot={false}>{t.module}</StatusChip>
                  <span className="text-xs text-muted">{t.due}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "alerts" && (
        <div className="flex-1 space-y-2 overflow-y-auto p-3">
          <div className="rounded-lg border-2 border-critical/30 bg-critical/[0.06] p-3">
            <p className="flex items-center gap-1.5 text-sm font-bold text-critical"><ShieldAlert className="h-4 w-4" /> Critical value</p>
            <p className="mt-1 text-xs text-body">K+ 6.8 mmol/L — Meera Sharma. Acknowledge with reason.</p>
            <button className="mt-2 rounded-lg bg-critical px-2.5 py-1 text-xs font-bold text-white">Acknowledge</button>
          </div>
          <div className="rounded-lg border border-warning/30 bg-warning/[0.08] p-3">
            <p className="text-sm font-bold text-warning">Approval awaiting you</p>
            <p className="mt-1 text-xs text-body">₹18,000 discount waiver on INV-4521.</p>
          </div>
        </div>
      )}
    </aside>
  );
}
