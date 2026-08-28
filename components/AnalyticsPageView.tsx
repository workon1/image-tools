"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/components/ConsentProvider";
import { track } from "@/lib/analytics";

export function AnalyticsPageView() {
  const pathname = usePathname();
  const { ready, preferences } = useConsent();

  useEffect(() => {
    if (!ready || preferences?.analytics !== true) return;
    const route = pathname.slice(0, 64);
    track("page_view", { route });
  }, [pathname, ready, preferences?.analytics]);

  return null;
}
