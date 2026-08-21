import { MIN_OUTPUT_DIMENSION, MAX_IMAGE_DIMENSION } from "@/lib/constants";

export function linkedHeight(width: number, originalWidth: number, originalHeight: number): number {
  if (originalWidth <= 0) return width;
  return Math.max(MIN_OUTPUT_DIMENSION, Math.round((width * originalHeight) / originalWidth));
}

export function linkedWidth(height: number, originalWidth: number, originalHeight: number): number {
  if (originalHeight <= 0) return height;
  return Math.max(MIN_OUTPUT_DIMENSION, Math.round((height * originalWidth) / originalHeight));
}

export function clampDimension(value: number): number {
  if (!Number.isFinite(value)) return MIN_OUTPUT_DIMENSION;
  return Math.min(MAX_IMAGE_DIMENSION, Math.max(MIN_OUTPUT_DIMENSION, Math.round(value)));
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(blob);
  });
}
