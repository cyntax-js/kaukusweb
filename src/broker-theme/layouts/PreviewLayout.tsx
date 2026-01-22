/**
 * Preview Layout - Wrapper for broker preview routes
 * Uses unified config loader hook and stores config in both:
 * 1. Theme Zustand store (for React context)
 * 2. IndexedDB-persisted broker config store (for reload persistence)
 */

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, useThemeStore } from '@/broker-theme/config';
import { useBrokerConfigLoader } from '@/broker-theme/hooks';
import { useBrokerConfigStore } from '@/broker-theme/stores';
import { getBrokerParam } from '@/broker-theme/hooks/useBrokerNavigation';

export const PreviewLayout = () => {
  const { config, isLoading, error } = useBrokerConfigLoader();
  const { setConfig } = useThemeStore();
  const { setConfig: persistConfig } = useBrokerConfigStore();

  // Store config in Zustand so it persists and all components can access it
  useEffect(() => {
    if (config) {
      // Update the theme store (for React context)
      setConfig(config);
      
      // Persist to IndexedDB store for reload survival
      const brokerKey = getBrokerParam() || config.subdomain || 'demo';
      persistConfig(brokerKey, config);
    }
  }, [config, setConfig, persistConfig]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Configuration Error</h1>
          <p className="text-muted-foreground">{error || 'Unable to load broker configuration'}</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider config={config}>
      <Outlet />
    </ThemeProvider>
  );
};
