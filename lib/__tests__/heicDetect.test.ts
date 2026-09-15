import { describe, expect, it } from "vitest";
import { detectHeicFromBytes, hasHeicExtension } from "@/lib/heicDetect";

function ftyp(majorBrand: string, compatible: string[] = []): Uint8Array {
  const parts = ["\0\0\0\u0024", "ftyp", majorBrand, "\0\0\0\0", ...compatible];
  const text = parts.join("");
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i += 1) bytes[i] = text.charCodeAt(i);
  return bytes;
}

describe("detectHeicFromBytes", () => {
  it("accepts the major brand written by Apple devices", () => {
    expect(detectHeicFromBytes(ftyp("heic"))).toBe(true);
    expect(detectHeicFromBytes(ftyp("heix"))).toBe(true);
    expect(detectHeicFromBytes(ftyp("mif1"))).toBe(true);
  });

  it("accepts a HEIC brand listed only as compatible", () => {
    expect(detectHeicFromBytes(ftyp("mp42", ["isom", "heic"]))).toBe(true);
  });

  it("rejects other ISO base media files and raster formats", () => {
    expect(detectHeicFromBytes(ftyp("mp42", ["isom", "avc1"]))).toBe(false);
    expect(detectHeicFromBytes(new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0]))).toBe(
      false,
    );
  });

  it("rejects input too short to contain an ftyp box", () => {
    expect(detectHeicFromBytes(new Uint8Array([0, 0, 0]))).toBe(false);
  });
});

describe("hasHeicExtension", () => {
  it("matches heic and heif regardless of case", () => {
    expect(hasHeicExtension("IMG_0042.HEIC")).toBe(true);
    expect(hasHeicExtension("photo.heif")).toBe(true);
    expect(hasHeicExtension("photo.jpg")).toBe(false);
  });
});
