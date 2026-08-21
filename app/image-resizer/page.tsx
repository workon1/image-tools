import { ToolPage } from "@/components/ToolPage";
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
      description="Change an image’s width and height without uploading it. Lock the aspect ratio to avoid stretching."
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
      ]}
    >
      <ImageResizerTool />
    </ToolPage>
  );
}
