/**
 * Preview Layout - Wrapper for broker preview routes
 * Uses unified config loader hook and stores config in Zustand
 */

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, useThemeStore } from '@/broker-theme/config';
import { useBrokerConfigLoader } from '@/broker-theme/hooks';

export const PreviewLayout = () => {
  const { config, isLoading, error } = useBrokerConfigLoader();
  const { setConfig } = useThemeStore();

  // Store config in Zustand so it persists and all components can access it
  useEffect(() => {
    if (config) {
      setConfig(config);
    }
  }, [config, setConfig]);

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
