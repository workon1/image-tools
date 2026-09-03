import { ToolPage } from "@/components/ToolPage";
import { compressPageContent } from "@/content/tools";
import { createPageMetadata } from "@/lib/seo";
import { ImageCompressorTool } from "@/tools/imageCompressor/ImageCompressorTool";

export const metadata = createPageMetadata({
  title: "Compress JPG Images Online",
  description:
    "Compress JPG images in your browser to a target percent of the original file size. Files are not uploaded.",
  path: "/compress-jpg",
});

export default function CompressJpgPage() {
  return (
    <ToolPage
      title="Compress JPG Images Online"
      description="Shrink a JPEG to a target percent of its original bytes. The slider is file size, not a quality label. Processing stays on your device."
      path="/compress-jpg"
      toolId="compress-jpg"
      content={compressPageContent["compress-jpg"]}
      faq={[
        {
          question: "Does 50% mean quality 50?",
          answer:
            "No. 50% means we aim for half the original file size, without going over. Encoding quality is searched automatically.",
        },
        {
          question: "Can I keep JPG output?",
          answer:
            "Yes. This page starts with JPEG output. Switch to WebP if you want a smaller file the destination can open.",
        },
        {
          question: "PNG photos?",
          answer:
            "This page expects a JPG. Use the general compressor for PNG or WebP, or convert PNG to JPG first.",
        },
      ]}
    >
      <ImageCompressorTool toolId="compress-jpg" lockedInput="jpeg" />
    </ToolPage>
  );
}
