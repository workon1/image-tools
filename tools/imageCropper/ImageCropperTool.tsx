"use client";

import { useState } from "react";
import { ConversionProgress } from "@/components/ConversionProgress";
import { CropEditor } from "@/components/CropEditor";
import { DownloadButton } from "@/components/DownloadButton";
import { ErrorBanner } from "@/components/ErrorBanner";
import { FileMeta } from "@/components/FileMeta";
import { FormatSelector } from "@/components/FormatSelector";
import { ImageUploader } from "@/components/ImageUploader";
import { SelectedImageList } from "@/components/SelectedImageList";
import { useImageSelection } from "@/hooks/useImageSelection";
import { useKeyedState } from "@/hooks/useKeyedState";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { track } from "@/lib/analytics";
import { getErrorCode, getUserErrorMessage } from "@/lib/errors";
import { buildOutputFilename } from "@/lib/fileUtils";
import { formatToExtension, IMAGE_FORMATS, type ImageFormat } from "@/lib/formatUtils";
import { centeredCrop, type CropRect, renderImage, type RenderResult } from "@/lib/imageRender";
import { logError } from "@/lib/logger";

const PRESETS = [
  { id: "free", label: "Free", ratio: null as number | null },
  { id: "1:1", label: "1:1", ratio: 1 },
  { id: "4:3", label: "4:3", ratio: 4 / 3 },
  { id: "16:9", label: "16:9", ratio: 16 / 9 },
];

export function ImageCropperTool() {
  const selection = useImageSelection({ toolId: "image-cropper" });
  const { activeImage, beginTask } = selection;
  const originalUrl = useObjectUrl(activeImage?.file ?? null);
  const imageKey = activeImage
    ? `${activeImage.file.name}-${activeImage.file.size}-${activeImage.width}x${activeImage.height}`
    : "none";
  const defaultCrop = activeImage
    ? { x: 0, y: 0, width: activeImage.width, height: activeImage.height }
    : { x: 0, y: 0, width: 1, height: 1 };
  const [crop, setCrop] = useKeyedState<CropRect>(imageKey, defaultCrop);
  const [aspect, setAspect] = useKeyedState<number | null>(imageKey, null);
  const [outputFormat, setOutputFormat] = useKeyedState<ImageFormat>(
    imageKey,
    activeImage?.format ?? "jpeg",
  );
  const [working, setWorking] = useState(false);
  const [result, setResult] = useKeyedState<RenderResult | null>(imageKey, null);
  const resultUrl = useObjectUrl(result?.blob ?? null);

  function applyPreset(ratio: number | null) {
    setAspect(ratio);
    if (!activeImage) return;
    setCrop(
      ratio
        ? centeredCrop(activeImage.width, activeImage.height, ratio)
        : { x: 0, y: 0, width: activeImage.width, height: activeImage.height },
    );
    setResult(null);
  }

  async function run() {
    if (!activeImage || working) return;
    const controller = beginTask();
    setWorking(true);
    selection.setErrors([]);
    track("conversion_started", { tool: "image-cropper", output_format: outputFormat });
    try {
      const next = await renderImage(activeImage.file, {
        outputFormat,
        crop,
        quality: 92,
        signal: controller.signal,
      });
      setResult(next);
      track("conversion_completed", { tool: "image-cropper", output_format: outputFormat });
    } catch (error) {
      logError("crop", error);
      if (getErrorCode(error) !== "cancelled") {
        selection.setErrors([getUserErrorMessage(error)]);
        track("conversion_failed", { tool: "image-cropper", reason: getErrorCode(error) });
      }
    } finally {
      setWorking(false);
    }
  }

  return (
    <section
      aria-label="Image cropper"
      aria-busy={working}
      className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-soft)]"
    >
      <div className="space-y-6 p-5 sm:p-7">
        <ErrorBanner messages={selection.errors} />
        {!activeImage || !originalUrl ? (
          <ImageUploader onFiles={selection.selectFiles} disabled={working} />
        ) : (
          <>
            <SelectedImageList
              images={selection.images}
              activeIndex={selection.activeIndex}
              onSelect={(index) => {
                selection.setActiveIndex(index);
                setResult(null);
              }}
            />
            <CropEditor
              src={originalUrl}
              imageWidth={activeImage.width}
              imageHeight={activeImage.height}
              value={crop}
              aspect={aspect}
              onChange={(rect) => {
                setCrop(rect);
                setResult(null);
              }}
            />
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`rounded-full px-3 py-1.5 text-sm ${
                    aspect === preset.ratio ? "bg-accent text-white" : "bg-paper text-ink"
                  }`}
                  onClick={() => applyPreset(preset.ratio)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <FileMeta
              filename={activeImage.file.name}
              format={activeImage.format}
              bytes={activeImage.file.size}
              width={activeImage.width}
              height={activeImage.height}
            />
            <FormatSelector
              formats={[...IMAGE_FORMATS]}
              value={outputFormat}
              onChange={(format) => {
                setOutputFormat(format);
                setResult(null);
              }}
              disabled={working}
              legend="Output format"
            />
            <ConversionProgress active={working} />
            {resultUrl ? (
              <p className="text-sm text-muted">
                Cropped size: {result?.width} × {result?.height}
              </p>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              {result ? (
                <DownloadButton
                  blob={result.blob}
                  filename={buildOutputFilename(
                    activeImage.file.name,
                    formatToExtension(result.format),
                  )}
                  outputFormat={result.format}
                />
              ) : null}
              <button
                type="button"
                className={result ? "btn-secondary" : "btn-primary"}
                onClick={run}
                disabled={working}
              >
                {working ? "Cropping..." : "Crop Image"}
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={selection.reset}
                disabled={working}
              >
                Start over
              </button>
            </div>
            <ImageUploader onFiles={selection.selectFiles} disabled={working} compact />
          </>
        )}
      </div>
    </section>
  );
}
