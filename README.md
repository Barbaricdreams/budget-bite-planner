# Budget Bite Planner

Plan thrifty meals with **DEMO / MOCK Walmart** grocery cost estimates.

**Live site:** [https://barbaricdreams.github.io/budget-bite-planner/](https://barbaricdreams.github.io/budget-bite-planner/)

> **Important:** Prices are fictional seeded data for UX demos. Nothing hits live Walmart endpoints until Affiliate/SerpApi (or similar) is wired.

## Deploy (GitHub Pages)

This app is a Next.js **static export** intended for **GitHub Actions → Pages**.

### One-time GitHub setup

1. **Add the workflow file** (required once if it is not already on `main`): create  
   `.github/workflows/deploy-pages.yml` with the contents below (GitHub → Add file), then commit to `main`.
2. **Settings → Pages → Build and deployment → Source** → **GitHub Actions**.
3. Push to `main` (or run **Actions → Deploy to GitHub Pages → Run workflow**).
4. Site URL: https://barbaricdreams.github.io/budget-bite-planner/

**Interim fallback:** a prebuilt `gh-pages` branch is on the repo. Until the Actions workflow is added, you can set **Source → Deploy from a branch → `gh-pages` / (root)** instead of GitHub Actions.

<details>
<summary>Workflow file: <code>.github/workflows/deploy-pages.yml</code></summary>

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build static export
        run: npm run build
        env:
          GITHUB_PAGES: "true"

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

</details>

Local `next dev` uses `/` (no `basePath`). The Pages workflow sets `GITHUB_PAGES=true` so production builds use `basePath` / `assetPrefix` `/budget-bite-planner`.

```bash
# Optional: preview the Pages base path locally
GITHUB_PAGES=true npm run build
npx serve out
# then open http://localhost:3000/budget-bite-planner/
```

## Features

- **Recipe browser** — ~16 budget recipes with tags, servings, cook time, difficulty, and emoji/gradient “images”
- **Meal detail** — ingredients, steps, estimated Walmart total, and per-ingredient DEMO price / not-found
- **Walmart pricing** — mock catalog with clear DEMO labels (ready to swap for live Affiliate/SerpApi)
- **Shopping list** — aggregate ingredients across selected meals into a Walmart basket total
- **ZIP setting** — mocked location that slightly nudges DEMO prices (deterministic)
- **Dark mode** — class-based theme toggle with system preference on first visit

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # static export → out/
```

No API keys or secrets are required for the mock catalog.

## Tech

- Next.js (App Router) + TypeScript + Tailwind CSS
- Static export for GitHub Pages (`output: "export"`, `trailingSlash: true`)
- Client-side pricing against an in-memory mock Walmart catalog
- Preferences (ZIP, shopping list, theme) stored in `localStorage`

## Architecture: mock vs live

```
StoreAdapter (interface)
  └── MockStoreAdapter   ← used today (seeded Walmart catalog)
  └── FutureLiveAdapter  ← Affiliate / SerpApi when keyed
```

| Piece | Path | Role |
| --- | --- | --- |
| Adapter interface | `src/lib/adapters/types.ts` | `getCatalog`, `findProduct` |
| Mock Walmart adapter | `src/lib/adapters/mock.ts` | Seeded DEMO prices |
| Seeded catalog | `src/data/catalogs.ts` | Realistic DEMO products & prices |
| Recipes | `src/data/recipes.ts` | Meal definitions |
| Fuzzy matching | `src/lib/fuzzy.ts` | Ingredient → product matching |
| Pricing engine | `src/lib/pricing.ts` | Per-ingredient & meal / list totals |

### Extending adapters

1. Implement `StoreAdapter` in `src/lib/adapters/` (set `isMock: false` for live sources).
2. Register it from `getWalmartAdapter()` in `mock.ts` (or a new `registry.ts`).
3. Keep UI DEMO banners until live data is verified.

ZIP is passed into `getCatalog(zip)` so a live adapter can regionalize assortment/pricing.

## Screens

| Route | Description |
| --- | --- |
| `/` | Recipe browser with search & tag filter |
| `/recipes/[id]` | Meal detail + Walmart DEMO cost estimate |
| `/shopping-list` | Multi-meal Walmart basket total |
| `/settings` | ZIP / location + appearance (mocked pricing) |

## License

Personal project — use freely for demos and learning.
