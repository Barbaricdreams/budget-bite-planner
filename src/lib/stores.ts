import type { StoreId, StoreInfo } from "./types";

export const STORES: StoreInfo[] = [
  {
    id: "dollar-tree",
    name: "Dollar Tree",
    shortName: "DT",
    color: "bg-emerald-600",
    accent: "text-emerald-700 dark:text-emerald-400",
  },
  {
    id: "dollar-general",
    name: "Dollar General",
    shortName: "DG",
    color: "bg-yellow-500",
    accent: "text-yellow-700 dark:text-yellow-400",
  },
  {
    id: "walmart",
    name: "Walmart",
    shortName: "WM",
    color: "bg-blue-600",
    accent: "text-blue-700 dark:text-blue-400",
  },
];

export const STORE_IDS: StoreId[] = [
  "dollar-tree",
  "dollar-general",
  "walmart",
];

export function getStore(id: StoreId): StoreInfo {
  return STORES.find((s) => s.id === id)!;
}
