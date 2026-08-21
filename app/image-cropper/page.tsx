import { ToolPage } from "@/components/ToolPage";
import { createPageMetadata } from "@/lib/seo";
import { ImageCropperTool } from "@/tools/imageCropper/ImageCropperTool";

export const metadata = createPageMetadata({
  title: "Image Cropper",
  description: "Crop JPG, PNG, and WebP images in your browser with freeform or preset ratios.",
  path: "/image-cropper",
});

export default function ImageCropperPage() {
  return (
    <ToolPage
      title="Image Cropper"
      description="Drag the box to keep only the part you want. Choose 1:1, 4:3, or 16:9 when you need a consistent frame."
      faq={[
        {
          question: "Is cropping lossless?",
          answer:
            "The pixels outside the box are discarded. Saving as JPG or WebP may also apply compression.",
        },
      ]}
    >
      <ImageCropperTool />
    </ToolPage>
  );
}
