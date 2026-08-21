export type ImageFormat = "jpeg" | "png" | "webp";

export const IMAGE_FORMATS: ImageFormat[] = ["jpeg", "png", "webp"];

const MIME_TO_FORMAT: Record<string, ImageFormat> = {
  "image/jpeg": "jpeg",
  "image/jpg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
};

const FORMAT_TO_MIME: Record<ImageFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

const FORMAT_TO_EXTENSION: Record<ImageFormat, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
};

const FORMAT_LABELS: Record<ImageFormat, string> = {
  jpeg: "JPG",
  png: "PNG",
  webp: "WebP",
};

export function mimeTypeToFormat(mimeType: string): ImageFormat | null {
  return MIME_TO_FORMAT[mimeType.toLowerCase()] ?? null;
}

export function formatToMimeType(format: ImageFormat): string {
  return FORMAT_TO_MIME[format];
}

export function formatToExtension(format: ImageFormat): string {
  return FORMAT_TO_EXTENSION[format];
}

export function formatLabel(format: ImageFormat): string {
  return FORMAT_LABELS[format];
}

export function extensionToFormat(filename: string): ImageFormat | null {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  if (!match) return null;
  const ext = match[1];
  if (ext === "jpg" || ext === "jpeg") return "jpeg";
  if (ext === "png") return "png";
  if (ext === "webp") return "webp";
  return null;
}

export function getAvailableOutputFormats(inputFormat: ImageFormat): ImageFormat[] {
  return IMAGE_FORMATS.filter((format) => format !== inputFormat);
}

export function qualityAppliesTo(format: ImageFormat): boolean {
  return format === "jpeg" || format === "webp";
}

export function clampQuality(value: number): number {
  if (!Number.isFinite(value)) return 80;
  return Math.min(100, Math.max(10, Math.round(value)));
}

export function sliderToCanvasQuality(slider: number): number {
  return clampQuality(slider) / 100;
}

export function isImageFormat(value: string): value is ImageFormat {
  return IMAGE_FORMATS.includes(value as ImageFormat);
}
