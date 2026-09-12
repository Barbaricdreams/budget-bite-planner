"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IngredientPriceTable,
  MealSummaryCards,
} from "@/components/PriceTable";
import { useApp } from "@/context/AppContext";
import { getRecipeById } from "@/data/recipes";
import { formatMoney, priceMeal } from "@/lib/pricing";
import type { MealCostSummary } from "@/lib/types";

export function RecipeDetailClient() {
  const params = useParams();
  const id = String(params.id ?? "");
  const recipe = getRecipeById(id);
  const { zip, isSelected, toggleRecipe, addRecipe } = useApp();
  const [summary, setSummary] = useState<MealCostSummary | null>(null);

  useEffect(() => {
    if (!recipe) return;
    let cancelled = false;
    priceMeal(recipe, zip).then((s) => {
      if (!cancelled) setSummary(s);
    });
    return () => {
      cancelled = true;
    };
  }, [recipe, zip]);

  if (!recipe) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-slate-600">Recipe not found.</p>
        <Link href="/" className="mt-4 inline-block text-emerald-700 underline">
          Back to recipes
        </Link>
      </div>
    );
  }

  const selected = isSelected(recipe.id);

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex text-sm font-medium text-emerald-700 hover:underline"
      >
        ← All recipes
      </Link>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div
          className={`flex h-48 items-center justify-center bg-gradient-to-br sm:h-56 ${recipe.imageGradient}`}
        >
          <span className="text-8xl">{recipe.imageEmoji}</span>
        </div>
        <div className="space-y-4 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {recipe.title}
              </h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                {recipe.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleRecipe(recipe.id)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm ${
                selected
                  ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
              }`}
            >
              {selected ? "On shopping list ✓" : "Add to shopping list"}
            </button>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">
              {recipe.servings} servings
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1">
              {recipe.cookTimeMinutes} min
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 capitalize">
              {recipe.difficulty}
            </span>
            {recipe.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Store cost comparison
            </h2>
            <p className="text-sm text-slate-500">
              DEMO / MOCK prices for ZIP {zip}. Not live store data.
            </p>
          </div>
          {summary?.cheapestStore && (
            <p className="text-sm font-semibold text-emerald-700">
              Best total ≈ {formatMoney(summary.cheapestTotal)}
            </p>
          )}
        </div>
        {summary ? (
          <>
            <MealSummaryCards summary={summary} />
            <IngredientPriceTable ingredients={summary.ingredients} />
          </>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Calculating DEMO prices…
          </div>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Ingredients</h2>
          <ul className="mt-4 space-y-2">
            {recipe.ingredients.map((ing) => (
              <li
                key={ing.name}
                className="flex justify-between gap-3 border-b border-slate-50 pb-2 text-sm last:border-0"
              >
                <span className="font-medium text-slate-800">{ing.name}</span>
                <span className="tabular-nums text-slate-500">
                  {ing.quantity} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Steps</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-slate-700">
            {recipe.steps.map((step, i) => (
              <li key={i} className="pl-1 leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => addRecipe(recipe.id)}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Add to list &amp; keep browsing
        </button>
        <Link
          href="/shopping-list"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          View shopping list
        </Link>
      </div>
    </div>
  );
}
