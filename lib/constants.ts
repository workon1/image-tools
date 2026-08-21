export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
export const MAX_FILE_SIZE_LABEL = "20 MB";
export const MAX_FILES_PER_SELECTION = 10;
export const MAX_IMAGE_DIMENSION = 8192;
export const MAX_IMAGE_PIXELS = 25_000_000;
export const DEFAULT_QUALITY = 80;
export const MIN_QUALITY = 10;
export const MAX_QUALITY = 100;
export const DEFAULT_TARGET_PERCENT = 50;
export const MIN_TARGET_PERCENT = 10;
export const MAX_TARGET_PERCENT = 100;
export const MIN_OUTPUT_DIMENSION = 16;
export const TARGET_100KB_BYTES = 100 * 1024;
export const TARGET_200KB_BYTES = 200 * 1024;
export const FAVICON_SIZES = [16, 32, 48, 180] as const;

export const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;
export const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const;
