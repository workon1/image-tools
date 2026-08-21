import { MAX_IMAGE_DIMENSION, MAX_IMAGE_PIXELS } from "@/lib/constants";
import { AppError } from "@/lib/errors";

export function assertImageDimensions(width: number, height: number): void {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) {
    throw new AppError("corrupt_image");
  }

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    throw new AppError("dimensions_too_large");
  }

  if (width * height > MAX_IMAGE_PIXELS) {
    throw new AppError("dimensions_too_large");
  }
}
