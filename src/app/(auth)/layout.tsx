import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="text-center text-xs text-muted">
          Demo build · mock authentication · no real credentials or PHI.
        </p>
      </div>

      {/* Right: brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-teal-deep via-teal-dark to-teal lg:block">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="h-5 w-5" /> HIPAA · GDPR · ABDM · SOC 2 · ISO 27001
          </div>
          <div>
            <h2 className="font-heading text-4xl font-extrabold leading-tight">
              The hospital, running as one.
            </h2>
            <p className="mt-4 max-w-md text-white/80">
              Sign in to the operational console — role-filtered, keyboard-first, and safe by design.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["62%", "less doc time"], ["45%", "fewer denials"], ["9 wks", "to go live"]].map(([v, l]) => (
                <div key={l}>
                  <p className="font-heading text-2xl font-extrabold">{v}</p>
                  <p className="text-xs text-white/70">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex -space-x-2">
            {[45, 12, 32, 5, 8].map((n) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={n} src={`https://i.pravatar.cc/48?img=${n}`} alt="" className="h-9 w-9 rounded-full border-2 border-teal-dark object-cover" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
