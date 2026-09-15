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
    heading: "Why photos appear sideways",
    paragraphs: [
      "When you turn a phone to take a picture, the sensor does not physically rotate. The camera records pixels in whatever orientation the sensor sits and then writes an EXIF orientation flag describing how a viewer should turn the image before displaying it. Photo apps on the phone read that flag, so the picture looks correct there.",
      "The trouble starts when the file travels. Some older desktop software, certain upload forms, and a number of content management systems ignore the flag entirely and display the raw pixel data, which appears rotated ninety degrees. Nothing is wrong with the file; two pieces of software simply disagree about how to read it.",
    ],
  },
  {
    heading: "What this tool does differently",
    paragraphs: [
      "Rotating here rewrites the actual pixels rather than changing a flag. The image is drawn onto a canvas at the angle you choose and re-encoded from scratch, so the exported file is upright in its raw data. Every viewer shows it the same way, whether or not it honours orientation metadata.",
      "That makes this the right fix when a photo looks correct on your phone but sideways after uploading somewhere. Changing the flag would not help, because the software causing the problem is the software ignoring the flag.",
    ],
  },
  {
    heading: "Rotate versus flip",
    paragraphs: [
      "Rotation turns the image around its centre in ninety degree steps, so a portrait becomes a landscape and back again. Flipping mirrors it across an axis without changing dimensions, producing a reversed image rather than a turned one.",
      "Horizontal flip is the one people usually want. Front-facing phone cameras often save selfies mirrored, so text in the background reads backwards and your parting appears on the wrong side. Flipping horizontally restores how you actually look to other people. Vertical flip is rarer, mostly useful for reflection effects and for scans fed into a scanner upside down.",
    ],
    bullets: [
      "90 degrees clockwise or counter-clockwise: fixes a portrait photo displaying as landscape.",
      "180 degrees: fixes a picture taken with the phone held upside down.",
      "Horizontal flip: corrects mirrored selfies and reversed text.",
      "Vertical flip: mostly for reflections and inverted scans.",
    ],
  },
  {
    heading: "Quality and format after rotating",
    paragraphs: [
      "Rotating by a quarter turn is lossless in principle, because every pixel simply moves to a new coordinate without interpolation. In practice the file is re-encoded on export, so choosing JPG or WebP applies a fresh round of lossy compression on top of whatever the original already had.",
      "For a single rotation at reasonable quality this is invisible. If you are rotating an image that was already compressed heavily, or you plan to edit further afterwards, export to PNG so no additional detail is discarded. Re-encoding also drops EXIF metadata, which means camera details and any GPS coordinates will not be present in the rotated copy.",
    ],
  },
];

export const metadataToolContent: ContentSection[] = [
  {
    heading: "What is hidden inside an image file",
    paragraphs: [
      "An image file contains more than the picture. Cameras and phones append a structured block of metadata called EXIF, which records how and when the photograph was taken. That typically includes the make and model of the device, the lens, aperture, shutter speed, ISO sensitivity, focal length, and a timestamp accurate to the second.",
      "Phones commonly add considerably more. If location services were enabled for the camera, the file stores GPS coordinates precise enough to identify a specific building, along with altitude and sometimes the direction the camera was pointing. Editing software may add its own tags, and some devices embed an owner name configured when the phone was first set up.",
    ],
  },
  {
    heading: "When that data becomes a problem",
    paragraphs: [
      "Metadata is genuinely useful when you are organising your own photo library. It becomes a liability the moment a file leaves your control, because whoever receives it can read everything you did not realise you sent.",
      "The risk is rarely dramatic; it is usually mundane and cumulative. A marketplace listing photographed in your living room carries your home coordinates. Pictures of children posted on a regular schedule reveal where they are and when. A holiday album uploaded while you are away confirms your house is empty. A document scan carries a timestamp that may contradict what you told the recipient.",
    ],
  },
  {
    heading: "How removal works here",
    paragraphs: [
      "This tool decodes the image, draws the pixels onto a canvas, and asks the browser to encode a brand new file from that canvas. Because the canvas holds only pixel data, none of the original metadata blocks are carried into the output. The result looks identical and contains nothing but the picture itself.",
      "The work happens entirely in your browser. That matters more here than for most tools: uploading a photograph to a remote server in order to strip its location data would mean handing that location to the server first, which rather defeats the purpose.",
    ],
  },
  {
    heading: "What stripping metadata does not do",
    paragraphs: [
      "Removing EXIF affects only the hidden data, not the visible content. If a street sign, house number, name badge, or company logo appears in the frame, it is still there afterwards. Anyone looking at the image can read it, and image search can often match a recognisable location regardless of coordinates.",
      "For genuine privacy, treat metadata removal as one step of two. Crop the picture so identifying detail falls outside the frame, then strip metadata from the cropped result. The Image Cropper handles the first part, also locally.",
    ],
    bullets: [
      "Removed: camera model, timestamps, GPS coordinates, exposure settings, software tags.",
      "Not removed: anything visible in the picture, such as signs, documents, faces, or landmarks.",
      "Not reversible: keep your original if the camera settings matter to you.",
    ],
  },
];

