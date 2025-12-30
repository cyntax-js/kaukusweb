/**
 * Type-safe localStorage utilities
 */

/**
 * Get an item from localStorage with type safety
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    console.warn(`Failed to parse localStorage item: ${key}`);
    return defaultValue;
  }
}

/**
 * Set an item in localStorage
 */
export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to set localStorage item: ${key}`, error);
  }
}

/**
 * Remove an item from localStorage
 */
export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove localStorage item: ${key}`, error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.warn("Failed to clear localStorage", error);
  }
}

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// Storage keys used throughout the app
export const STORAGE_KEYS = {
  AUTH_TOKEN: "Kaukus_auth_token",
  USER: "Kaukus_user",
  THEME: "Kaukus_theme",
  SIDEBAR_STATE: "Kaukus_sidebar_state",
  RECENT_SEARCHES: "Kaukus_recent_searches",
  WATCHLIST: "Kaukus_watchlist",
  TRADING_PREFERENCES: "Kaukus_trading_preferences",
} as const;
