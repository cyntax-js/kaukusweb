/**
 * Subdomain Resolver
 * Detects broker subdomain from hostname or query params (dev mode)
 */

/**
 * Known root domains that should NOT be treated as subdomains
 */
const ROOT_DOMAINS = [
  'localhost',
  'kaucus.org',
  'lovable.app',
  'lovable.dev',
];

/**
 * Resolve broker subdomain from current URL
 * - Production: extracts from hostname (egoras.kaucus.org → egoras)
 * - Development: uses ?broker= query param
 */
export function resolveBrokerFromHost(): string | null {
  const host = window.location.hostname;
  
  // Local development: use query param
  if (host === 'localhost' || host === '127.0.0.1') {
    const params = new URLSearchParams(window.location.search);
    return params.get('broker');
  }
  
  // Lovable preview environment
  if (host.includes('lovable.app') || host.includes('lovable.dev')) {
    const params = new URLSearchParams(window.location.search);
    return params.get('broker');
  }
  
  // Production: extract subdomain
  const parts = host.split('.');
  
  // Need at least 3 parts for subdomain (e.g., egoras.kaucus.org)
  if (parts.length < 3) {
    return null;
  }
  
  const potentialSubdomain = parts[0];
  
  // Exclude www and other common non-broker subdomains
  if (potentialSubdomain === 'www' || potentialSubdomain === 'api') {
    return null;
  }
  
  return potentialSubdomain;
}

/**
 * Check if we're in broker mode (has subdomain or broker param)
 */
export function isBrokerMode(): boolean {
  return resolveBrokerFromHost() !== null;
}

/**
 * Get the full broker API URL
 */
export function getBrokerConfigApiUrl(subdomain: string): string {
  return `https://www.cubegroup.io/api/v2/broker/public/platform/subdomain/${subdomain}`;
}