export const base64Content: ContentSection[] = [
  {
    heading: "What Base64 encoding is for",
    paragraphs: [
      "Base64 represents binary data using a limited set of text characters. Encoding an image this way lets you embed the picture directly inside a text file rather than referencing a separate image on disk or over the network. The result is a data URL that begins with a prefix describing the media type and continues with a long run of encoded characters.",
      "The practical benefit is eliminating a request. A small icon embedded as a data URL arrives with the HTML or stylesheet that references it, so the browser does not make a separate round trip to fetch it. For a handful of tiny assets on a latency-sensitive page, that can be worthwhile.",
    ],
  },
  {
    heading: "Where it genuinely helps",
    paragraphs: [
      "Base64 earns its place in a few specific situations, all involving small images or environments where an external file is awkward to manage.",
    ],
    bullets: [
      "Tiny interface icons inlined in CSS, where an extra request costs more than the bytes.",
      "Email templates, since many clients block externally hosted images by default but render inline data.",
      "Test fixtures and snapshot tests that need a deterministic image without a binary file in the repository.",
      "Single-file HTML documents or exported reports that must work with no accompanying assets.",
      "Configuration and JSON payloads where a binary attachment is not an option.",
    ],
  },
  {
    heading: "Why it is a poor default",
    paragraphs: [
      "Base64 is not a compression format; it is an encoding, and it makes data larger. Every three bytes of binary become four characters of text, so the encoded form is roughly a third bigger than the original file before you account for the data URL prefix. A 2 MB photograph becomes an unwieldy string of well over 2.7 MB embedded in your markup.",
      "Inlined data also cannot be cached independently. A referenced image file is downloaded once and reused across every page that points at it, but a data URL is re-downloaded as part of every document containing it. Inlining a logo across fifty pages means shipping that logo fifty times. Large strings slow down editors, bloat diffs, and make source files painful to review.",
    ],
  },
  {
    heading: "Keeping the string manageable",
    paragraphs: [
      "If you do need Base64, reduce the image before encoding rather than after. Resize it to the dimensions it will actually display at, convert it to an efficient format, and compress it. Encoding a properly prepared 8 KB icon produces a string you can reasonably paste into a stylesheet; encoding a camera original does not.",
      "As a rough guideline, inlining is defensible below about 10 KB and questionable above roughly 50 KB. Beyond that, serve a normal image file and let the browser cache it. Note that this tool encodes the bytes you give it exactly, including any EXIF metadata, so strip metadata first if the image carries location data you do not want embedded in source code.",
    ],
  },
];

export const faviconContent: ContentSection[] = [
  {
    heading: "Designing for sixteen pixels",
    paragraphs: [
      "A favicon is the small square identifying your site in a browser tab, a bookmark list, a search suggestion, and a phone home screen. In a tab it is typically rendered at sixteen or thirty-two device pixels. That is an extremely small canvas, and it is the constraint that should drive every design decision.",
      "Shrinking a full logo almost never works. Wordmarks blur into an unreadable smear, thin strokes disappear during downscaling, and detailed illustrations become visual noise. A favicon is better understood as a separate mark borrowing the logo's identity: usually one letter, a two-letter monogram, or a single distinctive shape lifted from the larger design.",
    ],
  },
  {
    heading: "What makes a mark survive",
    paragraphs: [
      "Marks that read clearly at small sizes share a short list of properties, and the ones that fail usually violate several at once.",
    ],
    bullets: [
      "Strong contrast between the foreground shape and its background.",
      "Thick strokes, since hairlines vanish or alias into grey mush when downscaled.",
      "At most two characters of text; three or more will not be legible.",
      "A shape that fills the square rather than floating inside generous padding.",
      "A solid background colour, because a transparent mark designed for light tabs disappears in dark mode.",
      "Few colours. Gradients and subtle shading are wasted at this scale.",
    ],
  },
  {
    heading: "The sizes that get requested",
    paragraphs: [
      "Different contexts ask for different files, and covering the common set avoids browsers falling back to a blurry upscale of whatever they can find. Sixteen and thirty-two pixels handle browser tabs on standard and high-density screens. Forty-eight covers Windows shortcuts. One hundred and eighty is the Apple touch icon used when someone adds your site to an iOS home screen. Android and progressive web apps request 192 and 512 pixel versions through the web app manifest.",
      "A favicon.ico at the site root is still worth providing. Some browsers and crawlers request that exact path directly regardless of what your HTML declares, and serving a 404 for it produces noise in your logs at best.",
    ],
  },
  {
    heading: "Generating and installing",
    paragraphs: [
      "This generator takes a square source image, crops from the centre, and exports the sizes above along with a favicon.ico, entirely in your browser. Start from the largest clean version of your mark you have, ideally 512 pixels square or more, because downscaling produces far better results than enlarging a small source.",
      "After downloading, place favicon.ico at your site root and reference the PNG sizes from your document head or your framework's metadata configuration. Then check the result in a private browsing window: browsers cache favicons unusually aggressively, and a correctly installed new icon can appear stale for days in a normal window.",
    ],
  },
];

