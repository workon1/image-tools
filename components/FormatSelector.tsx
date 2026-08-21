"use client";

import { useId } from "react";
import { formatLabel, type ImageFormat } from "@/lib/formatUtils";

type FormatSelectorProps = {
  formats: ImageFormat[];
  value: ImageFormat | null;
  onChange: (format: ImageFormat) => void;
  disabled?: boolean;
  name?: string;
  legend?: string;
};

export function FormatSelector({
  formats,
  value,
  onChange,
  disabled = false,
  name = "output-format",
  legend = "Convert to",
}: FormatSelectorProps) {
  const groupName = `${name}-${useId()}`;
  return (
    <fieldset disabled={disabled} className="min-w-0">
      <legend className="mb-3 font-semibold tracking-tight text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={legend}>
        {formats.map((format) => {
          const selected = value === format;
          return (
            <label
              key={format}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                selected
                  ? "bg-accent text-white shadow-[var(--shadow-lift)]"
                  : "bg-paper text-ink hover:bg-line"
              } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <input
                type="radio"
                name={groupName}
                value={format}
                checked={selected}
                onChange={() => onChange(format)}
                className="sr-only"
              />
              {formatLabel(format)}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
