# Pre-launch audit

**Product:** Image Tools  
**Repo:** `/Users/dimpu/Desktop/Project/Image_tools`  
**Live:** https://image-tools1.vercel.app  
**Audit date:** 27 August 2026  
**Stack:** Next.js 16.3.2 App Router, React 19, TypeScript, Tailwind 4  
**Hosting:** Vercel (static pages, no server-side image processing)

This audit is based on the source in this repository. Nothing was modified while it was written.

## Architecture (verified)

| Area | Finding |
|------|---------|
| Framework / language | Next.js App Router + TypeScript. No backend API routes. |
| Image processing | 100% client-side: validate → `createImageBitmap` / `HTMLImageElement` → canvas → `toBlob` → local download. |
| Libraries | No WASM, Sharp, ImageMagick, or encoder packages. Browser canvas only. |
| Database / storage | None. No uploads, no temp files on disk. |
| Auth | None. |
| Third parties | None loaded. Ads/analytics flags exist and default **off**. |
| CDN / cache | Vercel CDN. `cache-control: public, max-age=0, must-revalidate`. HSTS present on live. |
| Rate limiting | Not applicable to conversion (no conversion API). Page requests are static. |

## Limits (from `lib/constants.ts`)

- Max file size: **20 MB**
- Max files per selection: **10**
- Max dimension: **8192 px** per side
- Max pixels: **25 megapixels**
- Input/output formats: **JPG, PNG, WebP only**
- HEIC, AVIF, GIF, SVG, PDF: **not supported** (SVG rejected by magic-byte scan)

## What already works

- Converter, four pair pages (JPG↔PNG, JPG↔WebP), resizer, compressor (target % of bytes), compress to 100/200 KB, cropper, Base64, favicon generator
- Magic-byte + MIME + extension checks; dimension cap after decode
- Privacy-first processing (files never leave the browser)
- Canonical URLs, robots.txt, sitemap, Open Graph, custom 404
- Phone header (hamburger below `lg`)
- 38 unit tests passing at audit time
- Production `NEXT_PUBLIC_SITE_URL` set; robots/sitemap do **not** use localhost

## Missing functionality (product)

| Item | Status | Priority |
|------|--------|----------|
| PNG → WebP and WebP → PNG landing pages | Converter can do it; no dedicated SEO pages | P1 |
| Rotate 90/180/270, flip H/V | Not implemented | P1 |
| Explicit metadata / EXIF removal tool | Implicit via canvas re-encode only | P1 |
| Resizer % and common presets | Width/height + lock only | P1 |
| Crop social ratios (9:16, 4:5, 3:2) | Only free, 1:1, 4:3, 16:9 | P2 |
| Camera capture control | File picker only (iOS still offers camera) | P2 |
| Batch zip download | Individual downloads only | P2 |
| HEIC / AVIF / GIF / PDF | Out of scope without new libraries | P3 |
| Percentage-based i18n | All copy hardcoded in English | P3 |

## SEO problems

- No JSON-LD (FAQ pages have no FAQPage schema)
- Weak tool-to-tool internal links (back to `/tools` only)
- Pair-page FAQs are thin (1–2 items)
- No About page
- Search-intent aliases missing (`/compress-image`, `/png-to-webp`, …)
- 404 copy still says other tools are “on the way”
- `siteConfig.keywords` unused
- Shared OG image for every tool
- Sitemap `lastModified` frozen at 2026-08-21

## Security

- No conversion API to abuse; no stored files; no secrets in JS beyond public env
- **Missing** app-controlled security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame denial). Vercel adds HSTS.
- Validation is real (magic bytes, SVG reject, size/pixel caps)
- Rate limiting N/A for processing; CAPTCHA not warranted

## Performance

- Static HTML for content (Googlebot can read H1/FAQ without running the tool)
- Geist fonts from `next/font`
- Client tools are `'use client'` islands — acceptable
- No third-party ad/analytics scripts in production (good for LCP)
- Large images can still freeze the main thread (canvas, no worker)

## Monetization readiness

- `AdSlot` exists but is **never mounted**
- No `ads.txt` (correct until a real AdSense publisher ID exists)
- Privacy/terms do not mention advertising
- Contact page has no email unless `NEXT_PUBLIC_CONTACT_EMAIL` is set
- No custom domain yet (`image-tools1.vercel.app`)

## Legal / trust

- Privacy + terms exist; About missing
- Cookie/ad disclosure missing
- Contact email not configured

## Observability / backup

- Client `logError` is **dev-only** (nothing in production)
- No Sentry/uptime
- Nothing to back up except git + Vercel env

## P0 / P1 / P2 / P3 (pre-implementation)

**P0:** None that block shipping a client-only converter. No data-loss path, no public file store.

**P1:** Security headers; JSON-LD; PNG↔WebP pages; related-tool links; About; privacy/terms ads/cookies; 404 copy; rotate/flip; metadata-strip tool; search-intent redirects; richer unique titles/FAQs; compressor/resizer UX gaps that block common queries.

**P2:** Social crop presets; camera button; zip batch; Plausible; custom domain; Search Console; production error monitoring.

**P3:** HEIC/AVIF/PDF; i18n; workers for huge bitmaps; AdSense go-live; fake-review-free ratings.
