import type { ContentSection } from "@/content/types";

export const conversionPairContent: Record<string, ContentSection[]> = {
  "jpg-to-png": [
    {
      heading: "When JPG to PNG is the right move",
      paragraphs: [
        "Convert JPG to PNG when you need a lossless working file, when you plan to edit the image further without stacking JPEG artifacts, or when a tool in your pipeline only exports cleanly from PNG. PNG will not restore detail that JPEG already discarded—once fine texture is gone, no container can invent it back. What you gain is a stable pixel grid that does not lose more quality on every save.",
        "Designers sometimes convert a photo to PNG before cutting out a subject or adding a transparent background in another editor. The PNG itself does not create transparency from a JPG (the photo still has an opaque rectangle), but it is a better intermediate for editors that expect lossless input.",
      ],
    },
    {
      heading: "File size expectations",
      paragraphs: [
        "A PNG made from a photograph is usually much larger than the original JPG. That is normal: lossless compression cannot match JPEG’s aggressive discard of detail. If your goal is a smaller upload, stay on JPG or switch to WebP instead. Use JPG→PNG when correctness and editability matter more than bytes.",
      ],
      bullets: [
        "Good for: editing pipelines, print prep, archiving a frame without further JPEG loss.",
        "Poor for: email attachments and strict upload caps—compress or use WebP instead.",
      ],
    },
  ],
  "png-to-jpg": [
    {
      heading: "Why convert PNG to JPG",
      paragraphs: [
        "PNG screenshots and exports are often huge because every pixel is preserved. JPG is almost always smaller for photos and soft gradients, which makes it the better choice for blogs, email, and forms that reject multi‑megabyte PNGs. The important trade-off: JPG has no alpha channel. Transparent areas become white in this tool so the result remains a valid JPEG.",
        "If you need a small file and the image has transparency you must keep, convert PNG to WebP instead. If the destination only accepts JPG, flatten on a background color you can live with (here, white) before upload.",
      ],
    },
    {
      heading: "Picking a quality setting",
      paragraphs: [
        "Quality around 80% is a strong default for photographs: visible damage is rare while the file drops sharply versus PNG. Go lower for thumbnails and higher for hero images. Each re-encode can add artifacts, so avoid bouncing the same photo through JPG many times. Prefer editing on PNG or the original, then export JPG once.",
      ],
    },
  ],
  "jpg-to-webp": [
    {
      heading: "Why sites prefer WebP",
      paragraphs: [
        "WebP often delivers the same perceived quality as JPG at a smaller size, which helps pages load faster on mobile networks. Converting a library of JPGs to WebP is a common optimization before publishing. This page does that conversion locally so you can preview the result before replacing assets in your project.",
        "Confirm that your CMS, CDN, or email template accepts WebP. If a stakeholder opens the file in older software and sees a broken icon, keep a JPG fallback or convert back with WebP to JPG.",
      ],
    },
    {
      heading: "Quality and compatibility",
      paragraphs: [
        "Use the quality slider to balance size and detail. Modern browsers decode WebP fine; the friction is usually editorial tools, some print drivers, and legacy intranet apps. When in doubt, test one image in the destination before batch-converting a whole folder.",
      ],
    },
  ],
  "webp-to-jpg": [
    {
      heading: "Opening WebP where JPG is required",
      paragraphs: [
        "You downloaded a WebP from the web, but the printer, LMS, or government form only lists JPG and PNG. This converter produces a JPG on your device so you can continue without installing desktop software. Transparency in the WebP, if any, is flattened because JPG cannot store alpha.",
        "Expect a second lossy step if the WebP was already lossy. Start with quality 80 or higher unless you are chasing a tiny attachment size. For a lossless handoff into an editor, use WebP to PNG instead.",
      ],
    },
  ],
  "png-to-webp": [
    {
      heading: "Shrinking PNG graphics for the web",
      paragraphs: [
        "UI screenshots, illustrations, and logos saved as PNG are crisp but heavy. WebP can keep sharp edges and transparency while cutting bytes for production sites. That makes PNG→WebP one of the highest-value conversions for front-end performance when your stack already serves WebP.",
        "Keep the original PNG in source control if you need a lossless master. Publish WebP (with a PNG or JPG fallback if your audience still needs one). Animated WebP is outside the scope of this still-image tool.",
      ],
    },
    {
      heading: "Transparency",
      paragraphs: [
        "Unlike JPG, WebP can retain an alpha channel. Soft shadows and cut-out subjects should remain usable on modern browsers. Always spot-check the download over both light and dark backgrounds.",
      ],
    },
  ],
  "webp-to-png": [
    {
      heading: "WebP to PNG for editing and compatibility",
      paragraphs: [
        "Some design tools, printers, and enterprise apps still refuse WebP. PNG is the widely supported lossless option when you need every pixel preserved after decode. The PNG will often be larger than the WebP; that is the cost of a compatible lossless file.",
        "If you only need compatibility and not lossless fidelity, WebP to JPG may yield a smaller result. Choose PNG when you will edit further, need transparency, or must avoid another lossy encode.",
      ],
    },
  ],
};

