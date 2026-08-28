"use client";

import { useEffect, useState } from "react";

type FundingChoices = {
  showRevocationMessage?: () => void;
};

declare global {
  interface Window {
    googlefc?: FundingChoices;
  }
}

/**
 * Reopens Google's certified CMP. Google only loads it for visitors it must
 * ask, so the link stays hidden everywhere else rather than showing a control
 * that does nothing.
 */
export function CookieSettingsLink() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window.googlefc?.showRevocationMessage === "function") {
        setAvailable(true);
        return true;
      }
      return false;
    };

    if (check()) return;
    const timer = window.setInterval(() => {
      if (check()) window.clearInterval(timer);
    }, 1000);
    const stop = window.setTimeout(() => window.clearInterval(timer), 15000);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(stop);
    };
  }, []);

  if (!available) return null;

  return (
    <button
      type="button"
      onClick={() => window.googlefc?.showRevocationMessage?.()}
      className="text-muted transition-colors hover:text-accent"
    >
      Cookie settings
    </button>
  );
}
