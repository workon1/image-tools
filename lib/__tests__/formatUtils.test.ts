import { describe, expect, it } from "vitest";
import {
  clampQuality,
  extensionToFormat,
  formatLabel,
  formatToExtension,
  formatToMimeType,
  getAvailableOutputFormats,
  mimeTypeToFormat,
  qualityAppliesTo,
  sliderToCanvasQuality,
} from "@/lib/formatUtils";
import { createConversionConfig } from "@/lib/imageConversion";
import { AppError } from "@/lib/errors";

describe("format detection helpers", () => {
  it("maps MIME types and extensions to formats", () => {
    expect(mimeTypeToFormat("image/jpeg")).toBe("jpeg");
    expect(mimeTypeToFormat("image/jpg")).toBe("jpeg");
    expect(mimeTypeToFormat("image/png")).toBe("png");
    expect(mimeTypeToFormat("image/webp")).toBe("webp");
    expect(mimeTypeToFormat("image/svg+xml")).toBeNull();
    expect(extensionToFormat("photo.JPG")).toBe("jpeg");
    expect(extensionToFormat("photo.jpeg")).toBe("jpeg");
    expect(extensionToFormat("photo.png")).toBe("png");
    expect(extensionToFormat("photo.webp")).toBe("webp");
    expect(extensionToFormat("photo.gif")).toBeNull();
  });

  it("exposes labels and mime types for downloads", () => {
    expect(formatLabel("jpeg")).toBe("JPG");
    expect(formatToExtension("jpeg")).toBe("jpg");
    expect(formatToMimeType("webp")).toBe("image/webp");
  });
});

describe("conversion configuration", () => {
  it("does not offer the same format as an output", () => {
    expect(getAvailableOutputFormats("jpeg")).toEqual(["png", "webp"]);
    expect(getAvailableOutputFormats("png")).toEqual(["jpeg", "webp"]);
    expect(getAvailableOutputFormats("webp")).toEqual(["jpeg", "png"]);
  });

  it("applies quality only to lossy formats", () => {
    expect(qualityAppliesTo("jpeg")).toBe(true);
    expect(qualityAppliesTo("webp")).toBe(true);
    expect(qualityAppliesTo("png")).toBe(false);
  });

  it("clamps quality to 10–100 and maps it for canvas", () => {
    expect(clampQuality(80)).toBe(80);
    expect(clampQuality(5)).toBe(10);
    expect(clampQuality(140)).toBe(100);
    expect(sliderToCanvasQuality(80)).toBe(0.8);
  });

  it("builds a valid conversion config", () => {
    const config = createConversionConfig("png", "jpeg", 80);
    expect(config).toEqual({
      inputFormat: "png",
      outputFormat: "jpeg",
      quality: 80,
    });
  });

  it("forces PNG quality to 100", () => {
    const config = createConversionConfig("jpeg", "png", 40);
    expect(config.quality).toBe(100);
  });

  it("rejects converting to the same format", () => {
    expect(() => createConversionConfig("png", "png")).toThrow(AppError);
  });
});
