# SEO launch checklist

Canonical origin in **code**: `https://imagereshaper.com`  
Live DNS: **not resolving yet** (Cloudflare nameservers only).

## Search Console (manual)

- [ ] Add property `https://imagereshaper.com`
- [ ] Verify (DNS TXT at Cloudflare, or Vercel HTML)
- [ ] Submit `https://imagereshaper.com/sitemap.xml`
- [ ] Confirm live `robots.txt` allows `/` and lists that sitemap
- [ ] Request indexing for `/`, `/compress-jpg`, `/png-to-jpg`, `/image-resizer`

## Must be true in production HTML (verified locally)

- [x] Canonical tags use `https://imagereshaper.com`, not localhost
- [x] No `noindex` on tool pages (`index, follow`)
- [x] 404 is `noindex`
- [x] FAQ JSON-LD present on tool landings
- [x] No `aggregateRating` / fake reviews
- [x] Redirect aliases return **301**
- [x] Sitemap URLs are the canonical host

## After DNS is live

- [ ] Apex + `www` both attached in Vercel (`www` 301 is already in Next config)
- [ ] Set Vercel `NEXT_PUBLIC_SITE_URL=https://imagereshaper.com` and redeploy
- [ ] New Search Console property + sitemap
- [ ] GitHub repo homepage = `https://imagereshaper.com`
