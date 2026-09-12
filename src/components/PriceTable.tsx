import { formatMoney } from "@/lib/pricing";
import { STORE_IDS, getStore } from "@/lib/stores";
import type { MealCostSummary, PricedIngredient } from "@/lib/types";
import { StoreBadge } from "./StoreBadge";

export function MealSummaryCards({ summary }: { summary: MealCostSummary }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {STORE_IDS.map((id) => {
        const row = summary.byStore[id];
        const store = getStore(id);
        const isCheapest = summary.cheapestStore === id;
        return (
          <div
            key={id}
            className={`rounded-2xl border p-4 shadow-sm transition ${
              isCheapest
                ? "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200 dark:border-emerald-500 dark:bg-emerald-950/60 dark:ring-emerald-800"
                : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
            }`}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <StoreBadge storeId={id} />
              {isCheapest && (
                <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Cheapest
                </span>
              )}
            </div>
            <div className={`text-2xl font-bold ${store.accent}`}>
              {row.matchedCount > 0 ? formatMoney(row.total) : "—"}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {row.matchedCount} matched
              {row.missingCount > 0 && (
                <span className="text-amber-700 dark:text-amber-400">
                  {" "}
                  · {row.missingCount} missing
                </span>
              )}
              <span className="block text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                DEMO price
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function IngredientPriceTable({
  ingredients,
}: {
  ingredients: PricedIngredient[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 font-semibold">Ingredient</th>
            {STORE_IDS.map((id) => (
              <th key={id} className="px-3 py-3 font-semibold">
                {getStore(id).shortName}
              </th>
            ))}
            <th className="px-4 py-3 font-semibold">Best</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {ingredients.map((pi) => (
            <tr
              key={pi.matchKey}
              className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {pi.ingredient.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {pi.ingredient.quantity} {pi.ingredient.unit}
                </div>
              </td>
              {STORE_IDS.map((id) => {
                const row = pi.byStore[id];
                const cheapest = pi.cheapestStore === id;
                return (
                  <td
                    key={id}
                    className={`px-3 py-3 tabular-nums ${
                      cheapest
                        ? "font-semibold text-emerald-700 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {row.matched ? (
                      <div>
                        <div>{formatMoney(row.lineTotal)}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500">
                          {row.packsNeeded}× {row.product?.packLabel}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-amber-600 dark:text-amber-400">
                        N/A
                      </span>
                    )}
                  </td>
                );
              })}
              <td className="px-4 py-3">
                {pi.cheapestStore ? (
                  <StoreBadge storeId={pi.cheapestStore} />
                ) : (
                  <span className="text-xs text-slate-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
