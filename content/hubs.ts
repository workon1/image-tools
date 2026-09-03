import type { ContentSection } from "@/content/types";

export const homeContent: ContentSection[] = [
  {
    heading: "Why convert images in the browser?",
    paragraphs: [
      "Most online converters ask you to upload a photo to a remote server, wait for processing, then download the result. That workflow is fine for a public marketing asset, but it is a poor fit for screenshots that contain personal data, product shots that are not public yet, or ID scans you only need for a form. Image Reshaper keeps the entire pipeline on your device: the file is decoded with the browser’s image APIs, drawn to a canvas, re-encoded, and saved as a local download.",
      "Because nothing is sent to our servers for conversion, closing the tab is enough to discard the working copy. We still collect optional analytics about which tools people open (only after consent where required), but those events never include filenames, pixel data, or EXIF. The product exists so a search result can finish a small job without creating an account.",
    ],
  },
  {
    heading: "Choosing JPG, PNG, or WebP",
    paragraphs: [
      "JPG (JPEG) is the everyday format for photographs. It compresses well, but it cannot store transparency and it discards fine detail each time you re-save at a lower quality. PNG is lossless and can keep an alpha channel, which makes it the right choice for logos, UI screenshots, and graphics with sharp edges. The trade-off is file size: a PNG photo is often much larger than the same scene as JPG.",
      "WebP sits between them for many web use cases. It can be lossy or lossless, can keep transparency, and often beats JPG or PNG on byte size at a similar visual quality. Support in current Chrome, Edge, Firefox, and Safari is solid. Older desktop software, some email clients, and a few print workflows still expect JPG or PNG, which is why this site offers conversions in both directions.",
    ],
    bullets: [
      "Use JPG for photos destined for print forms, older apps, or maximum compatibility.",
      "Use PNG when you need lossless pixels or a transparent background.",
      "Use WebP when the destination is a modern website or app that already accepts it.",
    ],
  },
  {
    heading: "What you can do here",
    paragraphs: [
      "Beyond one-click format conversion, Image Reshaper includes an image compressor that aims for a target file size, dedicated landings for 100 KB and 200 KB caps, a resizer for exact pixel dimensions, a cropper with common social presets, rotate and flip tools, metadata stripping, Base64 export, and a favicon generator. Every available tool follows the same privacy rule: processing stays in the browser within the documented size and dimension limits.",
      "If you are new to the site, start with the converter on this page, then browse Available tools for the job you need. The guides section walks through common tasks such as shrinking a photo for an email attachment or converting JPG to PNG when you plan to edit transparency later.",
    ],
  },
];

export const converterHubContent: ContentSection[] = [
  {
    heading: "How the Image Converter works",
    paragraphs: [
      "Pick an input image (JPG, PNG, or WebP), choose the output format, adjust quality when the format supports it, and download the result. Under the hood we validate the file type and size, decode it, draw it to a canvas, and call the browser’s encoder. There is no server queue and no account gate. You can convert up to ten files in one batch, each up to 20 MB, with a maximum of 8192 pixels on a side and 25 megapixels total.",
      "Quality sliders apply to JPG and WebP outputs. PNG is lossless, so there is no quality knob—only a larger or smaller file depending on the pixel content. If your browser cannot encode WebP, you will see an error instead of a silent upload somewhere else. That failure mode is intentional: we would rather stop than invent a fake “cloud fallback.”",
    ],
  },
  {
    heading: "When to convert instead of compress or resize",
    paragraphs: [
      "Convert when the destination requires a different container: a CMS that rejects WebP, a form that only accepts JPG, or a design tool that needs PNG transparency. Compress when the format is already correct but the byte size is too large for an upload limit. Resize when the pixel dimensions are wrong for a thumbnail, avatar, or print template. Many workflows need more than one step—for example, resize, then compress to 100 KB—which is why each step is a separate tool you can chain locally.",
    ],
  },
  {
    heading: "Privacy and metadata",
    paragraphs: [
      "Re-encoding through the canvas produces a new file. Camera EXIF such as GPS coordinates is not copied into the download. If your goal is specifically to strip metadata while keeping the same format, use the Remove Image Metadata tool. Either way, the working bitmap never leaves this browser session for conversion.",
    ],
  },
];

export const compressorHubContent: ContentSection[] = [
  {
    heading: "What “target size” means here",
    paragraphs: [
      "The Image Compressor asks for a percentage of the original file size, not a JPEG quality label. Choosing 50% means we search for an encoding (and, if needed, a mild downscale) that lands at or under half the original bytes. JPEG and WebP sizes jump in steps, so the result may be a little under the cap. We never pad a file with junk bytes to hit an exact number.",
      "PNG is a poor target for heavy compression because it is lossless. When you start from PNG, the compressor writes JPG or WebP so the file can actually shrink. Dedicated pages exist for compressing JPG, PNG, or WebP inputs, and for hard caps at 100 KB or 200 KB when a form rejects anything larger.",
    ],
  },
  {
    heading: "Quality versus file size",
    paragraphs: [
      "Aggressive targets remove fine texture first: skin detail, foliage, and subtle gradients. Start around 60–70% of the original size for social uploads, then go lower only if a hard limit forces you. For email attachments, many people aim for 100–200 KB after resizing the longest edge to something like 1600 pixels. Shrinking dimensions before compressing almost always looks better than crushing quality on a huge photo.",
      "If the tool cannot meet the target even after scaling, it tells you clearly. That usually means the image is enormous or already highly compressed. Resize first, then try again.",
    ],
  },
];

