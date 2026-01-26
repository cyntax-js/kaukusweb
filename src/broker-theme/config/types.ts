/**
 * ============================================================
 * BROKER CONFIG - TYPE DEFINITIONS
 * ============================================================
 *
 * All TypeScript types for broker configuration.
 * This is the SCHEMA that defines what a broker platform looks like.
 *
 * @see README.md for usage examples
 */

// ============================================================
// SERVICES
// ============================================================

/** Trading services a broker can enable */
export type BrokerService =
  | "stock" // Stock trading (buy/sell assets)
  | "futures" // Futures/derivatives trading
  | "options" // Options trading
  | "private_market"; // Private/OTC markets

// ============================================================
// THEME CONFIGURATION
// ============================================================

/** Visual theme colors (all values in HSL format: "hue saturation% lightness%") */
export interface ThemeColors {
  primary: string; // Main brand color - buttons, links, active states
  accent: string; // Secondary color - highlights, success, charts
  background: string; // Page background
  foreground: string; // Text color on background
}

/** Typography settings */
export interface ThemeTypography {
  fontFamily: string; // Font from AVAILABLE_FONTS
  scale: "sm" | "md" | "lg"; // Base font size
}

/** Layout variants */
export interface ThemeLayout {
  auth: "centered" | "split" | "image-left";
  dashboard: "sidebar" | "topnav";
  orderBookPosition: "left" | "right";
}

/** Component-level customization */
export interface ThemeComponents {
  buttonSize: "sm" | "md" | "lg";
  borderRadius: "none" | "sm" | "md" | "lg" | "full";
  cardStyle: "flat" | "bordered" | "elevated";
}

/** Complete theme configuration */
export interface BrokerTheme {
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  components?: ThemeComponents; // Optional, has defaults
}

// ============================================================
// PAGE CONFIGURATION
// ============================================================

/** Which pages are enabled for this broker */
export interface BrokerPages {
  landing: boolean;
  about: boolean;
  auth: boolean;
  trading: boolean;
  markets: boolean;
  portfolio: boolean;
  settings: boolean;
}

// ============================================================
// BRANDING
// ============================================================

/** Broker branding assets */
export interface BrokerBranding {
  logoUrl?: string;
  faviconUrl?: string;
}

// ============================================================
// COMPLETE BROKER CONFIG
// ============================================================

/**
 * Complete broker configuration - Single source of truth
 *
 * This is the main type that defines everything about a broker's platform.
 * Each broker gets their own instance of this config.
 */
export interface BrokerConfig {
  // Identification
  brokerId: string;
  brokerName: string;
  subdomain: string;

  // Features
  services: BrokerService[];

  // Appearance
  template: string; // Reference to a theme preset ID
  theme: BrokerTheme; // Actual theme values (can override preset)
  pages: BrokerPages;

  // Branding assets
  branding: BrokerBranding;

  // Status
  status: "draft" | "active";
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// THEME PRESETS
// ============================================================

/** Theme preset for the gallery */
export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  preview: {
    colors: { primary: string; accent: string };
    isDark: boolean;
  };
  theme: BrokerTheme;
}

// Legacy type alias for backwards compatibility
export type TemplatePreset = ThemePreset;
export type BrokerTemplate = string;
