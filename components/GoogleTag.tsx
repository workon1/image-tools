import Script from "next/script";
import { env } from "@/config/env";

/**
 * Single Google tag for the whole site. Next.js injects this in the document
 * head on every page — do not add another copy of this snippet.
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
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}', { send_page_view: false });
`}
      </Script>
    </>
  );
}
