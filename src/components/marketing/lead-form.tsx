"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { sendLeadWithEmailJs } from "@/lib/emailjs";
import { CheckCircle2, CalendarCheck } from "lucide-react";

type Variant = "demo" | "contact" | "sandbox";

interface Errors { [k: string]: string }

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const UTM_STORAGE_KEY = "medicore_utm";

function readStoredUtm(): Record<string, string> {
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function LeadForm({ variant = "demo" }: { variant?: Variant }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    // Persist first-touch UTMs and attach page context (§7.3)
    const params = new URLSearchParams(window.location.search);
    const stored = readStoredUtm();
    const captured: Record<string, string> = { ...stored, page: window.location.pathname };
    let touched = false;
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v && !stored[k]) {
        captured[k] = v;
        touched = true;
      }
    });
    if (touched || !localStorage.getItem(UTM_STORAGE_KEY)) {
      const toStore: Record<string, string> = {};
      UTM_KEYS.forEach((k) => {
        if (captured[k]) toStore[k] = captured[k];
      });
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(toStore));
    }
    setUtm(captured);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries()) as Record<string, string>;
    const errs: Errors = {};
    if (!data.name?.trim()) errs.name = "Please enter your name.";
    if (!data.email?.includes("@")) errs.email = "Enter a valid work email.";
    if (variant !== "contact" && !data.org?.trim()) errs.org = "Organization is required.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await sendLeadWithEmailJs({
        ...data,
        ...utm,
        name: data.name,
        email: data.email,
        variant,
        consent: "marketing-demo",
      });
      setSubmitted(true);
    } catch (error) {
      console.error("[lead-email-failed]", error);
      setServerError("We could not deliver your request. Please email info@medicoreerp.com or call +91 99664 11913.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card border-2 border-teal/25 bg-teal/[0.04] p-10 text-center">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-heading">
          {variant === "sandbox" ? "Request received" : "Thank you — your request was sent."}
        </h3>
        <p className="mt-2 max-w-sm text-muted">
          {variant === "sandbox"
            ? "Our team will contact you with the next steps."
            : "Our team will reach out within one business day."}
        </p>
        {variant !== "sandbox" && (
          <div className="mt-6 flex items-center gap-2 rounded-lg bg-card px-4 py-3 text-sm">
            <CalendarCheck className="h-5 w-5 text-teal" />
            <span className="text-body">Our team will confirm the next step by email</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-card border bg-card p-7 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={errors.name}>
          <Input id="name" name="name" aria-invalid={!!errors.name} placeholder="Dr. Jane Doe" />
        </Field>
        <Field label="Work email" htmlFor="email" required error={errors.email}>
          <Input id="email" name="email" type="email" aria-invalid={!!errors.email} placeholder="jane@hospital.org" />
        </Field>
      </div>

      {variant !== "contact" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Organization" htmlFor="org" required error={errors.org}>
            <Input id="org" name="org" aria-invalid={!!errors.org} placeholder="Sunrise Hospital" />
          </Field>
          <Field label="Your role" htmlFor="role">
            <Select id="role" name="role" defaultValue="CEO / Founder">
              {["CEO / Founder", "CMO / Medical Director", "CFO / Finance", "CIO / IT", "Operations", "Developer", "Other"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </Select>
          </Field>
        </div>
      )}

      {variant === "demo" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Organization size" htmlFor="size">
            <Select id="size" name="size" defaultValue="50–200 beds">
              {["Single clinic", "2–10 clinics", "< 50 beds", "50–200 beds", "200–500 beds", "500+ beds", "Lab / Pharmacy chain"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </Select>
          </Field>
          <Field label="Edition of interest" htmlFor="edition">
            <Select id="edition" name="edition" defaultValue="Hospital">
              {["Clinic", "Hospital", "Diagnostics", "Pharmacy", "Enterprise", "Government"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </Select>
          </Field>
        </div>
      )}

      <Field label={variant === "contact" ? "How can we help?" : "Anything specific you'd like to see?"} htmlFor="message">
        <Textarea id="message" name="message" placeholder="Optional" />
      </Field>

      {serverError && <p className="text-sm text-danger">{serverError}</p>}

      <Button type="submit" loading={loading} className="w-full" size="lg">
        {variant === "sandbox" ? "Create my sandbox" : variant === "contact" ? "Send message" : "Book my demo"}
      </Button>
      <p className="text-center text-xs text-muted">
        By submitting you agree to our privacy policy.
      </p>
    </form>
  );
}
