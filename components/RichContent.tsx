import type { ContentSection } from "@/content/types";

type RichContentProps = {
  sections: ContentSection[];
  className?: string;
};

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
            <p key={`${section.heading}-${index}`}>{paragraph}</p>
          ))}
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((item, index) => (
                <li key={`${section.heading}-b-${index}`}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
