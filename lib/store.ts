import { create } from 'zustand';

interface PortfolioState {
  // Diagnostics mode toggle (used in footer)
  isDiagnosticsActive: boolean;
  toggleDiagnostics: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  isDiagnosticsActive: false,
  toggleDiagnostics: () =>
    set((state) => ({ isDiagnosticsActive: !state.isDiagnosticsActive })),
}));
