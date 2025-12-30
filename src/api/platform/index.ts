/**
 * ============================================================
 * PLATFORM API EXPORTS
 * ============================================================
 * 
 * Central export for all platform APIs.
 * Import from here for clean access to all platform services.
 * 
 * Usage:
 *   import { platformApi } from '@/api/platform';
 *   await platformApi.auth.login(email, password);
 */

import * as auth from './auth';
import * as broker from './broker';
import * as dealer from './dealer';

// Export individual modules
export { auth, broker, dealer };

// Export combined API object for convenient access
export const platformApi = {
  auth,
  broker,
  dealer,
};

// Re-export types
export type { User, UserRole, LoginRequest, SignupRequest, AuthResponse } from './auth';
export type { BrokerStatus, BrokerDocument, BrokerApplication, DashboardStats, BrokerUser } from './broker';
export type { DealerStatus, DealerType, DealerApplication } from './dealer';
