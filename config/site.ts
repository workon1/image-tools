import { env } from "@/config/env";

export const siteConfig = {
  name: "Image Tools",
  shortName: "Image Tools",
  tagline: "Convert Images Online",
  description:
    "Convert JPG, PNG and WebP images online for free. Fast, private image conversion processed directly in your browser.",
  url: env.siteUrl,
  contactEmail: env.contactEmail,
  locale: "en",
  defaultTitle: "Free Online Image Converter – JPG, PNG & WebP",
  keywords: [
    "image converter",
    "JPG to PNG",
    "PNG to WebP",
    "WebP to JPG",
    "browser image converter",
  ],
};

export const routes = {
  home: "/",
  converter: "/image-converter",
  privacy: "/privacy",
  terms: "/terms",
  contact: "/contact",
  about: "/about",
  formatsHash: "/#supported-formats",
} as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}
