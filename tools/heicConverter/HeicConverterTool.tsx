"use client";

import { useId, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { ConversionProgress } from "@/components/ConversionProgress";
import { DownloadButton } from "@/components/DownloadButton";
import { ErrorBanner } from "@/components/ErrorBanner";
import { ImagePreview } from "@/components/ImagePreview";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { track } from "@/lib/analytics";
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_LABEL } from "@/lib/constants";
import { buildOutputFilename, formatFileSize } from "@/lib/fileUtils";
import { formatToExtension, formatToMimeType, type ImageFormat } from "@/lib/formatUtils";
import { HEIC_EXTENSIONS, HEIC_MIME_TYPES, isHeicFile } from "@/lib/heicDetect";
import { logError } from "@/lib/logger";

const OUTPUT_FORMATS: ImageFormat[] = ["jpeg", "png", "webp"];

const FORMAT_LABELS: Record<ImageFormat, string> = {
  jpeg: "JPG",
  png: "PNG",
  webp: "WebP",
};

type Converted = {
  blob: Blob;
  format: ImageFormat;
};

export function HeicConverterTool() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<ImageFormat>("jpeg");
  const [quality, setQuality] = useState(85);
  const [working, setWorking] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<Converted | null>(null);
  const resultUrl = useObjectUrl(result?.blob ?? null);

  async function acceptFile(next: File | undefined) {
    if (!next || working) return;
    setErrors([]);
    setResult(null);

    if (next.size <= 0) {
      setErrors(["That file is empty. Please choose another photo."]);
      return;
    }

    if (next.size > MAX_FILE_SIZE_BYTES) {
      setErrors([`That file is larger than ${MAX_FILE_SIZE_LABEL}. Please choose a smaller photo.`]);
      return;
    }

    if (!(await isHeicFile(next))) {
      setErrors([
        "That does not look like a HEIC or HEIF photo. Use the Image Converter for JPG, PNG, and WebP files.",
      ]);
      return;
    }

    setFile(next);
    track("image_selected", { tool: "heic-to-jpg" });
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    void acceptFile(event.dataTransfer.files?.[0]);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    void acceptFile(event.target.files?.[0]);
    event.target.value = "";
  }

  async function convert() {
    if (!file || working) return;
    setWorking(true);
    setErrors([]);
    track("conversion_started", { tool: "heic-to-jpg", output_format: outputFormat });

    try {
      // Loaded on demand so the decoder is not in the initial bundle.
      const { heicTo } = await import("heic-to");
      const blob = await heicTo({
        blob: file,
        type: formatToMimeType(outputFormat) as "image/jpeg",
        quality: quality / 100,
      });
      setResult({ blob, format: outputFormat });
      track("conversion_completed", { tool: "heic-to-jpg", output_format: outputFormat });
    } catch (error) {
      logError("heic-convert", error);
      setErrors([
        "We could not decode that photo. It may be a HEIC variant this browser cannot read, or the file may be damaged.",
      ]);
      track("conversion_failed", { tool: "heic-to-jpg", reason: "decode_failed" });
    } finally {
      setWorking(false);
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setErrors([]);
  }

  const accept = [...HEIC_EXTENSIONS, ...HEIC_MIME_TYPES].join(",");

  return (
    <section
      aria-label="HEIC converter"
      aria-busy={working}
      className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-soft)]"
    >
      <div className="space-y-6 p-5 sm:p-7">
        <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-muted">
          HEIC photos from iPhone and iPad are decoded in this browser. The file is not uploaded.
          Large photos take a few seconds because the decoder runs on your device.
        </p>

        <ErrorBanner messages={errors} />

        {!file ? (
          <label
            htmlFor={inputId}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={(event) => {
              if (event.currentTarget.contains(event.relatedTarget as Node)) return;
              setDragging(false);
            }}
            onDrop={handleDrop}
            className={`block cursor-pointer rounded-3xl border-2 border-dashed p-6 text-center transition-colors sm:p-14 ${
              dragging
                ? "border-accent bg-accent/5"
                : "border-line bg-paper/60 hover:border-accent/50 hover:bg-accent/[0.03]"
            }`}
          >
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              className="sr-only"
              accept={accept}
              disabled={working}
              onChange={handleChange}
            />
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
                <path
                  d="M12 16V4m0 0 4 4M12 4 8 8M5 16.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="mt-5 block text-lg font-semibold tracking-tight text-ink sm:text-xl">
              Drop a HEIC photo here, or click to browse
            </span>
            <span className="mx-auto mt-2 block max-w-lg text-sm leading-6 text-muted">
              .heic and .heif files up to {MAX_FILE_SIZE_LABEL}. Processed in this browser.
            </span>
            <span className="btn-primary mt-6 !inline-flex">Choose a HEIC photo</span>
          </label>
        ) : (
          <>
            <div className="rounded-2xl border border-line bg-paper/60 px-4 py-3 text-sm">
              <p className="font-medium text-ink">{file.name}</p>
              <p className="mt-1 text-muted">
                {formatFileSize(file.size)}
                {result
                  ? ` → ${formatFileSize(result.blob.size)} as ${FORMAT_LABELS[result.format]}`
                  : ""}
              </p>
            </div>

            <fieldset disabled={working}>
              <legend className="text-sm font-medium text-ink">Convert to</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {OUTPUT_FORMATS.map((format) => (
                  <button
                    key={format}
                    type="button"
                    onClick={() => {
                      setOutputFormat(format);
                      setResult(null);
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      outputFormat === format
                        ? "bg-accent text-white shadow-[var(--shadow-lift)]"
                        : "bg-paper text-ink hover:bg-accent/10"
                    }`}
                  >
                    {FORMAT_LABELS[format]}
                  </button>
                ))}
              </div>
            </fieldset>

            {outputFormat !== "png" ? (
              <div>
                <label htmlFor={`${inputId}-quality`} className="text-sm font-medium text-ink">
                  Quality: {quality}%
                </label>
                <input
                  id={`${inputId}-quality`}
                  type="range"
                  min={10}
                  max={100}
                  step={1}
                  value={quality}
                  disabled={working}
                  onChange={(event) => {
                    setQuality(Number(event.target.value));
                    setResult(null);
                  }}
                  className="mt-2 w-full"
                />
                <p className="mt-1 text-sm text-muted">
                  85% keeps photographs looking clean. Lower it only if you need a smaller file.
                </p>
              </div>
            ) : null}

            {resultUrl ? (
              <ImagePreview
                src={resultUrl}
                alt="Converted photo"
                label={`Converted ${FORMAT_LABELS[outputFormat]}`}
              />
            ) : null}

            <ConversionProgress active={working} />

            <div className="tool-actions">
              {result ? (
                <DownloadButton
                  blob={result.blob}
                  filename={buildOutputFilename(file.name, formatToExtension(result.format))}
                  outputFormat={result.format}
                />
              ) : null}
              <button
                type="button"
                className={result ? "btn-secondary" : "btn-primary"}
                onClick={convert}
                disabled={working}
              >
                {working ? "Converting..." : `Convert to ${FORMAT_LABELS[outputFormat]}`}
              </button>
              <button type="button" className="btn-ghost" onClick={reset} disabled={working}>
                Start over
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
