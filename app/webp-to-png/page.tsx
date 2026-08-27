import { ConversionPairPage, conversionPairMetadata } from "@/tools/imageConverter/ConversionPairPage";

export const metadata = conversionPairMetadata("webp-to-png");

export default function WebpToPngPage() {
  return <ConversionPairPage id="webp-to-png" />;
}
