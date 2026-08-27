import { ToolPage } from "@/components/ToolPage";
import { createPageMetadata } from "@/lib/seo";
import { ImageCompressorTool } from "@/tools/imageCompressor/ImageCompressorTool";

export const metadata = createPageMetadata({
  title: "Compress WebP Images Online",
  description:
    "Compress WebP images in your browser to a target percent of the original file size. Files are not uploaded.",
  path: "/compress-webp",
});

export default function CompressWebpPage() {
  return (
    <ToolPage
      title="Compress WebP Images Online"
      description="Shrink a WebP to a target percent of its original bytes, or switch to JPG if the destination cannot open WebP. The slider is file size, not a quality label."
      path="/compress-webp"
      toolId="compress-webp"
      faq={[
        {
          question: "Can I keep WebP output?",
          answer:
            "Yes. This page starts with WebP. Switch to JPG only if you need a file older software can open.",
        },
        {
          question: "Does 50% mean quality 50?",
          answer:
            "No. 50% means we aim for half the original file size, without going over. Encoding is searched automatically.",
        },
        {
          question: "Are images uploaded?",
          answer: "No. The new file is created in this browser and downloaded from a local blob.",
        },
      ]}
    >
      <ImageCompressorTool toolId="compress-webp" lockedInput="webp" />
    </ToolPage>
  );
}
