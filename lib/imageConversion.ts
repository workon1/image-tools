import { isOutputFormatSupported } from "@/lib/browserSupport";
import { DEFAULT_QUALITY } from "@/lib/constants";
import { AppError } from "@/lib/errors";
import {
  clampQuality,
  getAvailableOutputFormats,
  qualityAppliesTo,
  type ImageFormat,
} from "@/lib/formatUtils";
import { renderImage, type RenderOptions, type RenderResult } from "@/lib/imageRender";

export type ConversionOptions = Omit<RenderOptions, "outputFormat"> & {
  outputFormat: ImageFormat;
};

export type ConversionResult = RenderResult;

export type ConversionConfig = {
  inputFormat: ImageFormat;
  outputFormat: ImageFormat;
  quality: number;
};

export function createConversionConfig(
  inputFormat: ImageFormat,
  outputFormat: ImageFormat,
  quality = DEFAULT_QUALITY,
  options: { allowSameFormat?: boolean } = {},
): ConversionConfig {
  if (!options.allowSameFormat) {
    const allowed = getAvailableOutputFormats(inputFormat);
    if (!allowed.includes(outputFormat)) {
      throw new AppError(
        "conversion_failed",
        "That conversion isn’t available for this image format.",
      );
    }
  }

  return {
    inputFormat,
    outputFormat,
    quality: qualityAppliesTo(outputFormat) ? clampQuality(quality) : 100,
  };
}

export async function convertImage(
  file: File,
  options: ConversionOptions,
): Promise<ConversionResult> {
  if (!isOutputFormatSupported(options.outputFormat)) {
    throw new AppError("format_unsupported_by_browser");
  }
  return renderImage(file, options);
}

export { getAvailableOutputFormats, qualityAppliesTo };
