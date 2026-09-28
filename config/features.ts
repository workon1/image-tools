import { env } from "@/config/env";

/**
 * Feature flags for monetization and instrumentation.
 * Display ads stay off until ADS_ENABLED; the AdSense script may still load
 * for Google's certified CMP whenever analytics needs consent messaging.
 */
export const features = {
  analytics: {
    enabled: env.analyticsEnabled,
    provider: env.analyticsProvider,
    measurementId: env.gaMeasurementId,
  },
  ads: {
    enabled: env.adsEnabled,
    provider: env.adsenseClientId ? "adsense" : "none",
    clientId: env.adsenseClientId,
    inlineSlotId: env.adsenseInlineSlot,
    /**
     * Load adsbygoogle.js for CMP (and ads when enabled). Requires a publisher
     * client id. Display slots still check `enabled` separately.
     */
    scriptEnabled: Boolean(
      env.adsenseClientId && (env.adsEnabled || env.analyticsEnabled),
    ),
  },
  premium: {
    enabled: env.premiumEnabled,
  },
  api: {
    enabled: env.apiEnabled,
  },
  affiliate: {
    enabled: env.affiliateEnabled,
  },
} as const;
