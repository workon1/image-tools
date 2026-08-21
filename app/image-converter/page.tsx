import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { TrustBadges } from "@/components/TrustBadges";
import { createPageMetadata } from "@/lib/seo";
import { ImageConverterTool } from "@/tools/imageConverter/ImageConverterTool";
import { converterFaq } from "@/tools/imageConverter/faq";

export const metadata = createPageMetadata({
  title: "Image Converter – JPG, PNG & WebP",
  description:
    "Convert JPG, PNG, and WebP images in your browser. Private, fast, and free — files are not uploaded.",
  path: "/image-converter",
});

export default function ImageConverterPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-16">
      <p>
        <Link href="/tools" className="text-sm font-medium text-accent hover:underline">
          ← All tools
        </Link>
      </p>
      <p className="mt-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
        Image tool
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Image Converter
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Convert JPG, PNG and WebP images quickly and privately. Your images are processed in your
        browser.
      </p>
      <TrustBadges />
      <div className="mt-8">
        <ImageConverterTool heading="Convert an image" />
      </div>
      <section className="mt-16">
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-ink">FAQ</h2>
        <FAQ items={converterFaq} />
      </section>
    </main>
  );
}
