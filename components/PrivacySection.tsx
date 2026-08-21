import { routes } from "@/config/site";
import Link from "next/link";

export function PrivacySection() {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-surface sm:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">Privacy</h2>
      <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-white/75">
        <p>
          Your images are processed locally in your browser. This site does not upload the image to
          a backend, does not keep a copy after conversion, and does not send image contents to
          analytics.
        </p>
        <p>
          Conversion uses built-in browser APIs (typically Canvas and createImageBitmap). If a
          browser cannot encode a format such as WebP, you will see a clear message instead of a
          silent upload.
        </p>
        <p>
          Read the full{" "}
          <Link href={routes.privacy} className="text-white underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
