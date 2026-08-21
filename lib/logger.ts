export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function logError(context: string, error: unknown): void {
  if (!isDev()) return;
  console.error(`[image-tools] ${context}`, error);
}

export function logWarning(context: string, detail?: unknown): void {
  if (!isDev()) return;
  console.warn(`[image-tools] ${context}`, detail);
}
