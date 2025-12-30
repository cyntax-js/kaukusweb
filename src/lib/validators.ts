/**
 * Validation utilities for form inputs and data
 */

import { APP_CONFIG } from '@/constants/config';

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < APP_CONFIG.LIMITS.MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${APP_CONFIG.LIMITS.MIN_PASSWORD_LENGTH} characters`);
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  // Basic phone validation - allows various formats
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a string is not empty
 */
export function isRequired(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value.trim().length > 0;
}

/**
 * Validate string length
 */
export function isValidLength(
  value: string,
  min: number = 0,
  max: number = Infinity
): boolean {
  const length = value.trim().length;
  return length >= min && length <= max;
}

/**
 * Validate number range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validate positive number
 */
export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

/**
 * Validate trading quantity
 */
export function isValidQuantity(quantity: number): {
  isValid: boolean;
  error?: string;
} {
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    return { isValid: false, error: 'Invalid quantity' };
  }
  if (quantity <= 0) {
    return { isValid: false, error: 'Quantity must be greater than 0' };
  }
  return { isValid: true };
}

/**
 * Validate trading price
 */
export function isValidPrice(price: number): {
  isValid: boolean;
  error?: string;
} {
  if (typeof price !== 'number' || isNaN(price)) {
    return { isValid: false, error: 'Invalid price' };
  }
  if (price <= 0) {
    return { isValid: false, error: 'Price must be greater than 0' };
  }
  return { isValid: true };
}

/**
 * Sanitize user input (remove potential XSS)
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}
