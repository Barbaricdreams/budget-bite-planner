import { createMockAdapters } from "@/lib/adapters/mock";
import { STORE_IDS } from "@/lib/stores";
import { normalizeKey } from "@/lib/fuzzy";
import type {
  Ingredient,
  MealCostSummary,
  PricedIngredient,
  Recipe,
  ShoppingListItem,
  StoreId,
} from "@/lib/types";

const adapters = createMockAdapters();

function packsNeeded(qty: number, packSize: number): number {
  if (packSize <= 0) return 1;
  return Math.max(1, Math.ceil(qty / packSize));
}

export async function priceIngredient(
  ingredient: Ingredient,
  zip: string
): Promise<PricedIngredient> {
  const matchKey = ingredient.matchKey || normalizeKey(ingredient.name);
  const byStore = {} as PricedIngredient["byStore"];

  let cheapestStore: StoreId | null = null;
  let cheapestTotal = Infinity;

  for (const storeId of STORE_IDS) {
    const product = await adapters[storeId].findProduct(matchKey, zip);
    if (!product) {
      byStore[storeId] = {
        product: null,
        packsNeeded: 0,
        lineTotal: 0,
        unitPrice: 0,
        matched: false,
      };
      continue;
    }
    const packs = packsNeeded(ingredient.quantity, product.packSize);
    const lineTotal = Math.round(packs * product.unitPrice * 100) / 100;
    byStore[storeId] = {
      product,
      packsNeeded: packs,
      lineTotal,
      unitPrice: product.unitPrice,
      matched: true,
    };
    if (lineTotal < cheapestTotal) {
      cheapestTotal = lineTotal;
      cheapestStore = storeId;
    }
  }

  return {
    ingredient,
    matchKey,
    byStore,
    cheapestStore,
    cheapestTotal: cheapestStore ? cheapestTotal : 0,
  };
}

export async function priceMeal(
  recipe: Recipe,
  zip: string
): Promise<MealCostSummary> {
  const ingredients = await Promise.all(
    recipe.ingredients.map((ing) => priceIngredient(ing, zip))
  );

  const byStore = {} as MealCostSummary["byStore"];
  let cheapestStore: StoreId | null = null;
  let cheapestTotal = Infinity;

  for (const storeId of STORE_IDS) {
    let total = 0;
    let matchedCount = 0;
    let missingCount = 0;
    for (const pi of ingredients) {
      const row = pi.byStore[storeId];
      if (row.matched) {
        total += row.lineTotal;
        matchedCount++;
      } else {
        missingCount++;
      }
    }
    total = Math.round(total * 100) / 100;
    byStore[storeId] = { total, matchedCount, missingCount };
    // Prefer stores that match more items; among those, lowest total
    if (matchedCount > 0) {
      const currentBest = cheapestStore
        ? byStore[cheapestStore].matchedCount
        : -1;
      if (
        matchedCount > currentBest ||
        (matchedCount === currentBest && total < cheapestTotal)
      ) {
        cheapestTotal = total;
        cheapestStore = storeId;
      }
    }
  }

  return {
    recipeId: recipe.id,
    byStore,
    cheapestStore,
    cheapestTotal: cheapestStore ? cheapestTotal : 0,
    ingredients,
  };
}

export async function buildShoppingList(
  recipes: Recipe[],
  zip: string
): Promise<ShoppingListItem[]> {
  // Aggregate by match key
  const map = new Map<
    string,
    { displayName: string; totalQuantity: number; unit: string; recipeIds: string[] }
  >();

  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      const key = normalizeKey(ing.matchKey || ing.name);
      const existing = map.get(key);
      if (existing) {
        // Only sum if same unit; otherwise keep larger qty as approximation
        if (existing.unit === ing.unit) {
          existing.totalQuantity += ing.quantity;
        } else {
          existing.totalQuantity = Math.max(existing.totalQuantity, ing.quantity);
        }
        if (!existing.recipeIds.includes(recipe.id)) {
          existing.recipeIds.push(recipe.id);
        }
      } else {
        map.set(key, {
          displayName: ing.name,
          totalQuantity: ing.quantity,
          unit: ing.unit,
          recipeIds: [recipe.id],
        });
      }
    }
  }

  const items: ShoppingListItem[] = [];
  for (const [matchKey, agg] of map) {
    const priced = await priceIngredient(
      {
        name: agg.displayName,
        quantity: agg.totalQuantity,
        unit: agg.unit,
        matchKey,
      },
      zip
    );
    items.push({
      matchKey,
      displayName: agg.displayName,
      totalQuantity: agg.totalQuantity,
      unit: agg.unit,
      recipeIds: agg.recipeIds,
      byStore: Object.fromEntries(
        STORE_IDS.map((id) => [
          id,
          {
            product: priced.byStore[id].product,
            packsNeeded: priced.byStore[id].packsNeeded,
            lineTotal: priced.byStore[id].lineTotal,
            matched: priced.byStore[id].matched,
          },
        ])
      ) as ShoppingListItem["byStore"],
      cheapestStore: priced.cheapestStore,
      cheapestTotal: priced.cheapestTotal,
    });
  }

  return items.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export function formatMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}
