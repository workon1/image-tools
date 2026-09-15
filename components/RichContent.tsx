import type { ContentSection, ContentTable } from "@/content/types";

type RichContentProps = {
  sections: ContentSection[];
  className?: string;
};

function ContentTableBlock({ table }: { table: ContentTable }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        {table.caption ? (
          <caption className="mb-2 text-left text-sm text-muted">{table.caption}</caption>
        ) : null}
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-line pb-2 pr-4 font-semibold text-ink"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-line/60 py-2 pr-4 text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Long-form educational copy for tool and guide pages. Kept as plain sections
 * so AdSense reviewers and search engines see real paragraphs, not only a UI.
 */
export function RichContent({ sections, className = "" }: RichContentProps) {
  if (sections.length === 0) return null;

  return (
    <div className={`prose-page mt-16 max-w-none space-y-10 ${className}`}>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.heading}-p-${index}`}>{paragraph}</p>
          ))}
          {section.steps?.length ? (
            <ol className="mt-3 list-decimal space-y-1 pl-5 leading-relaxed text-muted">
              {section.steps.map((step, index) => (
                <li key={`${section.heading}-s-${index}`}>{step}</li>
              ))}
            </ol>
          ) : null}
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((item, index) => (
                <li key={`${section.heading}-b-${index}`}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.table ? <ContentTableBlock table={section.table} /> : null}
        </section>
      ))}
    </div>
  );
}
