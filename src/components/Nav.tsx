"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

const links = [
  { href: "/", label: "Recipes" },
  { href: "/shopping-list", label: "Shopping List" },
  { href: "/settings", label: "Settings" },
];

export function Nav() {
  const pathname = usePathname();
  const { selectedRecipeIds, zip } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-lg shadow-sm">
            🥗
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-emerald-700">
              Budget Bite Planner
            </div>
            <div className="text-[11px] text-slate-500">ZIP {zip || "—"}</div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {l.label}
                {l.href === "/shopping-list" && selectedRecipeIds.length > 0 && (
                  <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/25 px-1 text-[11px] font-bold">
                    {selectedRecipeIds.length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
