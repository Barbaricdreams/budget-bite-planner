"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatMoney, priceMeal } from "@/lib/pricing";
import type { MealCostSummary, Recipe } from "@/lib/types";
import { StoreBadge } from "./StoreBadge";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { zip, isSelected, toggleRecipe } = useApp();
  const [summary, setSummary] = useState<MealCostSummary | null>(null);

  useEffect(() => {
    let cancelled = false;
    priceMeal(recipe, zip).then((s) => {
      if (!cancelled) setSummary(s);
    });
    return () => {
      cancelled = true;
    };
  }, [recipe, zip]);

  const selected = isSelected(recipe.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-emerald-950/40">
      <div
        className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${recipe.imageGradient}`}
      >
        <span className="text-6xl drop-shadow-sm transition group-hover:scale-110">
          {recipe.imageEmoji}
        </span>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          <span className="rounded-full bg-black/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
            {recipe.difficulty}
          </span>
          <span className="rounded-full bg-black/35 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
            {recipe.cookTimeMinutes} min
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Link
            href={`/recipes/${recipe.id}`}
            className="text-lg font-bold text-slate-900 hover:text-emerald-700 dark:text-slate-100 dark:hover:text-emerald-400"
          >
            {recipe.title}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
            {recipe.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              {recipe.servings} servings · DEMO
            </span>
            {summary?.cheapestStore ? (
              <span className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                from {formatMoney(summary.cheapestTotal)}
                <StoreBadge storeId={summary.cheapestStore} />
              </span>
            ) : (
              <span className="text-xs text-slate-400">Pricing…</span>
            )}
          </div>

          <div className="flex gap-2">
            <Link
              href={`/recipes/${recipe.id}`}
              className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => toggleRecipe(recipe.id)}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                selected
                  ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-700"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
              }`}
            >
              {selected ? "On list ✓" : "+ List"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
