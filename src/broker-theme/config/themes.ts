/**
 * ============================================================
 * THEME PRESETS
 * ============================================================
 * 
 * 🎨 ADD NEW THEMES HERE!
 * 
 * This file contains all pre-built themes that brokers can choose from.
 * Each theme defines colors, typography, layout, and component styles.
 * 
 * @see README.md for detailed instructions
 */

import type { ThemePreset, BrokerTheme, ThemeComponents } from './types';

// ============================================================
// AVAILABLE FONTS
// ============================================================

/** Fonts that can be used in themes */
export const AVAILABLE_FONTS = [
  'Inter',
  'Plus Jakarta Sans',
  'JetBrains Mono',
  'Roboto',
  'Space Grotesk',
  'DM Sans',
  'Outfit',
  'Manrope',
  'Poppins',
  'Sora',
] as const;

export type AvailableFont = typeof AVAILABLE_FONTS[number];

// ============================================================
// DEFAULT COMPONENT STYLES
// ============================================================

export const DEFAULT_COMPONENTS: ThemeComponents = {
  buttonSize: 'md',
  borderRadius: 'md',
  cardStyle: 'elevated',
};

// ============================================================
// THEME PRESETS
// ============================================================

/**
 * 🎨 PRE-BUILT THEMES
 * 
 * To add a new theme:
 * 1. Copy an existing theme object
 * 2. Change the `id` to a unique identifier
 * 3. Update colors, typography, layout, and components
 * 4. The theme will automatically appear in the Theme Gallery
 */
export const THEME_PRESETS: ThemePreset[] = [
  // ─────────────────────────────────────────────────────────
  // THEME 1: CLASSIC
  // ─────────────────────────────────────────────────────────
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional finance aesthetic with navy blues and gold accents',
    preview: {
      colors: { primary: '217 91% 40%', accent: '38 92% 50%' },
      isDark: false,
    },
    theme: {
      colors: {
        primary: '217 91% 40%',      // Navy blue
        accent: '38 92% 50%',        // Gold
        background: '210 20% 98%',   // Light gray
        foreground: '222 47% 11%',   // Dark text
      },
      typography: {
        fontFamily: 'DM Sans',
        scale: 'md',
      },
      layout: {
        auth: 'centered',
        dashboard: 'sidebar',
        orderBookPosition: 'right',
      },
      components: {
        buttonSize: 'md',
        borderRadius: 'md',
        cardStyle: 'bordered',
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // THEME 2: MODERN
  // ─────────────────────────────────────────────────────────
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary dark design with vibrant purple and teal',
    preview: {
      colors: { primary: '262 83% 58%', accent: '162 63% 45%' },
      isDark: true,
    },
    theme: {
      colors: {
        primary: '262 83% 58%',      // Vibrant purple
        accent: '162 63% 45%',       // Teal
        background: '222 47% 6%',    // Dark background
        foreground: '210 40% 98%',   // Light text
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        scale: 'md',
      },
      layout: {
        auth: 'split',
        dashboard: 'topnav',
        orderBookPosition: 'right',
      },
      components: {
        buttonSize: 'md',
        borderRadius: 'lg',
        cardStyle: 'elevated',
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // THEME 3: PROFESSIONAL
  // ─────────────────────────────────────────────────────────
  {
    id: 'professional',
    name: 'Professional',
    description: 'Enterprise-grade design for institutional clients',
    preview: {
      colors: { primary: '220 14% 20%', accent: '217 91% 50%' },
      isDark: false,
    },
    theme: {
      colors: {
        primary: '220 14% 20%',      // Charcoal
        accent: '217 91% 50%',       // Blue
        background: '0 0% 100%',     // White
        foreground: '222 47% 11%',   // Dark text
      },
      typography: {
        fontFamily: 'DM Sans',
        scale: 'lg',
      },
      layout: {
        auth: 'image-left',
        dashboard: 'topnav',
        orderBookPosition: 'left',
      },
      components: {
        buttonSize: 'lg',
        borderRadius: 'sm',
        cardStyle: 'bordered',
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // THEME 4: MINIMAL
  // ─────────────────────────────────────────────────────────
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design focused on usability',
    preview: {
      colors: { primary: '0 0% 9%', accent: '162 63% 41%' },
      isDark: false,
    },
    theme: {
      colors: {
        primary: '0 0% 9%',          // Black
        accent: '162 63% 41%',       // Green
        background: '0 0% 100%',     // White
        foreground: '0 0% 9%',       // Black text
      },
      typography: {
        fontFamily: 'DM Sans',
        scale: 'sm',
      },
      layout: {
        auth: 'centered',
        dashboard: 'topnav',
        orderBookPosition: 'right',
      },
      components: {
        buttonSize: 'sm',
        borderRadius: 'sm',
        cardStyle: 'flat',
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // THEME 5: INSTITUTIONAL
  // ─────────────────────────────────────────────────────────
  {
    id: 'institutional',
    name: 'Institutional',
    description: 'Dark theme designed for professional trading floors',
    preview: {
      colors: { primary: '217 91% 60%', accent: '162 63% 45%' },
      isDark: true,
    },
    theme: {
      colors: {
        primary: '217 91% 60%',      // Bright blue
        accent: '162 63% 45%',       // Teal
        background: '222 47% 6%',    // Dark background
        foreground: '210 40% 98%',   // Light text
      },
      typography: {
        fontFamily: 'JetBrains Mono',
        scale: 'sm',
      },
      layout: {
        auth: 'centered',
        dashboard: 'sidebar',
        orderBookPosition: 'left',
      },
      components: {
        buttonSize: 'md',
        borderRadius: 'none',
        cardStyle: 'bordered',
      },
    },
  },

  // ─────────────────────────────────────────────────────────
  // THEME 6: CRYPTO
  // ─────────────────────────────────────────────────────────
  {
    id: 'crypto',
    name: 'Crypto',
    description: 'Bold neon aesthetic for cryptocurrency platforms',
    preview: {
      colors: { primary: '142 71% 45%', accent: '48 96% 53%' },
      isDark: true,
    },
    theme: {
      colors: {
        primary: '142 71% 45%',      // Neon green
        accent: '48 96% 53%',        // Gold/yellow
        background: '222 47% 6%',    // Dark background
        foreground: '210 40% 98%',   // Light text
      },
      typography: {
        fontFamily: 'Space Grotesk',
        scale: 'md',
      },
      layout: {
        auth: 'split',
        dashboard: 'sidebar',
        orderBookPosition: 'right',
      },
      components: {
        buttonSize: 'lg',
        borderRadius: 'full',
        cardStyle: 'elevated',
      },
    },
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/** Get a theme preset by ID */
export const getThemePreset = (id: string): ThemePreset | undefined => {
  return THEME_PRESETS.find(preset => preset.id === id);
};

/** Get theme with default components applied */
export const getThemeWithDefaults = (theme: BrokerTheme): BrokerTheme => {
  return {
    ...theme,
    components: theme.components ?? DEFAULT_COMPONENTS,
  };
};

/** Check if a theme is dark mode based on background lightness */
export const isDarkTheme = (theme: BrokerTheme): boolean => {
  const parts = theme.colors.background.split(' ');
  if (parts.length >= 3) {
    const lightness = parseFloat(parts[2]);
    return lightness < 50;
  }
  return false;
};

// Legacy export for backwards compatibility
export const templatePresets = THEME_PRESETS;
export const getTemplatePreset = getThemePreset;
