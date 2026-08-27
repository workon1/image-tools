import { describe, expect, it } from "vitest";
import { PRODUCTION_SITE_URL, resolveSiteUrl } from "@/config/env";

describe("production site URL", () => {
  it("uses imagereshaper.com as the production origin", () => {
    expect(PRODUCTION_SITE_URL).toBe("https://imagereshaper.com");
  });

  it("keeps localhost in development", () => {
    expect(resolveSiteUrl("http://localhost:3000", "development")).toBe("http://localhost:3000");
  });

  it("rejects localhost and Vercel hosts in production metadata", () => {
    expect(resolveSiteUrl("http://localhost:3000", "production")).toBe(PRODUCTION_SITE_URL);
    expect(resolveSiteUrl("https://image-tools1.vercel.app", "production")).toBe(
      PRODUCTION_SITE_URL,
    );
    expect(resolveSiteUrl("https://imagereshaper.com", "production")).toBe(
      "https://imagereshaper.com",
    );
  });
});
