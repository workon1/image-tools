import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageConverterTool } from "@/tools/imageConverter/ImageConverterTool";
import * as inspection from "@/lib/imageInspection";
import * as conversion from "@/lib/imageConversion";

function pngFile(name = "photo.png") {
  const header = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3, 4]);
  return new File([header], name, { type: "image/png" });
}

function jpegFile(name = "photo.jpg") {
  const header = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4]);
  return new File([header], name, { type: "image/jpeg" });
}

function webpFile(name = "photo.webp") {
  const header = new Uint8Array([
    0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50, 1, 2, 3,
  ]);
  return new File([header], name, { type: "image/webp" });
}

describe("ImageConverterTool workflow", () => {
  beforeEach(() => {
    vi.spyOn(inspection, "inspectImageFile").mockResolvedValue({ width: 640, height: 480 });
    vi.spyOn(conversion, "convertImage").mockResolvedValue({
      blob: new Blob(["converted"], { type: "image/jpeg" }),
      mimeType: "image/jpeg",
      format: "jpeg",
      width: 640,
      height: 480,
      byteLength: 9,
    });
  });

  it("uploads a PNG, converts to JPG, shows the result, and offers download", async () => {
    const user = userEvent.setup();
    render(<ImageConverterTool />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(input, pngFile());

    expect(await screen.findByText("photo.png")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "PNG" })).toBeInTheDocument();
    expect(screen.getByText("640 × 480")).toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "JPG" }));
    await user.click(screen.getByRole("button", { name: "Convert Image" }));

    expect(await screen.findByRole("button", { name: "Download Image" })).toBeInTheDocument();
    expect(screen.getByText("Output format")).toBeInTheDocument();
    expect(conversion.convertImage).toHaveBeenCalled();

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    await user.click(screen.getByRole("button", { name: "Download Image" }));
    expect(clickSpy).toHaveBeenCalled();
  });

  it("accepts JPEG and WebP uploads", async () => {
    const user = userEvent.setup();
    render(<ImageConverterTool />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(input, jpegFile("camera.jpeg"));
    expect(await screen.findByText("camera.jpeg")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "JPG" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Convert Another Image" }));
    const nextInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(nextInput, webpFile());
    expect(await screen.findByText("photo.webp")).toBeInTheDocument();
  });

  it("shows a friendly error for an invalid file", async () => {
    const user = userEvent.setup();
    render(<ImageConverterTool />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const invalid = new File(["not an image"], "notes.png", { type: "image/png" });
    await user.upload(input, invalid);
    expect(await screen.findByText(/isn’t supported/i)).toBeInTheDocument();
  });

  it("shows a friendly error for an oversized file", async () => {
    const user = userEvent.setup();
    render(<ImageConverterTool />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const huge = pngFile("huge.png");
    Object.defineProperty(huge, "size", { value: 21 * 1024 * 1024 });
    await user.upload(input, huge);
    expect(await screen.findByText(/larger than 20 MB/i)).toBeInTheDocument();
  });
});
