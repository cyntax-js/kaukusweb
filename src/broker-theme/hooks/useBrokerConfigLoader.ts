/**
 * Unified Config Loader Hook
 * Handles all config loading logic for broker layouts (PreviewLayout, AppLayout)
 */

import { useEffect, useMemo, useState } from 'react';
import type { BrokerConfig } from '../config/types';
import { getSubdomain, loadBrokerConfig } from '../config/engine';
import { mockBrokerConfigs } from '../mocks';
import { useBrokerDeploymentStore } from '@/stores/brokerDeploymentStore';

interface ConfigLoaderResult {
  config: BrokerConfig | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Check if deployment config has meaningful customizations
 */
function hasMeaningfulConfig(config: BrokerConfig): boolean {
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

/**
 * Unified hook for loading broker config with priority:
 * 1. Deployment store (if meaningful)
 * 2. Subdomain detection
 * 3. Demo fallback
 */
export function useBrokerConfigLoader(): ConfigLoaderResult {
  const deploymentConfig = useBrokerDeploymentStore(state => state.config);
  const [asyncConfig, setAsyncConfig] = useState<BrokerConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if deployment config should be used (sync check)
  const preferredConfig = useMemo(() => {
    if (hasMeaningfulConfig(deploymentConfig)) {
      const subdomain = getSubdomain();
      // Use deployment config if no subdomain conflict
      if (!subdomain || !deploymentConfig.subdomain || deploymentConfig.subdomain === subdomain) {
        return deploymentConfig;
      }
    }
    return null;
  }, [deploymentConfig]);

  useEffect(() => {
    // If we have a preferred config from deployment store, use it immediately
    if (preferredConfig) {
      setAsyncConfig(preferredConfig);
      setIsLoading(false);
      return;
    }

    // Otherwise, try async loading
    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Try subdomain first
        const subdomain = getSubdomain();
        if (subdomain) {
          const config = await loadBrokerConfig(subdomain);
          if (config) {
            setAsyncConfig(config);
            setIsLoading(false);
            return;
          }
        }

        // Fall back to demo config
        const demoConfig = mockBrokerConfigs.find(c => c.subdomain === 'demo');
        setAsyncConfig(demoConfig ?? mockBrokerConfigs[0] ?? null);
        
        if (!demoConfig && mockBrokerConfigs.length === 0) {
          setError('Unable to load broker configuration');
        }
      } catch (err) {
        setError('Failed to load broker configuration');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [preferredConfig]);

  return {
    config: preferredConfig ?? asyncConfig,
    isLoading,
    error,
  };
}
