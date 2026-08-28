"use client";

import Script from "next/script";
import { useConsent } from "@/components/ConsentProvider";
import { env } from "@/config/env";

/**
 * Single Google tag for the whole site. Loads only after analytics consent.
 */
export function GoogleTag() {
  const { ready, preferences } = useConsent();
  const id = env.gaMeasurementId;
  const enabled =
    ready &&
    preferences?.analytics === true &&
    env.analyticsEnabled &&
    env.analyticsProvider === "ga4" &&
    Boolean(id);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent', 'update', {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('config', '${id}', { send_page_view: false });
`}
      </Script>
    </>
  );
}
