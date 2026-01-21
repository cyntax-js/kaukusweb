/**
 * React Hook for accessing bootstrap broker config
 * Uses the globally stored config from the bootstrap phase
 */

import { useMemo } from 'react';
import type { BootstrapBrokerConfig } from '../bootstrap/types';
import { getBrokerConfig, isInBrokerMode, getBootstrapError } from '../bootstrap';

interface UseBootstrapConfigResult {
  config: BootstrapBrokerConfig | null;
  isBrokerMode: boolean;
  error: string | null;
  isLoaded: boolean;
}

/**
 * Hook to access the broker config that was loaded during bootstrap
 * This config is already available - no async loading needed
 */
export function useBootstrapConfig(): UseBootstrapConfigResult {
  return useMemo(() => ({
    config: getBrokerConfig(),
    isBrokerMode: isInBrokerMode(),
    error: getBootstrapError(),
    isLoaded: true, // Always loaded since bootstrap completed before React
  }), []);
}

/**
 * Convert bootstrap config to the BrokerConfig format used by the theme system
 */
export function useBootstrapToBrokerConfig() {
  const { config, isBrokerMode, error } = useBootstrapConfig();
  
  return useMemo(() => {
    if (!config) {
      return { config: null, isBrokerMode, error };
    }
    
    // Map bootstrap config to BrokerConfig format
    const brokerConfig = {
      brokerId: config.broker_id,
      brokerName: config.broker_name,
      subdomain: config.subdomain,
      services: config.services as any[],
      template: config.template,
      theme: {
        colors: config.theme.colors,
        typography: {
          fontFamily: config.theme.typography.fontFamily,
          scale: config.theme.typography.scale as 'sm' | 'md' | 'lg',
        },
        layout: {
          auth: config.theme.layout.auth as 'centered' | 'split' | 'image-left',
          dashboard: config.theme.layout.dashboard as 'sidebar' | 'topnav',
          orderBookPosition: config.theme.layout.orderBookPosition as 'left' | 'right',
        },
        components: config.theme.components ? {
          cardStyle: config.theme.components.cardStyle as 'flat' | 'bordered' | 'elevated',
          buttonSize: config.theme.components.buttonSize as 'sm' | 'md' | 'lg',
          borderRadius: config.theme.components.borderRadius as 'none' | 'sm' | 'md' | 'lg' | 'full',
        } : undefined,
      },
      pages: config.pages,
      branding: config.branding,
      status: config.status,
      createdAt: config.CreatedAt,
      updatedAt: config.UpdatedAt,
    };
    
    return { config: brokerConfig, isBrokerMode, error };
  }, [config, isBrokerMode, error]);
}
