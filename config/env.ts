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

export const env = {
  siteUrl: readPublicEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000").replace(/\/+$/, ""),
  contactEmail: readPublicEnv("NEXT_PUBLIC_CONTACT_EMAIL"),
  analyticsEnabled: readPublicFlag("NEXT_PUBLIC_ANALYTICS_ENABLED", false),
  analyticsProvider: readPublicEnv("NEXT_PUBLIC_ANALYTICS_PROVIDER", "none"),
  adsEnabled: readPublicFlag("NEXT_PUBLIC_ADS_ENABLED", false),
  adsenseClientId: readPublicEnv("NEXT_PUBLIC_ADSENSE_CLIENT_ID"),
  premiumEnabled: readPublicFlag("NEXT_PUBLIC_PREMIUM_ENABLED", false),
  apiEnabled: readPublicFlag("NEXT_PUBLIC_API_ENABLED", false),
  affiliateEnabled: readPublicFlag("NEXT_PUBLIC_AFFILIATE_ENABLED", false),
};
