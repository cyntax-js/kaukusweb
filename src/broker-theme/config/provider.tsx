/**
 * ============================================================
 * BROKER THEME - REACT PROVIDER
 * ============================================================
 * 
 * Wraps broker pages and provides theme context.
 * Automatically applies theme CSS and document branding.
 * 
 * Usage:
 *   <ThemeProvider config={brokerConfig}>
 *     <YourBrokerPage />
 *   </ThemeProvider>
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { BrokerConfig } from './types';
import { 
  useThemeStore, 
  useBrokerConfig, 
  applyTheme, 
  applyBranding,
  initializeTheme 
} from './engine';
import { isDarkTheme } from './themes';

// ============================================================
// CONTEXT
// ============================================================

interface ThemeContextValue {
  config: BrokerConfig;
  isLoaded: boolean;
  isLoading: boolean;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ============================================================
// PROVIDER
// ============================================================

interface ThemeProviderProps {
  children: ReactNode;
  config?: BrokerConfig; // Optional override (for preview mode)
}

export const ThemeProvider = ({ children, config: overrideConfig }: ThemeProviderProps) => {
  const storeConfig = useBrokerConfig();
  const { isLoaded, isLoading } = useThemeStore();
  const [initialized, setInitialized] = useState(false);
  
  // Initialize theme from URL params on mount (only if no override)
  useEffect(() => {
    if (!overrideConfig && !initialized) {
      initializeTheme().then(() => setInitialized(true));
    }
  }, [overrideConfig, initialized]);
  
  const config = overrideConfig || storeConfig;
  const [isDark, setIsDark] = useState(false);

  // Apply theme + branding when config changes
  useEffect(() => {
    if (config) {
      applyTheme(config.theme);
      applyBranding(config);
      setIsDark(isDarkTheme(config.theme));
      
      // Toggle dark class on html element
      if (isDarkTheme(config.theme)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [config]);

  const effectiveIsLoaded = overrideConfig ? true : (isLoaded && initialized);
  const effectiveIsLoading = overrideConfig ? false : (isLoading || !initialized);

  // Loading state
  if (effectiveIsLoading && !overrideConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ config, isLoaded: effectiveIsLoaded, isLoading: effectiveIsLoading, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================
// HOOKS
// ============================================================

/** Access theme context */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/** Check if a service is enabled */
export const useServiceEnabled = (service: string): boolean => {
  const { config } = useTheme();
  return config.services.includes(service as any);
};

/** Check if a page is enabled */
export const usePageEnabled = (page: keyof BrokerConfig['pages']): boolean => {
  const { config } = useTheme();
  return config.pages[page];
};
