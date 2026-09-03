import { ToolPage } from "@/components/ToolPage";
import { metadataToolContent } from "@/content/hubs";
import { createPageMetadata } from "@/lib/seo";
import { RemoveMetadataTool } from "@/tools/removeMetadata/RemoveMetadataTool";

export const metadata = createPageMetadata({
  title: "Remove Image Metadata Online",
  description:
    "Strip EXIF, GPS, and other metadata from JPG, PNG, and WebP images in your browser. The file is not uploaded.",
  path: "/remove-image-metadata",
});

export default function RemoveImageMetadataPage() {
  return (
    <ToolPage
      title="Remove Image Metadata Online"
      description="Re-encode the image locally so camera, GPS, and other metadata are not copied into the download. Use this before sharing a photo. Limits: 20 MB, 10 files."
      path="/remove-image-metadata"
      toolId="remove-image-metadata"
      content={metadataToolContent}
      faq={[
        {
          question: "How is metadata removed?",
          answer:
            "The pixels are drawn onto a canvas and saved as a new file. Canvas output does not include EXIF or IPTC from the original.",
        },
        {
          question: "Is this lossless?",
          answer:
            "PNG is lossless. JPG and WebP are saved at quality 92, so the file can differ slightly from the original even though metadata is gone.",
        },
        {
          question: "Does the Base64 tool strip metadata?",
          answer:
            "No. Image to Base64 encodes the original bytes. Use this tool first if you need a clean file.",
        },
      ]}
    >
      <RemoveMetadataTool />
    </ToolPage>
  );
}
