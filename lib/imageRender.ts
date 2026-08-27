import { isOutputFormatSupported } from "@/lib/browserSupport";
import { DEFAULT_QUALITY, MIN_OUTPUT_DIMENSION } from "@/lib/constants";
import { AppError } from "@/lib/errors";
import {
  formatToMimeType,
  qualityAppliesTo,
  sliderToCanvasQuality,
  type ImageFormat,
} from "@/lib/formatUtils";
import { assertImageDimensions } from "@/lib/imageDimensions";
import { decodeImage } from "@/lib/imageInspection";
import { logError } from "@/lib/logger";

export type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RotateDegrees = 0 | 90 | 180 | 270;

export type RenderOptions = {
  outputFormat: ImageFormat;
  quality?: number;
  targetWidth?: number;
  targetHeight?: number;
  crop?: CropRect;
  rotate?: RotateDegrees;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  signal?: AbortSignal;
};

export function orientedSize(
  width: number,
  height: number,
  rotate: RotateDegrees = 0,
): { width: number; height: number } {
  if (rotate === 90 || rotate === 270) {
    return { width: height, height: width };
  }
  return { width, height };
}

export type RenderResult = {
  blob: Blob;
  mimeType: string;
  format: ImageFormat;
  width: number;
  height: number;
  byteLength: number;
};

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new AppError("conversion_failed"));
            return;
          }
          resolve(blob);
        },
        mimeType,
        quality,
      );
    } catch (error) {
      logError("canvas.toBlob threw", error);
      reject(new AppError("conversion_failed"));
    }
  });
}

export function releaseCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = 0;
  canvas.height = 0;
}

export function clampCrop(rect: CropRect, imageWidth: number, imageHeight: number): CropRect {
  const x = Math.min(Math.max(0, Math.round(rect.x)), Math.max(0, imageWidth - 1));
  const y = Math.min(Math.max(0, Math.round(rect.y)), Math.max(0, imageHeight - 1));
  const width = Math.min(Math.max(1, Math.round(rect.width)), imageWidth - x);
  const height = Math.min(Math.max(1, Math.round(rect.height)), imageHeight - y);
  return { x, y, width, height };
}

export function centeredCrop(imageWidth: number, imageHeight: number, ratio: number): CropRect {
  const imageRatio = imageWidth / imageHeight;
  if (imageRatio > ratio) {
    const width = Math.round(imageHeight * ratio);
    return { x: Math.round((imageWidth - width) / 2), y: 0, width, height: imageHeight };
  }
  const height = Math.round(imageWidth / ratio);
  return { x: 0, y: Math.round((imageHeight - height) / 2), width: imageWidth, height };
}

export function squareCenterCrop(imageWidth: number, imageHeight: number): CropRect {
  return centeredCrop(imageWidth, imageHeight, 1);
}

export async function renderImage(file: File, options: RenderOptions): Promise<RenderResult> {
  const { outputFormat, signal } = options;
  const mimeType = formatToMimeType(outputFormat);

  if (!isOutputFormatSupported(outputFormat)) {
    throw new AppError("format_unsupported_by_browser");
  }

  if (signal?.aborted) {
    throw new AppError("cancelled");
  }

  let decoded: Awaited<ReturnType<typeof decodeImage>> | null = null;
  const canvas = document.createElement("canvas");

  try {
    decoded = await decodeImage(file, signal);
    const source = options.crop
      ? clampCrop(options.crop, decoded.width, decoded.height)
      : { x: 0, y: 0, width: decoded.width, height: decoded.height };

    const rotate = options.rotate ?? 0;
    const flipHorizontal = Boolean(options.flipHorizontal);
    const flipVertical = Boolean(options.flipVertical);
    const oriented = orientedSize(source.width, source.height, rotate);
    const targetWidth = Math.max(
      options.targetWidth === undefined ? 1 : MIN_OUTPUT_DIMENSION,
      Math.round(options.targetWidth ?? oriented.width),
    );
    const targetHeight = Math.max(
      options.targetHeight === undefined ? 1 : MIN_OUTPUT_DIMENSION,
      Math.round(options.targetHeight ?? oriented.height),
    );
    assertImageDimensions(targetWidth, targetHeight);

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const context = canvas.getContext("2d", { alpha: outputFormat !== "jpeg" });
    if (!context) {
      throw new AppError("conversion_failed");
    }

    if (outputFormat === "jpeg") {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const needsTransform = rotate !== 0 || flipHorizontal || flipVertical;
    if (!needsTransform) {
      decoded.drawRect(
        context,
        source.x,
        source.y,
        source.width,
        source.height,
        0,
        0,
        targetWidth,
        targetHeight,
      );
    } else {
      const swapped = rotate === 90 || rotate === 270;
      const scaleX = swapped ? targetHeight / source.width : targetWidth / source.width;
      const scaleY = swapped ? targetWidth / source.height : targetHeight / source.height;
      context.save();
      context.translate(targetWidth / 2, targetHeight / 2);
      context.rotate((rotate * Math.PI) / 180);
      context.scale(
        (flipHorizontal ? -1 : 1) * scaleX,
        (flipVertical ? -1 : 1) * scaleY,
      );
      decoded.drawRect(
        context,
        source.x,
        source.y,
        source.width,
        source.height,
        -source.width / 2,
        -source.height / 2,
        source.width,
        source.height,
      );
      context.restore();
    }
    decoded.close();
    decoded = null;

    if (signal?.aborted) {
      throw new AppError("cancelled");
    }

    const quality = qualityAppliesTo(outputFormat)
      ? sliderToCanvasQuality(options.quality ?? DEFAULT_QUALITY)
      : undefined;

    const blob = await canvasToBlob(canvas, mimeType, quality);

    return {
      blob,
      mimeType,
      format: outputFormat,
      width: targetWidth,
      height: targetHeight,
      byteLength: blob.size,
    };
  } catch (error) {
    decoded?.close();
    if (error instanceof AppError) throw error;
    logError("renderImage failed", error);
    throw new AppError("conversion_failed");
  } finally {
    releaseCanvas(canvas);
  }
}
