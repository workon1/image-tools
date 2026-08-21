"use client";

import { useEffect, useMemo } from "react";

export function useObjectUrl(source: Blob | File | null): string | null {
  const url = useMemo(() => {
    if (!source) return null;
    return URL.createObjectURL(source);
  }, [source]);

  useEffect(() => {
    if (!url) return undefined;
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return url;
}
