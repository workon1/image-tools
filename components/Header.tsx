import Link from "next/link";
import { routes, siteConfig } from "@/config/site";
import { SiteNav } from "@/components/SiteNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-3 focus:py-2 focus:text-surface"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-line/80 bg-surface/80 px-3 py-2 shadow-[var(--shadow-soft)] backdrop-blur-md sm:px-4">
        <Link href={routes.home} className="group flex items-center gap-2.5 rounded-full py-1 pr-2">
          <span
            aria-hidden="true"
            className="relative grid h-9 w-9 place-items-center rounded-full bg-accent"
          >
            <span className="absolute left-2 top-2.5 h-2 w-3.5 rounded-sm border border-white/90" />
            <span className="absolute bottom-2.5 right-2 h-2 w-3.5 rounded-sm bg-white/90" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-ink">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-muted sm:block">Private image conversion</span>
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
