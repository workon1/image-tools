"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

export function AnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    const route = pathname.slice(0, 64);
    track("page_view", { route });
  }, [pathname]);

  return null;
}
