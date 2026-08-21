"use client";

import { useState } from "react";
import { ConversionProgress } from "@/components/ConversionProgress";
import { DimensionInputs } from "@/components/DimensionInputs";
import { DownloadButton } from "@/components/DownloadButton";
import { ErrorBanner } from "@/components/ErrorBanner";
import { FileMeta } from "@/components/FileMeta";
import { FormatSelector } from "@/components/FormatSelector";
import { ImagePreview } from "@/components/ImagePreview";
import { ImageUploader } from "@/components/ImageUploader";
import { SelectedImageList } from "@/components/SelectedImageList";
import { useImageSelection } from "@/hooks/useImageSelection";
import { useKeyedState } from "@/hooks/useKeyedState";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { track } from "@/lib/analytics";
import { getErrorCode, getUserErrorMessage } from "@/lib/errors";
import { buildOutputFilename } from "@/lib/fileUtils";
import { formatToExtension, IMAGE_FORMATS, type ImageFormat } from "@/lib/formatUtils";
import { renderImage, type RenderResult } from "@/lib/imageRender";
import { logError } from "@/lib/logger";
import { clampDimension, linkedHeight, linkedWidth } from "@/lib/resizeUtils";

export function ImageResizerTool() {
  const selection = useImageSelection({ toolId: "image-resizer" });
  const { activeImage, beginTask } = selection;
  const originalUrl = useObjectUrl(activeImage?.file ?? null);
  const imageKey = activeImage
    ? `${activeImage.file.name}-${activeImage.file.size}-${activeImage.width}x${activeImage.height}`
    : "none";
  const [width, setWidth] = useKeyedState(imageKey, activeImage?.width ?? 800);
  const [height, setHeight] = useKeyedState(imageKey, activeImage?.height ?? 600);
  const [lockAspect, setLockAspect] = useKeyedState(imageKey, true);
  const [outputFormat, setOutputFormat] = useKeyedState<ImageFormat>(
    imageKey,
    activeImage?.format ?? "jpeg",
  );
  const [working, setWorking] = useState(false);
  const [result, setResult] = useKeyedState<RenderResult | null>(imageKey, null);
  const resultUrl = useObjectUrl(result?.blob ?? null);

  function handleWidth(next: number) {
    const value = clampDimension(next);
    setWidth(value);
    if (activeImage && lockAspect) {
      setHeight(clampDimension(linkedHeight(value, activeImage.width, activeImage.height)));
    }
    setResult(null);
  }

  function handleHeight(next: number) {
    const value = clampDimension(next);
    setHeight(value);
    if (activeImage && lockAspect) {
      setWidth(clampDimension(linkedWidth(value, activeImage.width, activeImage.height)));
    }
    setResult(null);
  }

  async function run() {
    if (!activeImage || working) return;
    const controller = beginTask();
    setWorking(true);
    selection.setErrors([]);
    track("conversion_started", { tool: "image-resizer", output_format: outputFormat });
    try {
      const next = await renderImage(activeImage.file, {
        outputFormat,
        targetWidth: width,
        targetHeight: height,
        quality: 90,
        signal: controller.signal,
      });
      setResult(next);
      track("conversion_completed", { tool: "image-resizer", output_format: outputFormat });
    } catch (error) {
      logError("resize", error);
      if (getErrorCode(error) !== "cancelled") {
        selection.setErrors([getUserErrorMessage(error)]);
        track("conversion_failed", { tool: "image-resizer", reason: getErrorCode(error) });
      }
    } finally {
      setWorking(false);
    }
  }

  return (
    <section
      aria-label="Image resizer"
      aria-busy={working}
      className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-soft)]"
    >
      <div className="space-y-6 p-5 sm:p-7">
        <ErrorBanner messages={selection.errors} />
        {!activeImage ? (
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
            <div className="grid gap-4 lg:grid-cols-2">
              <ImagePreview src={originalUrl} alt="Original image" label="Original" />
              <ImagePreview src={resultUrl} alt="Resized image" label="Resized" />
            </div>
            <FileMeta
              filename={activeImage.file.name}
              format={activeImage.format}
              bytes={activeImage.file.size}
              width={activeImage.width}
              height={activeImage.height}
            />
            <DimensionInputs
              width={width}
              height={height}
              lockAspect={lockAspect}
              disabled={working}
              onWidthChange={handleWidth}
              onHeightChange={handleHeight}
              onLockChange={setLockAspect}
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
            <div className="tool-actions">
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
                {working ? "Resizing..." : "Resize Image"}
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
