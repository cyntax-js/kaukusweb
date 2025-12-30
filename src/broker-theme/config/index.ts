/**
 * ============================================================
 * BROKER CONFIG - PUBLIC API
 * ============================================================
 * 
 * This is the ONLY file you need to import from.
 * 
 * Structure:
 *   types.ts     → TypeScript interfaces
 *   themes.ts    → Pre-built theme presets (ADD NEW THEMES HERE!)
 *   engine.ts    → Runtime: CSS application, store, loading
 *   provider.tsx → React context provider
 * 
 * @see README.md for detailed documentation
 */

// Types
export type { 
  BrokerConfig, 
  BrokerTheme, 
  BrokerService, 
  BrokerTemplate, 
  BrokerPages,
  BrokerBranding,
  ThemeColors,
  ThemeTypography,
  ThemeLayout,
  ThemeComponents,
  ThemePreset,
  TemplatePreset,
} from './types';

// Theme Presets - ADD NEW THEMES IN themes.ts!
export {
  THEME_PRESETS,
  AVAILABLE_FONTS,
  DEFAULT_COMPONENTS,
  getThemePreset,
  getThemeWithDefaults,
  isDarkTheme,
  // Legacy exports for backwards compatibility
  templatePresets,
  getTemplatePreset,
} from './themes';

// Engine (runtime functionality)
export {
  // Defaults
  defaultTheme,
  defaultBrokerConfig,
  
  // CSS Application
  applyTheme,
  applyBranding,
  resetTheme,
  loadFont,
  getAvailableFonts,
  
  // Zustand Store & Hooks
  useThemeStore,
  useBrokerConfig,
  useBrokerTheme,
  useBrokerServices,
  useBrokerPages,
  useBrokerComponents,
  
  // Subdomain Detection
  getSubdomain,
  isBrokerMode,
  
  // Config Loading & Registry
  registerMockBrokers,
  registerBrokerConfig,
  isBrokerRegistered,
  loadBrokerConfig,
  initializeTheme,
} from './engine';

// React Provider
export {
  ThemeProvider,
  ThemeProvider as BrokerThemeProvider, // Alias for backwards compatibility
  useTheme,
  useTheme as useBrokerConfigContext, // Alias for backwards compatibility  
  useServiceEnabled,
  usePageEnabled,
} from './provider';
