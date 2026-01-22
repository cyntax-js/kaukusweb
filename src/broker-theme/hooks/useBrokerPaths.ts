/**
 * Unified Broker Path Prefixes Hook
 * 
 * Single source of truth for all broker-theme navigation.
 * Handles three scenarios:
 * 1. Subdomain mode (egoras.kaucus.org) → prefixes are ""
 * 2. Local preview (/preview?broker=x) → prefixes are "/preview" and "/preview"
 * 3. Platform preview/app (/preview/app or /app) → prefixes are "/preview" and "/preview/app" or "" and "/app"
 */

import { isInBrokerMode, getBrokerBasePath } from '@/bootstrap';

export interface BrokerPaths {
  /** Prefix for public pages: /, /about, /legal, /login, /signup */
  publicPrefix: string;
  /** Prefix for app pages: /markets, /trade, /portfolio, /settings, /otc-desk */
  appPrefix: string;
  /** Whether we're running in broker subdomain mode */
  isBrokerSubdomain: boolean;
}

/**
 * Get broker path prefixes.
 * 
 * In broker mode (subdomain or ?broker=):
 * - publicPrefix = basePath (e.g., "" for subdomain, "/preview" for local)
 * - appPrefix = basePath (same, since routes are flat in broker mode)
 * 
 * In platform mode:
 * - publicPrefix = "/preview" or ""
 * - appPrefix = "/preview/app" or "/app"
 */
export function useBrokerPaths(): BrokerPaths {
  const isBrokerSubdomain = isInBrokerMode();
  
  if (isBrokerSubdomain) {
    // In broker mode, all routes are at the root (with optional basePath for /preview simulation)
    const basePath = getBrokerBasePath();
    return {
      publicPrefix: basePath,
      appPrefix: basePath,
      isBrokerSubdomain: true,
    };
  }
  
  // Platform mode - check current path to determine prefixes
  // This is for platform users previewing broker themes
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPreview = pathname.startsWith('/preview');
  
  return {
    publicPrefix: isPreview ? '/preview' : '',
    appPrefix: isPreview ? '/preview/app' : '/app',
    isBrokerSubdomain: false,
  };
}

/**
 * Non-hook version for use outside React components
 */
export function getBrokerPaths(): BrokerPaths {
  const isBrokerSubdomain = isInBrokerMode();
  
  if (isBrokerSubdomain) {
    const basePath = getBrokerBasePath();
    return {
      publicPrefix: basePath,
      appPrefix: basePath,
      isBrokerSubdomain: true,
    };
  }
  
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isPreview = pathname.startsWith('/preview');
  
  return {
    publicPrefix: isPreview ? '/preview' : '',
    appPrefix: isPreview ? '/preview/app' : '/app',
    isBrokerSubdomain: false,
  };
}