export const resizerContent: ContentSection[] = [
  {
    heading: "When to resize an image",
    paragraphs: [
      "Resize when a platform asks for exact pixel dimensions, when a photo is far larger than a web layout needs, or when you want to shrink a file before compressing it. Uploading a 6000-pixel camera original to a blog that displays at 800 pixels wastes bandwidth and often trips upload limits. Setting the long edge to the display size first, then compressing, produces a cleaner result than compressing the giant original alone.",
      "This tool lets you set width and height directly and choose whether to lock the aspect ratio. Locking the ratio avoids stretching faces and logos. Unlocking it is useful for forced crops into a square avatar slot, though the dedicated cropper is usually clearer when you need to choose which part of the frame to keep.",
    ],
  },
  {
    heading: "Upscaling limits",
    paragraphs: [
      "Browsers can enlarge a small image, but they cannot invent real detail. Upscaling a 400-pixel icon to 2000 pixels will look soft. Prefer exporting at the size you need from the original source when you have it. Downscaling is the reliable direction for photos destined for the web, email, and most forms.",
    ],
  },
];

export const cropperContent: ContentSection[] = [
  {
    heading: "Cropping for platforms and print",
    paragraphs: [
      "Cropping changes composition without necessarily changing format. Social networks, marketplaces, and ID-card templates often expect fixed aspect ratios such as 1:1, 4:5, or 16:9. This cropper includes common presets so you can frame the subject once and download a file that fits the slot instead of discovering a bad auto-crop after upload.",
      "Cropping is also a privacy tool: you can remove a whiteboard, a browser tab, or a bystander from the edge of a screenshot before you share it. Combined with metadata removal, that keeps both the visible scene and hidden camera tags under your control.",
    ],
  },
  {
    heading: "Crop versus resize",
    paragraphs: [
      "Resize scales the whole image. Crop discards pixels outside a rectangle. If a site wants 1080×1080 and your photo is 4000×3000, crop to a square first (or use a square preset), then resize to 1080 if needed. Doing only a stretch-to-square resize will distort the subject.",
    ],
  },
];

export const rotateContent: ContentSection[] = [
  {
    heading: "Fix orientation without another app",
    paragraphs: [
      "Phones sometimes save photos with an orientation flag instead of rotating the pixels. Some viewers honor that flag; others show the image on its side. Rotating here rewrites the pixels so the download looks upright everywhere. Flip tools mirror the image horizontally or vertically, which is useful for mockups and for fixing a selfie taken in a mirror.",
      "Rotation is lossless in intent for 90-degree steps, but the file is still re-encoded through the canvas, so choose PNG when you need a lossless container afterward, or JPG/WebP when size matters more.",
    ],
  },
];

export const metadataToolContent: ContentSection[] = [
  {
    heading: "Why strip image metadata?",
    paragraphs: [
      "Photos from cameras and phones often embed EXIF data: camera model, timestamps, and sometimes GPS coordinates. Screenshots and exports can carry other tags. If you are posting a picture of your home, a travel photo, or a document scan, that hidden data may reveal more than the pixels do. This tool re-encodes the image so the download no longer carries those fields.",
      "Stripping metadata does not blur faces or crop backgrounds. Combine it with the cropper when the visible content also needs editing. Processing stays in the browser within the same size limits as the other tools.",
    ],
  },
];

export const base64Content: ContentSection[] = [
  {
    heading: "When Base64 helps",
    paragraphs: [
      "Base64 turns binary image bytes into text you can paste into HTML data URLs, CSS, Markdown, or JSON fixtures. It is handy for tiny icons and test fixtures. It is a poor fit for large photos because the text form is about a third larger than the binary file and can choke editors.",
      "Prefer linking to a normal image file for anything beyond a small asset. When you do need Base64, convert a compressed or resized version first so the string stays manageable.",
    ],
  },
];

export const faviconContent: ContentSection[] = [
  {
    heading: "Creating a favicon from an image",
    paragraphs: [
      "A favicon is the small icon in a browser tab. Starting from a square logo with a simple shape works better than a busy photograph. This generator helps you export sizes commonly expected by browsers and home-screen bookmarks. Keep contrast high so the mark stays readable at 16×16 pixels.",
      "After download, place the files according to your site’s framework docs (for example in a public folder) and reference them from your HTML or app metadata.",
    ],
  },
];
