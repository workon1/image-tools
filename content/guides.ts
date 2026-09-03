import type { ContentSection, GuideMeta } from "@/content/types";

export const guides: GuideMeta[] = [
  {
    slug: "compress-image-to-100kb",
    title: "How to Compress an Image to 100 KB",
    description:
      "Step-by-step advice for meeting 100 KB upload limits while keeping a photo readable, using browser-side compression.",
    updated: "2026-09-03",
  },
  {
    slug: "convert-jpg-to-png",
    title: "How to Convert JPG to PNG Without Losing More Quality",
    description:
      "When JPG to PNG helps, what it cannot fix, and how to convert privately in your browser.",
    updated: "2026-09-03",
  },
  {
    slug: "resize-images-for-social-media",
    title: "How to Resize Images for Social Media",
    description:
      "Practical cropping and resizing workflow for common social aspect ratios without distorting faces.",
    updated: "2026-09-03",
  },
  {
    slug: "browser-image-privacy",
    title: "Why Browser-Side Image Tools Are More Private",
    description:
      "How local conversion differs from upload-based tools, and what still leaves your device.",
    updated: "2026-09-03",
  },
];

export const guideContent: Record<string, ContentSection[]> = {
  "compress-image-to-100kb": [
    {
      heading: "Read the form’s real requirements",
      paragraphs: [
        "Before you open a compressor, note the stated limit (100 KB, 200 KB, etc.), allowed formats (JPG is most common), and any minimum dimensions for face or document photos. Meeting 100 KB at 4000 pixels wide is much harder than meeting it at 800–1200 pixels. If the portal shows a tiny preview, you do not need a billboard-sized file.",
        "Also check whether they want color or grayscale, and whether PDF is accepted for documents. Compressing the wrong file type wastes time.",
      ],
    },
    {
      heading: "A reliable sequence",
      paragraphs: [
        "Crop to the subject so you are not spending bytes on empty background. Resize so the long edge matches what the form needs (or a little above). Then run Compress to 100 KB and download the result. Open the file properties to confirm the size is ≤ 100 KB before you upload—some systems count kilobytes strictly.",
        "If the face becomes blocky, retake the photo with even lighting and a plain background, then repeat. Software cannot recover a dark, noisy phone shot crushed to a tiny budget.",
      ],
    },
    {
      heading: "Use the matching tool",
      paragraphs: [
        "Image Reshaper’s Compress to 100 KB tool performs this search in your browser. Nothing is uploaded to finish the job. If your limit is 200 KB, use that landing instead so you are not over-compressing.",
      ],
    },
  ],
  "convert-jpg-to-png": [
    {
      heading: "What conversion can and cannot do",
      paragraphs: [
        "JPG uses lossy compression. Converting to PNG locks in whatever detail remains; it does not sharpen a blurry photo or remove JPEG blockiness. People convert anyway when the next step is editing, compositing, or handing a file to software that behaves better with PNG.",
        "Transparency is a separate topic. A JPG does not contain an alpha channel. Saving as PNG keeps an opaque image unless you remove the background in an editor afterward.",
      ],
    },
    {
      heading: "Recommended workflow",
      paragraphs: [
        "Keep your camera original if you have it. Convert a copy with the JPG to PNG tool when you need a lossless working file. Edit on the PNG. Export a final JPG or WebP for publishing so visitors are not downloading a multi‑megabyte PNG photograph.",
        "If your only goal is a smaller web image, skip PNG and go JPG→WebP or compress the JPG directly.",
      ],
    },
  ],
  "resize-images-for-social-media": [
    {
      heading: "Aspect ratio first, pixels second",
      paragraphs: [
        "Social platforms crop aggressively. A landscape photo forced into a square post will lose the sides whether you prepare it or not. Decide the aspect ratio (1:1, 4:5, 9:16, 16:9), crop to that ratio with the subject framed intentionally, then resize to the pixel dimensions the platform recommends.",
        "Presets in the Image Cropper cover common cases. After cropping, use the Image Resizer if you need an exact width such as 1080 pixels. Lock aspect ratio while resizing so you do not stretch what you just composed.",
      ],
    },
    {
      heading: "File size after resize",
      paragraphs: [
        "Smaller dimensions usually mean a smaller file, but not always enough for a picky uploader. After resizing, run the compressor if the platform still rejects the upload. Export JPG or WebP for photos; keep PNG for graphics with text or transparency.",
      ],
    },
  ],
  "browser-image-privacy": [
    {
      heading: "Upload-based converters",
      paragraphs: [
        "Classic online tools receive your file on a server, process it, store it briefly (or longer), and send back a download link. Even trustworthy vendors introduce a third copy of the image outside your device. That copy may appear in logs, backups, or CDN caches depending on how the service is built. For confidential screenshots, unpublished product shots, or personal documents, that model is hard to justify.",
      ],
    },
    {
      heading: "What “in your browser” means here",
      paragraphs: [
        "Image Reshaper reads the file you select, draws it with canvas APIs, and builds a downloadable blob URL. Conversion does not require an Image Reshaper account, and we do not need the image bytes on our servers to finish the task. Optional analytics, when enabled and allowed by your consent choices, record events such as which tool opened—not the picture itself.",
        "You still choose what leaves the machine afterward: if you email the download or upload it to a form, that is a separate action. Stripping metadata before sharing reduces the chance that GPS or device tags travel with the file.",
      ],
    },
    {
      heading: "Practical habits",
      paragraphs: [
        "Prefer local tools for anything you would not post publicly. Crop out sensitive edges. Remove metadata. Double-check the download before you attach it. When a cloud converter is unavoidable, use a redacted copy, not the only original.",
      ],
    },
  ],
};

export function getGuide(slug: string): GuideMeta | undefined {
  return guides.find((guide) => guide.slug === slug);
}
