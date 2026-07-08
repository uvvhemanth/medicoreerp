"use client";

import { useApp } from "./app-context";
import { Avatar } from "@/components/ui/misc";
import { AlertTriangle, X, BedDouble, User } from "lucide-react";

/** The pin — sticky current patient across screens (§8.4). */
export function ContextBar() {
  const { pinned, clearPatient } = useApp();
  if (!pinned) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b bg-mist/50 px-4 py-2 dark:bg-white/[0.03]">
      <div className="flex items-center gap-2">
        <Avatar name={pinned.name} size={26} />
        <span className="font-heading text-sm font-bold text-heading">{pinned.name}</span>
      </div>
      <span className="text-xs text-muted">
        <User className="mr-1 inline h-3 w-3" />{pinned.age}{pinned.sex} · {pinned.uhid}
      </span>
      {pinned.encounter && <span className="text-xs text-muted">Enc {pinned.encounter}</span>}
      {pinned.bed && (
        <span className="flex items-center gap-1 text-xs text-muted"><BedDouble className="h-3 w-3" /> {pinned.bed}</span>
      )}
      {pinned.attending && <span className="hidden text-xs text-muted sm:inline">Dr. {pinned.attending}</span>}
      {pinned.allergies.length > 0 && (
        <span className="flex items-center gap-1 rounded-pill bg-critical/12 px-2 py-0.5 text-xs font-bold text-critical">
          <AlertTriangle className="h-3 w-3" /> Allergy: {pinned.allergies.join(", ")}
        </span>
      )}
      <button
        onClick={clearPatient}
        className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-muted hover:bg-black/5 dark:hover:bg-white/10"
      >
        <X className="h-3.5 w-3.5" /> Clear
      </button>
    </div>
  );
}
