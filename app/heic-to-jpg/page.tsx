import { ToolPage } from "@/components/ToolPage";
import { heicContent } from "@/content/hubs";
import { createPageMetadata } from "@/lib/seo";
import { HeicConverterTool } from "@/tools/heicConverter/HeicConverterTool";

export const metadata = createPageMetadata({
  title: "HEIC to JPG Converter",
  description:
    "Convert iPhone HEIC and HEIF photos to JPG, PNG, or WebP in your browser. Free, no account, and the photo is never uploaded.",
  path: "/heic-to-jpg",
});

export default function HeicToJpgPage() {
  return (
    <ToolPage
      title="HEIC to JPG Converter"
      description="Turn iPhone and iPad HEIC photos into JPG, PNG, or WebP files that open on any device. Decoding happens in this browser, so the photo is not uploaded (20 MB per file)."
      path="/heic-to-jpg"
      toolId="heic-to-jpg"
      content={heicContent}
      faq={[
        {
          question: "What is a HEIC file?",
          answer:
            "HEIC is the container Apple uses for photos on recent iPhones and iPads. It stores the same picture as a JPG in roughly half the space, but many Windows programs, websites, and upload forms cannot open it.",
        },
        {
          question: "Is the photo uploaded to a server?",
          answer:
            "No. The decoder runs in your browser, so the HEIC file stays on your device. Closing the tab discards it.",
        },
        {
          question: "Why does conversion take a few seconds?",
          answer:
            "Browsers have no built-in HEIC decoder, so the page loads one on demand the first time you convert. Your device then does the decoding work, which takes longer than a simple JPG to PNG conversion.",
        },
        {
          question: "Will I lose quality converting HEIC to JPG?",
          answer:
            "HEIC is already a lossy format, and JPG is another lossy step, so there is some loss. At 85% quality it is not visible in normal viewing. Choose PNG if you need a lossless copy for editing.",
        },
        {
          question: "Can I stop my iPhone making HEIC files?",
          answer:
            "Yes. Open Settings, then Camera, then Formats, and choose Most Compatible. New photos will be saved as JPG. Photos already on the device stay HEIC.",
        },
      ]}
    >
      <HeicConverterTool />
    </ToolPage>
  );
}
