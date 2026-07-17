"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Clock, FileX2, IndianRupee } from "lucide-react";

function Slider({ label, value, onChange, min, max, step, suffix, icon: Icon }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-semibold text-heading">
          <Icon className="h-4 w-4 text-teal" /> {label}
        </label>
        <span className="rounded-lg bg-mist px-2.5 py-1 text-sm font-bold text-teal">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-teal dark:bg-white/10"
        aria-label={label}
      />
    </div>
  );
}

export function RoiCalculator() {
  const [beds, setBeds] = useState(200);
  const [denialRate, setDenialRate] = useState(11);
  const [docHours, setDocHours] = useState(2);
  const [email, setEmail] = useState("");
  const toast = useToast();

  const result = useMemo(() => {
    // Simple, transparent model (mock).
    const annualRevenuePerBed = 1_800_000;
    const revenue = beds * annualRevenuePerBed;
    const denialRecovery = revenue * (denialRate / 100) * 0.45; // recover 45% of denials
    const docSavings = beds * 3 * docHours * 0.5 * 250 * 300; // staff hours reclaimed value (rough)
    const chargeCapture = revenue * 0.02; // 2% leakage recovered
    const totalGain = denialRecovery + docSavings * 0.0002 + chargeCapture;
    const cost = beds * 1200 * 12;
    const payback = Math.max(1, Math.round((cost / (totalGain / 12)) * 10) / 10);
    return { totalGain, cost, payback, denialRecovery, chargeCapture };
  }, [beds, denialRate, docHours]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-7 rounded-card border bg-card p-7 shadow-soft">
        <Slider label="Beds" value={beds} onChange={setBeds} min={10} max={2000} step={10} icon={TrendingUp} />
        <Slider label="Current denial rate" value={denialRate} onChange={setDenialRate} min={2} max={25} step={1} suffix="%" icon={FileX2} />
        <Slider label="Doc hours / clinician / day" value={docHours} onChange={setDocHours} min={0.5} max={5} step={0.5} suffix="h" icon={Clock} />
      </div>

      {/* Result */}
      <div className="flex flex-col justify-between rounded-card border-2 border-teal/25 bg-gradient-to-br from-teal/[0.06] to-clinical/[0.04] p-7 shadow-soft">
        <div>
          <p className="text-sm font-semibold text-muted">Estimated annual gain</p>
          <p className="mt-1 flex items-center font-heading text-4xl font-extrabold text-teal sm:text-5xl">
            <IndianRupee className="h-8 w-8" />{Math.round(result.totalGain / 100000)}L
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-card p-4">
              <p className="text-xs text-muted">Denial recovery</p>
              <p className="font-heading text-lg font-bold text-heading">{formatCurrency(result.denialRecovery)}</p>
            </div>
            <div className="rounded-lg bg-card p-4">
              <p className="text-xs text-muted">Charge capture</p>
              <p className="font-heading text-lg font-bold text-heading">{formatCurrency(result.chargeCapture)}</p>
            </div>
            <div className="rounded-lg bg-card p-4">
              <p className="text-xs text-muted">Platform cost / yr</p>
              <p className="font-heading text-lg font-bold text-heading">{formatCurrency(result.cost)}</p>
            </div>
            <div className="rounded-lg bg-teal p-4 text-white">
              <p className="text-xs opacity-80">Payback period</p>
              <p className="font-heading text-lg font-bold">{result.payback} months</p>
            </div>
          </div>
        </div>

        <form
          className="mt-6 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Detailed ROI report sent — check your inbox (demo).");
            setEmail("");
          }}
        >
          <Field className="flex-1" htmlFor="roi-email">
            <Input id="roi-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email for a detailed report" />
          </Field>
          <Button type="submit">Email me the report</Button>
        </form>
      </div>
      <p className="text-xs text-muted lg:col-span-2">
        * Illustrative estimate on a transparent model. Actual results vary by organization.
      </p>
    </div>
  );
}
