"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight, Save, UserPlus, Camera, ScanLine } from "lucide-react";

const STEPS = ["Identity", "Contact & IDs", "Clinical", "Review"];

interface FormData {
  firstName: string; lastName: string; dob: string; sex: string;
  phone: string; email: string; abha: string; address: string;
  bloodGroup: string; allergies: string; chronic: string; insurance: string;
}

const empty: FormData = { firstName: "", lastName: "", dob: "", sex: "M", phone: "", email: "", abha: "", address: "", bloodGroup: "O+", allergies: "", chronic: "", insurance: "Self-pay" };

export default function RegisterPatientPage() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Autosave to localStorage (§1.8.4 never lose typed work)
  useEffect(() => {
    const stored = localStorage.getItem("aether-register-draft");
    if (stored) setForm(JSON.parse(stored));
  }, []);
  useEffect(() => {
    const t = setTimeout(() => {
      if (JSON.stringify(form) !== JSON.stringify(empty)) {
        localStorage.setItem("aether-register-draft", JSON.stringify(form));
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      }
    }, 800);
    return () => clearTimeout(t);
  }, [form]);

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim()) e.lastName = "Required";
      if (!form.dob) e.dob = "Required";
    }
    if (step === 1) {
      if (!/^\+?[\d\s]{8,}$/.test(form.phone)) e.phone = "Enter a valid phone";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validateStep() && setStep((s) => Math.min(s + 1, STEPS.length - 1));

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    localStorage.removeItem("aether-register-draft");
    setSubmitting(false);
    toast.success(`Patient registered · UHID assigned`, { label: "Undo", onClick: () => {} });
    router.push("/app/patients");
  };

  return (
    <>
      <PageHeader
        title="Register Patient"
        breadcrumbs={[{ label: "Patient Access" }, { label: "Register" }]}
        subtitle="Autosaves as you type · <30-second registration"
        actions={saved ? <span className="flex items-center gap-1.5 text-xs font-semibold text-success"><Save className="h-3.5 w-3.5" /> Draft saved</span> : undefined}
      />

      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        {/* Stepper */}
        <div className="mb-6 flex items-center">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div className={cn("grid h-9 w-9 place-items-center rounded-full text-sm font-bold transition", i < step ? "bg-teal text-white" : i === step ? "bg-teal text-white ring-4 ring-teal/20" : "bg-black/[0.06] text-muted dark:bg-white/10")}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn("mt-1 hidden text-xs font-medium sm:block", i === step ? "text-teal" : "text-muted")}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={cn("mx-2 h-0.5 flex-1", i < step ? "bg-teal" : "bg-black/10 dark:bg-white/10")} />}
            </div>
          ))}
        </div>

        <Card>
          <CardBody className="pt-6">
            {step === 0 && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" onClick={() => toast.info("Camera capture (demo)")}><Camera className="h-4 w-4" /> Photo</Button>
                  <Button variant="outline" size="sm" onClick={() => { toast.success("ID scanned — fields prefilled (demo)"); setForm((f) => ({ ...f, firstName: "Meera", lastName: "Sharma", dob: "1990-05-14", sex: "F" })); }}><ScanLine className="h-4 w-4" /> Scan ID (OCR)</Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" required error={errors.firstName}><Input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} aria-invalid={!!errors.firstName} /></Field>
                  <Field label="Last name" required error={errors.lastName}><Input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} aria-invalid={!!errors.lastName} /></Field>
                  <Field label="Date of birth" required error={errors.dob}><Input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} aria-invalid={!!errors.dob} /></Field>
                  <Field label="Sex"><Select value={form.sex} onChange={(e) => set("sex", e.target.value)}><option value="M">Male</option><option value="F">Female</option><option value="O">Other</option></Select></Field>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" required error={errors.phone}><Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" aria-invalid={!!errors.phone} /></Field>
                <Field label="Email"><Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
                <Field label="ABHA number" hint="Auto-generated if left blank"><Input value={form.abha} onChange={(e) => set("abha", e.target.value)} placeholder="14-digit ABHA" /></Field>
                <Field label="Insurance"><Select value={form.insurance} onChange={(e) => set("insurance", e.target.value)}>{["Self-pay", "Star Health", "HDFC Ergo", "CGHS", "ESIC"].map((o) => <option key={o}>{o}</option>)}</Select></Field>
                <Field label="Address" className="sm:col-span-2"><Input value={form.address} onChange={(e) => set("address", e.target.value)} /></Field>
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Blood group"><Select value={form.bloodGroup} onChange={(e) => set("bloodGroup", e.target.value)}>{["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((o) => <option key={o}>{o}</option>)}</Select></Field>
                <div />
                <Field label="Known allergies" hint="Comma-separated" className="sm:col-span-2"><Input value={form.allergies} onChange={(e) => set("allergies", e.target.value)} placeholder="Penicillin, Sulfa" /></Field>
                <Field label="Chronic conditions" className="sm:col-span-2"><Input value={form.chronic} onChange={(e) => set("chronic", e.target.value)} placeholder="Diabetes, Hypertension" /></Field>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-heading">Review & confirm</h3>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Name", `${form.firstName} ${form.lastName}`], ["DOB", form.dob || "—"], ["Sex", form.sex],
                    ["Phone", form.phone || "—"], ["Email", form.email || "—"], ["ABHA", form.abha || "auto"],
                    ["Blood group", form.bloodGroup], ["Insurance", form.insurance], ["Allergies", form.allergies || "None"], ["Chronic", form.chronic || "None"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-lg border bg-surface/50 p-3"><dt className="text-xs text-muted">{k}</dt><dd className="mt-0.5 font-medium text-heading">{v}</dd></div>
                  ))}
                </dl>
                {form.allergies && (
                  <div className="rounded-control border-2 border-critical/30 bg-critical/[0.06] px-3 py-2 text-sm font-semibold text-critical">
                    ⚠ Allergies recorded — will surface on every order screen.
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}><ChevronLeft className="h-4 w-4" /> Back</Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next}>Continue <ChevronRight className="h-4 w-4" /></Button>
              ) : (
                <Button onClick={submit} loading={submitting}><UserPlus className="h-4 w-4" /> Assign UHID & register</Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
