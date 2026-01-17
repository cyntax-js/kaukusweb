import { create } from "zustand";

export type MarketMakerStatus = "pending" | "approved" | "rejected" | "active";

export interface MarketMakerApplication {
  id: string;
  firmName: string;
  registrationNumber: string;
  country: string;
  regulatoryBody: string;
  licenseNumber: string;
  capitalCommitment: string;
  marketsToServe: string[];
  contactEmail: string;
  contactPhone: string;
  status: MarketMakerStatus;
}

interface MarketMakerStore {
  application: Partial<MarketMakerApplication> | null;
  status: MarketMakerStatus | null;
  isSubmitting: boolean;
  approvalProgress: number;
  setApplicationField: (field: keyof MarketMakerApplication, value: any) => void;
  submitApplication: () => Promise<void>;
  checkApprovalStatus: () => void;
}

export const useMarketMakerStore = create<MarketMakerStore>((set, get) => ({
  application: null,
  status: null,
  isSubmitting: false,
  approvalProgress: 0,

  setApplicationField: (field, value) => {
    set((state) => ({ application: { ...state.application, [field]: value } }));
  },

  submitApplication: async () => {
    set({ isSubmitting: true });
    await new Promise((r) => setTimeout(r, 1500));
    set({ status: "pending", isSubmitting: false, approvalProgress: 0 });
  },

  checkApprovalStatus: () => {
    set((state) => {
      const newProgress = Math.min(state.approvalProgress + Math.random() * 15, 100);
      if (newProgress >= 100) {
        return { approvalProgress: 100, status: "approved" };
      }
      return { approvalProgress: newProgress };
    });
  },
}));
