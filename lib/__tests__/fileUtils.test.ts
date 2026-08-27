import { describe, expect, it } from "vitest";
import {
  buildOutputFilename,
  formatFileSize,
  sanitizeFilename,
  sizeBucket,
  sizeDifference,
} from "@/lib/fileUtils";

describe("file size formatting", () => {
  it("formats bytes, KB, and MB", () => {
    expect(formatFileSize(800)).toBe("800 B");
    expect(formatFileSize(2400)).toBe("2.3 KB");
    expect(formatFileSize(680_000)).toBe("664 KB");
    expect(formatFileSize(2.4 * 1024 * 1024)).toBe("2.4 MB");
  });

  it("buckets sizes without exposing exact values", () => {
    expect(sizeBucket(20_000)).toBe("lt_100kb");
    expect(sizeBucket(500_000)).toBe("100kb_1mb");
    expect(sizeBucket(3_000_000)).toBe("1_5mb");
    expect(sizeBucket(12_000_000)).toBe("5_20mb");
    expect(sizeBucket(25_000_000)).toBe("gte_20mb");
  });
});

describe("size difference", () => {
  it("reports savings", () => {
    const result = sizeDifference(2_400_000, 680_000);
    expect(result.saved).toBe(true);
    expect(result.label).toBe("Saved: 72%");
  });

  it("reports increases", () => {
    const result = sizeDifference(1000, 2000);
    expect(result.saved).toBe(false);
    expect(result.label).toBe("Increased: 100%");
  });
});

describe("filename generation", () => {
  it("strips paths and unsafe characters", () => {
    expect(sanitizeFilename("../../secret.png")).toBe("secret");
    expect(sanitizeFilename("my photo (1).JPG")).toBe("my photo (1)");
    expect(sanitizeFilename("weird<>name.webp")).toBe("weirdname");
  });

  it("builds a download name from the original file and output format", () => {
    expect(buildOutputFilename("Holiday Photo.PNG", "jpg")).toBe("Holiday Photo.jpg");
    expect(buildOutputFilename("folder/invoices\\scan.png", "webp")).toBe("scan.webp");
    expect(buildOutputFilename("photo.png", "jpg", "instagram-post-portrait")).toBe(
      "photo-instagram-post-portrait.jpg",
    );
  });
});
