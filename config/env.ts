export const PRODUCTION_SITE_URL = "https://imagereshaper.com";

function readPublicEnv(name: string, fallback = ""): string {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : fallback;
}

function readPublicFlag(name: string, fallback = false): boolean {
  const value = readPublicEnv(name).toLowerCase();
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  return fallback;
}

function isNonProductionHost(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".vercel.app") ||
      host.endsWith(".localhost")
    );
  } catch {
    return true;
  }
}

export function resolveSiteUrl(
  raw = readPublicEnv("NEXT_PUBLIC_SITE_URL"),
  nodeEnv = process.env.NODE_ENV,
): string {
  const fallback = nodeEnv === "production" ? PRODUCTION_SITE_URL : "http://localhost:3000";
  const url = (raw || fallback).replace(/\/+$/, "");
  if (nodeEnv === "production" && isNonProductionHost(url)) {
    return PRODUCTION_SITE_URL;
  }
  return url;
}

export const env = {
  siteUrl: resolveSiteUrl(),
  contactEmail: readPublicEnv("NEXT_PUBLIC_CONTACT_EMAIL") || "hello@imagereshaper.com",
  analyticsEnabled: readPublicFlag("NEXT_PUBLIC_ANALYTICS_ENABLED", false),
  analyticsProvider: readPublicEnv("NEXT_PUBLIC_ANALYTICS_PROVIDER", "none"),
  gaMeasurementId: readPublicEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  adsEnabled: readPublicFlag("NEXT_PUBLIC_ADS_ENABLED", false),
  adsenseClientId: readPublicEnv("NEXT_PUBLIC_ADSENSE_CLIENT_ID"),
  premiumEnabled: readPublicFlag("NEXT_PUBLIC_PREMIUM_ENABLED", false),
  apiEnabled: readPublicFlag("NEXT_PUBLIC_API_ENABLED", false),
  affiliateEnabled: readPublicFlag("NEXT_PUBLIC_AFFILIATE_ENABLED", false),
};
