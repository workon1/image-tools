import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data:",
      "font-src 'self'",
      "connect-src 'self'",
      "media-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/compress-image", destination: "/image-compressor", statusCode: 301 },
      { source: "/convert-image", destination: "/image-converter", statusCode: 301 },
      { source: "/resize-image", destination: "/image-resizer", statusCode: 301 },
      { source: "/crop-image", destination: "/image-cropper", statusCode: 301 },
      { source: "/rotate-image", destination: "/image-rotate", statusCode: 301 },
      { source: "/flip-image", destination: "/image-rotate", statusCode: 301 },
      { source: "/optimize-image", destination: "/image-compressor", statusCode: 301 },
      {
        source: "/compress-image-to-100kb",
        destination: "/compress-to-100kb",
        statusCode: 301,
      },
      {
        source: "/compress-image-to-200kb",
        destination: "/compress-to-200kb",
        statusCode: 301,
      },
      {
        source: "/",
        has: [{ type: "host", value: "www.imagereshaper.com" }],
        destination: "https://imagereshaper.com",
        statusCode: 301,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.imagereshaper.com" }],
        destination: "https://imagereshaper.com/:path+",
        statusCode: 301,
      },
      {
        source: "/",
        has: [{ type: "host", value: "image-tools1.vercel.app" }],
        destination: "https://imagereshaper.com",
        statusCode: 301,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "image-tools1.vercel.app" }],
        destination: "https://imagereshaper.com/:path+",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
