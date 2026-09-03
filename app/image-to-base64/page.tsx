import { ToolPage } from "@/components/ToolPage";
import { base64Content } from "@/content/hubs";
import { createPageMetadata } from "@/lib/seo";
import { ImageToBase64Tool } from "@/tools/imageToBase64/ImageToBase64Tool";

export const metadata = createPageMetadata({
  title: "Image to Base64",
  description: "Convert an image to a Base64 data URL in your browser. Nothing is uploaded.",
  path: "/image-to-base64",
});

export default function ImageToBase64Page() {
  return (
    <ToolPage
      title="Image to Base64"
      description="Get a data URL you can paste into HTML, CSS, or JSON. The file is encoded on your device."
      path="/image-to-base64"
      toolId="image-to-base64"
      content={base64Content}
      faq={[
        {
          question: "Should I use Base64 in production pages?",
          answer:
            "Small icons can be inlined. Large photos bloat HTML. This tool is for encoding, not a recommendation to inline everything.",
        },
      ]}
    >
      <ImageToBase64Tool />
    </ToolPage>
  );
}
