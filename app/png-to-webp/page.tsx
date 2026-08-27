import { ConversionPairPage, conversionPairMetadata } from "@/tools/imageConverter/ConversionPairPage";

export const metadata = conversionPairMetadata("png-to-webp");

export default function PngToWebpPage() {
  return <ConversionPairPage id="png-to-webp" />;
}
