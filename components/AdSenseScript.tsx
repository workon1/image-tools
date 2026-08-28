"use client";

import Script from "next/script";
import { useConsent } from "@/components/ConsentProvider";
import { features } from "@/config/features";

export function AdSenseScript() {
  const { ready, preferences } = useConsent();
  const clientId = features.ads.clientId;

  const enabled =
    ready &&
    preferences?.advertising === true &&
    features.ads.enabled &&
    features.ads.provider === "adsense" &&
    Boolean(clientId);

  if (!enabled) return null;

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
