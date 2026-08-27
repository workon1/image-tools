import { conversionPairs } from "@/tools/imageConverter/pairs";

export type ToolStatus = "available" | "coming-soon";

export type ToolDefinition = {
  id: string;
  href: string;
  name: string;
  description: string;
  status: ToolStatus;
  formats?: string[];
  group: "convert" | "compress" | "edit" | "export";
};

export const tools: ToolDefinition[] = [
  {
    id: "image-converter",
    href: "/image-converter",
    name: "Image Converter",
    description: "Convert JPG, PNG, and WebP images privately in your browser.",
    status: "available",
    formats: ["JPG", "PNG", "WebP"],
    group: "convert",
  },
  ...conversionPairs.map((pair): ToolDefinition => ({
    id: pair.id,
    href: pair.href,
    name: pair.name,
    description: pair.description,
    status: "available",
    group: "convert",
  })),
  {
    id: "image-resizer",
    href: "/image-resizer",
    name: "Image Resizer",
    description: "Resize images to exact pixel dimensions without uploading them.",
    status: "available",
    group: "edit",
  },
  {
    id: "image-compressor",
    href: "/image-compressor",
    name: "Image Compressor",
    description: "Reduce image file size while keeping the format you need.",
    status: "available",
    group: "compress",
  },
  {
    id: "compress-to-100kb",
    href: "/compress-to-100kb",
    name: "Compress to 100 KB",
    description: "Shrink a JPG or WebP until it is 100 KB or smaller.",
    status: "available",
    group: "compress",
  },
  {
    id: "compress-to-200kb",
    href: "/compress-to-200kb",
    name: "Compress to 200 KB",
    description: "Shrink a JPG or WebP until it is 200 KB or smaller.",
    status: "available",
    group: "compress",
  },
  {
    id: "compress-jpg",
    href: "/compress-jpg",
    name: "Compress JPG",
    description: "Reduce JPG file size in your browser to a target percent of the original bytes.",
    status: "available",
    group: "compress",
  },
  {
    id: "compress-png",
    href: "/compress-png",
    name: "Compress PNG",
    description: "Shrink PNG images by writing a smaller JPG or WebP in your browser.",
    status: "available",
    group: "compress",
  },
  {
    id: "compress-webp",
    href: "/compress-webp",
    name: "Compress WebP",
    description: "Reduce WebP file size in your browser to a target percent of the original bytes.",
    status: "available",
    group: "compress",
  },
  {
    id: "image-cropper",
    href: "/image-cropper",
    name: "Image Cropper",
    description: "Crop images to a custom area, common ratios, or social profile, post, and cover sizes.",
    status: "available",
    group: "edit",
  },
  {
    id: "image-rotate",
    href: "/image-rotate",
    name: "Rotate & Flip",
    description: "Rotate 90°, 180°, or 270° and flip images horizontally or vertically in your browser.",
    status: "available",
    group: "edit",
  },
  {
    id: "remove-image-metadata",
    href: "/remove-image-metadata",
    name: "Remove Image Metadata",
    description: "Strip EXIF and other metadata by re-encoding the image locally. The original file is not uploaded.",
    status: "available",
    group: "edit",
  },
  {
    id: "image-to-base64",
    href: "/image-to-base64",
    name: "Image to Base64",
    description: "Turn an image into a Base64 data URL without sending it to a server.",
    status: "available",
    group: "export",
  },
  {
    id: "favicon-generator",
    href: "/favicon-generator",
    name: "Favicon Generator",
    description: "Create favicon.ico and PNG icons from any JPG, PNG, or WebP image.",
    status: "available",
    group: "export",
  },
];

export const toolGroups: { id: ToolDefinition["group"]; label: string }[] = [
  { id: "convert", label: "Convert" },
  { id: "compress", label: "Compress" },
  { id: "edit", label: "Edit" },
  { id: "export", label: "Export" },
];

export function getAvailableTools(): ToolDefinition[] {
  return tools.filter((tool) => tool.status === "available");
}

export function getToolById(id: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.id === id);
}
