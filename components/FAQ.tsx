type FaqItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FaqItem[];
  headingId?: string;
};

export function FAQ({ items, headingId = "faq-heading" }: FAQProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl bg-surface px-5 shadow-[var(--shadow-soft)]"
        >
          <summary className="cursor-pointer list-none py-4 font-medium tracking-tight text-ink marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper text-sm text-muted"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </span>
          </summary>
          <p className="max-w-3xl pb-5 text-sm leading-7 text-muted">{item.answer}</p>
        </details>
      ))}
      <p className="sr-only" id={headingId}>
        Frequently asked questions
      </p>
    </div>
  );
}
