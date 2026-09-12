"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { StoreBadge } from "@/components/StoreBadge";
import { useApp } from "@/context/AppContext";
import { getRecipeById } from "@/data/recipes";
import { buildShoppingList, formatMoney } from "@/lib/pricing";
import { WALMART } from "@/lib/stores";
import type { ShoppingListItem } from "@/lib/types";

export default function ShoppingListPage() {
  const { zip, selectedRecipeIds, removeRecipe, clearList, toggleRecipe } =
    useApp();
  const [items, setItems] = useState<ShoppingListItem[] | null>(null);

  const recipes = useMemo(
    () =>
      selectedRecipeIds
        .map((id) => getRecipeById(id))
        .filter((r): r is NonNullable<typeof r> => Boolean(r)),
    [selectedRecipeIds]
  );

  useEffect(() => {
    let cancelled = false;
    if (recipes.length === 0) {
      setItems([]);
      return;
    }
    buildShoppingList(recipes, zip).then((list) => {
      if (!cancelled) setItems(list);
    });
    return () => {
      cancelled = true;
    };
  }, [recipes, zip]);

  const basket = useMemo(() => {
    let total = 0;
    let matched = 0;
    let missing = 0;
    if (!items) return { total: 0, matched: 0, missing: 0 };
    for (const item of items) {
      if (item.matched) {
        total += item.lineTotal;
        matched += 1;
      } else {
        missing += 1;
      }
    }
    return { total: Math.round(total * 100) / 100, matched, missing };
  }, [items]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Shopping list
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Walmart basket for selected meals · ZIP {zip} ·{" "}
            <span className="font-semibold text-amber-700 dark:text-amber-400">
              DEMO prices
            </span>
          </p>
        </div>
        {selectedRecipeIds.length > 0 && (
          <button
            type="button"
            onClick={clearList}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Clear list
          </button>
        )}
      </div>

      {recipes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-600 dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-400">
            No meals on your list yet.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Browse recipes
          </Link>
        </div>
      ) : (
        <>
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Selected meals
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {recipes.map((r) => (
                <li
                  key={r.id}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 py-1 pl-3 pr-1 text-sm dark:bg-slate-800"
                >
                  <Link
                    href={`/recipes/${r.id}`}
                    className="font-medium text-slate-800 hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-400"
                  >
                    {r.imageEmoji} {r.title}
                  </Link>
                  <button
                    type="button"
                    aria-label={`Remove ${r.title}`}
                    onClick={() => removeRecipe(r.id)}
                    className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-500 hover:text-red-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:text-red-400"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-blue-50/80 p-5 shadow-sm dark:border-blue-800/60 dark:bg-blue-950/40">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <StoreBadge size="md" />
              <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                DEMO basket total
              </span>
            </div>
            <div className={`text-3xl font-bold ${WALMART.accent}`}>
              {basket.matched > 0 ? formatMoney(basket.total) : "—"}
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {basket.matched} item{basket.matched === 1 ? "" : "s"} priced
              {basket.missing > 0 && (
                <span className="text-amber-700 dark:text-amber-400">
                  {" "}
                  · {basket.missing} not found
                </span>
              )}
            </p>
          </section>

          {!items ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              Building list…
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-3 py-3">Qty</th>
                    <th className="px-3 py-3">Walmart</th>
                    <th className="px-4 py-3">Pack</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {items.map((item) => (
                    <tr
                      key={item.matchKey}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {item.displayName}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">
                          from {item.recipeIds.length} meal
                          {item.recipeIds.length > 1 ? "s" : ""}
                        </div>
                      </td>
                      <td className="px-3 py-3 tabular-nums text-slate-600 dark:text-slate-300">
                        {item.totalQuantity} {item.unit}
                      </td>
                      <td className="px-3 py-3 tabular-nums">
                        {item.matched ? (
                          <span className="font-semibold text-blue-700 dark:text-blue-400">
                            {formatMoney(item.lineTotal)}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                            Not found
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                        {item.matched
                          ? `${item.packsNeeded}× ${item.product?.packLabel ?? "pack"}`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Tip: toggle meals from recipe cards or{" "}
            <button
              type="button"
              className="underline"
              onClick={() => recipes[0] && toggleRecipe(recipes[0].id)}
            >
              remove one
            </button>{" "}
            to refresh the basket. Prices are MOCK Walmart estimates.
          </p>
        </>
      )}
    </div>
  );
}
