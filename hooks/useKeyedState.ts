"use client";

import { useCallback, useState } from "react";

export function useKeyedState<T>(key: string, fallback: T): [T, (value: T) => void] {
  const [store, setStore] = useState<{ key: string; value: T } | null>(null);
  const value = store?.key === key ? store.value : fallback;
  const setValue = useCallback(
    (next: T) => {
      setStore({ key, value: next });
    },
    [key],
  );
  return [value, setValue];
}
