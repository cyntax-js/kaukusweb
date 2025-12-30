/**
 * ============================================================
 * BROKER THEME - USER API
 * ============================================================
 * 
 * API for user account operations
 * Used by: LoginPage, SignupPage, SettingsPage
 * 
 * Note: This is for broker end-users, not brokers themselves.
 * Platform auth (broker/dealer login) is in src/api/platform/auth.ts
 */

import { mockResponse, generateId, DELAYS } from './client';

// ============================================================
// TYPES
// ============================================================

export interface BrokerEndUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  isVerified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
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

// ============================================================
// API FUNCTIONS
// ============================================================

/** Log in a broker's end user */
export async function login(request: LoginRequest): Promise<BrokerEndUser> {
  const user: BrokerEndUser = {
    id: generateId('user'),
    email: request.email,
    name: request.email.split('@')[0],
    createdAt: new Date(),
    isVerified: true,
    kycStatus: 'verified',
  };

  return mockResponse(user, DELAYS.LONG);
}

/** Register a new broker end user */
export async function signup(request: SignupRequest): Promise<BrokerEndUser> {
  const user: BrokerEndUser = {
    id: generateId('user'),
    email: request.email,
    name: request.name,
    createdAt: new Date(),
    isVerified: false,
    kycStatus: 'pending',
  };

  return mockResponse(user, DELAYS.LONG);
}

/** Log out user */
export async function logout(): Promise<void> {
  return mockResponse(undefined, DELAYS.SHORT);
}

/** Get current user */
export async function getCurrentUser(): Promise<BrokerEndUser | null> {
  return mockResponse(null, DELAYS.SHORT);
}

/** Update user settings */
export async function updateSettings(settings: Partial<{ name: string; email: string }>): Promise<void> {
  return mockResponse(undefined, DELAYS.MEDIUM);
}
