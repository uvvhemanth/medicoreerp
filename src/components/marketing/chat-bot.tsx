"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Send, Calendar, Sparkles, Minimize2 } from "lucide-react";

type ChatMsg = { id: string; role: "bot" | "user"; text: string };

const QUICK = [
  "What is MedicoreERP?",
  "Pricing?",
  "Book a demo",
  "AI Ambient Scribe",
  "Is it HIPAA / ABDM ready?",
];

function botReply(input: string): string {
  const q = input.toLowerCase();
  if (/(dashboard|his|module tile|hospital management)/.test(q)) {
    return "Open the interactive HIS dashboard at /dashboard — module tiles follow your patient journey from registration to follow-up.";
  }
  if (/(emr|electronic medical|medical record|chart)/.test(q)) {
    return "Our EMR is a full digital chart — notes, orders, results, and audit trail. Open /product/emr or ask me to book a demo.";
  }
  if (/(appointment|schedule|booking|slot|no-show)/.test(q)) {
    return "Appointments covers multi-doctor calendars, online booking, queues, and no-show prediction. See /product/appointments.";
  }
  if (/(bill|invoice|gst|payment|upi)/.test(q)) {
    return "Billing & Invoices handles OPD/IPD charges, GST invoices, packages, and UPI/card receipts. See /product/billing-invoices.";
  }
  if (/(reminder|whatsapp|sms|recall|follow-?up)/.test(q)) {
    return "Patient Reminders send SMS/WhatsApp appointment nudges, recalls, and med refill alerts. See /product/patient-reminders.";
  }
  if (/(demo|meeting|book|schedule|call)/.test(q)) {
    return "Great — pick a 30-minute demo slot on our booking page. You’ll get an instant confirmation (demo calendar). Open Book a demo below.";
  }
  if (/(price|pricing|cost|₹|rupee)/.test(q)) {
    return "Clinic starts at ₹8,000/mo. Hospitals are ₹1,200/bed/mo. AI is included at Hospital+. See /pricing or ask me to book a demo for a tailored quote.";
  }
  if (/(hipaa|abdm|gdpr|soc|compliance|security)/.test(q)) {
    return "Yes — built for HIPAA, GDPR, ABDM, SOC 2 Type II, ISO 27001, and NABH contexts. Visit /security or /security/compliance for details.";
  }
  if (/(scribe|ambient|documentation|soap)/.test(q)) {
    return "Ambient Scribe turns a consult into a signed, coded SOAP note — human always signs. Hospitals cut documentation time ~62%. See /ai/ambient-scribe.";
  }
  if (/(rcm|denial|claim|billing)/.test(q)) {
    return "Autonomous RCM helps code, scrub, and draft appeals with a human approver. Customers often see ~45% fewer denials. See /ai/autonomous-rcm.";
  }
  if (/(fhir|hl7|interop|abha)/.test(q)) {
    return "MedicoreERP is FHIR-native with HL7, DICOM, and ABDM/TEFCA readiness — plus guaranteed data-freedom exports. See /interoperability.";
  }
  if (/(what is|aether|hospital|erp|his)/.test(q)) {
    return "MedicoreERP is an AI-native medical ERP / hospital OS — clinical, revenue, pharmacy, lab, HR, and analytics on one platform. Fast to deploy, honestly priced.";
  }
  if (/(hello|hi|hey|namaste)/.test(q)) {
    return "Hi! I’m MedicoreERP Assist — free on this site. Ask about product, pricing, AI, compliance, or say “book a demo” to schedule a meeting.";
  }
  return "I can help with product modules, AI, pricing, security, or booking a demo meeting. Try a quick question below, or open Book a demo.";
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

  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

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
    setInput("");
    setBusy(true);
    await new Promise((r) => setTimeout(r, 450));
    push("bot", botReply(trimmed));
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
                placeholder="Ask about product, pricing, demo…"
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
