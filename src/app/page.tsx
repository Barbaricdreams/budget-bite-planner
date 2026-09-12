"use client";

import { useMemo, useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { allTags, RECIPES } from "@/data/recipes";

const PAGE_SIZE = 12;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("all");
  const [page, setPage] = useState(1);
  const tags = useMemo(() => allTags(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      const tagOk = tag === "all" || r.tags.includes(tag);
      if (!tagOk) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.includes(q)) ||
        r.ingredients.some((i) => i.name.toLowerCase().includes(q))
      );
    });
  }, [query, tag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  function setFilterTag(next: string) {
    setTag(next);
    setPage(1);
  }

  function setFilterQuery(next: string) {
    setQuery(next);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white shadow-lg sm:p-8 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-900">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
          Walmart grocery planner
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Stretch every dollar with budget bites
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-emerald-50 sm:text-base">
          Browse {RECIPES.length} thrifty recipes, estimate{" "}
          <strong>DEMO</strong> Walmart prices for your ZIP, then build a
          shopping list. Live Affiliate/SerpApi pricing can replace the mock
          catalog later.
        </p>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search recipes, tags, ingredients…"
          value={query}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-emerald-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <select
          value={tag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-emerald-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 sm:w-56"
        >
          <option value="all">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </section>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing {pageItems.length} of {filtered.length} meals
        {filtered.length !== RECIPES.length ? ` (filtered from ${RECIPES.length})` : ""}
        {totalPages > 1 ? ` · page ${safePage}/${totalPages}` : ""}
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400">
          No recipes match. Try another search or tag.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 disabled:opacity-40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                n === safePage
                  ? "bg-emerald-600 text-white"
                  : "border border-slate-200 bg-white text-slate-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 disabled:opacity-40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
