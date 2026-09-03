import { ToolPage } from "@/components/ToolPage";
import { compressPageContent } from "@/content/tools";
import { TARGET_200KB_BYTES } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import { TargetCompressorTool } from "@/tools/targetCompressor/TargetCompressorTool";

export const metadata = createPageMetadata({
  title: "Compress Image to 200 KB",
  description: "Compress a JPG or WebP image down to 200 KB or less, entirely in your browser.",
  path: "/compress-to-200kb",
});

export default function CompressTo200KbPage() {
  return (
    <ToolPage
      title="Compress to 200 KB"
      description="Aim for a 200 KB file when a form or mailbox rejects larger uploads. Processing stays on your device."
      path="/compress-to-200kb"
      toolId="compress-to-200kb"
      content={compressPageContent["compress-to-200kb"]}
      faq={[
        {
          question: "JPG or WebP?",
          answer:
            "Try WebP if the smaller file matters. Use JPG when the destination only accepts JPEG.",
        },
      ]}
    >
      <TargetCompressorTool maxBytes={TARGET_200KB_BYTES} toolId="compress-to-200kb" />
    </ToolPage>
  );
}
