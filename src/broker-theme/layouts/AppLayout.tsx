/**
 * App Layout - Runtime layout for deployed broker platforms
 * Loads broker config from subdomain OR from persisted deployment config
 */

import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, getSubdomain, loadBrokerConfig } from '@/broker-theme/config';
import type { BrokerConfig } from '@/broker-theme/config';
import { mockBrokerConfigs } from '@/broker-theme/mocks';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';

function hasMeaningfulDeploymentConfig(config: BrokerConfig) {
  return Boolean(
    config.subdomain ||
    config.brokerName ||
    config.services.length > 0 ||
    config.branding?.logoUrl ||
    config.branding?.faviconUrl ||
    config.theme.colors.primary !== '217 91% 50%' ||
    config.theme.colors.background !== '210 20% 98%' ||
    config.theme.typography.fontFamily !== 'Inter' ||
    config.theme.layout.orderBookPosition !== 'right'
  );
}

export const AppLayout = () => {
  const deploymentConfig = useBrokerDeploymentStore((state) => state.config);

  const preferredConfig = useMemo(() => {
    const subdomain = getSubdomain();

    if (hasMeaningfulDeploymentConfig(deploymentConfig)) {
      if (!subdomain || !deploymentConfig.subdomain || deploymentConfig.subdomain === subdomain) {
        return deploymentConfig;
      }
    }

    return null;
  }, [deploymentConfig]);

  const [appConfig, setAppConfig] = useState<BrokerConfig | null>(preferredConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      if (preferredConfig) {
        setAppConfig(preferredConfig);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const subdomain = getSubdomain();

      if (subdomain) {
        const config = await loadBrokerConfig(subdomain);
        if (config) {
          setAppConfig(config);
          setIsLoading(false);
          return;
        }
      }

      const demoConfig = mockBrokerConfigs.find((c) => c.subdomain === 'demo');
      setAppConfig(demoConfig ?? mockBrokerConfigs[0] ?? null);
      setIsLoading(false);
    };

    loadConfig();
  }, [preferredConfig]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!appConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Configuration Error</h1>
          <p className="text-muted-foreground">Unable to load broker configuration</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider config={appConfig}>
      <Outlet />
    </ThemeProvider>
  );
};