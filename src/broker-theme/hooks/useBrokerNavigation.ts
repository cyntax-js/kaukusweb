/**
 * Broker Navigation Hook
 * 
 * Provides navigation utilities that automatically preserve the ?broker= param
 * when in preview mode. This ensures deep links and reloads maintain context.
 */

import { useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBrokerPaths } from './useBrokerPaths';

/**
 * Get the current broker param from URL (if any)
 */
export function getBrokerParam(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('broker');
}

/**
 * Check if we're in preview mode (need to preserve ?broker= param)
 */
export function isPreviewMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.startsWith('/preview');
}

/**
 * Append broker param to a path if in preview mode
 */
export function appendBrokerParam(path: string, brokerKey?: string | null): string {
  const broker = brokerKey ?? getBrokerParam();
  
  // Only append in preview mode and if we have a broker key
  if (!isPreviewMode() || !broker) {
    return path;
  }
  
  // Don't duplicate if already has broker param
  if (path.includes('?broker=') || path.includes('&broker=')) {
    return path;
  }
  
  // Append broker param
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}broker=${broker}`;
}

/**
 * Hook that provides navigation with automatic broker param preservation
 */
export function useBrokerNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { publicPrefix, appPrefix, isBrokerSubdomain } = useBrokerPaths();
  
  const brokerParam = useMemo(() => getBrokerParam(), [location.search]);
  const inPreviewMode = useMemo(() => isPreviewMode(), [location.pathname]);

  /**
   * Navigate to a path, preserving broker param in preview mode
   */
  const navigateWithBroker = useCallback(
    (path: string, options?: { replace?: boolean }) => {
      const fullPath = appendBrokerParam(path, brokerParam);
      navigate(fullPath, options);
    },
    [navigate, brokerParam]
  );

  /**
   * Build a link path with broker param preserved
   */
  const buildLink = useCallback(
    (path: string): string => {
      return appendBrokerParam(path, brokerParam);
    },
    [brokerParam]
  );

  /**
   * Build public page link (landing, about, login, etc.)
   */
  const buildPublicLink = useCallback(
    (path: string): string => {
      const fullPath = `${publicPrefix}${path}`;
      return appendBrokerParam(fullPath, brokerParam);
    },
    [publicPrefix, brokerParam]
  );

  /**
   * Build app page link (markets, portfolio, etc.)
   */
  const buildAppLink = useCallback(
    (path: string): string => {
      const fullPath = `${appPrefix}${path}`;
      return appendBrokerParam(fullPath, brokerParam);
    },
    [appPrefix, brokerParam]
  );

  /**
   * Get home link with broker param
   */
  const homeLink = useMemo(() => {
    const base = publicPrefix || '/';
    return appendBrokerParam(base, brokerParam);
  }, [publicPrefix, brokerParam]);

  return {
    navigate: navigateWithBroker,
    buildLink,
    buildPublicLink,
    buildAppLink,
    homeLink,
    brokerParam,
    inPreviewMode,
    isBrokerSubdomain,
    publicPrefix,
    appPrefix,
  };
}

export default useBrokerNavigation;
