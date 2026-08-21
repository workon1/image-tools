# Image Tools

Browser-based image tools. Convert, resize, crop, compress, encode to Base64, and generate favicons entirely in the user's browser. Files are not uploaded to a server.

## Project overview

This is a Next.js App Router site structured as a suite of image tools. Every tool processes files in the browser. Ads stay off until you enable them.

Design goals, in order:

1. Correct conversion
2. Privacy (client-side processing)
3. Clear user experience
4. Performance on modest devices
5. Maintainable modules for the next tools
6. SEO from day one
7. Monetization hooks without ads in the MVP

## Architecture

```
app/                     Routes, metadata, sitemap, robots
components/              Shared UI (header, uploader, FAQ, ads slot, …)
config/                  Site URL, feature flags, env parsing
hooks/                   Object-URL lifecycle helpers
lib/                     Conversion, validation, formats, analytics
tools/                   One folder per tool
  registry.ts            Catalog of available tools
  imageConverter/        Converter + JPG/PNG/WebP pair pages
  imageResizer/
  imageCompressor/
  targetCompressor/      Compress to 100 KB / 200 KB
  imageCropper/
  imageToBase64/
  faviconGenerator/
```

Adding a tool later means:

1. Create `tools/yourTool/` with a client component and any lib helpers.
2. Register it in `tools/registry.ts`.
3. Add a route such as `app/image-resizer/page.tsx`.
4. Reuse `ImageUploader`, `ImagePreview`, `Header`, `Footer`, and `AdSlot`.

Live tools: `/image-converter`, `/jpg-to-png`, `/png-to-jpg`, `/jpg-to-webp`, `/webp-to-jpg`, `/image-resizer`, `/image-compressor`, `/compress-to-100kb`, `/compress-to-200kb`, `/image-cropper`, `/image-to-base64`, `/favicon-generator`, `/tools`.

## How image conversion works

No WASM encoder and no server round-trip.

1. Validate the file (size, extension, MIME type, and magic bytes).
2. Decode with `createImageBitmap` (falls back to `HTMLImageElement`).
3. Draw onto a `canvas`.
4. Export with `canvas.toBlob(mime, quality)`.
5. Offer a local blob download.
6. Revoke object URLs and reset canvas dimensions so memory can be released.

Quality (10–100, default 80) applies to JPG and WebP. PNG is lossless; the UI explains that the slider does not apply. Transparent pixels become white when converting to JPG.

### Browser APIs and limits

| Capability         | Notes                                                             |
| ------------------ | ----------------------------------------------------------------- |
| JPG / PNG encode   | Universal in current browsers                                     |
| WebP decode        | Widely supported                                                  |
| WebP encode        | Chrome, Edge, Firefox, Safari 16+ (this app targets Safari 16.4+) |
| Very large bitmaps | Rejected before draw (max 8192px on a side, 25 megapixels)        |
| HEIC / GIF / SVG   | Not in the MVP. SVG is excluded so it cannot execute as markup    |

If encoding is unavailable, the UI shows a clear error. The app never silently uploads the file as a fallback.

## Privacy

- Images never leave the device for conversion.
- Nothing is written to `localStorage` or a database.
- Analytics, when enabled, only receive event names and coarse facts (format, size bucket). Filenames and pixels are blocked.
- See `/privacy` for the user-facing policy.

## Installation

```bash
npm install
cp .env.example .env.local
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
npm test
```

Watch mode: `npm run test:watch`.

Coverage includes file validation, format detection, size limits, conversion config, filename sanitization, and the converter workflow (upload → format → convert → result → download), including invalid and oversized files.

## Build

```bash
npm run build
npm run start
npm run lint
npm run typecheck
```

## Deployment

The app is a standard Next.js site. Pages are statically generated; conversion is client-side. You are not locked to one host.

### Vercel

Connect the repo and deploy. Set `NEXT_PUBLIC_SITE_URL` to the production origin.

### Cloudflare Pages (or any static host)

In `next.config.ts`, enable:

```ts
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};
```

Build, then publish the `out/` directory. Set `NEXT_PUBLIC_SITE_URL` at build time so canonical URLs, Open Graph tags, `robots.txt`, and `sitemap.xml` use the real origin.

## Environment variables

See `.env.example`. All values are `NEXT_PUBLIC_*` because this MVP has no secret server.

| Variable                         | Purpose                                                      |
| -------------------------------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`           | Canonical site origin                                        |
| `NEXT_PUBLIC_CONTACT_EMAIL`      | Optional address on `/contact`                               |
| `NEXT_PUBLIC_ANALYTICS_ENABLED`  | Turn analytics on                                            |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | `none` or `console`                                          |
| `NEXT_PUBLIC_ADS_ENABLED`        | Reveal `AdSlot` (still empty until you implement a provider) |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID`  | Reserved                                                     |
| `NEXT_PUBLIC_PREMIUM_ENABLED`    | Reserved                                                     |
| `NEXT_PUBLIC_API_ENABLED`        | Reserved                                                     |
| `NEXT_PUBLIC_AFFILIATE_ENABLED`  | Reserved                                                     |

## How to add another image tool

1. Put shared file helpers in `lib/` if other tools will need them.
2. Add `tools/imageResizer/` (component + hook).
3. Append an entry to `tools/registry.ts` with `status: "available"`.
4. Create `app/image-resizer/page.tsx` with `createPageMetadata`.
5. Keep processing in the browser unless a future tool truly cannot.

## How to add analytics

1. Set `NEXT_PUBLIC_ANALYTICS_ENABLED=true`.
2. Implement a provider in `lib/analytics.ts` (Plausible, a custom endpoint, etc.).
3. Keep using `track()` from the tool code. Do not pass filenames or image data.

`NEXT_PUBLIC_ANALYTICS_PROVIDER=console` logs events in the browser console for local checks.

## How to enable ads later

`AdSlot` already exists. With `NEXT_PUBLIC_ADS_ENABLED=false` it renders nothing and does not affect layout.

When you are ready:

1. Set `NEXT_PUBLIC_ADS_ENABLED=true`.
2. Place `<AdSlot slot="inline" />` where you want a region.
3. Teach `AdSlot` to load your provider (for example AdSense) using `NEXT_PUBLIC_ADSENSE_CLIENT_ID`.
4. Do not load ad scripts until that flag is on.

Premium features, an API, and affiliate links have flags in `config/features.ts` and are unused in the MVP.

## Scripts

| Script              | What it does               |
| ------------------- | -------------------------- |
| `npm run dev`       | Local development server   |
| `npm run build`     | Production build           |
| `npm run start`     | Serve the production build |
| `npm test`          | Vitest once                |
| `npm run lint`      | ESLint                     |
| `npm run format`    | Prettier                   |
| `npm run typecheck` | TypeScript                 |
