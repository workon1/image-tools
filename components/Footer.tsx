import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { routes, siteConfig } from "@/config/site";

const footerLinks = [
  { href: routes.home, label: "Home" },
  { href: "/tools", label: "All tools" },
  { href: routes.about, label: "About" },
  { href: routes.privacy, label: "Privacy Policy" },
  { href: routes.terms, label: "Terms" },
  { href: routes.contact, label: "Contact" },
  { href: routes.formatsHash, label: "Supported formats" },
];

export function Footer() {
  return (
    <footer className="mt-auto px-4 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-line bg-surface/80 px-5 py-8 shadow-[var(--shadow-soft)] sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href={routes.home} aria-label={siteConfig.name} className="inline-flex">
              <BrandLockup size="md" />
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Bookmark this page for the next conversion. It stays free, local, and ready whenever
              you need it.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
