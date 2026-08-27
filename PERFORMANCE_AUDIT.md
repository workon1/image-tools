# Performance audit

## What is already good

- Tool landing HTML is statically generated; FAQ/H1 are in the first response
- No ad or analytics scripts on production (flags off)
- `next/font` for Geist (no render-blocking Google Fonts CSS)
- `overflow-x-clip` + compact header reduce mobile layout overflow
- Object URLs revoked; canvas released after encode
- AbortController cancels in-flight work when the user starts over

## Risks

| Area | Risk | Mitigation |
|------|------|------------|
| LCP | Hero + converter JS on `/` | Keep converter as the product; avoid extra widgets |
| INP | Canvas encode on main thread | Show “Converting…”; sequential files; 25 MP cap |
| CLS | Upload card / previews | Fixed rounded card; don’t inject ads above the tool |
| Large files | 20 MB decode can hitch | Existing limits; progress text |
| Fonts | Two families (sans + mono) | Acceptable; mono is for code snippets |

## Core Web Vitals

Not measured with Lighthouse in this audit pass (requires a browser run after deploy). Targets after launch: LCP < 2.5s on mobile for tool pages, CLS < 0.1, INP < 200ms for UI chrome (encode time is user-initiated).

## Ads / analytics later

Load ad scripts **after** first interaction or below the fold. Never block Upload / Process / Download. Analytics must stay event names + coarse buckets, not files.

## Caching

Static assets on Vercel CDN. HTML `must-revalidate` is correct for a frequently deployed marketing+tool site.
