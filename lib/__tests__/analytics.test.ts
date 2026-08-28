import { describe, expect, it } from "vitest";
import { sanitizePayload } from "@/lib/analytics";

describe("analytics payload sanitization", () => {
  it("drops filenames, emails, and other blocked keys", () => {
    expect(
      sanitizePayload({
        tool: "image-converter",
        filename: "secret.jpg",
        email: "user@example.com",
        route: "/image-converter",
      }),
    ).toEqual({
      tool: "image-converter",
      route: "/image-converter",
    });
  });
});
