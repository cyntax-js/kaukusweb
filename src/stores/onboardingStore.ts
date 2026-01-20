/**
 * ============================================================
 * ONBOARDING STORE
 * ============================================================
 *
 * Manages multi-license onboarding flow state.
 * Supports selecting multiple license types and submitting
 * company info + KYC documents for each selected type.
 *
 * Usage:
 *   import { useOnboardingStore } from '@/stores/onboardingStore';
 *   const { selectedLicenses, companyInfo, submitOnboarding } = useOnboardingStore();
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { indexedDBStateStorage } from "@/lib/indexedDBStorage";
import {
  platformApi,
  type CompanyInfo,
  type KycType,
  type KycSubmission,
  type CompanyResponse,
} from "@/api/platform";

// ============================================================
// TYPES
// ============================================================

export type OnboardingStep = "company" | "kyc" | "review";

export interface LicenseKycData {
  licenseId: string;
  regulatoryBody: string;
  documents: Record<string, string>; // docType -> fileUrl
}

interface OnboardingStore {
  // Selected licenses for onboarding
  selectedLicenses: KycType[];
  
  // Company information (shared across all licenses)
  companyInfo: Partial<CompanyInfo>;
  companyId: string | null;
  companyName: string | null;
  
  // KYC data per license type
  kycData: Partial<Record<KycType, LicenseKycData>>;
  
  // Current step
  currentStep: OnboardingStep;
  
  // Active license being edited in KYC step
  activeKycLicense: KycType | null;
  
  // Status
  isSubmitting: boolean;
  submittedKycTypes: KycType[];
  
  // Actions
  setSelectedLicenses: (licenses: KycType[]) => void;
  setCompanyField: <K extends keyof CompanyInfo>(field: K, value: CompanyInfo[K]) => void;
  setCompanyInfo: (info: Partial<CompanyInfo>) => void;
  setKycData: (licenseType: KycType, data: Partial<LicenseKycData>) => void;
  setCurrentStep: (step: OnboardingStep) => void;
  setActiveKycLicense: (license: KycType | null) => void;
  
  // Submission actions
  submitCompanyInfo: () => Promise<CompanyResponse>;
  submitAllKyc: (docUrls: Record<KycType, Record<string, string>>) => Promise<void>;
  
  // Reset
  resetOnboarding: () => void;
}

// ============================================================
// STORE
// ============================================================

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedLicenses: [],
      companyInfo: {},
      companyId: null,
      companyName: null,
      kycData: {},
      currentStep: "company",
      activeKycLicense: null,
      isSubmitting: false,
      submittedKycTypes: [],

      setSelectedLicenses: (licenses) => {
        set({ 
          selectedLicenses: licenses,
          activeKycLicense: licenses[0] || null,
        });
      },

      setCompanyField: (field, value) => {
        set((state) => ({
          companyInfo: {
            ...state.companyInfo,
            [field]: value,
          },
        }));
      },

      setCompanyInfo: (info) => {
        set((state) => ({
          companyInfo: {
            ...state.companyInfo,
            ...info,
          },
        }));
      },

      setKycData: (licenseType, data) => {
        set((state) => ({
          kycData: {
            ...state.kycData,
            [licenseType]: {
              ...state.kycData[licenseType],
              ...data,
            } as LicenseKycData,
          },
        }));
      },

      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      setActiveKycLicense: (license) => {
        set({ activeKycLicense: license });
      },

      submitCompanyInfo: async () => {
        set({ isSubmitting: true });
        const { companyInfo } = get();

        try {
          const result = await platformApi.broker.submitCompanyInfo(
            companyInfo as CompanyInfo
          );

          set({
            companyId: result.company.id,
            companyName: result.company.name,
            isSubmitting: false,
          });

          return result;
        } catch (error) {
          set({ isSubmitting: false });
          throw error;
        }
      },

      submitAllKyc: async (docUrls) => {
        set({ isSubmitting: true });
        const { companyId, companyName, selectedLicenses, kycData } = get();

        if (!companyId || !companyName) {
          set({ isSubmitting: false });
          throw new Error("Company ID is missing. Please submit company info first.");
        }

        try {
          // Build KYC documents object for all selected licenses
          const kycDocuments: Partial<Record<KycType, KycSubmission>> = {};

          for (const licenseType of selectedLicenses) {
            const licenseKyc = kycData[licenseType];
            const licenseDocUrls = docUrls[licenseType] || {};

            if (licenseKyc) {
              const documents = Object.entries(licenseDocUrls).map(([docName, url]) => ({
                name: docName,
                fileUrls: [url],
              }));

              kycDocuments[licenseType] = {
                license_id: licenseKyc.licenseId || "",
                regulatory_body: licenseKyc.regulatoryBody || "",
                documents,
              };
            }
          }

          await platformApi.broker.submitCompanyKyc({
            company_id: companyId,
            legal_name: companyName,
            incorporation_date: new Date().toISOString(),
            business_type: "Fintech",
            document_type: "corporate",
            kyc_documents: kycDocuments,
          });

          set({
            submittedKycTypes: selectedLicenses,
            isSubmitting: false,
          });
        } catch (error) {
          set({ isSubmitting: false });
          throw error;
        }
      },

      resetOnboarding: () => {
        set({
          selectedLicenses: [],
          companyInfo: {},
          companyId: null,
          companyName: null,
          kycData: {},
          currentStep: "company",
          activeKycLicense: null,
          isSubmitting: false,
          submittedKycTypes: [],
        });
      },
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => indexedDBStateStorage),
      partialize: (state) => ({
        selectedLicenses: state.selectedLicenses,
        companyInfo: state.companyInfo,
        companyId: state.companyId,
        companyName: state.companyName,
        kycData: state.kycData,
        currentStep: state.currentStep,
        activeKycLicense: state.activeKycLicense,
        submittedKycTypes: state.submittedKycTypes,
      }),
    }
  )
);
