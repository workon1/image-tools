import { ImageResponse } from "next/og";

export const alt = "Free Online Image Converter – JPG, PNG & WebP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#F5F3EE",
        color: "#1C1917",
        padding: 72,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#0F766E" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "#0F766E",
            color: "#FFFDF8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          IR
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "#1C1917" }}>
          Image Reshaper
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
          Convert Images Online
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#57534E", maxWidth: 820 }}>
          JPG, PNG and WebP — processed in your browser.
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#0F766E" }}>
        No upload · No account · Free
      </div>
    </div>,
    { ...size },
  );
}
