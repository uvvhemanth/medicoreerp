"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { filterNavForRole } from "@/lib/app/nav";
import { useAuth } from "@/components/providers/auth-provider";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const pathname = usePathname();
  if (!open || !user) return null;
  const groups = filterNavForRole(user.role);

  return (
    <div className="fixed inset-0 z-[120] lg:hidden">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <aside className="absolute left-0 top-0 h-full w-72 animate-slide-in-right overflow-y-auto border-r bg-card p-3" style={{ animationName: "slide-in-right" }}>
        <div className="mb-4 flex items-center justify-between">
          <Logo />
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 hover:bg-black/5"><X className="h-5 w-5" /></button>
        </div>
        {groups.map((g) => (
          <div key={g.group} className="mb-4">
            <p className="mb-1 px-2 text-[11px] font-bold uppercase tracking-wider text-muted">{g.group}</p>
            {g.links.map((l) => {
              const active = pathname === l.href || (l.href !== "/app" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className={cn("flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium", active ? "bg-teal/10 text-teal" : "text-body hover:bg-black/5")}
                >
                  <l.icon className="h-[18px] w-[18px]" /> {l.label}
                </Link>
              );
            })}
          </div>
        ))}
      </aside>
    </div>
  );
}
