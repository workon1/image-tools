import { formatFileSize } from "@/lib/fileUtils";
import { formatLabel, type ImageFormat } from "@/lib/formatUtils";

type FileMetaProps = {
  filename: string;
  format: ImageFormat;
  bytes: number;
  width?: number;
  height?: number;
};

export function FileMeta({ filename, format, bytes, width, height }: FileMetaProps) {
  return (
    <dl className="grid gap-3 rounded-2xl bg-paper/80 p-4 text-sm sm:grid-cols-2">
      <div className="sm:col-span-2">
        <dt className="text-xs font-medium uppercase tracking-wide text-muted">Filename</dt>
        <dd className="mt-1 break-all font-medium text-ink">{filename}</dd>
      </div>
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-muted">Format</dt>
        <dd className="mt-1 font-medium text-ink">{formatLabel(format)}</dd>
      </div>
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-muted">File size</dt>
        <dd className="mt-1 font-medium text-ink">{formatFileSize(bytes)}</dd>
      </div>
      {width && height ? (
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">Dimensions</dt>
          <dd className="mt-1 font-medium text-ink">
            {width} × {height}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
