import { describe, expect, it } from "vitest";
import { clampCrop, centeredCrop, squareCenterCrop } from "@/lib/imageRender";
import {
  clampTargetPercent,
  outputSizePercent,
  scaledDimensions,
  targetBytesFromPercent,
} from "@/lib/imageCompression";
import { clampDimension, linkedHeight, linkedWidth } from "@/lib/resizeUtils";
import { TARGET_100KB_BYTES, TARGET_200KB_BYTES } from "@/lib/constants";
import { createConversionConfig } from "@/lib/imageConversion";
import { conversionPairs } from "@/tools/imageConverter/pairs";

describe("crop helpers", () => {
  it("clamps a crop rectangle to the image", () => {
    expect(clampCrop({ x: -10, y: -4, width: 500, height: 500 }, 100, 80)).toEqual({
      x: 0,
      y: 0,
      width: 100,
      height: 80,
    });
  });

  it("builds a centered square crop", () => {
    expect(squareCenterCrop(200, 100)).toEqual({ x: 50, y: 0, width: 100, height: 100 });
    expect(centeredCrop(100, 200, 1)).toEqual({ x: 0, y: 50, width: 100, height: 100 });
  });
});

describe("resize helpers", () => {
  it("keeps aspect when linking width and height", () => {
    expect(linkedHeight(100, 200, 100)).toBe(50);
    expect(linkedWidth(50, 200, 100)).toBe(100);
    expect(clampDimension(3)).toBe(16);
    expect(clampDimension(20000)).toBe(8192);
  });

  it("scales dimensions down with a floor", () => {
    expect(scaledDimensions(1000, 800, 0.5)).toEqual({ width: 500, height: 400 });
  });
});

describe("target sizes and conversion pairs", () => {
  it("builds a target byte size from a percent of the original", () => {
    expect(targetBytesFromPercent(1000, 50)).toBe(500);
    expect(targetBytesFromPercent(1024, 50)).toBe(512);
    expect(outputSizePercent(1000, 480)).toBe(48);
    expect(clampTargetPercent(3)).toBe(10);
    expect(clampTargetPercent(140)).toBe(100);
  });

  it("uses 1024-based 100 KB and 200 KB caps", () => {
    expect(TARGET_100KB_BYTES).toBe(102400);
    expect(TARGET_200KB_BYTES).toBe(204800);
  });

  it("allows same-format output for compress/resize", () => {
    expect(createConversionConfig("jpeg", "jpeg", 70, { allowSameFormat: true })).toMatchObject({
      outputFormat: "jpeg",
      quality: 70,
    });
  });

  it("locks the four conversion pair routes", () => {
    expect(conversionPairs.map((pair) => pair.id)).toEqual([
      "jpg-to-png",
      "png-to-jpg",
      "jpg-to-webp",
      "webp-to-jpg",
    ]);
  });
});
