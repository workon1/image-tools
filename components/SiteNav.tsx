"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/site";
import { ToolsNav } from "@/components/ToolsNav";

const nav = [
  { href: routes.home, label: "Home" },
  { href: routes.converter, label: "Converter" },
  { href: routes.privacy, label: "Privacy" },
];

function linkClass(active: boolean) {
  return `rounded-full px-2.5 py-1.5 transition-colors hover:bg-paper hover:text-ink sm:px-3 ${
    active ? "bg-paper text-ink" : "text-muted"
  }`;
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex items-center gap-1">
      <ul className="flex items-center text-sm">
        {nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={linkClass(pathname === item.href)}>
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <ToolsNav />
        </li>
      </ul>
      <Link href="/tools" className="btn-primary hidden !min-h-9 !px-4 text-sm sm:inline-flex">
        All tools
      </Link>
    </nav>
  );
}
