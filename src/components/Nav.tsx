"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "@/components/ThemeProvider";

const links = [
  { href: "/", label: "Recipes" },
  { href: "/shopping-list", label: "Shopping List" },
  { href: "/settings", label: "Settings" },
];

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}

export function Nav() {
  const pathname = normalizePath(usePathname() || "/");
  const { selectedRecipeIds, zip } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/90 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-3">
        <Link href="/" className="group flex min-w-0 shrink items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-lg shadow-sm">
            🥗
          </span>
          <div className="hidden leading-tight min-[380px]:block">
            <div className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400">
              Budget Bite Planner
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              ZIP {zip || "—"}
            </div>
          </div>
        </Link>

        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <nav className="-mx-1 flex max-w-[58vw] items-center gap-1 overflow-x-auto px-1 sm:max-w-none sm:gap-2">
            {links.map((l) => {
              const href = normalizePath(l.href);
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm ${
                    active
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
