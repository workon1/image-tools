import Link from "next/link";
import { getChildTools, type ToolDefinition } from "@/tools/registry";

type ToolCardProps = {
  tool: ToolDefinition;
  nameTag?: "h3" | "h4";
};

export function ToolCard({ tool, nameTag = "h3" }: ToolCardProps) {
  const isAvailable = tool.status === "available";
  const children = getChildTools(tool.id);
  const Name = nameTag;

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <Name className="font-semibold tracking-tight text-ink">{tool.name}</Name>
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
      <Link
        href={tool.href}
        className={`block p-5 sm:p-6 focus-visible:outline-offset-[-4px] ${children.length ? "pb-3 sm:pb-4" : ""}`}
      >
        {content}
      </Link>
      {children.length > 0 ? (
        <ul className="flex flex-wrap gap-x-3 gap-y-1 border-t border-line/70 px-5 py-3 sm:px-6">
          {children.map((child) => (
            <li key={child.id}>
              <Link
                href={child.href}
                className="text-xs font-medium text-ink/70 transition-colors hover:text-accent"
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
