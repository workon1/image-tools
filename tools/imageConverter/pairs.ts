import type { ImageFormat } from "@/lib/formatUtils";

export type ConversionPair = {
  id: string;
  href: `/${string}`;
  title: string;
  input: ImageFormat;
  output: ImageFormat;
  description: string;
  faq: { question: string; answer: string }[];
};

export const conversionPairs: ConversionPair[] = [
  {
    id: "jpg-to-png",
    href: "/jpg-to-png",
    title: "JPG to PNG",
    input: "jpeg",
    output: "png",
    description:
      "Convert JPG photos to PNG in your browser. Useful when you need a lossless file or transparency later.",
    faq: [
      {
        question: "Does JPG to PNG improve quality?",
        answer:
          "No. PNG won’t restore detail that JPG already discarded. It can make the file larger while keeping the current pixels.",
      },
      {
        question: "Are images uploaded?",
        answer: "No. Conversion stays on your device.",
      },
    ],
  },
  {
    id: "png-to-jpg",
    href: "/png-to-jpg",
    title: "PNG to JPG",
    input: "png",
    output: "jpeg",
    description:
      "Convert PNG images to JPG in your browser. Transparent areas become white because JPG has no alpha channel.",
    faq: [
      {
        question: "What happens to transparency?",
        answer: "JPG can’t store transparency, so transparent pixels are filled with white.",
      },
      {
        question: "Can I control quality?",
        answer: "Yes. Use the quality slider before converting. 80% is a solid default.",
      },
    ],
  },
  {
    id: "jpg-to-webp",
    href: "/jpg-to-webp",
    title: "JPG to WebP",
    input: "jpeg",
    output: "webp",
    description:
      "Convert JPG images to WebP in your browser. WebP is often smaller at a similar visual quality.",
    faq: [
      {
        question: "Will every browser open the WebP file?",
        answer:
          "Current Chrome, Edge, Firefox, and Safari versions can. If encoding isn’t available, you’ll see an error instead of an upload.",
      },
    ],
  },
  {
    id: "webp-to-jpg",
    href: "/webp-to-jpg",
    title: "WebP to JPG",
    input: "webp",
    output: "jpeg",
    description:
      "Convert WebP images to JPG in your browser so they’re easy to open in older apps and editors.",
    faq: [
      {
        question: "Why convert WebP to JPG?",
        answer:
          "Some email clients, printers, and older software still expect JPG. This tool creates one locally.",
      },
    ],
  },
];
