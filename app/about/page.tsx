import Link from "next/link";
import { routes, siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Image Reshaper",
  description:
    "Image Reshaper is a free, privacy-first image utility that converts, compresses, resizes, and crops JPG, PNG, and WebP in your browser.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main" className="prose-page mx-auto w-full flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">About Image Reshaper</h1>
      <p className="mt-4 text-base leading-7 text-muted">
        {siteConfig.name} is a free set of image utilities for converting, compressing, resizing,
        cropping, rotating, and exporting JPG, PNG, and WebP. The product exists so you can finish a
        task from a search result without creating an account or sending the photo to a server for
        conversion.
      </p>

      <h2>Why we built it</h2>
      <p>
        People constantly hit the same friction: a form that only accepts JPG, a CMS that wants
        WebP, an email that rejects a 4 MB PNG screenshot, or a social network that crops a photo
        badly. Cloud converters solve the format problem but introduce a second problem—your file
        leaves the device. We wanted a site that is honest about formats, clear about limits, and
        strict about keeping image bytes local while you work.
      </p>
      <p>
        Image Reshaper is intentionally small. We would rather ship fewer formats that actually work
        than advertise HEIC, AVIF, GIF, or PDF before those pipelines are reliable here. When a
        format is listed as supported, the tool has been tested against the documented constraints.
      </p>

      <h2>How processing works</h2>
      <p>
        Each tool runs in your browser with the Canvas API and related web platform features. Files
        are validated for type, size, and dimensions, then decoded, drawn, transformed, and
        downloaded as a local blob. Closing the tab discards the working copy. There is no Image
        Reshaper account required to convert, compress, crop, or resize.
      </p>
      <p>
        Optional analytics may record which tools people open so we can prioritize improvements.
        Those events are designed not to include filenames, image bytes, or EXIF. Advertising, when
        enabled after approval and consent requirements are met, is separate from image processing.
        Details live on the privacy policy.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not upload images for conversion.</li>
        <li>We do not train models on your files.</li>
        <li>We do not require an account to use the tools.</li>
        <li>We do not advertise HEIC, AVIF, GIF, or PDF until those formats actually work here.</li>
        <li>We do not claim lossless results when a format is lossy (JPG and typical WebP exports).</li>
      </ul>

      <h2>Limits</h2>
      <p>
        Up to 20 MB per file, 10 files at a time, 8192 pixels on a side, and 25 megapixels. Those
        caps exist so phones and laptops do not run out of memory while decoding large camera
        originals. If you need to work with a bigger file, resize or crop a copy in another app
        first, or split a batch into smaller groups.
      </p>

      <h2>Editorial guides</h2>
      <p>
        Besides the interactive tools, we publish short guides on tasks such as compressing to 100
        KB, converting JPG to PNG responsibly, resizing for social layouts, and understanding
        browser-side privacy. Those articles are meant to be useful even if you ultimately use
        another program—the goal is clearer decisions, not lock-in.
      </p>
      <p>
        Browse the <Link href="/guides">guides</Link> or jump straight to{" "}
        <Link href="/tools">available tools</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about the project: the <Link href={routes.contact}>contact page</Link>. How files
        and cookies are handled: the <Link href={routes.privacy}>privacy policy</Link>. Terms of
        use: <Link href={routes.terms}>Terms</Link>.
      </p>
    </main>
  );
}
