"use client";

import { useCallback, useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import { DEFAULT_QUALITY } from "@/lib/constants";
import { convertImage, createConversionConfig } from "@/lib/imageConversion";
import { AppError, getErrorCode, getUserErrorMessage } from "@/lib/errors";
import { buildOutputFilename } from "@/lib/fileUtils";
import {
  formatToExtension,
  formatToMimeType,
  getAvailableOutputFormats,
  IMAGE_FORMATS,
  qualityAppliesTo,
  type ImageFormat,
} from "@/lib/formatUtils";
import { useImageSelection } from "@/hooks/useImageSelection";
import { logError } from "@/lib/logger";

export type ConvertedImage = {
  blob: Blob;
  format: ImageFormat;
  width: number;
  height: number;
  filename: string;
};

type Options = {
  toolId?: string;
  lockedInput?: ImageFormat;
  lockedOutput?: ImageFormat;
};

export function useImageConverter({
  toolId = "image-converter",
  lockedInput,
  lockedOutput,
}: Options = {}) {
  const selection = useImageSelection({ toolId, lockedInput });
  const [outputFormatOverride, setOutputFormatOverride] = useState<ImageFormat | null>(
    lockedOutput ?? null,
  );
  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState<ConvertedImage | null>(null);

  const { activeImage } = selection;
  const availableFormats = useMemo(() => {
    if (lockedOutput) return [lockedOutput];
    return IMAGE_FORMATS;
  }, [lockedOutput]);

  const outputFormat = lockedOutput
    ? lockedOutput
    : outputFormatOverride && availableFormats.includes(outputFormatOverride)
      ? outputFormatOverride
      : activeImage
        ? (getAvailableOutputFormats(activeImage.format)[0] ?? activeImage.format)
        : (availableFormats[0] ?? null);

  const setActiveIndex = useCallback(
    (index: number) => {
      selection.setActiveIndex(index);
      setConverted(null);
    },
    [selection],
  );

  const setOutputFormat = useCallback((format: ImageFormat) => {
    setOutputFormatOverride(format);
    setConverted(null);
  }, []);

  const reset = useCallback(() => {
    selection.reset();
    setOutputFormatOverride(lockedOutput ?? null);
    setQuality(DEFAULT_QUALITY);
    setConverting(false);
    setConverted(null);
  }, [lockedOutput, selection]);

  const selectFiles = useCallback(
    async (files: File[]) => {
      await selection.selectFiles(files);
      setConverted(null);
      if (!lockedOutput) setOutputFormatOverride(null);
    },
    [lockedOutput, selection],
  );

  const convert = useCallback(async () => {
    if (!activeImage || !outputFormat || converting) return;

    const controller = selection.beginTask();
    setConverting(true);
    selection.setErrors([]);
    setConverted(null);

    track("conversion_started", {
      input_format: activeImage.format,
      output_format: outputFormat,
      tool: toolId,
    });

    try {
      const config = createConversionConfig(activeImage.format, outputFormat, quality, {
        allowSameFormat: true,
      });
      const result = await convertImage(activeImage.file, {
        outputFormat: config.outputFormat,
        quality: config.quality,
        signal: controller.signal,
      });

      if (controller.signal.aborted) {
        throw new AppError("cancelled");
      }

      const filename = buildOutputFilename(activeImage.file.name, formatToExtension(result.format));
      setConverted({
        blob: result.blob,
        format: result.format,
        width: result.width,
        height: result.height,
        filename,
      });
      track("conversion_completed", {
        input_format: activeImage.format,
        output_format: result.format,
        size_ratio: Number((result.byteLength / Math.max(activeImage.file.size, 1)).toFixed(3)),
        tool: toolId,
      });
    } catch (error) {
      logError("convert", error);
      const code = getErrorCode(error);
      if (code !== "cancelled") {
        selection.setErrors([getUserErrorMessage(error)]);
        track("conversion_failed", { reason: code, tool: toolId });
      }
    } finally {
      setConverting(false);
    }
  }, [activeImage, converting, outputFormat, quality, selection, toolId]);

  const continueWithResult = useCallback(async () => {
    if (!converted) return;
    const file = new File([converted.blob], converted.filename, {
      type: converted.blob.type || formatToMimeType(converted.format),
    });
    setConverted(null);
    setOutputFormatOverride(null);
    await selection.selectFiles([file]);
  }, [converted, selection]);

  return {
    ...selection,
    setActiveIndex,
    availableFormats,
    outputFormat,
    setOutputFormat,
    quality,
    setQuality,
    converting,
    converted,
    selectFiles,
    convert,
    continueWithResult,
    reset,
    qualityVisible: outputFormat ? qualityAppliesTo(outputFormat) : false,
    lockedOutput: Boolean(lockedOutput),
  };
}
