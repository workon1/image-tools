import Link from "next/link";
import { routes, siteConfig } from "@/config/site";
import { BrandLockup } from "@/components/BrandLockup";
import { SiteNav } from "@/components/SiteNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-3 focus:py-2 focus:text-surface"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-2 rounded-2xl border border-line/80 bg-surface/80 px-2.5 py-2 shadow-[var(--shadow-soft)] backdrop-blur-md sm:py-2.5 lg:gap-4 lg:rounded-full lg:px-4">
        <Link
          href={routes.home}
          aria-label={siteConfig.name}
          className="group min-w-0 rounded-full py-0.5 pr-1 sm:pr-2"
        >
          <BrandLockup size="md" showTagline />
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
