import { ToolPage } from "@/components/ToolPage";
import { converterHubContent } from "@/content/hubs";
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
    <ToolPage
      title="Image Converter"
      description="Convert JPG, PNG and WebP images quickly and privately. Choose any supported pair. Files stay in this browser (20 MB each, 10 at a time)."
      path="/image-converter"
      toolId="image-converter"
      faq={converterFaq}
      content={converterHubContent}
    >
      <ImageConverterTool heading="Convert an image" />
    </ToolPage>
  );
}
