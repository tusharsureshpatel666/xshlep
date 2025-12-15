import { Store } from "@/type/store";
import { create } from "zustand";

interface StoreSearchState {
  stores: Store[];
  setStores: (stores: Store[]) => void;
  clearStores: () => void;
}

export const useStoreSearch = create<StoreSearchState>((set) => ({
  stores: [],
  setStores: (stores) => set({ stores }),
  clearStores: () => set({ stores: [] }),
}));
