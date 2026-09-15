import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { getGuide, guideContent, guides } from "@/content/guides";
import { createPageMetadata } from "@/lib/seo";

const toolLinksBySlug: Record<string, { href: string; label: string }[]> = {
  "compress-image-to-100kb": [
    { href: "/compress-to-100kb", label: "Compress to 100 KB" },
    { href: "/compress-to-200kb", label: "Compress to 200 KB" },
    { href: "/image-compressor", label: "Image Compressor" },
    { href: "/image-resizer", label: "Image Resizer" },
  ],
  "jpg-vs-png-vs-webp": [
    { href: "/image-converter", label: "Image Converter" },
    { href: "/jpg-to-webp", label: "JPG to WebP" },
    { href: "/png-to-webp", label: "PNG to WebP" },
    { href: "/png-to-jpg", label: "PNG to JPG" },
  ],
  "convert-jpg-to-png": [
    { href: "/jpg-to-png", label: "JPG to PNG converter" },
    { href: "/image-converter", label: "Image Converter" },
    { href: "/remove-image-metadata", label: "Remove Image Metadata" },
  ],
  "resize-images-for-social-media": [
    { href: "/image-cropper", label: "Image Cropper" },
    { href: "/image-resizer", label: "Image Resizer" },
    { href: "/image-compressor", label: "Image Compressor" },
  ],
  "reduce-photo-size-for-email": [
    { href: "/image-resizer", label: "Image Resizer" },
    { href: "/compress-to-200kb", label: "Compress to 200 KB" },
    { href: "/remove-image-metadata", label: "Remove Image Metadata" },
  ],
  "remove-exif-gps-from-photos": [
    { href: "/remove-image-metadata", label: "Remove Image Metadata" },
    { href: "/image-cropper", label: "Image Cropper" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
  "browser-image-privacy": [
    { href: "/remove-image-metadata", label: "Remove Image Metadata" },
    { href: "/image-converter", label: "Image Converter" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
  "image-size-for-website-speed": [
    { href: "/image-resizer", label: "Image Resizer" },
    { href: "/jpg-to-webp", label: "JPG to WebP" },
    { href: "/png-to-webp", label: "PNG to WebP" },
    { href: "/image-compressor", label: "Image Compressor" },
  ],
  "passport-photo-size-requirements": [
    { href: "/image-cropper", label: "Image Cropper" },
    { href: "/image-resizer", label: "Image Resizer" },
    { href: "/compress-to-100kb", label: "Compress to 100 KB" },
  ],
  "how-to-make-a-favicon": [
    { href: "/favicon-generator", label: "Favicon Generator" },
    { href: "/image-cropper", label: "Image Cropper" },
    { href: "/image-resizer", label: "Image Resizer" },
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

  const moreGuides = guides.filter((item) => item.slug !== slug).slice(0, 4);

  return (
    <GuideArticle
      guide={guide}
      sections={sections}
      toolLinks={toolLinksBySlug[slug]}
      moreGuides={moreGuides}
    />
  );
}
