type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "h-10 w-10" }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="currentColor" />
      <rect
        x="7.5"
        y="9"
        width="18"
        height="14"
        rx="2.5"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        opacity="0.72"
      />
      <rect x="14.5" y="16.5" width="18" height="14" rx="2.5" fill="#fff" />
    </svg>
  );
}
