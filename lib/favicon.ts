import { FAVICON_SIZES } from "@/lib/constants";
import { renderImage, squareCenterCrop, type CropRect } from "@/lib/imageRender";

export type FaviconAsset = {
  filename: string;
  blob: Blob;
  size: number;
};

export async function createIcoFromPng(png: Blob): Promise<Blob> {
  const pngBytes = new Uint8Array(await png.arrayBuffer());
  const headerSize = 6 + 16;
  const buffer = new ArrayBuffer(headerSize + pngBytes.length);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);
  bytes[6] = 32;
  bytes[7] = 32;
  bytes[8] = 0;
  bytes[9] = 0;
  view.setUint16(10, 1, true);
  view.setUint16(12, 32, true);
  view.setUint32(14, pngBytes.length, true);
  view.setUint32(18, headerSize, true);
  bytes.set(pngBytes, headerSize);

  return new Blob([buffer], { type: "image/x-icon" });
}

export async function generateFavicons(
  file: File,
  imageWidth: number,
  imageHeight: number,
  crop?: CropRect,
): Promise<{ assets: FaviconAsset[]; ico: FaviconAsset }> {
  const sourceCrop = crop ?? squareCenterCrop(imageWidth, imageHeight);
  const assets: FaviconAsset[] = [];
  let png32: Blob | null = null;

  for (const size of FAVICON_SIZES) {
    const result = await renderImage(file, {
      outputFormat: "png",
      crop: sourceCrop,
      targetWidth: size,
      targetHeight: size,
    });
    const filename = size === 180 ? "apple-touch-icon.png" : `favicon-${size}.png`;
    assets.push({ filename, blob: result.blob, size });
    if (size === 32) png32 = result.blob;
  }

  if (!png32) {
    throw new Error("Missing 32px favicon");
  }

  const icoBlob = await createIcoFromPng(png32);
  const ico = { filename: "favicon.ico", blob: icoBlob, size: 32 };
  return { assets, ico };
}
