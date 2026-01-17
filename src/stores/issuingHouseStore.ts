import { create } from "zustand";

export type IssuingHouseStatus = "pending" | "approved" | "rejected" | "active";

export interface IssuingHouseApplication {
  id: string;
  companyName: string;
  registrationNumber: string;
  country: string;
  regulatoryBody: string;
  licenseNumber: string;
  yearsInOperation: string;
  servicesOffered: string[];
  contactEmail: string;
  contactPhone: string;
  status: IssuingHouseStatus;
}

interface IssuingHouseStore {
  application: Partial<IssuingHouseApplication> | null;
  status: IssuingHouseStatus | null;
  isSubmitting: boolean;
  approvalProgress: number;
  setApplicationField: (field: keyof IssuingHouseApplication, value: any) => void;
  submitApplication: () => Promise<void>;
  checkApprovalStatus: () => void;
}

export const useIssuingHouseStore = create<IssuingHouseStore>((set, get) => ({
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
