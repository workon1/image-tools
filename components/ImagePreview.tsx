import type { CSSProperties } from "react";

type ImagePreviewProps = {
  src: string | null;
  alt: string;
  label?: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
};

export function ImagePreview({ src, alt, label, imageClassName, imageStyle }: ImagePreviewProps) {
  return (
    <figure className="min-w-0">
      {label ? (
        <figcaption className="mb-2 text-sm font-medium text-muted">{label}</figcaption>
      ) : null}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(45deg,#efece4_25%,transparent_25%),linear-gradient(-45deg,#efece4_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#efece4_75%),linear-gradient(-45deg,transparent_75%,#efece4_75%)] bg-[length:18px_18px] bg-[position:0_0,0_9px,9px_-9px,-9px_0] bg-paper">
        {src ? (
          // Object URLs are not next/image sources; keep a plain img for local blobs.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            style={imageStyle}
            className={`max-h-full max-w-full object-contain ${imageClassName ?? ""}`}
          />
        ) : (
          <span className="max-w-[90%] rounded-full bg-surface/90 px-3 py-1 text-center text-sm text-muted">
            Convert to see the result
          </span>
        )}
      </div>
    </figure>
  );
}
