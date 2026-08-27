import { ToolPage } from "@/components/ToolPage";
import { createPageMetadata } from "@/lib/seo";
import { ImageCompressorTool } from "@/tools/imageCompressor/ImageCompressorTool";

export const metadata = createPageMetadata({
  title: "Compress PNG Images Online",
  description:
    "Compress PNG images in your browser. PNG is lossless, so this tool writes a smaller JPG or WebP. Files are not uploaded.",
  path: "/compress-png",
});

export default function CompressPngPage() {
  return (
    <ToolPage
      title="Compress PNG Images Online"
      description="PNG is lossless, so saving PNG again rarely shrinks. This page accepts a PNG and writes JPG or WebP at a target percent of the original bytes. Processing stays on your device."
      path="/compress-png"
      toolId="compress-png"
      faq={[
        {
          question: "Why not keep PNG?",
          answer:
            "PNG stores every pixel losslessly. Re-encoding PNG usually stays large. JPG and WebP can actually get smaller.",
        },
        {
          question: "What happens to transparency?",
          answer:
            "JPG fills transparent pixels with white. WebP can keep transparency. Choose WebP if you need a smaller file with an alpha channel.",
        },
        {
          question: "Are files uploaded?",
          answer: "No. Compression runs in this browser. Closing the tab discards the files.",
        },
      ]}
    >
      <ImageCompressorTool toolId="compress-png" lockedInput="png" />
    </ToolPage>
  );
}
