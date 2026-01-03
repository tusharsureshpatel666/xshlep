import { ParticOption, ShareConfig } from "@/type/Partitiontype";
import { Store } from "@/type/store";
import { create } from "zustand";

interface StoreSearchState {
  stores: Store[];
  setStores: (stores: Store[]) => void;
  clearStores: () => void;
}

interface StoreStep {
  sStep: number;
  setSStep: (sStep: number) => void;
  nextSStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

type ParticState = {
  share: ShareConfig;
  setMode: (mode: ParticOption) => void;
  updateShare: (data: Partial<ShareConfig>) => void;
};

export const useStoreSearch = create<StoreSearchState>((set) => ({
  stores: [],
  setStores: (stores) => set({ stores }),
  clearStores: () => set({ stores: [] }),
}));

export const useStoreStep = create<StoreStep>((set) => ({
  sStep: 0,
  setSStep: (sStep) => set({ sStep }),
  nextSStep: () => set((state) => ({ sStep: state.sStep + 1 })),
  prevStep: () => set((state) => ({ sStep: state.sStep - 1 })),
  resetStep: () => set({ sStep: 0 }),
}));

export const useParticStore = create<ParticState>((set) => ({
  share: { mode: "" },

  setMode: (mode) =>
    set({
      share: { mode }, // reset old data when mode changes
    }),

  updateShare: (data) =>
    set((state) => ({
      share: { ...state.share, ...data },
    })),
}));
