import Link from "next/link";
import { guides } from "@/content/guides";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Image Guides",
  description:
    "Practical guides for compressing, converting, resizing, and sharing images privately with Image Reshaper.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Guides</h1>
      <p className="mt-4 text-base leading-7 text-muted">
        Short, practical articles that explain common image tasks. Each guide pairs with a free
        browser tool on Image Reshaper—no account and no upload for conversion.
      </p>
      <ul className="mt-10 space-y-6">
        {guides.map((guide) => (
          <li key={guide.slug} className="border-b border-line pb-6">
            <Link
              href={`/guides/${guide.slug}`}
              className="text-xl font-semibold tracking-tight text-ink hover:text-accent"
            >
              {guide.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-muted">{guide.description}</p>
            <p className="mt-2 text-xs text-muted">Updated {guide.updated}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
