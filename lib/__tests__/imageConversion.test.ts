import { describe, expect, it, vi, beforeEach } from "vitest";
import { convertImage } from "@/lib/imageConversion";
import { AppError } from "@/lib/errors";
import * as browserSupport from "@/lib/browserSupport";
import * as inspection from "@/lib/imageInspection";

describe("convertImage", () => {
  beforeEach(() => {
    vi.spyOn(browserSupport, "isOutputFormatSupported").mockReturnValue(true);
    vi.spyOn(inspection, "decodeImage").mockResolvedValue({
      width: 10,
      height: 8,
      draw: vi.fn(),
      drawRect: vi.fn(),
      close: vi.fn(),
    });
  });

  it("returns a blob for a supported output format", async () => {
    const file = new File([new Uint8Array([0xff, 0xd8, 0xff])], "in.jpg", { type: "image/jpeg" });
    const result = await convertImage(file, { outputFormat: "png", quality: 80 });
    expect(result.format).toBe("png");
    expect(result.blob).toBeInstanceOf(Blob);
    expect(result.width).toBe(10);
    expect(result.height).toBe(8);
  });

  it("fails gracefully when the browser cannot encode the format", async () => {
    vi.spyOn(browserSupport, "isOutputFormatSupported").mockReturnValue(false);
    const file = new File([new Uint8Array([0x89, 0x50])], "in.png", { type: "image/png" });
    await expect(convertImage(file, { outputFormat: "webp" })).rejects.toMatchObject({
      code: "format_unsupported_by_browser",
    });
  });

  it("maps unexpected failures to a user-facing conversion error", async () => {
    vi.spyOn(inspection, "decodeImage").mockRejectedValue(new Error("DOMException: boom"));
    const file = new File([new Uint8Array([1, 2, 3])], "in.png", { type: "image/png" });
    await expect(convertImage(file, { outputFormat: "jpeg" })).rejects.toBeInstanceOf(AppError);
  });
});
