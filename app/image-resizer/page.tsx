import { ToolPage } from "@/components/ToolPage";
import { resizerContent } from "@/content/hubs";
import { createPageMetadata } from "@/lib/seo";
import { ImageResizerTool } from "@/tools/imageResizer/ImageResizerTool";

export const metadata = createPageMetadata({
  title: "Image Resizer",
  description: "Resize JPG, PNG, and WebP images to exact pixel dimensions in your browser.",
  path: "/image-resizer",
});

export default function ImageResizerPage() {
  return (
    <ToolPage
      title="Image Resizer"
      description="Change an image’s width and height without uploading it. Lock the aspect ratio to avoid stretching. Use a percent or a common preset when you do not need exact pixels."
      path="/image-resizer"
      toolId="image-resizer"
      content={resizerContent}
      faq={[
        {
          question: "Does resizing upload my photo?",
          answer: "No. The new size is calculated in your browser and never sent to a server.",
        },
        {
          question: "Can I enlarge a small image?",
          answer:
            "Yes, but enlarging can’t add real detail. The result may look softer than the original.",
        },
        {
          question: "What do the presets do?",
          answer:
            "50% and 25% scale from the original size. 1080×1080, 1920×1080, and 1080×1920 set exact pixels for common social and HD frames.",
        },
      ]}
    >
      <ImageResizerTool />
    </ToolPage>
  );
}
