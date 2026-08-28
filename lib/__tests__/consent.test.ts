import { describe, expect, it } from "vitest";
import { consentPresets, parseConsentPreferences } from "@/lib/consent";

describe("cookie consent storage", () => {
  it("parses stored consent preferences", () => {
    expect(
      parseConsentPreferences(JSON.stringify({ analytics: true, advertising: false })),
    ).toEqual({
      analytics: true,
      advertising: false,
    });
  });

  it("rejects invalid stored consent", () => {
    expect(parseConsentPreferences("{")).toBeNull();
    expect(parseConsentPreferences(JSON.stringify({ analytics: true }))).toBeNull();
  });

  it("defines accept-all and essential-only presets", () => {
    expect(consentPresets.acceptAll).toEqual({ analytics: true, advertising: true });
    expect(consentPresets.essentialOnly).toEqual({ analytics: false, advertising: false });
  });
});
