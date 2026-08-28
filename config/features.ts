import { env } from "@/config/env";

/**
 * Feature flags for monetization and instrumentation.
 * Ads, premium, API, and affiliates stay off until explicitly enabled.
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
