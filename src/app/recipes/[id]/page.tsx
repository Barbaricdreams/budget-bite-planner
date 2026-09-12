import { RECIPES } from "@/data/recipes";
import { RecipeDetailClient } from "./RecipeDetailClient";

export function generateStaticParams() {
  return RECIPES.map((recipe) => ({ id: recipe.id }));
}

export default function RecipeDetailPage() {
  return <RecipeDetailClient />;
}
