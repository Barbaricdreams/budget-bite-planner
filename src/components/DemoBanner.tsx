export function DemoBanner() {
  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/80 dark:text-amber-100">
      <span className="font-semibold">DEMO / MOCK Walmart prices</span>
      {" — "}
      Seeded catalog for planning demos. Not live store data until
      Affiliate/SerpApi is wired.
    </div>
  );
}
