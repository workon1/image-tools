import { ToolPage } from "@/components/ToolPage";
import { compressorHubContent } from "@/content/hubs";
import { createPageMetadata } from "@/lib/seo";
import { ImageCompressorTool } from "@/tools/imageCompressor/ImageCompressorTool";

export const metadata = createPageMetadata({
  title: "Image Compressor",
  description:
    "Compress JPG, PNG, and WebP images in your browser to a target percent of the original file size.",
  path: "/image-compressor",
});

export default function ImageCompressorPage() {
  return (
    <ToolPage
      title="Image Compressor"
      description="Set a target file size as a percent of the original. 50% means we aim for half the bytes, without going over. JPG and WebP are used because they can actually shrink."
      path="/image-compressor"
      toolId="image-compressor"
      content={compressorHubContent}
      faq={[
        {
          question: "Does 50% mean JPEG quality 50?",
          answer:
            "No. The slider is the output file size you want, as a percent of the original. We adjust encoding (and scale down only if needed) until the file is at or under that size.",
        },
        {
          question: "Why isn’t the result exactly 50%?",
          answer:
            "JPEG and WebP sizes jump in steps. We pick the largest file that still stays under your cap. If even high quality is already smaller than the target, you’ll get that smaller file — we won’t pad it to look bigger.",
        },
        {
          question: "Can I compress PNG and keep PNG?",
          answer:
            "PNG is lossless, so re-saving PNG rarely shrinks. This compressor writes JPG or WebP, which can actually get smaller.",
        },
      ]}
    >
      <ImageCompressorTool />
    </ToolPage>
  );
}
