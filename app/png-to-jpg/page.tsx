import { ConversionPairPage, conversionPairMetadata } from "@/tools/imageConverter/ConversionPairPage";

export const metadata = conversionPairMetadata("png-to-jpg");

export default function PngToJpgPage() {
  return <ConversionPairPage id="png-to-jpg" />;
}
