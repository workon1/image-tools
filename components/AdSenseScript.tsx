import Script from "next/script";
import { features } from "@/config/features";

/**
 * AdSense tag. It also delivers Google's certified CMP for EEA/UK/CH visitors.
 * Load whenever analytics or ads need that CMP, even if display ads are still
 * paused via pauseAdRequests until ADS_ENABLED is true.
 */
export function AdSenseScript() {
  const clientId = features.ads.clientId;
  if (!features.ads.scriptEnabled || features.ads.provider !== "adsense" || !clientId) {
    return null;
  }

  return (
    <>
      {!features.ads.enabled ? (
        <script
          id="adsense-pause-until-enabled"
          dangerouslySetInnerHTML={{
            __html: `(window.adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=1;`,
          }}
        />
      ) : null}
      <Script
        id="adsense-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
