"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { clampCrop, type CropRect } from "@/lib/imageRender";

type Handle = "move" | "nw" | "ne" | "sw" | "se";

type CropEditorProps = {
  src: string;
  imageWidth: number;
  imageHeight: number;
  value: CropRect;
  aspect: number | null;
  onChange: (rect: CropRect) => void;
};

function containedImage(container: DOMRect, imageWidth: number, imageHeight: number) {
  const scale = Math.min(container.width / imageWidth, container.height / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  const x = (container.width - width) / 2;
  const y = (container.height - height) / 2;
  return { x, y, width, height, scale };
}

export function CropEditor({
  src,
  imageWidth,
  imageHeight,
  value,
  aspect,
  onChange,
}: CropEditorProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    handle: Handle;
    startX: number;
    startY: number;
    origin: CropRect;
  } | null>(null);
  const [box, setBox] = useState({ x: 0, y: 0, width: 1, height: 1, scale: 1 });

  const measure = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    setBox(containedImage(frame.getBoundingClientRect(), imageWidth, imageHeight));
  }, [imageHeight, imageWidth]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, src]);

  function clientToImage(clientX: number, clientY: number) {
    const frame = frameRef.current;
    if (!frame) return { x: 0, y: 0 };
    const rect = frame.getBoundingClientRect();
    return {
      x: (clientX - rect.left - box.x) / box.scale,
      y: (clientY - rect.top - box.y) / box.scale,
    };
  }

  function applyAspect(rect: CropRect, handle: Handle): CropRect {
    if (!aspect) return rect;
    if (handle === "move") return rect;
    const next = { ...rect };
    if (handle === "se" || handle === "ne") {
      next.height = next.width / aspect;
    } else {
      next.width = next.height * aspect;
    }
    if (handle === "nw") {
      next.x = value.x + value.width - next.width;
      next.y = value.y + value.height - next.height;
    }
    if (handle === "ne") {
      next.y = value.y + value.height - next.height;
    }
    if (handle === "sw") {
      next.x = value.x + value.width - next.width;
    }
    return next;
  }

  function onPointerDown(handle: Handle, event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    const point = clientToImage(event.clientX, event.clientY);
    dragRef.current = {
      handle,
      startX: point.x,
      startY: point.y,
      origin: value,
    };
  }

  function onPointerMove(event: PointerEvent) {
    const drag = dragRef.current;
    if (!drag) return;
    const point = clientToImage(event.clientX, event.clientY);
    const dx = point.x - drag.startX;
    const dy = point.y - drag.startY;
    let next: CropRect = { ...drag.origin };

    if (drag.handle === "move") {
      next.x = drag.origin.x + dx;
      next.y = drag.origin.y + dy;
    }
    if (drag.handle.includes("e")) next.width = drag.origin.width + dx;
    if (drag.handle.includes("s")) next.height = drag.origin.height + dy;
    if (drag.handle.includes("w")) {
      next.x = drag.origin.x + dx;
      next.width = drag.origin.width - dx;
    }
    if (drag.handle.includes("n")) {
      next.y = drag.origin.y + dy;
      next.height = drag.origin.height - dy;
    }

    next = applyAspect(next, drag.handle);
    onChange(clampCrop(next, imageWidth, imageHeight));
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  const left = box.x + value.x * box.scale;
  const top = box.y + value.y * box.scale;
  const width = value.width * box.scale;
  const height = value.height * box.scale;

  return (
    <div
      ref={frameRef}
      className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper touch-none"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Image to crop"
        className="pointer-events-none h-full w-full object-contain"
      />
      <div
        className="absolute border-2 border-white shadow-[0_0_0_9999px_rgb(28_25_23_/_0.45)]"
        style={{ left, top, width, height }}
        onPointerDown={(event) => onPointerDown("move", event)}
      >
        {(["nw", "ne", "sw", "se"] as Handle[]).map((handle) => (
          <button
            key={handle}
            type="button"
            aria-label={`Resize crop ${handle}`}
            className={`absolute h-3.5 w-3.5 rounded-sm bg-white ${
              handle === "nw"
                ? "-left-1.5 -top-1.5 cursor-nwse-resize"
                : handle === "ne"
                  ? "-right-1.5 -top-1.5 cursor-nesw-resize"
                  : handle === "sw"
                    ? "-left-1.5 -bottom-1.5 cursor-nesw-resize"
                    : "-right-1.5 -bottom-1.5 cursor-nwse-resize"
            }`}
            onPointerDown={(event) => onPointerDown(handle, event)}
          />
        ))}
      </div>
    </div>
  );
}
