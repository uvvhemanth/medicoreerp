"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";
type Density = "comfortable" | "compact";

interface ThemeState {
  theme: Theme;
  density: Density;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  toggleDensity: () => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [density, setDensity] = useState<Density>("comfortable");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = (localStorage.getItem("aether-theme") as Theme) || null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setThemeState(initial);
    const storedDensity = (localStorage.getItem("aether-density") as Density) || "comfortable";
    setDensity(storedDensity);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("aether-theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-density", density);
    localStorage.setItem("aether-density", density);
  }, [density, mounted]);

  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "light" ? "dark" : "light")),
    [],
  );
  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleDensity = useCallback(
    () => setDensity((d) => (d === "comfortable" ? "compact" : "comfortable")),
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, density, toggleTheme, setTheme, toggleDensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
