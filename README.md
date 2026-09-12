# Budget Bite Planner

Plan thrifty meals and compare **DEMO / MOCK** grocery costs across **Dollar Tree**, **Dollar General**, and **Walmart**.

> **Important:** Prices are fictional seeded data for UX demos. There are no official public consumer APIs for Dollar Tree / Dollar General. Nothing in this app hits live store endpoints.

## Features

- **Recipe browser** — ~16 budget recipes with tags, servings, cook time, difficulty, and emoji/gradient “images”
- **Meal detail** — ingredients, steps, estimated totals, and per-ingredient price comparison
- **Multi-store comparison** — Dollar Tree, Dollar General, Walmart + cheapest-store highlight
- **Shopping list** — aggregate ingredients across selected meals and compare basket totals
- **ZIP setting** — mocked location that slightly nudges DEMO prices (deterministic)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
```

No API keys or secrets are required.

## Tech

- Next.js (App Router) + TypeScript + Tailwind CSS
- Client-side pricing against in-memory mock catalogs
- Preferences (ZIP, shopping list) stored in `localStorage`

## Architecture: mock vs live

```
StoreAdapter (interface)
  └── MockStoreAdapter   ← used today (seeded catalogs)
  └── FutureLiveAdapter  ← implement when you have a data source
```

| Piece | Path | Role |
| --- | --- | --- |
| Adapter interface | `src/lib/adapters/types.ts` | `getCatalog`, `findProduct` |
| Mock adapters | `src/lib/adapters/mock.ts` | One adapter instance per store id |
| Seeded catalogs | `src/data/catalogs.ts` | Realistic DEMO products & prices |
| Recipes | `src/data/recipes.ts` | Meal definitions |
| Fuzzy matching | `src/lib/fuzzy.ts` | Ingredient → product matching |
| Pricing engine | `src/lib/pricing.ts` | Per-ingredient & meal / list totals |

### Extending adapters

1. Implement `StoreAdapter` in `src/lib/adapters/` (set `isMock: false` for live sources).
2. Register the adapter in `createMockAdapters()` (or rename to a registry) inside `mock.ts` / a new `registry.ts`.
3. Keep UI DEMO banners until live data is verified.

ZIP is passed into `getCatalog(zip)` so a live adapter can regionalize assortment/pricing.

## Screens

| Route | Description |
| --- | --- |
| `/` | Recipe browser with search & tag filter |
| `/recipes/[id]` | Meal detail + 3-store cost comparison |
| `/shopping-list` | Multi-meal basket & store totals |
| `/settings` | ZIP / location (mocked) |

## License

Personal project — use freely for demos and learning.
