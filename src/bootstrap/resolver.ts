/**
 * Subdomain Resolver
 * Detects broker subdomain from hostname or query params (dev mode)
 */

/**
 * Platform domains that should NEVER be treated as broker mode
 * These are the main platform/admin domains
 */
const PLATFORM_DOMAINS = [
  'localhost',
  '127.0.0.1',
  'kaucus.org',           // Main platform domain
  'lovable.app',          // Lovable preview
  'lovable.dev',          // Lovable dev
  'lovableproject.com',   // Lovable project preview
];

/**
 * Check if hostname is a platform domain (not broker mode)
 */
function isPlatformDomain(host: string): boolean {
  return PLATFORM_DOMAINS.some(domain => 
    host === domain || 
    host.endsWith(`.${domain}`) ||
    host.includes(domain)
  );
}

/**
 * Resolve broker subdomain from current URL
 * 
 * Logic:
 * - Platform domains (lovable, localhost, kaucus.org): Use ?broker= query param only
 * - Production broker domains (egoras.kaucus.org): Extract subdomain from hostname
 */
export function resolveBrokerFromHost(): string | null {
  const host = window.location.hostname;
  const params = new URLSearchParams(window.location.search);
  
  // Check for explicit broker query param first (works everywhere)
  const brokerParam = params.get('broker');
  if (brokerParam) {
    return brokerParam;
  }
  
  // Platform domains: only use query param (already checked above)
  if (isPlatformDomain(host)) {
    return null;
  }
  
  // Production: extract subdomain from hostname
  // e.g., egoras.kaucus.org → egoras
  const parts = host.split('.');
  
  // Need at least 3 parts for subdomain (e.g., egoras.kaucus.org)
  if (parts.length < 3) {
    return null;
  }
  
  const potentialSubdomain = parts[0];
  
  // Exclude common non-broker subdomains
  if (['www', 'api', 'admin', 'app'].includes(potentialSubdomain)) {
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
