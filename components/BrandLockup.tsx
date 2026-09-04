import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/config/site";

const sizes = {
  sm: {
    mark: "h-8 w-8",
    name: "text-base font-bold tracking-tight",
    tagline: "text-[11px]",
  },
  md: {
    mark: "h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11",
    name: "text-base font-bold tracking-tight sm:text-lg lg:text-xl",
    tagline: "text-xs",
  },
  lg: {
    mark: "h-12 w-12 sm:h-14 sm:w-14",
    name: "text-2xl font-bold tracking-tight sm:text-3xl",
    tagline: "text-sm",
  },
} as const;

type BrandLockupProps = {
  size?: keyof typeof sizes;
  showTagline?: boolean;
  align?: "left" | "center";
};

export function BrandLockup({
  size = "md",
  showTagline = false,
  align = "left",
}: BrandLockupProps) {
  const scale = sizes[size];

  return (
    <span
      className={`flex min-w-0 items-center gap-2.5 text-accent sm:gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <BrandMark className={`${scale.mark} shrink-0`} />
      <span className={`min-w-0 leading-tight ${align === "center" ? "text-left" : ""}`}>
        <span className={`block truncate text-ink ${scale.name}`}>{siteConfig.name}</span>
        {showTagline ? (
          <span className={`hidden truncate text-muted lg:block ${scale.tagline}`}>
            Private image conversion
          </span>
        ) : null}
      </span>
    </span>
  );
}
