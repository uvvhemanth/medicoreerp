"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { MailCheck, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-success/12 text-success"><MailCheck className="h-7 w-7" /></div>
        <h1 className="font-heading text-2xl font-extrabold text-heading">Check your inbox</h1>
        <p className="mt-2 text-sm text-muted">If an account exists for <b>{email}</b>, we've sent a reset link. (Demo — no email is actually sent.)</p>
        <Link href="/login" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold text-heading">Reset password</h1>
      <p className="mt-1 text-sm text-muted">Enter your email and we'll send a reset link.</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <Field label="Work email" htmlFor="email" required>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hospital.org" />
        </Field>
        <Button type="submit" loading={loading} className="w-full" size="lg">Send reset link</Button>
      </form>
      <Link href="/login" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-teal">
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
    </div>
  );
}
