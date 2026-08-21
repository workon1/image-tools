"use client";

import { useId } from "react";
import { MAX_QUALITY, MIN_QUALITY } from "@/lib/constants";

type QualitySliderProps = {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  losslessNote?: boolean;
  label?: string;
  hint?: string;
  min?: number;
  max?: number;
  extra?: string;
};

export function QualitySlider({
  value,
  onChange,
  disabled = false,
  losslessNote = false,
  label = "Quality",
  hint = "10–100. Higher values keep more detail and create larger files.",
  min = MIN_QUALITY,
  max = MAX_QUALITY,
  extra,
}: QualitySliderProps) {
  const sliderId = useId();
  if (losslessNote) {
    return (
      <p className="max-w-xl rounded-2xl bg-paper/80 px-4 py-3 text-sm leading-6 text-muted">
        PNG is a lossless format. The quality setting used for JPG and WebP does not apply — the
        file is saved without JPEG-style compression.
      </p>
    );
  }

  return (
    <div className="rounded-2xl bg-paper/80 p-4">
      <label htmlFor={sliderId} className="flex items-baseline justify-between gap-4">
        <span className="font-semibold tracking-tight text-ink">{label}</span>
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-sm font-medium text-accent">
          {value}%
        </span>
      </label>
      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-accent"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} percent`}
      />
      <p className="mt-2 text-xs text-muted">
        {extra ? `${extra} ` : ""}
        {hint}
      </p>
    </div>
  );
}
