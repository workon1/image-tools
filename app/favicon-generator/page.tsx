import { ToolPage } from "@/components/ToolPage";
import { createPageMetadata } from "@/lib/seo";
import { FaviconGeneratorTool } from "@/tools/faviconGenerator/FaviconGeneratorTool";

export const metadata = createPageMetadata({
  title: "Favicon Generator",
  description: "Create favicon.ico and PNG app icons from an image, entirely in your browser.",
  path: "/favicon-generator",
});

export default function FaviconGeneratorPage() {
  return (
    <ToolPage
      title="Favicon Generator"
      description="Upload a logo or photo. We square-crop the center and export 16, 32, 48, and 180 pixel icons plus favicon.ico."
      path="/favicon-generator"
      toolId="favicon-generator"
      faq={[
        {
          question: "How do I use these files?",
          answer:
            "Place favicon.ico in your site root, and link apple-touch-icon.png and the PNG sizes in your HTML head.",
        },
      ]}
    >
      <FaviconGeneratorTool />
    </ToolPage>
  );
}
