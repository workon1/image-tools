import { describe, expect, it } from "vitest";
import {
  fitSocialExportSize,
  getSocialCropPreset,
  presetsForPlatform,
  SOCIAL_CROP_PRESETS,
} from "@/lib/socialCropPresets";

describe("social crop presets", () => {
  it("covers profile, post, and story-style sizes for major platforms", () => {
    const ids = SOCIAL_CROP_PRESETS.map((preset) => preset.id);
    expect(ids).toEqual(expect.arrayContaining([
      "instagram-profile",
      "instagram-post-portrait",
      "instagram-story",
      "facebook-cover",
      "x-header",
      "linkedin-cover",
      "youtube-thumbnail",
      "tiktok-video",
      "pinterest-pin",
      "whatsapp-status",
    ]));
  });

  it("keeps listed pixel size in the same ratio as the crop box", () => {
    const portrait = getSocialCropPreset("instagram-post-portrait");
    expect(portrait).toBeDefined();
    expect(portrait!.width / portrait!.height).toBeCloseTo(portrait!.ratio);
    expect(presetsForPlatform("instagram").some((item) => item.use === "profile")).toBe(true);
  });

  it("does not upscale a small crop to the social pixel size", () => {
    expect(fitSocialExportSize(400, 500, 1080, 1350)).toEqual({ width: 400, height: 500 });
    expect(fitSocialExportSize(2000, 2500, 1080, 1350)).toEqual({ width: 1080, height: 1350 });
  });
});
