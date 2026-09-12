"use client";

import { useState } from "react";
import { ThemeToggle, useTheme } from "@/components/ThemeProvider";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { zip, setZip } = useApp();
  const { theme, setTheme } = useTheme();
  const [draft, setDraft] = useState(zip);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Location nudges DEMO catalog prices slightly for realism. No network
          calls are made.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Appearance
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Preference is saved in this browser. First visit follows your
              system theme.
            </p>
          </div>
          <ThemeToggle showLabel className="px-3" />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
              theme === "light"
                ? "border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200 dark:border-emerald-400 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
              theme === "dark"
                ? "border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200 dark:border-emerald-400 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            Dark
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <label
          htmlFor="zip"
          className="block text-sm font-semibold text-slate-800 dark:text-slate-100"
        >
          ZIP / postal code
        </label>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Mocked location setting — used only to seed deterministic price
          variation in MockStoreAdapter.
        </p>
        <div className="mt-4 flex gap-2">
          <input
            id="zip"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            value={draft}
            onChange={(e) => setDraft(e.target.value.replace(/\D/g, "").slice(0, 5))}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            placeholder="10001"
          />
          <button
            type="button"
            onClick={() => setZip(draft)}
            className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Save
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Current ZIP: <strong className="dark:text-slate-200">{zip}</strong>
        </p>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950 dark:border-amber-800/60 dark:bg-amber-950/70 dark:text-amber-100">
        <h2 className="font-bold">About DEMO pricing</h2>
        <p className="mt-2 leading-relaxed">
          There are no official public consumer APIs for Dollar Tree or Dollar
          General. This app uses{" "}
          <code className="rounded bg-white px-1 dark:bg-slate-900/80">
            MockStoreAdapter
          </code>{" "}
          with seeded catalogs. Labels in the UI mark all figures as DEMO/MOCK.
          To go live later, implement the{" "}
          <code className="rounded bg-white px-1 dark:bg-slate-900/80">
            StoreAdapter
          </code>{" "}
          interface with a real data source and register it in{" "}
          <code className="rounded bg-white px-1 dark:bg-slate-900/80">
            src/lib/adapters/
          </code>
          .
        </p>
      </section>
    </div>
  );
}
