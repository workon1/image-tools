import { ToolCard } from "@/components/ToolCard";
import { getHubTools, toolGroups } from "@/tools/registry";

type ToolsByCategoryProps = {
  titleTag?: "h2" | "h3";
};

export function ToolsByCategory({ titleTag = "h2" }: ToolsByCategoryProps) {
  const Title = titleTag;
  const hubs = getHubTools();

  return (
    <div className="space-y-12">
      {toolGroups.map((group) => {
        const items = hubs.filter((tool) => tool.group === group.id);
        if (items.length === 0) return null;

        return (
          <section key={group.id} aria-labelledby={`tool-group-${group.id}`}>
            <Title
              id={`tool-group-${group.id}`}
              className="text-xl font-semibold tracking-tight text-ink sm:text-2xl"
            >
              {group.label}
            </Title>
            <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
              {items.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  nameTag={titleTag === "h2" ? "h3" : "h4"}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
