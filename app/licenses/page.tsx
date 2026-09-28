import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Third-Party Licenses",
  description:
    "Open-source licenses for libraries Image Reshaper loads in your browser, including the LGPL-3.0 HEIC decoder.",
  path: "/licenses",
});

export default function LicensesPage() {
  return (
    <main id="main" className="prose-page mx-auto w-full flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Third-party licenses</h1>
      <p className="mt-4 text-sm text-muted">Last updated: 28 September 2026</p>
      <p>
        Image Reshaper ships a small set of open-source libraries to your browser. Image files you
        select are still processed on your device; these notices exist so license terms for those
        libraries are easy to find.
      </p>

      <h2>heic-to (LGPL-3.0)</h2>
      <p>
        The HEIC to JPG tool dynamically loads{" "}
        <a href="https://www.npmjs.com/package/heic-to" rel="noopener noreferrer" target="_blank">
          heic-to
        </a>{" "}
        version 1.5.2 to decode HEIC/HEIF photos in the browser. That package is licensed under the{" "}
        <a
          href="https://www.gnu.org/licenses/lgpl-3.0.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          GNU Lesser General Public License v3.0
        </a>
        .
      </p>
      <ul>
        <li>
          Source code:{" "}
          <a
            href="https://github.com/hoppergee/heic-to"
            rel="noopener noreferrer"
            target="_blank"
          >
            github.com/hoppergee/heic-to
          </a>
        </li>
        <li>
          Local license copy:{" "}
          <a href="/third-party/heic-to-LICENSE.txt">/third-party/heic-to-LICENSE.txt</a>
        </li>
        <li>
          You may obtain the corresponding source for the version we ship from the GitHub repository
          and the npm package above. The library runs only in your browser for files you choose; we
          do not modify its source in this project beyond dynamic import.
        </li>
      </ul>

      <h2>Other dependencies</h2>
      <p>
        Next.js, React, and related MIT/Apache-licensed packages power the site framework. Their
        license texts appear in the project&apos;s <code>node_modules</code> manifests and upstream
        repositories.
      </p>

      <p>
        <Link href="/privacy">Privacy Policy</Link>
        {" · "}
        <Link href="/heic-to-jpg">HEIC to JPG converter</Link>
      </p>
    </main>
  );
}
