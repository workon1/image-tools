import { describe, expect, it } from "vitest";
import { MAX_FILE_SIZE_BYTES } from "@/lib/constants";
import {
  detectFormatFromBytes,
  validateImageFile,
  validateImageFiles,
} from "@/lib/imageValidation";
import { assertImageDimensions } from "@/lib/imageDimensions";
import { AppError } from "@/lib/errors";

function bytes(...values: number[]) {
  return new Uint8Array(values);
}

function fileFromBytes(name: string, type: string, header: Uint8Array, extra = 32) {
  const body = new Uint8Array(header.length + extra);
  body.set(header);
  return new File([body], name, { type });
}

const PNG_HEADER = bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
const JPEG_HEADER = bytes(0xff, 0xd8, 0xff, 0xe0);
const WEBP_HEADER = bytes(0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50);

describe("magic-byte format detection", () => {
  it("detects PNG, JPEG, and WebP", () => {
    expect(detectFormatFromBytes(PNG_HEADER)).toBe("png");
    expect(detectFormatFromBytes(JPEG_HEADER)).toBe("jpeg");
    expect(detectFormatFromBytes(WEBP_HEADER)).toBe("webp");
    expect(detectFormatFromBytes(bytes(0x47, 0x49, 0x46))).toBeNull();
  });
});

describe("file validation", () => {
  it("accepts matching PNG, JPEG, and WebP files", async () => {
    await expect(
      validateImageFile(fileFromBytes("photo.png", "image/png", PNG_HEADER)),
    ).resolves.toMatchObject({ format: "png" });
    await expect(
      validateImageFile(fileFromBytes("photo.jpg", "image/jpeg", JPEG_HEADER)),
    ).resolves.toMatchObject({ format: "jpeg" });
    await expect(
      validateImageFile(fileFromBytes("photo.webp", "image/webp", WEBP_HEADER)),
    ).resolves.toMatchObject({ format: "webp" });
  });

  it("rejects unsupported types even if the extension looks fine", async () => {
    const gif = fileFromBytes("image.gif", "image/gif", bytes(0x47, 0x49, 0x46, 0x38));
    await expect(validateImageFile(gif)).rejects.toBeInstanceOf(AppError);
  });

  it("rejects SVG content", async () => {
    const svg = new File(["<svg xmlns='http://www.w3.org/2000/svg'></svg>"], "icon.svg", {
      type: "image/svg+xml",
    });
    await expect(validateImageFile(svg)).rejects.toMatchObject({ code: "unsupported_type" });
  });

  it("rejects empty files", async () => {
    const empty = new File([], "empty.png", { type: "image/png" });
    await expect(validateImageFile(empty)).rejects.toMatchObject({ code: "empty_file" });
  });

  it("rejects files over 20 MB", async () => {
    const oversized = fileFromBytes("huge.png", "image/png", PNG_HEADER);
    Object.defineProperty(oversized, "size", { value: MAX_FILE_SIZE_BYTES + 1 });
    await expect(validateImageFile(oversized)).rejects.toMatchObject({ code: "file_too_large" });
  });

  it("rejects mismatched extension and contents", async () => {
    const disguised = fileFromBytes("not-a-png.jpg", "image/jpeg", PNG_HEADER);
    await expect(validateImageFile(disguised)).rejects.toMatchObject({ code: "unsupported_type" });
  });

  it("collects errors for mixed selections", async () => {
    const result = await validateImageFiles([
      fileFromBytes("ok.png", "image/png", PNG_HEADER),
      new File(["hello"], "notes.txt", { type: "text/plain" }),
    ]);
    expect(result.accepted).toHaveLength(1);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe("dimension limits", () => {
  it("rejects extremely large canvases", () => {
    expect(() => assertImageDimensions(20000, 20000)).toThrow(AppError);
    expect(() => assertImageDimensions(100, 100)).not.toThrow();
  });
});
