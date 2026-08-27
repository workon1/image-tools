import Link from "next/link";
import type { ToolDefinition } from "@/tools/registry";

type ToolCardProps = {
  tool: ToolDefinition;
};

export function ToolCard({ tool }: ToolCardProps) {
  const isAvailable = tool.status === "available";

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold tracking-tight text-ink">{tool.name}</h3>
        {isAvailable ? null : (
          <span className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-medium text-muted">
            Soon
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
      {tool.formats ? (
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink/60">
          {tool.formats.join(" · ")}
        </p>
      ) : null}
    </>
  );

  if (!isAvailable) {
    return <article className="min-w-0 rounded-3xl bg-surface/70 p-5 sm:p-6">{content}</article>;
  }

  return (
    <article className="min-w-0 rounded-3xl bg-surface shadow-[var(--shadow-soft)] sm:transition-transform sm:duration-150 sm:hover:-translate-y-0.5">
      <Link href={tool.href} className="block p-5 sm:p-6 focus-visible:outline-offset-[-4px]">
        {content}
      </Link>
    </article>
  );
}
