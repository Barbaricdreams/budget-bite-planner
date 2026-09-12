export type StoreId = "walmart";

export type Difficulty = "easy" | "medium" | "hard";

export interface StoreInfo {
  id: StoreId;
  name: string;
  shortName: string;
  color: string;
  accent: string;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  /** Canonical key for fuzzy price matching */
  matchKey?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  tags: string[];
  servings: number;
  cookTimeMinutes: number;
  difficulty: Difficulty;
  imageEmoji: string;
  imageGradient: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface StoreProduct {
  id: string;
  name: string;
  /** Keys this product can match (fuzzy) */
  matchKeys: string[];
  unitPrice: number;
  unit: string;
  /** How much product one pack contains (in `unit`) */
  packSize: number;
  packLabel: string;
}

export interface PricedIngredient {
  ingredient: Ingredient;
  matchKey: string;
  product: StoreProduct | null;
  packsNeeded: number;
  lineTotal: number;
  unitPrice: number;
  matched: boolean;
}

export interface MealCostSummary {
  recipeId: string;
  total: number;
  matchedCount: number;
  missingCount: number;
  ingredients: PricedIngredient[];
}

export interface ShoppingListItem {
  matchKey: string;
  displayName: string;
  totalQuantity: number;
  unit: string;
  recipeIds: string[];
  product: StoreProduct | null;
  packsNeeded: number;
  lineTotal: number;
  matched: boolean;
}
