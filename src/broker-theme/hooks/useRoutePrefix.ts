/**
 * Route Prefix Hook
 * Provides the correct route prefix for broker app pages
 * Replaces scattered pathname checks throughout the codebase
 */

import { useLocation } from 'react-router-dom';

/**
 * Get the route prefix for navigation within broker app
 * Returns '/preview/app' for preview mode, '/app' for production
 */
export function useRoutePrefix(): string {
  const { pathname } = useLocation();
  return pathname.includes('/preview/app') ? '/preview/app' : '/app';
}
