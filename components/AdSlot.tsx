"use client";

import { useEffect, useRef } from "react";
import { features } from "@/config/features";

type AdSlotName = "header" | "sidebar" | "inline" | "footer";

type AdSlotProps = {
  slot: AdSlotName;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

function slotIdFor(name: AdSlotName): string {
  if (name === "inline") return features.ads.inlineSlotId;
  return "";
}

/**
 * Advertisement region below tool content. Personalization is governed by
 * Consent Mode, so this only checks that AdSense is configured.
 */
export function AdSlot({ slot, className }: AdSlotProps) {
  const pushed = useRef(false);
  const adSlotId = slotIdFor(slot);
  const clientId = features.ads.clientId;

  const enabled =
    features.ads.enabled &&
    features.ads.provider === "adsense" &&
    Boolean(clientId) &&
    Boolean(adSlotId);

  useEffect(() => {
    if (!enabled || pushed.current) return;
    pushed.current = true;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      pushed.current = false;
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside data-ad-slot={slot} aria-label="Advertisement" className={className}>
      <ins
        className="adsbygoogle block min-h-[90px] w-full overflow-hidden rounded-2xl border border-line bg-surface"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={adSlotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
