/**
 * ============================================================
 * THEME ENGINE
 * ============================================================
 * 
 * Runtime engine that applies themes to the page.
 * Handles:
 * - CSS variable application
 * - Font loading
 * - Document branding (title, favicon)
 * - Zustand state management
 * - Subdomain detection & config loading
 * 
 * @see README.md for architecture overview
 */

import { create } from 'zustand';
import type { BrokerConfig, BrokerTheme, ThemeComponents } from './types';
import { DEFAULT_COMPONENTS, isDarkTheme } from './themes';

// ============================================================
// FONT LOADING
// ============================================================

const FONT_URLS: Record<string, string> = {
  'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'Plus Jakarta Sans': 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
  'JetBrains Mono': 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
  'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  'Space Grotesk': 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap',
  'DM Sans': 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap',
  'Outfit': 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap',
  'Manrope': 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap',
  'Poppins': 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
  'Sora': 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap',
};

const loadedFonts = new Set<string>();

/** Load a Google Font dynamically */
export const loadFont = (fontFamily: string): void => {
  if (loadedFonts.has(fontFamily)) return;
  
  const fontUrl = FONT_URLS[fontFamily];
  if (!fontUrl) return;

  const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
  if (existingLink) {
    loadedFonts.add(fontFamily);
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontUrl;
  document.head.appendChild(link);
  loadedFonts.add(fontFamily);
};

/** Get list of available font families */
export const getAvailableFonts = (): string[] => Object.keys(FONT_URLS);

// ============================================================
// CSS APPLICATION
// ============================================================

const FONT_SCALE_MAP: Record<string, string> = {
  sm: '14px',
  md: '16px',
  lg: '18px',
};

const BORDER_RADIUS_MAP: Record<string, string> = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  full: '9999px',
};

const BUTTON_SIZE_MAP: Record<string, { height: string; padding: string; fontSize: string }> = {
  sm: { height: '2rem', padding: '0.5rem 1rem', fontSize: '0.875rem' },
  md: { height: '2.5rem', padding: '0.625rem 1.25rem', fontSize: '1rem' },
  lg: { height: '3rem', padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
};

/** Apply theme to CSS custom properties */
export const applyTheme = (theme: BrokerTheme): void => {
  const root = document.documentElement;
  const components = theme.components ?? DEFAULT_COMPONENTS;

  // Colors
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--background', theme.colors.background);
  root.style.setProperty('--foreground', theme.colors.foreground);
  root.style.setProperty('--ring', theme.colors.primary);
  root.style.setProperty('--chart-1', theme.colors.primary);
  root.style.setProperty('--chart-2', theme.colors.accent);

  // Typography
  loadFont(theme.typography.fontFamily);
  root.style.setProperty('--font-family', theme.typography.fontFamily);
  root.style.setProperty('--font-size-base', FONT_SCALE_MAP[theme.typography.scale]);
  document.body.style.fontFamily = `"${theme.typography.fontFamily}", system-ui, sans-serif`;

  // Components
  root.style.setProperty('--radius', BORDER_RADIUS_MAP[components.borderRadius]);
  root.style.setProperty('--button-height', BUTTON_SIZE_MAP[components.buttonSize].height);
  root.style.setProperty('--button-padding', BUTTON_SIZE_MAP[components.buttonSize].padding);
  root.style.setProperty('--button-font-size', BUTTON_SIZE_MAP[components.buttonSize].fontSize);

  // Card style classes (for component reference)
  root.setAttribute('data-card-style', components.cardStyle);
};

/** Reset theme to CSS defaults */
export const resetTheme = (): void => {
  const root = document.documentElement;
  const properties = [
    '--primary', '--accent', '--background', '--foreground', 
    '--ring', '--chart-1', '--chart-2', 
    '--font-family', '--font-size-base',
    '--radius', '--button-height', '--button-padding', '--button-font-size'
  ];
  properties.forEach(prop => root.style.removeProperty(prop));
  root.removeAttribute('data-card-style');
  document.body.style.fontFamily = '';
};

// ============================================================
// DOCUMENT BRANDING
// ============================================================

/** Apply broker branding to document (title + favicon) */
export const applyBranding = (config: BrokerConfig): void => {
  // Update page title
  if (config.brokerName) {
    document.title = config.brokerName;
  }

  // Update favicon
  if (config.branding?.faviconUrl) {
    let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = config.branding.faviconUrl;
  }
};

// ============================================================
// DEFAULT VALUES
// ============================================================

export const defaultTheme: BrokerTheme = {
  colors: {
    primary: '217 91% 50%',
    accent: '162 63% 41%',
    background: '210 20% 98%',
    foreground: '222 47% 11%',
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
  components: DEFAULT_COMPONENTS,
};

export const defaultBrokerConfig: BrokerConfig = {
  brokerId: '',
  brokerName: '',
  subdomain: '',
  services: [],
  template: 'modern',
  theme: defaultTheme,
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
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// ============================================================
// ZUSTAND STORE
// ============================================================

interface ThemeState {
  config: BrokerConfig;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;

  setConfig: (config: BrokerConfig) => void;
  updateConfig: (partial: Partial<BrokerConfig>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  config: defaultBrokerConfig,
  isLoaded: false,
  isLoading: false,
  error: null,

  setConfig: (config: BrokerConfig) => {
    applyTheme(config.theme);
    applyBranding(config);
    set({ config, isLoaded: true, isLoading: false, error: null });
  },

  updateConfig: (partial: Partial<BrokerConfig>) => {
    const current = get().config;
    const updated = { ...current, ...partial };
    if (partial.theme) applyTheme(updated.theme);
    if (partial.brokerName || partial.branding) applyBranding(updated);
    set({ config: updated });
  },

  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error, isLoading: false }),
  reset: () => set({ config: defaultBrokerConfig, isLoaded: false, isLoading: false, error: null }),
}));

