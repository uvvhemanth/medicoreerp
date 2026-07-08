"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/marketing/theme-toggle";
import { Avatar, Spinner } from "@/components/ui/misc";
import { cn } from "@/lib/utils";
import { Home, FileText, Receipt, Video, ShieldCheck, LogOut } from "lucide-react";

const tabs = [
  { href: "/portal", label: "Home", icon: Home },
  { href: "/portal/records", label: "Records", icon: FileText },
  { href: "/portal/bills", label: "Bills", icon: Receipt },
  { href: "/portal/teleconsult", label: "Consult", icon: Video },
  { href: "/portal/consent", label: "Privacy", icon: ShieldCheck },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login?next=/portal");
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-surface"><Spinner className="h-7 w-7" /></div>;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-surface pb-20">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-card/90 px-4 py-3 backdrop-blur-xl">
        <Link href="/portal"><Logo /></Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button onClick={logout} aria-label="Sign out" className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-black/5"><LogOut className="h-[18px] w-[18px]" /></button>
          <Avatar name={user.name} size={32} />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-lg border-t bg-card/95 backdrop-blur-xl">
        <div className="grid grid-cols-5">
          {tabs.map((t) => {
            const active = pathname === t.href;
            return (
              <Link key={t.href} href={t.href} className={cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold", active ? "text-teal" : "text-muted")}>
                <t.icon className={cn("h-5 w-5", active && "text-teal")} />
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
