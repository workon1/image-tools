"use client";

import { formatLabel } from "@/lib/formatUtils";
import type { SelectedImage } from "@/hooks/useImageSelection";

type SelectedImageListProps = {
  images: SelectedImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function SelectedImageList({ images, activeIndex, onSelect }: SelectedImageListProps) {
  if (images.length <= 1) return null;

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-muted">Selected images</p>
      <ul className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <li key={`${image.file.name}-${index}`}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                index === activeIndex ? "bg-ink text-surface" : "bg-paper text-ink hover:bg-line"
              }`}
            >
              {image.file.name} · {formatLabel(image.format)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
