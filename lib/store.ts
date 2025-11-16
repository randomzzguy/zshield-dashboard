import { create } from "zustand";

type AnalysisState = {
  analysis: any | null;
  feeResult: any | null;
  setAnalysis: (a: any | null) => void;
  setFeeResult: (f: any | null) => void;
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
  analysis: null,
  feeResult: null,
  setAnalysis: (a) => set({ analysis: a }),
  setFeeResult: (f) => set({ feeResult: f }),
}));