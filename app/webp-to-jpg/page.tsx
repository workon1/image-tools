import { ConversionPairPage, conversionPairMetadata } from "@/tools/imageConverter/ConversionPairPage";

export const metadata = conversionPairMetadata("webp-to-jpg");

export default function WebpToJpgPage() {
  return <ConversionPairPage id="webp-to-jpg" />;
}
