/**
 * Application configuration constants
 */

export const APP_CONFIG = {
  // App metadata
  NAME: "ContisX",
  DESCRIPTION: "White-label trading infrastructure platform",
  VERSION: "1.0.0",

  // API simulation delays (in ms)
  API_DELAYS: {
    SHORT: 500,
    MEDIUM: 1000,
    LONG: 1500,
    EXTRA_LONG: 2000,
  },

  // Feature flags
  FEATURES: {
    ENABLE_DARK_MODE: true,
    ENABLE_ANALYTICS: true,
    ENABLE_REALTIME_DATA: true,
    ENABLE_DEMO_MODE: true,
  },

  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },

  // Validation limits
  LIMITS: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_NAME_LENGTH: 100,
    MAX_COMPANY_NAME_LENGTH: 200,
    MAX_BIO_LENGTH: 500,
  },

  // Trading defaults
  TRADING: {
    DEFAULT_LEVERAGE: 1,
    MAX_LEVERAGE: 100,
    DEFAULT_SLIPPAGE: 0.5,
    PRICE_DECIMALS: 2,
    QUANTITY_DECIMALS: 8,
  },
} as const;

// Environment helpers
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
