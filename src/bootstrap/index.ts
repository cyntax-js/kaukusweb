/**
 * Tenant Bootstrap System
 * 
 * This module handles broker detection and configuration BEFORE React loads.
 * 
 * Flow:
 * 1. Detect subdomain from URL
 * 2. If broker subdomain found, fetch config from API
 * 3. Apply theme and branding
 * 4. Store config globally
 * 5. Signal React to load
 */

import type { BootstrapBrokerConfig, BootstrapResult } from './types';
import { resolveTenant, resolveBrokerFromHost, isBrokerMode, type TenantResolution } from './resolver';
import { fetchBrokerConfig } from './api';
import { applyFullTheme } from './theme-applier';

export type { BootstrapBrokerConfig, BootstrapResult, TenantResolution };
export { resolveTenant, resolveBrokerFromHost, isBrokerMode };

/**
 * Initialize the bootstrap process
 * This MUST complete before React loads
 */
export async function initializeBrokerBootstrap(): Promise<BootstrapResult> {
  // Initialize global state
  window.__BROKER_CONFIG__ = null;
  window.__BROKER_MODE__ = false;
  window.__BROKER_ERROR__ = null;
  window.__BROKER_BASE_PATH__ = '';
  
  const tenant = resolveTenant();
  
  // Not in broker mode - return early for platform
  if (tenant.type !== 'broker' || !tenant.subdomain) {
    console.log('[Bootstrap] Platform mode detected, skipping broker bootstrap');
    return {
      config: null,
      error: null,
      isBrokerMode: false,
    };
  }
  
  const subdomain = tenant.subdomain;
  window.__BROKER_BASE_PATH__ = tenant.basePath;

  console.log(`[Bootstrap] Broker mode detected: ${subdomain}`);
  window.__BROKER_MODE__ = true;
  
  // Fetch broker config from API
  const config = await fetchBrokerConfig(subdomain);
  
  if (!config) {
    const error = `Broker "${subdomain}" not found or inactive`;
    window.__BROKER_ERROR__ = error;
    return {
      config: null,
      error,
      isBrokerMode: true,
    };
  }
  
  // Apply theme and branding BEFORE React loads
  applyFullTheme(config);
  
  // Store config globally for React to access
  window.__BROKER_CONFIG__ = config;
  
  console.log(`[Bootstrap] Broker "${config.broker_name}" initialized successfully`);
  
  return {
    config,
    error: null,
    isBrokerMode: true,
  };
}

/**
 * Get router base path for broker mode (e.g. /preview in localhost simulation)
 */
export function getBrokerBasePath(): string {
  return window.__BROKER_BASE_PATH__ ?? '';
}

/**
 * Get the stored broker config (for use in React)
 */
export function getBrokerConfig(): BootstrapBrokerConfig | null {
  return window.__BROKER_CONFIG__ ?? null;
}

/**
 * Check if we're in broker mode (for use in React)
 */
export function isInBrokerMode(): boolean {
  return window.__BROKER_MODE__ ?? false;
}

/**
 * Get any bootstrap error (for use in React)
 */
export function getBootstrapError(): string | null {
  return window.__BROKER_ERROR__ ?? null;
}
