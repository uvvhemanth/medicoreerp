"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { filterNavForRole } from "@/lib/app/nav";
import { useAuth } from "@/components/providers/auth-provider";
import { useApp } from "./app-context";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeft, Star } from "lucide-react";

export function SideNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { navCollapsed, toggleNav } = useApp();
  if (!user) return null;
  const groups = filterNavForRole(user.role);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r bg-card transition-all duration-standard lg:flex",
        navCollapsed ? "w-[68px]" : "w-64",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-3">
        {!navCollapsed ? <Logo /> : <Logo showText={false} />}
        <button onClick={toggleNav} aria-label="Toggle navigation" className="rounded-lg p-1.5 text-muted hover:bg-black/5 dark:hover:bg-white/10">
          {navCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-2.5 py-4">
        {groups.map((g) => (
          <div key={g.group}>
            {!navCollapsed && (
              <p className="mb-1 px-2 text-[11px] font-bold uppercase tracking-wider text-muted">{g.group}</p>
            )}
            <ul className="space-y-0.5">
              {g.links.map((link) => {
                const active = pathname === link.href || (link.href !== "/app" && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      title={navCollapsed ? link.label : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                        active ? "bg-teal/10 text-teal" : "text-body hover:bg-black/[0.04] dark:hover:bg-white/[0.05]",
                        navCollapsed && "justify-center",
                      )}
                    >
                      <link.icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-teal")} />
                      {!navCollapsed && <span className="flex-1 truncate">{link.label}</span>}
                      {!navCollapsed && link.badge ? (
                        <span className="rounded-pill bg-teal/15 px-1.5 py-0.5 text-[10px] font-bold text-teal">{link.badge}</span>
                      ) : null}
                      {navCollapsed && link.badge ? (
                        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-teal" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {!navCollapsed && (
        <div className="border-t p-3">
          <div className="flex items-center gap-2 rounded-lg bg-mist/50 px-3 py-2 text-xs text-muted dark:bg-white/[0.03]">
            <Star className="h-3.5 w-3.5 text-warning" />
            <span>Mock data · demo build</span>
          </div>
        </div>
      )}
    </aside>
  );
}
