"use client";

import { track } from "@/lib/analytics";

type DownloadButtonProps = {
  blob: Blob;
  filename: string;
  outputFormat: string;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export function DownloadButton({
  blob,
  filename,
  outputFormat,
  disabled = false,
  label = "Download Image",
  className = "btn-primary w-full sm:w-auto",
}: DownloadButtonProps) {
  function handleClick() {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    track("download_clicked", { output_format: outputFormat });
  }

  return (
    <button type="button" onClick={handleClick} disabled={disabled} className={className}>
      {label}
    </button>
  );
}
