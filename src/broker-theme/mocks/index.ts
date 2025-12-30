/**
 * ============================================================
 * MOCK DATA - INITIALIZATION
 * ============================================================
 * 
 * Exports mock broker configs and auto-registers them.
 * Import this file early in your app to enable mock brokers.
 */

import { registerMockBrokers } from '../config/engine';
import { mockBrokerConfigs } from './brokers';

// Auto-register all mock brokers
registerMockBrokers(mockBrokerConfigs);

// Re-export for direct access
export { mockBrokerConfigs };
