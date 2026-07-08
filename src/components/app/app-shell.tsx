"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { AppProvider, useApp } from "./app-context";
import { SideNav } from "./sidenav";
import { TopBar } from "./topbar";
import { ContextBar } from "./context-bar";
import { RightRail } from "./right-rail";
import { CommandPalette } from "./command-palette";
import { MobileNav } from "./mobile-nav";
import { Spinner } from "@/components/ui/misc";
import { OfflineBanner } from "@/components/ui/banner";

function Inner({ children }: { children: React.ReactNode }) {
  const { online } = useApp();
  const [mobileNav, setMobileNav] = useState(false);
  return (
    <div className="flex min-h-screen bg-surface">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onMobileNav={() => setMobileNav(true)} />
        <ContextBar />
        {!online && (
          <div className="px-4 pt-3">
            <OfflineBanner />
          </div>
        )}
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
      <RightRail />
      <CommandPalette />
      <MobileNav open={mobileNav} onClose={() => setMobileNav(false)} />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login?next=/app");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="h-8 w-8" />
          <p className="text-sm text-muted">Loading your console…</p>
        </div>
      </div>
    );
  }

  return (
    <AppProvider>
      <Inner>{children}</Inner>
    </AppProvider>
  );
}
