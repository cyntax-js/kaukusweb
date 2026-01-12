/**
 * ============================================================
 * BROKER APPLICATION STORE
 * ============================================================
 *
 * Manages broker application state during onboarding.
 * Used by: Broker application flow, awaiting approval page.
 *
 * Usage:
 *   import { useBrokerStore } from '@/stores/brokerStore';
 *   const { submitApplication, status } = useBrokerStore();
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  submitApplication as apiSubmitApp,
  submitCompanyDocuments,
} from "@/api/platform/broker";
import {
  platformApi,
  type BrokerApplication,
  type BrokerStatus,
  type BrokerDocument,
} from "@/api/platform";

// ============================================================
// CONSTANTS
// ============================================================

const DOC_NAMES: Record<string, string> = {
  incorporation: "Certificate of Incorporation",
  license: "Regulatory License",
  director_id: "Director/Owner ID",
  address_proof: "Proof of Address",
  bank_statement: "Bank Statements",
  aml_policy: "AML/KYC Policy",
  business_plan: "Business Plan",
};

// ============================================================
// TYPES
// ============================================================

interface BrokerStore {
  // State
  application: Partial<BrokerApplication> | null;
  status: BrokerStatus | null;
  isSubmitting: boolean;
  approvalProgress: number;

  // Actions
  setApplicationField: <K extends keyof BrokerApplication>(
    field: K,
    value: BrokerApplication[K],
  ) => void;
  addDocument: (doc: BrokerDocument) => void;
  submitApplication: (docUrls: Record<string, string>) => Promise<void>;
  checkApprovalStatus: () => void;
  resetApplication: () => void;
}

// ============================================================
// STORE
// ============================================================

export const useBrokerStore = create<BrokerStore>((set, get) => ({
  // Initial state
  application: null,
  status: null,
  isSubmitting: false,
  approvalProgress: 0,

  /**
   * Update a single field in the application
   */
  setApplicationField: (field, value) => {
    set((state) => ({
      application: {
        ...state.application,
        [field]: value,
      },
    }));
  },

  /**
   * Add a document to the application
   */
  addDocument: (doc) => {
    set((state) => ({
      application: {
        ...state.application,
        documents: [...(state.application?.documents || []), doc],
      },
    }));
  },

  /**
   * Submit the broker application
   */
  submitApplication: async (docUrls) => {
    set({ isSubmitting: true });
    const { application } = get();

    try {
      const result = await platformApi.broker.submitApplication(application);

      const formattedDocuments = Object.entries(docUrls).map(([id, url]) => ({
        name: DOC_NAMES[id] || id,
        fileUrls: [url],
      }));

      await platformApi.broker.submitCompanyDocuments({
        company_id: result.company.id,
        legal_name: result.company.companyName,
        incorporation_date: "2022-05-10T00:00:00Z",
        business_type: "Fintech",
        document_type: "corporate",
        documents: formattedDocuments,
      });

      set({
        application: result as Partial<BrokerApplication>,
        status: "pending",
        isSubmitting: false,
        approvalProgress: 0,
      });
    } catch (error) {
      set({ isSubmitting: false });
      throw error;
    }
  },

  /**
   * Check and update approval status
   * Called by interval to simulate progress
   */
  checkApprovalStatus: () => {
    set((state) => {
      const newProgress = Math.min(
        state.approvalProgress + Math.random() * 15,
        100,
      );

      if (newProgress >= 100) {
        return {
          approvalProgress: 100,
          status: "approved",
          application: {
            ...state.application,
            status: "approved",
            approvedAt: new Date(),
          },
        };
      }

      return { approvalProgress: newProgress };
    });
  },

  /**
   * Reset application state
   */
  resetApplication: () => {
    set({
      application: null,
      status: null,
      isSubmitting: false,
      approvalProgress: 0,
    });
  },
}));
