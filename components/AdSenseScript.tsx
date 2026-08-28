import Script from "next/script";
import { features } from "@/config/features";

/**
 * AdSense tag. It also delivers Google's certified CMP, which collects consent
 * in the EEA, the UK, and Switzerland, so it must not be gated behind a
 * separate in-app banner.
 */
export function AdSenseScript() {
  const clientId = features.ads.clientId;
  if (!features.ads.enabled || features.ads.provider !== "adsense" || !clientId) {
    return null;
  }

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