// ============================================================
// SELECTOR HOOKS
// ============================================================

export const useBrokerConfig = () => useThemeStore(state => state.config);
export const useBrokerTheme = () => useThemeStore(state => state.config.theme);
export const useBrokerServices = () => useThemeStore(state => state.config.services);
export const useBrokerPages = () => useThemeStore(state => state.config.pages);
export const useBrokerComponents = (): ThemeComponents => {
  const theme = useThemeStore(state => state.config.theme);
  return theme.components ?? DEFAULT_COMPONENTS;
};

// ============================================================
// SUBDOMAIN DETECTION
// ============================================================

/**
 * Extract subdomain from current URL
 * Supports: fbs.localhost:8080, fbs.domain.com, ?broker=fbs
 */
export const getSubdomain = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  const explicit = params.get('broker') || params.get('subdomain');
  if (explicit) return explicit;

  const hostname = window.location.hostname;

  if (hostname.endsWith('.localhost')) {
    return hostname.replace('.localhost', '') || null;
  }

  const parts = hostname.split('.');
  if (parts.length >= 3 && parts[0] !== 'www') {
    return parts[0];
  }

  return null;
};

export const isBrokerMode = (): boolean => getSubdomain() !== null;

// ============================================================
// BROKER REGISTRY
// ============================================================

let brokerRegistry: Record<string, BrokerConfig> = {};

/** Register broker configs (for mocks or cache) */
export const registerMockBrokers = (configs: BrokerConfig[]) => {
  configs.forEach(config => {
    brokerRegistry[config.subdomain] = config;
  });
};

/** Register a single broker config */
export const registerBrokerConfig = (config: BrokerConfig) => {
  if (config.subdomain) {
    brokerRegistry[config.subdomain] = config;
  }
};

/** Check if a broker is registered */
export const isBrokerRegistered = (subdomain: string): boolean => subdomain in brokerRegistry;

// ============================================================
// CONFIG LOADING
// ============================================================

/** Load broker configuration by subdomain */
export const loadBrokerConfig = async (subdomain: string): Promise<BrokerConfig | null> => {
  // TODO: Replace with real API call when backend is ready
  await new Promise(resolve => setTimeout(resolve, 100));
  return brokerRegistry[subdomain] || null;
};

/** Initialize theme from current subdomain */
export const initializeTheme = async (): Promise<BrokerConfig> => {
  const store = useThemeStore.getState();
  store.setLoading(true);

  try {
    const subdomain = getSubdomain();
    
    if (subdomain) {
      const config = await loadBrokerConfig(subdomain);
      if (config) {
        store.setConfig(config);
        return config;
      } else {
        store.setError(`Broker "${subdomain}" not found`);
      }
    }
    
    store.setConfig(defaultBrokerConfig);
    return defaultBrokerConfig;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load broker config';
    store.setError(message);
    store.setConfig(defaultBrokerConfig);
    return defaultBrokerConfig;
  }
};

// Re-export for convenience
export { isDarkTheme };
