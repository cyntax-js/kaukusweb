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

import { create } from 'zustand';
import { platformApi, type BrokerApplication, type BrokerStatus, type BrokerDocument } from '@/api/platform';

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
  setApplicationField: (field: keyof BrokerApplication, value: any) => void;
  addDocument: (doc: BrokerDocument) => void;
  submitApplication: () => Promise<void>;
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
  submitApplication: async () => {
    set({ isSubmitting: true });
    
    try {
      const currentApp = get().application;
      const result = await platformApi.broker.submitApplication(currentApp || {});
      
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
