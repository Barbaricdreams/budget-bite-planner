import { formatMoney } from "@/lib/pricing";
import { WALMART } from "@/lib/stores";
import type { MealCostSummary, PricedIngredient } from "@/lib/types";
import { StoreBadge } from "./StoreBadge";

export function MealSummaryCards({ summary }: { summary: MealCostSummary }) {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-5 shadow-sm dark:border-blue-800/60 dark:bg-blue-950/40">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <StoreBadge size="md" />
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          DEMO price
        </span>
      </div>
      <div className={`text-3xl font-bold ${WALMART.accent}`}>
        {summary.matchedCount > 0 ? formatMoney(summary.total) : "—"}
      </div>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        {summary.matchedCount} ingredient
        {summary.matchedCount === 1 ? "" : "s"} priced
        {summary.missingCount > 0 && (
          <span className="text-amber-700 dark:text-amber-400">
            {" "}
            · {summary.missingCount} not found
          </span>
        )}
      </p>
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
            <th className="px-4 py-3 font-semibold">Walmart (DEMO)</th>
            <th className="px-4 py-3 font-semibold">Pack</th>
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
              <td className="px-4 py-3 tabular-nums">
                {pi.matched ? (
                  <span className="font-semibold text-blue-700 dark:text-blue-400">
                    {formatMoney(pi.lineTotal)}
                  </span>
                ) : (
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    Not found
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                {pi.matched
                  ? `${pi.packsNeeded}× ${pi.product?.packLabel}`
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
