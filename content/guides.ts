import type { ContentSection, GuideMeta } from "@/content/types";

export const guides: GuideMeta[] = [
  {
    slug: "compress-image-to-100kb",
    title: "How to Compress an Image to 100 KB",
    description:
      "A practical walkthrough for meeting strict 100 KB upload limits on government, exam, and job portals without making the photo unreadable.",
    updated: "2026-09-15",
  },
  {
    slug: "jpg-vs-png-vs-webp",
    title: "JPG vs PNG vs WebP: Which Format Should You Use?",
    description:
      "A direct comparison of the three formats every website and upload form expects, with a decision table and the trade-offs that actually matter.",
    updated: "2026-09-15",
  },
  {
    slug: "convert-jpg-to-png",
    title: "How to Convert JPG to PNG Without Losing More Quality",
    description:
      "What JPG to PNG conversion can and cannot fix, why the file gets bigger, and when the conversion is genuinely worth doing.",
    updated: "2026-09-15",
  },
  {
    slug: "resize-images-for-social-media",
    title: "How to Resize Images for Social Media",
    description:
      "Aspect ratios and pixel dimensions for Instagram, Facebook, LinkedIn, X, YouTube, TikTok, and Pinterest, plus a workflow that avoids distorted faces.",
    updated: "2026-09-15",
  },
  {
    slug: "reduce-photo-size-for-email",
    title: "How to Reduce Photo Size for Email Attachments",
    description:
      "Why mail servers reject large attachments, what size to aim for, and how to shrink a batch of photos without mailing a zip file.",
    updated: "2026-09-15",
  },
  {
    slug: "remove-exif-gps-from-photos",
    title: "How to Remove EXIF and GPS Data From Photos",
    description:
      "What metadata your camera embeds, when it becomes a privacy problem, and how to strip it before you post or send a picture.",
    updated: "2026-09-15",
  },
  {
    slug: "browser-image-privacy",
    title: "Why Browser-Side Image Tools Are More Private",
    description:
      "How local conversion differs from upload-based converters, what each model does with your file, and what still leaves your device.",
    updated: "2026-09-15",
  },
  {
    slug: "image-size-for-website-speed",
    title: "How to Optimize Images for Website Speed",
    description:
      "Image weight is usually the largest part of a page. Here is how to size, format, and compress images so pages load fast on mobile networks.",
    updated: "2026-09-15",
  },
  {
    slug: "passport-photo-size-requirements",
    title: "Preparing Passport and ID Photos for Online Forms",
    description:
      "Common dimension and file-size rules for identity documents, and how to crop and compress a photo so a portal accepts it on the first try.",
    updated: "2026-09-15",
  },
  {
    slug: "how-to-make-a-favicon",
    title: "How to Make a Favicon From an Image",
    description:
      "Which icon sizes browsers and phones actually request, how to design a mark that survives 16 pixels, and how to install the files.",
    updated: "2026-09-15",
  },
];

