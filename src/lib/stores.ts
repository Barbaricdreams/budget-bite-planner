import type { StoreId, StoreInfo } from "./types";

export const WALMART: StoreInfo = {
  id: "walmart",
  name: "Walmart",
  shortName: "WM",
  color: "bg-blue-600",
  accent: "text-blue-700 dark:text-blue-400",
};

export const STORES: StoreInfo[] = [WALMART];

export const STORE_IDS: StoreId[] = ["walmart"];

export function getStore(id: StoreId = "walmart"): StoreInfo {
  return STORES.find((s) => s.id === id) ?? WALMART;
}
