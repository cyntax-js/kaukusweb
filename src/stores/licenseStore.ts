/**
 * ============================================================
 * LICENSE MANAGEMENT STORE
 * ============================================================
 * 
 * Manages license status for all platform roles.
 * Dashboard access is controlled based on license approval status.
 * 
 * Usage:
 *   import { useLicenseStore } from '@/stores/licenseStore';
 *   const { licenses, getApprovedLicenses } = useLicenseStore();
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { indexedDBStateStorage } from '@/lib/indexedDBStorage';
import { STORAGE_KEYS } from '@/lib/storage';

// ============================================================
// TYPES
// ============================================================

export type LicenseType = 'broker' | 'dealer' | 'issuing_house' | 'market_maker';
export type LicenseStatus = 'none' | 'pending' | 'approved' | 'rejected' | 'suspended';

export interface License {
  type: LicenseType;
  status: LicenseStatus;
  appliedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  expiresAt?: Date;
}

interface LicenseStore {
  // State
  licenses: Record<LicenseType, License>;
  activeDashboard: LicenseType | null;
  
  // Actions
  getLicense: (type: LicenseType) => License;
  getApprovedLicenses: () => License[];
  getPendingLicenses: () => License[];
  isLicenseApproved: (type: LicenseType) => boolean;
  canAccessDashboard: (type: LicenseType) => boolean;
  setLicenseStatus: (type: LicenseType, status: LicenseStatus) => void;
  applyForLicense: (type: LicenseType) => void;
  approveLicense: (type: LicenseType) => void;
  rejectLicense: (type: LicenseType, reason?: string) => void;
  setActiveDashboard: (type: LicenseType) => void;
  resetLicenses: () => void;
}

// ============================================================
// DEFAULT STATE
// ============================================================

const createDefaultLicense = (type: LicenseType): License => ({
  type,
  status: 'none',
});

const defaultLicenses: Record<LicenseType, License> = {
  broker: createDefaultLicense('broker'),
  dealer: createDefaultLicense('dealer'),
  issuing_house: createDefaultLicense('issuing_house'),
  market_maker: createDefaultLicense('market_maker'),
};

// ============================================================
// STORE
// ============================================================

export const useLicenseStore = create<LicenseStore>()(
  persist(
    (set, get) => ({
      licenses: defaultLicenses,
      activeDashboard: null,

      getLicense: (type) => {
        return get().licenses[type];
      },

      getApprovedLicenses: () => {
        const licenses = get().licenses;
        return Object.values(licenses).filter(l => l.status === 'approved');
      },

      getPendingLicenses: () => {
        const licenses = get().licenses;
        return Object.values(licenses).filter(l => l.status === 'pending');
      },

      isLicenseApproved: (type) => {
        return get().licenses[type].status === 'approved';
      },

      canAccessDashboard: (type) => {
        return get().licenses[type].status === 'approved';
      },

      setLicenseStatus: (type, status) => {
        set((state) => ({
          licenses: {
            ...state.licenses,
            [type]: {
              ...state.licenses[type],
              status,
              ...(status === 'approved' && { approvedAt: new Date() }),
              ...(status === 'rejected' && { rejectedAt: new Date() }),
            },
          },
        }));
      },

      applyForLicense: (type) => {
        set((state) => ({
          licenses: {
            ...state.licenses,
            [type]: {
              ...state.licenses[type],
              status: 'pending',
              appliedAt: new Date(),
            },
          },
        }));
      },

      approveLicense: (type) => {
        set((state) => ({
          licenses: {
            ...state.licenses,
            [type]: {
              ...state.licenses[type],
              status: 'approved',
              approvedAt: new Date(),
            },
          },
        }));
      },

      rejectLicense: (type, reason) => {
        set((state) => ({
          licenses: {
            ...state.licenses,
            [type]: {
              ...state.licenses[type],
              status: 'rejected',
              rejectedAt: new Date(),
              rejectionReason: reason,
            },
          },
        }));
      },

      setActiveDashboard: (type) => {
        set({ activeDashboard: type });
      },

      resetLicenses: () => {
        set({
          licenses: defaultLicenses,
          activeDashboard: null,
        });
      },
    }),
    {
      name: STORAGE_KEYS.USER + '_licenses',
      storage: createJSONStorage(() => indexedDBStateStorage),
      partialize: (state) => ({
        licenses: state.licenses,
        activeDashboard: state.activeDashboard,
      }),
    }
  )
);
