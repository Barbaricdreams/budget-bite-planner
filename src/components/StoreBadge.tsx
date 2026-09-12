import { WALMART } from "@/lib/stores";

export function StoreBadge({
  size = "sm",
}: {
  size?: "sm" | "md";
}) {
  const store = WALMART;
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
