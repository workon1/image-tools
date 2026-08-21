import { FAQ } from "@/components/FAQ";
import { HowItWorks } from "@/components/HowItWorks";
import { PrivacySection } from "@/components/PrivacySection";
import { SupportedFormats } from "@/components/SupportedFormats";
import { ToolCard } from "@/components/ToolCard";
import { TrustBadges } from "@/components/TrustBadges";
import { ImageConverterTool } from "@/tools/imageConverter/ImageConverterTool";
import { converterFaq } from "@/tools/imageConverter/faq";
import { tools } from "@/tools/registry";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <main id="main" className="mx-auto w-full min-w-0 max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-16">
      <section className="text-center">
        <p className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
          Fast, private, and free
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-balance text-ink sm:text-6xl">
          Convert Images Online
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Convert JPG, PNG and WebP images quickly and privately. Your images are processed in your
          browser.
        </p>
        <div className="flex justify-center">
          <TrustBadges />
        </div>
        <div className="mt-10 text-left">
          <ImageConverterTool />
        </div>
      </section>

      <div className="mt-24 space-y-24">
        <SupportedFormats />
        <HowItWorks />
        <PrivacySection />

        <section>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">All tools</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Convert, resize, crop, compress, and export — each tool runs in your browser.
          </p>
          <div className="mt-8 grid min-w-0 gap-4 sm:grid-cols-2">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        <section>
          <h2 id="faq" className="text-3xl font-semibold tracking-tight text-ink">
            FAQ
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-base leading-7 text-muted">
            Common questions about converting images in the browser.
          </p>
          <FAQ items={converterFaq} />
        </section>
      </div>
    </main>
  );
}
