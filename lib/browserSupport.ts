import { formatToMimeType, type ImageFormat } from "@/lib/formatUtils";

const supportCache = new Map<string, boolean>();

export function isCanvasMimeSupported(mimeType: string): boolean {
  if (typeof document === "undefined") return false;

  const cached = supportCache.get(mimeType);
  if (cached !== undefined) return cached;

  let supported = false;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    supported = canvas.toDataURL(mimeType).startsWith(`data:${mimeType}`);
  } catch {
    supported = false;
  }

  supportCache.set(mimeType, supported);
  return supported;
}

export function isOutputFormatSupported(format: ImageFormat): boolean {
  return isCanvasMimeSupported(formatToMimeType(format));
}

export function resetSupportCache(): void {
  supportCache.clear();
}
