import { ToolPage } from "@/components/ToolPage";
import { createPageMetadata } from "@/lib/seo";
import { ImageCropperTool } from "@/tools/imageCropper/ImageCropperTool";

export const metadata = createPageMetadata({
  title: "Image Cropper",
  description:
    "Crop JPG, PNG, and WebP images in your browser. Free crop, common ratios, or Instagram, Facebook, X, LinkedIn, YouTube, TikTok, Pinterest, and WhatsApp sizes.",
  path: "/image-cropper",
});

export default function ImageCropperPage() {
  return (
    <ToolPage
      title="Image Cropper"
      description="Drag the box to keep only the part you want. Use a simple ratio, or crop for a social profile, post, story, cover, or thumbnail. Files stay in this browser."
      path="/image-cropper"
      toolId="image-cropper"
      faq={[
        {
          question: "Is cropping lossless?",
          answer:
            "The pixels outside the box are discarded. Saving as JPG or WebP may also apply compression.",
        },
        {
          question: "Which ratios are available?",
          answer:
            "Free crop plus 1:1, 4:3, 3:2, 16:9, 9:16, and 4:5. You can also pick Instagram, Facebook, X, LinkedIn, YouTube, TikTok, Pinterest, or WhatsApp sizes for profile photos, posts, stories, covers, and thumbnails.",
        },
        {
          question: "Does a social preset change the file size in pixels?",
          answer:
            "Yes. After you crop, the download is resized to that platform’s usual pixel size (for example Instagram portrait 1080×1350). If your photo is already smaller, it is not stretched.",
        },
      ]}
    >
      <ImageCropperTool />
    </ToolPage>
  );
}
