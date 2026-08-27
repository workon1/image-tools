import { BrandMark } from "@/components/BrandMark";
import { siteConfig } from "@/config/site";

const sizes = {
  sm: {
    mark: "h-8 w-8",
    name: "text-base font-bold tracking-tight",
    tagline: "text-[11px]",
  },
  md: {
    mark: "h-10 w-10 sm:h-11 sm:w-11",
    name: "text-lg font-bold tracking-tight sm:text-xl",
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
      <span className={`leading-tight ${align === "center" ? "text-left" : ""}`}>
        <span className={`block whitespace-nowrap text-ink ${scale.name}`}>{siteConfig.name}</span>
        {showTagline ? (
          <span className={`hidden text-muted lg:block ${scale.tagline}`}>
            Private image conversion
          </span>
        ) : null}
      </span>
    </span>
  );
}
