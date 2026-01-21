/**
 * Bootstrap API
 * Fetches broker config from backend BEFORE React loads
 */

import type { BootstrapBrokerConfig } from './types';
import { getBrokerConfigApiUrl } from './resolver';

interface ApiResponse {
  config: BootstrapBrokerConfig;
}

/**
 * Fetch broker config from the API
 * This runs BEFORE React - uses vanilla fetch
 */
export async function fetchBrokerConfig(subdomain: string): Promise<BootstrapBrokerConfig | null> {
  const url = getBrokerConfigApiUrl(subdomain);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`[Bootstrap] Broker "${subdomain}" not found`);
        return null;
      }
      throw new Error(`Failed to fetch broker config: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    // Validate response structure
    if (!data.config || !data.config.subdomain) {
      console.error('[Bootstrap] Invalid broker config response');
      return null;
    }
    
    // Check if broker is active
    if (data.config.status !== 'active') {
      console.error(`[Bootstrap] Broker "${subdomain}" is not active (status: ${data.config.status})`);
      return null;
    }
    
    return data.config;
  } catch (error) {
    console.error('[Bootstrap] Error fetching broker config:', error);
    return null;
  }
}
