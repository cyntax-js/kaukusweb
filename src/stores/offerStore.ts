/**
 * Offer Store - Manages created offers from the wizard
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CreatedOffer {
  id: string;
  name: string;
  type: string;
  securityType: "DEBT" | "EQUITY";
  issuerType: string;
  marketType: string;
  instrumentType?: string;
  couponType?: string;
  equityType?: string;
  targetAmount: number;
  raisedAmount: number;
  subscriptionRate: number;
  status: "pending_approval" | "approved" | "active" | "upcoming" | "completed" | "cancelled" | "rejected";
  createdAt: Date;
  approvedAt?: Date;
  startDate?: Date;
  endDate?: Date;
  investors: number;
  minInvestment?: number;
  maxInvestment?: number;
  pricePerUnit?: number;
  totalUnits?: number;
  soldUnits: number;
  issuer?: string;
  sector?: string;
  description?: string;
  underwriter?: string;
  hasSecondaryTrading: boolean;
  regulatoryApproval: string;
  prospectusUrl?: string;
  listingReference?: string;
  admissionDate?: Date;
  // Additional schema fields
  votingRights?: boolean;
  dividendRights?: boolean;
  transferRestriction?: boolean;
  discountRate?: number;
  couponRate?: number;
  couponFrequency?: string;
  spread?: number;
  maturityDate?: Date;
  callable?: boolean;
  convertible?: boolean;
  creditRating?: string;
  preMoneyValuation?: number;
  postMoneyValuation?: number;
  valuationMethod?: string;
  eligibleInvestors?: string[];
  useOfProceeds?: string;
  // Raw form values for reference
  formValues?: Record<string, unknown>;
}

interface OfferState {
  offers: CreatedOffer[];
  pendingOffer: CreatedOffer | null;
  addOffer: (offer: CreatedOffer) => void;
  updateOffer: (id: string, updates: Partial<CreatedOffer>) => void;
  removeOffer: (id: string) => void;
  setPendingOffer: (offer: CreatedOffer | null) => void;
  getOfferById: (id: string) => CreatedOffer | undefined;
  approveOffer: (id: string) => void;
}

export const useOfferStore = create<OfferState>()(
  persist(
    (set, get) => ({
      offers: [],
      pendingOffer: null,

      addOffer: (offer) =>
        set((state) => ({
          offers: [offer, ...state.offers],
          pendingOffer: null,
        })),

      updateOffer: (id, updates) =>
        set((state) => ({
          offers: state.offers.map((o) =>
            o.id === id ? { ...o, ...updates } : o
          ),
        })),

      removeOffer: (id) =>
        set((state) => ({
          offers: state.offers.filter((o) => o.id !== id),
        })),

      setPendingOffer: (offer) =>
        set({ pendingOffer: offer }),

      getOfferById: (id) => get().offers.find((o) => o.id === id),

      approveOffer: (id) =>
        set((state) => ({
          offers: state.offers.map((o) =>
            o.id === id
              ? {
                  ...o,
                  status: "upcoming" as const,
                  approvedAt: new Date(),
                  regulatoryApproval: "SEC Approved",
                  listingReference: `NGX-${Date.now().toString(36).toUpperCase()}`,
                  admissionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                }
              : o
          ),
        })),
    }),
    {
      name: "offer-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        offers: state.offers,
      }),
    }
  )
);
