import { getToolById, type ToolDefinition } from "@/tools/registry";

const RELATED: Record<string, string[]> = {
  "image-converter": ["jpg-to-png", "png-to-jpg", "image-compressor", "image-resizer"],
  "jpg-to-png": ["png-to-jpg", "jpg-to-webp", "image-compressor", "image-resizer"],
  "png-to-jpg": ["jpg-to-png", "png-to-webp", "image-compressor", "remove-image-metadata"],
  "jpg-to-webp": ["webp-to-jpg", "png-to-webp", "image-compressor", "jpg-to-png"],
  "webp-to-jpg": ["jpg-to-webp", "webp-to-png", "image-compressor", "image-resizer"],
  "png-to-webp": ["webp-to-png", "png-to-jpg", "image-compressor", "jpg-to-webp"],
  "webp-to-png": ["png-to-webp", "webp-to-jpg", "image-cropper", "favicon-generator"],
  "image-resizer": ["image-cropper", "image-compressor", "image-rotate", "image-converter"],
  "image-compressor": ["compress-jpg", "compress-png", "compress-webp", "image-resizer"],
  "compress-jpg": ["compress-png", "jpg-to-webp", "image-resizer", "remove-image-metadata"],
  "compress-png": ["png-to-jpg", "png-to-webp", "image-compressor", "image-resizer"],
  "compress-webp": ["webp-to-jpg", "image-compressor", "compress-jpg", "image-resizer"],
  "compress-to-100kb": ["compress-to-200kb", "image-compressor", "compress-jpg", "image-resizer"],
  "compress-to-200kb": ["compress-to-100kb", "image-compressor", "jpg-to-webp", "image-resizer"],
  "image-cropper": ["image-resizer", "image-rotate", "favicon-generator", "image-compressor"],
  "image-rotate": ["image-cropper", "image-resizer", "remove-image-metadata", "image-converter"],
  "remove-image-metadata": ["image-compressor", "image-converter", "png-to-jpg", "image-rotate"],
  "image-to-base64": ["favicon-generator", "image-converter", "remove-image-metadata"],
  "favicon-generator": ["image-cropper", "image-resizer", "image-to-base64"],
};

export function getRelatedTools(toolId: string): ToolDefinition[] {
  const ids = RELATED[toolId] ?? [];
  const related: ToolDefinition[] = [];
  for (const id of ids) {
    const tool = getToolById(id);
    if (tool?.status === "available") related.push(tool);
  }
  return related;
}
