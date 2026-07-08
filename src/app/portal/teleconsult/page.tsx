"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Video, Mic, PhoneOff, MessageSquare } from "lucide-react";

export default function TeleconsultPage() {
  const toast = useToast();
  const [inCall, setInCall] = useState(false);

  if (inCall) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] flex-col bg-ink p-4">
        <div className="relative flex-1 overflow-hidden rounded-card bg-black/50">
          <div className="grid h-full place-items-center text-white/50">
            <div className="text-center"><Video className="mx-auto h-12 w-12 opacity-40" /><p className="mt-2 text-sm">Dr. A. Menon</p></div>
          </div>
          <div className="absolute bottom-3 right-3 h-24 w-20 rounded-lg border-2 border-white/20 bg-white/10" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white"><Mic className="h-5 w-5" /></button>
          <button className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white"><MessageSquare className="h-5 w-5" /></button>
          <button onClick={() => { setInCall(false); toast.success("Call ended · e-prescription sent"); }} className="grid h-14 w-14 place-items-center rounded-full bg-danger text-white"><PhoneOff className="h-6 w-6" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="font-heading text-2xl font-extrabold text-heading">Teleconsult</h1>
      <Card>
        <CardBody className="pt-5 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mist text-teal"><Video className="h-8 w-8" /></div>
          <p className="mt-3 font-heading font-bold text-heading">Dr. A. Menon is ready</p>
          <p className="text-sm text-muted">Cardiology follow-up · You're next in the waiting room</p>
          <Button className="mt-4 w-full" onClick={() => setInCall(true)}><Video className="h-4 w-4" /> Join call</Button>
        </CardBody>
      </Card>
      <p className="text-center text-xs text-muted">By joining you consent to a secure, recorded consultation.</p>
    </div>
  );
}
