"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Stethoscope, ChevronRight, Check } from "lucide-react";

const symptoms = ["Chest pain", "Fever", "Cough", "Headache", "Stomach pain", "Skin rash", "Joint pain", "Fatigue"];
const specialtyFor: Record<string, string> = { "Chest pain": "Cardiology", Fever: "General Medicine", Cough: "Pulmonology", Headache: "Neurology", "Stomach pain": "Gastroenterology", "Skin rash": "Dermatology", "Joint pain": "Orthopedics", Fatigue: "General Medicine" };
const slots = ["09:00 AM", "10:30 AM", "12:00 PM", "03:00 PM", "05:30 PM"];

export default function BookPage() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [symptom, setSymptom] = useState("");
  const [slot, setSlot] = useState("");

  return (
    <div className="space-y-4 p-4">
      <h1 className="font-heading text-2xl font-extrabold text-heading">Symptom Checker</h1>
      <div className="flex gap-1.5">{[0, 1, 2].map((s) => <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? "bg-teal" : "bg-black/10 dark:bg-white/10"}`} />)}</div>

      {step === 0 && (
        <>
          <p className="text-sm text-muted">What's bothering you today?</p>
          <div className="grid grid-cols-2 gap-2">
            {symptoms.map((s) => (
              <button key={s} onClick={() => { setSymptom(s); setStep(1); }} className="rounded-card border bg-card p-4 text-left text-sm font-semibold text-heading shadow-soft hover:border-teal/40">{s}</button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <Card>
          <CardBody className="pt-5">
            <div className="flex items-center gap-2 text-teal"><Stethoscope className="h-5 w-5" /><p className="font-heading font-bold">Recommended specialty</p></div>
            <p className="mt-2 text-xl font-bold text-heading">{specialtyFor[symptom]}</p>
            <p className="text-sm text-muted">Based on: {symptom}</p>
            <p className="mt-3 text-sm font-semibold text-heading">Pick a time</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {slots.map((s) => (
                <button key={s} onClick={() => setSlot(s)} className={`rounded-lg border py-2.5 text-sm font-semibold ${slot === s ? "border-teal bg-teal/10 text-teal" : "text-body"}`}>{s}</button>
              ))}
            </div>
            <Button className="mt-4 w-full" disabled={!slot} onClick={() => setStep(2)}>Continue <ChevronRight className="h-4 w-4" /></Button>
          </CardBody>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardBody className="pt-6 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success"><Check className="h-8 w-8" /></div>
            <p className="mt-3 font-heading text-lg font-bold text-heading">Appointment booked!</p>
            <p className="mt-1 text-sm text-muted">{specialtyFor[symptom]} · Tomorrow · {slot}</p>
            <p className="mt-2 text-xs text-muted">Your intake form is pre-filled from your symptoms.</p>
            <Button className="mt-4 w-full" onClick={() => { toast.success("Added to your visits"); router.push("/portal"); }}>Done</Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
