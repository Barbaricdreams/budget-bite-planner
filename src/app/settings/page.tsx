"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { zip, setZip } = useApp();
  const [draft, setDraft] = useState(zip);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Location nudges DEMO catalog prices slightly for realism. No network
          calls are made.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label
          htmlFor="zip"
          className="block text-sm font-semibold text-slate-800"
        >
          ZIP / postal code
        </label>
        <p className="mt-1 text-xs text-slate-500">
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
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-emerald-500 focus:ring-2"
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
        <p className="mt-3 text-xs text-slate-500">
          Current ZIP: <strong>{zip}</strong>
        </p>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
        <h2 className="font-bold">About DEMO pricing</h2>
        <p className="mt-2 leading-relaxed">
          There are no official public consumer APIs for Dollar Tree or Dollar
          General. This app uses <code className="rounded bg-white px-1">MockStoreAdapter</code>{" "}
          with seeded catalogs. Labels in the UI mark all figures as DEMO/MOCK.
          To go live later, implement the <code className="rounded bg-white px-1">StoreAdapter</code>{" "}
          interface with a real data source and register it in{" "}
          <code className="rounded bg-white px-1">src/lib/adapters/</code>.
        </p>
      </section>
    </div>
  );
}
