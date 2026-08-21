"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { tools } from "@/tools/registry";

export function ToolsNav() {
  const pathname = usePathname();
  const available = tools.filter((tool) => tool.status === "available");
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
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
    <>
      <Link
        href="/tools"
        className={`rounded-full px-2.5 py-1.5 transition-colors hover:bg-paper hover:text-ink sm:hidden ${
          pathname === "/tools" ? "bg-paper text-ink" : "text-muted"
        }`}
      >
        Tools
      </Link>
      <div ref={rootRef} className="relative hidden sm:block">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls="tools-menu"
          onClick={() => setOpenPath(open ? null : pathname)}
          className={`rounded-full px-2.5 py-1.5 transition-colors hover:bg-paper hover:text-ink ${
            open || pathname === "/tools" ? "bg-paper text-ink" : "text-muted"
          }`}
        >
          Tools
        </button>
        {open ? (
          <div
            id="tools-menu"
            role="menu"
            className="absolute right-0 z-50 mt-2 max-h-[70vh] w-72 overflow-auto rounded-2xl border border-line bg-surface p-2 shadow-[var(--shadow-soft)]"
          >
            <ul>
              {available.map((tool) => {
                const active = pathname === tool.href;
                return (
                  <li key={tool.id}>
                    <Link
                      href={tool.href}
                      role="menuitem"
                      onClick={() => setOpenPath(null)}
                      className={`block rounded-xl px-3 py-2 text-sm transition-colors hover:bg-paper ${
                        active ? "bg-paper font-medium text-ink" : "text-ink"
                      }`}
                    >
                      {tool.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
