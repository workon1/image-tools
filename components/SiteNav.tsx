"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/config/site";
import { ToolsNav } from "@/components/ToolsNav";

const nav = [
  { href: routes.home, label: "Home" },
  { href: routes.converter, label: "Converter" },
  { href: "/tools", label: "All tools" },
  { href: routes.privacy, label: "Privacy" },
];

function linkClass(active: boolean) {
  return `rounded-full px-2.5 py-1.5 transition-colors hover:bg-paper hover:text-ink sm:px-3 ${
    active ? "bg-paper text-ink" : "text-muted"
  }`;
}

export function SiteNav() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpenPath(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <nav aria-label="Primary" className="flex min-w-0 items-center gap-1">
      <div ref={menuRef} className="relative lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpenPath(open ? null : pathname)}
          className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-paper"
        >
          <span className="flex w-4 flex-col gap-1" aria-hidden="true">
            <span className="block h-0.5 w-full rounded-full bg-current" />
            <span className="block h-0.5 w-full rounded-full bg-current" />
            <span className="block h-0.5 w-full rounded-full bg-current" />
          </span>
        </button>
        {open ? (
          <div
            id="mobile-nav"
            className="absolute right-0 z-50 mt-2 w-[min(16rem,calc(100vw-1.5rem))] rounded-2xl border border-line bg-surface p-2 shadow-[var(--shadow-soft)]"
          >
            <ul className="text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpenPath(null)}
                    className={`block rounded-xl px-3 py-2.5 ${
                      pathname === item.href ? "bg-paper font-medium text-ink" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <ul className="hidden items-center text-sm lg:flex">
        {nav
          .filter((item) => item.href !== "/tools")
          .map((item) => (
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
      <Link
        href="/tools"
        className="btn-primary hidden !min-h-9 !w-auto !px-4 text-sm lg:inline-flex"
      >
        All tools
      </Link>
    </nav>
  );
}
