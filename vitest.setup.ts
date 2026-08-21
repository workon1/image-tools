import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

if (!URL.createObjectURL) {
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    writable: true,
    value: vi.fn(() => "blob:mock-url"),
  });
}

if (!URL.revokeObjectURL) {
  Object.defineProperty(URL, "revokeObjectURL", {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
}

HTMLCanvasElement.prototype.toDataURL = function toDataURL(type = "image/png") {
  return `data:${type};base64,AAAA`;
};

HTMLCanvasElement.prototype.getContext = function getContext() {
  return {
    fillRect: vi.fn(),
    drawImage: vi.fn(),
    fillStyle: "",
  } as unknown as CanvasRenderingContext2D;
} as unknown as typeof HTMLCanvasElement.prototype.getContext;

HTMLCanvasElement.prototype.toBlob = function toBlob(callback, type = "image/png") {
  callback(new Blob(["mock"], { type }));
};
