import { ToolPage } from "@/components/ToolPage";
import { TARGET_100KB_BYTES } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import { TargetCompressorTool } from "@/tools/targetCompressor/TargetCompressorTool";

export const metadata = createPageMetadata({
  title: "Compress Image to 100 KB",
  description: "Compress a JPG or WebP image down to 100 KB or less, entirely in your browser.",
  path: "/compress-to-100kb",
});

export default function CompressTo100KbPage() {
  return (
    <ToolPage
      title="Compress to 100 KB"
      description="Aim for a 100 KB file for forms, email, and uploads with size limits. Quality is reduced first; the image is scaled down only if needed."
      path="/compress-to-100kb"
      toolId="compress-to-100kb"
      faq={[
        {
          question: "Will every image fit under 100 KB?",
          answer:
            "Very large or detailed photos may need more shrinking. If we still can’t get there, you’ll see a clear message.",
        },
      ]}
    >
      <TargetCompressorTool maxBytes={TARGET_100KB_BYTES} toolId="compress-to-100kb" />
    </ToolPage>
  );
}
