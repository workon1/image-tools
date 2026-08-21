import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE_BYTES, MAX_FILES_PER_SELECTION } from "@/lib/constants";
import { AppError } from "@/lib/errors";
import { extensionToFormat, mimeTypeToFormat, type ImageFormat } from "@/lib/formatUtils";

export type ValidatedImage = {
  file: File;
  format: ImageFormat;
};

const JPEG_SIGNATURE = [0xff, 0xd8, 0xff];
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function startsWith(bytes: Uint8Array, signature: number[]): boolean {
  if (bytes.length < signature.length) return false;
  return signature.every((value, index) => bytes[index] === value);
}

function isWebpSignature(bytes: Uint8Array): boolean {
  if (bytes.length < 12) return false;
  const riff = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46;
  const webp = bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  return riff && webp;
}

function isSvgBytes(bytes: Uint8Array): boolean {
  const start = new TextDecoder("utf-8", { fatal: false }).decode(bytes.slice(0, 256)).trimStart();
  return start.startsWith("<svg") || start.startsWith("<?xml") || start.startsWith("<!DOCTYPE svg");
}

export function detectFormatFromBytes(bytes: Uint8Array): ImageFormat | null {
  if (startsWith(bytes, JPEG_SIGNATURE)) return "jpeg";
  if (startsWith(bytes, PNG_SIGNATURE)) return "png";
  if (isWebpSignature(bytes)) return "webp";
  return null;
}

export async function readFileHeader(file: File, length = 16): Promise<Uint8Array> {
  const slice = file.slice(0, length);
  return readBlobBytes(slice);
}

async function readBlobBytes(blob: Blob): Promise<Uint8Array> {
  if (typeof blob.arrayBuffer === "function") {
    return new Uint8Array(await blob.arrayBuffer());
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsArrayBuffer(blob);
  });
}

export async function detectImageFormat(file: File): Promise<ImageFormat | null> {
  const header = await readFileHeader(file, 16);
  if (isSvgBytes(header)) return null;
  return detectFormatFromBytes(header);
}

export function hasAcceptedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export async function validateImageFile(file: File): Promise<ValidatedImage> {
  if (file.size <= 0) {
    throw new AppError("empty_file");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new AppError("file_too_large");
  }

  const magicFormat = await detectImageFormat(file).catch(() => {
    throw new AppError("corrupt_image");
  });
  const mimeFormat = mimeTypeToFormat(file.type);
  const extensionFormat = extensionToFormat(file.name);

  if (!magicFormat) {
    throw new AppError("unsupported_type");
  }

  // Trust file contents over the claimed MIME type or extension.
  if (mimeFormat && mimeFormat !== magicFormat) {
    throw new AppError("unsupported_type");
  }

  if (extensionFormat && extensionFormat !== magicFormat) {
    throw new AppError("unsupported_type");
  }

  if (!hasAcceptedExtension(file.name) && !mimeFormat) {
    throw new AppError("unsupported_type");
  }

  return { file, format: magicFormat };
}

export type FileSelectionResult = {
  accepted: ValidatedImage[];
  errors: string[];
  skippedForLimit: boolean;
};

export async function validateImageFiles(files: File[]): Promise<FileSelectionResult> {
  const limited = files.slice(0, MAX_FILES_PER_SELECTION);
  const skippedForLimit = files.length > MAX_FILES_PER_SELECTION;
  const accepted: ValidatedImage[] = [];
  const errors: string[] = [];

  for (const file of limited) {
    try {
      accepted.push(await validateImageFile(file));
    } catch (error) {
      if (error instanceof AppError) {
        errors.push(error.userMessage);
      } else {
        errors.push("We couldn’t read one of the selected files. Please try another image.");
      }
    }
  }

  return { accepted, errors, skippedForLimit };
}
