"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CookieBanner } from "@/components/CookieBanner";
import {
  consentPresets,
  readStoredConsent,
  writeStoredConsent,
  type ConsentPreferences,
} from "@/lib/consent";

type ConsentContextValue = {
  ready: boolean;
  preferences: ConsentPreferences | null;
  showBanner: boolean;
  acceptAll: () => void;
  essentialOnly: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setPreferences(stored);
    setShowBanner(!stored);
    setReady(true);
  }, []);

  const savePreferences = useCallback((next: ConsentPreferences) => {
    writeStoredConsent(next);
    setPreferences(next);
    setShowBanner(false);
  }, []);

  const acceptAll = useCallback(() => {
    savePreferences(consentPresets.acceptAll);
  }, [savePreferences]);

  const essentialOnly = useCallback(() => {
    savePreferences(consentPresets.essentialOnly);
  }, [savePreferences]);

  const value = useMemo(
    () => ({
      ready,
      preferences,
      showBanner,
      acceptAll,
      essentialOnly,
    }),
    [ready, preferences, showBanner, acceptAll, essentialOnly],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {ready && showBanner ? (
        <CookieBanner onAcceptAll={acceptAll} onEssentialOnly={essentialOnly} />
      ) : null}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const value = useContext(ConsentContext);
  if (!value) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return value;
}
