import Script from "next/script";
import { env } from "@/config/env";

/**
 * Single Google tag for the whole site. Storage permissions come from Consent
 * Mode defaults, which Google's CMP updates for visitors who must be asked.
 */
export function GoogleTag() {
  const id = env.gaMeasurementId;
  if (!env.analyticsEnabled || env.analyticsProvider !== "ga4" || !id) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-gtag" strategy="afterInteractive">
        {`gtag('js', new Date());
gtag('config', '${id}', { send_page_view: false });`}
      </Script>
    </>
  );
}
