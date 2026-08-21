import { formatFileSize, sizeDifference } from "@/lib/fileUtils";
import { outputSizePercent } from "@/lib/imageCompression";
import { formatLabel, type ImageFormat } from "@/lib/formatUtils";

type ResultSummaryProps = {
  originalBytes: number;
  convertedBytes: number;
  outputFormat: ImageFormat;
  width: number;
  height: number;
  targetBytes?: number;
};

export function ResultSummary({
  originalBytes,
  convertedBytes,
  outputFormat,
  width,
  height,
  targetBytes,
}: ResultSummaryProps) {
  const diff = sizeDifference(originalBytes, convertedBytes);
  const actualPercent = outputSizePercent(originalBytes, convertedBytes);
  const targetPercent = targetBytes != null ? outputSizePercent(originalBytes, targetBytes) : null;

  return (
    <div className="rounded-2xl bg-success/[0.07] p-5">
      <p className="text-sm font-semibold text-success">
        {diff.saved ? "Nice — your file got smaller." : "Ready to download."} {diff.label}
      </p>
      {targetBytes != null ? (
        <p className="mt-2 text-sm leading-6 text-muted">
          Target was {formatFileSize(targetBytes)}
          {targetPercent != null ? ` (${targetPercent}% of original)` : ""}. Result is{" "}
          {formatFileSize(convertedBytes)} ({actualPercent}% of original)
          {convertedBytes <= targetBytes
            ? ", at or under the cap."
            : ". We couldn’t stay under the cap without more shrinking."}
        </p>
      ) : null}
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">Output format</dt>
          <dd className="mt-1 font-medium text-ink">{formatLabel(outputFormat)}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">
            Output dimensions
          </dt>
          <dd className="mt-1 font-medium text-ink">
            {width} × {height}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">Original</dt>
          <dd className="mt-1 font-medium text-ink">{formatFileSize(originalBytes)}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">Converted</dt>
          <dd className="mt-1 font-medium text-ink">{formatFileSize(convertedBytes)}</dd>
        </div>
      </dl>
    </div>
  );
}
