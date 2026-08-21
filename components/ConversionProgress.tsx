type ConversionProgressProps = {
  active: boolean;
};

export function ConversionProgress({ active }: ConversionProgressProps) {
  if (!active) return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className="rounded-2xl bg-accent/10 px-4 py-3 font-medium tracking-tight text-accent"
    >
      Converting...
    </p>
  );
}
