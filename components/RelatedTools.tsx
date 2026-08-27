import Link from "next/link";
import { getRelatedTools } from "@/tools/related";

type RelatedToolsProps = {
  toolId: string;
};

export function RelatedTools({ toolId }: RelatedToolsProps) {
  const tools = getRelatedTools(toolId);
  if (tools.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className="text-3xl font-semibold tracking-tight text-ink">
        Related tools
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        Stay in the browser for the next step — convert, compress, crop, or strip metadata.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.id}>
            <Link
              href={tool.href}
              className="block rounded-2xl border border-line bg-surface px-4 py-3 text-ink shadow-[var(--shadow-soft)] transition-colors hover:border-accent/40"
            >
              <span className="font-medium">{tool.name}</span>
              <span className="mt-1 block text-sm leading-6 text-muted">{tool.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
