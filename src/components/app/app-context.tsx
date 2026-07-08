"use client";

import { createContext, useContext, useState, useCallback } from "react";

export interface PinnedPatient {
  id: string;
  uhid: string;
  name: string;
  age: number;
  sex: string;
  allergies: string[];
  encounter?: string;
  bed?: string;
  attending?: string;
}

interface AppState {
  pinned: PinnedPatient | null;
  pinPatient: (p: PinnedPatient) => void;
  clearPatient: () => void;
  navCollapsed: boolean;
  toggleNav: () => void;
  railCollapsed: boolean;
  toggleRail: () => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  online: boolean;
  setOnline: (v: boolean) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [pinned, setPinned] = useState<PinnedPatient | null>(null);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [online, setOnline] = useState(true);

  return (
    <Ctx.Provider
      value={{
        pinned,
        pinPatient: useCallback((p) => setPinned(p), []),
        clearPatient: useCallback(() => setPinned(null), []),
        navCollapsed,
        toggleNav: useCallback(() => setNavCollapsed((v) => !v), []),
        railCollapsed,
        toggleRail: useCallback(() => setRailCollapsed((v) => !v), []),
        paletteOpen,
        setPaletteOpen,
        online,
        setOnline,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
