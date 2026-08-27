"use client";

import { useState } from "react";
import { ConversionProgress } from "@/components/ConversionProgress";
import { DownloadButton } from "@/components/DownloadButton";
import { ErrorBanner } from "@/components/ErrorBanner";
import { FileMeta } from "@/components/FileMeta";
import { ImagePreview } from "@/components/ImagePreview";
import { ImageUploader } from "@/components/ImageUploader";
import { SelectedImageList } from "@/components/SelectedImageList";
import { useImageSelection } from "@/hooks/useImageSelection";
import { useKeyedState } from "@/hooks/useKeyedState";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { track } from "@/lib/analytics";
import { getErrorCode, getUserErrorMessage } from "@/lib/errors";
import { buildOutputFilename } from "@/lib/fileUtils";
import { formatToExtension } from "@/lib/formatUtils";
import { renderImage, type RenderResult } from "@/lib/imageRender";
import { logError } from "@/lib/logger";

export function RemoveMetadataTool() {
  const selection = useImageSelection({ toolId: "remove-image-metadata" });
  const { activeImage, beginTask } = selection;
  const originalUrl = useObjectUrl(activeImage?.file ?? null);
  const imageKey = activeImage
    ? `${activeImage.file.name}-${activeImage.file.size}-${activeImage.format}`
    : "none";
  const [working, setWorking] = useState(false);
  const [result, setResult] = useKeyedState<RenderResult | null>(imageKey, null);
  const resultUrl = useObjectUrl(result?.blob ?? null);

  async function run() {
    if (!activeImage || working) return;
    const controller = beginTask();
    setWorking(true);
    selection.setErrors([]);
    track("conversion_started", {
      tool: "remove-image-metadata",
      output_format: activeImage.format,
    });
    try {
      const next = await renderImage(activeImage.file, {
        outputFormat: activeImage.format,
        quality: 92,
        signal: controller.signal,
      });
      setResult(next);
      track("conversion_completed", {
        tool: "remove-image-metadata",
        output_format: activeImage.format,
      });
    } catch (error) {
      logError("strip-metadata", error);
      if (getErrorCode(error) !== "cancelled") {
        selection.setErrors([getUserErrorMessage(error)]);
        track("conversion_failed", {
          tool: "remove-image-metadata",
          reason: getErrorCode(error),
        });
      }
    } finally {
      setWorking(false);
    }
  }

  return (
    <section
      aria-label="Remove image metadata"
      aria-busy={working}
      className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-soft)]"
    >
      <div className="space-y-6 p-5 sm:p-7">
        <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-muted">
          Camera EXIF, GPS, and other metadata are not copied when the image is redrawn on a canvas.
          JPG and WebP are re-encoded (quality 92). PNG stays lossless. Pixels can change slightly
          on lossy formats.
        </p>
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
              <ImagePreview src={resultUrl} alt="Image without metadata" label="Cleaned" />
            </div>
            <FileMeta
              filename={activeImage.file.name}
              format={activeImage.format}
              bytes={activeImage.file.size}
              width={activeImage.width}
              height={activeImage.height}
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
                {working ? "Removing metadata..." : "Remove metadata"}
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
