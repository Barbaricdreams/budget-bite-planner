import { getWalmartAdapter } from "@/lib/adapters/mock";
import { normalizeKey } from "@/lib/fuzzy";
import type {
  Ingredient,
  MealCostSummary,
  PricedIngredient,
  Recipe,
  ShoppingListItem,
} from "@/lib/types";

const adapter = getWalmartAdapter();

function packsNeeded(qty: number, packSize: number): number {
  if (packSize <= 0) return 1;
  return Math.max(1, Math.ceil(qty / packSize));
}

export async function priceIngredient(
  ingredient: Ingredient,
  zip: string
): Promise<PricedIngredient> {
  const matchKey = ingredient.matchKey || normalizeKey(ingredient.name);
  const product = await adapter.findProduct(matchKey, zip);

  if (!product) {
    return {
      ingredient,
      matchKey,
      product: null,
      packsNeeded: 0,
      lineTotal: 0,
      unitPrice: 0,
      matched: false,
    };
  }

  const packs = packsNeeded(ingredient.quantity, product.packSize);
  const lineTotal = Math.round(packs * product.unitPrice * 100) / 100;

  return {
    ingredient,
    matchKey,
    product,
    packsNeeded: packs,
    lineTotal,
    unitPrice: product.unitPrice,
    matched: true,
  };
}

export async function priceMeal(
  recipe: Recipe,
  zip: string
): Promise<MealCostSummary> {
  const ingredients = await Promise.all(
    recipe.ingredients.map((ing) => priceIngredient(ing, zip))
  );

  let total = 0;
  let matchedCount = 0;
  let missingCount = 0;

  for (const pi of ingredients) {
    if (pi.matched) {
      total += pi.lineTotal;
      matchedCount++;
    } else {
      missingCount++;
    }
  }

  return {
    recipeId: recipe.id,
    total: Math.round(total * 100) / 100,
    matchedCount,
    missingCount,
    ingredients,
  };
}

export async function buildShoppingList(
  recipes: Recipe[],
  zip: string
): Promise<ShoppingListItem[]> {
  const map = new Map<
    string,
    { displayName: string; totalQuantity: number; unit: string; recipeIds: string[] }
  >();

  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      const key = normalizeKey(ing.matchKey || ing.name);
      const existing = map.get(key);
      if (existing) {
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
      product: priced.product,
      packsNeeded: priced.packsNeeded,
      lineTotal: priced.lineTotal,
      matched: priced.matched,
    });
  }

  return items.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export function formatMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}
