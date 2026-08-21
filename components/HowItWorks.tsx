const steps = [
  {
    n: "1",
    title: "Upload your image",
    body: "Drop a JPG, PNG, or WebP file, or browse from your device. Nothing leaves the browser.",
  },
  {
    n: "2",
    title: "Select the output format",
    body: "Choose JPG, PNG, or WebP. Set quality for lossy formats if you want a smaller file.",
  },
  {
    n: "3",
    title: "Download your converted image",
    body: "Preview the result, compare file size, and save the new image to your device.",
  },
];

export function HowItWorks() {
  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-tight text-ink">How it works</h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        Three short steps. Most people finish in under a minute.
      </p>
      <ol className="mt-10 grid gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <li key={step.n} className="rounded-3xl bg-surface p-6 shadow-[var(--shadow-soft)]">
            <p className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-semibold text-white">
              {step.n}
            </p>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
