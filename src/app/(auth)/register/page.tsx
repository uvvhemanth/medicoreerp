"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { ROLE_LABELS, type Role, type Edition } from "@/lib/auth";
import { Check } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", password: "", org: "", role: "doctor" as Role, edition: "hospital" as Edition });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const next = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Enter your name.";
    if (!form.email.includes("@")) e.email = "Enter a valid email.";
    if (form.password.length < 6) e.password = "At least 6 characters.";
    setErrors(e);
    if (!Object.keys(e).length) setStep(2);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!form.org.trim()) return setErrors({ org: "Organization is required." });
    setLoading(true);
    await register(form);
    router.push("/app");
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        {[1, 2].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? "bg-teal" : "bg-black/10 dark:bg-white/10"}`} />
        ))}
      </div>
      <h1 className="font-heading text-3xl font-extrabold text-heading">
        {step === 1 ? "Create your account" : "About your organization"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {step === 1 ? "Start a free demo tenant in seconds." : "We'll tailor the console to your role and edition."}
      </p>

      {step === 1 ? (
        <div className="mt-7 space-y-4">
          <Field label="Full name" htmlFor="name" required error={errors.name}>
            <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Dr. Jane Doe" />
          </Field>
          <Field label="Work email" htmlFor="email" required error={errors.email}>
            <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@hospital.org" />
          </Field>
          <Field label="Password" htmlFor="password" required error={errors.password} hint="At least 6 characters.">
            <Input id="password" type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="••••••••" />
          </Field>
          <Button onClick={next} className="w-full" size="lg">Continue</Button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-7 space-y-4">
          <Field label="Organization" htmlFor="org" required error={errors.org}>
            <Input id="org" value={form.org} onChange={(e) => set("org", e.target.value)} placeholder="Sunrise Hospital" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Your role" htmlFor="role">
              <Select id="role" value={form.role} onChange={(e) => set("role", e.target.value)}>
                {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </Select>
            </Field>
            <Field label="Edition" htmlFor="edition">
              <Select id="edition" value={form.edition} onChange={(e) => set("edition", e.target.value)}>
                {["clinic", "hospital", "diagnostics", "pharmacy", "enterprise"].map((r) => (
                  <option key={r} value={r} className="capitalize">{r}</option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button type="submit" loading={loading} className="flex-1"><Check className="h-4 w-4" /> Create account</Button>
          </div>
        </form>
      )}

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account? <Link href="/login" className="font-semibold text-teal hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
