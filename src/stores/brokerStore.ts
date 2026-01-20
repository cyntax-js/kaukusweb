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

export type BrokerStep = "company" | "regulatory" | "documents" | "review";

interface BrokerStore {
  application: Partial<BrokerApplication>;
  status: BrokerStatus | null;
  isSubmitting: boolean;
  currentStep: BrokerStep;

  // Actions
  setApplicationField: <K extends keyof BrokerApplication>(
    field: K,
    value: BrokerApplication[K],
  ) => void;
  addDocument: (doc: BrokerDocument) => void;
  setCurrentStep: (step: BrokerStep) => void;
  submitApplication: (docUrls: Record<string, string>) => Promise<void>;
  checkApprovalStatus: () => void;
  resetApplication: () => void;
}

// ============================================================
// STORE
// ============================================================

export const useBrokerStore = create<BrokerStore>()(
  persist(
    (set, get) => ({
      // Initial state
      application: {},
      currentStep: "company",
      status: null,
      isSubmitting: false,

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
       * Navigation Action
       */
      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      /**
       * Add a document to the application
       */
      addDocument: (doc) => {
        set((state) => ({
          application: {
            ...state.application,
            documents: [...(state.application.documents || []), doc],
          },
        }));
      },

      /**
       * Submit the broker application
       */
      submitApplication: async (docUrls) => {
        set({ isSubmitting: true });
        const { application } = get();

        if (!application || Object.keys(application).length === 0) {
          set({ isSubmitting: false });
          throw new Error("Application data is missing.");
        }

        try {
          const result =
            await platformApi.broker.submitApplication(application);

          if (!result?.company?.id) {
            throw new Error("Failed to create company: No ID returned.");
          }

          if (!result?.company?.name) {
            throw new Error(
              "Failed to create company: No company name returned.",
            );
          }

          const formattedDocuments = Object.entries(docUrls).map(
            ([id, url]) => ({
              name: DOC_NAMES[id] || id,
              fileUrls: [url],
            }),
          );

          await platformApi.broker.submitCompanyDocuments({
            company_id: result.company.id,
            legal_name: result.company.name,
            incorporation_date: "2022-05-10T00:00:00Z",
            business_type: "Fintech",
            document_type: "corporate",
            documents: formattedDocuments,
          });

          set({
            application: {
              ...application,
              ...result.company,
            } as Partial<BrokerApplication>,
            status: "pending",
            isSubmitting: false,
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
      checkApprovalStatus: async () => {
        const status = await platformApi.broker.getApplicationStatus();
        set({
          status: status.status,
        });
      },

      /**
       * Reset application state
       */
      resetApplication: () => {
        set({
          application: {},
          currentStep: "company",
          status: null,
          isSubmitting: false,
        });
      },
    }),
    {
      name: "broker-application-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        application: state.application,
        currentStep: state.currentStep,
        status: state.status,
      }),
    },
  ),
);
