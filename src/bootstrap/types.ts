/**
 * Bootstrap Types
 * Types for the pre-React tenant bootstrap system
 */

export interface BootstrapBrokerConfig {
  id: string;
  broker_id: string;
  broker_name: string;
  subdomain: string;
  services: string[];
  template: string;
  theme: {
    colors: {
      primary: string;
      accent: string;
      background: string;
      foreground: string;
    };
    layout: {
      auth: string;
      dashboard: string;
      orderBookPosition: string;
    };
    components?: {
      cardStyle?: string;
      buttonSize?: string;
      borderRadius?: string;
    };
    typography: {
      scale: string;
      fontFamily: string;
    };
  };
  pages: {
    landing: boolean;
    about: boolean;
    auth: boolean;
    trading: boolean;
    markets: boolean;
    portfolio: boolean;
    settings: boolean;
  };
  branding: {
    logoUrl?: string;
    faviconUrl?: string;
  };
  status: 'draft' | 'active';
  CreatedAt: string;
  UpdatedAt: string;
}

export interface BootstrapResult {
  config: BootstrapBrokerConfig | null;
  error: string | null;
  isBrokerMode: boolean;
}

// Extend window for global broker config
declare global {
  interface Window {
    __BROKER_CONFIG__: BootstrapBrokerConfig | null;
    __BROKER_MODE__: boolean;
    __BROKER_ERROR__: string | null;
  }
}
