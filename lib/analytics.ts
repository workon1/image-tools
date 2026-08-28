import { features } from "@/config/features";
import { hasAnalyticsConsent } from "@/lib/consent";
import { isDev } from "@/lib/logger";

export type AnalyticsEventName =
  | "page_view"
  | "tool_loaded"
  | "tool_opened"
  | "image_selected"
  | "upload_started"
  | "conversion_started"
  | "processing_started"
  | "conversion_completed"
  | "processing_completed"
  | "conversion_failed"
  | "processing_failed"
  | "download_clicked";

export type AnalyticsPayload = Record<string, string | number | boolean>;

type AnalyticsProvider = {
  track(event: AnalyticsEventName, payload?: AnalyticsPayload): void;
};

const BLOCKED_KEYS = /filename|file_name|name|src|data|base64|email|path|title/i;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function sanitizePayload(payload?: AnalyticsPayload): AnalyticsPayload | undefined {
  if (!payload) return undefined;
  const next: AnalyticsPayload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (BLOCKED_KEYS.test(key)) continue;
    if (typeof value === "string" && value.length > 64) continue;
    next[key] = value;
  }
  return next;
}

class NoopProvider implements AnalyticsProvider {
  track(): void {}
}

class ConsoleProvider implements AnalyticsProvider {
  track(event: AnalyticsEventName, payload?: AnalyticsPayload): void {
    console.info("[analytics]", event, sanitizePayload(payload));
  }
}

class Ga4Provider implements AnalyticsProvider {
  track(event: AnalyticsEventName, payload?: AnalyticsPayload): void {
    if (!hasAnalyticsConsent()) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    const sanitized = sanitizePayload(payload) ?? {};
    if (event === "page_view") {
      const route = typeof sanitized.route === "string" ? sanitized.route : undefined;
      window.gtag("event", "page_view", route ? { page_path: route } : undefined);
      return;
    }
    window.gtag("event", event, sanitized);
  }
}

function createProvider(): AnalyticsProvider {
  if (!features.analytics.enabled) return new NoopProvider();
  if (features.analytics.provider === "console") return new ConsoleProvider();
  if (features.analytics.provider === "ga4" && features.analytics.measurementId) {
    return new Ga4Provider();
  }
  return new NoopProvider();
}

const EVENT_ALIASES: Partial<Record<AnalyticsEventName, AnalyticsEventName[]>> = {
  tool_loaded: ["tool_opened"],
  image_selected: ["upload_started"],
  conversion_started: ["processing_started"],
  conversion_completed: ["processing_completed"],
  conversion_failed: ["processing_failed"],
};

const provider = createProvider();
const sendAliases = features.analytics.provider === "console";

export function track(event: AnalyticsEventName, payload?: AnalyticsPayload): void {
  const sanitized = sanitizePayload(payload);
  try {
    provider.track(event, sanitized);
    if (!sendAliases) return;
    for (const alias of EVENT_ALIASES[event] ?? []) {
      provider.track(alias, sanitized);
    }
  } catch (error) {
    if (isDev()) {
      console.warn("[analytics] tracking failed", error);
    }
  }
}
