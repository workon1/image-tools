export const CONSENT_STORAGE_KEY = "imagereshaper-consent-v1";

export type ConsentPreferences = {
  analytics: boolean;
  advertising: boolean;
};

export function parseConsentPreferences(raw: string | null): ConsentPreferences | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<ConsentPreferences>;
    if (typeof value.analytics !== "boolean" || typeof value.advertising !== "boolean") {
      return null;
    }
    return { analytics: value.analytics, advertising: value.advertising };
  } catch {
    return null;
  }
}

export function readStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  return parseConsentPreferences(window.localStorage.getItem(CONSENT_STORAGE_KEY));
}

export function writeStoredConsent(preferences: ConsentPreferences): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
}

export function hasAnalyticsConsent(): boolean {
  return readStoredConsent()?.analytics === true;
}

export function hasAdvertisingConsent(): boolean {
  return readStoredConsent()?.advertising === true;
}

export const consentPresets = {
  acceptAll: { analytics: true, advertising: true } satisfies ConsentPreferences,
  essentialOnly: { analytics: false, advertising: false } satisfies ConsentPreferences,
};
