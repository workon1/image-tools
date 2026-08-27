# SEO architecture

## Model

```
Search query
  → dedicated landing page (unique title, H1, FAQ)
  → working tool on the same URL
  → download
  → related tools
```

Do not index URLs that do not run a real tool. Do not clone paragraphs across pair pages.

## Indexable routes (current + intended)

### Keep (already real tools)

| Intent | URL |
|--------|-----|
| Brand / convert hub | `/` |
| Generic convert | `/image-converter` |
| jpg to png | `/jpg-to-png` |
| png to jpg | `/png-to-jpg` |
| jpg to webp | `/jpg-to-webp` |
| webp to jpg | `/webp-to-jpg` |
| resize image | `/image-resizer` |
| compress image | `/image-compressor` |
| compress to 100kb | `/compress-to-100kb` |
| compress to 200kb | `/compress-to-200kb` |
| crop image | `/image-cropper` |
| image to base64 | `/image-to-base64` |
| favicon generator | `/favicon-generator` |
| catalog | `/tools` |
| trust | `/privacy`, `/terms`, `/contact`, `/about` |

### Add (tool already exists or is a small canvas feature)

| Intent | URL | Notes |
|--------|-----|-------|
| png to webp | `/png-to-webp` | Same converter, locked pair |
| webp to png | `/webp-to-png` | Same converter, locked pair |
| rotate / flip | `/image-rotate` | New canvas transforms |
| remove metadata | `/remove-image-metadata` | Re-encode same format (canvas drops EXIF) |
| compress jpg | `/compress-jpg` | Compressor, JPEG in |

### Redirects (aliases, not extra indexable copies)

| From | To |
|------|----|
| `/compress-image` | `/image-compressor` |
| `/convert-image` | `/image-converter` |
| `/resize-image` | `/image-resizer` |
| `/crop-image` | `/image-cropper` |
| `/rotate-image` | `/image-rotate` |
| `/flip-image` | `/image-rotate` |
| `/optimize-image` | `/image-compressor` |
| `/compress-image-to-100kb` | `/compress-to-100kb` |
| `/compress-image-to-200kb` | `/compress-to-200kb` |

## Do not create

- `/image-to-pdf`, `/pdf-to-image` — not implemented
- `/heic-to-jpg` — not implemented
- Per-dimension pages (`/resize-image-to-1080x1080`) — thin
- Translated `/es/...` routes without a localization strategy
- Fake review / rating schema

## On-page template (every tool)

1. Unique `<title>` and meta description  
2. Matching H1  
3. Intro that states formats, 20 MB / 10 files / 8192 px / 25 MP, local processing  
4. Working tool above the fold on mobile  
5. FAQ with real answers (not swapped keywords)  
6. Related tools  
7. Canonical = itself  
8. JSON-LD: FAQPage when FAQ exists; BreadcrumbList; site-level WebSite / WebApplication  

## Internal linking

- Home → all tools  
- `/tools` → grouped catalog  
- Each tool → 3–5 related tools in the same job-to-be-done  
- Footer → About, Privacy, Terms, Contact  

## Technical

- `robots.txt` allow `/`, sitemap URL, host  
- Sitemap: canonical 200 pages only (no redirects, no 404)  
- `https` only; no www until a custom domain exists  
- Trailing slash: Next default **off**  
- 404: `noindex`  
- Content in server-rendered HTML so Googlebot does not need to run canvas
