/**
 * Preview Layout - Wrapper for all broker preview routes
 * For deployment preview: uses deployment store config
 * For subdomain preview (fbs.localhost): loads from mock registry
 */

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, getSubdomain, loadBrokerConfig } from '@/broker-theme/config';
import type { BrokerConfig } from '@/broker-theme/config';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';
import { mockBrokerConfigs } from '@/broker-theme/mocks';

export const PreviewLayout = () => {
  const deploymentConfig = useBrokerDeploymentStore(state => state.config);
  const [previewConfig, setPreviewConfig] = useState<BrokerConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      setIsLoading(true);
      
      // Priority 1: Check if deployment store has broker configuration 
      const hasDeploymentConfig = 
        deploymentConfig.brokerName || 
        deploymentConfig.services.length > 0 ||
        deploymentConfig.branding?.logoUrl ||
        deploymentConfig.branding?.faviconUrl ||
        deploymentConfig.theme.colors.primary !== '217 91% 50%' ||
        deploymentConfig.theme.colors.background !== '210 20% 98%' ||
        deploymentConfig.theme.typography.fontFamily !== 'Inter' ||
        deploymentConfig.theme.layout.orderBookPosition !== 'right';

      if (hasDeploymentConfig) {
        setPreviewConfig(deploymentConfig);
        setIsLoading(false);
        return;
      }

      // Priority 2: Try to load from subdomain
      const subdomain = getSubdomain();
      if (subdomain) {
        const subdomainConfig = await loadBrokerConfig(subdomain);
        if (subdomainConfig) {
          setPreviewConfig(subdomainConfig);
          setIsLoading(false);
          return;
        }
      }

      // Priority 3: Fall back to demo config
      const demoConfig = mockBrokerConfigs.find(c => c.subdomain === 'demo');
      setPreviewConfig(demoConfig || deploymentConfig);
      setIsLoading(false);
    };

    loadConfig();
  }, [deploymentConfig]);

  if (isLoading || !previewConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <ThemeProvider config={previewConfig}>
      <Outlet />
    </ThemeProvider>
  );
};