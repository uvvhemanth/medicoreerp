"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CalendarCheck, CheckCircle2, Clock, Video } from "lucide-react";

type Errors = Record<string, string>;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const UTM_STORAGE_KEY = "medicore_utm";

const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

function nextBusinessDays(count: number) {
  const days: { value: string; label: string }[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd === 0 || wd === 6) continue;
    const value = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    days.push({ value, label });
  }
  return days;
}

function readStoredUtm(): Record<string, string> {
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function DemoBookingForm() {
  const dates = useMemo(() => nextBusinessDays(8), []);
  const [step, setStep] = useState<1 | 2>(1);
  const [meetingDate, setMeetingDate] = useState(dates[0]?.value ?? "");
  const [meetingTime, setMeetingTime] = useState("11:00 AM");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST)");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [booking, setBooking] = useState<{ leadId?: string; when?: string }>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored = readStoredUtm();
    const captured: Record<string, string> = { ...stored, page: window.location.pathname };
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v && !stored[k]) captured[k] = v;
    });
    const toStore: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      if (captured[k]) toStore[k] = captured[k];
    });
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(toStore));
    setUtm(captured);
  }, []);

  const selectedLabel = dates.find((d) => d.value === meetingDate)?.label ?? meetingDate;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries()) as Record<string, string>;
    const errs: Errors = {};
    if (!data.name?.trim()) errs.name = "Please enter your name.";
    if (!data.email?.includes("@")) errs.email = "Enter a valid work email.";
    if (!data.org?.trim()) errs.org = "Organization is required.";
    if (!meetingDate) errs.meetingDate = "Pick a date.";
    if (!meetingTime) errs.meetingTime = "Pick a time.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...utm,
          variant: "demo",
          meetingDate,
          meetingTime,
          timezone,
          consent: "marketing-demo-meeting",
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; leadId?: string };
      if (!res.ok || !json.ok) {
        setServerError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setBooking({
        leadId: json.leadId,
        when: `${selectedLabel} · ${meetingTime} · ${timezone}`,
      });
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please try again.");
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
        <h3 className="font-heading text-2xl font-bold text-heading">Demo request received</h3>
        <p className="mt-2 max-w-sm text-muted">
          We sent your request to info@medicoreerp.com. Our team will confirm your selected time by email.
        </p>
        <div className="mt-6 w-full max-w-sm space-y-2 rounded-card border bg-card p-4 text-left text-sm">
          <p className="flex items-center gap-2 font-semibold text-heading">
            <CalendarCheck className="h-4 w-4 text-teal" /> {booking.when}
          </p>
          <p className="flex items-center gap-2 text-muted">
            <Video className="h-4 w-4 text-teal" /> Meeting details will follow after confirmation
          </p>
          {booking.leadId && <p className="text-xs text-muted">Ref: {booking.leadId}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-card border bg-card p-6 shadow-soft sm:p-7">
      <div className="mb-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={cn(
            "rounded-pill px-3 py-1 text-xs font-bold",
            step === 1 ? "bg-teal text-white" : "bg-mist text-muted",
          )}
        >
          1. Meeting slot
        </button>
        <button
          type="button"
          onClick={() => meetingDate && meetingTime && setStep(2)}
          className={cn(
            "rounded-pill px-3 py-1 text-xs font-bold",
            step === 2 ? "bg-teal text-white" : "bg-mist text-muted",
          )}
        >
          2. Your details
        </button>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-semibold text-heading">Pick a date</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {dates.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setMeetingDate(d.value)}
                  className={cn(
                    "rounded-xl border px-2 py-3 text-center text-xs font-semibold transition",
                    meetingDate === d.value
                      ? "border-teal bg-teal/10 text-teal"
                      : "bg-card text-body hover:border-teal/40",
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
            {errors.meetingDate && <p className="mt-1 text-xs text-danger">{errors.meetingDate}</p>}
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-heading">
              <Clock className="h-4 w-4 text-teal" /> Pick a time
            </p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMeetingTime(t)}
                  className={cn(
                    "rounded-xl border px-2 py-2.5 text-center text-xs font-semibold transition",
                    meetingTime === t
                      ? "border-teal bg-teal/10 text-teal"
                      : "bg-card text-body hover:border-teal/40",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.meetingTime && <p className="mt-1 text-xs text-danger">{errors.meetingTime}</p>}
          </div>

          <Field label="Timezone" htmlFor="timezone">
            <Select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {[
                "Asia/Kolkata (IST)",
                "Asia/Dubai (GST)",
                "Asia/Singapore (SGT)",
                "Europe/London (GMT)",
                "America/New_York (ET)",
              ].map((z) => (
                <option key={z}>{z}</option>
              ))}
            </Select>
          </Field>

          <div className="rounded-xl border bg-mist/40 p-3 text-sm text-muted">
            Selected: <span className="font-semibold text-heading">{selectedLabel} · {meetingTime}</span>
          </div>

          <Button type="button" className="w-full" size="lg" onClick={() => setStep(2)}>
            Continue to details
          </Button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div className="rounded-xl border border-teal/25 bg-teal/[0.05] px-3 py-2 text-sm font-semibold text-teal">
            Meeting: {selectedLabel} · {meetingTime} · {timezone}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" htmlFor="name" required error={errors.name}>
              <Input id="name" name="name" aria-invalid={!!errors.name} placeholder="Dr. Jane Doe" />
            </Field>
            <Field label="Work email" htmlFor="email" required error={errors.email}>
              <Input id="email" name="email" type="email" aria-invalid={!!errors.email} placeholder="jane@hospital.org" />
            </Field>
          </div>

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

          <Field label="What should we focus on?" htmlFor="message">
            <Textarea id="message" name="message" placeholder="e.g. Ambient Scribe + RCM for a 200-bed hospital" />
          </Field>

          {serverError && <p className="text-sm text-danger">{serverError}</p>}

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="outline" className="sm:w-1/3" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" loading={loading} className="sm:flex-1" size="lg">
              Confirm demo meeting
            </Button>
          </div>
          <p className="text-center text-xs text-muted">
            Free 30-minute video demo.
          </p>
        </form>
      )}
    </div>
  );
}
