/**
 * ============================================================
 * BROKER THEME - AUTH STORE
 * ============================================================
 * 
 * Mock authentication store for broker theme users.
 * Provides login, signup, logout functionality with persistence.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { indexedDBStateStorage } from '@/lib/indexedDBStorage';

// ============================================================
// TYPES
// ============================================================

export interface BrokerUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface BrokerAuthState {
  user: BrokerUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

// ============================================================
// MOCK AUTH SIMULATION
// ============================================================

const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 800));

const generateUserId = () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// ============================================================
// STORE
// ============================================================

export const useBrokerAuthStore = create<BrokerAuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        await simulateDelay();

        // Mock validation - accept any valid-looking email
        if (!email.includes('@') || password.length < 4) {
          set({ isLoading: false, error: 'Invalid email or password' });
          return false;
        }

        // Create mock user from email
        const namePart = email.split('@')[0];
        const user: BrokerUser = {
          id: generateUserId(),
          email,
          firstName: namePart.charAt(0).toUpperCase() + namePart.slice(1),
          lastName: 'User',
          createdAt: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      },

      signup: async (data) => {
        set({ isLoading: true, error: null });

        await simulateDelay();

        // Mock validation
        if (!data.email.includes('@')) {
          set({ isLoading: false, error: 'Invalid email address' });
          return false;
        }

        if (data.password.length < 8) {
          set({ isLoading: false, error: 'Password must be at least 8 characters' });
          return false;
        }

        // Create user
        const user: BrokerUser = {
          id: generateUserId(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          createdAt: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'broker_auth_session',
      storage: createJSONStorage(() => indexedDBStateStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
