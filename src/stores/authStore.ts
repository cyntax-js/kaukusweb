/**
 * ============================================================
 * PLATFORM AUTH STORE
 * ============================================================
 *
 * Manages authentication state for the ContiSX platform.
 * Uses Zustand persist middleware for session persistence.
 *
 * Usage:
 * import { useAuthStore } from '@/stores/authStore';
 * const { user, login, logout } = useAuthStore();
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { platformApi, type User } from "@/api/platform";
import { STORAGE_KEYS } from "@/lib/storage";
import { indexedDBStateStorage } from "@/lib/indexedDBStorage";

// ============================================================
// TYPES
// ============================================================

interface AuthStore {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  selectedRole: UserRole | null;
  pendingEmail: string | null;
  _hasHydrated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<boolean>;
  getUser: () => Promise<boolean>;
  logout: () => void;
  setSelectedRole: (role: UserRole) => void;
  getSelectedRole: () => UserRole | null;
  setUser: (user: User) => void;
  setHasHydrated: (state: boolean) => void;
  getBrokerPlatforms: () => User["broker_platforms"];
  hasPlatform: (platform: string) => boolean;
}

export type UserRole = "broker" | "dealer" | "member";

// ============================================================
// STORE WITH PERSISTENCE
// ============================================================

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: localStorage.getItem("auth_token"),
      isAuthenticated: false,
      isLoading: false,
      selectedRole: null,
      pendingEmail: null,
      _hasHydrated: false,

      /**
       * Log in with email and password
       * Returns user object on success, null on failure
       */
      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          const response = await platformApi.auth.login({ email, password });

          if (response.jwt_token) {
            localStorage.setItem("auth_token", response.jwt_token);
          }

          set({
            user: response.user,
            token: response.jwt_token,
            isAuthenticated: true,
            isLoading: false,
          });

          return response.user;
        } catch {
          set({ isLoading: false });
          return null;
        }
      },

      /**
       * Sign up a new user
       */
      signup: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await platformApi.auth.signup({ email, password });

          if (response.user.state === "pending") {
            set({
              isLoading: false,
              pendingEmail: email,
              isAuthenticated: false,
            });
            return true;
          }

          set({
            user: response.user,
            token: response.jwt_token,
            isAuthenticated: true,
            isLoading: false,
            pendingEmail: null,
          });

          return true;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getUser: async () => {
        try {
          const response = await platformApi.auth.getUser();
          console.log(response);
          return true;
        } catch (error) {
          console.error("Get User failed:", error);
          throw error;
        }
      },

      verifyOtp: async (code: string) => {
        const email = get().pendingEmail;
        if (!email) return false;

        set({ isLoading: true });
        try {
          const response = await platformApi.auth.verifyOtp({
            email,
            code: code,
          });

          if (response.jwt_token) {
            localStorage.setItem("auth_token", response.jwt_token);
          }

          set({
            user: response.user,
            isAuthenticated: true,
            pendingEmail: null,
            isLoading: false,
          });

          return true;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      /**
       * Log out the current user
       */
      logout: async () => {
        await platformApi.auth.logout();
        localStorage.removeItem("auth_token");

        set({
          user: null,
          isAuthenticated: false,
          selectedRole: null,
        });

        window.location.href = "/login";
      },

      /**
       * Set the user's selected role (broker or dealer)
       */
      setSelectedRole: (role: UserRole) => {
        set({ selectedRole: role });

        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, role } });
        }
      },

      /**
       * Get the user's currently selected role.
       */
      getSelectedRole: () => {
        return get().selectedRole;
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

      /**
       * Get user's broker platforms
       */
      getBrokerPlatforms: () => {
        return get().user?.broker_platforms || [];
      },

      /**
       * Check if user has a specific platform
       */
      hasPlatform: (platform: string) => {
        const platforms = get().user?.broker_platforms || [];
        return platforms.some((p) => p.platform === platform);
      },
    }),
    {
      name: STORAGE_KEYS.USER,
      storage: createJSONStorage(() => indexedDBStateStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedRole: state.selectedRole,
        pendingEmail: state.pendingEmail,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
