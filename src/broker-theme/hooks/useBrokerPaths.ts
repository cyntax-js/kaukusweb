/**
 * Unified Broker Path Prefixes Hook
 * 
 * Single source of truth for all broker-theme navigation.
 * 
 * KEY INSIGHT: React Router's <Link> and navigate() use paths RELATIVE to the basename.
 * So when basename="/preview", a link to "/login" becomes "/preview/login" in the URL.
 * 
 * Scenarios:
 * 1. Broker mode (subdomain or ?broker=): BrowserRouter has basename set, so all prefixes = ""
 * 2. Platform preview (/preview): No basename, so we need "/preview" prefix for public, "/preview/app" for app
 * 3. Platform app (/app): No basename, so we need "" for public, "/app" for app
 */

import { isInBrokerMode } from '@/bootstrap';

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
 * - All prefixes are "" because BrowserRouter has basename set
 * - Links to "/login" work correctly (basename handles the rest)
 * 
 * In platform mode (/preview or /app):
 * - publicPrefix = "/preview" or ""
 * - appPrefix = "/preview/app" or "/app"
 */
export function useBrokerPaths(): BrokerPaths {
  const isBrokerSubdomain = isInBrokerMode();
  
  if (isBrokerSubdomain) {
    // In broker mode, BrowserRouter has basename set (e.g., "/preview" or "")
    // All links should be relative to root - the basename handles URL construction
    return {
      publicPrefix: '',
      appPrefix: '',
      isBrokerSubdomain: true,
    };
  }
  
  // Platform mode - check current path to determine prefixes
  // This is for platform users previewing broker themes in /preview or /app routes
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
    return {
      publicPrefix: '',
      appPrefix: '',
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
