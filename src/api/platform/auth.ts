/**
 * ============================================================
 * PLATFORM AUTHENTICATION API
 * ============================================================
 */

import { apiFetch } from "@/lib/utils";
import { getFriendlyErrorMessage } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

export type UserRole = "member" | "broker" | "dealer" | null;

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  state: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  csrf_token?: string;
}

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Log in a user with email and password
 */
export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await apiFetch(`/api/v2/auth/identity/sessions`, {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();

  return {
    user: {
      id: data.uid,
      email: data.email,
      name: data.username || data.name,
      role: data.role,
      state: data.state,
      createdAt: data.created_at,
    },
    csrf_token: data.csrf_token,
  };
}

/**
 * Register a new user
 */
export async function signup(request: SignupRequest): Promise<AuthResponse> {
  const response = await apiFetch(`/api/v2/auth/identity/users`, {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();

    if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      const friendlyErrors = errorData.errors.map((code: string) =>
        getFriendlyErrorMessage(code),
      );

      throw new Error(friendlyErrors.join("\n"));
    }

    throw new Error(
      getFriendlyErrorMessage(errorData.message || "server.error"),
    );
  }

  const data = await response.json();

  return {
    user: {
      id: data.uid,
      email: data.email,
      name: data.username,
      role: data.role,
      state: data.state,
      createdAt: data.created_at,
    },
    csrf_token: data.csrf_token,
  };
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  try {
    await apiFetch(`/api/v2/auth/identity/sessions`, {
      method: "DELETE",
    });
  } catch (err) {
    console.warn("Server logout failed:", err);
  }
}
