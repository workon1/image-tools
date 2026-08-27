import { ToolsByCategory } from "@/components/ToolsByCategory";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Available Image Tools",
  description:
    "Convert, resize, crop, compress, and export images in your browser. No uploads, no account.",
  path: "/tools",
});

export default function ToolsIndexPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Available tools
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Every tool runs locally. Pick a conversion, a size target, or an editor — your files stay on
        this device.
      </p>
      <div className="mt-12">
        <ToolsByCategory />
      </div>
    </main>
  );
}
