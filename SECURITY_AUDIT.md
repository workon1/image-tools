# Security audit

**Scope:** Client-only Next.js image tools. No upload API, no database, no user accounts.

## Trust boundary

The only “upload” is a `File` object in the user’s browser. Conversion never POSTs the file. Abuse of *processing* is limited to the visitor’s own device (DoS of their tab, not the origin’s CPU).

## File handling (verified)

| Control | Status |
|---------|--------|
| Extension not trusted | Yes — magic bytes required when present |
| MIME vs magic mismatch | Rejected (`unsupported_type`) |
| SVG | Rejected via header scan (`isSvgBytes`) |
| GIF / HEIC / PDF | Not in accepted magic list |
| Size cap | 20 MB |
| Pixel / dimension cap | 25 MP / 8192 px after decode |
| Batch cap | 10 files |
| Path traversal in filenames | `sanitizeFilename` strips `<>:"/\|?*` and control chars |
| Execute uploaded files | No — never written to disk, never used as script |
| Server filesystem paths in errors | No |

## Gaps found

| Issue | Severity | Plan |
|-------|----------|------|
| No app `Content-Security-Policy` | P1 | Add in `next.config.ts`, allow `blob:`/`data:` for previews |
| No `X-Content-Type-Options` | P1 | `nosniff` |
| No `Referrer-Policy` | P1 | `strict-origin-when-cross-origin` |
| No frame denial | P1 | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` |
| No `Permissions-Policy` | P1 | Disable mic/geo/payment; do not block camera if a capture control is added |
| Production `logError` is silent | P2 | Acceptable until a privacy-safe reporter exists |
| `NEXT_PUBLIC_*` only | OK | No private keys in the client |
| Dependency audit | P1 | Run `npm audit` at validation time |

## API / CORS / CSRF

There are **no** `app/api` routes. CORS/CSRF/rate-limit on conversion endpoints do not apply. Do not add a conversion API without auth, size limits, and ephemeral storage.

## Ads / analytics (future)

Do not enable AdSense or a tracker until CSP `script-src` is updated for that host. Do not ship fake `ads.txt`.

## Rate limiting / CAPTCHA

Not required for client-side conversion. Revisit only if a **server** processing path is added.

## Headers on live (pre-fix)

Observed on `image-tools1.vercel.app`: `strict-transport-security`. Other headers were not set by this app.
