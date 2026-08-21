"use client";

import { MIN_OUTPUT_DIMENSION, MAX_IMAGE_DIMENSION } from "@/lib/constants";

type DimensionInputsProps = {
  width: number;
  height: number;
  lockAspect: boolean;
  disabled?: boolean;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onLockChange: (locked: boolean) => void;
};

export function DimensionInputs({
  width,
  height,
  lockAspect,
  disabled,
  onWidthChange,
  onHeightChange,
  onLockChange,
}: DimensionInputsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
      <label className="block">
        <span className="text-sm font-medium text-ink">Width</span>
        <input
          type="number"
          min={MIN_OUTPUT_DIMENSION}
          max={MAX_IMAGE_DIMENSION}
          value={width}
          disabled={disabled}
          onChange={(event) => onWidthChange(Number(event.target.value))}
          className="mt-1 w-full rounded-2xl border border-line bg-paper px-3 py-2 text-ink"
        />
      </label>
      <label className="flex items-end gap-2 pb-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={lockAspect}
          disabled={disabled}
          onChange={(event) => onLockChange(event.target.checked)}
        />
        Lock ratio
      </label>
      <label className="block">
        <span className="text-sm font-medium text-ink">Height</span>
        <input
          type="number"
          min={MIN_OUTPUT_DIMENSION}
          max={MAX_IMAGE_DIMENSION}
          value={height}
          disabled={disabled}
          onChange={(event) => onHeightChange(Number(event.target.value))}
          className="mt-1 w-full rounded-2xl border border-line bg-paper px-3 py-2 text-ink"
        />
      </label>
    </div>
  );
}
