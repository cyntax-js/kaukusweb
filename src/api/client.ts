/**
 * ============================================================
 * API CLIENT UTILITIES
 * ============================================================
 * 
 * Base utilities for making API calls.
 * Currently uses mock delays - replace with real fetch calls when ready.
 * 
 * Usage:
 *   import { simulateDelay, generateId } from '@/api/client';
 */

// ============================================================
// DELAY SIMULATION
// ============================================================

/** Delay durations in milliseconds */
export const DELAYS = {
  SHORT: 300,
  MEDIUM: 800,
  LONG: 1500,
} as const;

/**
 * Simulate network delay for mock API calls
 * @param ms - Milliseconds to wait (default: MEDIUM)
 */
export const simulateDelay = (ms: number = DELAYS.MEDIUM): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Simulate API response with delay
 * @param data - Data to return
 * @param delay - Delay in ms (default: MEDIUM)
 */
export async function mockResponse<T>(data: T, delay: number = DELAYS.MEDIUM): Promise<T> {
  await simulateDelay(delay);
  return data;
}

/**
 * Simulate API error with delay
 * @param message - Error message
 * @param delay - Delay in ms (default: SHORT)
 */
export async function mockError(message: string, delay: number = DELAYS.SHORT): Promise<never> {
  await simulateDelay(delay);
  throw new Error(message);
}

// ============================================================
// ID GENERATION
// ============================================================

/**
 * Generate a random ID with optional prefix
 * @param prefix - Optional prefix (e.g., 'user', 'order')
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
};

// ============================================================
// TYPES
// ============================================================

/** Standard API response wrapper */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/** Standard API error */
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string>;
}
