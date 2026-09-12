import { getStore } from "@/lib/stores";
import type { StoreId } from "@/lib/types";

export function StoreBadge({
  storeId,
  size = "sm",
}: {
  storeId: StoreId;
  size?: "sm" | "md";
}) {
  const store = getStore(storeId);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold text-white ${store.color} ${
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
      }`}
    >
      <span className="opacity-90">{store.shortName}</span>
      <span>{store.name}</span>
    </span>
  );
}
