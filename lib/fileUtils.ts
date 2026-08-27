export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;

  const kb = bytes / 1024;
  if (kb < 1024) {
    return kb >= 100 ? `${Math.round(kb)} KB` : `${trimZeros(kb)} KB`;
  }

  const mb = kb / 1024;
  return mb >= 10 ? `${Math.round(mb)} MB` : `${trimZeros(mb)} MB`;
}

function trimZeros(value: number): string {
  return value.toFixed(1).replace(/\.0$/, "");
}

export function sizeBucket(bytes: number): string {
  if (bytes < 100_000) return "lt_100kb";
  if (bytes < 1_000_000) return "100kb_1mb";
  if (bytes < 5_000_000) return "1_5mb";
  if (bytes < 20_000_000) return "5_20mb";
  return "gte_20mb";
}

export function sizeDifference(
  originalBytes: number,
  convertedBytes: number,
): {
  percent: number;
  saved: boolean;
  unchanged: boolean;
  label: string;
} {
  if (originalBytes <= 0) {
    return { percent: 0, saved: false, unchanged: true, label: "Same size" };
  }

  const delta = originalBytes - convertedBytes;
  const percent = Math.round((Math.abs(delta) / originalBytes) * 100);

  if (delta > 0) {
    return { percent, saved: true, unchanged: false, label: `Saved: ${percent}%` };
  }
  if (delta < 0) {
    return { percent, saved: false, unchanged: false, label: `Increased: ${percent}%` };
  }
  return { percent: 0, saved: false, unchanged: true, label: "Same size" };
}

export function sanitizeFilename(name: string): string {
  const base = name.replace(/^.*[/\\]/, "").replace(/\.[^.]+$/, "");
  const cleaned = base
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  return cleaned || "image";
}

export function buildOutputFilename(
  originalName: string,
  extension: string,
  suffix?: string,
): string {
  const base = sanitizeFilename(originalName);
  const extra = suffix
    ? `-${suffix.replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "")}`
    : "";
  return `${base}${extra}.${extension.replace(/^\./, "")}`;
}

export function acceptAttribute(
  extensions: readonly string[],
  mimeTypes: readonly string[],
): string {
  return [...mimeTypes, ...extensions].join(",");
}
