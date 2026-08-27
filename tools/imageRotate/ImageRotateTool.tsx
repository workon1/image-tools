"use client";

import { useState } from "react";
import { ConversionProgress } from "@/components/ConversionProgress";
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
import {
  renderImage,
  type RenderResult,
  type RotateDegrees,
} from "@/lib/imageRender";
import { logError } from "@/lib/logger";

const ANGLES: RotateDegrees[] = [90, 180, 270];

export function ImageRotateTool() {
  const selection = useImageSelection({ toolId: "image-rotate" });
  const { activeImage, beginTask } = selection;
  const originalUrl = useObjectUrl(activeImage?.file ?? null);
  const imageKey = activeImage
    ? `${activeImage.file.name}-${activeImage.file.size}-${activeImage.width}x${activeImage.height}`
    : "none";
  const [rotate, setRotate] = useKeyedState<RotateDegrees>(imageKey, 0);
  const [flipHorizontal, setFlipHorizontal] = useKeyedState(imageKey, false);
  const [flipVertical, setFlipVertical] = useKeyedState(imageKey, false);
  const [outputFormat, setOutputFormat] = useKeyedState<ImageFormat>(
    imageKey,
    activeImage?.format ?? "jpeg",
  );
  const [working, setWorking] = useState(false);
  const [result, setResult] = useKeyedState<RenderResult | null>(imageKey, null);
  const resultUrl = useObjectUrl(result?.blob ?? null);

  function bumpRotate(degrees: RotateDegrees) {
    setRotate(((rotate + degrees) % 360) as RotateDegrees);
    setResult(null);
  }

  async function run() {
    if (!activeImage || working) return;
    const controller = beginTask();
    setWorking(true);
    selection.setErrors([]);
    track("conversion_started", { tool: "image-rotate", output_format: outputFormat });
    try {
      const next = await renderImage(activeImage.file, {
        outputFormat,
        rotate,
        flipHorizontal,
        flipVertical,
        quality: 92,
        signal: controller.signal,
      });
      setResult(next);
      track("conversion_completed", { tool: "image-rotate", output_format: outputFormat });
    } catch (error) {
      logError("rotate", error);
      if (getErrorCode(error) !== "cancelled") {
        selection.setErrors([getUserErrorMessage(error)]);
        track("conversion_failed", { tool: "image-rotate", reason: getErrorCode(error) });
      }
    } finally {
      setWorking(false);
    }
  }

  return (
    <section
      aria-label="Rotate and flip images"
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
              <ImagePreview
                src={originalUrl}
                alt="Image with pending rotate and flip"
                label="Preview"
                imageStyle={{
                  transform: `rotate(${rotate}deg) scaleX(${flipHorizontal ? -1 : 1}) scaleY(${flipVertical ? -1 : 1})`,
                }}
              />
              <ImagePreview src={resultUrl} alt="Rotated image" label="Result" />
            </div>
            <FileMeta
              filename={activeImage.file.name}
              format={activeImage.format}
              bytes={activeImage.file.size}
              width={activeImage.width}
              height={activeImage.height}
            />
            <div className="flex flex-wrap gap-2">
              {ANGLES.map((angle) => (
                <button
                  key={angle}
                  type="button"
                  className="rounded-full bg-paper px-3 py-1.5 text-sm text-ink"
                  onClick={() => bumpRotate(angle)}
                  disabled={working}
                >
                  Rotate {angle}°
                </button>
              ))}
              <button
                type="button"
                className={`rounded-full px-3 py-1.5 text-sm ${
                  flipHorizontal ? "bg-accent text-white" : "bg-paper text-ink"
                }`}
                onClick={() => {
                  setFlipHorizontal(!flipHorizontal);
                  setResult(null);
                }}
                disabled={working}
              >
                Flip horizontal
              </button>
              <button
                type="button"
                className={`rounded-full px-3 py-1.5 text-sm ${
                  flipVertical ? "bg-accent text-white" : "bg-paper text-ink"
                }`}
                onClick={() => {
                  setFlipVertical(!flipVertical);
                  setResult(null);
                }}
                disabled={working}
              >
                Flip vertical
              </button>
              <button
                type="button"
                className="rounded-full bg-paper px-3 py-1.5 text-sm text-ink"
                onClick={() => {
                  setRotate(0);
                  setFlipHorizontal(false);
                  setFlipVertical(false);
                  setResult(null);
                }}
                disabled={working}
              >
                Reset
              </button>
            </div>
            <p className="text-sm text-muted">
              Current transform: {rotate}°{flipHorizontal ? ", flip H" : ""}
              {flipVertical ? ", flip V" : ""}.
            </p>
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
                {working ? "Applying..." : "Apply rotate & flip"}
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
