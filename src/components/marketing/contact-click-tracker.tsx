"use client";

import { useEffect } from "react";
import { trackEvent, trackLead } from "@/lib/analytics";

/**
 * One delegated listener that reports every WhatsApp, call, email and demo-CTA
 * click to GA4, wherever the link lives (header, footer, FABs, page bodies).
 */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const location = link.dataset.track ?? link.getAttribute("aria-label") ?? link.textContent?.trim().slice(0, 40);

      if (/wa\.me|api\.whatsapp\.com/.test(href)) {
        trackLead("whatsapp", { link_location: location });
      } else if (href.startsWith("tel:")) {
        trackLead("phone-call", { link_location: location });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_location: location });
      } else if (/^\/demo(\?|#|$)/.test(href) || /^\/contact(\?|#|$)/.test(href)) {
        trackEvent("cta_click", { cta_target: href, link_location: location });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
