import { describe, expect, it } from "vitest";
import { getRelatedTools } from "@/tools/related";
import { faqPageJsonLd, websiteJsonLd } from "@/lib/structuredData";

describe("related tools and structured data", () => {
  it("returns available related tools for a pair page", () => {
    const related = getRelatedTools("jpg-to-png");
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((tool) => tool.status === "available")).toBe(true);
  });

  it("builds FAQ JSON-LD from the same questions shown on the page", () => {
    const data = faqPageJsonLd([{ question: "Is it local?", answer: "Yes." }]);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: "Is it local?",
    });
  });

  it("describes the site without fake ratings", () => {
    const site = websiteJsonLd();
    expect(site["@type"]).toBe("WebSite");
    expect(JSON.stringify(site)).not.toMatch(/aggregateRating/i);
  });
});
