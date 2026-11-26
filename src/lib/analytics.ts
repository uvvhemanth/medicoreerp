type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

/** Send a Google Analytics 4 event. Safe to call before gtag loads or during SSR. */
export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, { transport_type: "beacon", ...params });
  } catch {
    // Analytics must never break the page.
  }
}

/** GA4 recommended conversion event for a captured lead. Mark `generate_lead` as a key event in GA4. */
export function trackLead(source: string, params: GtagParams = {}) {
  trackEvent("generate_lead", {
    lead_source: source,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    ...params,
  });
}
