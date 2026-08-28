import { consentModeSnippet } from "@/lib/consentRegions";

/**
 * Google Consent Mode v2 defaults. This must execute before gtag.js and the
 * AdSense tag, so it is rendered as a parser-blocking inline script rather than
 * through next/script.
 */
export function ConsentMode() {
  return <script id="consent-mode-defaults" dangerouslySetInnerHTML={{ __html: consentModeSnippet() }} />;
}
