/**
 * HEIC/HEIF detection from the ISO base media file format header. The generic
 * image validator only knows JPG, PNG, and WebP, so HEIC needs its own check
 * before the decoder is loaded.
 */
const HEIC_BRANDS = new Set([
  "heic",
  "heix",
  "heim",
  "heis",
  "hevc",
  "hevx",
  "hevm",
  "hevs",
  "mif1",
  "msf1",
]);

export const HEIC_EXTENSIONS = [".heic", ".heif"] as const;
export const HEIC_MIME_TYPES = ["image/heic", "image/heif"] as const;

export function hasHeicExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return HEIC_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

/**
 * Reads the `ftyp` box brand. Bytes 4-8 are the box type and 8-12 the major
 * brand; compatible brands follow in 4-byte groups.
 */
export function detectHeicFromBytes(bytes: Uint8Array): boolean {
  if (bytes.length < 12) return false;

  const ascii = (start: number) =>
    String.fromCharCode(bytes[start], bytes[start + 1], bytes[start + 2], bytes[start + 3]);

  if (ascii(4) !== "ftyp") return false;
  if (HEIC_BRANDS.has(ascii(8))) return true;

  for (let offset = 16; offset + 4 <= Math.min(bytes.length, 64); offset += 4) {
    if (HEIC_BRANDS.has(ascii(offset))) return true;
  }

  return false;
}

export async function isHeicFile(file: File): Promise<boolean> {
  const header = new Uint8Array(await file.slice(0, 64).arrayBuffer());
  if (detectHeicFromBytes(header)) return true;
  // Some exports carry a correct extension or MIME type with an unusual brand.
  return hasHeicExtension(file.name) || HEIC_MIME_TYPES.includes(file.type as "image/heic");
}
