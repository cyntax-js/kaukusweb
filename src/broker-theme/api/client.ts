/**
 * ============================================================
 * BROKER THEME - API CLIENT
 * ============================================================
 * 
 * Shared utilities for mock API calls.
 * Replace these with real fetch/axios calls when integrating.
 */

// ============================================================
// DELAYS
// ============================================================

export const DELAYS = {
  SHORT: 100,
  MEDIUM: 300,
  LONG: 500,
} as const;

// ============================================================
// MOCK UTILITIES
// ============================================================

/** Simulate API response with delay */
export async function mockResponse<T>(data: T, delay: number = DELAYS.MEDIUM): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, delay));
  return data;
}

/** Generate unique ID for mock data */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
