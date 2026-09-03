import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { routes, siteConfig } from "@/config/site";
import { tools } from "@/tools/registry";

const pages = [
  routes.home,
  routes.converter,
  "/tools",
  routes.guides,
  ...guides.map((guide) => `/guides/${guide.slug}`),
  routes.privacy,
  routes.terms,
  routes.contact,
  routes.about,
  ...tools.map((tool) => tool.href),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const unique = [...new Set(pages)];
  return unique.map((path) => ({
    url: path === "/" ? siteConfig.url : `${siteConfig.url}${path}`,
    lastModified: new Date("2026-09-03"),
    changeFrequency:
      path === "/" || path === routes.converter || path.startsWith("/guides")
        ? "weekly"
        : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/tools" || path === routes.guides
          ? 0.9
          : path.startsWith("/guides/")
            ? 0.8
            : 0.7,
  }));
}
