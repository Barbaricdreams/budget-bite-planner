import { buildCatalog } from "@/data/catalogs";
import { bestMatchKey, normalizeKey } from "@/lib/fuzzy";
import type { StoreId, StoreProduct } from "@/lib/types";
import type { StoreAdapter } from "./types";

/**
 * MockStoreAdapter — seeded DEMO prices. No network calls.
 * Replace with live adapters that implement StoreAdapter when APIs exist.
 */
export class MockStoreAdapter implements StoreAdapter {
  readonly isMock = true;

  constructor(readonly storeId: StoreId) {}

  async getCatalog(zip: string): Promise<StoreProduct[]> {
    return buildCatalog(this.storeId, zip || "10001");
  }

  async findProduct(matchKey: string, zip: string): Promise<StoreProduct | null> {
    const catalog = await this.getCatalog(zip);
    const allKeys = catalog.flatMap((p) => p.matchKeys);
    const hit = bestMatchKey(matchKey, allKeys, 0.35);
    if (!hit) return null;

    const product = catalog.find((p) =>
      p.matchKeys.some((k) => normalizeKey(k) === normalizeKey(hit.key))
    );
    return product ?? null;
  }
}

export function createMockAdapters(): Record<StoreId, StoreAdapter> {
  return {
    "dollar-tree": new MockStoreAdapter("dollar-tree"),
    "dollar-general": new MockStoreAdapter("dollar-general"),
    walmart: new MockStoreAdapter("walmart"),
  };
}
