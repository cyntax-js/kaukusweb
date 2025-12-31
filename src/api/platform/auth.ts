/**
 * ============================================================
 * PLATFORM AUTHENTICATION API
 * ============================================================
 *
 * Handles authentication for the ContiSX platform.
 * Used by: Login, Signup, and auth-protected pages.
 *
 * To integrate real API:
 *   1. Replace mock responses with fetch calls
 *   2. Handle tokens/sessions appropriately
 *   3. Add proper error handling
 */

import { mockResponse, generateId, DELAYS } from "../client";

// ============================================================
// TYPES
// ============================================================

export type UserRole = "broker" | "dealer" | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  isVerified: boolean;
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
  token: string;
}

// ============================================================
// API FUNCTIONS
// ============================================================

/**
 * Log in a user with email and password
 */
export async function login(request: LoginRequest): Promise<AuthResponse> {
  // TODO: Replace with real API call
  // return fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(request) });

  const user: User = {
    id: generateId("user"),
    email: request.email,
    name: request.email.split("@")[0],
    role: null,
    createdAt: new Date(),
    isVerified: true,
  };

  return mockResponse({ user, token: "mock_token_" + user.id }, DELAYS.LONG);
}

/**
 * Register a new user
 */
export async function signup(request: SignupRequest): Promise<AuthResponse> {
  // TODO: Replace with real API call

  const user: User = {
    id: generateId("user"),
    email: request.email,
    name: request.name,
    role: null,
    createdAt: new Date(),
    isVerified: false,
  };

  return mockResponse({ user, token: "mock_token_" + user.id }, DELAYS.LONG);
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  // TODO: Replace with real API call
  return mockResponse(undefined, DELAYS.SHORT);
}

/**
 * Get current user session
 */
export async function getCurrentUser(): Promise<User | null> {
  // TODO: Replace with real API call
  return mockResponse(null, DELAYS.SHORT);
}
