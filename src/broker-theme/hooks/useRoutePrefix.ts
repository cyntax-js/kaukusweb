/**
 * Route Prefix Hook
 * Provides the correct route prefix for broker app pages
 * 
 * In broker mode: Returns "" (basename handles path construction)
 * In platform mode: Returns "/preview/app" or "/app" based on current pathname
 */

import { isInBrokerMode } from '@/bootstrap';

/**
 * Get the route prefix for navigation within broker app
 */
export function useRoutePrefix(): string {
  // In broker mode, BrowserRouter has basename set - use empty prefix
  if (isInBrokerMode()) {
    return '';
  }
  
  // Platform mode - check pathname
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  return pathname.startsWith('/preview/app') ? '/preview/app' : '/app';
}
