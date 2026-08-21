import { ImageConverterTool } from "@/tools/imageConverter/ImageConverterTool";
import { conversionPairs } from "@/tools/imageConverter/pairs";
import { ToolPage } from "@/components/ToolPage";
import { createPageMetadata } from "@/lib/seo";

const pair = conversionPairs.find((item) => item.id === "png-to-jpg")!;

export const metadata = createPageMetadata({
  title: pair.title,
  description: pair.description,
  path: pair.href,
});

export default function PngToJpgPage() {
  return (
    <ToolPage title={pair.title} description={pair.description} faq={pair.faq}>
      <ImageConverterTool
        heading={pair.title}
        toolId={pair.id}
        lockedInput={pair.input}
        lockedOutput={pair.output}
        actionLabel="Convert to JPG"
      />
    </ToolPage>
  );
}
