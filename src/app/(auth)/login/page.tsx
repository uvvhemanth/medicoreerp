"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { DEMO_ACCOUNTS, ROLE_LABELS } from "@/lib/auth";
import { Eye, EyeOff, Lock, ShieldCheck, Zap } from "lucide-react";

function LoginInner() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/app";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mfa, setMfa] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) return setError("Enter a valid email.");
    if (password.length < 4) return setError("Password must be at least 4 characters.");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setMfa(true); // simulate step-up MFA (§20.1.2)
  };

  const verifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const acct = DEMO_ACCOUNTS.find((a) => a.email === email);
    await login({ email, role: acct?.role, edition: acct?.edition, name: acct?.name });
    router.push(next);
  };

  const quickLogin = async (acct: (typeof DEMO_ACCOUNTS)[number]) => {
    setLoading(true);
    await login({ email: acct.email, role: acct.role, edition: acct.edition, name: acct.name });
    router.push("/app");
  };

  if (mfa) {
    return (
      <div>
        <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-mist text-teal"><ShieldCheck className="h-6 w-6" /></div>
        <h1 className="font-heading text-2xl font-extrabold text-heading">Verify it's you</h1>
        <p className="mt-1 text-sm text-muted">Enter the 6-digit code from your authenticator. (Demo: any code works.)</p>
        <form onSubmit={verifyMfa} className="mt-6 space-y-4">
          <Input inputMode="numeric" maxLength={6} placeholder="••••••" defaultValue="123456" className="text-center text-2xl tracking-[0.5em]" aria-label="MFA code" />
          <Button type="submit" loading={loading} className="w-full" size="lg">Verify & sign in</Button>
          <button type="button" onClick={() => setMfa(false)} className="w-full text-sm font-semibold text-muted hover:text-teal">Back</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold text-heading">Welcome back</h1>
      <p className="mt-1 text-sm text-muted">Sign in to the Aether staff console.</p>

      <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
        <Field label="Work email" htmlFor="email" required error={error && !email.includes("@") ? error : undefined}>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hospital.org" autoComplete="email" />
        </Field>
        <Field label="Password" htmlFor="password" required error={error && email.includes("@") ? error : undefined}>
          <div className="relative">
            <Input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" className="pr-11" />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-heading">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted"><input type="checkbox" className="accent-teal" defaultChecked /> Remember me</label>
          <Link href="/forgot-password" className="font-semibold text-teal hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" loading={loading} className="w-full" size="lg"><Lock className="h-4 w-4" /> Sign in</Button>
      </form>

      {/* Quick demo logins */}
      <div className="mt-8">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="flex items-center gap-1 text-xs font-semibold text-muted"><Zap className="h-3 w-3" /> Quick demo login</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {DEMO_ACCOUNTS.map((a) => (
            <button
              key={a.role}
              onClick={() => quickLogin(a)}
              disabled={loading}
              className="rounded-control border bg-card px-3 py-2 text-left text-xs font-semibold text-heading transition hover:border-teal/40 hover:bg-mist/40 disabled:opacity-50"
            >
              <span className="block truncate">{ROLE_LABELS[a.role]}</span>
              <span className="block truncate text-[11px] font-normal text-muted">{a.name}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        New to Aether? <Link href="/register" className="font-semibold text-teal hover:underline">Create an account</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-40 skeleton rounded-card" />}>
      <LoginInner />
    </Suspense>
  );
}
