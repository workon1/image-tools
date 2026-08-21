"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { ErrorBanner } from "@/components/ErrorBanner";
import { FileMeta } from "@/components/FileMeta";
import { ImagePreview } from "@/components/ImagePreview";
import { ImageUploader } from "@/components/ImageUploader";
import { SelectedImageList } from "@/components/SelectedImageList";
import { useImageSelection } from "@/hooks/useImageSelection";
import { useObjectUrl } from "@/hooks/useObjectUrl";
import { track } from "@/lib/analytics";
import { blobToDataUrl } from "@/lib/resizeUtils";
import { logError } from "@/lib/logger";

export function ImageToBase64Tool() {
  const selection = useImageSelection({ toolId: "image-to-base64" });
  const {
    activeImage,
    setErrors,
    selectFiles,
    reset,
    images,
    activeIndex,
    setActiveIndex,
    errors,
  } = selection;
  const previewUrl = useObjectUrl(activeImage?.file ?? null);
  const imageKey = activeImage ? `${activeImage.file.name}-${activeImage.file.size}` : "none";
  const [encoded, setEncoded] = useState<{ key: string; value: string } | null>(null);
  const dataUrl = encoded?.key === imageKey ? encoded.value : "";
  const working = Boolean(activeImage && encoded?.key !== imageKey);

  useEffect(() => {
    if (!activeImage) return;
    const key = `${activeImage.file.name}-${activeImage.file.size}`;
    let cancelled = false;
    blobToDataUrl(activeImage.file)
      .then((value) => {
        if (!cancelled) {
          setEncoded({ key, value });
          track("conversion_completed", { tool: "image-to-base64", output_format: "base64" });
        }
      })
      .catch((error) => {
        logError("base64", error);
        if (!cancelled) setErrors(["We couldn’t encode this image. Please try another file."]);
      });
    return () => {
      cancelled = true;
    };
  }, [activeImage, setErrors]);

  return (
    <section
      aria-label="Image to Base64"
      aria-busy={working}
      className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-soft)]"
    >
      <div className="space-y-6 p-5 sm:p-7">
        <ErrorBanner messages={errors} />
        {!activeImage ? (
          <ImageUploader onFiles={selectFiles} disabled={working} />
        ) : (
          <>
            <SelectedImageList
              images={images}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
            <ImagePreview src={previewUrl} alt="Selected image" label="Preview" />
            <FileMeta
              filename={activeImage.file.name}
              format={activeImage.format}
              bytes={activeImage.file.size}
              width={activeImage.width}
              height={activeImage.height}
            />
            <label className="block">
              <span className="text-sm font-medium text-ink">Data URL</span>
              <textarea
                readOnly
                value={dataUrl}
                rows={8}
                className="mt-2 w-full min-w-0 rounded-2xl border border-line bg-paper p-3 font-mono text-xs text-ink"
              />
            </label>
            <div className="tool-actions">
              <CopyButton text={dataUrl} label="Copy Base64" />
              <button type="button" className="btn-ghost" onClick={reset}>
                Convert another image
              </button>
            </div>
            <ImageUploader onFiles={selectFiles} compact />
          </>
        )}
      </div>
    </section>
  );
}
