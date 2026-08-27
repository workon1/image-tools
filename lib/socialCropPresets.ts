import { MIN_OUTPUT_DIMENSION } from "@/lib/constants";
import { clampDimension } from "@/lib/resizeUtils";

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "x"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "pinterest"
  | "whatsapp";

export type SocialCropPreset = {
  id: string;
  platform: SocialPlatform;
  platformLabel: string;
  use: string;
  label: string;
  ratio: number;
  width: number;
  height: number;
};

export const SOCIAL_PLATFORMS: { id: SocialPlatform; label: string }[] = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "x", label: "X" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "youtube", label: "YouTube" },
  { id: "tiktok", label: "TikTok" },
  { id: "pinterest", label: "Pinterest" },
  { id: "whatsapp", label: "WhatsApp" },
];

export const SOCIAL_CROP_PRESETS: SocialCropPreset[] = [
  social("instagram", "Instagram", "profile", "Profile", 1080, 1080),
  social("instagram", "Instagram", "post-square", "Post square", 1080, 1080),
  social("instagram", "Instagram", "post-portrait", "Post portrait", 1080, 1350),
  social("instagram", "Instagram", "post-landscape", "Post landscape", 1080, 566),
  social("instagram", "Instagram", "story", "Story / Reel", 1080, 1920),
  social("facebook", "Facebook", "profile", "Profile", 1080, 1080),
  social("facebook", "Facebook", "cover", "Cover photo", 1640, 624),
  social("facebook", "Facebook", "post", "Post", 1200, 630),
  social("facebook", "Facebook", "story", "Story", 1080, 1920),
  social("x", "X", "profile", "Profile", 400, 400),
  social("x", "X", "header", "Header", 1500, 500),
  social("x", "X", "post", "Post", 1600, 900),
  social("linkedin", "LinkedIn", "profile", "Profile", 400, 400),
  social("linkedin", "LinkedIn", "cover", "Cover", 1584, 396),
  social("linkedin", "LinkedIn", "post", "Post", 1200, 627),
  social("youtube", "YouTube", "profile", "Profile", 800, 800),
  social("youtube", "YouTube", "thumbnail", "Thumbnail", 1280, 720),
  social("youtube", "YouTube", "banner", "Channel banner", 2560, 1440),
  social("tiktok", "TikTok", "profile", "Profile", 1080, 1080),
  social("tiktok", "TikTok", "video", "Video", 1080, 1920),
  social("pinterest", "Pinterest", "profile", "Profile", 1080, 1080),
  social("pinterest", "Pinterest", "pin", "Pin", 1000, 1500),
  social("whatsapp", "WhatsApp", "profile", "Profile", 640, 640),
  social("whatsapp", "WhatsApp", "status", "Status", 1080, 1920),
];

function social(
  platform: SocialPlatform,
  platformLabel: string,
  use: string,
  label: string,
  width: number,
  height: number,
): SocialCropPreset {
  return {
    id: `${platform}-${use}`,
    platform,
    platformLabel,
    use,
    label,
    ratio: width / height,
    width,
    height,
  };
}

export function presetsForPlatform(platform: SocialPlatform): SocialCropPreset[] {
  return SOCIAL_CROP_PRESETS.filter((preset) => preset.platform === platform);
}

export function getSocialCropPreset(id: string): SocialCropPreset | undefined {
  return SOCIAL_CROP_PRESETS.find((preset) => preset.id === id);
}

/** Downscale a social export to the recommended size without upscaling a small crop. */
export function fitSocialExportSize(
  cropWidth: number,
  cropHeight: number,
  targetWidth: number,
  targetHeight: number,
): { width: number; height: number } {
  const scale = Math.min(cropWidth / targetWidth, cropHeight / targetHeight, 1);
  return {
    width: clampDimension(Math.max(MIN_OUTPUT_DIMENSION, Math.round(targetWidth * scale))),
    height: clampDimension(Math.max(MIN_OUTPUT_DIMENSION, Math.round(targetHeight * scale))),
  };
}
