import { env } from "@/config/env";

function publisherId(clientId: string): string | null {
  const trimmed = clientId.trim();
  if (!trimmed.startsWith("ca-pub-")) return null;
  return trimmed.slice(3);
}

export async function GET() {
  const publisher = publisherId(env.adsenseClientId);
  if (!publisher) {
    return new Response("Not found", { status: 404 });
  }

  const body = `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
