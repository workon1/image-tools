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
import { generateFavicons, type FaviconAsset } from "@/lib/favicon";
import { logError } from "@/lib/logger";

export function FaviconGeneratorTool() {
  const selection = useImageSelection({ toolId: "favicon-generator" });
  const { activeImage } = selection;
  const originalUrl = useObjectUrl(activeImage?.file ?? null);
  const imageKey = activeImage ? `${activeImage.file.name}-${activeImage.file.size}` : "none";
  const [working, setWorking] = useState(false);
  const [assets, setAssets] = useKeyedState<FaviconAsset[]>(imageKey, []);
  const [ico, setIco] = useKeyedState<FaviconAsset | null>(imageKey, null);
  const previewAsset = assets.find((asset) => asset.size === 32) ?? assets[0];
  const previewUrl = useObjectUrl(previewAsset?.blob ?? null);

  async function run() {
    if (!activeImage || working) return;
    setWorking(true);
    selection.setErrors([]);
    track("conversion_started", { tool: "favicon-generator", output_format: "ico" });
    try {
      const next = await generateFavicons(activeImage.file, activeImage.width, activeImage.height);
      setAssets(next.assets);
      setIco(next.ico);
      track("conversion_completed", { tool: "favicon-generator", output_format: "ico" });
    } catch (error) {
      logError("favicon", error);
      if (getErrorCode(error) !== "cancelled") {
        selection.setErrors([getUserErrorMessage(error)]);
        track("conversion_failed", { tool: "favicon-generator", reason: getErrorCode(error) });
      }
    } finally {
      setWorking(false);
    }
  }

  return (
    <section
      aria-label="Favicon generator"
      aria-busy={working}
      className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow-soft)]"
    >
      <div className="space-y-6 p-5 sm:p-7">
        <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-muted">
          We’ll center-crop to a square, then create PNG icons and a classic favicon.ico — all in
          your browser.
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
                setAssets([]);
                setIco(null);
              }}
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <ImagePreview src={originalUrl} alt="Original image" label="Original" />
              <ImagePreview src={previewUrl} alt="Favicon preview" label="32×32 preview" />
            </div>
            <FileMeta
              filename={activeImage.file.name}
              format={activeImage.format}
              bytes={activeImage.file.size}
              width={activeImage.width}
              height={activeImage.height}
            />
            <ConversionProgress active={working} />
            {assets.length > 0 ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {ico ? (
                  <li>
                    <DownloadButton
                      blob={ico.blob}
                      filename={ico.filename}
                      outputFormat="ico"
                      label="Download favicon.ico"
                      className="btn-primary w-full"
                    />
                  </li>
                ) : null}
                {assets.map((asset) => (
                  <li key={asset.filename}>
                    <DownloadButton
                      blob={asset.blob}
                      filename={asset.filename}
                      outputFormat="png"
                      label={`Download ${asset.filename}`}
                      className="btn-secondary w-full"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="tool-actions">
              <button type="button" className="btn-primary" onClick={run} disabled={working}>
                {working ? "Generating..." : "Generate Favicons"}
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
