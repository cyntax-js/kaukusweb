/**
 * ============================================================
 * PLATFORM AUTHENTICATION API
 * ============================================================
 */

import { apiFetch } from "@/lib/utils";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  name: string;
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
    const errorMessage = errorData.errors?.[0] || "Signup failed";
    throw new Error(errorMessage);
  }

  const data = await response.json();

  return {
    user: {
      id: data.uid,
      email: data.email,
      name: data.username || request.name,
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
    await apiFetch("/api/auth/logout", { method: "POST" });
  } catch (err) {
    console.error("Logout API call failed", err);
  }
}
