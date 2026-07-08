"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("aether-consent");
    if (!consent) setShow(true);
  }, []);

  const decide = (v: "all" | "essential") => {
    localStorage.setItem("aether-consent", v);
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-4">
      <div className="container-page">
        <div className="flex animate-fade-in flex-col items-start gap-4 rounded-card border bg-card p-5 shadow-pop sm:flex-row sm:items-center">
          <Cookie className="h-6 w-6 shrink-0 text-teal" />
          <p className="flex-1 text-sm text-body">
            We use privacy-respecting cookies to improve your experience. No non-essential tracking runs before you consent (GDPR).
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => decide("essential")}>
              Essential only
            </Button>
            <Button size="sm" onClick={() => decide("all")}>
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
