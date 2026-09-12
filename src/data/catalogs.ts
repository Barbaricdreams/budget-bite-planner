import type { StoreId, StoreProduct } from "@/lib/types";

/**
 * Seeded DEMO catalogs. Prices are fictional mock data for UX demos only —
 * not live store prices. ZIP slightly nudges prices for location realism.
 */
type CatalogSeed = Omit<StoreProduct, "unitPrice"> & {
  prices: Record<StoreId, number | null>;
};

const SEEDS: CatalogSeed[] = [
  { id: "rice", name: "Long Grain White Rice", matchKeys: ["rice", "white rice", "long grain rice"], unit: "oz", packSize: 32, packLabel: "2 lb bag", prices: { "dollar-tree": 1.25, "dollar-general": 1.85, walmart: 1.48 } },
  { id: "pasta", name: "Spaghetti Pasta", matchKeys: ["pasta", "spaghetti", "noodles"], unit: "oz", packSize: 16, packLabel: "16 oz box", prices: { "dollar-tree": 1.25, "dollar-general": 1.15, walmart: 0.98 } },
  { id: "macaroni", name: "Elbow Macaroni", matchKeys: ["macaroni", "elbow macaroni", "mac and cheese pasta"], unit: "oz", packSize: 16, packLabel: "16 oz box", prices: { "dollar-tree": 1.25, "dollar-general": 1.1, walmart: 0.92 } },
  { id: "flour-tortillas", name: "Flour Tortillas", matchKeys: ["flour tortillas", "tortillas"], unit: "count", packSize: 10, packLabel: "10-ct pack", prices: { "dollar-tree": 1.25, "dollar-general": 1.75, walmart: 1.48 } },
  { id: "bread", name: "White Sandwich Bread", matchKeys: ["bread", "sandwich bread", "white bread"], unit: "slice", packSize: 20, packLabel: "loaf", prices: { "dollar-tree": 1.25, "dollar-general": 1.5, walmart: 1.28 } },
  { id: "eggs", name: "Large Eggs", matchKeys: ["eggs", "large eggs", "egg"], unit: "count", packSize: 12, packLabel: "dozen", prices: { "dollar-tree": null, "dollar-general": 2.45, walmart: 1.98 } },
  { id: "milk", name: "Whole Milk", matchKeys: ["milk", "whole milk"], unit: "cup", packSize: 16, packLabel: "gallon / portion", prices: { "dollar-tree": null, "dollar-general": 3.25, walmart: 2.78 } },
  { id: "butter", name: "Salted Butter", matchKeys: ["butter", "salted butter"], unit: "tbsp", packSize: 16, packLabel: "stick pack", prices: { "dollar-tree": null, "dollar-general": 3.5, walmart: 2.98 } },
  { id: "cheddar", name: "Shredded Cheddar Cheese", matchKeys: ["cheddar", "cheddar cheese", "shredded cheese", "cheese"], unit: "oz", packSize: 8, packLabel: "8 oz bag", prices: { "dollar-tree": 1.25, "dollar-general": 2.25, walmart: 1.98 } },
  { id: "mozzarella", name: "Shredded Mozzarella", matchKeys: ["mozzarella", "mozzarella cheese"], unit: "oz", packSize: 8, packLabel: "8 oz bag", prices: { "dollar-tree": 1.25, "dollar-general": 2.35, walmart: 2.12 } },
  { id: "chicken-breast", name: "Boneless Chicken Breast", matchKeys: ["chicken breast", "chicken", "boneless chicken"], unit: "oz", packSize: 24, packLabel: "1.5 lb tray", prices: { "dollar-tree": null, "dollar-general": 6.5, walmart: 5.48 } },
  { id: "ground-beef", name: "Ground Beef 80/20", matchKeys: ["ground beef", "beef", "hamburger meat"], unit: "oz", packSize: 16, packLabel: "1 lb pack", prices: { "dollar-tree": null, "dollar-general": 4.75, walmart: 4.28 } },
  { id: "ground-turkey", name: "Ground Turkey", matchKeys: ["ground turkey", "turkey"], unit: "oz", packSize: 16, packLabel: "1 lb pack", prices: { "dollar-tree": null, "dollar-general": 3.95, walmart: 3.48 } },
  { id: "canned-tuna", name: "Canned Tuna", matchKeys: ["tuna", "canned tuna"], unit: "oz", packSize: 5, packLabel: "5 oz can", prices: { "dollar-tree": 1.25, "dollar-general": 1.15, walmart: 0.98 } },
  { id: "canned-beans", name: "Black Beans", matchKeys: ["black beans", "beans", "canned beans"], unit: "oz", packSize: 15, packLabel: "15 oz can", prices: { "dollar-tree": 1.25, "dollar-general": 0.95, walmart: 0.82 } },
  { id: "kidney-beans", name: "Kidney Beans", matchKeys: ["kidney beans"], unit: "oz", packSize: 15, packLabel: "15 oz can", prices: { "dollar-tree": 1.25, "dollar-general": 0.98, walmart: 0.85 } },
  { id: "chickpeas", name: "Chickpeas / Garbanzo", matchKeys: ["chickpeas", "garbanzo beans", "garbanzo"], unit: "oz", packSize: 15, packLabel: "15 oz can", prices: { "dollar-tree": 1.25, "dollar-general": 1.05, walmart: 0.88 } },
  { id: "tomato-sauce", name: "Tomato Sauce", matchKeys: ["tomato sauce", "pasta sauce", "marinara"], unit: "oz", packSize: 15, packLabel: "15 oz can", prices: { "dollar-tree": 1.25, "dollar-general": 1.15, walmart: 0.92 } },
  { id: "diced-tomatoes", name: "Diced Tomatoes", matchKeys: ["diced tomatoes", "tomatoes canned"], unit: "oz", packSize: 14.5, packLabel: "14.5 oz can", prices: { "dollar-tree": 1.25, "dollar-general": 1.05, walmart: 0.88 } },
  { id: "salsa", name: "Chunky Salsa", matchKeys: ["salsa"], unit: "oz", packSize: 16, packLabel: "16 oz jar", prices: { "dollar-tree": 1.25, "dollar-general": 1.85, walmart: 1.68 } },
  { id: "onion", name: "Yellow Onion", matchKeys: ["onion", "yellow onion", "onions"], unit: "count", packSize: 1, packLabel: "each", prices: { "dollar-tree": 1.25, "dollar-general": 0.75, walmart: 0.68 } },
  { id: "garlic", name: "Garlic Bulb", matchKeys: ["garlic", "garlic clove", "garlic cloves"], unit: "clove", packSize: 10, packLabel: "bulb", prices: { "dollar-tree": 1.25, "dollar-general": 0.65, walmart: 0.58 } },
  { id: "potato", name: "Russet Potatoes", matchKeys: ["potato", "potatoes", "russet potato"], unit: "count", packSize: 5, packLabel: "5-lb bag portion", prices: { "dollar-tree": null, "dollar-general": 2.5, walmart: 1.98 } },
  { id: "carrot", name: "Carrots", matchKeys: ["carrot", "carrots"], unit: "count", packSize: 8, packLabel: "1 lb bag", prices: { "dollar-tree": 1.25, "dollar-general": 1.15, walmart: 0.98 } },
  { id: "celery", name: "Celery Stalks", matchKeys: ["celery"], unit: "stalk", packSize: 6, packLabel: "bunch", prices: { "dollar-tree": null, "dollar-general": 1.45, walmart: 1.28 } },
  { id: "bell-pepper", name: "Bell Pepper", matchKeys: ["bell pepper", "green pepper", "red pepper"], unit: "count", packSize: 1, packLabel: "each", prices: { "dollar-tree": 1.25, "dollar-general": 0.98, walmart: 0.88 } },
  { id: "lettuce", name: "Iceberg Lettuce", matchKeys: ["lettuce", "iceberg lettuce", "salad greens"], unit: "head", packSize: 1, packLabel: "head", prices: { "dollar-tree": null, "dollar-general": 1.65, walmart: 1.48 } },
  { id: "banana", name: "Bananas", matchKeys: ["banana", "bananas"], unit: "count", packSize: 1, packLabel: "each", prices: { "dollar-tree": null, "dollar-general": 0.35, walmart: 0.28 } },
  { id: "apple", name: "Apples", matchKeys: ["apple", "apples"], unit: "count", packSize: 1, packLabel: "each", prices: { "dollar-tree": 1.25, "dollar-general": 0.75, walmart: 0.68 } },
  { id: "peanut-butter", name: "Peanut Butter", matchKeys: ["peanut butter"], unit: "tbsp", packSize: 32, packLabel: "16 oz jar", prices: { "dollar-tree": 1.25, "dollar-general": 2.45, walmart: 2.18 } },
  { id: "jelly", name: "Grape Jelly", matchKeys: ["jelly", "grape jelly", "jam"], unit: "tbsp", packSize: 30, packLabel: "18 oz jar", prices: { "dollar-tree": 1.25, "dollar-general": 1.85, walmart: 1.58 } },
  { id: "oats", name: "Rolled Oats", matchKeys: ["oats", "rolled oats", "oatmeal"], unit: "cup", packSize: 10, packLabel: "18 oz canister", prices: { "dollar-tree": 1.25, "dollar-general": 2.15, walmart: 1.88 } },
  { id: "flour", name: "All-Purpose Flour", matchKeys: ["flour", "all purpose flour"], unit: "cup", packSize: 20, packLabel: "5 lb bag portion", prices: { "dollar-tree": null, "dollar-general": 2.25, walmart: 1.78 } },
  { id: "sugar", name: "Granulated Sugar", matchKeys: ["sugar", "granulated sugar"], unit: "cup", packSize: 8, packLabel: "2 lb bag portion", prices: { "dollar-tree": 1.25, "dollar-general": 1.75, walmart: 1.48 } },
  { id: "oil", name: "Vegetable Oil", matchKeys: ["oil", "vegetable oil", "cooking oil"], unit: "tbsp", packSize: 64, packLabel: "48 oz bottle", prices: { "dollar-tree": 1.25, "dollar-general": 3.25, walmart: 2.78 } },
  { id: "olive-oil", name: "Olive Oil", matchKeys: ["olive oil"], unit: "tbsp", packSize: 33, packLabel: "17 oz bottle", prices: { "dollar-tree": null, "dollar-general": 4.5, walmart: 3.98 } },
  { id: "soy-sauce", name: "Soy Sauce", matchKeys: ["soy sauce"], unit: "tbsp", packSize: 20, packLabel: "10 oz bottle", prices: { "dollar-tree": 1.25, "dollar-general": 1.65, walmart: 1.38 } },
  { id: "broth", name: "Chicken Broth", matchKeys: ["chicken broth", "broth", "stock"], unit: "cup", packSize: 4, packLabel: "32 oz carton", prices: { "dollar-tree": 1.25, "dollar-general": 1.85, walmart: 1.48 } },
  { id: "ramen", name: "Ramen Noodle Packs", matchKeys: ["ramen", "ramen noodles"], unit: "pack", packSize: 1, packLabel: "1 pack", prices: { "dollar-tree": 1.25, "dollar-general": 0.45, walmart: 0.38 } },
  { id: "frozen-peas", name: "Frozen Peas", matchKeys: ["peas", "frozen peas"], unit: "cup", packSize: 3, packLabel: "12 oz bag", prices: { "dollar-tree": 1.25, "dollar-general": 1.35, walmart: 1.12 } },
  { id: "frozen-corn", name: "Frozen Corn", matchKeys: ["corn", "frozen corn"], unit: "cup", packSize: 3, packLabel: "12 oz bag", prices: { "dollar-tree": 1.25, "dollar-general": 1.25, walmart: 1.08 } },
  { id: "frozen-broccoli", name: "Frozen Broccoli", matchKeys: ["broccoli", "frozen broccoli"], unit: "cup", packSize: 3, packLabel: "12 oz bag", prices: { "dollar-tree": 1.25, "dollar-general": 1.45, walmart: 1.18 } },
  { id: "canned-corn", name: "Canned Corn", matchKeys: ["canned corn"], unit: "oz", packSize: 15, packLabel: "15 oz can", prices: { "dollar-tree": 1.25, "dollar-general": 0.85, walmart: 0.72 } },
  { id: "sour-cream", name: "Sour Cream", matchKeys: ["sour cream"], unit: "tbsp", packSize: 16, packLabel: "8 oz tub", prices: { "dollar-tree": null, "dollar-general": 1.85, walmart: 1.48 } },
  { id: "yogurt", name: "Plain Yogurt", matchKeys: ["yogurt", "plain yogurt"], unit: "cup", packSize: 4, packLabel: "32 oz tub", prices: { "dollar-tree": null, "dollar-general": 2.85, walmart: 2.48 } },
  { id: "bacon", name: "Bacon", matchKeys: ["bacon"], unit: "slice", packSize: 12, packLabel: "12 oz pack", prices: { "dollar-tree": null, "dollar-general": 4.25, walmart: 3.78 } },
  { id: "hot-dogs", name: "Hot Dogs", matchKeys: ["hot dogs", "hot dog", "frankfurters"], unit: "count", packSize: 8, packLabel: "8-ct pack", prices: { "dollar-tree": 1.25, "dollar-general": 1.85, walmart: 1.48 } },
  { id: "hot-dog-buns", name: "Hot Dog Buns", matchKeys: ["hot dog buns", "buns"], unit: "count", packSize: 8, packLabel: "8-ct pack", prices: { "dollar-tree": 1.25, "dollar-general": 1.35, walmart: 1.18 } },
  { id: "rice-seasoning", name: "Taco Seasoning", matchKeys: ["taco seasoning", "seasoning packet"], unit: "packet", packSize: 1, packLabel: "1 oz packet", prices: { "dollar-tree": 1.25, "dollar-general": 0.85, walmart: 0.68 } },
  { id: "chili-powder", name: "Chili Powder", matchKeys: ["chili powder"], unit: "tsp", packSize: 20, packLabel: "spice jar", prices: { "dollar-tree": 1.25, "dollar-general": 1.15, walmart: 0.98 } },
  { id: "cumin", name: "Ground Cumin", matchKeys: ["cumin", "ground cumin"], unit: "tsp", packSize: 20, packLabel: "spice jar", prices: { "dollar-tree": 1.25, "dollar-general": 1.15, walmart: 0.98 } },
  { id: "salt", name: "Table Salt", matchKeys: ["salt", "table salt"], unit: "tsp", packSize: 100, packLabel: "26 oz canister", prices: { "dollar-tree": 1.25, "dollar-general": 0.65, walmart: 0.52 } },
  { id: "pepper", name: "Black Pepper", matchKeys: ["pepper", "black pepper"], unit: "tsp", packSize: 30, packLabel: "spice jar", prices: { "dollar-tree": 1.25, "dollar-general": 1.45, walmart: 1.18 } },
  { id: "honey", name: "Honey", matchKeys: ["honey"], unit: "tbsp", packSize: 24, packLabel: "12 oz bottle", prices: { "dollar-tree": null, "dollar-general": 3.45, walmart: 2.98 } },
  { id: "lemon", name: "Lemons", matchKeys: ["lemon", "lemons", "lemon juice"], unit: "count", packSize: 1, packLabel: "each", prices: { "dollar-tree": 1.25, "dollar-general": 0.55, walmart: 0.48 } },
  { id: "lime", name: "Limes", matchKeys: ["lime", "limes", "lime juice"], unit: "count", packSize: 1, packLabel: "each", prices: { "dollar-tree": 1.25, "dollar-general": 0.45, walmart: 0.38 } },
  { id: "cabbage", name: "Green Cabbage", matchKeys: ["cabbage", "green cabbage"], unit: "head", packSize: 1, packLabel: "head", prices: { "dollar-tree": null, "dollar-general": 1.85, walmart: 1.48 } },
  { id: "spinach", name: "Fresh Spinach", matchKeys: ["spinach", "fresh spinach"], unit: "cup", packSize: 6, packLabel: "bag", prices: { "dollar-tree": null, "dollar-general": 2.25, walmart: 1.98 } },
  { id: "potato-chips", name: "Potato Chips", matchKeys: ["chips", "potato chips"], unit: "oz", packSize: 8, packLabel: "8 oz bag", prices: { "dollar-tree": 1.25, "dollar-general": 1.85, walmart: 1.68 } },
];

/** Deterministic zip-based price nudge (±3%) for mock location realism */
function zipNudge(zip: string, storeId: StoreId): number {
  const digits = zip.replace(/\D/g, "") || "00000";
  const n = Number(digits.slice(0, 5));
  const storeBias = storeId === "walmart" ? 0 : storeId === "dollar-general" ? 1 : 2;
  const wobble = ((n + storeBias * 17) % 61) / 1000; // 0–0.06
  return 1 + (wobble - 0.03);
}

export function buildCatalog(storeId: StoreId, zip: string): StoreProduct[] {
  const nudge = zipNudge(zip, storeId);
  const products: StoreProduct[] = [];
  for (const seed of SEEDS) {
    const base = seed.prices[storeId];
    if (base == null) continue;
    products.push({
      id: `${storeId}-${seed.id}`,
      name: seed.name,
      matchKeys: seed.matchKeys,
      unitPrice: Math.round(base * nudge * 100) / 100,
      unit: seed.unit,
      packSize: seed.packSize,
      packLabel: seed.packLabel,
    });
  }
  return products;
}

export function allMatchKeys(): string[] {
  const keys = new Set<string>();
  for (const s of SEEDS) for (const k of s.matchKeys) keys.add(k);
  return [...keys];
}
