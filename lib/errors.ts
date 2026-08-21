export type AppErrorCode =
  | "unsupported_type"
  | "file_too_large"
  | "empty_file"
  | "corrupt_image"
  | "dimensions_too_large"
  | "too_many_files"
  | "conversion_failed"
  | "format_unsupported_by_browser"
  | "cancelled";

const USER_MESSAGES: Record<AppErrorCode, string> = {
  unsupported_type: "That file type isn’t supported. Please choose a JPG, PNG, or WebP image.",
  file_too_large: "That image is larger than 20 MB. Please choose a smaller file.",
  empty_file: "That file appears to be empty. Please choose another image.",
  corrupt_image: "We couldn’t read this image. It may be damaged — try another file.",
  dimensions_too_large:
    "This image is too large for your browser to convert safely. Try a smaller image.",
  too_many_files: "You can add up to 10 images at a time. Extra files were skipped.",
  conversion_failed: "We couldn’t convert this image. Please try another image or format.",
  format_unsupported_by_browser:
    "This browser can’t encode the format you selected. Try JPG or PNG, or use an updated browser.",
  cancelled: "The conversion was cancelled.",
};

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly userMessage: string;

  constructor(code: AppErrorCode, userMessage = USER_MESSAGES[code]) {
    super(userMessage);
    this.name = "AppError";
    this.code = code;
    this.userMessage = userMessage;
  }
}

export function getUserErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.userMessage;
  return USER_MESSAGES.conversion_failed;
}

export function getErrorCode(error: unknown): AppErrorCode {
  if (error instanceof AppError) return error.code;
  return "conversion_failed";
}

export { USER_MESSAGES };
