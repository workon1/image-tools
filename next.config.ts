import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The app is statically generated and has no server-side image processing.
  // For Cloudflare Pages, GitHub Pages, or other static hosts, set:
  //   output: "export",
  //   images: { unoptimized: true },
  // Vercel and `next start` work with the default Node output.
};

export default nextConfig;
