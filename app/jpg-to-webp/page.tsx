import { ConversionPairPage, conversionPairMetadata } from "@/tools/imageConverter/ConversionPairPage";

export const metadata = conversionPairMetadata("jpg-to-webp");

export default function JpgToWebpPage() {
  return <ConversionPairPage id="jpg-to-webp" />;
}
