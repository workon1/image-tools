"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { AppError, getUserErrorMessage } from "@/lib/errors";
import { formatLabel, type ImageFormat } from "@/lib/formatUtils";
import { sizeBucket } from "@/lib/fileUtils";
import { inspectImageFile } from "@/lib/imageInspection";
import { validateImageFiles, type ValidatedImage } from "@/lib/imageValidation";
import { logError } from "@/lib/logger";

export type SelectedImage = ValidatedImage & {
  width: number;
  height: number;
};

type Options = {
  toolId: string;
  lockedInput?: ImageFormat;
};

export function useImageSelection({ toolId, lockedInput }: Options) {
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [activeIndex, setActiveIndexState] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    track("tool_loaded", { tool: toolId });
  }, [toolId]);

  const activeImage = images[activeIndex] ?? null;

  const setActiveIndex = useCallback((index: number) => {
    setActiveIndexState(index);
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setImages([]);
    setActiveIndexState(0);
    setErrors([]);
  }, []);

  const selectFiles = useCallback(
    async (files: File[]) => {
      const result = await validateImageFiles(files);
      const nextErrors = [...result.errors];
      if (result.skippedForLimit) {
        nextErrors.push(new AppError("too_many_files").userMessage);
      }

      const matching = lockedInput
        ? result.accepted.filter((item) => item.format === lockedInput)
        : result.accepted;

      if (lockedInput && result.accepted.length > matching.length) {
        nextErrors.push(
          `This tool needs a ${formatLabel(lockedInput)} image. Other file types were skipped.`,
        );
      }

      if (matching.length === 0) {
        setErrors(
          nextErrors.length
            ? nextErrors
            : [
                lockedInput
                  ? `Please choose a ${formatLabel(lockedInput)} image.`
                  : new AppError("unsupported_type").userMessage,
              ],
        );
        return;
      }

      const inspected: SelectedImage[] = [];
      for (const item of matching) {
        try {
          const dimensions = await inspectImageFile(item.file);
          inspected.push({ ...item, ...dimensions });
        } catch (error) {
          logError("inspectImageFile", error);
          nextErrors.push(getUserErrorMessage(error));
        }
      }

      if (inspected.length === 0) {
        setErrors(nextErrors);
        return;
      }

      setImages(inspected);
      setActiveIndexState(0);
      setErrors(nextErrors);
      track("image_selected", {
        format: inspected[0].format,
        size_bucket: sizeBucket(inspected[0].file.size),
        file_count: inspected.length,
        tool: toolId,
      });
    },
    [lockedInput, toolId],
  );

  const beginTask = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    return controller;
  }, []);

  return {
    images,
    activeIndex,
    setActiveIndex,
    activeImage,
    errors,
    setErrors,
    selectFiles,
    reset,
    beginTask,
  };
}
