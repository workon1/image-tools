import Link from "next/link";
import { routes } from "@/config/site";

type CookieBannerProps = {
  onAcceptAll: () => void;
  onEssentialOnly: () => void;
};

export function CookieBanner({ onAcceptAll, onEssentialOnly }: CookieBannerProps) {
  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6"
    >
      <div className="mx-auto max-w-4xl rounded-3xl border border-line bg-surface/95 p-5 shadow-[var(--shadow-soft)] backdrop-blur-md sm:p-6">
        <h2 id="cookie-banner-title" className="text-lg font-semibold tracking-tight text-ink">
          Cookie preferences
        </h2>
        <p id="cookie-banner-description" className="mt-2 text-sm leading-6 text-muted">
          ImageReshaper uses optional cookies for analytics and, when enabled, advertising. Your
          images are always processed in the browser and are never sent to analytics or ad
          providers. Read the{" "}
          <Link href={routes.privacy} className="text-accent underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={onEssentialOnly} className="btn-secondary !min-h-10">
            Essential only
          </button>
          <button type="button" onClick={onAcceptAll} className="btn-primary !min-h-10">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
