import type { ImageFormat } from "@/lib/formatUtils";

export type ConversionPair = {
  id: string;
  href: `/${string}`;
  name: string;
  title: string;
  heading: string;
  input: ImageFormat;
  output: ImageFormat;
  description: string;
  actionLabel: string;
  faq: { question: string; answer: string }[];
};

export const conversionPairs: ConversionPair[] = [
  {
    id: "jpg-to-png",
    href: "/jpg-to-png",
    name: "JPG to PNG",
    title: "Convert JPG to PNG Online",
    heading: "Convert JPG to PNG Online",
    input: "jpeg",
    output: "png",
    actionLabel: "Convert to PNG",
    description:
      "Turn a JPG into a PNG in your browser. Use this when you need a lossless file or transparency later. Files stay on your device (up to 20 MB, 10 at a time).",
    faq: [
      {
        question: "Does JPG to PNG improve quality?",
        answer:
          "No. PNG will not restore detail that JPG already discarded. The file is often larger because PNG is lossless.",
      },
      {
        question: "Are images uploaded?",
        answer: "No. Conversion runs in this browser. Closing the tab discards the files.",
      },
      {
        question: "What are the limits?",
        answer: "JPG, PNG, and WebP up to 20 MB each, 8192 pixels on a side, and 25 megapixels.",
      },
    ],
  },
  {
    id: "png-to-jpg",
    href: "/png-to-jpg",
    name: "PNG to JPG",
    title: "Convert PNG to JPG Online",
    heading: "Convert PNG to JPG Online",
    input: "png",
    output: "jpeg",
    actionLabel: "Convert to JPG",
    description:
      "Convert PNG images to JPG in your browser. Transparent pixels become white because JPG has no alpha channel. Quality is adjustable; 80% is a solid default.",
    faq: [
      {
        question: "What happens to transparency?",
        answer: "JPG cannot store transparency, so transparent pixels are filled with white.",
      },
      {
        question: "Can I control quality?",
        answer: "Yes. Use the quality slider before converting. Lower quality makes a smaller JPG.",
      },
      {
        question: "Will EXIF stay in the JPG?",
        answer:
          "No. The new file is drawn on a canvas, so camera metadata from the PNG is not copied.",
      },
    ],
  },
  {
    id: "jpg-to-webp",
    href: "/jpg-to-webp",
    name: "JPG to WebP",
    title: "Convert JPG to WebP Online",
    heading: "Convert JPG to WebP Online",
    input: "jpeg",
    output: "webp",
    actionLabel: "Convert to WebP",
    description:
      "Convert JPG images to WebP in your browser. WebP is often smaller at a similar visual quality. Encoding uses your browser; if it cannot encode WebP you will see an error instead of an upload.",
    faq: [
      {
        question: "Will every browser open the WebP file?",
        answer:
          "Current Chrome, Edge, Firefox, and Safari can. Older apps may still need JPG — use WebP to JPG if you hit that.",
      },
      {
        question: "Does this upload my photo?",
        answer: "No. The WebP is created locally and downloaded from a blob URL.",
      },
    ],
  },
  {
    id: "webp-to-jpg",
    href: "/webp-to-jpg",
    name: "WebP to JPG",
    title: "Convert WebP to JPG Online",
    heading: "Convert WebP to JPG Online",
    input: "webp",
    output: "jpeg",
    actionLabel: "Convert to JPG",
    description:
      "Convert WebP images to JPG in your browser so they open in older apps, email clients, and printers that still expect JPEG.",
    faq: [
      {
        question: "Why convert WebP to JPG?",
        answer:
          "Some email clients, printers, and older software still expect JPG. This tool creates one on your device.",
      },
      {
        question: "Is quality lost?",
        answer:
          "WebP may already be lossy. Saving as JPG is another lossy step. Use quality 80 or higher unless you need a tiny file.",
      },
    ],
  },
  {
    id: "png-to-webp",
    href: "/png-to-webp",
    name: "PNG to WebP",
    title: "Convert PNG to WebP Online",
    heading: "Convert PNG to WebP Online",
    input: "png",
    output: "webp",
    actionLabel: "Convert to WebP",
    description:
      "Convert PNG images to WebP in your browser. WebP usually shrinks screenshots and graphics while keeping sharp edges better than JPG.",
    faq: [
      {
        question: "Does WebP keep PNG transparency?",
        answer:
          "Yes. WebP can store an alpha channel. Transparent pixels stay transparent in browsers that support WebP.",
      },
      {
        question: "When should I keep PNG instead?",
        answer:
          "Keep PNG if a tool cannot open WebP, or if you need a lossless archive. This conversion is for sharing and the web.",
      },
    ],
  },
  {
    id: "webp-to-png",
    href: "/webp-to-png",
    name: "WebP to PNG",
    title: "Convert WebP to PNG Online",
    heading: "Convert WebP to PNG Online",
    input: "webp",
    output: "png",
    actionLabel: "Convert to PNG",
    description:
      "Convert WebP images to PNG in your browser when you need a widely supported lossless file or an editor that does not open WebP.",
    faq: [
      {
        question: "Will the PNG be larger?",
        answer:
          "Often yes. PNG is lossless. The pixels you see are preserved, but the file is usually bigger than WebP.",
      },
      {
        question: "Are files uploaded?",
        answer: "No. Decoding and encoding both happen in this tab.",
      },
    ],
  },
];
