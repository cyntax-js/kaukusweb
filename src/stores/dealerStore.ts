/**
 * ============================================================
 * DEALER APPLICATION STORE
 * ============================================================
 * 
 * Manages dealer application state during onboarding.
 * Used by: Dealer application flow, awaiting approval page.
 * 
 * Usage:
 *   import { useDealerStore } from '@/stores/dealerStore';
 *   const { submitApplication, status } = useDealerStore();
 */

import { create } from 'zustand';
import { platformApi, type DealerApplication, type DealerStatus } from '@/api/platform';

// ============================================================
// TYPES
// ============================================================

interface DealerStore {
  // State
  application: Partial<DealerApplication> | null;
  status: DealerStatus | null;
  isSubmitting: boolean;
  approvalProgress: number;
  
  // Actions
  setApplicationField: (field: keyof DealerApplication, value: any) => void;
  submitApplication: () => Promise<void>;
  checkApprovalStatus: () => void;
  resetApplication: () => void;
}

// ============================================================
// STORE
// ============================================================

export const useDealerStore = create<DealerStore>((set, get) => ({
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
   * Submit the dealer application
   */
  submitApplication: async () => {
    set({ isSubmitting: true });
    
    try {
      const currentApp = get().application;
      const result = await platformApi.dealer.submitApplication(currentApp || {});
      
      set({
        application: result,
        status: 'pending',
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
      const newProgress = Math.min(state.approvalProgress + Math.random() * 15, 100);
      
      if (newProgress >= 100) {
        return {
          approvalProgress: 100,
          status: 'approved',
          application: {
            ...state.application,
            status: 'approved',
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
