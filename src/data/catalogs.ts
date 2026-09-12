import type { StoreProduct } from "@/lib/types";

/**
 * Seeded DEMO Walmart catalog. Prices are fictional mock data for UX demos
 * until Affiliate/SerpApi (or similar) is wired. ZIP slightly nudges prices.
 */
type CatalogSeed = Omit<StoreProduct, "id" | "unitPrice"> & {
  id: string;
  price: number;
};

const SEEDS: CatalogSeed[] = [
  { id: "rice", name: "Long Grain White Rice", matchKeys: ["rice", "white rice", "long grain rice"], unit: "oz", packSize: 32, packLabel: "2 lb bag", price: 1.48 },
  { id: "pasta", name: "Spaghetti Pasta", matchKeys: ["pasta", "spaghetti", "noodles"], unit: "oz", packSize: 16, packLabel: "16 oz box", price: 0.98 },
  { id: "macaroni", name: "Elbow Macaroni", matchKeys: ["macaroni", "elbow macaroni", "mac and cheese pasta"], unit: "oz", packSize: 16, packLabel: "16 oz box", price: 0.92 },
  { id: "flour-tortillas", name: "Flour Tortillas", matchKeys: ["flour tortillas", "tortillas"], unit: "count", packSize: 10, packLabel: "10-ct pack", price: 1.48 },
  { id: "bread", name: "White Sandwich Bread", matchKeys: ["bread", "sandwich bread", "white bread"], unit: "slice", packSize: 20, packLabel: "loaf", price: 1.28 },
  { id: "eggs", name: "Large Eggs", matchKeys: ["eggs", "large eggs", "egg"], unit: "count", packSize: 12, packLabel: "dozen", price: 1.98 },
  { id: "milk", name: "Whole Milk", matchKeys: ["milk", "whole milk"], unit: "cup", packSize: 16, packLabel: "gallon / portion", price: 2.78 },
  { id: "butter", name: "Salted Butter", matchKeys: ["butter", "salted butter"], unit: "tbsp", packSize: 16, packLabel: "stick pack", price: 2.98 },
  { id: "cheddar", name: "Shredded Cheddar Cheese", matchKeys: ["cheddar", "cheddar cheese", "shredded cheese", "cheese"], unit: "oz", packSize: 8, packLabel: "8 oz bag", price: 1.98 },
  { id: "mozzarella", name: "Shredded Mozzarella", matchKeys: ["mozzarella", "mozzarella cheese"], unit: "oz", packSize: 8, packLabel: "8 oz bag", price: 2.12 },
  { id: "chicken-breast", name: "Boneless Chicken Breast", matchKeys: ["chicken breast", "chicken", "boneless chicken"], unit: "oz", packSize: 24, packLabel: "1.5 lb tray", price: 5.48 },
  { id: "ground-beef", name: "Ground Beef 80/20", matchKeys: ["ground beef", "beef", "hamburger meat"], unit: "oz", packSize: 16, packLabel: "1 lb pack", price: 4.28 },
  { id: "ground-turkey", name: "Ground Turkey", matchKeys: ["ground turkey", "turkey"], unit: "oz", packSize: 16, packLabel: "1 lb pack", price: 3.48 },
  { id: "canned-tuna", name: "Canned Tuna", matchKeys: ["tuna", "canned tuna"], unit: "oz", packSize: 5, packLabel: "5 oz can", price: 0.98 },
  { id: "canned-beans", name: "Black Beans", matchKeys: ["black beans", "beans", "canned beans"], unit: "oz", packSize: 15, packLabel: "15 oz can", price: 0.82 },
  { id: "kidney-beans", name: "Kidney Beans", matchKeys: ["kidney beans"], unit: "oz", packSize: 15, packLabel: "15 oz can", price: 0.85 },
  { id: "chickpeas", name: "Chickpeas / Garbanzo", matchKeys: ["chickpeas", "garbanzo beans", "garbanzo"], unit: "oz", packSize: 15, packLabel: "15 oz can", price: 0.88 },
  { id: "tomato-sauce", name: "Tomato Sauce", matchKeys: ["tomato sauce", "pasta sauce", "marinara"], unit: "oz", packSize: 15, packLabel: "15 oz can", price: 0.92 },
  { id: "diced-tomatoes", name: "Diced Tomatoes", matchKeys: ["diced tomatoes", "tomatoes canned"], unit: "oz", packSize: 14.5, packLabel: "14.5 oz can", price: 0.88 },
  { id: "salsa", name: "Chunky Salsa", matchKeys: ["salsa"], unit: "oz", packSize: 16, packLabel: "16 oz jar", price: 1.68 },
  { id: "onion", name: "Yellow Onion", matchKeys: ["onion", "yellow onion", "onions"], unit: "count", packSize: 1, packLabel: "each", price: 0.68 },
  { id: "garlic", name: "Garlic Bulb", matchKeys: ["garlic", "garlic clove", "garlic cloves"], unit: "clove", packSize: 10, packLabel: "bulb", price: 0.58 },
  { id: "potato", name: "Russet Potatoes", matchKeys: ["potato", "potatoes", "russet potato"], unit: "count", packSize: 5, packLabel: "5-lb bag portion", price: 1.98 },
  { id: "carrot", name: "Carrots", matchKeys: ["carrot", "carrots"], unit: "count", packSize: 8, packLabel: "1 lb bag", price: 0.98 },
  { id: "celery", name: "Celery Stalks", matchKeys: ["celery"], unit: "stalk", packSize: 6, packLabel: "bunch", price: 1.28 },
  { id: "bell-pepper", name: "Bell Pepper", matchKeys: ["bell pepper", "green pepper", "red pepper"], unit: "count", packSize: 1, packLabel: "each", price: 0.88 },
  { id: "lettuce", name: "Iceberg Lettuce", matchKeys: ["lettuce", "iceberg lettuce", "salad greens"], unit: "head", packSize: 1, packLabel: "head", price: 1.48 },
  { id: "banana", name: "Bananas", matchKeys: ["banana", "bananas"], unit: "count", packSize: 1, packLabel: "each", price: 0.28 },
  { id: "apple", name: "Apples", matchKeys: ["apple", "apples"], unit: "count", packSize: 1, packLabel: "each", price: 0.68 },
  { id: "peanut-butter", name: "Peanut Butter", matchKeys: ["peanut butter"], unit: "tbsp", packSize: 32, packLabel: "16 oz jar", price: 2.18 },
  { id: "jelly", name: "Grape Jelly", matchKeys: ["jelly", "grape jelly", "jam"], unit: "tbsp", packSize: 30, packLabel: "18 oz jar", price: 1.58 },
  { id: "oats", name: "Rolled Oats", matchKeys: ["oats", "rolled oats", "oatmeal"], unit: "cup", packSize: 10, packLabel: "18 oz canister", price: 1.88 },
  { id: "flour", name: "All-Purpose Flour", matchKeys: ["flour", "all purpose flour"], unit: "cup", packSize: 20, packLabel: "5 lb bag portion", price: 1.78 },
  { id: "sugar", name: "Granulated Sugar", matchKeys: ["sugar", "granulated sugar"], unit: "cup", packSize: 8, packLabel: "2 lb bag portion", price: 1.48 },
  { id: "oil", name: "Vegetable Oil", matchKeys: ["oil", "vegetable oil", "cooking oil"], unit: "tbsp", packSize: 64, packLabel: "48 oz bottle", price: 2.78 },
  { id: "olive-oil", name: "Olive Oil", matchKeys: ["olive oil"], unit: "tbsp", packSize: 33, packLabel: "17 oz bottle", price: 3.98 },
  { id: "soy-sauce", name: "Soy Sauce", matchKeys: ["soy sauce"], unit: "tbsp", packSize: 20, packLabel: "10 oz bottle", price: 1.38 },
  { id: "broth", name: "Chicken Broth", matchKeys: ["chicken broth", "broth", "stock"], unit: "cup", packSize: 4, packLabel: "32 oz carton", price: 1.48 },
  { id: "ramen", name: "Ramen Noodle Packs", matchKeys: ["ramen", "ramen noodles"], unit: "pack", packSize: 1, packLabel: "1 pack", price: 0.38 },
  { id: "frozen-peas", name: "Frozen Peas", matchKeys: ["peas", "frozen peas"], unit: "cup", packSize: 3, packLabel: "12 oz bag", price: 1.12 },
  { id: "frozen-corn", name: "Frozen Corn", matchKeys: ["corn", "frozen corn"], unit: "cup", packSize: 3, packLabel: "12 oz bag", price: 1.08 },
  { id: "frozen-broccoli", name: "Frozen Broccoli", matchKeys: ["broccoli", "frozen broccoli"], unit: "cup", packSize: 3, packLabel: "12 oz bag", price: 1.18 },
  { id: "canned-corn", name: "Canned Corn", matchKeys: ["canned corn"], unit: "oz", packSize: 15, packLabel: "15 oz can", price: 0.72 },
  { id: "sour-cream", name: "Sour Cream", matchKeys: ["sour cream"], unit: "tbsp", packSize: 16, packLabel: "8 oz tub", price: 1.48 },
  { id: "yogurt", name: "Plain Yogurt", matchKeys: ["yogurt", "plain yogurt"], unit: "cup", packSize: 4, packLabel: "32 oz tub", price: 2.48 },
  { id: "bacon", name: "Bacon", matchKeys: ["bacon"], unit: "slice", packSize: 12, packLabel: "12 oz pack", price: 3.78 },
  { id: "hot-dogs", name: "Hot Dogs", matchKeys: ["hot dogs", "hot dog", "frankfurters"], unit: "count", packSize: 8, packLabel: "8-ct pack", price: 1.48 },
  { id: "hot-dog-buns", name: "Hot Dog Buns", matchKeys: ["hot dog buns", "buns"], unit: "count", packSize: 8, packLabel: "8-ct pack", price: 1.18 },
  { id: "rice-seasoning", name: "Taco Seasoning", matchKeys: ["taco seasoning", "seasoning packet"], unit: "packet", packSize: 1, packLabel: "1 oz packet", price: 0.68 },
  { id: "chili-powder", name: "Chili Powder", matchKeys: ["chili powder"], unit: "tsp", packSize: 20, packLabel: "spice jar", price: 0.98 },
  { id: "cumin", name: "Ground Cumin", matchKeys: ["cumin", "ground cumin"], unit: "tsp", packSize: 20, packLabel: "spice jar", price: 0.98 },
  { id: "salt", name: "Table Salt", matchKeys: ["salt", "table salt"], unit: "tsp", packSize: 100, packLabel: "26 oz canister", price: 0.52 },
  { id: "pepper", name: "Black Pepper", matchKeys: ["pepper", "black pepper"], unit: "tsp", packSize: 30, packLabel: "spice jar", price: 1.18 },
  { id: "honey", name: "Honey", matchKeys: ["honey"], unit: "tbsp", packSize: 24, packLabel: "12 oz bottle", price: 2.98 },
  { id: "lemon", name: "Lemons", matchKeys: ["lemon", "lemons", "lemon juice"], unit: "count", packSize: 1, packLabel: "each", price: 0.48 },
  { id: "lime", name: "Limes", matchKeys: ["lime", "limes", "lime juice"], unit: "count", packSize: 1, packLabel: "each", price: 0.38 },
  { id: "cabbage", name: "Green Cabbage", matchKeys: ["cabbage", "green cabbage"], unit: "head", packSize: 1, packLabel: "head", price: 1.48 },
  { id: "spinach", name: "Fresh Spinach", matchKeys: ["spinach", "fresh spinach"], unit: "cup", packSize: 6, packLabel: "bag", price: 1.98 },
  { id: "potato-chips", name: "Potato Chips", matchKeys: ["chips", "potato chips"], unit: "oz", packSize: 8, packLabel: "8 oz bag", price: 1.68 },
];

/** Deterministic zip-based price nudge (±3%) for mock location realism */
function zipNudge(zip: string): number {
  const digits = zip.replace(/\D/g, "") || "00000";
  const n = Number(digits.slice(0, 5));
  const wobble = (n % 61) / 1000; // 0–0.06
  return 1 + (wobble - 0.03);
}

export function buildCatalog(zip: string): StoreProduct[] {
  const nudge = zipNudge(zip);
  return SEEDS.map((seed) => ({
    id: `walmart-${seed.id}`,
    name: seed.name,
    matchKeys: seed.matchKeys,
    unitPrice: Math.round(seed.price * nudge * 100) / 100,
    unit: seed.unit,
    packSize: seed.packSize,
    packLabel: seed.packLabel,
  }));
}

export function allMatchKeys(): string[] {
  const keys = new Set<string>();
  for (const s of SEEDS) for (const k of s.matchKeys) keys.add(k);
  return [...keys];
}
