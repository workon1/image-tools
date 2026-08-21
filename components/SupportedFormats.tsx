const formats = [
  {
    name: "JPG",
    detail: "Photographs and camera images. Lossy compression with a quality control.",
  },
  {
    name: "PNG",
    detail: "Graphics and images that need a transparent background. Lossless.",
  },
  {
    name: "WebP",
    detail: "A modern format that is often smaller than JPG at a similar visual quality.",
  },
];

export function SupportedFormats() {
  return (
    <section id="supported-formats" className="scroll-mt-24">
      <h2 className="text-3xl font-semibold tracking-tight text-ink">Supported formats</h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        Convert between these three formats in either direction. SVG is excluded so uploaded files
        cannot run as code.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {formats.map((format) => (
          <li key={format.name} className="rounded-3xl bg-surface p-6 shadow-[var(--shadow-soft)]">
            <h3 className="text-lg font-semibold tracking-tight text-ink">{format.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{format.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
