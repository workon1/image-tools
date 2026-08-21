"use client";

import { ConversionProgress } from "@/components/ConversionProgress";
import { DownloadButton } from "@/components/DownloadButton";
import { ErrorBanner } from "@/components/ErrorBanner";
import { FileMeta } from "@/components/FileMeta";
import { FormatSelector } from "@/components/FormatSelector";
import { ImagePreview } from "@/components/ImagePreview";
import { ImageUploader } from "@/components/ImageUploader";
import { QualitySlider } from "@/components/QualitySlider";
import { ResultSummary } from "@/components/ResultSummary";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { formatLabel, type ImageFormat } from "@/lib/formatUtils";
import { useImageConverter } from "@/tools/imageConverter/useImageConverter";

type ImageConverterToolProps = {
  heading?: string;
  lockedInput?: ImageFormat;
  lockedOutput?: ImageFormat;
  toolId?: string;
  actionLabel?: string;
};

export function ImageConverterTool({
  heading,
  lockedInput,
  lockedOutput,
  toolId,
  actionLabel = "Convert Image",
}: ImageConverterToolProps) {
  const converter = useImageConverter({ toolId, lockedInput, lockedOutput });
  const originalUrl = useObjectUrl(converter.activeImage?.file ?? null);
  const convertedUrl = useObjectUrl(converter.converted?.blob ?? null);

  return (
    <section
      aria-label="Image converter"
      aria-busy={converter.converting}
      className="overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-[var(--shadow-soft)] sm:rounded-[2rem]"
    >
      {heading ? (
        <div className="border-b border-line px-5 py-4 sm:px-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink">{heading}</h2>
        </div>
      ) : null}

      <div className="space-y-6 p-4 sm:p-7">
        <ErrorBanner messages={converter.errors} />

        {!converter.activeImage ? (
          <ImageUploader onFiles={converter.selectFiles} disabled={converter.converting} />
        ) : (
          <>
            {converter.images.length > 1 ? (
              <div>
                <p className="mb-2 text-sm font-medium text-muted">Selected images</p>
                <ul className="flex flex-wrap gap-2">
                  {converter.images.map((image, index) => (
                    <li key={`${image.file.name}-${index}`}>
                      <button
                        type="button"
                        onClick={() => converter.setActiveIndex(index)}
                        className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                          index === converter.activeIndex
                            ? "bg-ink text-surface"
                            : "bg-paper text-ink hover:bg-line"
                        }`}
                      >
                        {image.file.name} · {formatLabel(image.format)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="grid gap-4 lg:grid-cols-2">
              <ImagePreview
                src={originalUrl}
                alt={`Original image ${converter.activeImage.file.name}`}
                label="Original"
              />
              <ImagePreview
                src={convertedUrl}
                alt={
                  converter.converted
                    ? `Converted ${formatLabel(converter.converted.format)} image`
                    : "Converted image preview"
                }
                label="Converted"
              />
            </div>

            <FileMeta
              filename={converter.activeImage.file.name}
              format={converter.activeImage.format}
              bytes={converter.activeImage.file.size}
              width={converter.activeImage.width}
              height={converter.activeImage.height}
            />

            {!converter.lockedOutput ? (
              <FormatSelector
                formats={converter.availableFormats}
                value={converter.outputFormat}
                onChange={converter.setOutputFormat}
                disabled={converter.converting}
              />
            ) : null}

            {converter.qualityVisible ? (
              <QualitySlider
                value={converter.quality}
                onChange={converter.setQuality}
                disabled={converter.converting}
              />
            ) : converter.lockedOutput ? null : (
              <QualitySlider
                value={converter.quality}
                onChange={converter.setQuality}
                disabled={converter.converting}
                losslessNote
              />
            )}

            <ConversionProgress active={converter.converting} />

            {converter.converted ? (
              <ResultSummary
                originalBytes={converter.activeImage.file.size}
                convertedBytes={converter.converted.blob.size}
                outputFormat={converter.converted.format}
                width={converter.converted.width}
                height={converter.converted.height}
              />
            ) : null}

            <div className="tool-actions">
              {converter.converted ? (
                <DownloadButton
                  blob={converter.converted.blob}
                  filename={converter.converted.filename}
                  outputFormat={converter.converted.format}
                  disabled={converter.converting}
                />
              ) : null}
              <button
                type="button"
                className={converter.converted ? "btn-secondary" : "btn-primary"}
                onClick={converter.convert}
                disabled={converter.converting || !converter.outputFormat}
              >
                {converter.converting
                  ? "Converting..."
                  : converter.converted
                    ? "Convert again"
                    : actionLabel}
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={converter.reset}
                disabled={converter.converting}
              >
                Convert Another Image
              </button>
              {converter.converted && !converter.lockedOutput ? (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={converter.continueWithResult}
                  disabled={converter.converting}
                >
                  Convert this file further
                </button>
              ) : null}
            </div>

            <ImageUploader
              onFiles={converter.selectFiles}
              disabled={converter.converting}
              compact
            />
          </>
        )}
      </div>
    </section>
  );
}
