import { features } from "@/config/features";

type AdSlotName = "header" | "sidebar" | "inline" | "footer";

type AdSlotProps = {
  slot: AdSlotName;
  className?: string;
};

/**
 * Reserved advertisement region. Renders nothing while ads are disabled so
 * layout and performance are unchanged in the MVP.
 */
export function AdSlot({ slot, className }: AdSlotProps) {
  if (!features.ads.enabled) return null;

  return <aside data-ad-slot={slot} aria-label="Advertisement" className={className} />;
}
