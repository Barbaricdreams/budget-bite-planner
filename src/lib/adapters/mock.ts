import { buildCatalog } from "@/data/catalogs";
import { bestMatchKey, normalizeKey } from "@/lib/fuzzy";
import type { StoreProduct } from "@/lib/types";
import type { StoreAdapter } from "./types";

/**
 * MockStoreAdapter — seeded DEMO Walmart prices. No network calls.
 * Swap for a live Affiliate/SerpApi adapter when a key is available.
 */
export class MockStoreAdapter implements StoreAdapter {
  readonly storeId = "walmart" as const;
  readonly isMock = true;

  async getCatalog(zip: string): Promise<StoreProduct[]> {
    return buildCatalog(zip || "10001");
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

let singleton: MockStoreAdapter | null = null;

export function getWalmartAdapter(): StoreAdapter {
  if (!singleton) singleton = new MockStoreAdapter();
  return singleton;
}

/** @deprecated Prefer getWalmartAdapter(); kept for clarity during migration. */
export function createMockAdapters(): { walmart: StoreAdapter } {
  return { walmart: getWalmartAdapter() };
}
