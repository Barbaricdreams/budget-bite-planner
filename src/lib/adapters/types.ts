import type { StoreId, StoreProduct } from "../types";

/**
 * StoreAdapter — swap MockStoreAdapter for a live API client later.
 * Implementations must return catalog products for a given ZIP (location
 * can influence assortment/pricing in a real adapter).
 */
export interface StoreAdapter {
  readonly storeId: StoreId;
  readonly isMock: boolean;
  getCatalog(zip: string): Promise<StoreProduct[]>;
  findProduct(matchKey: string, zip: string): Promise<StoreProduct | null>;
}
