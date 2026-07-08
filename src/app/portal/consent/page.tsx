"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";
import { ShieldCheck, Lock } from "lucide-react";

const initial = [
  { id: "1", party: "Dr. A. Menon (Cardiology)", scope: "Full medical record", granted: true },
  { id: "2", party: "Star Health Insurance", scope: "Claims & billing only", granted: true },
  { id: "3", party: "Metro Diagnostics", scope: "Lab results", granted: false },
  { id: "4", party: "Research Program (anonymized)", scope: "De-identified data", granted: false },
];

export default function ConsentPage() {
  const toast = useToast();
  const [consents, setConsents] = useState(initial);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-6 w-6 text-teal" />
        <h1 className="font-heading text-2xl font-extrabold text-heading">Privacy & Consent</h1>
      </div>
      <p className="text-sm text-muted">You control who can see and share your data. Every change is cryptographically logged.</p>

      {consents.map((c) => (
        <Card key={c.id}>
          <CardBody className="flex items-center gap-3 pt-5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-heading">{c.party}</p>
              <p className="text-xs text-muted">{c.scope}</p>
            </div>
            <Switch
              checked={c.granted}
              onChange={(v) => { setConsents((cs) => cs.map((x) => (x.id === c.id ? { ...x, granted: v } : x))); toast.info(`${v ? "Granted" : "Revoked"} access for ${c.party}`); }}
            />
          </CardBody>
        </Card>
      ))}

      <div className="flex items-start gap-3 rounded-card border bg-mist/40 p-4">
        <Lock className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
        <p className="text-sm text-body">Every access to your record is logged in an immutable audit trail you can review anytime.</p>
      </div>
    </div>
  );
}
