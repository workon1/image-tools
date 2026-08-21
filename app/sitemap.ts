import type { MetadataRoute } from "next";
import { routes, siteConfig } from "@/config/site";
import { tools } from "@/tools/registry";

const pages = [
  routes.home,
  routes.converter,
  "/tools",
  routes.privacy,
  routes.terms,
  routes.contact,
  ...tools.map((tool) => tool.href),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const unique = [...new Set(pages)];
  return unique.map((path) => ({
    url: path === "/" ? siteConfig.url : `${siteConfig.url}${path}`,
    lastModified: new Date("2026-08-21"),
    changeFrequency: path === "/" || path === routes.converter ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/tools" ? 0.9 : 0.7,
  }));
}
