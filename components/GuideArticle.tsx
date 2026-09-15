import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RichContent } from "@/components/RichContent";
import type { ContentSection, GuideMeta } from "@/content/types";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structuredData";

type GuideArticleProps = {
  guide: GuideMeta;
  sections: ContentSection[];
  toolLinks?: { href: string; label: string }[];
  moreGuides?: GuideMeta[];
};

export function GuideArticle({ guide, sections, toolLinks, moreGuides }: GuideArticleProps) {
  return (
    <main id="main" className="prose-page mx-auto w-full flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: `/guides/${guide.slug}`,
          updated: guide.updated,
        })}
      />
      <p>
        <Link href="/guides" className="text-sm font-medium text-accent hover:underline">
          ← Guides
        </Link>
      </p>
      <p className="mt-4 text-sm text-muted">Updated {guide.updated}</p>
      <h1 className="!mt-2 text-4xl font-semibold tracking-tight text-ink">{guide.title}</h1>
      <p className="mt-4 text-base leading-7 text-muted">{guide.description}</p>
      <RichContent sections={sections} className="!mt-10" />
      {toolLinks?.length ? (
        <section className="mt-12">
          <h2>Tools used in this guide</h2>
          <ul>
            {toolLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {moreGuides?.length ? (
        <section className="mt-12">
          <h2>Continue reading</h2>
          <ul>
            {moreGuides.map((item) => (
              <li key={item.slug}>
                <Link href={`/guides/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
