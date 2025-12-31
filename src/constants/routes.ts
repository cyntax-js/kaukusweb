/**
 * Centralized route definitions for the ContiSX platform
 * Use these constants instead of hardcoding paths throughout the app
 */

export const ROUTES = {
  // Public pages
  HOME: "/",
  LANDING: "/landing",
  ABOUT: "/about",
  PRICING: "/pricing",
  LEGAL: "/legal",

  // Auth
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    ROLE_SELECTION: "/role-selection",
  },

  // Broker
  BROKER: {
    REQUIREMENTS: "/broker/requirements",
    APPLICATION: "/broker/application",
    AWAITING_APPROVAL: "/broker/awaiting-approval",
    DASHBOARD: {
      ROOT: "/broker/dashboard",
      USERS: "/broker/dashboard/users",
      FEES: "/broker/dashboard/fees",
      SERVICES: "/broker/dashboard/services",
      ANALYTICS: "/broker/dashboard/analytics",
      SETTINGS: "/broker/dashboard/settings",
      DEPLOY: "/broker/dashboard/deploy",
    },
  },

  // Dealer
  DEALER: {
    APPLICATION: "/dealer/application",
    AWAITING_APPROVAL: "/dealer/awaiting-approval",
    DASHBOARD: {
      ROOT: "/dealer/dashboard",
      LIQUIDITY: "/dealer/dashboard/liquidity",
      MARKETS: "/dealer/dashboard/markets",
      ORDER_FLOW: "/dealer/dashboard/order-flow",
      SETTINGS: "/dealer/dashboard/settings",
    },
  },

  // Runtime (deployed broker platforms)
  RUNTIME: "/runtime",
} as const;

// Type helper for route values
export type RouteValue =
  | typeof ROUTES.HOME
  | typeof ROUTES.LANDING
  | typeof ROUTES.ABOUT
  | typeof ROUTES.PRICING
  | typeof ROUTES.LEGAL
  | (typeof ROUTES.AUTH)[keyof typeof ROUTES.AUTH]
  | (typeof ROUTES.BROKER)[keyof typeof ROUTES.BROKER]
  | (typeof ROUTES.DEALER)[keyof typeof ROUTES.DEALER]
  | typeof ROUTES.RUNTIME;
