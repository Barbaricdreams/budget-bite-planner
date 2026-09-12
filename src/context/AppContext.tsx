"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const ZIP_KEY = "bbp-zip";
const LIST_KEY = "bbp-shopping-list";

interface AppState {
  zip: string;
  setZip: (zip: string) => void;
  selectedRecipeIds: string[];
  toggleRecipe: (id: string) => void;
  addRecipe: (id: string) => void;
  removeRecipe: (id: string) => void;
  clearList: () => void;
  isSelected: (id: string) => boolean;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [zip, setZipState] = useState("10001");
  const [selectedRecipeIds, setSelected] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const z = localStorage.getItem(ZIP_KEY);
      const list = localStorage.getItem(LIST_KEY);
      if (z) setZipState(z);
      if (list) setSelected(JSON.parse(list) as string[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ZIP_KEY, zip);
  }, [zip, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(LIST_KEY, JSON.stringify(selectedRecipeIds));
  }, [selectedRecipeIds, hydrated]);

  const setZip = useCallback((z: string) => {
    const cleaned = z.replace(/\D/g, "").slice(0, 5);
    setZipState(cleaned || "10001");
  }, []);

  const toggleRecipe = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const addRecipe = useCallback((id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removeRecipe = useCallback((id: string) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  }, []);

  const clearList = useCallback(() => setSelected([]), []);

  const isSelected = useCallback(
    (id: string) => selectedRecipeIds.includes(id),
    [selectedRecipeIds]
  );

  const value = useMemo(
    () => ({
      zip,
      setZip,
      selectedRecipeIds,
      toggleRecipe,
      addRecipe,
      removeRecipe,
      clearList,
      isSelected,
    }),
    [
      zip,
      setZip,
      selectedRecipeIds,
      toggleRecipe,
      addRecipe,
      removeRecipe,
      clearList,
      isSelected,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
