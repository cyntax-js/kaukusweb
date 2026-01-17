/**
 * App Layout - Runtime layout for deployed broker platforms
 * Uses unified config loader hook
 */

import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/broker-theme/config';
import { useBrokerConfigLoader } from '@/broker-theme/hooks';

export const AppLayout = () => {
  const { config, isLoading, error } = useBrokerConfigLoader();

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
