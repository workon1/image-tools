import { MIN_OUTPUT_DIMENSION, MIN_QUALITY, MAX_QUALITY } from "@/lib/constants";
import { AppError } from "@/lib/errors";
import { formatFileSize } from "@/lib/fileUtils";
import { formatToMimeType, type ImageFormat } from "@/lib/formatUtils";
import { renderImage, type RenderResult } from "@/lib/imageRender";

export function scaledDimensions(
  width: number,
  height: number,
  scale: number,
): { width: number; height: number } {
  return {
    width: Math.max(MIN_OUTPUT_DIMENSION, Math.round(width * scale)),
    height: Math.max(MIN_OUTPUT_DIMENSION, Math.round(height * scale)),
  };
}

export function clampTargetPercent(value: number): number {
  if (!Number.isFinite(value)) return 50;
  return Math.min(100, Math.max(10, Math.round(value)));
}

export function targetBytesFromPercent(originalBytes: number, percent: number): number {
  const pct = clampTargetPercent(percent);
  return Math.max(1, Math.round((Math.max(0, originalBytes) * pct) / 100));
}

export function outputSizePercent(originalBytes: number, outputBytes: number): number {
  if (originalBytes <= 0) return 0;
  return Math.round((outputBytes / originalBytes) * 100);
}

function asResult(blob: Blob, format: ImageFormat, width: number, height: number): RenderResult {
  return {
    blob,
    mimeType: blob.type || formatToMimeType(format),
    format,
    width,
    height,
    byteLength: blob.size,
  };
}

export async function compressToMaxBytes(
  file: File,
  options: {
    maxBytes: number;
    outputFormat: ImageFormat;
    width: number;
    height: number;
    sourceFormat?: ImageFormat;
    signal?: AbortSignal;
  },
): Promise<RenderResult> {
  const { maxBytes, outputFormat, signal, sourceFormat } = options;

  if (sourceFormat === outputFormat && file.size <= maxBytes && file.size > 0) {
    return asResult(file, outputFormat, options.width, options.height);
  }

  let width = options.width;
  let height = options.height;
  let bestUnder: RenderResult | null = null;

  for (let pass = 0; pass < 10; pass += 1) {
    let low = MIN_QUALITY;
    let high = MAX_QUALITY;

    while (low <= high) {
      if (signal?.aborted) throw new AppError("cancelled");
      const quality = Math.floor((low + high) / 2);
      const result = await renderImage(file, {
        outputFormat,
        quality,
        targetWidth: width,
        targetHeight: height,
        signal,
      });

      if (result.byteLength <= maxBytes) {
        if (!bestUnder || result.byteLength > bestUnder.byteLength) {
          bestUnder = result;
        }
        low = quality + 1;
      } else {
        high = quality - 1;
      }
    }

    if (bestUnder) return bestUnder;

    if (width <= MIN_OUTPUT_DIMENSION && height <= MIN_OUTPUT_DIMENSION) {
      break;
    }

    const next = scaledDimensions(width, height, 0.82);
    if (next.width === width && next.height === height) break;
    width = next.width;
    height = next.height;
  }

  if (bestUnder) return bestUnder;

  throw new AppError(
    "conversion_failed",
    `We couldn’t get this image under ${formatFileSize(maxBytes)}. Try a simpler or smaller original.`,
  );
}
