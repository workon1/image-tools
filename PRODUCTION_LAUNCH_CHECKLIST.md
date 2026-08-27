# Production launch checklist

Intended origin: `https://imagereshaper.com`

## Domain

- [x] HTTPS headers prepared in the app (HSTS)
- [ ] Custom domain resolving (Cloudflare NS present, **no A/AAAA yet**)
- [x] WWW → apex 301 in `next.config.ts` (activates once `www` is attached)
- [ ] DNS records in Cloudflare as Vercel instructs
- [ ] Domain added on the Vercel project

## SEO

- [x] robots.txt allow `/` + sitemap on `https://imagereshaper.com` (local production)
- [x] sitemap.xml only uses `https://imagereshaper.com`
- [x] Canonical / Open Graph from production origin
- [x] Unique titles / H1 / FAQ / JSON-LD / related tools
- [x] 404 `noindex`
- [x] Search-intent 301 aliases
- [x] Compress JPG / PNG / WebP landings
- [ ] Search Console property + sitemap submit

## Security

- [x] Magic-byte + MIME + size + pixel validation
- [x] No conversion API / no stored uploads
- [x] CSP, nosniff, DENY, Referrer-Policy, Permissions-Policy, HSTS (local production)
- [x] `npm audit --omit=dev` → 0
- [x] Temporary files: N/A (client blobs)

## Functional

- [x] Convert / compress / resize / crop / rotate / metadata / download
- [x] PNG↔WebP and compress format landings
- [x] Mobile header hamburger
- [x] Camera control on uploader

## Performance

- [x] Static HTML for content
- [x] No third-party ad/analytics scripts while flags off
- [ ] Core Web Vitals on the live domain

## Privacy

- [x] Privacy policy matches client-side processing
- [x] Terms
- [x] About
- [ ] Contact email

## Monetization

- [x] Ads flag off; AdSlot renders nothing
- [ ] ads.txt only after a real publisher ID
- [x] Download buttons are real downloads

## Monitoring

- [ ] Error monitoring
- [ ] Uptime monitor
- [ ] Analytics after domain is live
