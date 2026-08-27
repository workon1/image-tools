import { ToolPage } from "@/components/ToolPage";
import { createPageMetadata } from "@/lib/seo";
import { ImageRotateTool } from "@/tools/imageRotate/ImageRotateTool";

export const metadata = createPageMetadata({
  title: "Rotate and Flip Image Online",
  description:
    "Rotate JPG, PNG, and WebP images 90°, 180°, or 270° and flip them horizontally or vertically in your browser. Files are not uploaded.",
  path: "/image-rotate",
});

export default function ImageRotatePage() {
  return (
    <ToolPage
      title="Rotate and Flip Image Online"
      description="Turn a photo clockwise, upside down, or mirrored without uploading it. Output stays JPG, PNG, or WebP. Limits: 20 MB, 10 files, 8192 px, 25 megapixels."
      path="/image-rotate"
      toolId="image-rotate"
      faq={[
        {
          question: "Does rotate upload my image?",
          answer: "No. Rotation is drawn on a canvas in this browser and downloaded as a new file.",
        },
        {
          question: "Will EXIF orientation still apply?",
          answer:
            "The decoder already applies EXIF orientation when the browser supports it. The downloaded file is a fresh encode without that metadata.",
        },
        {
          question: "Can I flip and rotate together?",
          answer: "Yes. Set both, preview, then apply. Reset clears the pending transform.",
        },
      ]}
    >
      <ImageRotateTool />
    </ToolPage>
  );
}
