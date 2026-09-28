"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function applyGpc() {
  if (typeof window.gtag !== "function") return false;
  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("set", "ads_data_redaction", true);
  return true;
}

/**
 * Honors Global Privacy Control (GPC) by updating Consent Mode to deny ad
 * personalization and ad user data. Polls briefly until gtag is available.
 */
export function GpcConsent() {
  useEffect(() => {
    const gpc =
      typeof navigator !== "undefined" &&
      "globalPrivacyControl" in navigator &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).globalPrivacyControl === true;
    if (!gpc) return;

    if (applyGpc()) return;

    const timer = window.setInterval(() => {
      if (applyGpc()) window.clearInterval(timer);
    }, 200);
    const stop = window.setTimeout(() => window.clearInterval(timer), 8000);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(stop);
    };
  }, []);

  return null;
}
