import { ConversionPairPage, conversionPairMetadata } from "@/tools/imageConverter/ConversionPairPage";

export const metadata = conversionPairMetadata("jpg-to-png");

export default function JpgToPngPage() {
  return <ConversionPairPage id="jpg-to-png" />;
}
