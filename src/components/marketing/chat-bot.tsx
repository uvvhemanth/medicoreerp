"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Send, Calendar, Sparkles, Minimize2, PhoneCall } from "lucide-react";
import { isValidPhone, submitLead } from "@/lib/leads";
import { trackEvent, trackLead } from "@/lib/analytics";

type ChatMsg = { id: string; role: "bot" | "user"; text: string };

/** Buying-intent questions that should offer an instant callback form. */
const CALLBACK_INTENT = /(demo|meeting|book|schedule|call|price|pricing|cost|₹|rupee|quote|callback|contact|talk|sales)/i;

const QUICK = [
  "Get a callback",
  "What is MedicoreERP?",
  "Book a demo",
  "AI Ambient Scribe",
  "Is it HIPAA / ABDM ready?",
];

function botReply(input: string): string {
  const q = input.toLowerCase();
  if (/(callback|call me|talk to sales)/.test(q)) {
    return "Sure — leave your name and mobile number below and our team will call or WhatsApp you within 1 business day.";
  }
  if (/(dashboard|his|module tile|hospital management)/.test(q)) {
    return "The MedicoreERP HIS Dashboard gives one view of hospital KPIs, OPD/IPD, occupancy, revenue and department performance. See /product/his-dashboard, or open the live module tiles at /dashboard.";
  }
  if (/(emr|electronic medical|medical record|chart)/.test(q)) {
    return "MedicoreERP EMR keeps patient history, diagnoses, prescriptions, notes, labs and imaging in one digital record. See /product/electronic-medical-records or ask me to book a demo.";
  }
  if (/(opd|ipd|clinical management|admission|discharge summary|ward management)/.test(q)) {
    return "MedicoreERP Clinical Management Software connects EMR with OPD and IPD — consultations, prescriptions, nursing, admissions and discharge. See /product/clinical-emr-opd-ipd.";
  }
  if (/(appointment|schedule|booking|slot|no-show)/.test(q)) {
    return "MedicoreERP Appointment Management Software covers doctor availability, time slots, walk-ins, queues, rescheduling and reminders. See /product/appointments.";
  }
  if (/(radiology|\bris\b|\bpacs\b|dicom|imaging order|medical imaging)/.test(q)) {
    return "MedicoreERP Radiology Management Software connects imaging orders, RIS workflows, PACS/DICOM and digital reports. See /product/radiology.";
  }
  if (/(laboratory|\blis\b|\blims\b|lab report|sample tracking|analyzer integration)/.test(q)) {
    return "MedicoreERP Laboratory Information System (LIS/LIMS) manages orders, samples, barcode tracking, results, validation and digital reports. See /product/laboratory.";
  }
  if (/(pharmacy|dispense|medicine inventory|expiry|e-?prescription)/.test(q)) {
    return "MedicoreERP Hospital Pharmacy Management Software connects e-prescriptions, inventory, batches, expiry, purchases and dispensing. See /product/pharmacy.";
  }
  if (/(bill|invoice|gst|payment|upi)/.test(q)) {
    return "MedicoreERP Hospital Billing Software connects OPD/IPD charges, invoices, payments, outstanding balances, pharmacy, laboratory and TPA billing. See /product/billing-invoices.";
  }
  if (/(patient access|registration|check-?in|front.?desk|duplicate record)/.test(q)) {
    return "MedicoreERP Patient Access Software simplifies registration, digital profiles, check-in and front-desk workflows. See /product/patient-access.";
  }
  if (/(reminder|whatsapp|sms|recall|follow-?up)/.test(q)) {
    return "MedicoreERP Patient Reminder Software automates appointment, follow-up and recall notifications through SMS and WhatsApp. See /product/patient-reminders.";
  }
  if (/(demo|meeting|book|schedule|call)/.test(q)) {
    return "Great — pick a 30-minute demo slot on our booking page. You’ll get an instant confirmation (demo calendar). Open Book a demo below.";
  }
  if (/(price|pricing|cost|₹|rupee|quote)/.test(q)) {
    return "For plans and quotes, book a demo — our team will walk you through options for your hospital or clinic.";
  }
  if (/(hipaa|abdm|gdpr|soc|compliance|security)/.test(q)) {
    return "Yes — built for HIPAA, GDPR, ABDM, SOC 2 Type II, ISO 27001, and NABH contexts. Visit /security or /security/compliance for details.";
  }
  if (/(scribe|ambient|documentation|soap)/.test(q)) {
    return "Ambient Scribe turns a consult into a signed, coded SOAP note — human always signs. Hospitals cut documentation time ~62%. See /ai/ambient-scribe.";
  }
  if (/(analytics|mis report|kpi dashboard|hospital reporting)/.test(q)) {
    return "MedicoreERP Hospital Analytics Software turns clinical, operational and financial data into dashboards, KPIs and MIS reports. See /product/analytics.";
  }
  if (/(workforce|hrm|human resource|staff scheduling|roster|attendance|leave management)/.test(q)) {
    return "MedicoreERP Hospital HR Management Software centralizes employees, attendance, shifts, rosters, leave and workforce information. See /product/workforce-hrm.";
  }
  if (/(supply chain|inventory|procurement|stock-?out|reorder|goods receipt)/.test(q)) {
    return "MedicoreERP Hospital Supply Chain Management Software covers inventory, suppliers, procurement, stock transfers and reorder levels. See /product/supply-chain.";
  }
  if (/(revenue cycle|\brcm\b|charge capture|accounts receivable|claims tracking)/.test(q)) {
    return "MedicoreERP Healthcare Revenue Cycle Management Software covers charge capture, billing, claims, collections, reconciliation and receivables. See /product/revenue-cycle.";
  }
  if (/(denial|autonomous rcm)/.test(q)) {
    return "Autonomous RCM helps code, scrub, and draft appeals with a human approver. Customers often see ~45% fewer denials. See /ai/autonomous-rcm.";
  }
  if (/(fhir|hl7|interop|abha)/.test(q)) {
    return "MedicoreERP is FHIR-native with HL7, DICOM, and ABDM/TEFCA readiness — plus guaranteed data-freedom exports. See /interoperability.";
  }
  if (/(what is|aether|medicore|hospital|erp|his)/.test(q)) {
    return "MedicoreERP is an AI-native medical ERP / hospital OS — clinical, revenue, pharmacy, lab, HR, and analytics on one platform. Fast to deploy.";
  }
  if (/(hello|hi|hey|namaste)/.test(q)) {
    return "Hi! I’m MedicoreERP Assist — free on this site. Ask about product, AI, compliance, or say “book a demo” to schedule a meeting.";
  }
  return "I can help with product modules, AI, security, or booking a demo meeting. Try a quick question below, or open Book a demo.";
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi — I’m MedicoreERP Assist (free). Ask anything about the platform, or book a 30-minute demo meeting.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const [showCallback, setShowCallback] = useState(false);
  const [callbackDone, setCallbackDone] = useState(false);
  const [callbackBusy, setCallbackBusy] = useState(false);
  const [callbackError, setCallbackError] = useState("");
  const lastQuestion = useRef("");

  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

  const submitCallback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (callbackBusy) return;
    const form = new FormData(e.currentTarget);
    const name = String(form.get("cb_name") ?? "").trim();
    const phone = String(form.get("cb_phone") ?? "").trim();
    if (!name) return setCallbackError("Please enter your name.");
    if (!isValidPhone(phone)) return setCallbackError("Enter a valid mobile number.");
    setCallbackError("");
    setCallbackBusy(true);
    try {
      await submitLead({
        name,
        phone,
        email: "",
        variant: "chatbot-callback",
        message: lastQuestion.current || "Callback requested from chat",
        page: window.location.pathname,
      });
      trackLead("chatbot-callback");
      setCallbackDone(true);
      setShowCallback(false);
      push("bot", `Thanks, ${name}! Our team will call or WhatsApp you on ${phone} within 1 business day.`);
    } catch (error) {
      console.error("[chat-callback-failed]", error);
      setCallbackError("Could not send. Please WhatsApp or call +91 99664 11913.");
    } finally {
      setCallbackBusy(false);
    }
  };

  useEffect(() => {
    const openFromHeader = () => setOpen(true);
    window.addEventListener("medicore:open-chat", openFromHeader);
    return () => window.removeEventListener("medicore:open-chat", openFromHeader);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const push = (role: "bot" | "user", text: string) => {
    setMessages((m) => [...m, { id: `${Date.now()}_${role}_${m.length}`, role, text }]);
  };

  const ask = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    push("user", trimmed);
    lastQuestion.current = trimmed;
    setInput("");
    setBusy(true);
    trackEvent("chat_message", { intent: CALLBACK_INTENT.test(trimmed) ? "buying" : "info" });
    await new Promise((r) => setTimeout(r, 450));
    push("bot", botReply(trimmed));
    if (!callbackDone && CALLBACK_INTENT.test(trimmed)) setShowCallback(true);
    setBusy(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[120] flex flex-col items-end gap-3">
      {open && (
        <div
          className="flex h-[min(560px,75vh)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border bg-card shadow-pop ring-1 ring-black/[0.06] dark:ring-white/[0.08]"
          role="dialog"
          aria-label="MedicoreERP Assist chat"
        >
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-ink via-teal-deep to-teal px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold">MedicoreERP Assist</p>
                <p className="text-[11px] text-white/75">Free chat · No login required</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg p-1.5 hover:bg-white/10"
              aria-label="Minimize chat"
              onClick={() => setOpen(false)}
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-mist/30 p-3 dark:bg-white/[0.02]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-md bg-teal text-white"
                      : "rounded-bl-md border bg-card text-body shadow-soft",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {busy && (
              <div className="text-xs font-semibold text-muted">MedicoreERP Assist is typing…</div>
            )}
            {showCallback && !busy && (
              <form
                onSubmit={submitCallback}
                noValidate
                className="space-y-2 rounded-2xl border border-teal/30 bg-card p-3 shadow-soft"
                aria-label="Request a callback"
              >
                <p className="flex items-center gap-1.5 text-sm font-bold text-heading">
                  <PhoneCall className="h-4 w-4 text-teal" /> Get a free callback
                </p>
                <input
                  name="cb_name"
                  autoComplete="name"
                  placeholder="Your name"
                  aria-label="Your name"
                  className="h-9 w-full rounded-control border bg-card px-3 text-sm text-heading placeholder:text-muted focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25"
                />
                <input
                  name="cb_phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="Mobile / WhatsApp number"
                  aria-label="Mobile or WhatsApp number"
                  className="h-9 w-full rounded-control border bg-card px-3 text-sm text-heading placeholder:text-muted focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25"
                />
                {callbackError && <p className="text-xs text-danger">{callbackError}</p>}
                <Button type="submit" size="sm" loading={callbackBusy} className="w-full">
                  Call me back
                </Button>
              </form>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t bg-card p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => ask(q)}
                  className="rounded-pill border bg-mist/50 px-2.5 py-1 text-[11px] font-semibold text-heading hover:border-teal/40 hover:text-teal"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about product, demo, AI…"
                className="h-10 flex-1 rounded-control border bg-card px-3 text-sm text-heading placeholder:text-muted focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25"
              />
              <Button type="submit" size="icon" disabled={!canSend} aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-control border border-teal/30 bg-teal/[0.06] px-3 py-2 text-sm font-semibold text-teal hover:bg-teal/10"
            >
              <Calendar className="h-4 w-4" /> Book a demo meeting
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-14 items-center gap-2 rounded-full bg-teal px-5 text-sm font-bold text-white shadow-pop transition hover:bg-teal-dark",
          open && "px-4",
        )}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open free chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!open && <span>Free chat</span>}
      </button>
    </div>
  );
}
