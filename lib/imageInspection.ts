import { AppError } from "@/lib/errors";
import { assertImageDimensions } from "@/lib/imageDimensions";
import { logError } from "@/lib/logger";

export type DecodedImage = {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, dx?: number, dy?: number) => void;
  drawRect: (
    ctx: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ) => void;
  close: () => void;
};

function waitForImage(image: HTMLImageElement, objectUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      image.onload = null;
      image.onerror = null;
    };

    image.onload = () => {
      cleanup();
      resolve();
    };
    image.onerror = () => {
      cleanup();
      URL.revokeObjectURL(objectUrl);
      reject(new AppError("corrupt_image"));
    };

    image.src = objectUrl;
  });
}

async function decodeWithElement(file: File): Promise<DecodedImage> {
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  image.decoding = "async";

  try {
    await waitForImage(image, objectUrl);
    if (typeof image.decode === "function") {
      await image.decode();
    }
  } catch (error) {
    URL.revokeObjectURL(objectUrl);
    if (error instanceof AppError) throw error;
    throw new AppError("corrupt_image");
  }

  assertImageDimensions(image.naturalWidth, image.naturalHeight);

  return {
    width: image.naturalWidth,
    height: image.naturalHeight,
    draw: (ctx, dx = 0, dy = 0) => {
      ctx.drawImage(image, dx, dy);
    },
    drawRect: (ctx, sx, sy, sw, sh, dx, dy, dw, dh) => {
      ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    },
    close: () => {
      image.src = "";
      URL.revokeObjectURL(objectUrl);
    },
  };
}

export async function decodeImage(file: File, signal?: AbortSignal): Promise<DecodedImage> {
  if (signal?.aborted) {
    throw new AppError("cancelled");
  }

  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      if (signal?.aborted) {
        bitmap.close();
        throw new AppError("cancelled");
      }
      assertImageDimensions(bitmap.width, bitmap.height);
      return {
        width: bitmap.width,
        height: bitmap.height,
        draw: (ctx, dx = 0, dy = 0) => {
          ctx.drawImage(bitmap, dx, dy);
        },
        drawRect: (ctx, sx, sy, sw, sh, dx, dy, dw, dh) => {
          ctx.drawImage(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
        },
        close: () => bitmap.close(),
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logError("createImageBitmap failed, falling back to Image", error);
    }
  }

  return decodeWithElement(file);
}

export async function inspectImageFile(file: File): Promise<{ width: number; height: number }> {
  const decoded = await decodeImage(file);
  const { width, height } = decoded;
  decoded.close();
  return { width, height };
}
