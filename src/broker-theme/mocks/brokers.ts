/**
 * ============================================================
 * SAMPLE BROKER CONFIGURATIONS
 * ============================================================
 *
 * 📝 ADD NEW SAMPLE BROKERS HERE!
 *
 * These are example broker configurations for development/testing.
 * Each broker can reference a theme from themes.ts or override values.
 *
 * To test a broker: visit /?broker=subdomain (e.g., /?broker=fbs)
 *
 * @see ../config/README.md for full documentation
 */

import type { BrokerConfig } from "../config/types";
import { getThemePreset, DEFAULT_COMPONENTS } from "../config/themes";

// Helper to create a broker config from a theme preset
const createBrokerFromPreset = (
  id: string,
  name: string,
  subdomain: string,
  presetId: string,
  options: Partial<BrokerConfig> = {}
): BrokerConfig => {
  const preset = getThemePreset(presetId);
  if (!preset) {
    throw new Error(`Theme preset "${presetId}" not found`);
  }

  return {
    brokerId: id,
    brokerName: name,
    subdomain,
    services: ["stock", "futures", "options"],
    template: presetId,
    theme: {
      ...preset.theme,
      components: preset.theme.components ?? DEFAULT_COMPONENTS,
    },
    pages: {
      landing: true,
      about: true,
      auth: true,
      trading: true,
      markets: true,
      portfolio: true,
      settings: true,
    },
    branding: {},
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    ...options,
  };
};

// ============================================================
// SAMPLE BROKERS
// ============================================================

export const mockBrokerConfigs: BrokerConfig[] = [
  // Demo Trading - Uses "institutional" theme
  createBrokerFromPreset("demo-001", "Demo Trading", "demo", "institutional", {
    services: ["stock", "futures", "options", "private_market"],
  }),

  // FBS Markets - Uses "professional" theme with custom colors
  createBrokerFromPreset("fbs-001", "FBS Markets", "fbs", "professional", {
    theme: {
      colors: {
        primary: "24 95% 53%", // Orange brand color
        accent: "217 91% 50%", // Blue accent
        background: "0 0% 100%",
        foreground: "222 47% 11%",
      },
      typography: { fontFamily: "Inter", scale: "md" },
      layout: {
        auth: "image-left",
        dashboard: "topnav",
        orderBookPosition: "left",
      },
      components: {
        buttonSize: "md",
        borderRadius: "md",
        cardStyle: "bordered",
      },
    },
  }),

  // CryptoMax - Uses "crypto" theme
  createBrokerFromPreset("cryptomax-001", "CryptoMax", "cryptomax", "crypto", {
    services: ["stock", "futures", "options", "private_market"],
  }),

  // Forex Simple - Uses "minimal" theme
  createBrokerFromPreset(
    "forexsimple-001",
    "Forex Simple",
    "forexsimple",
    "minimal",
    {
      services: ["stock"],
    }
  ),
];
