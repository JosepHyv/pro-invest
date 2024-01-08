import { create } from "zustand";

const useSimulationStore = create((set) => ({
  simulation: {},
  setSim: (simulation) => set(() => ({ simulation })),
}));

const useComparationStore = create((set) => ({
  comparation: {},
  setCom: (comparation) => set(() => ({ comparation })),
}));

export { useSimulationStore, useComparationStore };
