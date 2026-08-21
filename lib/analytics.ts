import { features } from "@/config/features";
import { isDev } from "@/lib/logger";

export type AnalyticsEventName =
  | "tool_loaded"
  | "image_selected"
  | "conversion_started"
  | "conversion_completed"
  | "conversion_failed"
  | "download_clicked";

export type AnalyticsPayload = Record<string, string | number | boolean>;

type AnalyticsProvider = {
  track(event: AnalyticsEventName, payload?: AnalyticsPayload): void;
};

const BLOCKED_KEYS = /filename|file_name|name|src|data|base64|email|path|title/i;

function sanitizePayload(payload?: AnalyticsPayload): AnalyticsPayload | undefined {
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

function createProvider(): AnalyticsProvider {
  if (!features.analytics.enabled) return new NoopProvider();
  if (features.analytics.provider === "console") return new ConsoleProvider();
  return new NoopProvider();
}

const provider = createProvider();

export function track(event: AnalyticsEventName, payload?: AnalyticsPayload): void {
  try {
    provider.track(event, sanitizePayload(payload));
  } catch (error) {
    if (isDev()) {
      console.warn("[analytics] tracking failed", error);
    }
  }
}
