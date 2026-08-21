"use client";

import { useState } from "react";
import { ConversionProgress } from "@/components/ConversionProgress";
import { DownloadButton } from "@/components/DownloadButton";
import { ErrorBanner } from "@/components/ErrorBanner";
import { FileMeta } from "@/components/FileMeta";
import { FormatSelector } from "@/components/FormatSelector";
import { ImagePreview } from "@/components/ImagePreview";
import { ImageUploader } from "@/components/ImageUploader";
import { QualitySlider } from "@/components/QualitySlider";
import { ResultSummary } from "@/components/ResultSummary";
import { SelectedImageList } from "@/components/SelectedImageList";
import { useImageSelection } from "@/hooks/useImageSelection";
import { useKeyedState } from "@/hooks/useKeyedState";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { track } from "@/lib/analytics";
import { DEFAULT_TARGET_PERCENT, MAX_TARGET_PERCENT, MIN_TARGET_PERCENT } from "@/lib/constants";
import { getErrorCode, getUserErrorMessage } from "@/lib/errors";
import { buildOutputFilename, formatFileSize } from "@/lib/fileUtils";
import { formatToExtension, type ImageFormat } from "@/lib/formatUtils";
import { compressToMaxBytes, targetBytesFromPercent } from "@/lib/imageCompression";
import type { RenderResult } from "@/lib/imageRender";
import { logError } from "@/lib/logger";

const OUTPUTS: ImageFormat[] = ["jpeg", "webp"];

export function ImageCompressorTool() {
  const selection = useImageSelection({ toolId: "image-compressor" });
  const { activeImage, beginTask } = selection;
  const originalUrl = useObjectUrl(activeImage?.file ?? null);
  const imageKey = activeImage
    ? `${activeImage.file.name}-${activeImage.file.size}-${activeImage.format}`
    : "none";
  const [outputFormat, setOutputFormat] = useKeyedState<ImageFormat>(
    imageKey,
    activeImage?.format === "png" ? "jpeg" : (activeImage?.format ?? "jpeg"),
  );
  const [targetPercent, setTargetPercent] = useState(DEFAULT_TARGET_PERCENT);
  const [working, setWorking] = useState(false);
  const [result, setResult] = useKeyedState<RenderResult | null>(imageKey, null);
  const resultUrl = useObjectUrl(result?.blob ?? null);
  const targetBytes = activeImage
    ? targetBytesFromPercent(activeImage.file.size, targetPercent)
    : 0;

  async function run() {
    if (!activeImage || working) return;
    const controller = beginTask();
    setWorking(true);
    selection.setErrors([]);
    track("conversion_started", { tool: "image-compressor", output_format: outputFormat });
    try {
      const next = await compressToMaxBytes(activeImage.file, {
        maxBytes: targetBytes,
        outputFormat,
        width: activeImage.width,
        height: activeImage.height,
        sourceFormat: activeImage.format,
        signal: controller.signal,
      });
      setResult(next);
      track("conversion_completed", { tool: "image-compressor", output_format: outputFormat });
    } catch (error) {
      logError("compress", error);
      if (getErrorCode(error) !== "cancelled") {
        selection.setErrors([getUserErrorMessage(error)]);
        track("conversion_failed", { tool: "image-compressor", reason: getErrorCode(error) });
      }
    } finally {
      setWorking(false);
    }
  }

  return (
    <section
      aria-label="Image compressor"
      aria-busy={working}
      className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-soft)]"
    >
      <div className="space-y-6 p-5 sm:p-7">
        <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-muted">
          The slider is a file-size target, not JPEG quality. 50% means we aim for about half the
          original bytes, without going over.
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
              <ImagePreview src={resultUrl} alt="Compressed image" label="Compressed" />
            </div>
            <FileMeta
              filename={activeImage.file.name}
              format={activeImage.format}
              bytes={activeImage.file.size}
              width={activeImage.width}
              height={activeImage.height}
            />
            <FormatSelector
              formats={OUTPUTS}
              value={outputFormat}
              onChange={(format) => {
                setOutputFormat(format);
                setResult(null);
              }}
              disabled={working}
              legend="Output format"
            />
            <QualitySlider
              value={targetPercent}
              onChange={(value) => {
                setTargetPercent(value);
                setResult(null);
              }}
              disabled={working}
              min={MIN_TARGET_PERCENT}
              max={MAX_TARGET_PERCENT}
              label="Target file size"
              extra={`About ${formatFileSize(targetBytes)}.`}
              hint="We’ll compress until the file is this percent of the original, or as close as possible without going over."
            />
            <ConversionProgress active={working} />
            {result ? (
              <ResultSummary
                originalBytes={activeImage.file.size}
                convertedBytes={result.byteLength}
                outputFormat={result.format}
                width={result.width}
                height={result.height}
                targetBytes={targetBytes}
              />
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
                {working ? "Compressing..." : "Compress Image"}
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