export const compressPageContent: Record<string, ContentSection[]> = {
  "compress-to-100kb": [
    {
      heading: "Why 100 KB is a common limit",
      paragraphs: [
        "Government portals, school admissions, visa uploads, and older HR systems often cap images at 100 KB. Hitting that number with a phone photo is hard without help: a single HEIC or JPG from a modern camera can be several megabytes. This tool repeatedly adjusts encoding quality and, if needed, scales the image down until the file is at or under 100 KB—or tells you it cannot get there.",
        "For best results, crop or resize to the dimensions the form actually displays before you chase 100 KB. A 4000-pixel image crushed to 100 KB looks worse than a 1200-pixel image compressed gently to the same cap.",
      ],
    },
    {
      heading: "What “under 100 KB” costs visually",
      paragraphs: [
        "Expect softer detail and possible banding in skies or gradients on difficult photos. That is usually acceptable for identity thumbnails and document selfies where the reviewer only needs recognition, not print quality. If the result is unreadable, increase dimensions slightly in a retake or use a simpler background with more even lighting.",
      ],
    },
  ],
  "compress-to-200kb": [
    {
      heading: "When 200 KB is enough",
      paragraphs: [
        "A 200 KB cap is common for email attachments, ticketing systems, and profile photos that need a bit more detail than a 100 KB ID shot. It is also a practical target for blog images after you have resized the long edge. This page aims for 200 KB or less using the same local search as the 100 KB tool, just with a higher ceiling.",
        "If your form allows 500 KB or 1 MB, do not crush to 200 KB by default—higher limits usually look better. Use this page when the written limit is 200 KB or when a mail server rejects larger attachments.",
      ],
    },
  ],
  "compress-jpg": [
    {
      heading: "Compressing JPEG without a quality myth",
      paragraphs: [
        "Many tools expose a “quality 60” slider and leave you guessing how large the file will be. Here the control is the output size as a percent of the original bytes. That matches how upload errors are written (“max 500 KB”) more closely than abstract quality scores.",
        "Start with 50–70% of the original size for web photos. If you still miss a hard kilobyte limit, switch to the 100 KB or 200 KB tools, or resize the long edge first. Re-compressing the same JPG repeatedly stacks artifacts; prefer one careful export from a larger master.",
      ],
    },
  ],
  "compress-png": [
    {
      heading: "PNG input, smaller output",
      paragraphs: [
        "Re-saving a PNG as PNG rarely helps much because the format is lossless. This page accepts PNG and writes a smaller JPG or WebP so screenshots and exports can clear upload caps. Transparency is not preserved in JPG; choose WebP output when you must keep alpha and the destination supports WebP.",
        "For icons that must stay PNG, simplify the image (fewer colors, smaller dimensions) in an editor, or accept that a lossless format has a floor on size. For photographs mistakenly saved as PNG, conversion plus compression is the right path.",
      ],
    },
  ],
  "compress-webp": [
    {
      heading: "Tightening WebP files",
      paragraphs: [
        "WebP is already efficient, but exports from design tools can still overshoot a CMS limit. This page starts from WebP and searches for a smaller WebP (or lets you compare with JPG if you switch output in the general compressor). Because WebP can be lossy, another pass can soften detail—preview before you replace production assets.",
        "If a partner cannot open WebP, compress and then convert to JPG with the converter tools rather than emailing a format they cannot preview.",
      ],
    },
  ],
};
