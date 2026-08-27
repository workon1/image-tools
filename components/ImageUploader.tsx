"use client";

import { useId, useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { ACCEPTED_EXTENSIONS, ACCEPTED_MIME_TYPES, MAX_FILE_SIZE_LABEL } from "@/lib/constants";
import { acceptAttribute } from "@/lib/fileUtils";

type ImageUploaderProps = {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  compact?: boolean;
};

export function ImageUploader({ onFiles, disabled = false, compact = false }: ImageUploaderProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const hintId = `${inputId}-hint`;

  function emitFiles(fileList: FileList | File[] | null) {
    if (!fileList) return;
    const files = Array.from(fileList);
    if (files.length === 0) return;
    onFiles(files);
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    if (disabled) return;
    event.dataTransfer.dropEffect = "copy";
    setDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    setDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    emitFiles(event.dataTransfer.files);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    emitFiles(event.target.files);
    event.target.value = "";
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`block cursor-pointer rounded-3xl border-2 border-dashed text-center transition-[border-color,background-color,box-shadow] duration-150 ${
          dragging
            ? "border-accent bg-accent/5 shadow-[var(--shadow-lift)]"
            : "border-line bg-paper/60 hover:border-accent/50 hover:bg-accent/[0.03]"
        } ${disabled ? "cursor-not-allowed opacity-60" : ""} ${compact ? "p-4 sm:p-6" : "p-6 sm:p-14"}`}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="sr-only"
          accept={acceptAttribute(ACCEPTED_EXTENSIONS, ACCEPTED_MIME_TYPES)}
          multiple
          disabled={disabled}
          onChange={handleChange}
          aria-describedby={hintId}
        />
        <span
          aria-hidden="true"
          className={`mx-auto grid place-items-center rounded-full bg-accent/10 text-accent ${compact ? "h-12 w-12" : "h-16 w-16"}`}
        >
          <svg
            viewBox="0 0 24 24"
            className={compact ? "h-6 w-6" : "h-8 w-8"}
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 16V4m0 0 4 4M12 4 8 8M5 16.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className={`block font-semibold tracking-tight text-ink ${compact ? "mt-3 text-base" : "mt-5 text-lg sm:text-xl"}`}
        >
          Drop images here, or click to browse
        </span>
        <span id={hintId} className="mx-auto mt-2 block max-w-lg text-sm leading-6 text-muted">
          JPG, PNG, and WebP. Up to {MAX_FILE_SIZE_LABEL} per image. You can select more than one
          file. Files are processed in this browser and are not uploaded.
        </span>
        <span className="btn-primary mt-6 !inline-flex">
          {compact ? "Replace image" : "Choose images"}
        </span>
      </label>
      {!compact ? (
        <div className="mt-3 text-center">
          <label className="inline-flex cursor-pointer text-sm font-medium text-accent hover:underline">
            <input
              type="file"
              accept={acceptAttribute(ACCEPTED_EXTENSIONS, ACCEPTED_MIME_TYPES)}
              capture="environment"
              className="sr-only"
              disabled={disabled}
              onChange={handleChange}
            />
            Use camera
          </label>
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {dragging ? "Drop images to add them." : ""}
      </p>
    </div>
  );
}