export const heicContent: ContentSection[] = [
  {
    heading: "Why your iPhone photos will not open",
    paragraphs: [
      "Since iOS 11, Apple devices have saved photos as HEIC by default rather than JPG. HEIC is a container built on the HEIF standard, and it stores an image compressed with HEVC, the same technology behind modern video. The benefit is real: a HEIC photo is typically around half the size of an equivalent JPG at similar visual quality, which matters a great deal when a phone holds thousands of pictures.",
      "The drawback appears the moment a photo leaves the Apple ecosystem. Windows needs an extension from the Microsoft Store to preview HEIC. Many websites reject the format at upload. Older editors, print services, government portals, and plenty of Android apps simply do not recognise it. You end up with a photo that looks fine on your phone and is useless everywhere else.",
    ],
  },
  {
    heading: "What this converter does",
    paragraphs: [
      "Browsers do not ship with a HEIC decoder, which is why dragging one into a normal image tool usually fails. This page loads a decoder on demand the first time you convert, then decodes the photo and re-encodes it as JPG, PNG, or WebP using your device's own processing power.",
      "Because the decoding happens locally, the photo is never sent to a server. That is worth more than convenience here: HEIC files come straight from a phone camera and typically carry GPS coordinates and timestamps, so uploading one to an unknown converter hands over rather more than the picture.",
    ],
  },
  {
    heading: "Which output format to choose",
    paragraphs: [
      "JPG is the right answer for almost everyone. It is accepted universally, keeps file sizes reasonable, and is what any form or printer expects. Choose it unless you have a specific reason not to.",
      "PNG is worth choosing when you intend to edit the photo afterwards and want no additional lossy compression, though the file will be substantially larger than the HEIC you started with. WebP is a good choice when the destination is a modern website, since it will usually produce the smallest file of the three while keeping quality high.",
    ],
    table: {
      caption: "Picking an output format for a converted HEIC photo",
      columns: ["Output", "Best for", "Trade-off"],
      rows: [
        ["JPG", "Uploads, forms, email, printing, sharing", "Lossy, no transparency"],
        ["PNG", "Editing afterwards without further quality loss", "Much larger files"],
        ["WebP", "Publishing to a modern website", "Not accepted everywhere"],
      ],
    },
  },
  {
    heading: "Quality and file size",
    paragraphs: [
      "HEIC is already a lossy format, so converting to JPG or WebP applies a second round of lossy compression. This sounds worse than it is: at 85% quality the difference is not visible under normal viewing, and that is why it is the default here. Drop to 70% if you need a noticeably smaller file and can accept some softening in fine texture.",
      "Expect the JPG to be larger than the HEIC, often by fifty percent or more, because JPG is a less efficient format. That is the price of compatibility. If the resulting file is too large for an upload limit, run it through the Image Compressor or one of the fixed-size tools afterwards rather than pushing quality very low here.",
    ],
  },
  {
    heading: "Stopping your phone from creating HEIC",
    paragraphs: [
      "If you convert HEIC files regularly, it is easier to change the setting than to keep converting. On an iPhone or iPad, open Settings, tap Camera, tap Formats, and select Most Compatible. From that point new photos are captured as JPG.",
      "Two caveats. Photos already in your library stay HEIC, so you will still need to convert older pictures. And you give up the storage saving, which is meaningful if your device is nearly full. A reasonable compromise is to leave the phone on High Efficiency and convert only the photos you are about to share.",
    ],
    steps: [
      "Open Settings on your iPhone or iPad.",
      "Tap Camera, then tap Formats.",
      "Select Most Compatible to capture JPG instead of HEIC.",
      "To keep HEIC but share JPG, leave High Efficiency selected and convert individual photos here.",
    ],
  },
  {
    heading: "If a photo will not convert",
    paragraphs: [
      "Occasionally a file fails. The most common causes are a Live Photo or burst where the container holds multiple images, a depth or portrait capture with unusual auxiliary layers, or a file that was partially copied and is truncated. A photo transferred over a messaging app may also have been altered in transit.",
      "The most reliable workaround is to open the photo on the Apple device, export or share it as a copy, and convert that copy. Copying files directly from an iPhone over USB sometimes produces partial transfers, so sharing through AirDrop or a cloud folder often yields a cleaner file.",
    ],
  },
];
