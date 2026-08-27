import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: "Terms for using this browser-based image conversion tool.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main" className="prose-page mx-auto w-full flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Terms of Use</h1>
      <p className="mt-4 text-sm text-muted">Last updated: 27 August 2026</p>

      <h2>The service</h2>
      <p>
        This website provides a free, browser-based image conversion tool. Conversion is performed
        on your device. The tool is offered as-is, without a guaranteed uptime or specific output
        quality for every image and browser.
      </p>

      <h2>Your files</h2>
      <p>
        You are responsible for the images you convert and for having the right to use them. Do not
        use the tool with content you are not allowed to process. Files are not uploaded to our
        servers for conversion.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Use the site in a way that does not attempt to disrupt it, probe it for vulnerabilities, or
        bypass client-side limits in order to harm a device. Automated scraping of the marketing
        pages is unnecessary; the converter itself runs locally.
      </p>

      <h2>Advertising</h2>
      <p>
        The site may show advertisements in the future. Ads will not be disguised as download
        buttons. Advertising is currently disabled.
      </p>

      <h2>No warranty</h2>
      <p>
        Image conversion depends on your browser. Some formats or very large images may fail. We are
        not liable for lost files, unexpected output, or device performance issues. Keep copies of
        originals.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated as the product grows. The date at the top of this page will
        change when that happens.
      </p>
    </main>
  );
}
