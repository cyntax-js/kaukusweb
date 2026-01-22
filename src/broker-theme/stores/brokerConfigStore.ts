/**
 * IndexedDB-Persisted Broker Config Store
 * 
 * Syncs broker configuration from API/localStorage -> IndexedDB.
 * Provides persistence across page reloads and browser sessions.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { indexedDBStateStorage } from '@/lib/indexedDBStorage';
import type { BrokerConfig } from '@/broker-theme/config/types';
import { defaultBrokerConfig } from '@/broker-theme/config/engine';
import { 
  readCachedBrokerConfig, 
  writeCachedBrokerConfig,
  getCachedBrokerKeyFromLocalStorage 
} from '@/lib/brokerConfigCache';

interface BrokerConfigState {
  /** The current broker configuration */
  config: BrokerConfig | null;
  /** The broker key/subdomain for this config */
  brokerKey: string | null;
  /** Whether the config has been loaded from persistence */
  isHydrated: boolean;
  /** Timestamp of last update */
  lastUpdated: number | null;
  
  /** Set config from API or other source */
  setConfig: (brokerKey: string, config: BrokerConfig) => void;
  /** Clear stored config */
  clearConfig: () => void;
  /** Mark hydration complete */
  setHydrated: (hydrated: boolean) => void;
}

/**
 * IndexedDB-persisted store for broker config.
 * 
 * On mount: Zustand's persist middleware hydrates from IndexedDB.
 * On setConfig: Writes to both IndexedDB (via Zustand) and localStorage (sync cache).
 */
export const useBrokerConfigStore = create<BrokerConfigState>()(
  persist(
    (set, get) => ({
      config: null,
      brokerKey: null,
      isHydrated: false,
      lastUpdated: null,

      setConfig: (brokerKey: string, config: BrokerConfig) => {
        // Write to localStorage for pre-React bootstrap fallback
        writeCachedBrokerConfig(brokerKey, config);
        
        set({
          brokerKey,
          config,
          lastUpdated: Date.now(),
        });
      },

      clearConfig: () => {
        set({
          config: null,
          brokerKey: null,
          lastUpdated: null,
        });
      },

      setHydrated: (hydrated: boolean) => {
        set({ isHydrated: hydrated });
      },
    }),
    {
      name: 'ContiSX_broker_config_idb',
      storage: createJSONStorage(() => indexedDBStateStorage),
      partialize: (state) => ({
        config: state.config,
        brokerKey: state.brokerKey,
        lastUpdated: state.lastUpdated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);

/**
 * Get cached broker config on initial load (before React hydrates).
 * Reads from localStorage first (sync), then IndexedDB store takes over.
 */
export function getInitialBrokerConfig(): { brokerKey: string | null; config: BrokerConfig | null } {
  const brokerKey = getCachedBrokerKeyFromLocalStorage();
  if (!brokerKey) {
    return { brokerKey: null, config: null };
  }
  
  const config = readCachedBrokerConfig<BrokerConfig>(brokerKey);
  return { brokerKey, config };
}

/**
 * Selector hooks
 */
export const usePersistedBrokerConfig = () => useBrokerConfigStore((s) => s.config);
export const usePersistedBrokerKey = () => useBrokerConfigStore((s) => s.brokerKey);
export const useBrokerConfigHydrated = () => useBrokerConfigStore((s) => s.isHydrated);
