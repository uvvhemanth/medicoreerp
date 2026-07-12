"use client";

import { useEffect } from "react";

/**
 * Removes the Next.js local-dev "1 Issue" / N badge portal.
 * That overlay is Shadow DOM, so normal CSS cannot hide it reliably.
 */
export function HideNextDevBadge() {
  useEffect(() => {
    const wipe = () => {
      document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
      document.querySelectorAll("[data-nextjs-toast]").forEach((el) => el.remove());
      document.querySelectorAll("[data-next-badge-root]").forEach((el) => el.remove());
    };

    wipe();
    const obs = new MutationObserver(wipe);
    obs.observe(document.documentElement, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return null;
}
