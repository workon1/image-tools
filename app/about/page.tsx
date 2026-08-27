import Link from "next/link";
import { routes, siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Image Tools",
  description:
    "Image Tools is a free, privacy-first image utility that converts, compresses, resizes, and crops JPG, PNG, and WebP in your browser.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main" className="prose-page mx-auto w-full flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">About Image Tools</h1>
      <p className="mt-4 text-base leading-7 text-muted">
        {siteConfig.name} is a small set of image utilities for converting, compressing, resizing,
        cropping, rotating, and exporting JPG, PNG, and WebP. The product exists so you can finish a
        task from a search result without creating an account or sending the photo to a server.
      </p>
      <h2>How processing works</h2>
      <p>
        Each tool runs in your browser with the Canvas API. Files are validated (type, size, and
        dimensions), decoded, drawn, and downloaded as a local blob. Closing the tab discards them.
      </p>
      <h2>What we do not do</h2>
      <ul>
        <li>We do not upload images for conversion.</li>
        <li>We do not train models on your files.</li>
        <li>We do not require an account.</li>
        <li>We do not advertise HEIC, AVIF, GIF, or PDF until those formats actually work here.</li>
      </ul>
      <h2>Limits</h2>
      <p>
        Up to 20 MB per file, 10 files at a time, 8192 pixels on a side, and 25 megapixels. Those
        caps exist so phones and laptops do not run out of memory.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about the project: the <Link href={routes.contact}>contact page</Link>. How files
        are handled: the <Link href={routes.privacy}>privacy policy</Link>.
      </p>
    </main>
  );
}
