/**
 * Broker App Layout
 * Layout component for broker mode - uses config from bootstrap
 */

import { Outlet } from 'react-router-dom';
import { useBootstrapConfig } from '@/hooks/useBootstrapConfig';
import { ThemeProvider } from '@/broker-theme/config/provider';
import type { BrokerConfig } from '@/broker-theme/config/types';

/**
 * Convert bootstrap config to BrokerConfig format
 */
function mapBootstrapToBrokerConfig(bootstrapConfig: any): BrokerConfig {
  return {
    brokerId: bootstrapConfig.broker_id,
    brokerName: bootstrapConfig.broker_name,
    subdomain: bootstrapConfig.subdomain,
    services: bootstrapConfig.services,
    template: bootstrapConfig.template,
    theme: {
      colors: bootstrapConfig.theme.colors,
      typography: {
        fontFamily: bootstrapConfig.theme.typography.fontFamily,
        scale: bootstrapConfig.theme.typography.scale,
      },
      layout: {
        auth: bootstrapConfig.theme.layout.auth,
        dashboard: bootstrapConfig.theme.layout.dashboard,
        orderBookPosition: bootstrapConfig.theme.layout.orderBookPosition,
      },
      components: bootstrapConfig.theme.components,
    },
    pages: bootstrapConfig.pages,
    branding: bootstrapConfig.branding,
    status: bootstrapConfig.status,
    createdAt: bootstrapConfig.CreatedAt,
    updatedAt: bootstrapConfig.UpdatedAt,
  };
}

export function BrokerAppLayout() {
  const { config, isBrokerMode, error } = useBootstrapConfig();
  
  // If not in broker mode, this layout shouldn't be rendered
  if (!isBrokerMode) {
    return null;
  }
  
  // If there's an error (broker not found), show error page
  if (error || !config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Broker Not Found</h1>
        <p className="text-muted-foreground">{error || 'Unable to load broker configuration'}</p>
      </div>
    );
  }
  
  // Map bootstrap config to BrokerConfig
  const brokerConfig = mapBootstrapToBrokerConfig(config);
  
  return (
    <ThemeProvider config={brokerConfig}>
      <Outlet />
    </ThemeProvider>
  );
}
