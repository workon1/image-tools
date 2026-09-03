import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { getGuide, guideContent, guides } from "@/content/guides";
import { createPageMetadata } from "@/lib/seo";

const toolLinksBySlug: Record<string, { href: string; label: string }[]> = {
  "compress-image-to-100kb": [
    { href: "/compress-to-100kb", label: "Compress to 100 KB" },
    { href: "/image-compressor", label: "Image Compressor" },
    { href: "/image-resizer", label: "Image Resizer" },
  ],
  "convert-jpg-to-png": [
    { href: "/jpg-to-png", label: "JPG to PNG converter" },
    { href: "/image-converter", label: "Image Converter" },
  ],
  "resize-images-for-social-media": [
    { href: "/image-cropper", label: "Image Cropper" },
    { href: "/image-resizer", label: "Image Resizer" },
  ],
  "browser-image-privacy": [
    { href: "/remove-image-metadata", label: "Remove Image Metadata" },
    { href: "/image-converter", label: "Image Converter" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const sections = guideContent[slug];
  if (!guide || !sections) notFound();

  return (
    <GuideArticle guide={guide} sections={sections} toolLinks={toolLinksBySlug[slug]} />
  );
}
