import { ImageConverterTool } from "@/tools/imageConverter/ImageConverterTool";
import { conversionPairs, type ConversionPair } from "@/tools/imageConverter/pairs";
import { ToolPage } from "@/components/ToolPage";
import { createPageMetadata } from "@/lib/seo";

export function getConversionPair(id: string): ConversionPair {
  const pair = conversionPairs.find((item) => item.id === id);
  if (!pair) {
    throw new Error(`Unknown conversion pair: ${id}`);
  }
  return pair;
}

export function conversionPairMetadata(id: string) {
  const pair = getConversionPair(id);
  return createPageMetadata({
    title: pair.title,
    description: pair.description,
    path: pair.href,
  });
}

export function ConversionPairPage({ id }: { id: string }) {
  const pair = getConversionPair(id);
  return (
    <ToolPage
      title={pair.heading}
      description={pair.description}
      path={pair.href}
      faq={pair.faq}
      toolId={pair.id}
    >
      <ImageConverterTool
        heading={pair.heading}
        toolId={pair.id}
        lockedInput={pair.input}
        lockedOutput={pair.output}
        actionLabel={pair.actionLabel}
      />
    </ToolPage>
  );
}
