import { routes } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How this image converter handles files: processing happens in your browser, and images are not uploaded or stored.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main" className="prose-page mx-auto w-full flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: 21 August 2026</p>

      <h2>Summary</h2>
      <p>
        Your images are processed locally in your browser. This site does not upload image files to
        a server for conversion, does not store uploaded images, and does not send image contents to
        analytics.
      </p>

      <h2>What is processed on your device</h2>
      <p>
        When you select an image, the file stays in memory in your browser. Conversion uses native
        APIs such as Canvas and ImageBitmap. The converted file is created as a local blob that you
        can download. Closing or refreshing the page discards it.
      </p>

      <h2>What we do not collect</h2>
      <ul>
        <li>Image file contents</li>
        <li>Filenames</li>
        <li>EXIF or other image metadata</li>
        <li>Accounts or personal profiles — there is no sign-in</li>
      </ul>

      <h2>Analytics</h2>
      <p>
        Analytics are optional and off by default. If they are enabled later, they may record
        anonymous events such as “conversion started” or “download clicked”. They must not include
        filenames, image bytes, or personal information.
      </p>

      <h2>Hosting and logs</h2>
      <p>
        The website files themselves are served by a host. Standard web logs (for example IP address
        and requested URL) may be collected by that host according to their own policies. Those logs
        do not include your images because images are not uploaded.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through the{" "}
        <Link href={routes.contact}>contact page</Link> if an address has been configured.
      </p>
    </main>
  );
}
