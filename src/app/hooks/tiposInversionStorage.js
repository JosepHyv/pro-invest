import { create } from "zustand";

const useInversionTypeStorage = create((set) => ({
  inversionTypes: [],
  setInv: (inversionTypes) => set(() => ({ inversionTypes })),
}));

export default useInversionTypeStorage;