export const guideContent: Record<string, ContentSection[]> = {
  "compress-image-to-100kb": [
    {
      heading: "Why so many forms demand 100 KB",
      paragraphs: [
        "A 100 KB cap looks arbitrary until you consider where it comes from. Government portals, university admission systems, recruitment sites, and exam boards were often built years ago against slow connections and modest storage budgets. Each applicant might submit a photo, a signature, and several document scans. Multiply that by a few million submissions and a generous limit becomes an expensive problem, so the limit is set low and rarely revisited.",
        "The result is a familiar frustration: a photo straight from a modern phone is typically between two and eight megabytes, which is twenty to eighty times over the limit. The portal rejects it with an unhelpful error, and you are left guessing whether to crop, resize, or re-save. The good news is that reaching 100 KB is almost always possible while keeping the photo perfectly usable, provided you shrink in the right order.",
      ],
    },
    {
      heading: "Read the requirements before you compress",
      paragraphs: [
        "Compression is the last step, not the first. Before you touch any tool, find the page on the portal that lists the photo specification. Most forms state more than a file-size cap, and missing one of the other rules means a rejection even when the bytes are correct.",
        "Write down every constraint you can find. If the portal specifies minimum dimensions, you cannot shrink the image below them just to hit the size target, which changes your whole approach.",
      ],
      bullets: [
        "Maximum file size, usually stated in KB rather than MB.",
        "Accepted formats. JPG is nearly universal; PNG is sometimes rejected outright.",
        "Minimum and maximum pixel dimensions, often something like 200×230 or 350×450.",
        "Background colour requirements for identity photos, commonly plain white or light blue.",
        "Whether a separate signature image is required, usually with its own smaller limit.",
      ],
    },
    {
      heading: "The order that actually works",
      paragraphs: [
        "Most people fail at this task because they immediately crush quality on a huge image. Compressing a 4000-pixel photo down to 100 KB forces the encoder to throw away enormous amounts of information, and the result looks blocky and smeared. The fix is to remove unnecessary pixels first, so the compressor has far less to discard.",
        "Work through these steps in order and you will usually land under the limit with a photo that still looks clean.",
      ],
      steps: [
        "Crop to the subject. For an identity photo this means head and shoulders filling the frame, with empty background removed. Cropping alone can cut file size dramatically because you are literally deleting pixels.",
        "Resize to the dimensions the form needs, or slightly above them. If the portal displays the photo at 350×450, there is no reason to submit 3000×4000. Use the Image Resizer with aspect ratio locked.",
        "Compress to the target. Run the Compress to 100 KB tool, which searches encoding settings automatically until the file fits under the cap.",
        "Verify the result. Check the downloaded file's actual size in your file manager before uploading. Some systems enforce the limit strictly and reject a file at 100.4 KB.",
        "Open the file and look at it. If the face is unrecognisable or text in a document scan is unreadable, go back and retake or rescan rather than submitting something a reviewer will reject.",
      ],
    },
    {
      heading: "What 100 KB costs you visually",
      paragraphs: [
        "Compression removes the information your eye is least likely to miss, which means fine texture disappears first. At an aggressive target you should expect softer skin detail, slightly muddier hair, and visible banding in smooth gradients such as a plain wall or an overcast sky. Sharp edges and strong contrast survive much better than subtle tonal transitions.",
        "For an identity thumbnail this is almost always acceptable, because the reviewer only needs to confirm that the photo matches the person. For a document scan the priority is different: text must stay legible. If letters start to blur, increase the dimensions rather than accepting a smaller file, and consider scanning in grayscale, which compresses more efficiently than colour for text.",
      ],
    },
    {
      heading: "When you cannot reach the target",
      paragraphs: [
        "Occasionally a photo resists compression. The usual causes are very large dimensions that you have not reduced, a busy background full of fine detail such as foliage or a bookshelf, or heavy sensor noise from a picture taken in low light. Noise is particularly expensive to store because it looks random to the encoder, so it cannot be compressed away cheaply.",
        "If you are stuck, retake the photo rather than fighting the file. Stand in even, indirect daylight, put a plain wall behind you, and hold the camera steady. A clean, well-lit photo at modest dimensions compresses to a fraction of the size of a noisy one, and it will look better to whoever reviews it.",
      ],
    },
    {
      heading: "Doing it privately",
      paragraphs: [
        "Identity photos and document scans are exactly the kind of file you should think twice about uploading to an unknown server. The Compress to 100 KB tool on this site performs the entire search in your browser, so the image never travels to us to be processed. If you need a different ceiling, the Compress to 200 KB tool follows the same approach with a higher cap, and the general Image Compressor lets you target any percentage of the original size.",
      ],
    },
  ],

  "jpg-vs-png-vs-webp": [
    {
      heading: "Three formats, three different jobs",
      paragraphs: [
        "Almost every image you handle on the web is one of three formats, and most confusion comes from treating them as interchangeable. They are not. Each was designed for a different problem, and picking the wrong one means either a bloated file or a visibly damaged image.",
        "JPEG, usually written JPG, arrived in 1992 and was built for photographs. It uses lossy compression, meaning it permanently discards detail the human eye is unlikely to notice in exchange for a dramatically smaller file. PNG arrived a few years later as a lossless format for graphics, preserving every pixel exactly and adding support for transparency. WebP, released by Google in 2010, is the modern attempt to cover both jobs at once with better compression than either.",
      ],
    },
    {
      heading: "The quick decision table",
      paragraphs: [
        "If you want a single answer without the reasoning, this table covers the overwhelming majority of real cases.",
      ],
      table: {
        caption: "Choosing a format by what you are actually doing",
        columns: ["What you have", "Best format", "Why"],
        rows: [
          ["Photograph for a website", "WebP", "Smallest file at equivalent quality; supported by all current browsers"],
          ["Photograph for a form or printer", "JPG", "Universally accepted, including by older and offline software"],
          ["Logo or icon with transparency", "PNG", "Lossless and supports an alpha channel; edges stay crisp"],
          ["Screenshot containing text", "PNG", "Lossy compression smears small text; lossless keeps it readable"],
          ["Illustration for a modern website", "WebP", "Keeps transparency and sharp edges at a smaller size than PNG"],
          ["Master copy you will edit later", "PNG", "No generation loss when you re-save repeatedly"],
          ["Email attachment", "JPG", "Small and guaranteed to open in any mail client"],
        ],
      },
    },
    {
      heading: "Why JPG is still everywhere",
      paragraphs: [
        "JPG survives because its compatibility is effectively total. Every browser, operating system, printer driver, photo kiosk, government portal, and decades-old enterprise application can open a JPG. When a form lists accepted formats, JPG is always among them. That reliability is worth more than a few kilobytes in any situation where you cannot control what software the recipient uses.",
        "Its weaknesses are specific and worth knowing. JPG cannot store transparency, so any transparent area is flattened onto a solid background, usually white. It also loses quality every time you save, which is called generation loss. Opening a JPG, making a small edit, and saving it repeatedly will visibly degrade the image over several cycles, so keep a lossless master if you expect to edit more than once.",
      ],
    },
    {
      heading: "Why PNG files get so large",
      paragraphs: [
        "PNG is lossless, which means it stores enough information to reconstruct the original pixels exactly. For a logo with twelve flat colours, that is extremely efficient, because large uniform areas compress down to almost nothing. For a photograph, where practically every pixel differs slightly from its neighbours, there is very little repetition to exploit, and the file balloons.",
        "This is why a photo saved as PNG can easily be five to ten times larger than the same photo as JPG at a quality most people cannot distinguish. If you have a large PNG that turns out to be a photograph, converting it to JPG or WebP is usually the single biggest file-size win available to you.",
      ],
      bullets: [
        "PNG excels at: logos, icons, screenshots, diagrams, flat illustrations, anything with transparency.",
        "PNG is a poor choice for: photographs, scanned pages, and anything destined for an attachment size limit.",
      ],
    },
    {
      heading: "Where WebP fits now",
      paragraphs: [
        "WebP is the format most people should be using for the web and most are not, largely out of habit. It handles both lossy and lossless compression, supports transparency like PNG, and typically produces files noticeably smaller than either JPG or PNG at comparable visual quality. For a content-heavy page, switching images to WebP is often the easiest performance improvement available.",
        "The remaining friction is not browser support, which has been solid across Chrome, Edge, Firefox, and Safari for years. It is everything outside the browser: some desktop editors, a few print workflows, older intranet applications, and the occasional email client still do not recognise it. The practical rule is to use WebP when you control the destination and know it is a modern web context, and fall back to JPG when you are handing a file to someone else and cannot verify what they will open it with.",
      ],
    },
    {
      heading: "A note on converting between them",
      paragraphs: [
        "Conversion cannot recover information that has already been discarded. Converting a heavily compressed JPG to PNG produces a large, lossless copy of a damaged image, not a repaired one. Similarly, converting JPG to WebP and back to JPG applies lossy compression twice, compounding the artefacts.",
        "The healthy pattern is to keep one high-quality master, ideally lossless or a camera original, and export from that master to whatever format each destination needs. Convert once, not repeatedly. All of the conversions discussed here are available on this site and run entirely in your browser.",
      ],
    },
  ],

  "convert-jpg-to-png": [
    {
      heading: "What the conversion actually does",
      paragraphs: [
        "Converting JPG to PNG changes the container and the compression method, not the content. The decoder reads your JPG, reconstructs the pixel grid as accurately as the format allows, and the encoder writes those exact pixels into a PNG. From that point forward the image is lossless: you can open and re-save it as many times as you like without further degradation.",
        "What conversion cannot do is undo the compression that was already applied. JPEG permanently discards detail when the file is first created. If your source has visible blocking around edges, colour smearing in fine textures, or a soft, mushy quality, PNG will faithfully preserve every one of those flaws at a larger file size. This surprises people who expect a lossless format to mean a better picture.",
      ],
    },
    {
      heading: "Legitimate reasons to convert",
      paragraphs: [
        "Despite that caveat, the conversion is genuinely useful in several situations, all of which share a common theme: you are about to do something to the image that would suffer from further lossy compression.",
      ],
      bullets: [
        "You are starting an editing session and will save intermediate versions. Working in PNG avoids stacking new JPEG artefacts on top of old ones with each save.",
        "A design tool, printer, or piece of enterprise software refuses JPG or handles it poorly.",
        "You plan to cut out the subject and add a transparent background. The JPG itself has no transparency, but PNG is the format that can hold the result.",
        "You are archiving a specific frame and want to guarantee it will never degrade further.",
        "You need to overlay the image on varied backgrounds and want crisp edges without recompression halos.",
      ],
    },
    {
      heading: "The transparency misunderstanding",
      paragraphs: [
        "This is the single most common confusion around JPG to PNG. PNG supports an alpha channel, which stores per-pixel transparency. JPG does not. Because of that, people often assume that converting a JPG to PNG will make its background transparent.",
        "It will not. A JPG is always a fully opaque rectangle of pixels. Converting it produces a PNG that is also a fully opaque rectangle; the file simply now has the capability to store transparency that it is not using. Making the background actually transparent requires a separate editing step where you select and delete the background, which is image editing rather than format conversion.",
      ],
    },
    {
      heading: "Expect a much larger file",
      paragraphs: [
        "A photograph converted from JPG to PNG commonly grows by a factor of five or more. A 1.2 MB JPG can easily become an 8 MB PNG. This is not a bug or a bad setting; it is the arithmetic of lossless compression applied to photographic content where almost no pixel repeats its neighbour.",
        "If your reason for converting was to get a smaller or better file for the web, PNG is the wrong direction entirely. Compress the JPG further, or convert it to WebP, which will usually beat the original JPG on size while keeping comparable quality.",
      ],
    },
    {
      heading: "A workflow that avoids the trap",
      paragraphs: [
        "The reliable pattern is to convert at the start of an editing process and never in the middle of a publishing one.",
      ],
      steps: [
        "Keep the camera original or highest-quality source you have, and do not overwrite it.",
        "Convert a copy to PNG when you need a lossless working file for editing.",
        "Do all your cropping, retouching, and compositing on that PNG.",
        "Export a final JPG or WebP once, at the end, sized for wherever it is going.",
        "Publish the exported file, and keep the PNG only if you expect to revise the work later.",
      ],
    },
    {
      heading: "Converting privately",
      paragraphs: [
        "The JPG to PNG tool on this site decodes and re-encodes entirely in your browser using the Canvas API, so the image is never sent to a server to be converted. One side effect worth knowing is that re-encoding through a canvas does not carry across the original EXIF metadata, so camera model, timestamps, and any GPS coordinates are dropped from the PNG. If stripping metadata is your actual goal rather than a side effect, the dedicated Remove Image Metadata tool is the clearer choice.",
      ],
    },
  ],

  "resize-images-for-social-media": [
    {
      heading: "Aspect ratio matters more than pixel count",
      paragraphs: [
        "The most common social media image mistake is worrying about resolution while ignoring shape. Every platform crops uploads to fit fixed slots. If you hand Instagram a wide landscape photo for a square post, it will crop the sides off, and it will make that decision without consulting you. The subject you carefully framed can end up half out of shot.",
        "Decide the aspect ratio first, crop deliberately to that shape so you control what survives, and only then worry about pixel dimensions. Getting this order right eliminates most bad social crops before they happen.",
      ],
    },
    {
      heading: "Dimensions by platform",
      paragraphs: [
        "These are the sizes that currently work well across the major networks. Platforms adjust their layouts periodically, so treat these as reliable defaults rather than permanent law, and check the official help pages if something looks wrong after upload.",
      ],
      table: {
        caption: "Common social image dimensions and ratios",
        columns: ["Platform and placement", "Ratio", "Pixels"],
        rows: [
          ["Instagram square post", "1:1", "1080 × 1080"],
          ["Instagram portrait post", "4:5", "1080 × 1350"],
          ["Instagram story or reel", "9:16", "1080 × 1920"],
          ["Facebook feed image", "1.91:1", "1200 × 630"],
          ["Facebook cover photo", "≈2.7:1", "820 × 312"],
          ["X (Twitter) in-stream image", "16:9", "1600 × 900"],
          ["LinkedIn shared post image", "1.91:1", "1200 × 627"],
          ["YouTube thumbnail", "16:9", "1280 × 720"],
          ["TikTok video cover", "9:16", "1080 × 1920"],
          ["Pinterest standard pin", "2:3", "1000 × 1500"],
          ["Profile photo (most platforms)", "1:1", "400 × 400 or larger"],
        ],
      },
    },
    {
      heading: "Crop first, then resize",
      paragraphs: [
        "Cropping and resizing are different operations and people frequently conflate them. Cropping discards pixels outside a rectangle you choose, changing composition and shape. Resizing scales the entire image up or down, changing pixel dimensions while keeping everything in frame.",
        "If a platform wants a square and your photo is 4000×3000, resizing alone to 1080×1080 will squash everyone in the picture horizontally. You need to crop to a square first, deciding what to lose, and then resize the square result down to 1080. The Image Cropper includes presets for the common ratios, and the Image Resizer handles the final scaling with aspect ratio locked.",
      ],
      steps: [
        "Pick the placement you are posting to and note its ratio from the table above.",
        "Open the Image Cropper, choose the matching ratio preset, and position the box so the subject sits where you want it.",
        "Check the edges. Faces near a border often get clipped by profile-photo circles, so leave margin.",
        "Resize the cropped result to the recommended pixel dimensions with aspect ratio locked.",
        "If the platform rejects the upload for size, compress the result rather than shrinking dimensions further.",
      ],
    },
    {
      heading: "Do not upload more pixels than needed",
      paragraphs: [
        "Uploading a 6000-pixel camera original does not produce a sharper post. Every platform re-encodes and downscales what you send, using its own compression settings that you have no control over. Handing it an enormous file simply means the platform's compressor makes more aggressive decisions, and the result is often worse than if you had exported a correctly sized image yourself.",
        "Resizing to roughly the recommended dimensions before upload gives you control over the downscale, which is the step that most affects perceived sharpness. It also uploads faster on mobile data.",
      ],
    },
    {
      heading: "File size and format for social",
      paragraphs: [
        "Use JPG for photographs, which is what every platform expects and optimises for. Use PNG when the image contains text overlays, a logo, or flat graphics, because lossy compression smears small lettering. WebP is increasingly accepted but support varies by platform and by upload path, so JPG remains the safer default for photos.",
        "If an upload is rejected for being too large, run it through the Image Compressor rather than reducing dimensions below the recommended size. Dropping from 1080 to 600 pixels to save bytes will look noticeably soft on a modern phone screen, whereas moderate compression at full size usually will not.",
      ],
    },
  ],

  "reduce-photo-size-for-email": [
    {
      heading: "Why email rejects your photos",
      paragraphs: [
        "Most mail providers cap attachments at around 25 MB, and many corporate mail servers are configured far lower, sometimes at 10 MB or even 5 MB. The limit applies to the encoded message, not the raw files, and email encoding inflates attachments by roughly a third. A batch of files that looks like 20 MB on disk can exceed a 25 MB limit once it is packaged for sending.",
        "The problem compounds quickly with phone photos. A single modern smartphone image is often three to eight megabytes, so five holiday pictures can breach a corporate limit on their own. The bounce message you receive is usually cryptic, and it often arrives hours later, which is why it is worth sizing images correctly before you hit send.",
      ],
    },
    {
      heading: "What size to aim for",
      paragraphs: [
        "There is no single correct answer, but these targets work well in practice and keep photos looking good on the screens people actually read email on.",
      ],
      table: {
        caption: "Practical targets for emailed images",
        columns: ["Purpose", "Long edge", "File size"],
        rows: [
          ["Quick reference photo or screenshot", "1200 px", "100–200 KB"],
          ["Photo the recipient will actually look at", "1600 px", "200–500 KB"],
          ["Photo the recipient may print at A4", "2400 px", "1–2 MB"],
          ["Document scan with text", "2000 px", "200–400 KB, grayscale if possible"],
          ["Several photos in one message", "1600 px each", "under 300 KB each"],
        ],
      },
    },
    {
      heading: "The two-step shrink",
      paragraphs: [
        "Resizing and compressing do different jobs and work best together. Resizing reduces the number of pixels, which is the dominant factor in file size. Compression then reduces how many bytes each remaining pixel costs. Doing only the second on a huge image forces harsh quality settings; doing both lets each work gently.",
      ],
      steps: [
        "Resize the long edge to around 1600 pixels using the Image Resizer, with aspect ratio locked.",
        "Compress the result to roughly half its size with the Image Compressor, or to a fixed cap with the 200 KB tool.",
        "Check the downloaded file size, then attach it.",
        "For several photos, repeat per image rather than sending one giant message, or use your mail provider's cloud link option for anything over the limit.",
      ],
    },
    {
      heading: "When to send a link instead",
      paragraphs: [
        "Compression has limits, and there are cases where shrinking is the wrong answer. If the recipient needs full-resolution originals for printing, editing, or archival, do not degrade them to fit an attachment. Use a shared link from your cloud storage, which most mail clients now offer directly in the compose window when they detect a large attachment.",
        "The rule of thumb: compress when the recipient will look at the photo, and link when the recipient will work with it. Sending a heavily compressed image to a printer or designer wastes everyone's time, because they will simply ask for the original.",
      ],
    },
    {
      heading: "Strip metadata before you send",
      paragraphs: [
        "Photos carry more than pixels. Camera originals typically embed the device model, the exact timestamp, and often GPS coordinates showing precisely where the picture was taken. Emailing a holiday photo to a colleague can inadvertently share your home address if the picture was taken in your garden.",
        "Running the file through the Remove Image Metadata tool before attaching removes those fields. Compression through this site's tools also re-encodes the image, which drops most metadata as a side effect, but the dedicated tool is the explicit way to do it when privacy is the actual goal rather than a bonus.",
      ],
    },
  ],

  "remove-exif-gps-from-photos": [
    {
      heading: "What your camera writes into every photo",
      paragraphs: [
        "Every time a camera or phone saves a picture, it embeds a block of structured data alongside the pixels. The standard is called EXIF, short for Exchangeable Image File Format, and it was designed to help photographers understand how a shot was taken. It records the camera make and model, the lens, aperture, shutter speed, ISO, focal length, and the exact date and time down to the second.",
        "On a phone, it usually records considerably more. If location services were enabled for the camera, the file contains GPS coordinates accurate to within a few metres, along with altitude and sometimes compass direction. Some devices add the phone's unique identifiers, the software version, and in certain cases an owner name configured during setup.",
      ],
    },
    {
      heading: "When this becomes a real problem",
      paragraphs: [
        "For a photographer reviewing their own archive, EXIF is genuinely useful. The risk appears when files leave your control, because most people have no idea the data is travelling with the image.",
        "The scenarios below are not hypothetical; they are the common ways location data leaks in practice.",
      ],
      bullets: [
        "Selling an item online with photos taken at home, where the coordinates point to your front door.",
        "Posting pictures of children and revealing the location of a school or playground on a regular schedule.",
        "Sharing holiday photos while away, which simultaneously confirms your home is empty.",
        "Sending a document scan or ID photo where the timestamp contradicts what you told the recipient.",
        "Publishing images from a confidential site, office, or unreleased product location.",
        "Journalists or activists sharing material that could identify a source's whereabouts.",
      ],
    },
    {
      heading: "Social networks are not a reliable safeguard",
      paragraphs: [
        "It is often said that social platforms strip EXIF automatically. Several major ones do remove most metadata from images displayed publicly, but this should not be treated as protection. Behaviour varies between platforms, between upload paths such as app versus web, and over time as products change. Direct messages, cloud storage links, and email attachments typically preserve metadata entirely.",
        "More importantly, the platform stripping data for public display does not mean the platform did not receive and retain it. If your concern is what a company holds rather than what strangers can download, removing the data before upload is the only approach that actually works.",
      ],
    },
    {
      heading: "How to check what a photo contains",
      paragraphs: [
        "Before stripping anything, it is worth seeing what is actually there, because the result is often surprising.",
      ],
      steps: [
        "On Windows, right-click the file, choose Properties, and open the Details tab.",
        "On macOS, open the image in Preview, then choose Tools followed by Show Inspector and select the GPS tab if present.",
        "On iPhone, open the photo, swipe up or tap the information button, and look for a map beneath the image.",
        "On Android, open the photo in Google Photos and tap the information icon to see location and camera details.",
      ],
    },
    {
      heading: "Removing it",
      paragraphs: [
        "The Remove Image Metadata tool on this site re-encodes the image through a canvas, which produces a new file containing the pixels and nothing else. Camera fields, timestamps, and GPS coordinates are not carried across. Because the work happens in your browser, the photo containing the location you are trying to protect is never uploaded to a server in order to have that location removed, which would rather defeat the purpose.",
        "Two things worth knowing. First, this is not the same as blurring faces or removing identifying detail from the visible image; if a street sign or house number is in frame, you still need to crop or edit it out. Second, stripping metadata is irreversible in the exported copy, so keep your original if the camera settings matter to you.",
      ],
    },
    {
      heading: "Preventing it at the source",
      paragraphs: [
        "If you routinely share photos, turning off location tagging in the camera app is more reliable than remembering to strip files afterwards. On iPhone this lives under Settings, Privacy and Security, Location Services, then Camera, where you can set access to Never. On most Android devices it is a location toggle inside the camera app's own settings.",
        "You lose the convenience of a map view in your photo library, which some people value highly. A reasonable middle ground is to leave tagging on for personal archiving and strip metadata deliberately whenever a photo is about to be shared publicly.",
      ],
    },
  ],

  "browser-image-privacy": [
    {
      heading: "What happens with a traditional online converter",
      paragraphs: [
        "The familiar model works like this. You choose a file, your browser uploads the bytes to the operator's server, a process there converts it, the result is stored, and you are given a link to download it. The interaction feels instant, which disguises how much has happened out of sight.",
        "Even with an entirely honest operator, your image now exists somewhere you cannot inspect. It may sit in a processing queue, be written to temporary disk, appear in server logs or error traces, be replicated into backups, or be cached at a content delivery network edge close to whoever downloads it. Deletion policies are usually stated in hours, but you have no way to verify them, and they only cover the copies the operator knows about.",
      ],
    },
    {
      heading: "Why this matters for specific files",
      paragraphs: [
        "For a stock photograph destined for a public blog post, none of this is worth worrying about. The calculation changes entirely for other categories of file, and these are exactly the ones people most often need to convert or compress in a hurry.",
      ],
      bullets: [
        "Identity documents, passports, and visa photographs being prepared for a portal.",
        "Medical images, prescriptions, or insurance paperwork.",
        "Bank statements and signed contracts scanned for submission.",
        "Screenshots of internal dashboards, customer data, or unreleased product work.",
        "Personal photographs of family members, particularly children.",
        "Anything covered by a confidentiality agreement or professional duty.",
      ],
    },
    {
      heading: "What in-browser processing actually means",
      paragraphs: [
        "Modern browsers can decode, manipulate, and re-encode images without any server involvement. When you select a file here, JavaScript running in your own tab reads it, draws it onto an HTML canvas, applies the transformation, and asks the browser to produce a new encoded file. That result is handed to you as a blob URL, which is a reference to data held in your device's memory.",
        "The practical consequence is that the conversion does not require us to receive your image. There is no upload step for the file itself, no server-side copy, and no retention policy to trust, because there is nothing on our side to retain. Closing the tab discards the working data.",
      ],
    },
    {
      heading: "Being precise about what does leave your device",
      paragraphs: [
        "Honesty matters more than marketing here, so it is worth being specific rather than claiming that nothing at all is transmitted.",
        "Loading the page itself involves normal web requests: your browser fetches HTML, JavaScript, stylesheets, and fonts, and our host records standard server log information such as your IP address and user agent, as any web server does. If analytics is active and your consent choices permit it, we record events describing which tool was opened and whether a conversion succeeded. Those events are built to exclude filenames, image data, and metadata. What never travels is the image content itself.",
      ],
    },
    {
      heading: "The limits of local processing",
      paragraphs: [
        "In-browser tools are not magic and they come with genuine trade-offs. Your device does the work, so a very large file can be slow on an older phone, and browsers cap how much memory a tab may use. That is why this site enforces limits of 20 MB per file, ten files at a time, 8192 pixels on a side, and 25 megapixels; those numbers exist to avoid crashing the tab rather than to upsell anything.",
        "Some formats are also awkward locally because browsers do not include a decoder for them. Where support is missing, the honest response is an error message rather than a silent fallback that quietly uploads your file somewhere. A tool that claims to handle everything locally with no limits is worth a second look.",
      ],
    },
    {
      heading: "Sensible habits regardless of tool",
      paragraphs: [
        "Prefer local processing for anything you would not be comfortable posting publicly. Crop sensitive detail out of screenshots before sharing rather than relying on the recipient not to look closely. Strip metadata on photographs that reveal a location. Open and check the exported file before you attach or upload it, because a mistake caught locally is free and one caught after sending is not.",
        "When a cloud service genuinely is the only option for a particular format, send a redacted or lower-value copy rather than the only original you have, and read what the operator says about retention before you upload.",
      ],
    },
  ],

  "image-size-for-website-speed": [
    {
      heading: "Images are usually the heaviest thing on a page",
      paragraphs: [
        "On a typical content website, images account for the majority of transferred bytes, frequently more than scripts, stylesheets, and fonts combined. That makes them the highest-leverage target for anyone trying to make a site faster, and it also makes them the easiest thing to get badly wrong, because an unoptimised image looks identical to an optimised one until you check the network panel.",
        "Speed is not only a comfort issue. Slow pages lose visitors before the content appears, and page experience signals feed into how search engines evaluate a site. A page that takes eight seconds to become useful on a mobile connection is effectively invisible to a meaningful share of its potential audience.",
      ],
    },
    {
      heading: "Serve the size you actually display",
      paragraphs: [
        "The most common mistake is uploading camera originals and letting the browser scale them down with CSS. A 4000-pixel-wide photograph displayed in an 800-pixel column still transfers every one of those pixels; the browser downloads the whole file and then throws most of it away during rendering.",
        "Work out the largest size each image is genuinely displayed at, double it if you want it to stay sharp on high-density screens, and export at that dimension. For a blog body image in a 700-pixel column, exporting at 1400 pixels is generous. Exporting at 4000 wastes roughly ninety percent of the bytes.",
      ],
      table: {
        caption: "Reasonable export widths for common placements",
        columns: ["Placement", "Display width", "Export width"],
        rows: [
          ["Blog body image", "700 px", "1400 px"],
          ["Full-width hero banner", "1200 px", "2000–2400 px"],
          ["Card or grid thumbnail", "350 px", "700 px"],
          ["Avatar or small icon", "80 px", "160 px"],
          ["Logo in header", "180 px", "360 px or SVG"],
        ],
      },
    },
    {
      heading: "Choose the format deliberately",
      paragraphs: [
        "After dimensions, format is the next largest factor. Photographs should be WebP where you control the audience, or JPG where compatibility matters more than a few kilobytes. Flat graphics, screenshots with text, and anything needing transparency belong in PNG, or better still in SVG if the artwork is vector-based, since SVG scales infinitely at a tiny size.",
        "The single biggest win on most sites is finding photographs that were saved as PNG and converting them. A photographic PNG is often five to ten times larger than an equivalent-looking WebP, and these files hide in content libraries for years because nobody checks.",
      ],
    },
    {
      heading: "Compress with intent, not by reflex",
      paragraphs: [
        "Once dimensions and format are right, compression is the finishing step rather than the whole strategy. Aiming for roughly sixty to seventy percent of the original file size usually produces no visible difference on a photograph viewed at normal size. Pushing much harder starts to show as banding in skies and mushy detail in foliage or hair.",
        "Compress the correctly sized export, not the original. Compressing a 4000-pixel file to hit a small target forces brutal quality settings; resizing to 1400 pixels first and then compressing gently achieves a smaller file that looks considerably better.",
      ],
      steps: [
        "Resize the image to roughly twice its display width.",
        "Convert to WebP for photographs, or keep PNG for graphics with text or transparency.",
        "Compress to around sixty to seventy percent with the Image Compressor.",
        "Compare the result against the original at full size before publishing.",
        "Set explicit width and height attributes in your markup so the browser reserves space and the page does not jump as images load.",
      ],
    },
    {
      heading: "Things worth doing in your markup",
      paragraphs: [
        "File preparation only gets you part of the way. Add loading equals lazy to images below the initial viewport so the browser defers fetching them until the reader scrolls near. Leave your main hero image eager, because lazy-loading the first thing a visitor sees delays the metric that matters most.",
        "Always declare width and height, or an aspect ratio in CSS. Without them the browser cannot reserve space, and content shifts downward as each image arrives, which is both irritating to read and actively penalised as a layout-stability problem. If your platform supports responsive image sets, provide several widths and let the browser pick, rather than sending a desktop-sized file to a phone.",
      ],
    },
  ],

  "passport-photo-size-requirements": [
    {
      heading: "Why identity photos get rejected",
      paragraphs: [
        "Identity photo rejections are rarely about file size alone. Portals check several properties at once, and they typically report only the first failure, which leads to a frustrating cycle of fixing one thing and immediately failing on another. Knowing the full set of rules before you start saves several rounds.",
        "The checks usually cover pixel dimensions, file size in kilobytes, file format, the ratio of head height to total image height, background uniformity, and sometimes whether the face is centred and looking straight at the camera. Automated systems handle the measurable properties and reject anything outside tolerance without explanation.",
      ],
    },
    {
      heading: "Typical requirements",
      paragraphs: [
        "Specifications vary by country and by the individual authority, so always read the page for your specific application. That said, the values below cover the patterns you will encounter most often and are a reasonable starting point while you locate the official spec.",
      ],
      table: {
        caption: "Commonly encountered identity photo specifications",
        columns: ["Property", "Typical requirement"],
        rows: [
          ["Format", "JPG, occasionally JPEG or PNG"],
          ["File size", "20 KB to 100 KB, sometimes up to 300 KB"],
          ["Pixel dimensions", "Between 200 × 230 and 600 × 800"],
          ["Aspect ratio", "Roughly 3:4 portrait, sometimes square"],
          ["Head height", "Around 60 to 70 percent of image height"],
          ["Background", "Plain white or light grey, evenly lit"],
          ["Expression", "Neutral, mouth closed, eyes open and visible"],
          ["Signature image", "Often separate, 10 to 20 KB, wider than tall"],
        ],
      },
    },
    {
      heading: "Taking a usable photo at home",
      paragraphs: [
        "Most rejections trace back to the photo itself rather than the file handling. Getting the capture right makes the rest straightforward, and it takes a few minutes.",
      ],
      steps: [
        "Stand about half a metre in front of a plain, light-coloured wall with nothing on it.",
        "Face a window during the day so light falls evenly on your face, avoiding harsh shadows under the eyes and nose.",
        "Have someone else take the photo from roughly two metres away at your eye level, rather than using a selfie at arm's length, which distorts facial proportions.",
        "Look directly at the lens with a neutral expression, mouth closed, hair clear of your eyes, and no hat or tinted glasses.",
        "Take several frames so you have options, then pick the sharpest one.",
      ],
    },
    {
      heading: "Preparing the file",
      paragraphs: [
        "Once you have a good capture, the processing sequence matters. Crop before you resize, and resize before you compress; doing it in any other order costs quality unnecessarily.",
      ],
      steps: [
        "Crop to the required ratio with the Image Cropper, positioning the head so it occupies roughly two thirds of the frame height with a little space above.",
        "Resize to the specified pixel dimensions using the Image Resizer with aspect ratio locked.",
        "Compress to the stated cap using the Compress to 100 KB tool, or the general compressor for a different ceiling.",
        "Confirm the saved file size in your file manager, since some portals enforce the limit strictly.",
        "Open the file at full size and check that the face is sharp and the background looks clean before uploading.",
      ],
    },
    {
      heading: "A word on privacy",
      paragraphs: [
        "A passport photograph plus a signature scan is an unusually sensitive combination, and these are precisely the files people tend to run through the first free converter a search returns. Processing them in your browser means the image is not uploaded to an intermediary in order to be cropped or compressed.",
        "It is also worth stripping metadata before submission. A camera original embeds a timestamp and often GPS coordinates, neither of which the authority needs and both of which you may prefer not to attach to an identity document.",
      ],
    },
  ],

  "how-to-make-a-favicon": [
    {
      heading: "What a favicon has to survive",
      paragraphs: [
        "A favicon is the small image that represents your site in a browser tab, a bookmark list, a history entry, and a phone home screen. The defining constraint is brutal: in a browser tab it is typically drawn at sixteen or thirty-two device pixels square. At that size you have room for a single strong shape and essentially nothing else.",
        "This is why favicons made by shrinking a full logo almost always fail. Wordmarks become illegible smudges, thin strokes vanish entirely, and detailed illustrations turn into noise. The favicon is not a miniature of your logo; it is a separate mark that shares the logo's identity.",
      ],
    },
    {
      heading: "Designing a mark that works small",
      paragraphs: [
        "Work out what the simplest recognisable element of your brand is. Usually that is a single letter, a monogram of two letters, or one distinctive shape from the full logo. Strip everything else away.",
      ],
      bullets: [
        "Use one or two colours with strong contrast between foreground and background.",
        "Avoid text longer than two characters; three or more will not be readable.",
        "Keep strokes thick, because hairlines disappear or alias badly at small sizes.",
        "Fill the square. A mark floating in generous padding looks tiny next to competitors' icons.",
        "Test against both light and dark browser themes, since a dark mark on transparency vanishes in dark mode.",
        "Check it at actual size on a real screen rather than judging a zoomed preview.",
      ],
    },
    {
      heading: "The sizes browsers and devices request",
      paragraphs: [
        "Different contexts ask for different files. You do not need every size ever specified, but covering this set handles the overwhelming majority of real requests.",
      ],
      table: {
        caption: "Icon sizes worth generating",
        columns: ["Size", "Used for"],
        rows: [
          ["16 × 16", "Browser tab and bookmark bar on standard-density screens"],
          ["32 × 32", "Browser tab on high-density screens, Windows taskbar"],
          ["48 × 48", "Windows site shortcuts and some bookmark views"],
          ["180 × 180", "Apple touch icon for iOS home screens"],
          ["192 × 192", "Android home screen and web app manifest"],
          ["512 × 512", "Progressive web app splash screens and app listings"],
          ["favicon.ico", "Legacy fallback requested from the site root"],
        ],
      },
    },
    {
      heading: "Generating and installing the files",
      paragraphs: [
        "The Favicon Generator on this site takes a square source image, crops from the centre, and exports the common sizes along with a favicon.ico, all in your browser. Start from the largest, cleanest version of your mark you have, ideally at least 512 pixels square, because scaling down produces far better results than scaling up.",
        "Installation depends on your stack, but the general shape is the same. Place favicon.ico at the site root, since some browsers and crawlers request that exact path regardless of what your markup says, and reference the PNG sizes from your HTML head or your framework's metadata configuration.",
      ],
      steps: [
        "Prepare a square source image at 512 pixels or larger with your simplified mark filling the frame.",
        "Run it through the Favicon Generator and download the exported set.",
        "Put favicon.ico in your site root so requests to /favicon.ico succeed.",
        "Add link elements for the PNG sizes and the Apple touch icon in your document head.",
        "List the 192 and 512 pixel icons in your web app manifest if you have one.",
        "Load the site in a private window and check the tab, because browsers cache favicons aggressively and you may otherwise keep seeing the old one.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: [
        "The most frequent problem after installation is caching. Browsers hold onto favicons far longer than other assets, so a correct new icon can appear broken for days. Test in a fresh private window, and if you are changing an established icon consider a new filename to sidestep the cache entirely.",
        "The second most common issue is transparency in the wrong place. A transparent background looks clean against a light tab strip and disappears against a dark one. Unless you have specifically designed for both, a solid background colour in the icon itself is the safer choice.",
      ],
    },
  ],
};

export function getGuide(slug: string): GuideMeta | undefined {
  return guides.find((guide) => guide.slug === slug);
}
