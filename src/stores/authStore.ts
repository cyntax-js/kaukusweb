/**
 * ============================================================
 * PLATFORM AUTH STORE
 * ============================================================
 *
 * Manages authentication state for the Kaukus platform.
 * Uses Zustand persist middleware for session persistence.
 * 
 * Usage:
 *   import { useAuthStore } from '@/stores/authStore';
 *   const { user, login, logout } = useAuthStore();
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { platformApi, type User, type UserRole } from "@/api/platform";
import { STORAGE_KEYS } from "@/lib/storage";
import { indexedDBStateStorage } from "@/lib/indexedDBStorage";

// ============================================================
// TYPES
// ============================================================

interface AuthStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  selectedRole: UserRole;
  _hasHydrated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  setSelectedRole: (role: UserRole) => void;
  setUser: (user: User) => void;
  setHasHydrated: (state: boolean) => void;
}

// ============================================================
// STORE WITH PERSISTENCE
// ============================================================

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      selectedRole: null,
      _hasHydrated: false,

      /**
       * Log in with email and password
       */
      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          const response = await platformApi.auth.login({ email, password });

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });

          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      /**
       * Sign up a new user
       */
      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true });

        try {
          const response = await platformApi.auth.signup({ email, password, name });

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });

          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      /**
       * Log out the current user
       */
      logout: () => {
        platformApi.auth.logout();
        set({
          user: null,
          isAuthenticated: false,
          selectedRole: null,
        });
      },

      /**
       * Set the user's selected role (broker or dealer)
       */
      setSelectedRole: (role: UserRole) => {
        set({ selectedRole: role });

        // Update user object with role
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, role } });
        }
      },

      /**
       * Manually set user (e.g., after token refresh)
       */
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      /**
       * Track hydration state
       */
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: STORAGE_KEYS.USER,
      storage: createJSONStorage(() => indexedDBStateStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedRole: state.selectedRole,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
